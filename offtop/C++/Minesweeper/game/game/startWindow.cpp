#include <SFML/Graphics.hpp>
#include <string>
#include "TextField.h"
#include "Button.h"
#include "strings.h"

using namespace sf;

int * startWindow() {

	int mines;
	int sizeX;
	int sizeY;

	const int maxSize = 30;
	const int minSize = 4;
	const int minMines = 4;

	const int windowWidth = 640;
	const int windowHeight = 120;

	Image icon;
	icon.loadFromFile("source\\9.bmp");
	RenderWindow window(VideoMode(windowWidth, windowHeight), string_windowTitle, Style::Close);
	window.setIcon(icon.getSize().x, icon.getSize().y, icon.getPixelsPtr());

	Font font;
	font.loadFromFile("source\\calibri.ttf");

	const float textFieldWidth = 100.0;
	const float textFieldHeight = 30.0;

	const float minesFieldX = windowWidth / 4 - textFieldWidth / 2;
	const float minesFieldY = windowHeight / 2 - textFieldHeight / 2;

	TextField minesField(textFieldWidth, textFieldHeight, minesFieldX, minesFieldY, false, 20, 2);
	minesField.setFont(font);
	minesField.setOnlyNumbers(true);
	minesField.setDefaultText("32");

	Text minesFieldAboveText;
	minesFieldAboveText.setPosition(minesFieldX, minesFieldY - 25.0);
	minesFieldAboveText.setCharacterSize(14);
	minesFieldAboveText.setFont(font);
	minesFieldAboveText.setFillColor(Color::Black);
	minesFieldAboveText.setOutlineColor(Color::Black);
	minesFieldAboveText.setString(string_minesField);

	Text minesFieldBelowText;
	minesFieldBelowText.setPosition(minesFieldX + 25.0, minesFieldY + textFieldHeight + 5.0);
	minesFieldBelowText.setCharacterSize(12);
	minesFieldBelowText.setFont(font);
	minesFieldBelowText.setFillColor(Color::Black);
	minesFieldBelowText.setOutlineColor(Color::Black);
	minesFieldBelowText.setString(string_minesMin + "\n" + string_minesMax);


	const float sizeFieldsX = windowWidth / 4 * 3 - textFieldWidth / 2;
	const float sizeXFieldY = windowHeight / 2 - textFieldHeight - 5;
	const float sizeYFieldY = windowHeight / 2 + 5;

	TextField sizeXField(textFieldWidth, textFieldHeight, sizeFieldsX, sizeXFieldY, false, 20, 2);
	sizeXField.setFont(font);
	sizeXField.setOnlyNumbers(true);
	sizeXField.setDefaultText("16");

	TextField sizeYField(textFieldWidth, textFieldHeight, sizeFieldsX, sizeYFieldY, false, 20, 2);
	sizeYField.setFont(font);
	sizeYField.setOnlyNumbers(true);
	sizeYField.setDefaultText("16");

	Text sizeFieldsAboveText;
	sizeFieldsAboveText.setPosition(sizeFieldsX, sizeXFieldY - 25.0);
	sizeFieldsAboveText.setCharacterSize(14);
	sizeFieldsAboveText.setFont(font);
	sizeFieldsAboveText.setFillColor(Color::Black);
	sizeFieldsAboveText.setOutlineColor(Color::Black);
	sizeFieldsAboveText.setString(string_fieldSize);

	Text sizeFieldsRightText;
	sizeFieldsRightText.setPosition(sizeFieldsX + textFieldWidth + 20.0, sizeXFieldY +  + 20.0);
	sizeFieldsRightText.setCharacterSize(12);
	sizeFieldsRightText.setFont(font);
	sizeFieldsRightText.setFillColor(Color::Black);
	sizeFieldsRightText.setOutlineColor(Color::Black);
	sizeFieldsRightText.setString(string_fieldSizeMin + "\n" + string_fieldSizeMax);
	
	Text sizeXFieldText;
	sizeXFieldText.setPosition(sizeFieldsX - 15, sizeXFieldY + 3);
	sizeXFieldText.setCharacterSize(14);
	sizeXFieldText.setFont(font);
	sizeXFieldText.setFillColor(Color::Black);
	sizeXFieldText.setOutlineColor(Color::Black);
	sizeXFieldText.setString("X:");

	Text sizeYFieldText;
	sizeYFieldText.setPosition(sizeFieldsX - 15, sizeYFieldY + 3);
	sizeYFieldText.setCharacterSize(14);
	sizeYFieldText.setFont(font);
	sizeYFieldText.setFillColor(Color::Black);
	sizeYFieldText.setOutlineColor(Color::Black);
	sizeYFieldText.setString("Y:");

	const float startButtonWidth = 150.0;
	const float startButtonHeight = 40.0;

	const float startButtonX = windowWidth / 2 - startButtonWidth / 2;
	const float startButtonY = windowHeight / 2 - startButtonHeight / 2;

	Button startButton(startButtonWidth, startButtonHeight, startButtonX, startButtonY);
	startButton.setButtonColor(Color::White);
	startButton.setTextColor(Color::Black);
	startButton.setMouseOverColor(Color::Cyan);
	startButton.setText(25.0, 30, string_start);
	startButton.setFont(font);

	Button langButton(30.0, 20.0, 25.0, 25.0);
	langButton.setButtonColor(Color::White);
	langButton.setTextColor(Color::Black);
	langButton.setMouseOverColor(Color::Cyan);
	langButton.setText(5.0, 10, L"ru");
	langButton.setFont(font);

	Clock cursorClock;

	while (window.isOpen())
	{
		Event event;
		while (window.pollEvent(event))
		{
			switch (event.type) {

			case Event::Closed: {
				window.close();
				exit(0);
			}

			case Event::MouseButtonPressed: {
				int mouseX = Mouse::getPosition(window).x;
				int mouseY = Mouse::getPosition(window).y;
				minesField.mousePressed(mouseX, mouseY);
				sizeXField.mousePressed(mouseX, mouseY);
				sizeYField.mousePressed(mouseX, mouseY);

				if (startButton.isMouseOver(window) == true) {
					mines = std::stoi(minesField.getText());
					sizeX = std::stoi(sizeXField.getText());
					sizeY = std::stoi(sizeYField.getText());

					if (mines < minMines)
						mines = minMines;
					if (sizeX < minSize)
						sizeX = minSize;
					if (sizeY < minSize)
						sizeY = minSize;
					if (sizeX > maxSize)
						sizeX = maxSize;
					if (sizeY > maxSize)
						sizeY = maxSize;

					int *returnArray = new int[3] { mines, sizeX, sizeY };
					return returnArray;												//return
				}
			}

			case Event::KeyPressed: {
				if (event.key.code == Keyboard::BackSpace) {
					minesField.deleteChar();
					sizeXField.deleteChar();
					sizeYField.deleteChar();
				}
				if (event.key.code == Keyboard::Escape) {
					minesField.setSelected(false);
					sizeXField.setSelected(false);
					sizeYField.setSelected(false);
				}
			}
			case Event::TextEntered: {
				minesField.addChar(event.text.unicode);
				sizeXField.addChar(event.text.unicode);
				sizeYField.addChar(event.text.unicode);
			}
			case Event::MouseMoved: {
				startButton.isMouseOver(window);
			}
			}
		}

		static Time showCursorTime;
		static bool showCursor;

		showCursorTime += cursorClock.restart();

		if (showCursorTime >= seconds(0.5f)) {
			showCursor = !showCursor;
			showCursorTime = Time::Zero;
		}

		window.clear(Color::White);

		minesField.loop(window, showCursor);
		sizeXField.loop(window, showCursor);
		sizeYField.loop(window, showCursor);
		startButton.render(window);
		window.draw(minesFieldAboveText);
		window.draw(sizeFieldsAboveText);
		window.draw(sizeXFieldText);
		window.draw(sizeYFieldText);
		window.draw(minesFieldBelowText);
		window.draw(sizeFieldsRightText);

		window.display();
	}

	return 0;
}