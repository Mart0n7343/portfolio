package net.mart0n.rif.gui.deprecated;

public enum Orientation {
    HORIZONTAL(1, 0),
    VERTICAL(0, 1);

    public final float x;
    public final float y;

    Orientation(float x, float y) {
        this.x = x;
        this.y = y;
    }
}
