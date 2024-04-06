import React from 'react';
import SelectionAlert from '@/src/components/alert/SelectionAlert';
import { useSelectionStore } from '@/src/stores/selection';
import { PostPluginMessagePayload } from '@/src/types';
import { Check } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { twMerge } from 'tailwind-merge';
import Loader from '@/src/components/loader/Loader';
import { diffChars } from 'diff';
import { cn } from '@/src/lib/utils';
import GoodAlert from '@/src/components/alert/GoodAlert';

const FixAreaPage = () => {
  const clear = useSelectionStore((state) => state.clear);
  const resultList = useSelectionStore((state) => state.resultList);
  const isLoading = useSelectionStore((state) => state.isLoading);
  const requestToPlugin = (payload: PostPluginMessagePayload) => {
    window.parent.postMessage({ pluginMessage: payload }, '*');
  };

  const submit = () => {
    resultList.forEach((row) => {
      requestToPlugin({
        type: 'updateText',
        payload: {
          text: row.suggestionText,
          nodeId: row.nodeId,
        },
      });
    });
    clear();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (resultList.length && resultList.every((row) => row.isEqual)) {
    return <GoodAlert />;
  }

  return resultList?.length ? (
    <Card>
      <CardHeader>
        <CardTitle>맞춤법 검사 결과</CardTitle>
        <CardDescription>
          교정이 필요한 문구가 {resultList.filter((row) => !row.isEqual).length}개 있어요
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {resultList
          .sort((a, b) => {
            if (!a.isEqual) {
              return -1;
            }
            if (!b.isEqual) {
              return 1;
            }
            return 0;
          })
          .map((row) => {
            return (
              <div
                key={row.nodeId}
                className="grid grid-cols-[18px_1fr] items-start last:mb-0 last:pb-0"
              >
                <span
                  className={twMerge(
                    'flex h-2 w-2 mt-1.5 rounded-full bg-red-500',
                    row.isEqual && 'bg-sky-500'
                  )}
                />
                <p className="text-sm font-medium">
                  {diffChars(row.originalText, row.suggestionText).map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={cn(
                          item.added && 'text-sky-900 bg-sky-300',
                          item.removed && 'line-through text-gray-400'
                        )}
                      >
                        {item.value}
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          })}
      </CardContent>
      <CardFooter>
        <Button className="w-full sticky bottom-0 left-0" onClick={submit}>
          <Check className="mr-2 h-4 w-4" /> 교정 적용
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <SelectionAlert />
  );
};

export default FixAreaPage;
