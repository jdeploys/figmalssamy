'use client';
import { useState } from 'react';
import axios from 'axios';

interface CheckSpellResult {
  // 원문
  token: string;
  // 추천 문구
  suggestions: string[];
  // 결과 설명
  info: string;
}

export default function Page() {
  const [checkSpellResult, setCheckSpellResult] = useState<string>();
  const [value, setValue] = useState<string>('');

  function rewriteSentence(sentence: string) {
    let periodCount = (sentence.match(new RegExp('\\.', 'g')) || []).length;
    let exclamationCount = (sentence.match(new RegExp('\\!', 'g')) || []).length;
    let questionCount = (sentence.match(new RegExp('\\?', 'g')) || []).length;

    if (periodCount + exclamationCount + questionCount === 1) {
      return sentence.replace(/\.$/, '');
    } else if (periodCount + exclamationCount + questionCount > 1) {
      let lastCharacter = sentence.slice(-1);
      if (lastCharacter !== '.') {
        sentence += '.';
      } else {
        sentence = sentence.replace(/[.!?]+$/, '.');
      }
      return sentence;
    }

    return sentence;
  }

  const getSpellCheck = async (text: string) => {
    const result = await axios.get<CheckSpellResult[]>('/api/spell', {
      params: {
        text,
      },
    });
    let computeText = String(text);
    result.data.forEach((row) => {
      if (row.suggestions[0]) {
        computeText = computeText.replace(row.token, row.suggestions[0]);
      }
    });
    setCheckSpellResult(rewriteSentence(computeText));
  };

  const checkSpell = () => {
    getSpellCheck(value);
  };

  return (
    <div className="p-6 bg-black h-screen text-gray-300">
      <h1 className="font-bold text-xl">맞춤법 검사기</h1>
      <div className="flex flex-col gap-2 mt-6">
        <label>맞춤법 확인할 문장</label>
        <div className="flex flex-row items-end gap-4">
          <textarea
            className="bg-gray-800 p-2 min-w-[400px] min-h-[200px] rounded-md"
            placeholder="여기에 맞춤법 검사할 문장을 적어주세요"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button className="rounded bg-blue-700 px-3 py-2" onClick={checkSpell}>
            검사하기
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <label>결과</label>
        <textarea
          className="bg-gray-800 p-2 min-w-[400px] min-h-[400px] rounded-md"
          placeholder="문장을 작성하고 결과를 확인해보세요"
          readOnly
          value={checkSpellResult}
        />
      </div>
    </div>
  );
}
