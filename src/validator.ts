import axios from "axios";

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
    return axios("https://mora-bot.kr/api/v1/grammar", {
      method: "GET",
      params: {
        string: text,
      },
    });
  },
};
