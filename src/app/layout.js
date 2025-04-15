import { ProductProvider } from "@/components/Layout/ProductContext";
import "./globals.css";
import Header from "@/components/Layout/Header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
          <Header/>
          <div className="container">
            {children}
          </div>
        </ProductProvider>
      </body>
    </html>
  );
}
