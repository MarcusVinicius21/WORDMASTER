'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { MapPin, Users, Bed, Bath, Maximize, X, Phone, Anchor, Calendar, Clock, Car, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const VillasNavbar = () => (
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
            <Link href="/taxi-aereo" className="text-gray-700 hover:text-gray-900 font-medium">Táxi Aéreo</Link>
            <Link href="/buggy" className="text-gray-700 hover:text-gray-900 font-medium">Buggy</Link>
          </div>
        </div>
      </div>
    </nav>
)

const VillasGallery = ({ images, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryImages = images && images.length > 0 ? images.map(img => img.url) : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center"];

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="relative cursor-pointer" onClick={() => setLightboxOpen(true)}>
          <img src={galleryImages[0]} alt={title} className="w-full h-full object-cover rounded-md aspect-[4/3]" />
        </div>
        <div className="grid grid-cols-2 gap-2 h-full">
          {galleryImages.slice(1, 5).map((img, index) => (
            <div key={index} className="relative cursor-pointer" onClick={() => setLightboxOpen(true)}>
              <img src={img} alt={title} className="w-full h-full object-cover rounded-md aspect-video" />
            </div>
          ))}
        </div>
      </div>
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
            <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white z-10 p-2"><X className="w-8 h-8" /></button>
            <img src={galleryImages[0]} alt={title} className="max-w-full max-h-[90vh] object-contain" />
        </div>
      )}
    </div>
  )
}

// Componente de informações específicas por categoria
const PropertySpecs = ({ listing, category }) => {
  const renderSpecs = () => {
    switch (category) {
      case 'mansoes':
        return (
          <div className="flex flex-wrap gap-2">
            {listing.guests && <Badge variant="outline"><Users className="w-4 h-4 mr-1" />{listing.guests} pessoas</Badge>}
            {listing.bedrooms && <Badge variant="outline"><Bed className="w-4 h-4 mr-1" />{listing.bedrooms} Quartos</Badge>}
            {listing.bathrooms && <Badge variant="outline"><Bath className="w-4 h-4 mr-1" />{listing.bathrooms} Banheiros</Badge>}
            {listing.area_m2 && <Badge variant="outline"><Maximize className="w-4 h-4 mr-1" />{listing.area_m2}m²</Badge>}
          </div>
        );
        
      case 'iates':
        return (
          <div className="flex flex-wrap gap-2">
            {listing.guests && <Badge variant="outline"><Users className="w-4 h-4 mr-1" />{listing.guests} passageiros</Badge>}
            {listing.boat_length && <Badge variant="outline"><Anchor className="w-4 h-4 mr-1" />{listing.boat_length} pés</Badge>}
            {listing.bedrooms && <Badge variant="outline"><Bed className="w-4 h-4 mr-1" />{listing.bedrooms} cabines</Badge>}
            {listing.boat_year && <Badge variant="outline"><Calendar className="w-4 h-4 mr-1" />Ano {listing.boat_year}</Badge>}
          </div>
        );
        
      case 'escuna':
        return (
          <div className="flex flex-wrap gap-2">
            {listing.guests && <Badge variant="outline"><Users className="w-4 h-4 mr-1" />{listing.guests} passageiros</Badge>}
            {listing.duration && <Badge variant="outline"><Clock className="w-4 h-4 mr-1" />{listing.duration}</Badge>}
            {listing.boat_length && <Badge variant="outline"><Anchor className="w-4 h-4 mr-1" />{listing.boat_length} pés</Badge>}
            {listing.includes_meal && <Badge variant="outline">🍽️ Refeição inclusa</Badge>}
          </div>
        );
        
      case 'taxi-aereo':
        return (
          <div className="flex flex-wrap gap-2">
            {listing.guests && <Badge variant="outline"><Users className="w-4 h-4 mr-1" />{listing.guests} passageiros</Badge>}
            {listing.vehicle_type === 'helicopter' && <Badge variant="outline"><Plane className="w-4 h-4 mr-1" />Helicóptero</Badge>}
            {listing.vehicle_type === 'car' && <Badge variant="outline"><Car className="w-4 h-4 mr-1" />Veículo terrestre</Badge>}
            {listing.duration && <Badge variant="outline"><Clock className="w-4 h-4 mr-1" />{listing.duration}</Badge>}
          </div>
        );
        
      case 'buggy':
        return (
          <div className="flex flex-wrap gap-2">
            {listing.guests && <Badge variant="outline"><Users className="w-4 h-4 mr-1" />{listing.guests} pessoas</Badge>}
            {listing.vehicle_model && <Badge variant="outline"><Car className="w-4 h-4 mr-1" />{listing.vehicle_model}</Badge>}
            {listing.duration && <Badge variant="outline"><Clock className="w-4 h-4 mr-1" />{listing.duration}</Badge>}
          </div>
        );
        
      default:
        return (
          <div className="flex flex-wrap gap-2">
            {listing.guests && <Badge variant="outline"><Users className="w-4 h-4 mr-1" />{listing.guests} pessoas</Badge>}
          </div>
        );
    }
  };

  return renderSpecs();
};

const ContactForm = ({ listing, category }) => {
  const [formData, setFormData] = useState({ 
    checkIn: '', 
    checkOut: '', 
    guests: '2', 
    email: '', 
    message: '' 
  })

  const getFormLabel = () => {
    switch (category) {
      case 'iates':
        return 'Data do passeio';
      case 'escuna':
        return 'Data do passeio';
      case 'taxi-aereo':
        return 'Data do serviço';
      case 'buggy':
        return 'Data do aluguel';
      default:
        return 'Check-in';
    }
  };

  const getCheckoutLabel = () => {
    switch (category) {
      case 'iates':
      case 'escuna':
      case 'taxi-aereo':
        return 'Horário preferido';
      case 'buggy':
        return 'Data de devolução';
      default:
        return 'Check-out';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappNumber = "5521976860759"
    const serviceType = {
      mansoes: 'propriedade',
      iates: 'iate',
      escuna: 'passeio de escuna',
      'taxi-aereo': 'táxi aéreo',
      buggy: 'buggy'
    }[category] || 'serviço';

    const message = `Olá! Tenho interesse no ${serviceType} "${listing?.title}".\n\n- ${getFormLabel()}: ${formData.checkIn}\n- ${getCheckoutLabel()}: ${formData.checkOut}\n- ${category === 'mansoes' ? 'Hóspedes' : 'Pessoas'}: ${formData.guests}\n- Email: ${formData.email}\n- Mensagem: ${formData.message}\n\nVi no site.`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="text-right mb-4">
          <div className="text-sm text-gray-600">A partir de</div>
          <div className="text-3xl font-bold text-gray-900">{listing?.price_label || 'Consulte'}</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">{getFormLabel()}</label>
              <input 
                type={category === 'mansoes' ? 'date' : category === 'taxi-aereo' || category === 'escuna' || category === 'iates' ? 'date' : 'date'} 
                value={formData.checkIn} 
                onChange={(e) => setFormData(p => ({ ...p, checkIn: e.target.value }))} 
                className="w-full border-0 bg-transparent text-sm focus:outline-none" 
              />
            </div>
            <div className="border-l border-gray-300 pl-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{getCheckoutLabel()}</label>
              <input 
                type={category === 'taxi-aereo' || category === 'escuna' || category === 'iates' ? 'time' : 'date'} 
                value={formData.checkOut} 
                onChange={(e) => setFormData(p => ({ ...p, checkOut: e.target.value }))} 
                className="w-full border-0 bg-transparent text-sm focus:outline-none" 
              />
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {category === 'mansoes' ? 'Hóspedes' : 'Pessoas'}
            </label>
            <Select value={formData.guests} onValueChange={(v) => setFormData(p => ({ ...p, guests: v }))}>
              <SelectTrigger className="border-0 p-0 h-auto"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="8">8+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input 
            type="email" 
            placeholder="Seu e-mail" 
            value={formData.email} 
            onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} 
            className="border-gray-300" 
            required
          />
          <textarea 
            placeholder="Mensagem" 
            value={formData.message} 
            onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} 
            className="w-full p-3 border border-gray-300 rounded-lg" 
            rows={3}
          />
          <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white">
            Entrar em contato
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function PropertyDetailPage() {
  const params = useParams()
  const { category, slug } = params
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      const fetchProperty = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/listings/${slug}`);
          if (response.ok) {
            const data = await response.json();
            setListing(data);
          } else {
            setListing(null);
          }
        } catch (error) {
          console.error('Error fetching property:', error);
          setListing(null);
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [slug]);

  if (loading) {
    return (<div className="min-h-screen bg-white"><VillasNavbar /><div className="container mx-auto p-6 py-20 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div><p className="mt-4 text-gray-600">Carregando...</p></div></div>);
  }

  if (!listing) {
    return (<div className="min-h-screen bg-white"><VillasNavbar /><div className="container mx-auto p-6 py-20 text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Propriedade não encontrada</h1><p className="text-gray-600 mb-6">O item que você está procurando não existe ou foi removido.</p><Link href="/"><Button>Voltar ao início</Button></Link></div></div>);
  }

  return (
    <div className="min-h-screen bg-white">
      <VillasNavbar />
      <div className="container mx-auto px-6 py-8">
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href={`/${category}`} className="hover:text-gray-900 capitalize">{category === 'taxi-aereo' ? 'Táxi Aéreo' : category}</Link>
          <span>/</span>
          <span className="text-gray-900">{listing.title}</span>
        </nav>
        
        <VillasGallery title={listing.title} images={listing.media} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="mb-6 border-b pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title.toUpperCase()}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{listing.neighborhood}</span>
              </div>
              
              {/* Especificações específicas por categoria */}
              <PropertySpecs listing={listing} category={category} />
            </div>
            
            {listing.description && (
              <div className="prose max-w-none mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category === 'iates' ? 'Sobre o iate' : 
                   category === 'escuna' ? 'Sobre o passeio' :
                   category === 'taxi-aereo' ? 'Sobre o táxi aéreo' :
                   category === 'buggy' ? 'Sobre o buggy' :
                   'Sobre a propriedade'}
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{listing.description}</div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <ContactForm listing={listing} category={category} />
          </div>
        </div>
      </div>
    </div>
  )
}