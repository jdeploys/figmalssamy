import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { vaildator } from './validator';
import { PostPluginMessagePayload } from './types';

interface RenderResultListItem {
  nodeId: string;
  originalText: string;
  suggestionText: string;
}

const UI = () => {
  const [selectedList, setSelectedList] = useState<TextNode[]>([]);
  const [resultList, setResultList] = useState<RenderResultListItem[]>([]);

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;
    if (pluginMessage.type === 'selection-change') {
      setSelectedList(pluginMessage.selection);
    }
  };

  const requestToPlugin = (payload: PostPluginMessagePayload) => {
    parent.postMessage({ pluginMessage: payload }, '*');
  };

  const rewriteSentence = (sentence: string) => {
    const periodCount = (sentence.match(new RegExp('\\.', 'g')) || []).length;
    const exclamationCount = (sentence.match(new RegExp('\\!', 'g')) || []).length;
    const questionCount = (sentence.match(new RegExp('\\?', 'g')) || []).length;

    if (periodCount + exclamationCount + questionCount === 1) {
      return sentence.replace(/\.$/, '');
    } else if (periodCount + exclamationCount + questionCount > 1) {
      const lastCharacter = sentence.slice(-1);
      if (lastCharacter !== '.') {
        sentence += '.';
      } else {
        sentence = sentence.replace(/[.!?]+$/, '.');
      }
      return sentence;
    }

    return sentence;
  };

  useEffect(() => {
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
    ).then((fetchResults) => {
      Promise.all(
        fetchResults.map(async (fetchResult) => {
          return {
            nodeId: fetchResult.nodeId,
            originalText: fetchResult.originalText,
            data: await fetchResult.result.json(),
          };
        })
      ).then((jsonResults) => {
        const nextResult: RenderResultListItem[] = [];
        jsonResults.forEach((row) => {
          let computeText = row.originalText;
          if (row.data.suggestions?.[0]) {
            computeText = computeText.replace(row.data.token, row.data.suggestions[0]);
          }
          nextResult.push({
            nodeId: row.nodeId,
            originalText: row.originalText,
            suggestionText: rewriteSentence(computeText),
          });
        });
        setResultList(nextResult);
      });
    });
  }, [selectedList]);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center w-full h-[88px] bg-gray-800 mb-6 px-6">
        <div className="font-be-vietnam-pro text-xl min-w-[248px] whitespace-nowrap text-white text-opacity-100 leading-none tracking-normal font-bold">
          피그말싸미 맞춤법 검사기
        </div>
      </div>
      <div className="p-6">
        <div>
          {resultList?.length ? (
            <div className="space-y-2">
              {resultList.map((row) => {
                return (
                  <div key={row.nodeId} className="flex flex-row items-center gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="text-gray-700 text-xs">{row.originalText}</span>
                      <span className="text-gray-900">{row.suggestionText}</span>
                    </div>
                    <button
                      className="bg-purple-400 rounded text-xs px-3 py-2"
                      onClick={async () => {
                        requestToPlugin({
                          type: 'updateText',
                          payload: {
                            text: row.suggestionText,
                            nodeId: row.nodeId,
                          },
                        });
                      }}
                    >
                      적용
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-black font-bold mb-4">프레임을 선택해보세요</p>
          )}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('react-page')!);

root.render(<UI />);
