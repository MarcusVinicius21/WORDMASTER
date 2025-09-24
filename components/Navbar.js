import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar({ variant = "default" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Define os textos baseado na variante
  const getMenuItems = () => {
    if (variant === "homepage") {
      // Na homepage, mostra apenas os nomes simples
      return [
        { href: "/", label: "Brasil" },
        { href: "/mansoes", label: "Mansões" },
        { href: "/lanchas", label: "Lanchas" },
        { href: "/escuna", label: "Escuna" },
        { href: "/taxi-aereo", label: "Táxi Aéreo" },
        { href: "/transfer", label: "Transfer" },
        { href: "/buggy", label: "Buggy" },
        { href: "/admin", label: "Admin", isAdmin: true }
      ];
    } else {
      // Nas outras páginas, mostra os nomes completos
      return [
        { href: "/", label: "Home" },
        { href: "/mansoes", label: "Aluguel de Mansões" },
        { href: "/lanchas", label: "Aluguel de Lanchas" },
        { href: "/escuna", label: "Passeios de Escuna" },
        { href: "/taxi-aereo", label: "Táxi Aéreo" },
        { href: "/transfer", label: "Transfer" },
        { href: "/buggy", label: "Aluguel de Buggy" },
        { href: "/admin", label: "Admin", isAdmin: true }
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Wordmaster Beach Búzios Logo"
              width={144}
              height={40}
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-sm">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`${
                  item.isAdmin 
                    ? 'text-blue-700 hover:text-blue-900' 
                    : 'text-gray-700 hover:text-gray-900'
                } font-medium`}
              >
                {item.label}
              </Link>
            ))}
            
            {variant === "homepage" && (
              <div className="flex items-center space-x-2 text-gray-600 ml-4">
                <span>PT</span>
                <span>R$ BRL</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm" 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`${
                    item.isAdmin 
                      ? 'text-blue-700 hover:text-blue-900' 
                      : 'text-gray-700 hover:text-gray-900'
                  } font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}