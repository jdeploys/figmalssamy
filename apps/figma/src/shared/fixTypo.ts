export const rewriteSentence = (sentence: string) => {
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
