import { Metadata } from "next";
import css from "./main.module.css";


export const metadata: Metadata = { 
  title: 'Not Found',
  description: 'Oops...Something went wrong',
  openGraph: {
    title: 'Not Found'.slice(0,10),
    description: 'Oops...Something went wrong'.slice(0, 30),
    url: 'https://notehub.com/not-found',
    images: [{
    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  }]} 
  }
const NotFound = () => {
  return (
    <div>
         <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>

    </div>
  );
};

export default NotFound;