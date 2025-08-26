'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Search, Filter, SlidersHorizontal, Star, MapPin, Heart, Share2, ChevronDown, Menu, X, Phone, Mail, Instagram, Eye, Users, Bed, Bath, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

// Modern Premium Navbar Component (same as homepage)
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
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
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
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group relative"
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
              className="hidden sm:flex items-center space-x-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
              onClick={() => window.open('https://wa.me/5521976860759', '_blank')}
            >
              <Phone className="w-4 h-4" />
              <span>Contato</span>
            </Button>
            
            <Link href="/admin">
              <Button 
                variant="outline" 
                size="sm"
                className="hidden sm:flex border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
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

// WhatsApp Component
const WhatsAppButton = ({ listing, className = "" }) => {
  const whatsappNumber = "5521976860759"
  const message = `Olá! Tenho interesse em "${listing.title}". Vi no site: ${typeof window !== 'undefined' ? window.location.origin : ''}`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  return (
    <Button 
      className={`bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
      onClick={() => window.open(whatsappUrl, '_blank')}
    >
      <Phone className="w-4 h-4 mr-2" />
      WhatsApp
    </Button>
  )
}

// Premium Property Card
const PremiumPropertyCard = ({ listing }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  
  const categoryNames = {
    mansao: 'Mansão de Luxo',
    mansoes: 'Mansão de Luxo',
    iate: 'Iate Premium', 
    iates: 'Iate Premium',
    escuna: 'Escuna Exclusiva',
    transfer: 'Transfer VIP',
    buggy: 'Buggy Adventure'
  }

  // Premium images for each category
  const getCategoryImage = (category) => {
    const images = {
      mansao: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop&crop=center',
      mansoes: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop&crop=center',
      iate: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop&crop=center',
      iates: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop&crop=center',
      escuna: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop&crop=center',
      transfer: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=300&fit=crop&crop=center',
      buggy: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=300&fit=crop&crop=center'
    }
    return images[category] || images.mansao
  }

  return (
    <Card className="group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border-0 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={getCategoryImage(listing.category)}
          alt={listing.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
            {categoryNames[listing.category] || 'Premium'}
          </Badge>
        </div>
        
        {/* Favorite button */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-3 backdrop-blur-md rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 hover:bg-white text-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* View count badge */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm">
            <Eye className="w-4 h-4" />
            <span>{Math.floor(Math.random() * 200) + 50} visualizações</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
            {listing.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{listing.subtitle}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1 text-blue-600" />
          <span>{listing.neighborhood}</span>
        </div>

        {/* Property features */}
        {(listing.guests || listing.bedrooms || listing.bathrooms) && (
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            {listing.guests && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span>{listing.guests} hóspedes</span>
              </div>
            )}
            {listing.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4 text-blue-600" />
                <span>{listing.bedrooms} quartos</span>
              </div>
            )}
            {listing.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4 text-blue-600" />
                <span>{listing.bathrooms} banheiros</span>
              </div>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="w-4 h-4 fill-yellow-400 text-yellow-400" 
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">5.0 (12 avaliações)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {listing.price_label}
            </span>
          </div>
          <WhatsAppButton 
            listing={listing}
            className="px-6 py-2"
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Premium Filter Panel
const PremiumFilterPanel = ({ showFilters, setShowFilters, priceRange, setPriceRange, selectedNeighborhood, setSelectedNeighborhood, sortBy, setSortBy }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Filtros Premium</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Faixa de Preço
            </label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={10000}
                min={100}
                step={100}
                className="mb-3"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Neighborhood */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Localização
            </label>
            <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500 rounded-xl">
                <SelectValue placeholder="Selecione o bairro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os bairros</SelectItem>
                <SelectItem value="geriba">Geribá</SelectItem>
                <SelectItem value="centro">Centro</SelectItem>
                <SelectItem value="ferradura">Ferradura</SelectItem>
                <SelectItem value="marina">Marina</SelectItem>
                <SelectItem value="porto">Porto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Ordenar por
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Menor preço</SelectItem>
                <SelectItem value="price_desc">Maior preço</SelectItem>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="rating">Melhor avaliados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Category Page Component
export default function CategoryPage() {
  const params = useParams()
  const category = params.category
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([500, 5000])
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Category configurations
  const categoryConfig = {
    mansoes: {
      title: 'Mansões de Alto Padrão',
      subtitle: 'Descubra mansões de alto padrão com vista para o mar, piscinas privativas e todo o conforto que você merece.',
      icon: '🏖️',
      gradient: 'from-blue-600 to-blue-800'
    },
    iates: {
      title: 'Iates & Embarcações Premium',
      subtitle: 'Experiências náuticas exclusivas com iates de luxo, lanchas esportivas e embarcações premium.',
      icon: '🛥️',
      gradient: 'from-cyan-600 to-blue-700'
    },
    escuna: {
      title: 'Passeios de Escuna',
      subtitle: 'Descubra as praias paradisíacas de Búzios em passeios exclusivos de escuna tradicional.',
      icon: '⛵',
      gradient: 'from-teal-600 to-cyan-700'
    },
    transfer: {
      title: 'Transfer & Táxi Aéreo',
      subtitle: 'Chegue com conforto e exclusividade através dos nossos serviços de transfer executivo e táxi aéreo.',
      icon: '✈️',
      gradient: 'from-indigo-600 to-purple-700'
    },
    buggy: {
      title: 'Buggy Adventures',
      subtitle: 'Explore trilhas selvagens e praias escondidas com nossos buggies 4x4 em aventuras inesquecíveis.',
      icon: '🚗',
      gradient: 'from-orange-600 to-red-700'
    }
  }

  const currentCategory = categoryConfig[category] || categoryConfig.mansoes

  // Fetch listings with fallback
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`/api/listings?category=${category}`)
        if (response.ok) {
          const data = await response.json()
          setListings(data.listings || [])
        } else {
          console.error('Error fetching listings, using fallback data')
          // Enhanced fallback data with more properties per category
          const fallbackData = {
            mansoes: [
              {
                id: '1',
                title: 'Mansão Vista Mar Premium',
                subtitle: 'Luxuosa mansão com vista panorâmica para o mar, piscina infinita e área gourmet completa.',
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
                subtitle: 'Villa de alto padrão na Praia da Ferradura com design contemporâneo e acabamentos de luxo.',
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
                subtitle: 'Residência exclusiva com acesso direto à praia, jardim tropical e área de lazer completa.',
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
                subtitle: 'Mega iate com tripulação completa, bar premium, sala de jantar e suítes de luxo.',
                category: 'iates',
                neighborhood: 'Marina Porto Búzios',
                price_label: 'R$ 8.500/dia',
                guests: 20,
                is_featured: true
              },
              {
                id: '5',
                title: 'Lancha Esportiva Premium',
                subtitle: 'Lancha de alta performance para passeios rápidos e esportivos pelas praias de Búzios.',
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
                subtitle: 'Passeio clássico em escuna tradicional visitando as 12 praias mais belas de Búzios.',
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
                subtitle: 'Transfer VIP de helicóptero com vista aérea espetacular do litoral fluminense.',
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
                subtitle: 'Aventura off-road explorando trilhas selvagens e praias desertas de Búzios.',
                category: 'buggy',
                neighborhood: 'Base Centro',
                price_label: 'R$ 350/dia',
                guests: 4,
                is_featured: true
              }
            ]
          }
          setListings(fallbackData[category] || fallbackData.mansoes)
        }
      } catch (error) {
        console.error('Error fetching listings:', error)
        // Fallback data on error
        const fallbackData = {
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
            }
          ]
        }
        setListings(fallbackData[category] || fallbackData.mansoes)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [category])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Modern Premium Navbar */}
      <ModernNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Premium Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10" />
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{currentCategory.title}</span>
            </div>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r ${currentCategory.gradient} text-white text-4xl mb-6 shadow-2xl`}>
              {currentCategory.icon}
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r ${currentCategory.gradient} bg-clip-text text-transparent leading-tight`}>
              {currentCategory.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {currentCategory.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Premium Search & Filter Bar */}
      <section className="py-8 bg-white/80 backdrop-blur-md sticky top-16 z-40 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={`Buscar ${currentCategory.title.toLowerCase()}...`}
                  className="pl-12 pr-6 py-3 w-80 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 shadow-lg"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden rounded-xl border-2 border-gray-200 hover:border-blue-300"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Mostrando {listings.length} {currentCategory.title.toLowerCase()}</span>
              <div className="h-4 w-px bg-gray-300" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-0 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais recentes</SelectItem>
                  <SelectItem value="price_asc">Menor preço</SelectItem>
                  <SelectItem value="price_desc">Maior preço</SelectItem>
                  <SelectItem value="rating">Melhor avaliados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <PremiumFilterPanel 
                showFilters={true}
                setShowFilters={setShowFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedNeighborhood={selectedNeighborhood}
                setSelectedNeighborhood={setSelectedNeighborhood}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
                <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
                  <PremiumFilterPanel 
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedNeighborhood={selectedNeighborhood}
                    setSelectedNeighborhood={setSelectedNeighborhood}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </div>
              </div>
            )}

            {/* Properties Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-300 h-72 rounded-3xl mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : listings.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  {listings.map((listing) => (
                    <PremiumPropertyCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🏖️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Nenhuma propriedade encontrada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tente ajustar os filtros ou entre em contato conosco.
                  </p>
                  <Button onClick={() => window.open('https://wa.me/5521976860759', '_blank')}>
                    <Phone className="w-4 h-4 mr-2" />
                    Falar Conosco
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}