#pragma once

#include <iostream>

class Tile {

public:
	Tile() 
	{
	}
	
	void setMine() {
		isMine = true;
	}

	void setPos(int a, int b) {
		x = a;
		y = b;
	}

	void setNumber(Tile ** grid, int fieldWidth, int fieldHeight) {

		if (!isTopBordered() && !isLeftBordered()) 
			tl_isMine = grid[x - 1][y - 1].getIsMine();
		
		if (!isTopBordered()) 
			tc_isMine = grid[x][y - 1].getIsMine();
		
		if (!isTopBordered() && !isRightBordered(fieldWidth)) 
			tr_isMine = grid[x + 1][y - 1].getIsMine();
		
		if (!isLeftBordered()) 
			cl_isMine = grid[x - 1][y].getIsMine();
		
		if (!isRightBordered(fieldWidth)) 
			cr_isMine = grid[x + 1][y].getIsMine();
		
		if (!isBottomBordered(fieldHeight) && !isLeftBordered()) 
			bl_isMine = grid[x - 1][y + 1].getIsMine();

		if (!isBottomBordered(fieldHeight))
			bc_isMine = grid[x][y + 1].getIsMine();

		if (!isBottomBordered(fieldHeight) && !isRightBordered(fieldWidth))
			br_isMine = grid[x + 1][y + 1].getIsMine();

		number = tl_isMine + tc_isMine + tr_isMine + cl_isMine + cr_isMine + bl_isMine + bc_isMine + br_isMine;
		if (number > 0)
			isNumber = true;
	}

	bool checkNeighbours(int a, int b) {
		return (
			(x		== a && y		== b) ||
			(x + 1	== a && y		== b) ||
			(x - 1	== a && y		== b) ||
			(x		== a && y + 1	== b) ||
			(x + 1	== a && y + 1	== b) ||
			(x - 1	== a && y + 1	== b) ||
			(x		== a && y - 1	== b) ||
			(x + 1	== a && y - 1	== b) ||
			(x - 1	== a && y - 1	== b)
			);
	}

	bool expose(bool toExposeUndefined = false, bool toExposeFalseFlag = false, bool toExposeAsNotActivated = false) {
		if ((isFlag && !toExposeFalseFlag) || (isUndefined && !toExposeUndefined) || (isExposed && !isNumber))
			return false;

		if (isFlag && !isMine && toExposeFalseFlag) {
			texture = 13;
			return false;
		}

		if (isMine) {
			if (toExposeAsNotActivated)
				texture = 9;
			else
				texture = 12;
			return true;
		}

		if (isNumber && !isExposed) {
			texture = number;
			return false;
		}

		if (isNumber && isExposed) {

		}
		
		isExposed = true;
		texture = 0;
		return false;
	}

	void exposeNeighbours(Tile** grid, int fieldWidth, int fieldHeight) {

		if (!isTopBordered() && !isLeftBordered())
			if (!grid[x - 1][y - 1].getIsMine())
				grid[x - 1][y - 1].expose();

		if (!isTopBordered())
			if (!grid[x][y - 1].getIsMine())
				grid[x][y - 1].expose();

		if (!isTopBordered() && !isRightBordered(fieldWidth))
			if (!grid[x + 1][y - 1].getIsMine())
				grid[x + 1][y - 1].expose();

		if (!isLeftBordered())
			if (!grid[x - 1][y].getIsMine())
				grid[x - 1][y].expose();

		if (!isRightBordered(fieldWidth))
			if (!grid[x + 1][y].getIsMine())
				grid[x + 1][y].expose();

		if (!isBottomBordered(fieldHeight) && !isLeftBordered())
			if (!grid[x - 1][y + 1].getIsMine())
				grid[x - 1][y + 1].expose();

		if (!isBottomBordered(fieldHeight))
			if (!grid[x][y + 1].getIsMine())
				grid[x][y + 1].expose();

		if (!isBottomBordered(fieldHeight) && !isRightBordered(fieldWidth))
			if (!grid[x + 1][y + 1].getIsMine())
				grid[x + 1][y + 1].expose();

		neighboursExposed = true;
	}
	
	int setFlag(bool isOutOfFlags) {
		if (isOutOfFlags && !isFlag)
			return 0;
		if (isExposed)
			return 0;
		isFlag = !isFlag;
		isUndefined = false;
		if (isFlag) {
			texture = 10;
			return -1;
		}
		else {
			texture = 11;
			return 1;
		}
	}

	void setUndefined() {
		if (isExposed) 
			return void();
		isUndefined = !isUndefined;
		isFlag = false;
		if (isUndefined) 
			texture = 14;
		else 
			texture = 11;
	}

	bool getIsMine() {
		return isMine;
	}
	
	int getTexture() {
		return texture;
	}

	bool getIsEmptyExposed() {
		return (isExposed && !isNumber && !isMine && !neighboursExposed);
	}

private:
	bool isMine = false;
	bool isExposed = false;
	bool isNumber = false;

	bool isFlag = false;
	bool isUndefined = false;

	bool neighboursExposed = false;

	bool tl_isMine = false;
	bool tc_isMine = false;
	bool tr_isMine = false;
	bool cl_isMine = false;
	bool cr_isMine = false;
	bool bl_isMine = false;
	bool bc_isMine = false;
	bool br_isMine = false;

	int number;
	int x;
	int y;
	int texture = 11;
	int neighbourCounter = -1;

	bool isTopBordered() {
		return (y == 0);
	}
	bool isBottomBordered(int fieldHeight) {
		return (y == fieldHeight - 1);
	}
	bool isLeftBordered() {
		return (x == 0);
	}
	bool isRightBordered(int fieldWidth) {
		return (x == fieldWidth - 1);
	}

	bool clickOnNumber() {
		for (int i = 0, int c = 0; i < 8, c >= number; i++) {

		}
	}

	Tile getNeighbours(Tile** grid) {
		neighbourCounter++;
		if (neighbourCounter == 8) neighbourCounter = 0;

		switch (neighbourCounter) {
		case 0: {
			return grid[x - 1][y - 1];
		}
		case 1: {
			return grid[x][y - 1];
		}
		case 2: {
			return grid[x + 1][y - 1];
		}
		case 3: {
			return grid[x - 1][y];
		}
		case 4: {
			return grid[x + 1][y];
		}
		case 5: {
			return grid[x - 1][y + 1];
		}
		case 6: {
			return grid[x][y + 1];
		}
		case 7: {
			return grid[x + 1][y + 1];
		}
		}
	}
};