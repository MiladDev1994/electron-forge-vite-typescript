/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob(pattern: string, options?: { eager?: boolean }): Record<string, { default: string }>;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}
