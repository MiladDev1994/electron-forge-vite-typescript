// // Import all SVGs as React components
// const modules = import.meta.glob("../../assets/icons/*.svg", { eager: true });

// // Build the `svgs` object
// export const svgs: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> =
//   Object.entries(modules).reduce((acc, [path, mod]) => {
//     const name = path.split("/").pop()?.replace(".svg", "")!;
//     // If you use vite-plugin-svgr with exportAsDefault: true
//     acc[name] = (mod as any).default;
//     return acc;
//   }, {});

// const Icon = ({ name }: { name: string }) => {
//   const Icon = svgs["x"];
//   console.log(Icon);
//   return null
// //   return <Icon width={32} height={32} />;
// };

// export default Icon;



import { CSSProperties } from "react";
import styles from "./Icon.module.scss";
// import { cn } from "../../utils/tailwindUtil";

const svgImports = import.meta.glob("../../assets/icons/**/*.svg", {
  eager: true,
  import: "default",
});

const svgs: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = Object.keys(svgImports).reduce((images: any, path) => {
  const name = path.split("/").pop()?.replace(".svg", "") as string;
  images[name] = svgImports[path];
  return images;
}, {});

const Icon = ({
  name = "",
  width = "1.2em",
  height = "1.2em",
  color = "",
  background = "",
  style = {},
  className = "",
  isCircle = false,
}) => {
  const svgUrl = svgs[name] || "";

  if (!svgUrl) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <div
      style={{
        width: width,
        height: height,
        "--mask-color": color,
        "--mask-background": background,
        "--mask-src": `url("${svgUrl}")`,
        ...style,
        // WebkitMaskImage: `url("${svgUrl}")`,
        // maskImage: `url("${svgUrl}")`,
        // backgroundColor: color || "black",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "cover",
      } as CSSProperties}
      // className={styles.test}
      className={styles.container}
    />
    // <div className={styles.test}></div>
  );
};

export default Icon;

