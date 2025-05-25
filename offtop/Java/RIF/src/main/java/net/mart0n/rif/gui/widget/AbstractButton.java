package net.mart0n.rif.gui.widget;

import net.mart0n.rif.gui.listener.IActionListener;
import org.jetbrains.annotations.Nullable;

public abstract class AbstractButton extends AbstractWidget {

    @Nullable
    protected IActionListener actionListener;

    public AbstractButton(AbstractPanel parent) {
        super(parent);
    }

    public void setActionListener(@Nullable IActionListener actionListener) {
        this.actionListener = actionListener;
    }

    public @Nullable IActionListener getActionListener() {
        return actionListener;
    }

    protected void action(int mouseButton) {
        if (actionListener != null) {
            actionListener.action(mouseButton);
        }
    }

    @Override
    public boolean mouseClicked(int mouseX, int mouseY, int mouseButton) {
        if (!isMouseOver(mouseX, mouseY)) return false;
        action(mouseButton);
        return true;
    }
}
