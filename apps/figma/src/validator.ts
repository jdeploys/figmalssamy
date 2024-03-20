import axios from 'axios';

export interface GrammerResult {
  // 원문
  original: string;
  // 오류
  wrong: string;
  // 추천
  suggestions: string;
  // 해설
  more: string;
}

export const vaildator = {
  fetchText: (text: string) => {
    return axios.get('http://localhost:3000/api/spell', {
      params: {
        text,
      },
    });
  },
};
