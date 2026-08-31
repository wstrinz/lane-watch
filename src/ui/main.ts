import { mount } from "svelte";
import "@xyflow/svelte/dist/style.css";
import App from "./App.svelte";
import "./ui.css";

mount(App, { target: document.querySelector("#app")! });
