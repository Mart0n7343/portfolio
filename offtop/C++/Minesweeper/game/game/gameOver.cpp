#include <SFML/Graphics.hpp>
#include "Button.h"
#include "strings.h"

using namespace sf;

bool gameOver(bool isVictory) {

	std::wstring result = isVictory ? string_win : string_lose;

	const int windowWidth = 640;
	const int windowHeight = 120;

	Image icon;
	icon.loadFromFile("source\\9.bmp");
	RenderWindow window(VideoMode(windowWidth, windowHeight), string_windowTitle, Style::Close);
	window.setIcon(icon.getSize().x, icon.getSize().y, icon.getPixelsPtr());

	Font font;
	font.loadFromFile("source\\calibri.ttf");

	const float titleX = windowWidth / 2.0 - 65.0;
	const float titleY = windowHeight / 2.0 - 20.0;
	const float subtitleY = windowHeight / 2.0 + 5.0;

	Text title;
	title.setPosition(titleX, titleY);
	title.setCharacterSize(20);
	title.setFont(font);
	title.setFillColor(Color::Black);
	title.setOutlineColor(Color::Black);
	title.setString(string_gameOver);

	Text subtitle;
	subtitle.setPosition(titleX, subtitleY);
	subtitle.setCharacterSize(20);
	subtitle.setFont(font);
	subtitle.setFillColor(Color::Black);
	subtitle.setOutlineColor(Color::Black);
	subtitle.setString(result);

	const float buttonWidth = 150.0;
	const float buttonHeight = 40.0;
	const float buttonY = windowHeight / 2 - buttonHeight / 2;

	const float restartButtonX = windowWidth / 4 - buttonWidth / 2;
	
	Button restartButton(buttonWidth, buttonHeight, restartButtonX, buttonY);
	restartButton.setTextColor(Color::Black);
	restartButton.setButtonColor(Color::White);
	restartButton.setMouseOverColor(Color::Cyan);
	restartButton.setFont(font);
	restartButton.setText(25.0, 30, string_restart);

	const float exitButtonX = windowWidth / 4 * 3 - buttonWidth / 2;

	Button exitButton(buttonWidth, buttonHeight, exitButtonX, buttonY);
	exitButton.setTextColor(Color::Black);
	exitButton.setButtonColor(Color::White);
	exitButton.setMouseOverColor(Color::Cyan);
	exitButton.setFont(font);
	exitButton.setText(27.0, 30, string_exit);

	while (window.isOpen()) {

		Event event;
		while (window.pollEvent(event)) {

			switch (event.type) {

			case Event::Closed: {
				window.close();
				return false;
			}
			case Event::MouseButtonPressed: {
				if (restartButton.isMouseOver(window) == true) {
					window.close();
					return true;
				}
				if (exitButton.isMouseOver(window) == true) {
					window.close();
					return false;
				}
			}
			case Event::KeyPressed: {
				if (event.key.code == Keyboard::Escape) {
					window.close();
					return false;
				}
			}
			case Event::MouseMoved: {
				exitButton.isMouseOver(window);
				restartButton.isMouseOver(window);
			}
			}
		}

		window.clear(Color::White);
		window.draw(title);
		window.draw(subtitle);
		restartButton.render(window);
		exitButton.render(window);
		window.display();
	}
}