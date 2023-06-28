export const REPLACE_MODE = [
  { value: "0x001", name: "数字" },
  { value: "0x010", name: "数字（左侧补0）" },
  { value: "0x011", name: "字母（小写）" },
  { value: "0x100", name: "字母（大写）" },
] as const;

export type IReplaceMode = (typeof REPLACE_MODE)[number]["value"];
