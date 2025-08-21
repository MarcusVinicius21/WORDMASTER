import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wordmaster Beach Búzios - Aluguéis Exclusivos em Búzios',
  description: 'Aluguel de mansões, iates, passeios de escuna, transfer e buggy em Búzios. Contato direto via WhatsApp.',
  keywords: 'búzios, aluguel, mansões, iates, escuna, transfer, buggy, praia, férias',
  openGraph: {
    title: 'Wordmaster Beach Búzios',
    description: 'Aluguéis exclusivos em Búzios',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}