import '@logseq/libs';
import {BlockEntity, BlockUUIDTuple} from "@logseq/libs/dist/LSPlugin";
import {fetchBlockEntityArray, isBlockEntityArray} from "./utils";

/**
 * Check if the significant character of a string is ltr or rtl
 * Significant is defined as member of ltrChars or rtlChars
 *
 * From https://github.com/c3founder/Roam-Enhancement/blob/main/enhancedLanguage.js
 *
 * @param {string} s
 */
function isRTL(s) {
    let ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

    return rtlDirCheck.test(s);
}

export const rtlIndicator = "rtl-indicator"

export async function applyRTL(block: BlockEntity) {
    let sibling = await logseq.Editor.getPreviousSiblingBlock(block.uuid)

    let isContentRTL = isRTL(block.content)
    let isMarkedRTL = sibling ? sibling.content.startsWith("#" + rtlIndicator) : false

    if (isContentRTL && !isMarkedRTL) {
        await logseq.Editor.insertBlock(block.uuid, "#" + rtlIndicator, {
            before: true,
        })
    }

    if (!isContentRTL && isMarkedRTL) {
        await logseq.Editor.removeBlock(sibling.uuid)
    }
}

export async function applyRTLRecursively(blocks: BlockEntity[]) {
    if (blocks == null || blocks.length == 0) {
        return
    }

    for (let block of blocks) {
        if (!block.uuid) {
            continue
        }
        await applyRTL(block)

        if (isBlockEntityArray(block.children)) {
            await applyRTLRecursively(block.children)
        } else {
            await applyRTLRecursively(await fetchBlockEntityArray(block.children as BlockUUIDTuple[]))
        }
    }

    // Remove the last block if it is an orphaned (because blocks can only clean their previous siblings)
    let lastBlock = blocks[blocks.length - 1];
    if (lastBlock.content.startsWith("#" + rtlIndicator)) {
        await logseq.Editor.removeBlock(lastBlock.uuid)
    }
}