import {BlockEntity, BlockUUIDTuple} from "@logseq/libs/dist/LSPlugin";

export function isBlockEntityArray(blocks : (BlockEntity | BlockUUIDTuple)[]) : blocks is BlockEntity[] {
    if (blocks.length == 0) {
        return false
    }
    return (blocks[0] as BlockEntity).uuid != null;
}

export async function fetchBlockEntityArray(blocksUUID : BlockUUIDTuple[]) : Promise<BlockEntity[]> {
    return Promise.all(blocksUUID.map(uuidTuple => logseq.Editor.getBlock(uuidTuple[1])))
}
