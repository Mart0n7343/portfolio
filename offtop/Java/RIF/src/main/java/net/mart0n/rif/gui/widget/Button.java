package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.util.Drawing;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.font.TextRenderer;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.text.Text;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class Button extends AbstractButton {

    @Nullable
    protected Text text;

    public Button(AbstractPanel parent) {
        super(parent);
    }

    public Button(AbstractPanel parent, int x, int y, int width, int height) {
        super(parent);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public void setText(@Nullable Text text) {
        this.text = text;
    }

    public @Nullable Text getText() {
        return text;
    }

    protected int getBgColor(int mouseX, int mouseY) {
        return isEnabled() ? isMouseOver(mouseX, mouseY) ? style.bgHovered : style.bgDefault : style.bgDisabled;
    }

    protected int getTextColor(int mouseX, int mouseY) {
        return isEnabled() ? isMouseOver(mouseX, mouseY) ? style.textDefault : style.textNotHovered : style.textDisabled;
    }

    public void renderBg(@NotNull DrawContext context, int mouseX, int mouseY) {
        context.fill(getAbsoluteX(), getAbsoluteY(), getAbsoluteX() + width, getAbsoluteY() + height, getBgColor(mouseX, mouseY));
    }

    public void renderText(@NotNull DrawContext context, int mouseX, int mouseY) {
        TextRenderer textRenderer = MinecraftClient.getInstance().textRenderer;
        if (text != null && textRenderer != null) {
            Drawing.scrollableText(context, textRenderer, text, this.getAbsoluteX(), this.getAbsoluteX() + width, this.getAbsoluteY() + height - 3, getTextColor(mouseX, mouseY));
        }
    }

    @Override
    public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
        if (!visible) return;
        renderBg(context, mouseX, mouseY);
        renderText(context, mouseX, mouseY);
    }
}
