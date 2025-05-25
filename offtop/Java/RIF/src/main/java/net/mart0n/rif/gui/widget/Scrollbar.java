package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.Gui;
import net.mart0n.rif.gui.listener.IScrollListener;
import net.mart0n.rif.gui.util.Style;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.gui.DrawContext;
import org.jetbrains.annotations.NotNull;

public class Scrollbar extends AbstractPanel {

    public static final int SCROLL_BUTTON_BG_DEFAULT = 0xE0111111;
    public static final int SCROLL_BUTTON_BG_HOVERED = 0xE0212121;
    public static final int SCROLL_BUTTON_BG_DISABLED = 0x10090909;

    protected boolean vertical;
    protected final ScrollButton scrollButton;
    protected int value;
    protected int excess;

    public Scrollbar(@NotNull AbstractScrollablePanel parent, boolean vertical) {
        super((AbstractPanel) parent);
        this.vertical = vertical;
        this.scrollButton = new ScrollButton(this);
        this.children.add(scrollButton);
    }

    public void init(int excess, int value) {
        if (parent == null) return;
        if (excess == 0) excess = 1;

        if (vertical) {
            int h = height * parent.getHeight() / (parent.getHeight() + excess);
            scrollButton.setWidth(width);
            scrollButton.setHeight(h);
            scrollButton.setY((height - h) * value / excess);
        } else {
            int w = width * parent.getWidth() / (parent.getWidth() + excess);
            scrollButton.setWidth(w);
            scrollButton.setHeight(height);
            scrollButton.setX((width - w) * value / excess);
        }

        this.value = value;
        this.excess = excess;
    }

    protected void setValue(double delta) {
        this.value += (int) (value + delta < 0 ? 0 : value + delta > excess ? excess : delta);
    }

    protected void changeButtonPos() {
        if (vertical) {
            scrollButton.setY((height - scrollButton.getHeight()) * value / excess);
        } else {
            scrollButton.setX((width - scrollButton.getWidth()) * value / excess);
        }
    }

    public ScrollButton getScrollButton() {
        return scrollButton;
    }

    @Override
    public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
       /* int color = isEnabled() ? style.bgDefault : style.bgDisabled;
        context.fill(getAbsoluteX(), getAbsoluteY(), getAbsoluteX() + width, getAbsoluteY(), color);*/
        super.render(context, mouseX, mouseY);
    }

    @Override
    public boolean mouseScrolled(int mouseX, int mouseY, double horizontalAmount, double verticalAmount) {
        if(!isMouseOver(mouseX, mouseY)) {
            System.out.println("jop4");
            return false;
        }
        ((IScrollListener) parent).scroll(0, (int) verticalAmount);
        return true;
    }

    public class ScrollButton extends AbstractButton {

        protected boolean dragging;

        public ScrollButton(@NotNull Scrollbar parent) {
            super(parent);
            this.style = new Style()
                    .setBgDefault(SCROLL_BUTTON_BG_DEFAULT)
                    .setBgHovered(SCROLL_BUTTON_BG_HOVERED)
                    .setBgDisabled(SCROLL_BUTTON_BG_DISABLED);
        }

        @Override
        public boolean mouseClicked(int mouseX, int mouseY, int mouseButton) {
            if (!isMouseOver(mouseX, mouseY)) return false;
            this.dragging = true;
            return true;
        }

        @Override
        public boolean mouseDragged(int mouseX, int mouseY, int mouseButton, double deltaX, double deltaY) {
            if (!dragging) return false;
            AbstractScrollablePanel superParent = (AbstractScrollablePanel) parent.getParent();
            superParent.scroll(
                    (int) -deltaX * 1920 * 3 / 2 / Gui.getInstance().width / superParent.getScrollingSpeed(),
                    (int) -deltaY * 1080 * 3 / 2 / Gui.getInstance().height / superParent.getScrollingSpeed());
            return true;
        }

        @Override
        public boolean mouseReleased(int mouseX, int mouseY, int mouseButton) {
            if (!dragging) return false;
            this.dragging = false;
            return true;
        }

        @Override
        public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
            int color = isEnabled() ? dragging || isMouseOver(mouseX, mouseY) ? style.bgHovered : style.bgDefault : style.bgDisabled;
            context.fill(getAbsoluteX(), getAbsoluteY(), getAbsoluteX() + width, getAbsoluteY() + height, color);
        }
    }
}
