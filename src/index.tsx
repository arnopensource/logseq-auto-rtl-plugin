import '@logseq/libs';

const main = () => {
  console.log('logseq-auto-rl-plugin loaded');

  window.setInterval(async () => {
    if (!await logseq.Editor.checkEditing()) {
      return
    }


    let block = await logseq.Editor.getCurrentBlock()
    console.log(await logseq.Editor.getBlockProperties(block.uuid))
    // await logseq.Editor.upsertBlockProperty(block.uuid, "editing", true)



  }, 1000);

  logseq.provideStyle(`
    @import url('//style.css');
    /* More fonts here: ht  tps://fonts.google.com/?subset=arabic 
    For example for 'Markazi Text', import the following: */
    @import url('https://fonts.googleapis.com/css?family=Markazi+Text'); 
    @import url(//fonts.googleapis.com/earlyaccess/notonaskharabic.css);
    @import url(//fonts.googleapis.com/earlyaccess/notonaskharabicui.css);
    
    :root {  
      --rm-block-sep-min-width: 0px;
      /*****RTL Variables*****/ 
      --rtl-margin-right: 31px;
      --rtl-margin-left: 31px; 
      --rtl-bullet-margin-top: 5px;
      --rtl-control-margin-top: 4px;
      --rtl-generic-font: san-serif;
      --rtl-font: 'Noto Naskh Arabic'; /*'Markazi Text'*/ /*Make sure you select the generic font first*/
      --rtl-font-size: 1em;
      --rtl-textarea-background-color: rgba(253,253,168,0.53);
      --rtl-textarea-font-size: 1em;
      --rtl-textarea-line-height: 1.75em;
      /*****LTR Variables*****/ 
      --ltr-margin-right: 31px; 
      --ltr-margin-left: 31px; 
      --ltr-bullet-margin-top: unset;
      --ltr-control-margin-top: unset;
      --ltr-generic-font: unset; /*san-serif;*/
      --ltr-font: unset; /*'Lato';*/ /*Make sure you select the generic font first*/
      --ltr-font-size: unset; /*1em;*/
      --ltr-textarea-background-color: rgba(253,253,168,0.53); /*unset;*/
      --ltr-textarea-font-size: unset; /*1em;*/
      --ltr-textarea-line-height: unset; /*1.5em*/
    }
  `);
};

logseq.ready(main).catch(console.error);
