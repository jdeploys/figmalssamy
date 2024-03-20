figma.showUI(__html__, { height: 300, width: 350 });

figma.on("selectionchange", async () => {
  const firstSelected = figma.currentPage.selection[0];
  figma.ui.postMessage({
    type: "selection-change",
    isComponentSelected: figma.currentPage.selection.length > 0,
    selection:
      firstSelected?.type === "FRAME"
        ? firstSelected
            .findAll((row) => row.type === "TEXT")
            // @ts-ignore
            .map((textNode: TextNode) => {
              console.log(textNode);
              return {
                id: textNode.id,
                characters: textNode.characters,
              };
            })
        : [],
  });
});
