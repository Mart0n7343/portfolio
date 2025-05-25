package net.mart0n.rif.util;

import net.mart0n.rif.Rif;
import net.minecraft.client.MinecraftClient;

import java.io.File;

public class FileUtils {

    public static File getConfigDir() {
        return new File(MinecraftClient.getInstance().runDirectory, "config");
    }

    public static File getModConfigDir() {
        return new File(getConfigDir(), Rif.MOD_ID);
    }

    //public static File getLevelFile() {
    //    return new File(getModConfigDir(), )
    //}

}
