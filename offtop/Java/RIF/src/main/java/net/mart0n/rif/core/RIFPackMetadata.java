package net.mart0n.rif.core;

import net.mart0n.rif.util.NbtUtils;
import net.minecraft.nbt.NbtCompound;
import net.minecraft.util.math.Vec3i;

public class RIFPackMetadata {

    public static final String NAME_NBT_KEY = "Name";
    public static final String DESCRIPTION_NBT_KEY = "Description";
    public static final String TOTAL_ENTITIES_NBT_KEY = "TotalEntities";
    public static final String DEFAULT_POS_NBT_KEY = "DefaultPos";
    public static final String SIZE_NBT_KEY = "Size";
    public static final String MC_VERSION_NBT_KEY = "MinecraftVersion";

    private String name = "Untitled";
    private String description = "";
    private int totalEntities;
    private Vec3i defaultPos = Vec3i.ZERO;
    private Vec3i size = Vec3i.ZERO;
    private int mcVersion;

    public NbtCompound writeToNbt() {

        NbtCompound nbt = new NbtCompound();

        nbt.putString(NAME_NBT_KEY, this.name);
        nbt.putString(DESCRIPTION_NBT_KEY, this.description);
        nbt.putInt(TOTAL_ENTITIES_NBT_KEY, this.totalEntities);
        nbt.put(DEFAULT_POS_NBT_KEY, NbtUtils.blockPosToNbt(this.defaultPos));
        nbt.put(SIZE_NBT_KEY, NbtUtils.blockPosToNbt(this.size));
        nbt.putInt(MC_VERSION_NBT_KEY, this.mcVersion);

        return nbt;
    }

    public void readFromNBT(NbtCompound nbt) {
        this.name = nbt.getString(NAME_NBT_KEY);
        this.description = nbt.getString(DESCRIPTION_NBT_KEY);
        this.totalEntities = nbt.getInt(TOTAL_ENTITIES_NBT_KEY);
        this.defaultPos = NbtUtils.blockPosFromNbt(nbt.getCompound(DEFAULT_POS_NBT_KEY));
        this.size = NbtUtils.blockPosFromNbt(nbt.getCompound(SIZE_NBT_KEY));
        this.mcVersion = nbt.getInt(MC_VERSION_NBT_KEY);
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getTotalEntities() {
        return totalEntities;
    }

    public Vec3i getSize() {
        return size;
    }

    public int getMcVersion() {
        return mcVersion;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTotalEntities(int totalEntities) {
        this.totalEntities = totalEntities;
    }

    public void setSize(Vec3i size) {
        this.size = size;
    }

    public void setMcVersion(int mcVersion) {
        this.mcVersion = mcVersion;
    }
}
