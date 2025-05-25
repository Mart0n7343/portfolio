package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.util.Style;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.font.TextRenderer;
import net.minecraft.client.gui.DrawContext;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public abstract class AbstractWidget {

    protected int x = 0;
    protected int y = 0;
    protected int width = 1;
    protected int height = 1;
    @Nullable
    protected AbstractPanel parent;
    protected Style style = new Style();
    protected boolean visible = true;
    protected boolean enabled = true;

    public AbstractWidget(@Nullable AbstractPanel parent) {
        this.parent = parent;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public int getAbsoluteX() {
        return parent != null ? this.x + this.parent.getAbsoluteX() : this.x;
    }

    public int getAbsoluteY() {
        return parent != null ? this.y + this.parent.getAbsoluteY() : this.y;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setDimensions(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public void setSize(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public void setPos(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Nullable
    public AbstractPanel getParent() {
        return parent;
    }

    public Style getStyle() {
        return style;
    }

    public void setStyle(Style style) {
        this.style = style;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public void init() {
    }

    public boolean mouseClicked(int mouseX, int mouseY, int mouseButton) {
        return false;
    }

    public boolean mouseDragged(int mouseX, int mouseY, int mouseButton, double deltaX, double deltaY) {
        return false;
    }

    public boolean mouseReleased(int mouseX, int mouseY, int mouseButton) {
        return false;
    }

    public boolean mouseScrolled(int mouseX, int mouseY, double horizontalAmount, double verticalAmount) {
        return false;
    }

    public void mouseMoved(int mouseX, int mouseY) {

    }

    public boolean isMouseOver(int mouseX, int mouseY) {
        return  mouseX >= getAbsoluteX() && mouseX < getAbsoluteX() + this.width &&
                mouseY >= getAbsoluteY() && mouseY < getAbsoluteY() + this.height;
    }

    public boolean keyPressed(int keyCode, int scanCode, int modifiers) {
        return false;
    }

    public boolean keyReleased(int keyCode, int scanCode, int modifiers) {
        return false;
    }

    public TextRenderer getTextRenderer() {
        return MinecraftClient.getInstance().textRenderer;
    }

    public abstract void render(@NotNull DrawContext context, int mouseX, int mouseY);
}