#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <WiFiClient.h>
#include <NTPClient.h>

const char START_MARKER = '<';
const char END_MARKER = '>';

const byte numChars = 64;
//Serial
char serialReceivedChars[numChars];
bool serialNewData = false;
//Client
char clientReceivedChars[numChars];
bool clientNewData = false;

String ssid = "feeder";
String password = "passw0rd";
WiFiUDP ntpUDP;
WiFiServer server(80);
NTPClient timeClient(ntpUDP, "ru.pool.ntp.org", 10800);
WiFiClient client;

void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  server.begin();
  Serial.println();
  Serial.println("Server started");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  timeClient.begin();
  connectClient();
}

void loop() {

  if (!client) {
    Serial.println(F("Client disconnected. Attempting to connect again."));
    connectClient();
  } else {
    clientReceive();
    if(clientNewData == true) {
      String str = String(clientReceivedChars);
      if(str.indexOf("REQ:") != -1) {
        Serial.println("<" + str + ">");
      }

      clientNewData = false;
    }
  }

  serialReceive();
  if (serialNewData == true) {
    String str = String(serialReceivedChars);
    if (str.indexOf("PROV:") != -1) {
      client.println(str);

    } else if (str.indexOf("REQNTC") != -1) {
      timeClient.update();
      Serial.println("<PROVNTC:" + timeClient.getFormattedTime() + ">");
    }

    serialNewData = false;
  }
}

void clientReceive() {
  static bool o = false;
  static byte j = 0;
  char rc;

  while (client.available() && !clientNewData) {
    rc = client.read();

    if (o) {
      if (rc != END_MARKER) {
        clientReceivedChars[j] = rc;
        j++;
        if (j >= numChars) {
          j = numChars - 1;
        }
      } else {
        clientReceivedChars[j] = '\0';
        o = false;
        j = 0;
        clientNewData = true;
      }

    } else if (rc == START_MARKER) {
      o = true;
    }
  }
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

void connectClient() {
  Serial.println(F("Connecting to client"));
  do {
    delay(500);
    Serial.print(".");
    client = server.available();
  } while (!client);

  Serial.println();
  Serial.println(F("Connected"));
  client.println(F("Connected"));
}