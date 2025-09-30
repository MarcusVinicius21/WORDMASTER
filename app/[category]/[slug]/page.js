'use client'

import React, { useState, useEffect, useRef } from "react"
import { Search, Star, MapPin, Phone, Instagram, Users, Bed, Bath, Anchor, Calendar, Clock, Car, Plane, Maximize, Bus, Loader2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Navbar from "@/components/Navbar"

// Componente de Botão do WhatsApp
const WhatsAppButton = ({ listing, className = "" }) => {
  const whatsappNumber = "5521976860759" // Para centralizar, idealmente viria de process.env
  const message = `Olá! Tenho interesse em "${listing?.title || 'um de seus serviços'}". Vi no site.`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  return (
    <Button 
      className={`bg-green-600 hover:bg-green-700 text-white transition-transform hover:scale-105 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        window.open(whatsappUrl, '_blank')
      }}
    >
      WhatsApp
    </Button>
  )
}

// Esqueleto de Carregamento para os Cards
const PropertyCardSkeleton = () => (
    <Card className="bg-white border border-gray-200 overflow-hidden h-full flex flex-col rounded-2xl animate-pulse">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="bg-gray-200 h-56 w-full rounded-t-2xl" />
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-8 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
)

// Esqueleto de Carregamento para as Seções de Categoria
const CategorySectionSkeleton = () => (
  <section className="py-16 md:py-20 bg-white overflow-hidden">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5 text-center lg:text-left mb-8 lg:mb-0 space-y-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto lg:mx-0" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-10 bg-gray-200 rounded-full w-32 mx-auto lg:mx-0" />
        </div>
        <div className="lg:col-span-7 w-full">
          <div className="flex gap-4 overflow-hidden">
            <div className="min-w-[280px]"><PropertyCardSkeleton /></div>
            <div className="min-w-[280px] hidden md:block"><PropertyCardSkeleton /></div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// Seção Hero com a Busca
const HeroSection = ({ onSearch, isSearching, currentFilters, selectedService, setSelectedService }) => {
  const [localFilters, setLocalFilters] = useState({
    guests: '', bedrooms: '', boat_length: '', vehicle_type: '',
  });

  useEffect(() => { setLocalFilters(currentFilters); }, [currentFilters]);

  const handleServiceChange = (value) => {
    setSelectedService(value);
    setLocalFilters({ guests: '', bedrooms: '', boat_length: '', vehicle_type: '' });
  };

  const handleParamChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value === 'any' ? '' : value }));
  };

  const handleSearch = () => { onSearch(selectedService, localFilters); };

  const renderFilters = () => {
    // ... (código dos filtros permanece o mesmo)
    switch (selectedService) {
      case 'mansoes':
        return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hóspedes</label>
              <Select value={localFilters.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Qualquer</SelectItem><SelectItem value="2">2+</SelectItem><SelectItem value="4">4+</SelectItem><SelectItem value="6">6+</SelectItem><SelectItem value="8">8+</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quartos</label>
              <Select value={localFilters.bedrooms || 'any'} onValueChange={(value) => handleParamChange('bedrooms', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Qualquer</SelectItem><SelectItem value="2">2+</SelectItem><SelectItem value="3">3+</SelectItem><SelectItem value="4">4+</SelectItem><SelectItem value="5">5+</SelectItem></SelectContent>
              </Select>
            </div>
          </>
        );
      case 'lanchas':
        return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passageiros</label>
              <Select value={localFilters.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Qualquer</SelectItem><SelectItem value="4">4+</SelectItem><SelectItem value="8">8+</SelectItem><SelectItem value="12">12+</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pés</label>
              <Input type="number" placeholder="Ex: 50" className="h-12 border-gray-200 rounded-md" value={localFilters.boat_length || ''} onChange={(e) => handleParamChange('boat_length', e.target.value)} />
            </div>
          </>
        );
      case 'escuna': case 'buggy':
        return (
          <div className="text-left sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pessoas</label>
            <Select value={localFilters.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Qualquer</SelectItem><SelectItem value="1">1+</SelectItem><SelectItem value="4">4+</SelectItem><SelectItem value="10">10+</SelectItem></SelectContent>
            </Select>
          </div>
        );
       case 'taxi-aereo':
         return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passageiros</label>
              <Select value={localFilters.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Qualquer</SelectItem><SelectItem value="1">1+</SelectItem><SelectItem value="2">2+</SelectItem><SelectItem value="4">4+</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <Select value={localFilters.vehicle_type || 'any'} onValueChange={(value) => handleParamChange('vehicle_type', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Todos</SelectItem><SelectItem value="helicopter">Helicóptero</SelectItem><SelectItem value="bimotor">Bimotor</SelectItem><SelectItem value="jet">Jato</SelectItem></SelectContent>
              </Select>
            </div>
          </>
        );
       case 'transfer':
         return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passageiros</label>
              <Select value={localFilters.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Qualquer</SelectItem><SelectItem value="1">1+</SelectItem><SelectItem value="4">4+</SelectItem><SelectItem value="8">8+</SelectItem><SelectItem value="15">15+</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <Select value={localFilters.vehicle_type || 'any'} onValueChange={(value) => handleParamChange('vehicle_type', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent><SelectItem value="any">Todos</SelectItem><SelectItem value="luxury_car">Carro de Luxo</SelectItem><SelectItem value="van">Van</SelectItem><SelectItem value="bus">Ônibus</SelectItem></SelectContent>
              </Select>
            </div>
          </>
        );
      default: return <div className="sm:col-span-2"></div>;
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0"><Image src="/banner.jpg" alt="Búzios" fill style={{objectFit: "cover"}} priority quality={85} /><div className="absolute inset-0 bg-black/40" /></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white w-full max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wide">UM PORTAL PARA O LUXO</h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 tracking-wider opacity-90">EXPLORE NOSSAS PROPRIEDADES EM BÚZIOS</p>
          <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <div className="text-left md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
                <Select value={selectedService} onValueChange={handleServiceChange}>
                  <SelectTrigger className="h-12 border-gray-200 text-black"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="mansoes">Mansões</SelectItem><SelectItem value="lanchas">Lanchas</SelectItem><SelectItem value="escuna">Escuna</SelectItem><SelectItem value="taxi-aereo">Táxi Aéreo</SelectItem><SelectItem value="transfer">Transfer</SelectItem><SelectItem value="buggy">Buggy</SelectItem></SelectContent>
                </Select>
              </div>
              {renderFilters()}
              <Button className="h-12 bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 w-full transition-transform hover:scale-105" onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Buscando...</>) : ('Buscar')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Seção de Resultados da Busca
const SearchResults = ({ results, onClearSearch, isLoading }) => {
  if (results === null && !isLoading) return null;
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-8"><Loader2 className="w-8 h-8 animate-spin text-gray-600 mr-3" /><h2 className="text-2xl font-bold text-gray-900">Buscando...</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><_array(4) />.map((_, i) => (<PropertyCardSkeleton key={i} />))}</div>
        </div>
      </section>
    );
  }
  if (results.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nenhuma propriedade encontrada</h2>
            <p className="text-gray-600 mb-6">Tente ajustar seus filtros de busca ou explore nossas categorias abaixo.</p>
            <Button onClick={onClearSearch} variant="outline">Ver todas as propriedades</Button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8"><h2 className="text-2xl font-bold text-gray-900">Resultados da busca ({results.length} {results.length === 1 ? 'encontrada' : 'encontradas'})</h2><Button onClick={onClearSearch} variant="outline" size="sm">Limpar busca</Button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{results.map((listing) => (<PropertyCard key={listing.id} listing={listing} category={listing.category} />))}</div>
      </div>
    </section>
  );
};

// Card de Propriedade (com micro-interação)
const PropertyCard = ({ listing, category }) => {
    // ... (lógica do getPropertyImage e renderSpecifications permanece a mesma)
    const getPropertyImage = (listing, category) => {
        if (listing.featured_image) return listing.featured_image;
        if (listing.media && listing.media.length > 0) return listing.media[0].url;
        const categoryImages = {
          mansoes: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center',
          lanchas: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop&crop=center',
          escuna: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center',
          'taxi-aereo': 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center',
          transfer: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop&crop=center',
          buggy: 'https://images.unsplash.com/photo-1558618666-fbd7c94d633d?w=400&h=250&fit=crop&crop=center'
        };
        return categoryImages[category] || categoryImages.mansoes;
      };
    
      const renderSpecifications = () => {
        const specs = [];
        switch (category) {
          case 'mansoes': if (listing.guests) specs.push(<span key="guests" className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Hóspedes</span>); if (listing.bedrooms) specs.push(<span key="bedrooms" className="flex items-center"><Bed className="w-4 h-4 mr-1.5" />{listing.bedrooms} Quartos</span>); if (listing.bathrooms) specs.push(<span key="bathrooms" className="flex items-center"><Bath className="w-4 h-4 mr-1.5" />{listing.bathrooms} Banheiros</span>); if (listing.area_m2) specs.push(<span key="area" className="flex items-center"><Maximize className="w-4 h-4 mr-1.5" />{listing.area_m2}m²</span>); break;
          case 'lanchas': if (listing.guests) specs.push(<span key="guests" className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Passageiros</span>); if (listing.boat_length) specs.push(<span key="length" className="flex items-center"><Anchor className="w-4 h-4 mr-1.5" />{listing.boat_length} pés</span>); if (listing.bedrooms) specs.push(<span key="cabins" className="flex items-center"><Bed className="w-4 h-4 mr-1.5" />{listing.bedrooms} Cabines</span>); if (listing.boat_year) specs.push(<span key="year" className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" />{listing.boat_year}</span>); break;
          case 'escuna': if (listing.guests) specs.push(<span key="guests" className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Pessoas</span>); if (listing.duration) specs.push(<span key="duration" className="flex items-center"><Clock className="w-4 h-4 mr-1.5" />{listing.duration}</span>); break;
          case 'taxi-aereo': if (listing.guests) specs.push(<span key="guests" className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Passageiros</span>); if (listing.vehicle_type) { const vehicleIcon = <Plane className="w-4 h-4 mr-1.5" />; const vehicleText = {'helicopter': 'Helicóptero', 'bimotor': 'Bimotor', 'jet': 'Jato'}[listing.vehicle_type] || listing.vehicle_type; specs.push(<span key="vehicle" className="flex items-center">{vehicleIcon}{vehicleText}</span>); } if (listing.duration) specs.push(<span key="duration" className="flex items-center"><Clock className="w-4 h-4 mr-1.5" />{listing.duration}</span>); break;
          case 'transfer': if (listing.guests) specs.push(<span key="guests" className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Passageiros</span>); if (listing.vehicle_type) { const vehicleIcon = listing.vehicle_type === 'bus' ? <Bus className="w-4 h-4 mr-1.5" /> : <Car className="w-4 h-4 mr-1.5" />; const vehicleText = {'luxury_car': 'Carro de Luxo', 'van': 'Van', 'bus': 'Ônibus'}[listing.vehicle_type] || listing.vehicle_type; specs.push(<span key="vehicle" className="flex items-center">{vehicleIcon}{vehicleText}</span>); } if (listing.duration) specs.push(<span key="duration" className="flex items-center"><Clock className="w-4 h-4 mr-1.5" />{listing.duration}</span>); break;
          case 'buggy': if (listing.guests) specs.push(<span key="guests" className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Pessoas</span>); if (listing.vehicle_model) specs.push(<span key="model" className="flex items-center"><Car className="w-4 h-4 mr-1.5" />{listing.vehicle_model}</span>); if (listing.duration) specs.push(<span key="duration" className="flex items-center"><Clock className="w-4 h-4 mr-1.5" />{listing.duration}</span>); break;
          default: if (listing.guests) specs.push(<span key="guests" className="flex items-center"><Users className="w-4 h-4 mr-1.5" />{listing.guests} Pessoas</span>); break;
        }
        return specs;
      };
    
      const specifications = renderSpecifications();

  return (
    <Link href={`/${category}/${listing.slug || listing.id}`} className="block h-full">
      <Card className="group bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col rounded-2xl hover:-translate-y-1">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative overflow-hidden">
            <Image src={getPropertyImage(listing, category)} alt={listing.title} width={400} height={250} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl" loading="lazy" quality={75} />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{listing.title}</h3>
            {specifications.length > 0 && (
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-2 mb-4">
                {specifications.slice(0, 3).map((spec, index) => (<div key={index}>{spec}</div>))}
                {specifications.length > 3 && (<div className="text-gray-400">+{specifications.length - 3}</div>)}
              </div>
            )}
            {specifications.length === 0 && listing.subtitle && (<p className="text-sm text-gray-600 mb-4">{listing.subtitle}</p>)}
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <div><p className="text-sm text-gray-500">A partir de</p><p className="font-semibold text-gray-800">{listing.price_label || 'Consulte'}</p></div>
              <Button variant="outline" size="sm" className="rounded-full transition-transform group-hover:bg-gray-800 group-hover:text-white">Detalhes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Seção de Categoria
const CategorySection = ({ title, description, listings, category, isLoading }) => {
    // ... (código do carrossel e autoplay permanece o mesmo)
    const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    if (isLoading) { return <CategorySectionSkeleton />; }
    if (!listings || listings.length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">{title}</h2>
            <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base max-w-md mx-auto lg:mx-0">{description}</p>
            <Link href={`/${category}`}><Button variant="outline" size="lg" className="rounded-full px-8 transition-transform hover:scale-105">Ver todas</Button></Link>
          </div>
          <div className="lg:col-span-7 w-full">
            <div className="relative">
              <Carousel plugins={[plugin.current]} opts={{ align: "start", loop: true, breakpoints: { '(min-width: 768px)': { slidesToScroll: 1 } } }} className="w-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                <CarouselContent className="-ml-2 md:-ml-4">{listings.map((listing) => (<CarouselItem key={listing.id} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px] lg:basis-1/2"><div className="h-full"><PropertyCard listing={listing} category={category}/></div></CarouselItem>))}</CarouselContent>
                <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10"><CarouselPrevious className="w-12 h-12 border-2 border-gray-200 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-300" /></div>
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10"><CarouselNext className="w-12 h-12 border-2 border-gray-200 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-300" /></div>
              </Carousel>
              <div className="flex md:hidden justify-center mt-6 space-x-2">{Array.from({ length: Math.ceil(listings.length / 1) }).map((_, index) => (<div key={index} className="w-2 h-2 rounded-full bg-gray-300 transition-colors" />))}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// **NOVO** - Banner de Chamada para Ação
const CtaBanner = () => (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-3">Sua Experiência Perfeita em Búzios Começa Aqui</h2>
            <p className="text-gray-300 leading-relaxed">Deixe nossa equipe cuidar de todos os detalhes. Fale conosco e encontre a propriedade ou serviço ideal para sua viagem.</p>
          </div>
          <div className="flex-shrink-0">
            <a href={`https://wa.me/5521976860759?text=${encodeURIComponent("Olá! Gostaria de planejar minha experiência em Búzios.")}`} target="_blank" rel="noopener noreferrer">
               <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200 rounded-full px-10 py-6 text-base font-semibold shadow-lg transition-transform hover:scale-105">Falar com um Especialista</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );

// **NOVO** - Seção do Anfitrião
const HostSection = () => (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
              <Image
                src="https://nechnbtmwrxu76ty.public.blob.vercel-storage.com/adsonprofile.jpeg" // Imagem do Adson
                alt="Adson Santos, seu anfitrião em Búzios"
                width={500}
                height={500}
                className="rounded-2xl object-cover shadow-xl aspect-square"
                quality={80}
              />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-blue-600 font-semibold mb-2">SEU ANFITRIÃO EM BÚZIOS</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">Adson Carlos</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">"Com anos de experiência no mercado de luxo de Búzios, meu objetivo é garantir que sua estadia seja nada menos que extraordinária. Da escolha da propriedade perfeita aos passeios mais exclusivos, estou aqui para transformar seus sonhos em realidade."</p>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-700">
               <Award className="w-5 h-5 text-blue-600" />
               <span>Especialista em aluguéis de alto padrão</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

// Seção de Avaliações do Google
const GoogleReviewsSection = () => {
  const reviews = [
    { id: 1, name: "Julia Mendes", avatar: "https://randomuser.me/api/portraits/women/44.jpg", stars: 5, text: "Serviço impecável e propriedades deslumbrantes. A equipe da Wordmaster foi extremamente atenciosa e tornou nossa viagem a Búzios inesquecível. Recomendo fortemente!", date: "2 meses atrás" },
    { id: 2, name: "Roberto Carlos", avatar: "https://randomuser.me/api/portraits/men/32.jpg", stars: 5, text: "Alugamos um iate para um passeio em família e foi a melhor decisão. Embarcação de luxo, tripulação profissional e um roteiro incrível. Experiência 10/10.", date: "5 meses atrás" },
    { id: 3, name: "Ana Vitoria", avatar: "https://randomuser.me/api/portraits/women/65.jpg", stars: 5, text: "A mansão que ficamos era um sonho! Exatamente como nas fotos, com uma vista espetacular. Todo o processo de reserva foi simples. Voltaremos com certeza.", date: "10 meses atrás" }
  ];
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12"><h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">O QUE NOSSOS CLIENTES DIZEM</h2><p className="text-gray-600 max-w-2xl mx-auto">Avaliações reais de clientes que viveram a experiência Wordmaster Beach Búzios.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{reviews.map((review) => (<Card key={review.id} className="bg-gray-50/80 p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1"><div className="flex items-center mb-4"><img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" loading="lazy" /><div><p className="font-semibold text-gray-800">{review.name}</p><p className="text-sm text-gray-500">{review.date}</p></div></div><div className="flex items-center mb-4">{[...Array(review.stars)].map((_, i) => (<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />))}</div><p className="text-gray-600 leading-relaxed">{review.text}</p></Card>))}</div>
      </div>
    </section>
  );
}

// Rodapé
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><div className="mb-6"><Image src="/logo.png" alt="Wordmaster Logo Rodapé" width={160} height={45} /></div><p className="text-gray-600 mb-6">Experiências de luxo em Búzios.</p><p className="text-gray-500 text-sm">CNPJ: 22.269.571/0001-69</p></div>
          <div><h4 className="text-lg font-medium text-gray-900 mb-6">Destinos</h4><div className="space-y-3"><Link href="/mansoes" className="block text-gray-600 hover:text-gray-900">Mansões</Link><Link href="/lanchas" className="block text-gray-600 hover:text-gray-900">Lanchas</Link><Link href="/taxi-aereo" className="block text-gray-600 hover:text-gray-900">Táxi Aéreo</Link><Link href="/transfer" className="block text-gray-600 hover:text-gray-900">Transfer</Link><Link href="/escuna" className="block text-gray-600 hover:text-gray-900">Escuna</Link></div></div>
          <div><h4 className="text-lg font-medium text-gray-900 mb-6">Contato</h4><div className="space-y-3"><div className="text-gray-600"><div>+55 21 976860759</div></div><div className="text-gray-600"><div>wordmaster01@outlook.com</div></div><a href="https://www.instagram.com/wordmasterbeachbuzios" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center"><Instagram className="w-4 h-4 mr-2" />wordmasterbeachbuzios</a></div></div>
          <div><h4 className="text-lg font-medium text-gray-900 mb-6">Admin</h4><div className="space-y-3"><Link href="/admin" className="block text-blue-600 hover:text-blue-800">Painel Administrativo</Link></div></div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center"><p className="text-gray-500">© 2025 Wordmaster Beach Búzios. Todos os direitos reservados.</p></div>
      </div>
    </footer>
  )
}

// Componente Principal da Homepage
export default function HomePage() {
  const [allListings, setAllListings] = useState({ mansoes: [], lanchas: [], escuna: [], 'taxi-aereo': [], transfer: [], buggy: [] });
  const [categoryLoading, setCategoryLoading] = useState({ mansoes: true, lanchas: true, escuna: true, 'taxi-aereo': true, transfer: true, buggy: true });
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedService, setSelectedService] = useState('mansoes');
  const [currentFilters, setCurrentFilters] = useState({ guests: '', bedrooms: '', boat_length: '', vehicle_type: '' });

  const handleSearch = async (category, filters) => {
    setIsSearching(true);
    setSearchResults(null);
    setCurrentFilters(filters);
    try {
      const query = new URLSearchParams({ category, limit: 50 });
      Object.entries(filters).forEach(([key, value]) => { if (value) { query.append(key, value); } });
      const response = await fetch(`/api/listings?${query.toString()}`);
      if (!response.ok) throw new Error('A busca na API falhou');
      const data = await response.json();
      setSearchResults(data.listings || []);
    } catch (error) { console.error('Erro na busca:', error); setSearchResults([]); } 
    finally { setIsSearching(false); }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setCurrentFilters({ guests: '', bedrooms: '', boat_length: '', vehicle_type: '' });
  };

  useEffect(() => {
    const fetchAllListings = async () => {
      const categories = ['mansoes', 'lanchas', 'escuna', 'taxi-aereo', 'transfer', 'buggy'];
      const promises = categories.map(async (category) => {
        try {
          const response = await fetch(`/api/listings?category=${category}&limit=8`);
          if (!response.ok) throw new Error(`Falha ao buscar ${category}`);
          return { category, listings: (await response.json()).listings || [] };
        } catch (error) {
          console.warn(`Erro ao buscar ${category}:`, error);
          return { category, listings: [] };
        }
      });
      const results = await Promise.allSettled(promises);
      const fetchedData = {};
      results.forEach((result, index) => {
        const category = categories[index];
        if (result.status === 'fulfilled') { fetchedData[result.value.category] = result.value.listings; } 
        else { fetchedData[category] = []; }
        setCategoryLoading(prev => ({ ...prev, [category]: false }));
      });
      setAllListings(fetchedData);
    };
    fetchAllListings();
  }, []);

  const getCategoryListings = (category) => allListings[category] || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection onSearch={handleSearch} isSearching={isSearching} currentFilters={currentFilters} selectedService={selectedService} setSelectedService={setSelectedService} />
        {searchResults !== null ? (
          <SearchResults results={searchResults} onClearSearch={clearSearch} isLoading={isSearching} />
        ) : (
          <>
            <CategorySection title="Mansões de Luxo em Búzios" description="Descubra as mais exclusivas mansões para aluguel, perfeitas para suas férias ou eventos especiais." listings={getCategoryListings('mansoes')} category="mansoes" isLoading={categoryLoading.mansoes} />
            <CtaBanner />
            <CategorySection title="Lanchas e Iates para Aluguel" description="Explore as belezas de Búzios pelo mar com nossa seleção de lanchas e iates de luxo." listings={getCategoryListings('lanchas')} category="lanchas" isLoading={categoryLoading.lanchas} />
            <CategorySection title="Passeios de Escuna Inesquecíveis" description="Aproveite um dia relaxante navegando pelas águas cristalinas de Búzios em nossas escunas." listings={getCategoryListings('escuna')} category="escuna" isLoading={categoryLoading.escuna} />
            <CategorySection title="Táxi Aéreo e Voos Panorâmicos" description="Chegue em Búzios com estilo ou desfrute de vistas aéreas deslumbrantes com nosso serviço de táxi aéreo." listings={getCategoryListings('taxi-aereo')} category="taxi-aereo" isLoading={categoryLoading['taxi-aereo']} />
            <CategorySection title="Transfer Executivo e VIP" description="Garanta sua chegada e partida com conforto e segurança. Oferecemos transfer executivo para Búzios e região." listings={getCategoryListings('transfer')} category="transfer" isLoading={categoryLoading.transfer} />
            <CategorySection title="Aventura de Buggy em Búzios" description="Explore as trilhas e praias escondidas de Búzios com nossos emocionantes passeios de buggy." listings={getCategoryListings('buggy')} category="buggy" isLoading={categoryLoading.buggy} />
          </>
        )}
        <HostSection />
        <GoogleReviewsSection />
      </main>
      <Footer />
    </div>
  );
}
