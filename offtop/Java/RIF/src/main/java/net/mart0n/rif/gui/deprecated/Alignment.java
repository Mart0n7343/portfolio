package net.mart0n.rif.gui.deprecated;

public enum Alignment {

    TOP_LEFT    (0,     0),
    TOP         (0.5f,  0),
    TOP_RIGHT   (1,     0),

    LEFT        (0,     0.5f),
    CENTER      (0.5f,  0.5f),
    RIGHT       (1,     0.5f),

    BOTTOM_LEFT (0,     1),
    BOTTOM      (0.5f,  1),
    BOTTOM_RIGHT(1,     1);

    public final float x;
    public final float y;

    Alignment(float x, float y) {
        this.x = x;
        this.y = y;
    }
}