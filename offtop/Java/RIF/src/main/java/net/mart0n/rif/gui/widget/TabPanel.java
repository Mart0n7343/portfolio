package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.listener.IActionListener;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.text.Text;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class TabPanel extends AbstractPanel {

    public static int DEFAULT_OUTLINE_THICKNESS = 3;

    @Nullable
    private Tab selectedTab;
    private TabPanelLayout layout;

    public TabPanel(AbstractPanel parent) {
        super(parent);
    }

    public void addTab(int width, int height, Text text, IActionListener action, boolean selected) {
        Tab tab = new Tab(this, width, height, text, action);
        if (selected) this.selectedTab = tab;
        this.children.add(tab);
    }

    public void setSelectedTab(@Nullable Tab selectedTab) {
        this.selectedTab = selectedTab;
    }

    public @Nullable Tab getSelectedTab() {
        return selectedTab;
    }

    public void setLayout(boolean horizontal, float alignmentX, float alignmentY, int interval) {
        this.layout = new TabPanelLayout(horizontal, alignmentX, alignmentY, interval);
    }

    public TabPanelLayout getLayout() {
        return layout;
    }

    @Override
    public void init() {
        if (layout == null) return;

        int w = 0, h = 0;
        for (AbstractWidget child : children) {
            w += child.getWidth();
            h += child.getHeight();
        }

        if (layout.horizontal()) {
            w += layout.interval() * (children.size() - 1);
            int x = Math.round((this.width - w) * layout.alignmentX());
            for (AbstractWidget child : children) {
                child.setX(x);
                child.setY(Math.round((this.height - child.getHeight()) * layout.alignmentY()));
                x += child.getWidth() + layout.interval();
            }
        } else {
            h += layout.interval() * (children.size() - 1);
            int y = Math.round((this.height - h) * layout.alignmentY());
            for (AbstractWidget child : children) {
                child.setX(Math.round((this.width - child.getWidth()) * layout.alignmentX()));
                child.setY(y);
                y += child.getHeight() + layout.interval();
            }
        }
    }

    public class Tab extends Button {

        private final TabPanel parent;

        public Tab(TabPanel parent, int width, int height, Text text, IActionListener actionListener) {
            super(parent);
            this.parent = parent;
            this.width = width;
            this.height = height;
            this.text = text;
            this.actionListener = actionListener;
        }

        @Override
        protected void action(int mouseButton) {
            parent.setSelectedTab(this);
            super.action(mouseButton);
        }

        public boolean isSelected() {
            return parent.getSelectedTab() == this;
        }

        @Override
        protected int getBgColor(int mouseX, int mouseY) {
            return isEnabled() ? isMouseOver(mouseX, mouseY) || isSelected() ? style.bgHovered : style.bgDefault : style.bgDisabled;
        }

        @Override
        protected int getTextColor(int mouseX, int mouseY) {
            return isEnabled() ? isMouseOver(mouseX, mouseY) || isSelected() ? style.textDefault : style.textNotHovered : style.textDisabled;
        }

        @Override
        public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
            if (!visible) return;
            super.render(context, mouseX, mouseY);

            if (isSelected()) {
                if (parent.getLayout().horizontal()) {
                    int y0 = getAbsoluteY() + Math.round(height * parent.getLayout().alignmentY());
                    context.fill(getAbsoluteX(), y0 - DEFAULT_OUTLINE_THICKNESS, getAbsoluteX() + width, y0, 2, style.outlineSelected);
                } else {
                    int x0 = getAbsoluteX() + Math.round(width * parent.getLayout().alignmentX());
                    context.fill(x0 - DEFAULT_OUTLINE_THICKNESS, getAbsoluteY(), x0, getAbsoluteY() + height, 2, style.outlineSelected);
                }
            }
        }
    }

    public record TabPanelLayout(boolean horizontal, float alignmentX, float alignmentY, int interval) {}
}