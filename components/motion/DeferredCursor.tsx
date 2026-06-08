"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./CustomCursor").then((m) => m.CustomCursor), {
  ssr: false,
});

/**
 * Mounts the CustomCursor only after the browser is idle post-FCP so it
 * never blocks the critical render path. Falls back to a 250ms timeout
 * when `requestIdleCallback` isn't available (Safari).
 */
export function DeferredCursor() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    type IdleHandle = number;
    type IdleCallback = (cb: IdleRequestCallback) => IdleHandle;
    const ric: IdleCallback | undefined = (
      window as unknown as { requestIdleCallback?: IdleCallback }
    ).requestIdleCallback;
    let handle: IdleHandle | NodeJS.Timeout;
    if (ric) {
      handle = ric(() => setReady(true));
    } else {
      handle = setTimeout(() => setReady(true), 250);
    }
    return () => {
      const cic = (window as unknown as { cancelIdleCallback?: (h: IdleHandle) => void })
        .cancelIdleCallback;
      if (cic && typeof handle === "number") cic(handle);
      else clearTimeout(handle as NodeJS.Timeout);
    };
  }, []);

  if (!ready) return null;
  return <CustomCursor />;
}
