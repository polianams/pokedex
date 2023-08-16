import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header';
import Footer from './components/footer';
import { AuthProvider } from './contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokedex',
  description: 'Criando uma Pokedex usando API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
            {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
