package net.mart0n.rif.core;

import net.minecraft.nbt.NbtCompound;

import java.util.ArrayList;
import java.util.List;

public class RIFPack {

    private final RIFPackMetadata metadata = new RIFPackMetadata();
    private final List<RIFElement> elements = new ArrayList<>();

    public void readFromNbt(NbtCompound nbt) {

        this.metadata.readFromNBT(nbt.getCompound("Metadata"));
    }

   /* public NbtCompound writeToNbt() {
        NbtCompound nbt = new NbtCompound();
    }*/
}
