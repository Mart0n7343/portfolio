package net.mart0n.rif.gui.deprecated;

import net.mart0n.rif.gui.widget.AbstractPanel;
import org.jetbrains.annotations.NotNull;

public class PanelLayout {

    @NotNull
    private final AbstractPanel panel;
    private int width;
    private int height;

    /** Angle that defines a two-dimensional vector of arbitrary length, values from 0 to Pi*/
    private float orientationAngle;
    /** */
    private float alignment;
    private int[] intervals;

    public PanelLayout(@NotNull AbstractPanel panel) {
        this.panel = panel;
    }

    public void setOrientationAngle(float orientationAngle) {
        if (orientationAngle < 0) orientationAngle = 0;
        else if (orientationAngle > 90) orientationAngle = 90;
        this.orientationAngle = (float)Math.toRadians(orientationAngle);
    }

    public void setAlignment(float alignment) {
        if (alignment < -1) alignment = -1;
        else if (alignment > 1) alignment = 1;
        this.alignment = alignment;
    }

    public void setIntervals(int ...intervals) {
        this.intervals = intervals;
    }

    public void init() {

    }

    /*public int getWidth() {
        int w = 0;
        for (AbstractWidget child : panel.getChildren()) {

        }
    }

    public int getHeight() {

    }*/

    public int getInterval(int i) {
        return intervals[i % intervals.length];
    }

    public int getAllIntervals() {
        int sum = 0;
        for (int i = 0; i < panel.getChildren().size(); i++) {
            sum += getInterval(i);
        }
        return sum;
    }

    private record RelVec2f(float x, float y) {
        RelVec2f {
            if(x < 0) x = 0;
            else if(x > 1) x = 1;
            if(y < 0) y = 0;
            else if(y > 1) y = 1;

        }
    }
}
