import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ISettings from "../models/settings.interface";
import { apiUrl } from "../constants/apiUrl";

import { useAtom, atom } from "jotai";

const isDarkMode = atom<string | undefined>(undefined);

export default function useSystemTheme() {
  const [isDark, setIsDark] = useAtom<string | undefined>(isDarkMode);

  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: async (): Promise<ISettings[]> => {
      //TODO: should not be hardcoded
      const res = await fetch(`${apiUrl}/settings?id=2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return res.json();
    },
    enabled: false,
  });

  useEffect(() => {
    const systemTheme = localStorage.getItem("color-theme");

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    if (!systemTheme) {
      settings.refetch().then((s) => {
        const { appearance } = s.data![0];

        if (appearance?.name === "Dark") {
          document.documentElement.classList.add("dark");

          localStorage.setItem("color-theme", "dark");
        } else if (appearance?.name === "Auto (match system)") {
          localStorage.setItem("color-theme", media.matches ? "dark" : "light");
        } else {
          if (media.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      });
    } else {
      if (systemTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (systemTheme === "light") {
        document.documentElement.classList.remove("dark");

        const media = window.matchMedia("(prefers-color-scheme: dark)");

        localStorage.setItem("color-theme", media.matches ? "dark" : "light");

        if (media.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }

    function themeHandler(e: MediaQueryListEvent) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      localStorage.setItem("color-theme", media.matches ? "dark" : "light");

      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    media.addEventListener("change", themeHandler);

    return () => {
      media.removeEventListener("change", themeHandler);
    };
  }, []);
}
