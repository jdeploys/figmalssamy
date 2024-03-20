import { PostPluginMessagePayload } from './types';

figma.showUI(__html__, { height: 600, width: 350 });

const getSelectionList = () => {
  const firstSelected = figma.currentPage.selection[0];
  return (
    firstSelected?.type === 'FRAME'
      ? firstSelected.findAll((row) => row.type === 'TEXT')
      : []
  ) as TextNode[];
};

figma.on('selectionchange', async () => {
  figma.ui.postMessage({
    type: 'selection-change',
    selection: getSelectionList().map((textNode) => {
      return {
        id: textNode.id,
        characters: textNode.characters,
      };
    }),
  });
});

figma.ui.onmessage = async (payload: PostPluginMessagePayload) => {
  if (payload.type === 'updateText') {
    const selectionList = getSelectionList();
    const targetNode = selectionList.find((row) => row.id === payload.payload.nodeId);
    if (!targetNode) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await figma.loadFontAsync(targetNode.fontName);
    targetNode.characters = payload.payload.text;
  }
};
