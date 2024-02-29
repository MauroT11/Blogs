import { Inter, Exo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";

const inter = Inter({ subsets: ["latin"] });
const exo = Exo_2({ subsets: ["latin"] });

export const metadata = {
  title: "Blogs",
  description: "Website blogs and comments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={exo.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
