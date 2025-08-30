import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

const jetbrain = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"]
});

export const metadata = {
  title: "Method Sync",
  description: "Sync your code with friends in real-time."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrain.variable} antialiased`}>{children}</body>
    </html>
  );
}
