import { Inter, Exo_2 } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

const exo = Exo_2({ subsets: ["latin"] });

export const metadata = {
  title: "Track Gallery",
  description: "Website blogs and comments",
};

export default async function RootLayout({ children }) {
  const user = await currentUser();
  const username = user?.username;
  const userId = user?.id;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={exo.className}>
          <Header username={username} userId={userId} />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
