package net.mart0n.rif.gui.util;

import net.minecraft.client.font.TextRenderer;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.text.Text;
import net.minecraft.util.Util;
import net.minecraft.util.math.MathHelper;
import org.jetbrains.annotations.NotNull;

public class Drawing {

    public static void thickHorizontalLine(@NotNull DrawContext context, int x1, int x2, int y, int thickness, int color) {
        context.fill(x1, y - thickness / 2 + (thickness + 1) % 2, x2, y + thickness / 2, color);
    }

    public static void thickVerticalLine(@NotNull DrawContext context, int y1, int y2, int x, int thickness, int color) {
        context.fill(x - thickness / 2 + (thickness + 1) % 2, y1, x + thickness / 2, y2, color);
    }

    public static void outline(@NotNull DrawContext context, int x1, int y1, int x2, int y2, int color) {
        context.drawHorizontalLine(x1, x2, y1, color);
        context.drawHorizontalLine(x1, x2, y2, color);
        context.drawVerticalLine(x1, y1, y2, color);
        context.drawVerticalLine(x2, y1, y2, color);
    }

    public static void thickOutline(@NotNull DrawContext context, int x1, int y1, int x2, int y2, int thickness, int color) {
        context.fill(x1, y1, x2, y1 + thickness, color);
        context.fill(x1, y2 - thickness, x2, y2, color);
        context.fill(x1, y1, x1 + thickness, y2, color);
        context.fill(x2 - thickness, y1, x2, y2, color);
    }

    public static void point(@NotNull DrawContext context, int x, int y, int r, int color) {
        context.fill(x - r / 2 + (r + 1) % 2, y - r / 2 + (r + 1) % 2,
                x + r / 2, y + r / 2, color);
    }

    public static void scrollableText(@NotNull DrawContext context, @NotNull TextRenderer textRenderer, @NotNull Text text,
                                      int x1, int y1, int x2, int y2, int color) {
        int w1 = textRenderer.getWidth(text);
        int h1 = textRenderer.fontHeight;
        int h2 = (y1 + y2 - h1 - 4) / 2;
        int w2 = x2 - x1;
        if (w1 > w2) {
            int dw = w1 - w2;
            double t = Util.getMeasuringTimeMs() / 1000.0;
            double mt = Math.max(dw * 0.5, 3.0);
            double f = Math.sin(1.5707963267948966 * Math.cos(6.283185307179586 * t / mt)) / 2.0 + 0.5;
            double dt = MathHelper.lerp(f, 0.0, dw);

            context.enableScissor(x1, y1, x2, y2);
            context.drawTextWithShadow(textRenderer, text, x1 - (int) dt, h2, color);
            context.disableScissor();
        } else {
            context.drawCenteredTextWithShadow(textRenderer, text, (x1 + x2) / 2, h2, color);
        }
    }

    public static void scrollableText(@NotNull DrawContext context, @NotNull TextRenderer textRenderer, @NotNull Text text,
                                      int x1, int x2, int bottomY, int color) {
        scrollableText(context, textRenderer, text, x1, bottomY - textRenderer.fontHeight, x2, bottomY, color);
    }
}
