package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.listener.IScrollListener;
import net.minecraft.client.MinecraftClient;

public abstract class AbstractScrollablePanel extends AbstractPanel implements IScrollListener {

    public static final int DEFAULT_SCROLLBAR_WIDTH = 6;

    protected int scrollingSpeed = 15;
    protected int horizontalValue = 0;
    protected int horizontalExcess = 0;
    protected final Scrollbar horizontalScrollbar;
    protected int verticalValue = 0;
    protected int verticalExcess = 0;
    protected final Scrollbar verticalScrollbar;


    public AbstractScrollablePanel(AbstractPanel parent) {
        super(parent);
        this.verticalScrollbar = new Scrollbar(this, true);
        this.horizontalScrollbar = new Scrollbar(this, false);
        children.add(verticalScrollbar);
        children.add(horizontalScrollbar);
    }

    @Override
    public void scroll(int horizontalAmount, int verticalAmount) {
        setHorizontalValue(horizontalValue - horizontalAmount * scrollingSpeed);
        setVerticalValue(verticalValue - verticalAmount * scrollingSpeed);
        verticalScrollbar.init(verticalExcess, verticalValue);
        horizontalScrollbar.init(horizontalExcess, horizontalValue);
    }

    @Override
    public void init() {
        verticalScrollbar.setDimensions(width, 0, DEFAULT_SCROLLBAR_WIDTH, height);
        horizontalScrollbar.setDimensions(0, height - DEFAULT_SCROLLBAR_WIDTH, width, DEFAULT_SCROLLBAR_WIDTH);

        verticalExcess = getVerticalExcess();
        horizontalExcess = getHorizontalExcess();
        if (verticalExcess > 0) {
            verticalScrollbar.setEnabled(true);
            verticalScrollbar.setVisible(true);
            verticalScrollbar.init(verticalExcess, verticalValue);
        } else {
            verticalScrollbar.setEnabled(false);
            verticalScrollbar.setVisible(false);
        }

        if (horizontalExcess > 0) {
            verticalScrollbar.setEnabled(true);
            verticalScrollbar.setVisible(true);
            horizontalScrollbar.init(horizontalExcess, horizontalValue);
        } else {
            horizontalScrollbar.setEnabled(false);
            horizontalScrollbar.setVisible(false);
        }
    }

    @Override
    public boolean mouseScrolled(int mouseX, int mouseY, double horizontalAmount, double verticalAmount) {
        super.mouseScrolled(mouseX, mouseY, horizontalAmount, verticalAmount);
        if (!isMouseOver(mouseX, mouseY)) return false;
        scroll((int) horizontalAmount, (int) verticalAmount);
        return true;
    }

    public void setScrollingSpeed(int scrollingSpeed) {
        this.scrollingSpeed = scrollingSpeed;
    }

    public int getScrollingSpeed() {
        return scrollingSpeed;
    }

    protected abstract int getVerticalExcess();

    protected abstract int getHorizontalExcess();

    protected void setVerticalValue(int verticalValue) {
        this.verticalValue = Math.max(0, Math.min(verticalValue, verticalExcess));
    }

    public void setHorizontalValue(int horizontalValue) {
        this.horizontalValue = Math.max(0, Math.min(horizontalValue, horizontalExcess));
    }

    public int getVerticalValue() {
        return verticalValue;
    }

    public int getHorizontalValue() {
        return horizontalValue;
    }
}
