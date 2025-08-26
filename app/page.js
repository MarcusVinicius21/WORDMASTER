'use client'

import { useState, useEffect, useRef } from "react"
import { Search, Menu, X, Star, MapPin, Wifi, Car, Camera, Heart, Share2, ChevronLeft, ChevronRight, Phone, Mail, Instagram, Globe, Users, Bed, Bath, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

// Modern Navbar Component
const ModernNavbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const categories = [
    { name: 'Mansões', path: '/mansoes' },
    { name: 'Iates', path: '/iates' },
    { name: 'Escuna', path: '/escuna' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Buggy', path: '/buggy' },
    { name: 'Câmbio', path: '/cambio' }
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Wordmaster
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Beach Búzios</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
              >
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="hidden sm:flex items-center space-x-2 border-green-200 text-green-700 hover:bg-green-50"
              onClick={() => window.open('https://wa.me/5521976860759', '_blank')}
            >
              <Phone className="w-4 h-4" />
              <span>Contato</span>
            </Button>
            
            <Link href="/admin">
              <Button 
                variant="outline" 
                size="sm"
                className="hidden sm:flex border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Admin
              </Button>
            </Link>

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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
              <div className="flex space-x-2 px-4 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                  onClick={() => window.open('https://wa.me/5521976860759', '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contato
                </Button>
                <Link href="/admin" className="flex-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Full Screen Auto-rotating Hero Carousel
const FullScreenHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)
  
  const slides = [
    {
      title: "Mansões de Luxo em Búzios",
      subtitle: "Propriedades exclusivas com vista para o mar",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&crop=center",
      cta: "Ver Mansões",
      link: "/mansoes"
    },
    {
      title: "Iates & Embarcações Premium",
      subtitle: "Experiências náuticas inesquecíveis",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&crop=center",
      cta: "Ver Iates",
      link: "/iates"
    },
    {
      title: "Transfer & Táxi Aéreo",
      subtitle: "Chegue com conforto e exclusividade",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1920&h=1080&fit=crop&crop=center",
      cta: "Ver Transfers",
      link: "/transfer"
    },
    {
      title: "Passeios de Escuna",
      subtitle: "Descubra as praias paradisíacas de Búzios",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&crop=center",
      cta: "Ver Passeios",
      link: "/escuna"
    }
  ]

  // Auto rotation
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
      }, 5000) // Change slide every 5 seconds
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
    // Restart interval when user manually changes slide
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
      }, 5000)
    }, 100)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 transform translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 transform -translate-x-full' 
                : 'opacity-0 transform translate-x-full'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-3xl text-white">
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-2xl lg:text-3xl mb-10 opacity-90">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={slide.link}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg"
                    onClick={() => window.open('https://wa.me/5521976860759', '_blank')}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Falar Conosco
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-200 z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-200 z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
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

// Enhanced Search Section
const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const searchSuggestions = [
    'Mansão em Geribá',
    'Iate para festa',
    'Transfer aeroporto',
    'Táxi aéreo',
    'Escuna tour',
    'Casa na praia',
    'Buggy passeio'
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            O que você está procurando?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Busque por mansões, iates, transfers, passeios e muito mais
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Ex: Mansão em Geribá, Iate de luxo, Táxi aéreo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 pr-6 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 shadow-xl"
            />
            <Button 
              size="lg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-xl px-10"
            >
              Buscar
            </Button>
          </div>

          {/* Search Suggestions */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">Sugestões populares:</p>
            <div className="flex flex-wrap gap-3">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Mini Category Carousel Component
const CategoryCarousel = ({ title, listings, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const maxIndex = Math.max(0, listings.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }

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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">Descubra as melhores opções disponíveis</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={listings.length <= itemsPerView}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={listings.length <= itemsPerView}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link href={`/${category}`}>
              <Button variant="outline" size="sm">Ver Todos</Button>
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {listings.map((listing) => (
              <div key={listing.id} className="w-1/3 flex-shrink-0 px-3">
                <Link href={`/${category}/${listing.id}`}>
                  <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer">
                    <div className="relative overflow-hidden">
                      <img
                        src={getCategoryImage(category)}
                        alt={listing.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-600 text-white px-2 py-1 text-xs">
                          {title}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{listing.subtitle}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{listing.neighborhood}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">
                          {listing.price_label}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">5.0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Wordmaster</h3>
                <p className="text-gray-400 text-sm">Beach Búzios</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Experiências de luxo em Búzios. Mansões, iates, transfers e muito mais.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-white p-2"
                onClick={() => window.open('https://wa.me/5521976860759', '_blank')}
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-white p-2"
                onClick={() => window.open('mailto:wordmaster01@outlook.com', '_blank')}
              >
                <Mail className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-white p-2"
                onClick={() => window.open('https://instagram.com/wordmasterbeachbuzios', '_blank')}
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Serviços</h4>
            <div className="space-y-3">
              <Link href="/mansoes" className="block text-gray-400 hover:text-white transition-colors">
                Mansões de Luxo
              </Link>
              <Link href="/iates" className="block text-gray-400 hover:text-white transition-colors">
                Iates & Embarcações
              </Link>
              <Link href="/transfer" className="block text-gray-400 hover:text-white transition-colors">
                Transfer & Táxi Aéreo
              </Link>
              <Link href="/escuna" className="block text-gray-400 hover:text-white transition-colors">
                Passeios de Escuna
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">+55 21 97686-0759</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">wordmaster01@outlook.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">@wordmasterbeachbuzios</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Receba ofertas exclusivas
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Seu email"
                className="rounded-r-none border-gray-600 bg-gray-800"
              />
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                OK
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
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

  // Enhanced fallback data with more properties
  const getFallbackData = () => ({
    mansoes: [
      {
        id: '1',
        title: 'Mansão Vista Mar Premium',
        subtitle: 'Luxuosa mansão com vista panorâmica para o mar.',
        category: 'mansoes',
        neighborhood: 'Geribá',
        price_label: 'R$ 3.500/dia',
        guests: 12,
        bedrooms: 6,
        bathrooms: 5,
        is_featured: true
      },
      {
        id: '2',
        title: 'Villa Exclusive Ferradura',
        subtitle: 'Villa de alto padrão na Praia da Ferradura.',
        category: 'mansoes',
        neighborhood: 'Ferradura',
        price_label: 'R$ 2.800/dia',
        guests: 10,
        bedrooms: 5,
        bathrooms: 4,
        is_featured: true
      },
      {
        id: '3',
        title: 'Casa de Praia Boutique',
        subtitle: 'Residência exclusiva com acesso direto à praia.',
        category: 'mansoes',
        neighborhood: 'Centro',
        price_label: 'R$ 2.200/dia',
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        is_featured: false
      }
    ],
    iates: [
      {
        id: '4',
        title: 'Iate de Luxo - 60 pés',
        subtitle: 'Mega iate com tripulação completa e bar premium.',
        category: 'iates',
        neighborhood: 'Marina Porto Búzios',
        price_label: 'R$ 8.500/dia',
        guests: 20,
        is_featured: true
      },
      {
        id: '5',
        title: 'Lancha Esportiva Premium',
        subtitle: 'Lancha de alta performance para passeios rápidos.',
        category: 'iates',
        neighborhood: 'Marina',
        price_label: 'R$ 4.200/dia',
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
        price_label: 'R$ 180/pessoa',
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
        price_label: 'R$ 2.500/trecho',
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
        price_label: 'R$ 350/dia',
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
          fetch(`/api/listings?category=${category}&limit=6`)
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
      {/* Modern Navbar */}
      <ModernNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Full Screen Auto-rotating Hero Carousel */}
      <FullScreenHeroCarousel />

      {/* Enhanced Search Section */}
      <SearchSection />

      {/* Category Carousels - All Products */}
      {!loading && (
        <>
          {allListings.mansoes.length > 0 && (
            <CategoryCarousel 
              title="Mansões de Alto Padrão" 
              listings={allListings.mansoes} 
              category="mansoes" 
            />
          )}
          
          {allListings.iates.length > 0 && (
            <CategoryCarousel 
              title="Iates & Embarcações Premium" 
              listings={allListings.iates} 
              category="iates" 
            />
          )}
          
          {allListings.escuna.length > 0 && (
            <CategoryCarousel 
              title="Passeios de Escuna" 
              listings={allListings.escuna} 
              category="escuna" 
            />
          )}
          
          {allListings.transfer.length > 0 && (
            <CategoryCarousel 
              title="Transfer & Táxi Aéreo" 
              listings={allListings.transfer} 
              category="transfer" 
            />
          )}
          
          {allListings.buggy.length > 0 && (
            <CategoryCarousel 
              title="Buggy Adventures" 
              listings={allListings.buggy} 
              category="buggy" 
            />
          )}
        </>
      )}

      {loading && (
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando propriedades...</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}