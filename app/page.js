'use client'

import { useState, useEffect } from "react"
import { Search, Menu, X, Star, MapPin, ChevronLeft, ChevronRight, Phone, Mail, Instagram, Users, Bed, Bath, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const WhatsAppButton = ({ listing, className = "" }) => {
  const whatsappNumber = "5521976860759"
  const message = `Olá! Tenho interesse em "${listing?.title || 'propriedade'}". Vi no site.`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  return (
    <Button 
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      onClick={(e) => {
        e.preventDefault();
        window.open(whatsappUrl, '_blank')
      }}
    >
      WhatsApp
    </Button>
  )
}

const VillasNavbar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-800">
              <div className="text-sm font-normal text-gray-600">WORDMASTER</div>
              <div className="text-base font-bold text-gray-900 -mt-1">in BÚZIOS</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Mansões</Link>
            <Link href="/iates" className="text-gray-700 hover:text-gray-900 font-medium">Iates</Link>
            <Link href="/escuna" className="text-gray-700 hover:text-gray-900 font-medium">Escuna</Link>
            <Link href="/transfer" className="text-gray-700 hover:text-gray-900 font-medium">Transfer</Link>
            <Link href="/buggy" className="text-gray-700 hover:text-gray-900 font-medium">Buggy</Link>
            <Link href="/login" className="text-blue-700 hover:text-blue-900 font-medium">Admin</Link>
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
              <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Mansões</Link>
              <Link href="/iates" className="text-gray-700 hover:text-gray-900 font-medium">Iates</Link>
              <Link href="/escuna" className="text-gray-700 hover:text-gray-900 font-medium">Escuna</Link>
              <Link href="/transfer" className="text-gray-700 hover:text-gray-900 font-medium">Transfer</Link>
              <Link href="/buggy" className="text-gray-700 hover:text-gray-900 font-medium">Buggy</Link>
              <Link href="/login" className="text-blue-700 hover:text-blue-900 font-medium">Admin</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const HeroSection = () => (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1920&h=1080&fit=crop&crop=center"
          alt="Piscina de uma mansão de luxo em Búzios"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wide">
            UM PORTAL PARA O LUXO
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 tracking-wider opacity-90">
            EXPLORE NOSSAS PROPRIEDADES EM BÚZIOS
          </p>
        </div>
      </div>
    </div>
)

const PropertyCard = ({ listing, category }) => {
  const getCategoryImage = (category) => {
    const images = {
      mansoes: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center',
      iates: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop&crop=center',
      escuna: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center',
      transfer: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center',
      buggy: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center'
    }
    return images[category] || images.mansoes
  }

  const imageUrl = (listing && listing.featured_image && listing.featured_image.startsWith('http'))
    ? listing.featured_image
    : getCategoryImage(category);

  return (
    <Link href={`/${category}/${listing.slug || listing.id}`}>
      <Card className="group bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">{listing.title}</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed h-10">{listing.subtitle}</p>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">A partir de</span>
                <div className="text-2xl font-semibold text-gray-900">{listing.price_label || 'Consulte'}</div>
              </div>
              <WhatsAppButton listing={listing} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

const CategorySection = ({ title, listings, category }) => {
  if (!listings || listings.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16"><h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">{title}</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {listings.slice(0, 4).map((listing) => (<PropertyCard key={listing.id} listing={listing} category={category}/>))}
        </div>
        {listings.length > 0 && (<div className="text-center mt-12"><Link href={`/${category}`}><Button variant="outline" size="lg">Ver todas as opções de {category}</Button></Link></div>)}
      </div>
    </section>
  )
}

const Footer = () => (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16"><div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div><div className="text-2xl font-bold text-gray-800 mb-6"><div className="text-sm font-normal text-gray-600">WORDMASTER</div><div className="text-base font-bold text-gray-900 -mt-1">in BÚZIOS</div></div><p className="text-gray-600 mb-6">Experiências de luxo em Búzios.</p></div>
        <div><h4 className="text-lg font-medium text-gray-900 mb-6">Categorias</h4><div className="space-y-3"><Link href="/mansoes" className="block text-gray-600 hover:text-gray-900">Mansões</Link><Link href="/iates" className="block text-gray-600 hover:text-gray-900">Iates</Link><Link href="/transfer" className="block text-gray-600 hover:text-gray-900">Transfer</Link><Link href="/escuna" className="block text-gray-600 hover:text-gray-900">Escuna</Link></div></div>
        <div><h4 className="text-lg font-medium text-gray-900 mb-6">Contato</h4><div className="space-y-3"><p className="text-gray-600">+55 21 97686-0759</p><p className="text-gray-600">wordmaster01@outlook.com</p></div></div>
        <div><h4 className="text-lg font-medium text-gray-900 mb-6">Admin</h4><div className="space-y-3"><Link href="/login" className="block text-blue-600 hover:text-blue-800">Painel Administrativo</Link></div></div>
      </div><div className="border-t border-gray-200 mt-12 pt-8 text-center"><p className="text-gray-500">© 2025 Wordmaster Beach Búzios. Todos os direitos reservados.</p></div></div>
    </footer>
)

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [allListings, setAllListings] = useState({ mansoes: [], iates: [], escuna: [], transfer: [], buggy: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllListings = async () => {
        setLoading(true);
        try {
            const categories = ['mansoes', 'iates', 'escuna', 'transfer', 'buggy'];
            const fetchPromises = categories.map(category => fetch(`/api/listings?category=${category}&limit=4`).then(res => res.ok ? res.json() : { listings: [] }));
            const results = await Promise.all(fetchPromises);
            const fetchedListings = { mansoes: results[0]?.listings || [], iates: results[1]?.listings || [], escuna: results[2]?.listings || [], transfer: results[3]?.listings || [], buggy: results[4]?.listings || [], };
            setAllListings(fetchedListings);
        } catch (error) {
            console.error("Falha ao buscar dados da API.", error);
        } finally {
            setLoading(false);
        }
    };
    fetchAllListings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <VillasNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      {loading ? (<div className="py-20 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div><p className="mt-4 text-gray-600">Carregando...</p></div>) : (
        <>
          <CategorySection title="MANSÕES EM DESTAQUE" listings={allListings.mansoes} category="mansoes" />
          <CategorySection title="IATES E LANCHAS" listings={allListings.iates} category="iates" />
          <CategorySection title="PASSEIOS DE ESCUNA" listings={allListings.escuna} category="escuna" />
          <CategorySection title="TRANSFER & TÁXI AÉREO" listings={allListings.transfer} category="transfer" />
        </>
      )}
      <Footer />
      <div className="fixed bottom-6 right-6 z-50"><button onClick={() => window.open('https://wa.me/5521976860759', '_blank')} className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110"><Phone className="w-6 h-6" /></button></div>
    </div>
  )
}