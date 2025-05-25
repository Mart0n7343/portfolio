package net.mart0n.rif.gui.util;

public class Style {

    public int bgDefault =          0xE0000000;
    public int bgDisabled =         0x10000000;
    public int bgHovered =          0xE0101010;
    public int outlineDefault =     0xD1D0D0D0;
    public int outlineSelected =    0xFEFFFFFF;
    public int textDefault =        0xFFFFFFFF;
    public int textDisabled =       0xE1505050;
    public int textNotHovered =     0xE4999999;

    public Style() {
    }

    public Style setBgDefault(int bgDefault) {
        this.bgDefault = bgDefault;
        return this;
    }

    public Style setBgDisabled(int bgDisabled) {
        this.bgDisabled = bgDisabled;
        return this;
    }

    public Style setBgHovered(int bgHovered) {
        this.bgHovered = bgHovered;
        return this;
    }

    public Style setOutlineDefault(int outlineDefault) {
        this.outlineDefault = outlineDefault;
        return this;
    }

    public Style setOutlineSelected(int outlineSelected) {
        this.outlineSelected = outlineSelected;
        return this;
    }

    public Style setTextDefault(int textDefault) {
        this.textDefault = textDefault;
        return this;
    }

    public Style setTextDisabled(int textDisabled) {
        this.textDisabled = textDisabled;
        return this;
    }

    public Style setTextNotHovered(int textNotHovered) {
        this.textNotHovered = textNotHovered;
        return this;
    }


}
