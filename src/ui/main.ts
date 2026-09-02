import { mount } from "svelte";
import "@xyflow/svelte/dist/style.css";
import App from "./App.svelte";
import "./ui.css";
import "./interpretation.css";
import "./command-center.css";
import "./active-lanes.css";

mount(App, { target: document.querySelector("#app")! });
