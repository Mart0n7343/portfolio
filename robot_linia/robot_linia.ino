#define R1 10
#define R2 3
#define L1 5
#define L2 11
#define RS A1
#define LS A0

void setup() {
  pinMode(R1, OUTPUT);
  pinMode(R2, OUTPUT);
  pinMode(L1, OUTPUT);
  pinMode(L2, OUTPUT);
  pinMode(RS, INPUT);
  pinMode(LS, INPUT);
}

const int maxSpeed = 255;
int arr[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
int i = 0;
float k = 0.40;

void loop() {
  int left = 1023 - analogRead(LS);
  int right = 1023 - analogRead(RS);
  arr[i] = abs(left - right);

  int g = 0;
  int h = 0;
  for(int j = 0; j < 5; j++) {
    g += arr[(10 - i - j) % 10];
    h += arr[(15 - i - j) % 10];
  }

  if(g - h >= 20 && k >= 0.25f) {
    k -= 0.03f;
  } else if(g - h < 0 && k <= 0.45f) {
    k += 0.01f;
  }

  analogWrite(R1, constrain(right * k, 0, maxSpeed));
  analogWrite(L1, constrain(left * k, 0, maxSpeed));
  analogWrite(R2, 0);
  analogWrite(L2, 0);

  i++;
  if(i == 10) i = 0;
}



