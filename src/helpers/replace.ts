import { IReplaceMode } from "@/constants";

const valid: RegExp = /(\*|\"|<|>|\||\.|\/|\\|:)/g;

export const isValidReplaceName = (name: string) => {
  const value = name.replace(/？/g, "?");
  const replaceCount = (name.match(/\?/g) || []).length;
  if (replaceCount === 0) {
    return false;
  }
  if (valid.test(value) || replaceCount > 1) {
    return false;
  }
  return true;
};

export const getExampleItem = (name: string, mode: IReplaceMode) => {
  let replaceChar = "";
  switch (mode) {
    case "0x001": {
      replaceChar = "1";
      break;
    }
    case "0x010": {
      replaceChar = "01";
      break;
    }
    case "0x011": {
      replaceChar = "a";
      break;
    }
    case "0x100": {
      replaceChar = "A";
      break;
    }
    default:
      break;
  }
  return name.replace(/\?/, replaceChar);
};
