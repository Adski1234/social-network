import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Social Network',
  description: 'A social network app',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <Navbar/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}