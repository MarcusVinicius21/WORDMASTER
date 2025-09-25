'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { MapPin, Users, Bed, Bath, Maximize, X, Phone, Anchor, Calendar, Clock, Car, Plane, ArrowLeft, ArrowRight, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

const VillasNavbar = () => (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Wordmaster Beach Búzios Logo"
              width={144}
              height={40}
              priority
            />
          </Link>
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Aluguel de Mansões</Link>
            <Link href="/lanchas" className="text-gray-700 hover:text-gray-900 font-medium">Aluguel de Lanchas</Link>
            <Link href="/escuna" className="text-gray-700 hover:text-gray-900 font-medium">Passeios de Escuna</Link>
            <Link href="/taxi-aereo" className="text-gray-700 hover:text-gray-900 font-medium">Táxi Aéreo</Link>
            <Link href="/transfer" className="text-gray-700 hover:text-gray-900 font-medium">Transfer</Link>
            <Link href="/buggy" className="text-gray-700 hover:text-gray-900 font-medium">Aluguel de Buggy</Link>
          </div>
        </div>
      </div>
    </nav>
)

// COMPONENTE DE GALERIA TOTALMENTE REFORMULADO E CORRIGIDO
const VillasGallery = ({ images, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gridExpanded, setGridExpanded] = useState(false);

  const galleryImages = images && images.length > 0 
    ? images.map(img => img.url) 
    : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center"];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  };

  const goToNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
  };

  const handleKeyDown = (e) => {
    if (lightboxOpen) {
        if (e.key === 'ArrowLeft') goToPrevious(e);
        if (e.key === 'ArrowRight') goToNext(e);
        if (e.key === 'Escape') closeLightbox();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, currentImageIndex]);

  const remainingImagesCount = galleryImages.length - 5;

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="relative cursor-pointer group" onClick={() => openLightbox(0)}>
        <img src={galleryImages[0]} alt={title} className="w-full h-full object-cover rounded-md aspect-[4/3] group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-2 gap-2 h-full">
          {galleryImages.slice(1, 5).map((img, index) => (
            <div key={index} className="relative cursor-pointer group" onClick={() => openLightbox(index + 1)}>
              <img src={img} alt={`${title} - ${index + 2}`} className="w-full h-full object-cover rounded-md aspect-video group-hover:opacity-90 transition-opacity" />
              {index === 3 && remainingImagesCount > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white rounded-md hover:bg-opacity-70 transition-all cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setGridExpanded(true); }}>
                  <div className="text-center">
                    <div className="text-3xl font-bold">+{remainingImagesCount}</div>
                    <div className="text-sm mt-1">Ver mais</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderLightbox = () => (
    lightboxOpen && (
      <div className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center" onClick={closeLightbox}>
        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white z-20 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-8 h-8" />
        </button>
        {galleryImages.length > 1 && (
          <>
            <button onClick={goToPrevious} className="absolute left-4 z-20 text-white p-3 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={goToNext} className="absolute right-4 z-20 text-white p-3 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        <div className="relative w-full max-w-6xl max-h-[90vh] px-4">
          <img src={galleryImages[currentImageIndex]} alt={`${title} - ${currentImageIndex + 1}`} className="max-w-full max-h-[85vh] object-contain mx-auto" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      </div>
    )
  );

  if (gridExpanded) {
    return (
      <div className="w-full relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Todas as fotos ({galleryImages.length})</h3>
          <Button onClick={() => setGridExpanded(false)} variant="outline" size="sm">
            Voltar ao layout compacto
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImages.map((img, index) => (
            <div key={index} className="relative cursor-pointer group aspect-video" onClick={() => openLightbox(index)}>
              <img src={img} alt={`${title} - ${index + 1}`} className="w-full h-full object-cover rounded-md group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center rounded-md">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
        {renderLightbox()}
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {renderGrid()}
      {galleryImages.length > 5 && (
        <div className="absolute bottom-4 right-4">
          <Button onClick={() => setGridExpanded(true)} variant="secondary" className="bg-white/90 hover:bg-white text-gray-800 shadow-lg">
             Ver todas as {galleryImages.length} fotos
          </Button>
        </div>
      )}
      {renderLightbox()}
    </div>
  );
};


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
      case 'lanchas':
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
            {listing.vehicle_type === 'bimotor' && <Badge variant="outline"><Plane className="w-4 h-4 mr-1" />Bimotor</Badge>}
            {listing.vehicle_type === 'jet' && <Badge variant="outline"><Plane className="w-4 h-4 mr-1" />Jato</Badge>}
            {listing.vehicle_model && <Badge variant="outline">{listing.vehicle_model}</Badge>}
            {listing.duration && <Badge variant="outline"><Clock className="w-4 h-4 mr-1" />{listing.duration}</Badge>}
          </div>
        );
      case 'transfer':
        return (
          <div className="flex flex-wrap gap-2">
            {listing.guests && <Badge variant="outline"><Users className="w-4 h-4 mr-1" />{listing.guests} passageiros</Badge>}
            {listing.vehicle_type === 'van' && <Badge variant="outline"><Car className="w-4 h-4 mr-1" />Van</Badge>}
            {listing.vehicle_type === 'bus' && <Badge variant="outline"><Car className="w-4 h-4 mr-1" />Ônibus</Badge>}
            {listing.vehicle_type === 'luxury_car' && <Badge variant="outline"><Car className="w-4 h-4 mr-1" />Carro de Luxo</Badge>}
            {listing.vehicle_model && <Badge variant="outline">{listing.vehicle_model}</Badge>}
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
    message: '',
    wantChef: false
  })

  const getFormLabel = () => {
    switch (category) {
      case 'lanchas': return 'Data do passeio';
      case 'escuna': return 'Data do passeio';
      case 'taxi-aereo': return 'Data do voo';
      case 'transfer': return 'Data do transfer';
      case 'buggy': return 'Data do aluguel';
      default: return 'Check-in';
    }
  };

  const getCheckoutLabel = () => {
    switch (category) {
      case 'lanchas': case 'escuna': case 'taxi-aereo': case 'transfer':
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
      lanchas: 'lancha',
      escuna: 'passeio de escuna',
      'taxi-aereo': 'táxi aéreo',
      transfer: 'transfer',
      buggy: 'buggy'
    }[category] || 'serviço';
    const chefMessage = formData.wantChef ? '\n- 🍽️ CONTRATAR CHEF: SIM' : '';
    const message = `Olá! Tenho interesse no ${serviceType} "${listing?.title}".\n\n- ${getFormLabel()}: ${formData.checkIn}\n- ${getCheckoutLabel()}: ${formData.checkOut}\n- ${category === 'mansoes' ? 'Hóspedes' : 'Pessoas'}: ${formData.guests}\n- Email: ${formData.email}${chefMessage}\n- Mensagem: ${formData.message}\n\nVi no site.`
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
              <input type="date" value={formData.checkIn} onChange={(e) => setFormData(p => ({ ...p, checkIn: e.target.value }))} className="w-full border-0 bg-transparent text-sm focus:outline-none" />
            </div>
            <div className="border-l border-gray-300 pl-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">{getCheckoutLabel()}</label>
              <input type={category === 'taxi-aereo' || category === 'transfer' || category === 'escuna' || category === 'lanchas' ? 'time' : 'date'} value={formData.checkOut} onChange={(e) => setFormData(p => ({ ...p, checkOut: e.target.value }))} className="w-full border-0 bg-transparent text-sm focus:outline-none" />
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">{category === 'mansoes' ? 'Hóspedes' : 'Pessoas'}</label>
            <Select value={formData.guests} onValueChange={(v) => setFormData(p => ({ ...p, guests: v }))}>
              <SelectTrigger className="border-0 p-0 h-auto"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="4">4</SelectItem><SelectItem value="6">6</SelectItem><SelectItem value="8">8+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {category === 'mansoes' && (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="wantChef" checked={formData.wantChef} onChange={(e) => setFormData(p => ({ ...p, wantChef: e.target.checked }))} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                <label htmlFor="wantChef" className="text-sm font-medium text-gray-800">👨‍🍳 Contratar Chef Exclusivo</label>
              </div>
              <p className="text-xs text-gray-500 mt-1 pl-8">Adicione um chef particular para sua estadia.</p>
            </div>
          )}
          <Input type="email" placeholder="Seu e-mail" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="border-gray-300" required />
          <textarea placeholder="Mensagem" value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg" rows={3}/>
          <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white">Entrar em contato</Button>
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

  const getCategoryDisplayName = (category) => {
    const names = {
      'mansoes': 'Aluguel de Mansões',
      'lanchas': 'Aluguel de Lanchas',
      'escuna': 'Passeios de Escuna',
      'taxi-aereo': 'Táxi Aéreo',
      'transfer': 'Transfer',
      'buggy': 'Aluguel de Buggy'
    };
    return names[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <VillasNavbar />
        <div className="container mx-auto p-6 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
        <div className="min-h-screen bg-white">
            <VillasNavbar />
            <div className="container mx-auto p-6 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Propriedade não encontrada</h1>
                <p className="text-gray-600 mb-6">O item que você está procurando não existe ou foi removido.</p>
                <Link href="/"><Button>Voltar ao início</Button></Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <VillasNavbar />
      <div className="container mx-auto px-6 py-8">
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href={`/${category}`} className="hover:text-gray-900">{getCategoryDisplayName(category)}</Link>
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
              
              <PropertySpecs listing={listing} category={category} />
            </div>
            
            {listing.description && (
              <div className="prose max-w-none mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category === 'lanchas' ? 'Sobre a lancha' : 
                   category === 'escuna' ? 'Sobre o passeio' :
                   category === 'taxi-aereo' ? 'Sobre o táxi aéreo' :
                   category === 'transfer' ? 'Sobre o transfer' :
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