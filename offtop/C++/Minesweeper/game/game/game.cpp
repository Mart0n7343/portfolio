#include <SFML/Graphics.hpp>
#include <time.h>
#include <string>
#include "Tile.h"
#include "TextField.h"
#include "strings.h"

bool gameOver(bool);

using namespace sf;

int getRandomNumber(int min, int max)
{
	static const double fraction = 1.0 / (static_cast<double>(RAND_MAX) + 1.0);
	return static_cast<int>(rand() * fraction * (max - min + 1) + min);
}

bool game(int mines, int fieldWidth, int fieldHeight) {

	const int tileSize = 32;
	const int fieldX = 130;
	const int fieldY = 5;
	const int windowWidth = tileSize * fieldWidth + fieldX + 10;
	const int windowHeight = tileSize * fieldHeight + fieldY *2;

	int minesCounter = mines;
	int minesFound = 0;
	bool isFirstCell = true;
	bool isGameOver = false;
	bool hasWon;

	srand(time(0));

	Font font;
	font.loadFromFile("source\\calibri.ttf");

	Image icon;
	icon.loadFromFile("source\\9.bmp");
	RenderWindow window(VideoMode(windowWidth, windowHeight), string_windowTitle, Style::Close);
	window.setIcon(icon.getSize().x, icon.getSize().y, icon.getPixelsPtr());

	const float textFieldWidth = 100.0;
	const float textFieldHeight = 30.0;

	const float minesCounterFieldX = fieldX / 2 - textFieldWidth / 2;
	const float minesCounterFieldY = windowHeight / 2 - textFieldHeight / 2;

	TextField minesCounterField(textFieldWidth, textFieldHeight, minesCounterFieldX, minesCounterFieldY, false, 20, 2);
	minesCounterField.setFont(font);
	minesCounterField.setOnlyNumbers(true);
	minesCounterField.setText(std::to_string(minesCounter));

	Text minesCounterAboveText;
	minesCounterAboveText.setPosition(minesCounterFieldX, minesCounterFieldY - 25.0f);
	minesCounterAboveText.setCharacterSize(14);
	minesCounterAboveText.setFont(font);
	minesCounterAboveText.setFillColor(Color::Black);
	minesCounterAboveText.setOutlineColor(Color::Black);
	minesCounterAboveText.setString(string_minesCount);

	Tile** grid = new Tile*[fieldWidth]; 
	for (int a = 0; a < fieldWidth; ++a) {    //grid
		grid[a] = new Tile[fieldHeight];
	}											

	for (int a = 0; a < fieldWidth; ++a) {
		for (int b = 0; b < fieldHeight; ++b) {
			grid[a][b].setPos(a, b);
		}
	}

	while (window.isOpen()) {

		Event event;
		while (window.pollEvent(event)) {

			switch (event.type) {

			case Event::Closed: {
				window.close();
				exit(0);
			}
			case Event::KeyPressed: {
				if (event.key.code == Keyboard::Escape) {
					window.close();
					exit(0);
				}
			}

			case Event::MouseButtonPressed: {

				if (isGameOver) {
					bool returnBool = gameOver(hasWon);
					return returnBool;															//return
				}

				int mouseX = Mouse::getPosition(window).x;
				int mouseY = Mouse::getPosition(window).y;
				if (mouseX >= fieldX && mouseX <= fieldX + fieldWidth * tileSize && mouseY >= fieldY && mouseY <= fieldY + fieldHeight * tileSize) 
				{

					int x = (mouseX - fieldX) / tileSize;
					int y = (mouseY - fieldY) / tileSize;

					//generation
					if (isFirstCell) {
					
						isFirstCell = false;

						//setting up mines
						for (int minesLeft = 0; minesLeft < mines;) {

							int a = getRandomNumber(0, fieldWidth - 1);
							int b = getRandomNumber(0, fieldHeight - 1);

							if (grid[a][b].checkNeighbours(x, y) || grid[a][b].getIsMine()) continue;

							grid[a][b].setMine();
							++minesLeft;
						}

						//setting up numbers
						for (int a = 0; a < fieldWidth; ++a) {
							for (int b = 0; b < fieldHeight; ++b) {
								grid[a][b].setNumber(grid, fieldWidth, fieldHeight);
							}
						}
						std::cout << "\nFinished generation";

						grid[x][y].expose();
					}
					else {

						switch (event.key.code) {

						case Mouse::Left: {
							isGameOver = grid[x][y].expose();
							if (isGameOver) {
								hasWon = false;
								for (int a = 0; a < fieldWidth; ++a) {
									for (int b = 0; b < fieldHeight; ++b) {
										if (a == x && b == y) continue;
										grid[a][b].expose(true, true, true);
									}
								}
							}
							break;
						}	
						case Mouse::Right: {
							int value = grid[x][y].setFlag((minesCounter == 0));
							minesCounter += value;
							if (value == -1 && grid[x][y].getIsMine())
								minesFound++;
							if (value == 1 && grid[x][y].getIsMine())
								minesFound--;
							break;
						}
						case Mouse::Middle: {
							grid[x][y].setUndefined();
							break;
						}
						}
					}
				}
			}
			}
		}

		if (minesFound == mines) {
			isGameOver = true;
			hasWon = true;
			for (int a = 0; a < fieldWidth; ++a) {
				for (int b = 0; b < fieldHeight; ++b) {
					grid[a][b].expose(true);
				}
			}
		}

		window.clear(Color::White);

		//draw
		for (int a = 0; a < fieldWidth; ++a) {
			for (int b = 0; b < fieldHeight; ++b) {

				if (grid[a][b].getIsEmptyExposed())
					grid[a][b].exposeNeighbours(grid, fieldWidth, fieldHeight);

				Texture texture;
				std::string filePath = "source\\" + std::to_string(grid[a][b].getTexture()) + ".bmp";
				texture.loadFromFile(filePath);
				Sprite sprite(texture);
				sprite.setPosition(fieldX + a * tileSize, fieldY + b * tileSize);
				window.draw(sprite);
			}
		}
		minesCounterField.setText(std::to_string(minesCounter));
		minesCounterField.loop(window);
		window.draw(minesCounterAboveText);

		window.display();
	}
}