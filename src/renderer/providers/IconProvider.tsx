import { createContext, PropsWithChildren } from "react";
import { TIcon } from "../components/Icon/type";

export const IconContext = createContext<TIcon>({});
const svgImports = import.meta.glob("../../assets/icons/**/*.svg", {
  eager: true,
  import: "default",
});

const svgs: TIcon = Object.keys(svgImports).reduce((images: any, path) => {
  const name = path.split("/").pop()?.replace(".svg", "") as string;
  images[name] = svgImports[path];
  return images;
}, {});

const IconProvider = ({ children }: PropsWithChildren) => {

    return (
        <IconContext.Provider value={svgs}>
            {children}
        </IconContext.Provider>
    )
};

export default IconProvider;