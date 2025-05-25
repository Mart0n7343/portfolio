package net.mart0n.rif.gui.deprecated;

import net.mart0n.rif.gui.widget.AbstractPanel;
import net.mart0n.rif.gui.widget.AbstractWidget;
import org.jetbrains.annotations.NotNull;

public class Layout {

    @NotNull
    private final AbstractPanel parent;
    private Orientation orientation;
    private Alignment alignment;
    private RelativePos relativePos;
    private int[] intervals;

    public Layout(@NotNull AbstractPanel parent) {
        this.parent = parent;
    }

    public void setOrientation(Orientation orientation) {
        this.orientation = orientation;
    }

    public void setAlignment(Alignment alignment) {
        this.alignment = alignment;
    }

    public void setRelativePos(float x, float y) {
        this.relativePos = new RelativePos(x, y);
    }

    public void setIntervals(int[] intervals) {
        this.intervals = intervals;
    }

    public Orientation getOrientation() {
        return orientation;
    }

    public Alignment getAlignment() {
        return alignment;
    }

    public RelativePos getRelativePos() {
        return relativePos;
    }

    public int[] getIntervals() {
        return intervals;
    }

    public void align() {
        if (this.orientation == Orientation.HORIZONTAL) {
            int x = Math.round(getX() - alignment.x * getTotalWidth());

            for (int i = 0; i < parent.getChildren().size(); i++) {
                AbstractWidget child = parent.getChildren().get(i);

                child.setX(Math.round(x - alignment.x * child.getWidth()));
                child.setY(Math.round(getY() - alignment.y * child.getHeight()));

                x += child.getWidth() + getInterval(i);
            }

        } else {
            int y = Math.round(getY() - alignment.y * getTotalHeight());

            for(int i = 0; i < parent.getChildren().size(); i++) {
                AbstractWidget child = parent.getChildren().get(i);

                child.setX(Math.round(getX() - alignment.x * child.getWidth()));
                child.setY(Math.round(y - alignment.y * child.getHeight()));

                y += child.getHeight() + getInterval(i);
            }
        }
    }

    private int getTotalWidth() {
        return parent.getChildren().stream().mapToInt(AbstractWidget::getWidth).sum() + getIntervalSum();
    }

    private int getTotalHeight() {
        return parent.getChildren().stream().mapToInt(AbstractWidget::getHeight).sum() + getIntervalSum();
    }

    private int getInterval(int i) {
        return intervals[i % intervals.length];
    }

    private int getIntervalSum() {
        int sum = 0;
        for (int i = 0; i < parent.getChildren().size(); i++) {
            sum += getInterval(i);
        }
        return sum;
    }

    /** Relative to parent's position */
    public int getX() {
        return Math.round(parent.getWidth() * relativePos.x());
    }

    public int getY() {
        return Math.round(parent.getHeight() * relativePos.y());
    }

    public void update() {

    }

    /* Useless, unfinished; Orientation(float, float)
    private int tooComplicatedAndNotNeededAlignMethod() {
        float x = getX() - orientation.x * alignment.x * getTotalWidth();
        float y = getY() - orientation.y * alignment.y * getTotalHeight();

        for(int i = 0; i < owner.getChildren().size(); i++) {
            AbstractWidget child = owner.getChildren().get(i);
            child.setX(Math.round(x - alignment.x * child.getWidth()));
            child.setY(Math.round(y - alignment.y * child.getHeight()));
            x += orientation.x * (child.getWidth() + getInterval(i));
            y += orientation.y * (child.getHeight() + getInterval(i));
        }
    }*/
}
