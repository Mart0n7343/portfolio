package net.mart0n.rif.util;

import net.minecraft.client.MinecraftClient;
import net.minecraft.client.network.ClientPlayNetworkHandler;
import net.minecraft.client.network.ServerInfo;
import net.minecraft.network.ClientConnection;
import net.minecraft.server.integrated.IntegratedServer;
import net.minecraft.util.Identifier;
import net.minecraft.world.World;
import org.jetbrains.annotations.Nullable;

public class LevelUtils {

    @Nullable
    public static String getCurrentLevelName() {
        MinecraftClient mc = MinecraftClient.getInstance();

        if (mc.isIntegratedServerRunning()) {
            IntegratedServer server = mc.getServer();
            if (server != null) {
                return server.getSaveProperties().getLevelName();
            }
        } else {
            if (mc.isConnectedToLocalServer()) {
                ClientPlayNetworkHandler handler = mc.getNetworkHandler();
                if (handler != null) {
                    ClientConnection connection = handler.getConnection();
                    return connection.getAddress().toString();
                }
            }
            ServerInfo server = mc.getCurrentServerEntry();
            if (server != null) {
                return server.address;
            }
        }

        return null;
    }

    @Nullable
    public static String getDimension(World world) {
        Identifier dim = world.getRegistryKey().getValue();
        return dim != null ? dim.getNamespace() + ":" + dim.getPath() : null;
    }
}
