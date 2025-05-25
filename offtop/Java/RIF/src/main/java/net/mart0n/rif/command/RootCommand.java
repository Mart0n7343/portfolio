package net.mart0n.rif.command;

import com.mojang.brigadier.CommandDispatcher;
import com.mojang.brigadier.builder.LiteralArgumentBuilder;
import net.fabricmc.fabric.api.client.command.v2.FabricClientCommandSource;
import net.mart0n.rif.gui.Gui;

import static com.mojang.brigadier.builder.LiteralArgumentBuilder.literal;

public abstract class RootCommand {

    public abstract String getName();

    public abstract void build(LiteralArgumentBuilder<FabricClientCommandSource> builder);

    public final void register(CommandDispatcher<FabricClientCommandSource> dispatcher) {
        LiteralArgumentBuilder<FabricClientCommandSource> argument = literal(this.getName());
        this.build(argument);
        LiteralArgumentBuilder<FabricClientCommandSource> rootCommand = LiteralArgumentBuilder.<FabricClientCommandSource>literal(CommandManager.ROOT_NAME).executes(context -> {
            Gui.scheduledToOpen = true;
            return 0;
                });
        dispatcher.register(rootCommand.then(argument));
    }
}
