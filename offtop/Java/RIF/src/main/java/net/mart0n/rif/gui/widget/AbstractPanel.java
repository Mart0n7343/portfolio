package net.mart0n.rif.gui.widget;

import net.minecraft.client.gui.DrawContext;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractPanel extends AbstractWidget {

    protected final List<AbstractWidget> children = new ArrayList<>();

    public AbstractPanel(AbstractPanel parent) {
        super(parent);
    }

    public List<AbstractWidget> getChildren() {
        return children;
    }

    public void clear() {
        children.clear();
    }

    @Override
    public boolean mouseClicked(int mouseX, int mouseY, int mouseButton) {
        boolean result = false;
        for (AbstractWidget child : children) {
            if(child != null && child.isEnabled()) {
                result = child.mouseClicked(mouseX, mouseY, mouseButton);
            }
        }
        return result;
    }

    @Override
    public boolean mouseDragged(int mouseX, int mouseY, int mouseButton, double deltaX, double deltaY) {
        boolean result = false;
        for (AbstractWidget child : children) {
            if(child != null && child.isEnabled()) {
                result = child.mouseDragged(mouseX, mouseY, mouseButton, deltaX, deltaY);
            }
        }
        return result;
    }

    @Override
    public boolean mouseReleased(int mouseX, int mouseY, int mouseButton) {
        boolean result = false;
        for (AbstractWidget child : children) {
            if(child != null && child.isEnabled()) {
                result = child.mouseReleased(mouseX, mouseY, mouseButton);
            }
        }
        return result;
    }

    @Override
    public boolean mouseScrolled(int mouseX, int mouseY, double horizontalAmount, double verticalAmount) {
        boolean result = false;
        for (AbstractWidget child : children) {
            if(child != null && child.isEnabled()) {
                result = child.mouseScrolled(mouseX, mouseY, horizontalAmount, verticalAmount);
            }
        }
        return result;
    }

    @Override
    public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
        children.forEach(child -> {
            if (child != null && child.isVisible()) child.render(context, mouseX, mouseY);
        });
    }
}
