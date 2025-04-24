import { ProductProvider } from "@/components/Layout/ProductContext";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
            {children}
        </ProductProvider>
      </body>
    </html>
  );
}
