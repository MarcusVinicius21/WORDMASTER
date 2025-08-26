'use client'

import { useState, useEffect } from "react"
import { Search, Menu, X, Star, MapPin, Wifi, Car, Pool, Camera, Heart, Share2 } from "lucide-react"
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

// Gallery Component
const GalleryMosaic = ({ images, alt }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-2xl overflow-hidden">
      {/* Hero Image */}
      <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => openLightbox(0)}>
        <img 
          src={images[0]} 
          alt={alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Thumbnail Images */}
      {images.slice(1, 5).map((image, index) => (
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