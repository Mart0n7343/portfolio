package net.mart0n.rif.mixin;

import net.mart0n.rif.gui.Gui;
import net.minecraft.client.network.ClientPlayerEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(ClientPlayerEntity.class)
public class ClientPlayerEntityMixin {

    @Inject(at = @At("RETURN"), method = "tick")
    public void tick(CallbackInfo ci) {

        if(Gui.scheduledToOpen) {
           Gui.scheduledToOpen = false;
           Gui.open();
        }
    }
}
