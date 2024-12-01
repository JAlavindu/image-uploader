"use client"; // This directive marks the file as a Client Component

import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
}
