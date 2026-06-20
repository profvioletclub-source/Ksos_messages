self.addEventListener("install", () => {
  console.log("Service worker installé");
});

self.addEventListener("activate", () => {
  console.log("Service worker activé");
});
