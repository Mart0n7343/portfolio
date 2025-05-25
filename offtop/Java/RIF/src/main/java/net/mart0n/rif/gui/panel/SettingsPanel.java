package net.mart0n.rif.gui.panel;

import net.mart0n.rif.gui.widget.AbstractPanel;
import net.mart0n.rif.gui.widget.ListEntryButton;
import net.minecraft.text.Text;

public class SettingsPanel extends AbstractPanel {

    public SettingsPanel() {
        super(null);

        ListEntryButton button = new ListEntryButton(null);
        button.setText(Text.literal("testestestestestest"));
        button.setDimensions(10, 10, 50, 20);
        children.add(button);
    }
}
