import { CSSProperties, useContext } from "react";
import styles from "./Icon.module.scss";
import { IconContext } from "../../../../src/renderer/providers/IconProvider";
import { TIcon } from "./type";
import { twMerge } from "tailwind-merge";

type TIconProps = {
  name: keyof TIcon;
  style?: CSSProperties;
  className?: string;
}
const Icon = ({
  name,
  className = "",
}: TIconProps) => {
  const icons = useContext(IconContext)
  const svgUrl = icons[name];

  if (!svgUrl || !name) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <div
      style={{
        // "--mask-color": color,
        // "--mask-background": background,
        "--mask-src": `url("${svgUrl}")`,
      } as CSSProperties}
      className={twMerge("w-10 aspect-square after:bg-black", styles.container, className ?? "")}
    />
  );
};

export default Icon;

