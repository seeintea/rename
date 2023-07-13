import mitt from "mitt";
import { IRenameValueEnum } from "./rename-types";

type Events = {
  updateRule: { rule: string; action: IRenameValueEnum };
};

const emitter = mitt<Events>();

export default emitter;
