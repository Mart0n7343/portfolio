#pragma comment(linker, "/SUBSYSTEM:windows /ENTRY:mainCRTStartup")

int * startWindow();
bool game(int, int, int);

int main()
{
	int * options = startWindow();
	const int mines = options[0];
	const int fieldWidth = options[1];
	const int fieldHeight = options[2];
	bool toRestart;

forRestart: 
	toRestart = game(mines, fieldWidth, fieldHeight);
	if (toRestart == true) {
		goto forRestart;
	}
	else {
		return 0;
	}
}