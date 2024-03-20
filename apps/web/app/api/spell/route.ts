import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import hanspell from 'hanspell';

interface CheckSpellResult {
  // 원문
  token: string;
  // 추천 문구
  suggestions: string[];
  // 결과 설명
  info: string;
}

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get('text');
  if (!text) {
    return NextResponse.json(
      { error: '파라미터를 확인해주세요. text 는 필수에요.' },
      { status: 400 }
    );
  }

  try {
    const result = await new Promise((resolve, reject) => {
      let spellResult: CheckSpellResult[] = [];
      const end = () => {
        resolve(spellResult);
      };
      const error = (error: any) => {
        reject(error);
      };
      const check = (data: CheckSpellResult[]) => {
        spellResult.push(...data);
      };
      hanspell.spellCheckByPNU(text, 6000, check, end, error);
    });
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
