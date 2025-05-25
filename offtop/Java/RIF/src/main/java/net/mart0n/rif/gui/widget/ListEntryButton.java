package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.util.Drawing;
import net.mart0n.rif.gui.util.Style;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.font.TextRenderer;
import net.minecraft.client.gui.DrawContext;
import org.jetbrains.annotations.NotNull;

public class ListEntryButton extends Button {

    public static final int BG_DEFAULT = 0xE0333333;
    public static final int BG_HOVERED = 0xE0505050;
    public static final int BG_DISABLED = 0x10090909;
    public static final int DEFAULT_OUTLINE_THICKNESS = 2;

    protected boolean selected = false;

    public ListEntryButton(AbstractPanel parent) {
        super(parent);
        this.style = new Style()
                .setBgDefault(BG_DEFAULT)
                .setBgDisabled(BG_DISABLED)
                .setBgHovered(BG_HOVERED);
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public boolean isSelected() {
        return selected;
    }

    @Override
    public void renderText(@NotNull DrawContext context, int mouseX, int mouseY) {
        TextRenderer textRenderer = MinecraftClient.getInstance().textRenderer;
        if (text != null && textRenderer != null) {
            context.drawTextWithShadow(textRenderer, text, getAbsoluteX() + 5, getAbsoluteY() + (height - textRenderer.fontHeight) / 2, getTextColor(mouseX, mouseY));
        }
    }

    @Override
    public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
        super.render(context, mouseX, mouseY);

        if (selected) {
            Drawing.thickOutline(context, x, y, x + width, y + height, DEFAULT_OUTLINE_THICKNESS, style.outlineSelected);
            Drawing.outline(context, x + DEFAULT_OUTLINE_THICKNESS, y + DEFAULT_OUTLINE_THICKNESS,
                    x + width - DEFAULT_OUTLINE_THICKNESS, y + height - DEFAULT_OUTLINE_THICKNESS, style.outlineDefault);
        }
    }
}
