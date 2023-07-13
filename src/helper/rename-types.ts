export const renameTypes = [
  { value: "number1", name: "数字" },
  { value: "number2", name: "数字（左侧补0）" },
  { value: "lowercase", name: "字母（小写）" },
  { value: "uppercase", name: "字母（大写）" },
] as const;

export type IRenameValueEnum = (typeof renameTypes)[number]["value"];

const getReplaceName = (rule: string, str: string) => {
  return rule.replace(/\?/, str);
};

export type IRenameActionParams = {
  rule: string;
  idx: number;
  len?: number;
};

const renameAsNumber1 = (params: IRenameActionParams): string => {
  return getReplaceName(params.rule, params.idx.toString());
};

const renameAsNumber2 = (params: IRenameActionParams): string => {
  let suffixIdx = params.idx.toString();
  if (params.len) {
    suffixIdx = suffixIdx.padStart(params.len, "0");
  }
  return getReplaceName(params.rule, suffixIdx);
};

const getLetterSuffix = (idx: number): string => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  while (idx > 0) {
    const remainder = (idx - 1) % 26;
    result = letters[remainder] + result;
    idx = Math.floor((idx - 1) / 26);
  }
  return result;
};

const renameAsLowercase = (params: IRenameActionParams): string => {
  return getReplaceName(params.rule, getLetterSuffix(params.idx + 1));
};

const renameAsUppercase = (params: IRenameActionParams): string => {
  return getReplaceName(
    params.rule,
    getLetterSuffix(params.idx + 1).toUpperCase()
  );
};

export const renameAction: {
  [key in IRenameValueEnum]: (args: IRenameActionParams) => string;
} = {
  number1: renameAsNumber1,
  number2: renameAsNumber2,
  lowercase: renameAsLowercase,
  uppercase: renameAsUppercase,
};
