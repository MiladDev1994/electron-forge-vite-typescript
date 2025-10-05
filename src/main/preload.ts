// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";

const apis = {
    test: (data: boolean) => {ipcRenderer.send("test", data)},
    on: (channel: string, cb: (event: IpcRendererEvent, arg: any) => void) => {
      ipcRenderer.on(channel, cb);
      return () => ipcRenderer.removeListener(channel, cb);
    }
}
contextBridge.exposeInMainWorld("api", apis)
export type TApi = typeof apis
