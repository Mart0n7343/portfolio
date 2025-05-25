package net.mart0n.rif.data;

import net.minecraft.util.BlockMirror;
import net.minecraft.util.BlockRotation;
import net.minecraft.util.Identifier;
import net.minecraft.util.math.BlockPos;

public class LevelPackData {

    private String name;
    private boolean enabled;
    private BlockPos position;
    private BlockRotation rotation;
    private BlockMirror mirror;
    private Identifier dimension;

    public String getName() {
        return name;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public BlockPos getPosition() {
        return position;
    }

    public BlockRotation getRotation() {
        return rotation;
    }


    public Identifier getDimension() {
        return dimension;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setPosition(BlockPos position) {
        this.position = position;
    }

    public void setRotation(BlockRotation rotation) {
        this.rotation = rotation;
    }

    public void setDimension(Identifier dimension) {
        this.dimension = dimension;
    }
}
