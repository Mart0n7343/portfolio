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

int arr[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
double b1, b2, b3, b4, c1, c2, c3, c4;
int i = 0;
double k = 0.45;

double getSum(int power) {
  int s = 0;
  for(int j = 0; j < 10; j++) {
    s += arr[j] * pow(((10 - i) % 10 + j - 5), power);
  }
  return s;
}

void loop() {
  int left = 1023 - analogRead(LS);
  int right = 1023 - analogRead(RS);
  arr[i] = abs(left - right);
  b1 = getSum(0);
  b2 = getSum(1);
  b3 = getSum(2);
  b4 = getSum(3);
  c1 = (517*b1 + 50*b2 - 40*b3 - 5*b4) / 2145.0;
  c2 = (720*b1 + 2365*b2 - 150*b3 - 139*b4) / 30888.0;
  c3 = (-192*b1 - 50*b2 + 27*b3 + 5*b4) / 10296.0;
  c4 = (-72*b1 - 139*b2 + 15*b3 + 10*b4) / 30888.0;
  double y5 = c1 + c2*5 + c3*25 + c4*125;
  k = min(max(k * abs(arr[i] / y5), 0.55), 0.28);
  analogWrite(L1, constrain(left * k, 0, 255));
  analogWrite(R1, constrain(right * k, 0, 255));
  analogWrite(L2, 0);
  analogWrite(R2, 0);
  i = (i + 1) % 10;
}