import "./globals.css";
import { Inter, Noto_Serif_SC } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const noto = Noto_Serif_SC({ weight: ["600","700"], subsets: ["latin"], variable: "--font-noto", display: "swap" });

export const metadata = {
  title: "Aileen Portfolio",
  description: "Aesthetic, informative portfolio by Aileen Aryeetey",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${noto.variable}`}>
      <body className="font-[var(--font-inter)] antialiased">{children}</body>
    </html>
  );
}