import { IpcRendererEvent } from "electron";
import { useEffect, useCallback } from "react";

export const useIpc = <T>(
  channel: string,
  listener: (event: IpcRendererEvent, data: T) => void,
  deps: any[] = []
) => {
  const stableListener = useCallback(listener, deps);

  useEffect(() => {
    if (!stableListener) return;
    const removeListener = window.api.on(channel, stableListener);
    return () => {
      if (removeListener) removeListener();
    };
  }, [channel, stableListener]);
};