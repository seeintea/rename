const valid: RegExp = /(\*|\"|<|>|\||\.|\/|\\|:)/g;

export const validFilename: RegExp=  /(\*|\"|<|>|\||\.|\/|\\|:|\?)/g;

export const isValidReplaceName = (
  name: string
): { valid: boolean; message: string } => {
  const value = name.replace(/？/g, "?");
  const replaceCount = (name.match(/\?/g) || []).length;
  if (replaceCount === 0) {
    return { valid: false, message: "未检测替换符，请修改后重试！" };
  }
  if (replaceCount > 1) {
    return { valid: false, message: "检测到多个替换符，请修改后重试！" };
  }
  if (valid.test(value)) {
    return { valid: false, message: "含有特殊字符，请修改后重试！" };
  }
  return { valid: true, message: "" };
};
