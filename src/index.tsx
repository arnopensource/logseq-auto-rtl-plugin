import '@logseq/libs';
import {applyRTL, applyRTLRecursively, rtlIndicator} from "./rtl";
import {selectBlockWithRef} from "./utils";

const main = async () => {
  console.log('logseq-auto-rl-plugin loaded');

  await applyRTLRecursively(await logseq.Editor.getCurrentPageBlocksTree())
  logseq.App.onRouteChanged(async () => {
    await applyRTLRecursively(await logseq.Editor.getCurrentPageBlocksTree())
  })

  window.setInterval(async () => {
    let block = await logseq.Editor.getCurrentBlock()
    if (!block.uuid) {
      return
    }
    await applyRTL(block)
  }, 200);

  logseq.provideStyle(`
    ${selectBlockWithRef("data-refs-self", rtlIndicator)} {
        color: red;
        /*display: none;*/
    }

    ${selectBlockWithRef("data-refs-self", rtlIndicator)} + div {
        direction: rtl;
    }
  `);
};

logseq.ready(main).catch(console.error);
