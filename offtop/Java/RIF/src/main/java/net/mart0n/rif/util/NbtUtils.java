package net.mart0n.rif.util;

import net.minecraft.nbt.NbtCompound;
import net.minecraft.util.math.Vec3i;

public class NbtUtils {

    public static NbtCompound blockPosToNbt(Vec3i blockPos) {

        NbtCompound nbt = new NbtCompound();

        nbt.putInt("x", blockPos.getX());
        nbt.putInt("y", blockPos.getY());
        nbt.putInt("z", blockPos.getZ());

        return nbt;
    }

    public static Vec3i blockPosFromNbt(NbtCompound nbt) {

        return new Vec3i(
                nbt.getInt("x"),
                nbt.getInt("y"),
                nbt.getInt("z")
        );
    }
}
