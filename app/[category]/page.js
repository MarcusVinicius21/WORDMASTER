'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, MapPin, Users, Bed, Bath, Maximize, Star, Calendar, ChevronLeft, ChevronRight, Phone, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Villas in Brazil Style Navbar
const VillasNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-800">
              <div className="text-sm font-normal text-gray-600">WORDMASTER</div>
              <div className="text-base font-bold text-gray-900 -mt-1">in BÚZIOS</div>
            </div>
          </Link>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Brasil</Link>
            <Link href="/destinos" className="text-gray-700 hover:text-gray-900 font-medium">Mais destinos</Link>
            <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Mansões</Link>
            <Link href="/iates" className="text-gray-700 hover:text-gray-900 font-medium">Iates</Link>
            <Link href="/concierge" className="text-gray-700 hover:text-gray-900 font-medium">Concierge</Link>
            <Link href="/longo-prazo" className="text-gray-700 hover:text-gray-900 font-medium">Longo prazo</Link>
            <Link href="/vendas" className="text-gray-700 hover:text-gray-900 font-medium">Vendas</Link>
            <Link href="/sobre" className="text-gray-700 hover:text-gray-900 font-medium">Sobre Nós</Link>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium">Blog</Link>
            <Link href="/contato" className="text-gray-700 hover:text-gray-900 font-medium">Contato</Link>
            
            <div className="flex items-center space-x-2 text-gray-600 ml-4">
              <span>PT</span>
              <span>R$ BRL</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Villas Style Gallery Component (Corrigido para o novo layout e lightbox)
const VillasGallery = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const galleryImages = images || [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&crop=center", 
    "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&h=600&fit=crop&crop=center"
  ]

  return (
    <div className="w-full relative">
      {/* Main Gallery Grid - Layout de duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Main large image */}
        <div className="relative cursor-pointer" onClick={() => {
          setCurrentImage(0); 
          setLightboxOpen(true);
        }}>
          <img 
            src={galleryImages[0]} 
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        
        {/* Side images in a grid */}
        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="relative cursor-pointer" onClick={() => {
            setCurrentImage(1);
            setLightboxOpen(true);
          }}>
            <img 
              src={galleryImages[1]} 
              alt={title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="relative cursor-pointer" onClick={() => {
            setCurrentImage(2);
            setLightboxOpen(true);
          }}>
            <img 
              src={galleryImages[2]} 
              alt={title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="relative cursor-pointer" onClick={() => {
            setCurrentImage(3);
            setLightboxOpen(true);
          }}>
            <img 
              src={galleryImages[3]} 
              alt={title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          {/* Botão para abrir o lightbox com "Veja mais fotos" */}
          <div className="relative cursor-pointer bg-gray-100 flex items-center justify-center rounded-md" onClick={() => {
            setCurrentImage(0); 
            setLightboxOpen(true);
          }}>
            <span className="text-gray-600 font-medium">Veja mais fotos</span>
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full">
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={galleryImages[currentImage]} 
              alt={title}
              className="max-w-full max-h-screen object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// WhatsApp Button Component
const WhatsAppButton = ({ listing }) => {
  const whatsappNumber = "5521976860759"
  const message = `Olá! Tenho interesse em "${listing?.title || 'propriedade'}". Vi no site Wordmaster Beach Búzios.`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => window.open(whatsappUrl, '_blank')}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110"
      >
        <Phone className="w-6 h-6" />
      </button>
    </div>
  )
}

// Villas Style Contact Form
const ContactForm = ({ listing }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappNumber = "5521976860759"
    const message = `Olá! Tenho interesse em "${listing?.title}".
    
Dados da reserva:
- Check-in: ${formData.checkIn}
- Check-out: ${formData.checkOut} 
- Hóspedes: ${formData.guests}
- Email: ${formData.email}
- Mensagem: ${formData.message}

Vi no site Wordmaster Beach Búzios.`
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="text-right mb-4">
          <div className="text-sm text-gray-600">A partir de</div>
          <div className="text-3xl font-bold text-gray-900">{listing?.price_label || 'R$ 0,00'}</div>
          <div className="text-sm text-gray-600">por Noite</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Check-in</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                className="w-full border-0 bg-transparent text-sm focus:outline-none"
                required
              />
            </div>
            <div className="border-l border-gray-300 pl-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Check-out</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                className="w-full border-0 bg-transparent text-sm focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Hóspedes</label>
            <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}>
              <SelectTrigger className="border-0 p-0 h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 pessoa</SelectItem>
                <SelectItem value="2">2 pessoas</SelectItem>
                <SelectItem value="4">4 pessoas</SelectItem>
                <SelectItem value="6">6 pessoas</SelectItem>
                <SelectItem value="8">8 pessoas</SelectItem>
                <SelectItem value="10">10+ pessoas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="border-gray-300"
            required
          />

          <textarea
            placeholder="Mensagem (opcional)"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            rows={3}
          />

          <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white">
            Entrar em contato
          </Button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          Você não será cobrado ainda  
        </div>
      </CardContent>
    </Card>
  )
}

// Main Property Detail Page
export default function PropertyDetailPage() {
  const params = useParams()
  const { category, slug } = params
  
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  // Category configurations
  const categoryConfig = {
    mansoes: {
      name: 'Mansão de Luxo',
      features: ['quartos', 'banheiros', 'pessoas', 'área'],
    },
    iates: {
      name: 'Iate Premium',
      features: ['pessoas', 'cabines', 'tripulação', 'tamanho'],
    },
    escuna: {
      name: 'Passeio de Escuna',
      features: ['pessoas', 'duração', 'praias', 'refeições'],
    },
    transfer: {
      name: 'Transfer VIP',
      features: ['pessoas', 'bagagens', 'duração', 'conforto'],
    },
    buggy: {
      name: 'Buggy Adventure',
      features: ['pessoas', 'duração', 'trilhas', 'equipamentos'],
    }
  }

  const currentCategory = categoryConfig[category] || categoryConfig.mansoes

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/listings/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setListing(data)
        } else {
          // Fallback data based on category
          const fallbackData = {
            id: slug,
            title: `${currentCategory.name} em Búzios`,
            subtitle: 'Experiência de luxo inesquecível',
            description: `Esta é uma fabulosa ${currentCategory.name.toLowerCase()} em Búzios, um dos principais destinos turísticos do Brasil. Com vistas deslumbrantes para o mar e acabamentos de primeira linha, oferece uma experiência única e inesquecível.

O primeiro ambiente conta com ampla sala de estar e jantar, cozinha totalmente equipada e área de serviço completa. Todos os ambientes são climatizados e oferecem vista panorâmica para o mar.

Na área externa, você encontrará uma piscina privativa, deck com espreguiçadeiras, área gourmet completa e jardim paisagístico. O local é perfeito para relaxar e curtir momentos especiais com família e amigos.`,
            category: category,
            neighborhood: 'Búzios, Rio de Janeiro',
            price_label: category === 'mansoes' ? 'R$ 3.500,00' : 
                        category === 'iates' ? 'R$ 8.500,00' :
                        category === 'escuna' ? 'R$ 180,00' :
                        category === 'transfer' ? 'R$ 2.500,00' : 'R$ 350,00',
            guests: category === 'mansoes' ? 12 : 
                   category === 'iates' ? 20 :
                   category === 'escuna' ? 40 :
                   category === 'transfer' ? 4 : 4,
            bedrooms: category === 'mansoes' ? 6 : category === 'iates' ? 3 : null,
            bathrooms: category === 'mansoes' ? 5 : category === 'iates' ? 2 : null,
            area_m2: category === 'mansoes' ? 350 : null,
            is_featured: true
          }
          setListing(fallbackData)
        }
      } catch (error) {
        console.error('Error fetching property:', error)
        // Use fallback data
        setListing({
          id: slug,
          title: `${currentCategory.name} em Búzios`,
          subtitle: 'Experiência de luxo inesquecível',
          category: category,
          neighborhood: 'Búzios, Rio de Janeiro',
          price_label: 'R$ 3.500,00',
          guests: 12,
          bedrooms: 6,
          bathrooms: 5
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [category, slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <VillasNavbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando propriedade...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <VillasNavbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Propriedade não encontrada</h1>
            <Link href="/">
              <Button>Voltar ao início</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <VillasNavbar />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href={`/${category}`} className="hover:text-gray-900 capitalize">{category}</Link>
            <span>/</span>
            <span className="text-gray-900">{listing.title}</span>
          </div>
        </nav>

        {/* Gallery */}
        <VillasGallery title={listing.title} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {listing.title.toUpperCase()}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{listing.neighborhood}</span>
              </div>

              {/* Property Features Badges */}
              <div className="flex flex-wrap gap-2">
                {listing.bedrooms && (
                  <Badge variant="outline" className="text-gray-700 border-gray-300">
                    <Bed className="w-4 h-4 mr-1" />
                    {listing.bedrooms} Quartos
                  </Badge>
                )}
                {listing.guests && (
                  <Badge variant="outline" className="text-gray-700 border-gray-300">
                    <Users className="w-4 h-4 mr-1" />
                    {listing.guests} pessoas
                  </Badge>
                )}
                {listing.bathrooms && (
                  <Badge variant="outline" className="text-gray-700 border-gray-300">
                    <Bath className="w-4 h-4 mr-1" />
                    {listing.bathrooms} Banheiros
                  </Badge>
                )}
                {listing.area_m2 && (
                  <Badge variant="outline" className="text-gray-700 border-gray-300">
                    <Maximize className="w-4 h-4 mr-1" />
                    {listing.area_m2}m²
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comodidades</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">Wi-Fi gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">Ar condicionado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">Piscina privativa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">Vista para o mar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">Cozinha completa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">Área gourmet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <ContactForm listing={listing} />
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton listing={listing} />
    </div>
  )
}