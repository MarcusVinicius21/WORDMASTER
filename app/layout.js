import { SpeedInsights } from "@vercel/speed-insights/next";
import './globals.css'
import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"; // Importar Button
import { MessageSquare } from "lucide-react"; // Importar ícone

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
  icons: {
    icon: '/logo.png',
  },
}

// Componente do botão flutuante
const FloatingWhatsApp = () => {
  const whatsappNumber = "5521976860759";
  const message = "Olá! Gostaria de mais informações.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="lg"
        className="rounded-full h-16 w-16 bg-green-500 hover:bg-green-600 text-white shadow-xl"
      >
        <MessageSquare className="h-8 w-8" />
      </Button>
    </a>
  );
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <FloatingWhatsApp />
        <SpeedInsights />
      </body>
    </html>
  )
}