import { ipcMain } from "electron"

ipcMain.on("test", async (event, data) => {
    return event.sender.send("test", data)
})

export default ipcMain
