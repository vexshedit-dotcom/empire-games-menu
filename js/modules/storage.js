/** Safe localStorage wrapper (private mode / blocked storage never breaks the site). */
const PREFIX = "eg:";

export const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};
