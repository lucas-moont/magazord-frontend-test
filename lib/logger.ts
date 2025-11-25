export const Logger = {
  error: (message: string, error?: unknown) => {
    console.error(`[Error]: ${message}`, error);
  },
  info: (message: string, data?: unknown) => {
    console.log(`[Info]: ${message}`, data);
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[Warn]: ${message}`, data);
  },
};
