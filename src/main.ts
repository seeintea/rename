import { createApp } from "vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import "material-icons/iconfont/material-icons.css";
import "./index.css";
import App from "./App.vue";

createApp(App).use(createVuestic()).mount("#app");
