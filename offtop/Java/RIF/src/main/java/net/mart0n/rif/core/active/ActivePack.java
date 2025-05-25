package net.mart0n.rif.core.active;

import net.mart0n.rif.core.RIFPack;
import net.minecraft.util.BlockMirror;
import net.minecraft.util.BlockRotation;
import net.minecraft.util.Identifier;
import net.minecraft.util.math.BlockPos;
import org.jetbrains.annotations.NotNull;

public class ActivePack {

    protected String name;
    protected boolean enabled;
    @NotNull
    protected BlockPos position;
    protected BlockRotation rotation = BlockRotation.NONE;
    protected BlockMirror mirror = BlockMirror.NONE;
    @NotNull
    protected Identifier dimension;
    @NotNull
    protected RIFPack source;



}