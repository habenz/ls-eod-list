import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    // As written this just overwrites keys so it's up to the user to make
    // sure the key doesn't already exist.
    const stored = window.localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return { value, setValue };
}
