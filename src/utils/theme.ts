export function getTheme() {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("theme");
  }
}

export function setTheme(theme: string) {
  if (typeof window !== "undefined") {
    return localStorage?.setItem("theme", theme);
  }
}

export function changeThemeInHTML(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
}
