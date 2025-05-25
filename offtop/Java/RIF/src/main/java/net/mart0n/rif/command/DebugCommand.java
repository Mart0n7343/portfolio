package net.mart0n.rif.command;

import com.mojang.brigadier.builder.LiteralArgumentBuilder;
import com.mojang.brigadier.context.CommandContext;
import net.fabricmc.fabric.api.client.command.v2.FabricClientCommandSource;

import static net.mart0n.rif.command.CommandManager.DEBUG_NAME;

public class DebugCommand extends RootCommand {
    @Override
    public String getName() {
        return DEBUG_NAME;
    }

    @Override
    public void build(LiteralArgumentBuilder<FabricClientCommandSource> builder) {
        builder.executes(this::debug);
    }

    private int debug(CommandContext<FabricClientCommandSource> context) {
        return 0;
    }
}
