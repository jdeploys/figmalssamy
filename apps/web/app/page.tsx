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
    let periodCount = (sentence.match(new RegExp('\\.', "g")) || []).length;
    let exclamationCount = (sentence.match(new RegExp('\\!', "g")) || []).length;
    let questionCount = (sentence.match(new RegExp('\\?', "g")) || []).length;

    if (periodCount + exclamationCount + questionCount === 1) {
      return sentence.replace(/\.$/, "");
    } else if (periodCount + exclamationCount + questionCount > 1) {
      let lastCharacter = sentence.slice(-1);
      if (lastCharacter !== ".") {
        sentence += ".";
      } else {
        sentence = sentence.replace(/[.!?]+$/, ".");
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
    <div className="p-6 bg-black h-screen">
      <div className="flex flex-row items-end gap-4">
        <textarea
          className="text-gray-900 p-2 min-w-[400px] min-h-[400px]"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button className="rounded bg-blue-700 p-3" onClick={checkSpell}>
          검사하기
        </button>
      </div>
      <div className="flex flex-col">
        <label>결과</label>
        <textarea
          className="text-gray-900 p-2 min-w-[400px] min-h-[400px]"
          readOnly
          value={checkSpellResult}
        />
      </div>
    </div>
  );
}
