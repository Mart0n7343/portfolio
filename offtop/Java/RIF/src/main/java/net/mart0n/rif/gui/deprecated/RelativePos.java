package net.mart0n.rif.gui.deprecated;

public record RelativePos(float x, float y) {

    public RelativePos {
        if(x < 0) x = 0;
        if(x > 1) x = 1;
        if(y < 0) y = 0;
        if(y > 1) y = 1;
    }
}