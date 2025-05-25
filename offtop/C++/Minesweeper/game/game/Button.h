#pragma once

#include <SFML/Graphics.hpp>

using namespace sf;

class Button {
public:
	Button(float rectW, float rectH, float rectX, float rectY) {
		width = rectW;
		height = rectH;
		x = rectX;
		y = rectY;
	}

	void setText(float tx, int s, std::wstring t) {
		text = t;
		textPosX = x + tx;
		textSize = s;
	}

	void setTextColor(Color tc) {
		textColor = tc;
	}

	void setButtonColor(Color bc) {
		buttonColorInput = bc;
	}

	void setMouseOverColor(Color moc) {
		buttonColorMouseOver = moc;
	}

	bool isMouseOver(RenderWindow& window) {
		int mouseX = Mouse::getPosition(window).x;
		int mouseY = Mouse::getPosition(window).y;

		float x0 = x + width;
		float y0 = y + height;

		if (mouseX >= x && mouseX <= x0 && mouseY >= y && mouseY <= y0) {
			buttonColor = buttonColorMouseOver;
			return true;
		}
		else {
			buttonColor = buttonColorInput;
			return false;
		}
	}

	void setFont(Font& font) {
		textRender.setFont(font);
	}

	void render(RenderWindow& window) {
		RectangleShape buttonRect(Vector2f(width, height));
		buttonRect.setPosition(x, y);
		buttonRect.setFillColor(buttonColor);
		buttonRect.setOutlineThickness(1);
		buttonRect.setOutlineColor(Color::Black);

		float textPosY = y - 3 + (height - textSize) / 2;
		textRender.setPosition(textPosX, textPosY);
		textRender.setCharacterSize(textSize);
		textRender.setFillColor(textColor);
		textRender.setOutlineColor(textColor);
		textRender.setString(text);

		window.draw(buttonRect);
		window.draw(textRender);
	}
private:
	Text textRender;

	float width;
	float height;
	float x = 0.0;
	float y = 0.0;

	int textSize = 15;

	std::wstring text;
	float textPosX;
	Color textColor;
	Color buttonColorInput;
	Color buttonColorMouseOver;
	Color buttonColor = buttonColorInput;
};