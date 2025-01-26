import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Global/NavBar/Navbar";
import StoreProvider from "./StoreProviders";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@ant-design/v5-patch-for-react-19';
import Footer from "@/app/components/Global/Footer/Footer";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <div className="fixed lg:relative z-40 bg-white w-full">
            <Navbar />
          </div>
          <div className="pt-12 lg:pt-0">
          {children}
          </div>
          <div>
            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>

  );
}
