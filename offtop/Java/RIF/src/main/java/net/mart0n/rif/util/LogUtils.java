package net.mart0n.rif.util;

import net.minecraft.client.MinecraftClient;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.text.Text;
import net.minecraft.util.Formatting;

public class LogUtils {

    public static void error(String translationKey) {
        sendMessage(Text.translatable(translationKey).formatted(Formatting.RED), false);
    }

    public static void debug(String message) {
        sendMessage(Text.literal(message), false);
        System.out.println(message);

    }

    private static void schedule(Runnable runnable) {
        MinecraftClient.getInstance().execute(runnable);
    }

    private static void sendMessage(Text text, boolean overlay) {
        PlayerEntity player = MinecraftClient.getInstance().player;
        if(player != null) {
            schedule(() -> player.sendMessage(text, overlay));
        }
    }


}
