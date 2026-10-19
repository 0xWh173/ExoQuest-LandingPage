"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#121520",
          color: "#f1f5f9",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    />
  );
}
