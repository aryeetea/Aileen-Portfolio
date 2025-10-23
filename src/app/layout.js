import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400","600","700","800"],
  variable: "--font-sans"
});

export const metadata = {
  title: "Aileen — Portfolio",
  description: "UI/UX Designer • Creative Technologist",
};

// ✅ mobile viewport so everything scales nicely
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui" }}>
        {children}
      </body>
    </html>
  );
}