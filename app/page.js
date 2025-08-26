'use client'

import { useState, useEffect, useRef } from "react"
import { Search, Menu, X, Star, MapPin, Calendar, Users, ChevronLeft, ChevronRight, Phone, Mail, Instagram, Eye, Bed, Bath, Home, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// WhatsApp Component
const WhatsAppButton = ({ listing, className = "" }) => {
  const whatsappNumber = "5521976860759"
  const message = `Olá! Tenho interesse em "${listing.title}". Vi no site: ${typeof window !== 'undefined' ? window.location.origin : ''}`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  return (
    <Button 
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      onClick={() => window.open(whatsappUrl, '_blank')}
    >
      WhatsApp
    </Button>
  )
}

// Clean Modern Navbar (Villas in Brazil inspired)
const CleanNavbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const categories = [
    { name: 'Brasil', path: '/' },
    { name: 'Mais destinos', path: '/destinos' },
    { name: 'Mansões', path: '/mansoes' },
    { name: 'Iates', path: '/iates' },
    { name: 'Concierge', path: '/concierge' },
    { name: 'Longo prazo', path: '/longo-prazo' },
    { name: 'Vendas', path: '/vendas' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contato' }
  ]

  return (
    <nav className="bg-white/98 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Villas in Brazil style */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gray-800 tracking-tight">
              <div className="text-sm font-normal text-gray-600 mb-0">WORDMASTER</div>
              <div className="text-base font-bold text-gray-900 -mt-1">in BÚZIOS</div>
            </div>
          </Link>

          {/* Language/Currency like Villas in Brazil */}
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-6">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <div className="h-5 w-px bg-gray-300" />
            
            <div className="flex items-center space-x-4">
              {categories.slice(6).map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <span>PT</span>
              <span>R$ BRL</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm" 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className="text-gray-700 hover:text-gray-900 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Villas in Brazil Style Full Screen Hero
const VillasStyleHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)
  
  const slides = [
    {
      title: "UM PORTAL PARA O LUXO",
      subtitle: "EXPLORE NOSSAS PROPRIEDADES",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&crop=center",
      category: "Mansões"
    },
    {
      title: "EXPERIÊNCIAS NÁUTICAS",
      subtitle: "DESCUBRA NOSSOS IATES",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&crop=center",
      category: "Iates"
    },
    {
      title: "TRANSFER EXECUTIVO", 
      subtitle: "CHEGUE COM EXCLUSIVIDADE",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1920&h=1080&fit=crop&crop=center",
      category: "Transfer"
    }
  ]

  // Auto rotation
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
      }, 6000) // 6 seconds like Villas in Brazil
    }

    startInterval()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
      }, 6000)
    }, 100)
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content - Villas in Brazil style */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wide">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 tracking-wider opacity-90">
            {slides[currentSlide].subtitle}
          </p>
          
          {/* Villas in Brazil Style Search Bar */}
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in e check-out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Selecione as datas"
                    className="pl-10 h-12 border-gray-200 rounded-md"
                  />
                </div>
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hóspedes
                </label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue placeholder="2 hóspedes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hóspede</SelectItem>
                    <SelectItem value="2">2 hóspedes</SelectItem>
                    <SelectItem value="4">4 hóspedes</SelectItem>
                    <SelectItem value="6">6 hóspedes</SelectItem>
                    <SelectItem value="8">8+ hóspedes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue placeholder="Búzios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buzios">Búzios, RJ</SelectItem>
                    <SelectItem value="cabo-frio">Cabo Frio, RJ</SelectItem>
                    <SelectItem value="arraial">Arraial do Cabo, RJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartos
                </label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue placeholder="2 quartos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 quarto</SelectItem>
                    <SelectItem value="2">2 quartos</SelectItem>
                    <SelectItem value="3">3 quartos</SelectItem>
                    <SelectItem value="4">4 quartos</SelectItem>
                    <SelectItem value="5">5+ quartos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="h-12 bg-gray-800 hover:bg-gray-900 text-white font-medium px-8">
                Procurar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Villas in Brazil Style Property Card
const VillasStylePropertyCard = ({ listing, category }) => {
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

  return (
    <Link href={`/${category}/${listing.id}`}>
      <Card className="group bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={getCategoryImage(category)}
            alt={listing.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {listing.neighborhood}
            </span>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {listing.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {listing.subtitle}
          </p>
          
          {/* Property Features - Villas in Brazil style */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            {listing.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span>{listing.bedrooms} Quartos</span>
              </div>
            )}
            {listing.guests && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{listing.guests} pessoas</span>
              </div>
            )}
            {listing.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4" />
                <span>{listing.bathrooms} Banheiros</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">A partir de</span>
                <div className="text-2xl font-semibold text-gray-900">
                  {listing.price_label}
                </div>
                <span className="text-sm text-gray-500">por Noite</span>
              </div>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Detalhes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Villas in Brazil Style Category Section
const VillasStyleCategorySection = ({ title, listings, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, listings.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
            {title}
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {listings.slice(currentIndex, currentIndex + itemsPerView).map((listing) => (
              <VillasStylePropertyCard 
                key={listing.id} 
                listing={listing} 
                category={category}
              />
            ))}
          </div>

          {/* Navigation arrows - only show if more than 4 items */}
          {listings.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow"
                disabled={currentIndex >= maxIndex}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// Villas in Brazil Style Why Us Section
const WhyUsSection = () => {
  return (
    <section className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* For Guests */}
        <div className="relative h-96 lg:h-auto bg-cover bg-center" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center)'
        }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-light mb-4">POR QUE NÓS?</h3>
              <h2 className="text-4xl font-medium mb-6">PARA HÓSPEDES</h2>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Saiba mais
              </Button>
            </div>
          </div>
        </div>
        
        {/* For Owners */}
        <div className="relative h-96 lg:h-auto bg-cover bg-center" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&crop=center)'
        }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-light mb-4">POR QUE NÓS?</h3>
              <h2 className="text-4xl font-medium mb-6">PARA PROPRIETÁRIOS</h2>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Saiba mais
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Clean Footer
const CleanFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-gray-800 tracking-tight mb-6">
              <div className="text-sm font-normal text-gray-600 mb-0">WORDMASTER</div>
              <div className="text-base font-bold text-gray-900 -mt-1">in BÚZIOS</div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Experiências de luxo em Búzios. Mansões, iates, transfers e muito mais.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={() => window.open('https://wa.me/5521976860759', '_blank')}
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={() => window.open('mailto:wordmaster01@outlook.com', '_blank')}
              >
                <Mail className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={() => window.open('https://instagram.com/wordmasterbeachbuzios', '_blank')}
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Destinos</h4>
            <div className="space-y-3">
              <Link href="/mansoes" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Mansões de Luxo
              </Link>
              <Link href="/iates" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Iates & Embarcações
              </Link>
              <Link href="/transfer" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Transfer & Táxi Aéreo
              </Link>
              <Link href="/escuna" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Passeios de Escuna
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Serviços</h4>
            <div className="space-y-3">
              <Link href="/concierge" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Concierge
              </Link>
              <Link href="/longo-prazo" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Longo Prazo
              </Link>
              <Link href="/vendas" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Vendas
              </Link>
              <Link href="/sobre" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Sobre Nós
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Contato</h4>
            <div className="space-y-3">
              <div className="text-gray-600">
                <div className="font-medium">Telefone</div>
                <div>+55 21 97686-0759</div>
              </div>
              <div className="text-gray-600">
                <div className="font-medium">Email</div>
                <div>wordmaster01@outlook.com</div>
              </div>
              <div className="text-gray-600">
                <div className="font-medium">Instagram</div>
                <div>@wordmasterbeachbuzios</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © 2025 Wordmaster Beach Búzios. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Homepage Component
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [allListings, setAllListings] = useState({
    mansoes: [],
    iates: [],
    escuna: [],
    transfer: [],
    buggy: []
  })
  const [loading, setLoading] = useState(true)

  // Enhanced fallback data
  const getFallbackData = () => ({
    mansoes: [
      {
        id: '1',
        title: 'Villa paradisíaca em Geribá',
        subtitle: 'Esta é uma fabulosa cobertura dupla na Vieira Souto, um dos principais cartões-postais da cidade do Rio de Janeiro.',
        category: 'mansoes',
        neighborhood: 'Geribá, Búzios',
        price_label: 'R$ 3.500,00',
        guests: 12,
        bedrooms: 6,
        bathrooms: 5,
        is_featured: true
      },
      {
        id: '2',
        title: 'Luxuosa cobertura triplex no Leblon',
        subtitle: 'O primeiro piso da cobertura está o hall de entrada que inclui uma simples sala com três ambientes.',
        category: 'mansoes',
        neighborhood: 'Leblon',
        price_label: 'R$ 2.500,00',
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        is_featured: true
      },
      {
        id: '3',
        title: 'Mansão de luxo em Itacaré',
        subtitle: 'Uma propriedade única com vista deslumbrante para o mar e piscina privativa.',
        category: 'mansoes',
        neighborhood: 'Pituba',
        price_label: 'R$ 3.250,00',
        guests: 10,
        bedrooms: 5,
        bathrooms: 4,
        is_featured: false
      },
      {
        id: '4',
        title: 'Cobertura de luxo com piscina no Leblon',
        subtitle: 'Vista panorâmica da cidade com acabamentos de primeira linha.',
        category: 'mansoes',
        neighborhood: 'Leblon',
        price_label: 'R$ 6.250,00',
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        is_featured: false
      }
    ],
    iates: [
      {
        id: '4',
        title: 'Iate de luxo de 62 pés',
        subtitle: 'Mega iate com tripulação completa e bar premium para uma experiência única.',
        category: 'iates',
        neighborhood: 'Glória',
        price_label: 'R$ 8.500,00',
        guests: 20,
        is_featured: true
      },
      {
        id: '5',
        title: 'Lancha Segue 58 pés para alugar no Rio',
        subtitle: 'Lancha de alta performance para passeios rápidos e confortáveis.',
        category: 'iates',
        neighborhood: 'Glória',
        price_label: 'R$ 15.000,00',
        guests: 12,
        is_featured: true
      }
    ],
    escuna: [
      {
        id: '6',
        title: 'Escuna Tradicional Búzios',
        subtitle: 'Passeio clássico visitando as 12 praias mais belas.',
        category: 'escuna',
        neighborhood: 'Porto da Barra',
        price_label: 'R$ 180',
        guests: 40,
        is_featured: true
      }
    ],
    transfer: [
      {
        id: '7',
        title: 'Helicóptero Executive',
        subtitle: 'Transfer VIP de helicóptero com vista aérea espetacular.',
        category: 'transfer',
        neighborhood: 'Heliporto',
        price_label: 'R$ 2.500',
        guests: 4,
        is_featured: true
      }
    ],
    buggy: [
      {
        id: '8',
        title: 'Buggy Adventure 4x4',
        subtitle: 'Aventura off-road explorando trilhas selvagens.',
        category: 'buggy',
        neighborhood: 'Base Centro',
        price_label: 'R$ 350',
        guests: 4,
        is_featured: true
      }
    ]
  })

  // Fetch all listings
  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const categories = ['mansoes', 'iates', 'escuna', 'transfer', 'buggy']
        const promises = categories.map(category => 
          fetch(`/api/listings?category=${category}&limit=8`)
            .then(res => res.ok ? res.json() : { listings: [] })
            .catch(() => ({ listings: [] }))
        )
        
        const results = await Promise.all(promises)
        const listingsData = {}
        
        categories.forEach((category, index) => {
          listingsData[category] = results[index].listings || []
        })

        // If no data from API, use fallback
        const fallbackData = getFallbackData()
        Object.keys(listingsData).forEach(category => {
          if (listingsData[category].length === 0) {
            listingsData[category] = fallbackData[category] || []
          }
        })

        setAllListings(listingsData)
      } catch (error) {
        console.error('Error fetching listings:', error)
        setAllListings(getFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchAllListings()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Navbar */}
      <CleanNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Villas Style Hero */}
      <VillasStyleHero />

      {/* Category Sections - Villas in Brazil Style */}
      {!loading && (
        <>
          {allListings.mansoes.length > 0 && (
            <VillasStyleCategorySection 
              title="APARTAMENTOS E CASAS DE LUXO PARA ALUGAR" 
              listings={allListings.mansoes} 
              category="mansoes" 
            />
          )}
          
          {allListings.iates.length > 0 && (
            <VillasStyleCategorySection 
              title="ALUGUEL DE IATES DE LUXO" 
              listings={allListings.iates} 
              category="iates" 
            />
          )}
          
          {allListings.escuna.length > 0 && (
            <VillasStyleCategorySection 
              title="PASSEIOS DE ESCUNA" 
              listings={allListings.escuna} 
              category="escuna" 
            />
          )}
          
          {allListings.transfer.length > 0 && (
            <VillasStyleCategorySection 
              title="TRANSFER & TÁXI AÉREO" 
              listings={allListings.transfer} 
              category="transfer" 
            />
          )}
        </>
      )}

      {/* Why Us Section */}
      <WhyUsSection />

      {loading && (
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando propriedades...</p>
            </div>
          </div>
        </div>
      )}

      {/* Clean Footer */}
      <CleanFooter />
    </div>
  )
}