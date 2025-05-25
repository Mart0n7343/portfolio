package net.mart0n.rif.gui;

import net.mart0n.rif.gui.panel.MainPanel;
import net.mart0n.rif.gui.panel.PacksPanel;
import net.mart0n.rif.gui.widget.AbstractPanel;
import net.mart0n.rif.util.Configurable;
import net.minecraft.client.MinecraftClient;
import net.minecraft.client.gui.DrawContext;
import net.minecraft.client.gui.screen.Screen;
import net.minecraft.screen.ScreenTexts;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.List;

public class Gui extends Screen {

    @Nullable
    private static Gui instance;
    public static boolean scheduledToOpen = false;
    private static TabKey currentContentPanelKey = TabKey.MAIN;

    @Nullable
    private Screen parent;
    private AbstractPanel contentPanel;
    private MainPanel mainPanel;
    private PacksPanel packsPanel;


    protected Gui(Screen parent) {
        super(ScreenTexts.EMPTY);
        this.parent = parent;

        mainPanel = new MainPanel();
        packsPanel = new PacksPanel();
    }

    public void init() {
        mainPanel.setSize(width, 20);
        mainPanel.init();

        switch (currentContentPanelKey) {
            case MAIN -> {
                contentPanel = null;
            }
            case SETTINGS -> {
                contentPanel = null;
            }
            case PACKS -> {
                packsPanel.setDimensions(0, mainPanel.getHeight(), this.width, this.height - mainPanel.getHeight());
                packsPanel.init();
                contentPanel = packsPanel;
            }
        }
    }

    @Override
    public void resize(MinecraftClient client, int width, int height) {
        this.width = width;
        this.height = height;
        init();
    }

    @Configurable
    @Override
    public boolean shouldPause() {
        return false;
    }

    @Override
    public void render(DrawContext context, int mouseX, int mouseY, float delta) {
        renderBackground(context, mouseX, mouseY, delta);

        if(mainPanel != null) mainPanel.render(context, mouseX, mouseY);
        if(contentPanel != null) contentPanel.render(context, mouseX, mouseY);
    }


    @Override
    public boolean mouseClicked(double mouseX, double mouseY, int mouseButton) {
        boolean result = false;
        List<AbstractPanel> panels = new ArrayList<>();
        panels.add(mainPanel);
        panels.add(contentPanel);
        for (AbstractPanel panel : panels) {
            if (panel != null && panel.isEnabled()) {
                result = panel.mouseClicked((int)mouseX, (int)mouseY, mouseButton);
            }
        }
        return result;
    }

    @Override
    public boolean mouseDragged(double mouseX, double mouseY, int mouseButton, double deltaX, double deltaY) {
        boolean result = false;
        List<AbstractPanel> panels = new ArrayList<>();
        panels.add(mainPanel);
        panels.add(contentPanel);
        for (AbstractPanel panel : panels) {
            if (panel != null && panel.isEnabled()) {
                result = panel.mouseDragged((int)mouseX, (int)mouseY, mouseButton, deltaX, deltaY);
            }
        }
        return result;
    }

    @Override
    public boolean mouseReleased(double mouseX, double mouseY, int mouseButton) {
        boolean result = false;
        List<AbstractPanel> panels = new ArrayList<>();
        panels.add(mainPanel);
        panels.add(contentPanel);
        for (AbstractPanel panel : panels) {
            if (panel != null && panel.isEnabled()) {
                result = panel.mouseReleased((int)mouseX, (int)mouseY, mouseButton);
            }
        }
        return result;
    }

    @Override
    public boolean mouseScrolled(double mouseX, double mouseY, double horizontalAmount, double verticalAmount) {
        boolean result = false;
        List<AbstractPanel> panels = new ArrayList<>();
        panels.add(mainPanel);
        panels.add(contentPanel);
        for (AbstractPanel panel : panels) {
            if (panel != null && panel.isEnabled()) {
                result = panel.mouseScrolled((int)mouseX, (int)mouseY, horizontalAmount, verticalAmount);
            }
        }
        return result;
    }

    @Override
    public void mouseMoved(double mouseX, double mouseY) {
    }

    public static @Nullable Gui getInstance() {
        return instance;
    }

    public static void open() {
        Gui.instance = new Gui(MinecraftClient.getInstance().currentScreen);
        MinecraftClient.getInstance().setScreen(instance);
    }

    @Override
    public void close() {
        MinecraftClient.getInstance().setScreen(parent);
    }

    public static void setContentPanelKey(TabKey key) {
        Gui.currentContentPanelKey = key;
    }

    public static TabKey getCurrentContentPanelKey() {
        return currentContentPanelKey;
    }

    public enum TabKey {
        MAIN,
        SETTINGS,
        PACKS
    }
}
