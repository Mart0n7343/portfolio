#include "HX711.h"
#include "Servo.h"

//pins
const int PIN_LC_DOUT = A0;
const int PIN_LC_SCK = A1;

//scale
HX711 scale;
const int calFactor = -325;

//servo
Servo servo;

//com
const char START_MARKER = '<';
const char END_MARKER = '>';
const byte numChars = 64;
char serialReceivedChars[numChars];
bool serialNewData = false;

//time
short loopTimer = 0;
bool fed = false;

//timeTable
long timeTable[16] = {12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
byte timeTableSize = 1;

void sendCurrentTimeTable() {
  Serial.println("<PROV:");
  for(int i = 0; i < timeTableSize; i++) {
    Serial.print(timeTable[i]);
  }
  Serial.print(">");
}

//function to calibrate the load cell
//useless
void calibrate() {
  scale.power_up();
  if (scale.is_ready()) {
    scale.set_scale();    
    Serial.println("<PROV: Tare, remove any weights>");
    delay(10000);
    scale.tare();
    Serial.println("<PROV: Tare done>");
    Serial.print("<PROV: Place a known weight>");
    delay(10000);
    long reading = scale.get_units(10);
    Serial.print("<PROV: Result: ");
    Serial.print(reading);
    Serial.println(">");
    delay(1000);
  } 
  else {
    Serial.println("<PROV: HX711 not found>");
  }
  scale.power_down();	
}

void weigh() {
  scale.power_up();
  if (scale.is_ready()) {
    scale.set_scale(calFactor);    
    Serial.print("<PROV: Weigh: ");
    Serial.print(scale.get_units(10), 1);
    Serial.print(">");
  } 
  else {
    Serial.println("<PROV: HX711 not found>");
  }
  scale.power_down();	
}

void serialReceive() {
  static bool p = false;
  static byte i = 0;
  char rc;
  while (Serial.available() && !serialNewData) {
    rc = Serial.read();
    if (p) {
      if (rc != END_MARKER) {
        serialReceivedChars[i] = rc;
        i++;
        if (i >= numChars) {
          i = numChars - 1;
        }
      } else {
        serialReceivedChars[i] = '\0';
        p = false;
        i = 0;
        serialNewData = true;
      }
    } else if (rc == START_MARKER) {
      p = true;
    }
  }
}

void timerFunction(String timeFormatted) {
  long h = timeFormatted.substring(0, 2).toInt();
  long m = timeFormatted.substring(3, 5).toInt();

  byte t = 0;
  for(int i = 0; i < timeTableSize; i++) {
    if(timeTable[i] == h) {
      t++;
    }
  }
  if(t > 0) {
    if(m > 0 && fed == false) {
      fed = true;
      feed();
    } else if(m > 30 && fed == true) {
      fed = false;
    }
  }
}

void feed() {
  servo.write(0);
  delay(5000);
  servo.write(90);
  delay(5000);
}

void manageCommands(String str) {
  if(str.indexOf("CALIBRATE") != -1) {
    calibrate();
  } else if(str.indexOf("WEIGH") != 1) {
    weigh();

  } else if(str.indexOf("TIMETABLE_ADD") != 1) {
    timeTable[timeTableSize] = str.substring(15).toInt();
    if(timeTableSize != 15) timeTableSize++;
  } else if(str.indexOf("TIMETABLE_REMOVE") != 1) {
    if(timeTableSize != 0) timeTableSize--;
    timeTable[timeTableSize] == 0;
  } else if(str.indexOf("TIMETABLE_SET") != 1) {
    String s = str.substring(15);
    int a = (s.length() + 1) / 3;
    timeTableSize = 0;
    for(int i = 0; i < a; i + 3) {
      timeTable[timeTableSize] = str.substring(i*3, i*3 + 2).toInt();
      timeTableSize++;
    }
  }
}

void setup() {
  Serial.begin(9600);
  scale.begin(PIN_LC_DOUT, PIN_LC_SCK);
  servo.attach(11);
}

void loop() {

  serialReceive();
  if (serialNewData) {
    String str = String(serialReceivedChars);
    if (str.indexOf("REQ:") != -1) {
      String cmd = str.substring(4);
      manageCommands(cmd);
    } else if (str.indexOf("PROVNTC:") != -1) {
      String time = str.substring(8);
      timerFunction(time);
    }
    serialNewData = false;
  }

  //TIME REQUEST
  loopTimer++;
  if(loopTimer == 1000) {
    Serial.println("<REQNTC>");
  }
}