/// <reference types="react-scripts" />
import { TApi } from "./src/main/preload";
import type { ElectronHandler } from "./src/preload";

declare global {
  interface Window {
    api: TApi;
  }
}