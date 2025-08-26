'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin, Heart, Share2, Users, Bed, Bath, Square, Camera, X, Wifi, Car, ChefHat, Tv, Wind, Check, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"

// Navigation Component
const Navigation = () => {
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
const Breadcrumb = ({ category, categoryName, title }) => {
  return (
    <nav className="bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href={`/${category}`} className="hover:text-blue-600">{categoryName}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{title}</span>
        </div>
      </div>
    </nav>
  )
}

// Gallery Mosaic Component
const GalleryMosaic = ({ images, alt }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-2xl overflow-hidden">
        {/* Hero Image */}
        <div className="col-span-2 row-span-2 relative cursor-pointer group" onClick={() => openLightbox(0)}>
          <img 
            src={images[0]} 
            alt={alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Thumbnail Images */}
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative cursor-pointer group" onClick={() => openLightbox(index + 1)}>
            <img 
              src={image} 
              alt={`${alt} ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                +{images.length - 5} fotos
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show all photos button */}
      <Button
        variant="outline"
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white"
        onClick={() => openLightbox(0)}
      >
        <Camera className="w-4 h-4 mr-2" />
        Mostrar todas as fotos
      </Button>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center p-4">
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white z-10 hover:bg-white/20 rounded-full p-2"
            >
              <X size={32} />
            </button>
            
            <button 
              onClick={prevImage}
              className="absolute left-4 text-white z-10 hover:bg-white/20 rounded-full p-2"
            >
              <ArrowLeft size={32} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 text-white z-10 hover:bg-white/20 rounded-full p-2"
            >
              <ArrowLeft size={32} className="rotate-180" />
            </button>
            
            <img 
              src={images[currentImage]} 
              alt={`${alt} ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// WhatsApp Button Component
const WhatsAppButton = ({ listing, className = "", sticky = false }) => {
  const whatsappNumber = "5521976860759"
  const message = `Olá! Tenho interesse em "${listing.title}". Vi no site: ${typeof window !== 'undefined' ? window.location.href : ''}`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  const handleClick = () => {
    // Track WhatsApp click
    fetch('/api/analytics/whatsapp-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        listing_id: listing.id,
        meta: { source: 'listing_detail' }
      })
    }).catch(() => {}) // Silent fail
    
    window.open(whatsappUrl, '_blank')
  }
  
  return (
    <Button 
      className={`bg-green-600 hover:bg-green-700 text-white ${sticky ? 'fixed bottom-4 right-4 z-40 shadow-lg md:relative md:bottom-auto md:right-auto md:shadow-none' : ''} ${className}`}
      onClick={handleClick}
      size={sticky ? "lg" : "default"}
    >
      <span className="mr-2">📱</span>
      Contatar no WhatsApp
    </Button>
  )
}

// Amenities Component
const AmenitiesSection = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false)
  
  const amenitiesIcons = {
    'Piscina': Wifi, // Using Wifi as placeholder since Pool is not available
    'Wi-Fi': Wifi,
    'Estacionamento': Car,
    'Vista para o Mar': Eye,
    'Churrasqueira': ChefHat,
    'Ar Condicionado': Wind,
    'Cozinha Completa': ChefHat,
    'TV a Cabo': Tv,
    'Jacuzzi': Wifi, // Using Wifi as placeholder since Pool is not available
    'Acesso à Praia': MapPin
  }

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 6)

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-6">O que este lugar oferece</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {displayedAmenities.map((amenity, index) => {
          const IconComponent = amenitiesIcons[amenity.name] || Check
          return (
            <div 
              key={index} 
              className={`flex items-center space-x-3 ${!amenity.available ? 'text-gray-400 line-through' : ''}`}
            >
              <IconComponent className="w-6 h-6" />
              <span className="text-lg">{amenity.name}</span>
            </div>
          )
        })}
      </div>

      {amenities.length > 6 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              Mostrar todas as {amenities.length} comodidades
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Todas as comodidades</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {amenities.map((amenity, index) => {
                const IconComponent = amenitiesIcons[amenity.name] || Check
                return (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 ${!amenity.available ? 'text-gray-400 line-through' : ''}`}
                  >
                    <IconComponent className="w-6 h-6" />
                    <span>{amenity.name}</span>
                  </div>
                )
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Reviews Section Component
const ReviewsSection = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6">Avaliações</h3>
        <p className="text-gray-600">Ainda não há avaliações para esta propriedade.</p>
      </div>
    )
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4 mb-6">
        <h3 className="text-2xl font-bold">Avaliações</h3>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600">({reviews.length} avaliações)</span>
        </div>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {review.author_name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold">{review.author_name}</h4>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 3 && !showAll && (
        <Button 
          variant="outline" 
          onClick={() => setShowAll(true)}
          className="mt-6"
        >
          Mostrar todas as {reviews.length} avaliações
        </Button>
      )}
    </div>
  )
}

// Host Card Component
const HostCard = ({ brokerName = "Adson Carlos dos Santos" }) => {
  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            alt={brokerName}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-bold mb-1">{brokerName}</h3>
          <p className="text-gray-600">Anfitrião em Búzios</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Hóspedes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">4.9★</div>
            <div className="text-sm text-gray-600">Avaliação</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">7</div>
            <div className="text-sm text-gray-600">Anos</div>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-6 text-center">
          "Especialista em aluguéis de luxo em Búzios com experiência em proporcionar estadias inesquecíveis."
        </p>

        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => window.open('https://wa.me/5521976860759?text=Olá Adson! Gostaria de conversar sobre um aluguel em Búzios.', '_blank')}
        >
          Enviar mensagem
        </Button>
      </CardContent>
    </Card>
  )
}

// Main Listing Detail Page Component
export default function ListingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { category, slug } = params
  
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const categoryNames = {
    mansoes: 'Mansões de Alto Padrão',
    iates: 'Iates e Lanchas',
    escuna: 'Passeios de Escuna',
    transfer: 'Transfer Aeroporto',
    buggy: 'Aluguel de Buggy'
  }

  // Sample amenities data
  const sampleAmenities = [
    { name: 'Piscina', available: true },
    { name: 'Wi-Fi', available: true },
    { name: 'Estacionamento', available: true },
    { name: 'Vista para o Mar', available: true },
    { name: 'Churrasqueira', available: true },
    { name: 'Ar Condicionado', available: true },
    { name: 'Cozinha Completa', available: true },
    { name: 'TV a Cabo', available: true },
    { name: 'Jacuzzi', available: false },
    { name: 'Acesso à Praia', available: true }
  ]

  // Sample reviews data
  const sampleReviews = [
    {
      author_name: "Marina Silva",
      rating: 5,
      content: "Lugar incrível! A vista é de tirar o fôlego e a propriedade é exatamente como nas fotos. O Adson foi super atencioso durante toda a estadia.",
      created_at: new Date('2024-12-15').toISOString()
    },
    {
      author_name: "Carlos Roberto",
      rating: 5,
      content: "Experiência perfeita em Búzios. A localização é privilegiada e as comodidades são de primeiro mundo. Recomendo demais!",
      created_at: new Date('2024-12-10').toISOString()
    },
    {
      author_name: "Ana Paula",
      rating: 4,
      content: "Muito bom! Apenas algumas pequenas observações sobre a limpeza, mas no geral foi uma estadia maravilhosa.",
      created_at: new Date('2024-12-05').toISOString()
    }
  ]

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // First try to find listing by slug in API
        const response = await fetch(`/api/listings`)
        if (response.ok) {
          const data = await response.json()
          const foundListing = data.listings.find(l => l.slug === slug)
          
          if (foundListing) {
            // Add sample data
            const listingWithExtras = {
              ...foundListing,
              images: [
                category === 'mansoes' 
                  ? "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
                  : "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1578439297699-eb414262c2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
              ],
              rating: 4.8 + (Math.random() * 0.4),
              amenities: sampleAmenities,
              reviews: sampleReviews,
              keyFeatures: [
                "Vista panorâmica para o mar",
                "Piscina privativa aquecida",
                "Acesso direto à praia",
                "Área gourmet completa",
                "Wi-Fi de alta velocidade",
                "Estacionamento para 3 carros"
              ]
            }
            setListing(listingWithExtras)
          } else {
            throw new Error('Listing not found')
          }
        } else {
          throw new Error('Failed to fetch listing')
        }
      } catch (err) {
        console.error('Error fetching listing:', err)
        // Create sample listing
        const sampleListing = {
          id: Date.now(),
          title: `${categoryNames[category]} - ${slug.replace(/-/g, ' ')}`,
          subtitle: "Experiência única em Búzios",
          neighborhood: "Geribá",
          category: category === 'mansoes' ? 'mansao' : category === 'iates' ? 'iate' : category,
          slug: slug,
          description: `Magnífica propriedade localizada em uma das melhores regiões de Búzios. Oferece todo o conforto e luxo que você merece para suas férias dos sonhos. Com vista deslumbrante e comodidades de primeira classe, garantimos uma experiência inesquecível.`,
          city: "Búzios",
          guests: category === 'mansoes' ? 10 : category === 'iates' ? 12 : 8,
          bedrooms: category === 'mansoes' ? 5 : category === 'iates' ? 2 : null,
          bathrooms: category === 'mansoes' ? 6 : category === 'iates' ? 2 : null,
          area_m2: category === 'mansoes' ? 450 : null,
          attributes: category === 'mansoes' ? { pool: true, oceanfront: true, parking: 4 } : 
                     category === 'iates' ? { length_ft: 45, cabins: 2, crew: 2 } : {},
          base_price: category === 'mansoes' ? 2500 : category === 'iates' ? 3800 : 1500,
          price_label: category === 'mansoes' ? "R$ 2.500/dia" : category === 'iates' ? "R$ 3.800/dia" : "R$ 1.500/dia",
          whatsapp_e164: "5521976860759",
          broker_name: "Adson Carlos dos Santos",
          is_featured: true,
          is_active: true,
          images: [
            category === 'mansoes' 
              ? "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
              : "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1578439297699-eb414262c2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8Ymx1ZXwxNzU1NzUyNzc5fDA&ixlib=rb-4.1.0&q=85",
            "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5zaW9ufGVufDB8fHxibHVlfDE3NTU3NTI3ODV8MA&ixlib=rb-4.1.0&q=85"
          ],
          rating: 4.9,
          amenities: sampleAmenities,
          reviews: sampleReviews,
          keyFeatures: [
            "Vista panorâmica para o mar",
            "Piscina privativa aquecida",
            "Acesso direto à praia",
            "Área gourmet completa",
            "Wi-Fi de alta velocidade",
            "Estacionamento para 3 carros"
          ]
        }
        setListing(sampleListing)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [category, slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Propriedade não encontrada</h1>
          <p className="text-gray-600 mb-8">A propriedade que você está procurando não foi encontrada.</p>
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Breadcrumb category={category} categoryName={categoryNames[category]} title={listing.title} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        {/* Title and Share */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{listing.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-5 h-5" />
                <span>{listing.neighborhood}, {listing.city}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <GalleryMosaic images={listing.images} alt={listing.title} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {category === 'mansoes' && `Casa inteira em ${listing.neighborhood}`}
                {category === 'iates' && `Iate completo em ${listing.neighborhood}`}
                {category === 'escuna' && `Passeio de escuna em ${listing.neighborhood}`}
                {category === 'transfer' && `Transfer executivo`}
                {category === 'buggy' && `Aluguel de buggy`}
              </h2>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                {listing.guests && (
                  <div className="flex items-center space-x-1">
                    <Users className="w-5 h-5" />
                    <span>{listing.guests} hóspedes</span>
                  </div>
                )}
                {listing.bedrooms && (
                  <div className="flex items-center space-x-1">
                    <Bed className="w-5 h-5" />
                    <span>{listing.bedrooms} quartos</span>
                  </div>
                )}
                {listing.bathrooms && (
                  <div className="flex items-center space-x-1">
                    <Bath className="w-5 h-5" />
                    <span>{listing.bathrooms} banheiros</span>
                  </div>
                )}
                {listing.area_m2 && (
                  <div className="flex items-center space-x-1">
                    <Square className="w-5 h-5" />
                    <span>{listing.area_m2}m²</span>
                  </div>
                )}
              </div>

              <Separator className="mb-6" />

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {listing.description}
              </p>

              {/* Key Features */}
              {listing.keyFeatures && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Destaques da Propriedade</h3>
                  <ul className="space-y-2">
                    {listing.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Separator className="mb-8" />

            {/* Amenities */}
            <AmenitiesSection amenities={listing.amenities} />

            <Separator className="mb-8" />

            {/* Reviews */}
            <ReviewsSection reviews={listing.reviews} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price and Book */}
            <Card className="mb-6 sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {listing.price_label}
                  </div>
                  <p className="text-gray-600">Preço total da diária</p>
                </div>

                <WhatsAppButton listing={listing} className="w-full mb-4" />
                
                <p className="text-sm text-gray-500 text-center">
                  Você será redirecionado para o WhatsApp para finalizar sua reserva
                </p>
              </CardContent>
            </Card>

            {/* Host Card */}
            <HostCard brokerName={listing.broker_name} />
          </div>
        </div>

        {/* Mobile Sticky WhatsApp Button */}
        <div className="lg:hidden">
          <WhatsAppButton listing={listing} sticky={true} />
        </div>
      </div>
    </div>
  )
}