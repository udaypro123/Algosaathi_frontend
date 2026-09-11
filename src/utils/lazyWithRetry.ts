import { createElement, lazy, Suspense, type ComponentProps, type ComponentType } from "react";

const lazyWithRetry = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  retries = 2
) => {
  const loadComponent = async (remainingRetries = retries): Promise<{ default: T }> => {
    try {
      return await importFunc();
    } catch (error) {
      const isChunkError =
        (error as Error)?.name === "ChunkLoadError" ||
        (error as Error)?.message?.includes("Failed to fetch dynamically imported module") ||
        (error as Error)?.message?.includes("Loading chunk") ||
        (error as Error)?.message?.includes("Importing a module script failed");

      if (!isChunkError || remainingRetries <= 0) {
        throw error;
      }

      if ("caches" in window) {
        const names = await caches.keys();
        await Promise.all(names.map((name) => caches.delete(name)));
      }

      return loadComponent(remainingRetries - 1);
    }
  };

  const LazyComponent = lazy(loadComponent);

  return (props: ComponentProps<T>) =>
    createElement(
      Suspense,
      { fallback: null },
      createElement(LazyComponent, props)
    );
};

export default lazyWithRetry;