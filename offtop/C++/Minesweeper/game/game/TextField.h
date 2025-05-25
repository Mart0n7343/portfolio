#pragma once

#include <SFML/Graphics.hpp>

using namespace sf;

class TextField {
public:
	TextField(float rectW, float rectH, float rectX, float rectY, bool sel, int size, int limit) {
		width = rectW;
		height = rectH;
		x = rectX;
		y = rectY;
		isSelected = sel;
		charSize = size;
		charLimit = limit;
		if (sel == true) fieldOutlineColor = Color::Blue;
	}

	void setCharLimit(int limit) {
		charLimit = limit;
	}

	void setSelected(bool sel) {
		isSelected = sel;
	}

	void setOnlyNumbers(bool o_n) {
		onlyNumbers = o_n;
	}

	void setFont(Font& font) {
		textRender.setFont(font);
	}

	void setText(std::string string) {
		text = string;
	}

	void setDefaultText(std::string string) {
		defaultText = string;
	}

	void addChar(int input) {
		if (isSelected == false)
			return void();

		if (onlyNumbers == true && (input < 48 || input > 57))
			return void();

		if (text.length() == charLimit)
			return void();

		if (input >= 128)
			return void();

		text.push_back(static_cast<char>(input));
	}

	void deleteChar() {
		if (isSelected == true && text.length() > 0)
			text.pop_back();
	}

	void loop(RenderWindow& window, bool showCursor = false) {

		RectangleShape field(Vector2f(width, height));
		field.setPosition(x, y);
		field.setFillColor(Color::White);
		field.setOutlineThickness(1);
		field.setOutlineColor(fieldOutlineColor);

		float textPosX = x + 6;
		float textPosY = y - 3 + (height - charSize) / 2;
		textRender.setPosition(textPosX, textPosY);
		textRender.setCharacterSize(charSize);
		textRender.setFillColor(Color::Black);
		textRender.setOutlineColor(Color::Black);
		textRender.setString(text + (isSelected && !(text.length() == charLimit) ? (showCursor ? '_' : ' ') : ' '));

		window.draw(field);
		window.draw(textRender);	
	}

	void mousePressed(int mouseX, int mouseY) {
		float x0 = x + width;
		float y0 = y + height;
		isSelected = (mouseX >= x && mouseX <= x0 && mouseY >= y && mouseY <= y0);
	}

	std::string getText() {
		if (text.length() == 0)
			text = defaultText;
		return text;
	}

private:

	Text textRender;
	std::string text;
	std::string defaultText;

	Color fieldOutlineColor = isSelected ? Color::Blue : Color::Black;

	float width;
	float height;
	float x = 0.0;
	float y = 0.0;

	bool isSelected = false;
	bool onlyNumbers = false;

	int charSize = 20;
	int charLimit = 30;
};
