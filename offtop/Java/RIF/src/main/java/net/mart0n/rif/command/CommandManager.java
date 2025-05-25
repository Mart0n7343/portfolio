package net.mart0n.rif.command;

import com.mojang.brigadier.CommandDispatcher;
import net.fabricmc.fabric.api.client.command.v2.FabricClientCommandSource;

import java.util.ArrayList;
import java.util.List;


public class CommandManager {

    public static final String ROOT_NAME = "rif";
    public static final String DEBUG_NAME = "debug";

    public static final List<RootCommand> COMMANDS = new ArrayList<>();

    public static void register(CommandDispatcher<FabricClientCommandSource> dispatcher) {
        for (RootCommand command : COMMANDS) {
            command.register(dispatcher);
        }
    }

    static {
        COMMANDS.add(new DebugCommand());
    }
}
