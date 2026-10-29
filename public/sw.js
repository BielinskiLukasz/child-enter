// Offline support for the hosted PWA. The dist/index.html file is standalone
// and works directly from file://; a service worker requires HTTPS or localhost.
const CACHE_NAME = "maly-pociag-artura-shell-v2";

const scopeUrl = (path) => new URL(path, self.registration.scope).href;
const SHELL_URLS = [
  scopeUrl("./"),
  scopeUrl("index.html"),
  scopeUrl("manifest.json"),
  scopeUrl("icons/icon-192.png"),
  scopeUrl("icons/icon-512.png"),
  scopeUrl("icons/maskable-512.png"),
  scopeUrl("icons/apple-touch-icon.png"),
];
const INDEX_URL = scopeUrl("index.html");
const START_URL = scopeUrl("./");

async function cacheResponse(cache, request, response) {
  if (!response?.ok || response.type === "opaque") return;
  try {
    await cache.put(request, response.clone());
  } catch {
    // Quota failures must not prevent the online app from remaining usable.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const required = await fetch(START_URL, { cache: "reload" });
      if (!required.ok) throw new Error("Could not precache the app shell.");
      await cacheResponse(cache, START_URL, required);

      // The HTML is the single-file app; secondary install assets are optional
      // so a missing icon or manifest cannot strand the new service worker.
      await Promise.all(
        SHELL_URLS.filter((url) => url !== START_URL).map(async (url) => {
          try {
            const response = await fetch(url, { cache: "reload" });
            await cacheResponse(cache, url, response);
          } catch {
            // A later online visit can populate non-essential install assets.
          }
        }),
      );
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                (key.startsWith("maly-pociag-artura-shell-") ||
                  key === "artur-train-v1") &&
                key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  if (
    requestUrl.origin !== self.location.origin ||
    !requestUrl.href.startsWith(self.registration.scope)
  ) {
    return;
  }

  const refresh = fetch(request).then(async (response) => {
    const cache = await caches.open(CACHE_NAME);
    await cacheResponse(cache, request, response);
    return response;
  });
  // Register background refresh while the fetch event is still dispatching.
  event.waitUntil(refresh.then(() => undefined).catch(() => undefined));

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      if (request.mode === "navigate") {
        try {
          return await refresh;
        } catch {
          return (
            (await cache.match(request)) ??
            (await cache.match(START_URL)) ??
            (await cache.match(INDEX_URL)) ??
            Response.error()
          );
        }
      }

      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        return await refresh;
      } catch {
        return (await cache.match(request)) ?? Response.error();
      }
    })(),
  );
});
