import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { GrammerResult, vaildator } from './validator';

const UI = () => {
  const [isComponentSelected, setIsComponentSelected] = useState(false);
  const [selectedList, setSelectedList] = useState<TextNode[]>([]);
  const [resultList, setResultList] = useState<GrammerResult[]>([]);

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;
    if (pluginMessage.type === 'selection-change') {
      console.log(pluginMessage.selection);
      setIsComponentSelected(pluginMessage.isComponentSelected);
      setSelectedList(pluginMessage.selection);
    }
  };

  useEffect(() => {
    Promise.all(
      selectedList
        .filter((row) => row.characters)
        .map((row) => vaildator.fetchText(row.characters))
    ).then((result) => {
      result.map((response) => {
        console.log(response);
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
          <p className="text-black font-bold text-lg mb-4">프레임을 선택해보세요</p>
          <div className="space-y-2">
            {selectedList.map((row) => {
              return (
                <div key={row.id} className="text-blue-600">
                  {row.characters}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('react-page')!);

root.render(<UI />);
