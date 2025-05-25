package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.listener.IActionListener;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.text.Text;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.List;

public class ListPanel extends AbstractScrollablePanel {

    public static final int DEFAULT_ENTRY_HEIGHT = 30;
    public static final int SCROLLING_SPEED = 8;

    @Nullable
    protected AbstractWidget selectedWidget;
    protected final List<AbstractWidget> entries = new ArrayList<>();
    protected int verticalValuePrev = 0;
    protected int horizontalValuePrev = 0;

    public ListPanel(AbstractPanel parent) {
        super(parent);
    }

    public void addEntryButton(Text text, IActionListener actionListener) {
        ListEntryButton listEntryButton = new ListEntryButton(this) {

            @Override
            public boolean isMouseOver(int mouseX, int mouseY) {
                return super.isMouseOver(mouseX, mouseY) &&
                        !(verticalScrollbar.getScrollButton() != null && verticalScrollbar.getScrollButton().isMouseOver(mouseX, mouseY)) &&
                        !(horizontalScrollbar.getScrollButton() != null && horizontalScrollbar.getScrollButton().isMouseOver(mouseX, mouseY));
            }

        };
        listEntryButton.setText(text);
        listEntryButton.setActionListener(actionListener);
        entries.add(listEntryButton);
    }

    @Override
    public void init() {
        super.init();
        for(int i = 0; i < entries.size(); i++) {
            entries.get(i).setDimensions(-horizontalValue, DEFAULT_ENTRY_HEIGHT * i - verticalValue, width, DEFAULT_ENTRY_HEIGHT);
        }
    }

    @Override
    public void scroll(int horizontalAmount, int verticalAmount) {
        super.scroll(horizontalAmount, verticalAmount);
        init();
    }

    @Override
    public boolean mouseScrolled(int mouseX, int mouseY, double horizontalAmount, double verticalAmount) {
        super.mouseScrolled(mouseX, mouseY, horizontalAmount, verticalAmount);
        return true;
    }

    @Override
    protected int getVerticalExcess() {
        return Math.max(entries.size() * DEFAULT_ENTRY_HEIGHT - height, 0);
    }

    @Override
    protected int getHorizontalExcess() {
        return 0;
    }

    @Override
    protected void setVerticalValue(int verticalValue) {
        verticalValuePrev = this.verticalValue;
        super.setVerticalValue(verticalValue);
    }

    @Override
    public void setHorizontalValue(int horizontalValue) {
        horizontalValuePrev = this.horizontalValue;
        super.setHorizontalValue(horizontalValue);
    }

    @Override
    public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
        context.enableScissor(getAbsoluteX(), getAbsoluteY(), getAbsoluteX() + width, getAbsoluteY() + height);
        entries.forEach(entry -> {
            if (entry != null && entry.isVisible()) entry.render(context, mouseX, mouseY);
        });
        context.disableScissor();
        if (verticalScrollbar.isVisible()) verticalScrollbar.render(context, mouseX, mouseY);
        if (horizontalScrollbar.isVisible()) horizontalScrollbar.render(context, mouseX, mouseY);
    }
}
