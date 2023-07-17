import mitt from "mitt";
import { IRenameValueEnum } from "./rename-types";

type Events = {
  updateRule: { rule: string; action: IRenameValueEnum };
  exportAsFolder: void;
  exportAsZip: void;
};

const emitter = mitt<Events>();

export default emitter;
