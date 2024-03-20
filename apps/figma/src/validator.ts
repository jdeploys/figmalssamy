export const vaildator = {
  fetchText: (text: string) => {
    return fetch(
      `https://figmalssamy-web.vercel.app/api/spell?text=${encodeURIComponent(text)}`
    );
  },
};
