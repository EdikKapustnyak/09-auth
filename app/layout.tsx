import type { Metadata } from "next";
import {Roboto } from "next/font/google";
import css from "../app/footer.module.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";


const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: "NoteHub",
  description: "App where you can create your notes",
  openGraph: {
    title: "NoteHub",
    description: "App where you can create your notes",
    url:"https://notehub.com/",
  images: [{
    url:'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  }]}

};


export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
       
        <TanStackProvider>
          <AuthProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <footer>
            <Footer/>
            <p className={css.createdTime}>
              Created <time dateTime="2025">2025</time>
            </p>
            </footer>
            </AuthProvider>
        </TanStackProvider>
        
      </body>
    </html>
  );
}
