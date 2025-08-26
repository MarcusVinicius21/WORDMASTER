'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Search, Filter, SlidersHorizontal, Star, MapPin, Heart, Share2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Wordmaster Beach</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/mansoes" className="text-gray-700 hover:text-blue-600 font-medium">Mansões</Link>
            <Link href="/transfer" className="text-gray-700 hover:text-blue-600 font-medium">Transfer Aeroporto</Link>
            <Link href="/escuna" className="text-gray-700 hover:text-blue-600 font-medium">Passeios de Escuna</Link>
            <Link href="/iates" className="text-gray-700 hover:text-blue-600 font-medium">Iates e Lanchas</Link>
            <Link href="/buggy" className="text-gray-700 hover:text-blue-600 font-medium">Aluguel de Buggy</Link>
            <Link href="/cambio" className="text-gray-700 hover:text-blue-600 font-medium">Câmbio</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Button variant="outline" onClick={() => window.open('https://wa.me/5521976860759?text=Quero anunciar minha propriedade', '_blank')}>
              Anuncie sua propriedade
            </Button>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Breadcrumb Component
const Breadcrumb = ({ category, categoryName }) => {
  return (
    <nav className="bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{categoryName}</span>
        </div>
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
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      onClick={() => window.open(whatsappUrl, '_blank')}
    >
      WhatsApp
    </Button>
  )
}

// Listing Card Component
const ListingCard = ({ listing, category }) => {
  const listingUrl = `/${category}/${listing.slug}`

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
          
          {/* Category-specific attributes */}
          <div className="mb-3">
            {category === 'mansoes' && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {listing.guests && <span>{listing.guests} hóspedes</span>}
                {listing.bedrooms && <span>{listing.bedrooms} quartos</span>}
                {listing.bathrooms && <span>{listing.bathrooms} banheiros</span>}
              </div>
            )}
            {category === 'iates' && listing.attributes && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {listing.attributes.length_ft && <span>{listing.attributes.length_ft} pés</span>}
                {listing.attributes.cabins && <span>{listing.attributes.cabins} cabines</span>}
                {listing.guests && <span>{listing.guests} pessoas</span>}
              </div>
            )}
            {category === 'escuna' && listing.attributes && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {listing.attributes.capacity && <span>{listing.attributes.capacity} pessoas</span>}
                {listing.attributes.route && <span>{listing.attributes.route}</span>}
              </div>
            )}
            {category === 'transfer' && listing.attributes && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {listing.attributes.origin && <span>De: {listing.attributes.origin}</span>}
                {listing.attributes.destination && <span>Para: {listing.attributes.destination}</span>}
              </div>
            )}
            {category === 'buggy' && listing.attributes && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {listing.attributes.seats && <span>{listing.attributes.seats} lugares</span>}
                {listing.attributes.transmission && <span>{listing.attributes.transmission}</span>}
              </div>
            )}
          </div>
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

// Filters Component
const FiltersPanel = ({ category, onFilterChange, priceRange, setPriceRange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const categoryFilters = {
    mansoes: [
      { key: 'pool', label: 'Piscina' },
      { key: 'oceanfront', label: 'Vista para o mar' },
      { key: 'parking', label: 'Estacionamento' },
      { key: 'jacuzzi', label: 'Jacuzzi' }
    ],
    iates: [
      { key: 'captain', label: 'Capitão incluso' },
      { key: 'sound_system', label: 'Som ambiente' },
      { key: 'bar', label: 'Bar' },
      { key: 'sun_deck', label: 'Deck para sol' }
    ],
    escuna: [
      { key: 'route', label: 'Rota específica' },
      { key: 'capacity', label: 'Grande capacidade' }
    ],
    transfer: [
      { key: 'type', label: 'Tipo de veículo' },
      { key: 'route', label: 'Rota específica' }
    ],
    buggy: [
      { key: 'transmission', label: 'Transmissão' },
      { key: 'seats', label: 'Número de assentos' }
    ]
  }

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            <Select onValueChange={(value) => onFilterChange('sort', value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="price_low">Menor preço</SelectItem>
                <SelectItem value="price_high">Maior preço</SelectItem>
                <SelectItem value="featured">Em destaque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-600">
            Mostrando resultados para {category === 'mansoes' ? 'Mansões' : 
              category === 'iates' ? 'Iates' : 
              category === 'escuna' ? 'Escuna' : 
              category === 'transfer' ? 'Transfer' : 
              category === 'buggy' ? 'Buggy' : category}
          </div>
        </div>

        {isOpen && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3">Faixa de Preço</h4>
                <div className="space-y-3">
                  <Slider
                    defaultValue={priceRange}
                    max={10000}
                    min={0}
                    step={100}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Neighborhood */}
              <div>
                <h4 className="font-semibold mb-3">Bairro</h4>
                <Select onValueChange={(value) => onFilterChange('neighborhood', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os bairros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os bairros</SelectItem>
                    <SelectItem value="geriba">Geribá</SelectItem>
                    <SelectItem value="ferradura">Ferradura</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="marina">Marina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category-specific filters */}
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-3">Características</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categoryFilters[category]?.map((filter) => (
                    <label key={filter.key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={(e) => onFilterChange(filter.key, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Category Page Component
export default function CategoryPage() {
  const params = useParams()
  const category = params.category
  
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({})
  const [priceRange, setPriceRange] = useState([0, 10000])

  const categoryNames = {
    mansoes: 'Mansões de Alto Padrão',
    iates: 'Iates e Lanchas',
    escuna: 'Passeios de Escuna',
    transfer: 'Transfer Aeroporto',
    buggy: 'Aluguel de Buggy',
    cambio: 'Câmbio (USD/EUR)'
  }

  const categoryMap = {
    mansoes: 'mansao',
    iates: 'iate',
    escuna: 'escuna',
    transfer: 'transfer',
    buggy: 'buggy'
  }

  // Handle filter changes
  const handleFilterChange = (filterKey, filterValue) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterValue
    }))
  }

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      if (category === 'cambio') {
        setLoading(false)
        return
      }

      try {
        const mappedCategory = categoryMap[category]
        if (!mappedCategory) {
          throw new Error('Invalid category')
        }

        const response = await fetch(`/api/listings?category=${mappedCategory}&limit=20`)
        if (!response.ok) {
          throw new Error('Failed to fetch listings')
        }
        const data = await response.json()
        
        // Add sample images to listings
        const listingsWithImages = data.listings.map((listing, index) => ({
          ...listing,
          images: [
            category === 'mansoes' 
              ? "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
              : category === 'iates'
              ? "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85"
              : "https://images.unsplash.com/photo-1578439297699-eb414262c2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85"
          ],
          rating: 4.8 + (Math.random() * 0.4),
          isPromoted: Math.random() > 0.7
        }))
        
        setListings(listingsWithImages)
      } catch (err) {
        console.error('Error fetching listings:', err)
        setError(err.message)
        // Sample data for fallback
        setListings([
          {
            id: Date.now(),
            title: `${categoryNames[category]} - Exemplo`,
            neighborhood: "Búzios",
            category: categoryMap[category] || category,
            slug: `exemplo-${category}`,
            description: `Exemplo de ${categoryNames[category]} disponível em Búzios.`,
            price_label: "R$ 1.500/dia",
            rating: 4.85,
            images: [
              category === 'mansoes' 
                ? "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
                : "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85"
            ],
            guests: 8,
            bedrooms: 4,
            bathrooms: 3,
            attributes: category === 'mansoes' ? { pool: true, oceanfront: true } : { length_ft: 45, cabins: 2 }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [category])

  // Special case for cambio page
  if (category === 'cambio') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <Breadcrumb category={category} categoryName={categoryNames[category]} />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-8">💱</div>
            <h1 className="text-4xl font-bold mb-6">Serviço de Câmbio</h1>
            <p className="text-xl text-gray-600 mb-8">
              Oferecemos serviços de câmbio para USD e EUR com as melhores taxas da região. 
              Entre em contato via WhatsApp para consultar cotações atualizadas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="text-3xl mb-4">🇺🇸</div>
                <h3 className="text-2xl font-bold mb-2">Dólar Americano</h3>
                <p className="text-gray-600">Compra e venda de USD com taxas competitivas</p>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="text-3xl mb-4">🇪🇺</div>
                <h3 className="text-2xl font-bold mb-2">Euro</h3>
                <p className="text-gray-600">Câmbio de EUR para suas viagens internacionais</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
              onClick={() => window.open('https://wa.me/5521976860759?text=Olá! Gostaria de consultar as taxas de câmbio atuais.', '_blank')}
            >
              Consultar Taxas no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Breadcrumb category={category} categoryName={categoryNames[category]} />
      
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{categoryNames[category]}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {category === 'mansoes' && 'Descubra mansões de alto padrão com vista para o mar, piscinas privativas e todo o conforto que você merece.'}
            {category === 'iates' && 'Navegue em iates de luxo com capitão experiente, ideal para passeios exclusivos e eventos especiais.'}
            {category === 'escuna' && 'Explore as praias paradisíacas de Búzios em nossos passeios de escuna com toda segurança e conforto.'}
            {category === 'transfer' && 'Transfers executivos e confortáveis entre aeroportos e Búzios com motoristas experientes.'}
            {category === 'buggy' && 'Alugue buggies para explorar Búzios com liberdade e aventura pelas melhores praias e trilhas.'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <FiltersPanel 
        category={category} 
        onFilterChange={handleFilterChange}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* Listings Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Erro ao carregar {categoryNames[category].toLowerCase()}</p>
              <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🏖️</div>
              <h3 className="text-2xl font-bold mb-4">Nenhum resultado encontrado</h3>
              <p className="text-gray-600 mb-6">
                Não encontramos {categoryNames[category].toLowerCase()} com os filtros selecionados.
                Tente ajustar os filtros ou entre em contato conosco.
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://wa.me/5521976860759?text=Olá! Estou procurando opções de aluguéis em Búzios.', '_blank')}
              >
                Falar no WhatsApp
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  {listings.length} {listings.length === 1 ? 'propriedade encontrada' : 'propriedades encontradas'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} category={category} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}