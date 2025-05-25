package net.mart0n.rif.gui.panel;

import net.mart0n.rif.gui.Gui;
import net.mart0n.rif.gui.widget.AbstractPanel;
import net.mart0n.rif.gui.widget.AbstractWidget;
import net.mart0n.rif.gui.widget.Button;
import net.mart0n.rif.gui.widget.TabPanel;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.text.Text;
import org.jetbrains.annotations.NotNull;

public class MainPanel extends AbstractPanel {

    public static final int DEFAULT_TAB_WIDTH = 50;
    public static final int DEFAULT_TAB_HEIGHT = 20;
    public static final int DEFAULT_ADD_BUTTON_WIDTH = DEFAULT_TAB_HEIGHT;

    private final TabPanel tabPanel;
    private final Button addButton;

    public MainPanel() {
        super(null);

        this.tabPanel = new TabPanel(this);
        this.addButton = new Button(this);
        tabPanel.addTab(DEFAULT_TAB_WIDTH, DEFAULT_TAB_HEIGHT, Text.translatable("gui.title.tabMenu"),
                mouseButton -> tabCallback(Gui.TabKey.MAIN), Gui.getCurrentContentPanelKey() == Gui.TabKey.MAIN);

        tabPanel.addTab(DEFAULT_TAB_WIDTH, DEFAULT_TAB_HEIGHT, Text.translatable("gui.title.tabSettings"),
                mouseButton -> tabCallback(Gui.TabKey.SETTINGS),Gui.getCurrentContentPanelKey() == Gui.TabKey.SETTINGS);

        tabPanel.addTab(DEFAULT_TAB_WIDTH, DEFAULT_TAB_HEIGHT, Text.translatable("gui.title.tabPacks"),
                mouseButton -> tabCallback(Gui.TabKey.PACKS), Gui.getCurrentContentPanelKey() == Gui.TabKey.PACKS);

        tabPanel.setLayout(true, 0.5f, 1, 0);

        addButton.setText(Text.literal("+"));
        addButton.setActionListener(mouseButton -> {});

        children.add(tabPanel);
        children.add(addButton);
    }

    public void tabCallback(@NotNull Gui.TabKey key) {
        Gui.setContentPanelKey(key);
        if (Gui.getInstance() != null) Gui.getInstance().init();
    }

    @Override
    public void init() {
        tabPanel.setDimensions(0, 0, width, DEFAULT_TAB_HEIGHT);
        tabPanel.init();

        AbstractWidget lastTab = tabPanel.getChildren().getLast();
        addButton.setDimensions(lastTab.getAbsoluteX() + lastTab.getWidth(), lastTab.getAbsoluteY(), DEFAULT_ADD_BUTTON_WIDTH, DEFAULT_TAB_HEIGHT);

    }

    @Override
    public void render(@NotNull DrawContext context, int mouseX, int mouseY) {
        context.fillGradient(getAbsoluteX(), getAbsoluteY(), getAbsoluteX() + width, getAbsoluteY() + height, 0xD0010101, 0xE0010101);
        context.drawHorizontalLine(0, width, height, style.outlineDefault);
        super.render(context, mouseX, mouseY);
    }
}
