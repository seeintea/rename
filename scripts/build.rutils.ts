import { spawn } from "child_process";

spawn("./build.sh", { stdio: "inherit", cwd: "rutils" });
