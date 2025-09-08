'use client'

import { useState, useEffect } from "react"
import { Search, Menu, X, Star, MapPin, ChevronLeft, ChevronRight, Phone, Mail, Instagram, Users, Bed, Bath, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"


// WhatsApp Component
const WhatsAppButton = ({ listing, className = "" }) => {
  const whatsappNumber = "5521976860759"
  const message = `Olá! Tenho interesse em "${listing?.title || 'propriedade'}". Vi no site: ${typeof window !== 'undefined' ? window.location.origin : ''}`
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

// Villas in Brazil Style Navbar
const VillasNavbar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* LOGO ALTERADO AQUI */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Wordmaster Beach Búzios Logo"
              width={144}
              height={40}
              priority
            />
          </Link>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Brasil</Link>
            <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Mansões</Link>
            <Link href="/iates" className="text-gray-700 hover:text-gray-900 font-medium">Iates</Link>
            <Link href="/escuna" className="text-gray-700 hover:text-gray-900 font-medium">Escuna</Link>
            <Link href="/transfer" className="text-gray-700 hover:text-gray-900 font-medium">Transfer</Link>
            <Link href="/buggy" className="text-gray-700 hover:text-gray-900 font-medium">Buggy</Link>
            <Link href="/admin" className="text-blue-700 hover:text-blue-900 font-medium">Admin</Link>
            
            <div className="flex items-center space-x-2 text-gray-600 ml-4">
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
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Brasil</Link>
              <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Mansões</Link>
              <Link href="/iates" className="text-gray-700 hover:text-gray-900 font-medium">Iates</Link>
              <Link href="/escuna" className="text-gray-700 hover:text-gray-900 font-medium">Escuna</Link>
              <Link href="/transfer" className="text-gray-700 hover:text-gray-900 font-medium">Transfer</Link>
              <Link href="/buggy" className="text-gray-700 hover:text-gray-900 font-medium">Buggy</Link>
              <Link href="/admin" className="text-blue-700 hover:text-blue-900 font-medium">Admin</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section with Search
const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&crop=center"
          alt="Búzios"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wide">
            UM PORTAL PARA O LUXO
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 tracking-wider opacity-90">
            EXPLORE NOSSAS PROPRIEDADES EM BÚZIOS
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in e check-out
                </label>
                <Input
                  type="text"
                  placeholder="Selecione as datas"
                  className="h-12 border-gray-200 rounded-md"
                />
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hóspedes
                </label>
                <Select defaultValue="2">
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue />
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
                <Select defaultValue="buzios">
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buzios">Búzios, RJ</SelectItem>
                    <SelectItem value="cabo-frio">Cabo Frio, RJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartos
                </label>
                <Select defaultValue="2">
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue />
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
    </div>
  )
}

// NOVO Property Card Component - REDESENHADO
const PropertyCard = ({ listing, category }) => {
  const getPropertyImage = (listing, category) => {
    if (listing.featured_image) return listing.featured_image;
    if (listing.media && listing.media.length > 0) return listing.media[0].url;
    const categoryImages = {
      mansoes: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center',
      iates: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop&crop=center',
      escuna: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center',
      transfer: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center',
      buggy: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center'
    };
    return categoryImages[category] || categoryImages.mansoes;
  };

  return (
    <Link href={`/${category}/${listing.slug || listing.id}`} className="block">
      <Card className="group bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative overflow-hidden">
            <img
              src={getPropertyImage(listing, category)}
              alt={listing.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center';
              }}
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {listing.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
              {listing.bedrooms && <span className="flex items-center"><Bed className="w-4 h-4 mr-1.5" />{listing.bedrooms} Quartos</span>}
              {listing.guests && <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Hóspedes</span>}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">A partir de</p>
                <p className="font-semibold text-gray-800">{listing.price_label}</p>
              </div>
              <Button variant="outline">Detalhes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


// NOVA SEÇÃO DE CATEGORIA - REDESENHADA
const CategorySection = ({ title, description, listings, category }) => {
  if (!listings || listings.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
              {title}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            <Link href={`/${category}`}>
              <Button variant="outline" size="lg">
                Ver mais
              </Button>
            </Link>
          </div>

          <div className="w-full">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {listings.map((listing) => (
                  <CarouselItem key={listing.id} className="md:basis-1/2">
                    <div className="p-1">
                      <PropertyCard 
                        listing={listing} 
                        category={category}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

// Seção de Categoria Original - Mantida para compatibilidade
const OriginalCategorySection = ({ title, listings, category }) => {
  if (!listings || listings.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {listings.slice(0, 4).map((listing) => (
            <PropertyCard 
              key={listing.id} 
              listing={listing} 
              category={category}
            />
          ))}
        </div>

        {listings.length > 4 && (
          <div className="text-center mt-12">
            <Link href={`/${category}`}>
              <Button variant="outline" size="lg">
                Ver todas as {title.toLowerCase()}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}


// Footer com Logo, CNPJ e Instagram
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Wordmaster Beach Búzios Logo Rodapé"
                width={160}
                height={45}
              />
            </div>
            <p className="text-gray-600 mb-6">
              Experiências de luxo em Búzios. Mansões, iates, transfers e muito mais.
            </p>
            <p className="text-gray-500 text-sm">CNPJ: 22.269.571/0001-69</p> 
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Destinos</h4>
            <div className="space-y-3">
              <Link href="/mansoes" className="block text-gray-600 hover:text-gray-900">Mansões de Luxo</Link>
              <Link href="/iates" className="block text-gray-600 hover:text-gray-900">Iates & Embarcações</Link>
              <Link href="/transfer" className="block text-gray-600 hover:text-gray-900">Transfer & Táxi Aéreo</Link>
              <Link href="/escuna" className="block text-gray-600 hover:text-gray-900">Passeios de Escuna</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Contato</h4>
            <div className="space-y-3">
              <div className="text-gray-600">
                <div>+55 21 97686-0759</div>
              </div>
              <div className="text-gray-600">
                <div>wordmaster01@outlook.com</div>
              </div>
              <a href="https://www.instagram.com/wordmasterbeachbuzios" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center">
                <Instagram className="w-4 h-4 mr-2" />
                wordmasterbeachbuzios
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Admin</h4>
            <div className="space-y-3">
              <Link href="/admin" className="block text-blue-600 hover:text-blue-800">Painel Administrativo</Link>
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

  // Fallback data with proper image structure
  const getFallbackData = () => ({
    mansoes: [
      {
        id: '1',
        title: 'Villa paradisíaca em Geribá',
        subtitle: 'Esta é uma fabulosa cobertura com vista deslumbrante para o mar.',
        category: 'mansoes',
        neighborhood: 'Geribá, Búzios',
        price_label: 'R$ 3.500,00',
        guests: 12,
        bedrooms: 6,
        bathrooms: 5,
        featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      },
      {
        id: '2',
        title: 'Luxuosa cobertura triplex no Centro',
        subtitle: 'Propriedade única com acabamentos de primeira linha.',
        category: 'mansoes',
        neighborhood: 'Centro, Búzios',
        price_label: 'R$ 2.500,00',
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        featured_image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      },
      {
        id: '3',
        title: 'Casa de praia exclusiva',
        subtitle: 'Acesso direto à praia com piscina privativa.',
        category: 'mansoes',
        neighborhood: 'Ferradura, Búzios',
        price_label: 'R$ 4.200,00',
        guests: 10,
        bedrooms: 5,
        bathrooms: 4,
        featured_image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=400&h=250&fit=crop&crop=center',
        is_featured: false
      },
      {
        id: '4',
        title: 'Mansão vista mar premium',
        subtitle: 'Luxo e conforto em propriedade exclusiva.',
        category: 'mansoes',
        neighborhood: 'Geribá, Búzios',
        price_label: 'R$ 5.800,00',
        guests: 14,
        bedrooms: 7,
        bathrooms: 6,
        featured_image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      }
    ],
    iates: [
      {
        id: '5',
        title: 'Iate de luxo de 62 pés',
        subtitle: 'Experiência náutica premium com tripulação completa.',
        category: 'iates',
        neighborhood: 'Marina, Búzios',
        price_label: 'R$ 8.500,00',
        guests: 20,
        bedrooms: 4,
        featured_image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      },
      {
        id: '6',
        title: 'Lancha esportiva premium',
        subtitle: 'Velocidade e conforto para passeios exclusivos.',
        category: 'iates',
        neighborhood: 'Marina, Búzios',
        price_label: 'R$ 4.200,00',
        guests: 12,
        bedrooms: 2,
        featured_image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      }
    ],
    escuna: [
      {
        id: '7',
        title: 'Escuna Tradicional Búzios',
        subtitle: 'Passeio clássico visitando as 12 praias mais belas.',
        category: 'escuna',
        neighborhood: 'Porto, Búzios',
        price_label: 'R$ 180,00',
        guests: 40,
        bedrooms: 0,
        featured_image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      }
    ],
    transfer: [
      {
        id: '8',
        title: 'Helicóptero Executive',
        subtitle: 'Transfer VIP com vista aérea espetacular.',
        category: 'transfer',
        neighborhood: 'Heliporto, Búzios',
        price_label: 'R$ 2.500,00',
        guests: 4,
        bedrooms: 0,
        featured_image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      }
    ],
    buggy: [
      {
        id: '9',
        title: 'Buggy Adventure 4x4',
        subtitle: 'Aventura off-road por trilhas selvagens.',
        category: 'buggy',
        neighborhood: 'Base Centro, Búzios',
        price_label: 'R$ 350,00',
        guests: 4,
        bedrooms: 0,
        featured_image: 'https://images.unsplash.com/photo-1606635278919-00d3bc78ce2c?w=400&h=250&fit=crop&crop=center',
        is_featured: true
      }
    ]
  })

  // Fetch listings with proper API integration
  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const categories = ['mansoes', 'iates', 'escuna', 'transfer', 'buggy']
        const promises = categories.map(category => 
          fetch(`/api/listings?category=${category}&limit=8`)
            .then(res => {
              if (res.ok) {
                return res.json()
              } else {
                console.log(`API failed for ${category}, using fallback`)
                return { listings: [] }
              }
            })
            .catch(error => {
              console.log(`Error fetching ${category}:`, error)
              return { listings: [] }
            })
        )
        
        const results = await Promise.all(promises)
        const listingsData = {}
        
        categories.forEach((category, index) => {
          const apiListings = results[index].listings || []
          listingsData[category] = apiListings
        })

        // Merge with fallback data
        const fallbackData = getFallbackData()
        Object.keys(listingsData).forEach(category => {
          if (listingsData[category].length === 0) {
            listingsData[category] = fallbackData[category] || []
          } else {
            // Ensure API listings have proper image fallbacks
            listingsData[category] = listingsData[category].map(listing => ({
              ...listing,
              featured_image: listing.featured_image || 
                              (listing.media && listing.media[0]?.url) || 
                              fallbackData[category][0]?.featured_image
            }))
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
      {/* Navbar */}
      <VillasNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <HeroSection />

      {/* Category Sections */}
      {!loading && (
        <>
          <OriginalCategorySection
            title="APARTAMENTOS E CASAS DE LUXO PARA ALUGAR" 
            listings={allListings.mansoes} 
            category="mansoes" 
          />
          
          {/* SEÇÃO DE IATES ATUALIZADA */}
          <CategorySection 
            title="ALUGUEL DE IATES DE LUXO" 
            description="Confira nossas opções de lanchas para complementar sua viagem com luxo, apreciação e aventura que nossos serviços de concierge podem oferecer."
            listings={allListings.iates} 
            category="iates" 
          />
          
          <OriginalCategorySection 
            title="PASSEIOS DE ESCUNA" 
            listings={allListings.escuna} 
            category="escuna" 
          />
          
          <OriginalCategorySection 
            title="TRANSFER & TÁXI AÉREO" 
            listings={allListings.transfer} 
            category="transfer" 
          />
        </>
      )}

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

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.open('https://wa.me/5521976860759', '_blank')}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110"
        >
          <Phone className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}