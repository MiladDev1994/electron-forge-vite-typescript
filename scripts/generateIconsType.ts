import path from "path";
import fs, { readdirSync, writeFileSync } from "fs";

const typePath = path.join(process.cwd(), "src", "renderer", "components", "Icon", "type.ts")
const iconsPath = path.join(process.cwd(), "src", "assets", "icons")
const icons = readdirSync(iconsPath)
let iconsName: string[] = []
icons.forEach((icon) => {
    if (icon.includes(".svg")) iconsName.push(icon.replace(".svg", ""))
})

const generateTypes = () => {
    var types = ``
    iconsName.forEach((icon, index) => {
        types += `${!!index ? "\n" : ""}  "${icon}"?: string;`
    })
    return types
}

const iconType = `
export type TIcon = {
${generateTypes()}
}
`
writeFileSync(typePath, iconType)