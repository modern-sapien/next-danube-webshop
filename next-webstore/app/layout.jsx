import "./globals.css";
import Header from "./components/header";
import Books from "./components/bookCards"
import BookFilter from "./components/bookFilter";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata = {
  title: "Checkly Webshop",
  description:
    "This is a web application meant for using with combining with your Checkly account to discover how easy it is to create API & Browser checks with the Checkly npm package!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header /> 
        <main className="main-container">{children}        

      </main>
      </body>
    </html>
  );
}
