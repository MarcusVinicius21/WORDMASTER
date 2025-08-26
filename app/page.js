'use client'

import { useState, useEffect, useRef } from "react"
import { Search, Menu, X, Star, MapPin, Wifi, Car, Camera, Heart, Share2, ChevronLeft, ChevronRight, Phone, Mail, Instagram, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
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
    { name: 'Mansões', path: '/mansoes', icon: '🏖️' },
    { name: 'Iates', path: '/iates', icon: '🛥️' },
    { name: 'Escuna', path: '/escuna', icon: '⛵' },
    { name: 'Transfer', path: '/transfer', icon: '✈️' },
    { name: 'Buggy', path: '/buggy', icon: '🚗' },
    { name: 'Câmbio', path: '/cambio', icon: '💱' }
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
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </span>
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
                  <span className="text-lg">{category.icon}</span>
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

// Auto-rotating Hero Carousel
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)
  
  const slides = [
    {
      title: "Mansões de Luxo em Búzios",
      subtitle: "Propriedades exclusivas com vista para o mar",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=600&fit=crop&crop=center",
      cta: "Ver Mansões",
      link: "/mansoes"
    },
    {
      title: "Iates & Embarcações Premium",
      subtitle: "Experiências náuticas inesquecíveis",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&h=600&fit=crop&crop=center",
      cta: "Ver Iates",
      link: "/iates"
    },
    {
      title: "Transfer & Táxi Aéreo",
      subtitle: "Chegue com conforto e exclusividade",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1400&h=600&fit=crop&crop=center",
      cta: "Ver Transfers",
      link: "/transfer"
    },
    {
      title: "Passeios de Escuna",
      subtitle: "Descubra as praias paradisíacas de Búzios",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1400&h=600&fit=crop&crop=center",
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
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-3xl mx-4 mt-6 shadow-2xl">
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
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl lg:text-2xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={slide.link}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8"
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
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
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
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            O que você está procurando?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Busque por mansões, iates, transfers, passeios e muito mais
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Ex: Mansão em Geribá, Iate de luxo, Táxi aéreo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 shadow-lg"
            />
            <Button 
              size="lg"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-xl px-8"
            >
              Buscar
            </Button>
          </div>

          {/* Search Suggestions */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-3">Sugestões populares:</p>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
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

// Main Homepage Component
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings?featured=true&limit=6')
        if (response.ok) {
          const data = await response.json()
          setListings(data.listings || [])
        } else {
          console.error('Error fetching listings, using fallback data')
          // Fallback sample data
          setListings([
            {
              id: '1',
              title: 'Mansão Vista Mar em Geribá',
              subtitle: 'Luxo e conforto à beira-mar',
              category: 'mansao',
              neighborhood: 'Geribá',
              price_label: 'R$ 2.500/dia',
              is_featured: true
            },
            {
              id: '2',
              title: 'Iate de Luxo - 45 pés',
              subtitle: 'Experiência náutica premium',
              category: 'iate',
              neighborhood: 'Marina',
              price_label: 'R$ 3.800/dia',
              is_featured: true
            },
            {
              id: '3',
              title: 'Escuna Búzios Tradicional',
              subtitle: 'Passeio clássico pelas praias',
              category: 'escuna',
              neighborhood: 'Porto',
              price_label: 'R$ 120/pessoa',
              is_featured: true
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching listings:', error)
        // Use fallback data
        setListings([
          {
            id: '1',
            title: 'Mansão Vista Mar em Geribá',
            subtitle: 'Luxo e conforto à beira-mar',
            category: 'mansao',
            neighborhood: 'Geribá',
            price_label: 'R$ 2.500/dia',
            is_featured: true
          },
          {
            id: '2',
            title: 'Iate de Luxo - 45 pés',
            subtitle: 'Experiência náutica premium',
            category: 'iate',
            neighborhood: 'Marina',
            price_label: 'R$ 3.800/dia',
            is_featured: true
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navbar */}
      <ModernNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Auto-rotating Hero Carousel */}
      <HeroCarousel />

      {/* Enhanced Search Section */}
      <SearchSection />

      {/* Featured Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Propriedades em Destaque
            </h2>
            <p className="text-xl text-gray-600">
              Seleção exclusiva dos nossos melhores imóveis de luxo
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600">
              Experiências de luxo em Búzios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              title="Mansões de Luxo"
              description="Propriedades exclusivas com vista para o mar"
              icon="🏖️"
              link="/mansoes"
            />
            <CategoryCard
              title="Iates & Embarcações"
              description="Experiências náuticas premium"
              icon="🛥️"
              link="/iates"
            />
            <CategoryCard
              title="Transfer VIP"
              description="Transporte executivo e táxi aéreo"
              icon="✈️"
              link="/transfer"
            />
            <CategoryCard
              title="Passeios de Escuna"
              description="Conheça as praias paradisíacas"
              icon="⛵"
              link="/escuna"
            />
            <CategoryCard
              title="Buggy Adventures" 
              description="Explore trilhas e praias selvagens"
              icon="🚗"
              link="/buggy"
            />
            <CategoryCard
              title="Câmbio & Serviços"
              description="Câmbio e serviços financeiros"
              icon="💱"
              link="/cambio"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Property Card Component
const PropertyCard = ({ listing }) => {
  const categoryNames = {
    mansao: 'Mansão',
    iate: 'Iate', 
    escuna: 'Escuna',
    transfer: 'Transfer',
    buggy: 'Buggy'
  }

  return (
    <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center"
          alt={listing.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-600 text-white">
            {categoryNames[listing.category] || 'Luxury'}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
          {listing.title}
        </h3>
        <p className="text-gray-600 mb-3">{listing.subtitle}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{listing.neighborhood}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {listing.price_label}
            </span>
          </div>
          <WhatsAppButton 
            listing={listing}
            className="px-6"
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Category Card Component
const CategoryCard = ({ title, description, icon, link }) => {
  return (
    <Link href={link}>
      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-6">
            {description}
          </p>
          <Button 
            variant="outline" 
            className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200"
          >
            Explorar
          </Button>
        </CardContent>
      </Card>
    </Link>
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
        <div key={index} className="relative cursor-pointer" onClick={() => openLightbox(index + 1)}>
          <img 
            src={image} 
            alt={`${alt} ${index + 2}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {index === 3 && images.length > 5 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
              +{images.length - 5} fotos
            </div>
          )}
        </div>
      ))}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full">
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white z-10"
            >
              <X size={32} />
            </button>
            <img 
              src={images[currentImage]} 
              alt={`${alt} ${currentImage + 1}`}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Wordmaster Beach</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/mansoes" className="text-gray-700 hover:text-blue-600 font-medium">Mansões</Link>
            <Link href="/transfer" className="text-gray-700 hover:text-blue-600 font-medium">Transfer Aeroporto</Link>
            <Link href="/escuna" className="text-gray-700 hover:text-blue-600 font-medium">Passeios de Escuna</Link>
            <Link href="/iates" className="text-gray-700 hover:text-blue-600 font-medium">Iates e Lanchas</Link>
            <Link href="/buggy" className="text-gray-700 hover:text-blue-600 font-medium">Aluguel de Buggy</Link>
            <Link href="/cambio" className="text-gray-700 hover:text-blue-600 font-medium">Câmbio</Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Button variant="outline" onClick={() => window.open('https://wa.me/5521976860759?text=Quero anunciar minha propriedade', '_blank')}>
              Anuncie sua propriedade
            </Button>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/mansoes" className="block py-2 text-gray-700 hover:text-blue-600">Mansões</Link>
            <Link href="/transfer" className="block py-2 text-gray-700 hover:text-blue-600">Transfer Aeroporto</Link>
            <Link href="/escuna" className="block py-2 text-gray-700 hover:text-blue-600">Passeios de Escuna</Link>
            <Link href="/iates" className="block py-2 text-gray-700 hover:text-blue-600">Iates e Lanchas</Link>
            <Link href="/buggy" className="block py-2 text-gray-700 hover:text-blue-600">Aluguel de Buggy</Link>
            <Link href="/cambio" className="block py-2 text-gray-700 hover:text-blue-600">Câmbio</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

// Listing Card Component
const ListingCard = ({ listing }) => {
  const categoryMap = {
    mansao: 'mansoes',
    iate: 'iates',
    escuna: 'escuna',
    transfer: 'transfer',
    buggy: 'buggy'
  }

  const listingUrl = `/${categoryMap[listing.category]}/${listing.slug}`

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link href={listingUrl}>
        <div className="relative">
          <img 
            src={listing.images?.[0] || "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"} 
            alt={listing.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {listing.isPromoted && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white">
              Promoção
            </Badge>
          )}
          <div className="absolute top-3 right-3 flex space-x-2">
            <Heart className="w-6 h-6 text-white hover:text-red-500 cursor-pointer" />
            <Share2 className="w-6 h-6 text-white hover:text-blue-500 cursor-pointer" />
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={listingUrl}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{listing.rating || '4.8'}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{listing.neighborhood}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-xl">{listing.price_label}</span>
          </div>
          <WhatsAppButton listing={listing} className="text-sm px-4 py-2" />
        </div>
      </CardContent>
    </Card>
  )
}

// Promotions Carousel Component
const PromotionsCarousel = ({ listings }) => {
  const featuredListings = listings.filter(listing => listing.is_featured || listing.isPromoted)
  
  if (featuredListings.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ofertas Especiais</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nossas promoções exclusivas e propriedades em destaque para suas férias dos sonhos em Búzios
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {featuredListings.map((listing, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                    <Link href={`/${listing.category === 'mansao' ? 'mansoes' : listing.category}/${listing.slug}`}>
                      <div className="relative">
                        <img 
                          src={listing.images?.[0] || "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"} 
                          alt={listing.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {(listing.isPromoted || listing.is_featured) && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
                            {listing.isPromoted ? 'Promoção' : 'Destaque'}
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{listing.neighborhood}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xl text-blue-600">{listing.price_label}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{listing.rating || '4.8'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Sobre</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Como funciona</li>
              <li>Newsroom</li>
              <li>Investidores</li>
              <li>Wordmaster Beach Plus</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>WhatsApp: +55 21 97686-0759</li>
              <li>Email: wordmaster01@outlook.com</li>
              <li>Instagram: @wordmasterbeachbuzios</li>
              <li>Website: wordmasterbeachbuzios.com</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/mansoes">Mansões de Alto Padrão</Link></li>
              <li><Link href="/iates">Iates e Lanchas</Link></li>
              <li><Link href="/escuna">Passeios de Escuna</Link></li>
              <li><Link href="/transfer">Transfer Aeroporto</Link></li>
              <li><Link href="/buggy">Aluguel de Buggy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Privacidade</li>
              <li>Termos de Uso</li>
              <li>Sitemap</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Wordmaster Beach Búzios. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Todas as reservas e orçamentos são feitos exclusivamente via WhatsApp.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Home Page Component
export default function HomePage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // API integration
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings?featured=true&limit=6')
        if (!response.ok) {
          throw new Error('Failed to fetch listings')
        }
        const data = await response.json()
        
        // Add sample images to listings
        const listingsWithImages = data.listings.map((listing, index) => ({
          ...listing,
          images: [
            index === 0 
              ? "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
              : index === 1
              ? "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85"
              : "https://images.unsplash.com/photo-1578439297699-eb414262c2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85"
          ],
          rating: 4.8 + (Math.random() * 0.4),
          isPromoted: listing.is_featured && Math.random() > 0.5
        }))
        
        setListings(listingsWithImages)
      } catch (err) {
        console.error('Error fetching listings:', err)
        setError(err.message)
        // Fallback to sample data
        setListings([
          {
            id: 1,
            title: "Mansão Vista Mar em Geribá",
            neighborhood: "Geribá",
            category: "mansao",
            slug: "mansao-vista-mar-geriba",
            description: "Luxuosa mansão com vista deslumbrante para o mar, piscina privativa e acesso direto à praia.",
            price_label: "R$ 2.500/dia",
            rating: 4.95,
            images: [
              "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85",
              "https://images.unsplash.com/photo-1578439297699-eb414262c2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
            ],
            isPromoted: true,
            is_featured: true,
            amenities: ["pool", "wifi", "parking", "ocean_view"]
          },
          {
            id: 2,
            title: "Iate de Luxo - 45 pés",
            neighborhood: "Marina",
            category: "iate",
            slug: "iate-luxo-45-pes",
            description: "Iate moderno com capitão incluso, ideal para passeios e eventos especiais.",
            price_label: "R$ 3.800/dia",
            rating: 4.88,
            images: [
              "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85",
              "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85"
            ],
            isPromoted: false,
            is_featured: true,
            amenities: ["captain", "sound_system", "bar", "sun_deck"]
          },
          {
            id: 3,
            title: "Casa de Praia Ferradura",
            neighborhood: "Praia da Ferradura",
            category: "mansao",
            slug: "casa-praia-ferradura",
            description: "Casa aconchegante a poucos metros da praia, perfeita para famílias.",
            price_label: "R$ 1.200/dia",
            rating: 4.92,
            images: [
              "https://images.unsplash.com/photo-1578439297699-eb414262c2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85",
              "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
            ],
            isPromoted: true,
            is_featured: false,
            amenities: ["beach_access", "wifi", "bbq", "parking"]
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Aluguéis Exclusivos<br />em Búzios
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Descubra mansões de luxo, iates privativos e experiências únicas no paraíso de Búzios
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-full p-2 shadow-2xl">
            <div className="flex items-center">
              <Input 
                placeholder="Para onde você quer ir?" 
                className="border-0 text-gray-900 text-lg px-6"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-3">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Carousel */}
      <PromotionsCarousel listings={listings} />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore por Categoria</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Mansões", icon: "🏖️", href: "/mansoes" },
              { name: "Iates", icon: "🛥️", href: "/iates" },
              { name: "Escuna", icon: "⛵", href: "/escuna" },
              { name: "Transfer", icon: "✈️", href: "/transfer" },
              { name: "Buggy", icon: "🚗", href: "/buggy" },
              { name: "Câmbio", icon: "💱", href: "/cambio" }
            ].map((category, index) => (
              <Link 
                key={index}
                href={category.href}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Propriedades em Destaque</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Erro ao carregar propriedades</p>
              <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Host Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="Adson Carlos dos Santos"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-2xl font-bold mb-2">Adson Carlos dos Santos</h3>
              <p className="text-gray-600 mb-4">Seu anfitrião em Búzios</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Hóspedes atendidos</div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.9★</div>
                <div className="text-gray-600">Avaliação média</div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
                <div className="text-gray-600">Anos de experiência</div>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-8">
              "Minha paixão é proporcionar experiências inesquecíveis em Búzios. 
              Com conhecimento local e propriedades cuidadosamente selecionadas, 
              garanto que sua estadia seja perfeita."
            </p>
            
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://wa.me/5521976860759?text=Olá Adson! Gostaria de saber mais sobre os aluguéis em Búzios.', '_blank')}
            >
              Conversar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}