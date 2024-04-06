import { create } from 'zustand';
import { vaildator } from '@/src/validator';
import { rewriteSentence } from '@/src/shared/fixTypo';
import { isArray } from 'lodash';
import { useSettingStore } from '@/src/stores/setting';

interface RenderResultListItem {
  nodeId: string;
  originalText: string;
  suggestionText: string;
  isEqual: boolean;
}

interface SelectionStoreAction {
  setSelectedList: (selectedList: TextNode[]) => void;
}
interface SelectionStoreState {
  isLoading: boolean;
  selectedList: TextNode[];
  resultList: RenderResultListItem[];
  clear: () => void;
}

export const useSelectionStore = create<SelectionStoreAction & SelectionStoreState>(
  (setState, getState) => ({
    selectedList: [],
    resultList: [],
    isLoading: false,
    setSelectedList: (selectedList) => {
      setState({ selectedList: selectedList, isLoading: true });

      if (!selectedList.length) {
        setState({
          resultList: [],
          isLoading: false,
        });
        return;
      }

      Promise.all(
        selectedList
          .filter((row) => row.characters)
          .map(async (row) => {
            const result = await vaildator.fetchText(row.characters);
            return {
              nodeId: row.id,
              originalText: row.characters,
              result: result,
            };
          })
      )
        .then((fetchResults) => {
          Promise.all(
            fetchResults.map(async (fetchResult) => {
              return {
                nodeId: fetchResult.nodeId,
                originalText: fetchResult.originalText,
                data: await fetchResult.result.json(),
              };
            })
          )
            .then((jsonResults) => {
              const nextResult: RenderResultListItem[] = [];
              jsonResults.forEach((row) => {
                console.log(row);
                let computeText = row.originalText;
                if (row.data.suggestions?.[0]) {
                  computeText = computeText.replace(
                    row.data.token,
                    row.data.suggestions[0]
                  );
                } else if (isArray(row.data)) {
                  row.data.forEach((item) => {
                    if (item.suggestions?.[0]) {
                      computeText = computeText.replace(item.token, item.suggestions[0]);
                    }
                  });
                }
                const suggestionText = useSettingStore.getState().endPointProcessing
                  ? rewriteSentence(computeText)
                  : computeText;
                nextResult.push({
                  nodeId: row.nodeId,
                  originalText: row.originalText,
                  suggestionText,
                  isEqual: row.originalText === suggestionText,
                });
              });
              setState({
                resultList: nextResult,
                isLoading: false,
              });
            })
            .finally(() => {
              setState({
                isLoading: false,
              });
            });
        })
        .catch(() => {
          setState({
            isLoading: false,
          });
        });
    },
    clear: () => {
      setState({
        isLoading: false,
        resultList: [],
        selectedList: [],
      });
    },
  })
);
