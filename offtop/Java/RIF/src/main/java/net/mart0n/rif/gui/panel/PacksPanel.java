package net.mart0n.rif.gui.panel;

import net.mart0n.rif.gui.widget.AbstractPanel;
import net.mart0n.rif.gui.widget.ListPanel;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.text.Text;
import org.jetbrains.annotations.NotNull;

public class PacksPanel extends AbstractPanel {

    protected ListPanel listPanel;

    public PacksPanel() {
        super(null);
        this.listPanel = new ListPanel(this);
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("2222222222"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("333333333"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("4444444444444444444444"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("555555555555555555555555555"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("66666666666666666666666"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("777777777777777777777777777777777777777777777777777"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("8888888888888888888888888888"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("9999999999999999999999999999"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("101010101010101010101"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("11_11_1111_11_11_11_1111_11_11_11_1111_11_11_11_11_11_11"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("12_12_12_12_12_12_12_12_12_12_12_12_12_12_12_"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("13_13_13_13_13_13_13_13_13_13_13_13_13_"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        listPanel.addEntryButton(Text.literal("test"), mouseButton -> {});
        children.add(listPanel);
    }

    @Override
    public void init() {
        listPanel.setDimensions(width / 5, 10, width / 2, height - 20);
        listPanel.init();
    }

    @Override
    public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
        super.render(context, mouseX, mouseY);
    }
}














