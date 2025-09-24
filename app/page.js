'use client'

import React, { useState, useEffect, useRef } from "react"
import { Search, Menu, X, Star, MapPin, ChevronLeft, ChevronRight, Phone, Mail, Instagram, Users, Bed, Bath, Eye, Anchor, Calendar, Clock, Car, Plane, Maximize, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

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
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Brasil</Link>
            <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Mansões</Link>
            <Link href="/lanchas" className="text-gray-700 hover:text-gray-900 font-medium">Lanchas</Link>
            <Link href="/escuna" className="text-gray-700 hover:text-gray-900 font-medium">Escuna</Link>
            <Link href="/taxi-aereo" className="text-gray-700 hover:text-gray-900 font-medium">Táxi Aéreo</Link>
            <Link href="/transfer" className="text-gray-700 hover:text-gray-900 font-medium">Transfer</Link>
            <Link href="/admin" className="text-blue-700 hover:text-blue-900 font-medium">Admin</Link>
            
            <div className="flex items-center space-x-2 text-gray-600 ml-4">
              <span>PT</span>
              <span>R$ BRL</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm" 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Brasil</Link>
              <Link href="/mansoes" className="text-gray-700 hover:text-gray-900 font-medium">Mansões</Link>
              <Link href="/lanchas" className="text-gray-700 hover:text-gray-900 font-medium">Lanchas</Link>
              <Link href="/escuna" className="text-gray-700 hover:text-gray-900 font-medium">Escuna</Link>
              <Link href="/taxi-aereo" className="text-gray-700 hover:text-gray-900 font-medium">Táxi Aéreo</Link>
              <Link href="/transfer" className="text-gray-700 hover:text-gray-900 font-medium">Transfer</Link>
              <Link href="/admin" className="text-blue-700 hover:text-blue-900 font-medium">Admin</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section with NEW Search Logic
const HeroSection = ({ onSearch, isSearching, searchParams, setSearchParams, selectedService, setSelectedService }) => {

  const handleServiceChange = (value) => {
    setSelectedService(value);
    setSearchParams({
      guests: '',
      bedrooms: '',
      boat_length: '',
      vehicle_type: '',
    });
  };

  const handleParamChange = (key, value) => {
    setSearchParams(prev => ({ ...prev, [key]: value === 'any' ? '' : value }));
  };

  const handleSearch = () => {
    onSearch(selectedService, searchParams);
  };

  const renderFilters = () => {
    switch (selectedService) {
      case 'mansoes':
        return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hóspedes</label>
              <Select value={searchParams.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="6">6+</SelectItem>
                  <SelectItem value="8">8+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quartos</label>
              <Select value={searchParams.bedrooms || 'any'} onValueChange={(value) => handleParamChange('bedrooms', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 'lanchas':
        return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passageiros</label>
              <Select value={searchParams.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="8">8+</SelectItem>
                  <SelectItem value="12">12+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pés</label>
              <Input
                type="number"
                placeholder="Ex: 50"
                className="h-12 border-gray-200 rounded-md"
                value={searchParams.boat_length || ''}
                onChange={(e) => handleParamChange('boat_length', e.target.value)}
              />
            </div>
          </>
        );
      case 'escuna':
      case 'buggy':
        return (
          <div className="text-left sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pessoas</label>
            <Select value={searchParams.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
              <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Qualquer</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="10">10+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
       case 'taxi-aereo':
         return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passageiros</label>
              <Select value={searchParams.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <Select value={searchParams.vehicle_type || 'any'} onValueChange={(value) => handleParamChange('vehicle_type', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Todos</SelectItem>
                  <SelectItem value="helicopter">Helicóptero</SelectItem>
                  <SelectItem value="bimotor">Bimotor</SelectItem>
                  <SelectItem value="jet">Jato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
       case 'transfer':
         return (
          <>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passageiros</label>
              <Select value={searchParams.guests || 'any'} onValueChange={(value) => handleParamChange('guests', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Qualquer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="8">8+</SelectItem>
                  <SelectItem value="15">15+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <Select value={searchParams.vehicle_type || 'any'} onValueChange={(value) => handleParamChange('vehicle_type', value)}>
                <SelectTrigger className="h-12 border-gray-200"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Todos</SelectItem>
                  <SelectItem value="luxury_car">Carro de Luxo</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="bus">Ônibus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      default:
        return <div className="sm:col-span-2"></div>;
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Búzios"
          fill
          style={{objectFit: "cover"}}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white w-full max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wide">
            UM PORTAL PARA O LUXO
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 tracking-wider opacity-90">
            EXPLORE NOSSAS PROPRIEDADES EM BÚZIOS
          </p>
          
          <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <div className="text-left md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
                <Select value={selectedService} onValueChange={handleServiceChange}>
                  <SelectTrigger className="h-12 border-gray-200 text-black"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mansoes">Mansões</SelectItem>
                    <SelectItem value="lanchas">Lanchas</SelectItem>
                    <SelectItem value="escuna">Escuna</SelectItem>
                    <SelectItem value="taxi-aereo">Táxi Aéreo</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="buggy">Buggy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderFilters()}

              <Button 
                className="h-12 bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 w-full"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Search Results Section
const SearchResults = ({ results, onClearSearch }) => {
  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nenhuma propriedade encontrada</h2>
            <p className="text-gray-600 mb-6">Tente ajustar seus filtros de busca ou explore nossas categorias abaixo.</p>
            <Button onClick={onClearSearch} variant="outline">
              Ver todas as propriedades
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Resultados da busca ({results.length} {results.length === 1 ? 'propriedade encontrada' : 'propriedades encontradas'})
          </h2>
          <Button onClick={onClearSearch} variant="outline" size="sm">
            Limpar busca
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} category={listing.category} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Property Card Component
const PropertyCard = ({ listing, category }) => {
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
      case 'mansoes':
        if (listing.guests) {
          specs.push(
            <span key="guests" className="flex items-center">
              <Users className="w-4 h-4 mr-1.5" />
              {listing.guests} {listing.guests === 1 ? 'Hóspede' : 'Hóspedes'}
            </span>
          );
        }
        if (listing.bedrooms) {
          specs.push(
            <span key="bedrooms" className="flex items-center">
              <Bed className="w-4 h-4 mr-1.5" />
              {listing.bedrooms} {listing.bedrooms === 1 ? 'Quarto' : 'Quartos'}
            </span>
          );
        }
        if (listing.bathrooms) {
          specs.push(
            <span key="bathrooms" className="flex items-center">
              <Bath className="w-4 h-4 mr-1.5" />
              {listing.bathrooms} {listing.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}
            </span>
          );
        }
        if (listing.area_m2) {
          specs.push(
            <span key="area" className="flex items-center">
              <Maximize className="w-4 h-4 mr-1.5" />
              {listing.area_m2}m²
            </span>
          );
        }
        break;

      case 'lanchas':
        if (listing.guests) {
          specs.push(
            <span key="guests" className="flex items-center">
              <Users className="w-4 h-4 mr-1.5" />
              {listing.guests} {listing.guests === 1 ? 'Passageiro' : 'Passageiros'}
            </span>
          );
        }
        if (listing.boat_length) {
          specs.push(
            <span key="length" className="flex items-center">
              <Anchor className="w-4 h-4 mr-1.5" />
              {listing.boat_length} pés
            </span>
          );
        }
        if (listing.bedrooms) {
          specs.push(
            <span key="cabins" className="flex items-center">
              <Bed className="w-4 h-4 mr-1.5" />
              {listing.bedrooms} {listing.bedrooms === 1 ? 'Cabine' : 'Cabines'}
            </span>
          );
        }
        if (listing.boat_year) {
          specs.push(
            <span key="year" className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              Ano {listing.boat_year}
            </span>
          );
        }
        break;

      case 'escuna':
        if (listing.guests) {
          specs.push(
            <span key="guests" className="flex items-center">
              <Users className="w-4 h-4 mr-1.5" />
              {listing.guests} {listing.guests === 1 ? 'Passageiro' : 'Passageiros'}
            </span>
          );
        }
        if (listing.duration) {
          specs.push(
            <span key="duration" className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {listing.duration}
            </span>
          );
        }
        if (listing.boat_length) {
          specs.push(
            <span key="length" className="flex items-center">
              <Anchor className="w-4 h-4 mr-1.5" />
              {listing.boat_length} pés
            </span>
          );
        }
        if (listing.includes_meal) {
          specs.push(
            <span key="meal" className="flex items-center">
              🍽️ Refeição inclusa
            </span>
          );
        }
        break;

      case 'taxi-aereo':
        if (listing.guests) {
          specs.push(
            <span key="guests" className="flex items-center">
              <Users className="w-4 h-4 mr-1.5" />
              {listing.guests} {listing.guests === 1 ? 'Passageiro' : 'Passageiros'}
            </span>
          );
        }
        if (listing.vehicle_type) {
          const vehicleIcon = listing.vehicle_type === 'helicopter' || listing.vehicle_type === 'bimotor' || listing.vehicle_type === 'jet' ? <Plane className="w-4 h-4 mr-1.5" /> : <Plane className="w-4 h-4 mr-1.5" />;
          const vehicleText = {
            'helicopter': 'Helicóptero',
            'bimotor': 'Bimotor',
            'jet': 'Jato'
          }[listing.vehicle_type] || listing.vehicle_type;
          
          specs.push(
            <span key="vehicle" className="flex items-center">
              {vehicleIcon}
              {vehicleText}
            </span>
          );
        }
        if (listing.duration) {
          specs.push(
            <span key="duration" className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {listing.duration}
            </span>
          );
        }
        break;

      case 'transfer':
        if (listing.guests) {
          specs.push(
            <span key="guests" className="flex items-center">
              <Users className="w-4 h-4 mr-1.5" />
              {listing.guests} {listing.guests === 1 ? 'Passageiro' : 'Passageiros'}
            </span>
          );
        }
        if (listing.vehicle_type) {
          const vehicleIcon = listing.vehicle_type === 'bus' ? <Bus className="w-4 h-4 mr-1.5" /> : <Car className="w-4 h-4 mr-1.5" />;
          const vehicleText = {
            'luxury_car': 'Carro de Luxo',
            'van': 'Van',
            'bus': 'Ônibus'
          }[listing.vehicle_type] || listing.vehicle_type;
          
          specs.push(
            <span key="vehicle" className="flex items-center">
              {vehicleIcon}
              {vehicleText}
            </span>
          );
        }
        if (listing.duration) {
          specs.push(
            <span key="duration" className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {listing.duration}
            </span>
          );
        }
        break;

      case 'buggy':
        if (listing.guests) {
          specs.push(
            <span key="guests" className="flex items-center">
              <Users className="w-4 h-4 mr-1.5" />
              {listing.guests} {listing.guests === 1 ? 'Pessoa' : 'Pessoas'}
            </span>
          );
        }
        if (listing.vehicle_model) {
          specs.push(
            <span key="model" className="flex items-center">
              <Car className="w-4 h-4 mr-1.5" />
              {listing.vehicle_model}
            </span>
          );
        }
        if (listing.duration) {
          specs.push(
            <span key="duration" className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {listing.duration}
            </span>
          );
        }
        break;

      default:
        if (listing.guests) {
          specs.push(
            <span key="guests" className="flex items-center">
              <Users className="w-4 h-4 mr-1.5" />
              {listing.guests} {listing.guests === 1 ? 'Pessoa' : 'Pessoas'}
            </span>
          );
        }
        break;
    }

    return specs;
  };

  const specifications = renderSpecifications();

  return (
    <Link href={`/${category}/${listing.slug || listing.id}`} className="block h-full">
      <Card className="group bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col rounded-2xl">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative overflow-hidden">
            <img
              src={getPropertyImage(listing, category)}
              alt={listing.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center';
              }}
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {listing.title}
            </h3>
            
            {specifications.length > 0 && (
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-2 mb-4">
                {specifications.slice(0, 3).map((spec, index) => (
                  <div key={index}>{spec}</div>
                ))}
                {specifications.length > 3 && (
                  <div className="text-gray-400">+{specifications.length - 3}</div>
                )}
              </div>
            )}

            {specifications.length === 0 && listing.subtitle && (
              <p className="text-sm text-gray-600 mb-4">{listing.subtitle}</p>
            )}

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">A partir de</p>
                <p className="font-semibold text-gray-800">{listing.price_label || 'Consulte'}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">Detalhes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Category Section Component
const CategorySection = ({ title, description, listings, category }) => {
  if (!listings || listings.length === 0) return null;

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
              {title}
            </h2>
            <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base max-w-md mx-auto lg:mx-0">
              {description}
            </p>
            <Link href={`/${category}`}>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Ver todas
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="relative">
              <Carousel
                plugins={[plugin.current]}
                opts={{
                  align: "start",
                  loop: true,
                  breakpoints: {
                    '(min-width: 768px)': { slidesToScroll: 1 }
                  }
                }}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {listings.map((listing) => (
                    <CarouselItem key={listing.id} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px] lg:basis-1/2">
                      <div className="h-full">
                        <PropertyCard 
                          listing={listing} 
                          category={category}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
                  <CarouselPrevious className="w-12 h-12 border-2 border-gray-200 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-300" />
                </div>
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <CarouselNext className="w-12 h-12 border-2 border-gray-200 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-300" />
                </div>
              </Carousel>
              
              <div className="flex md:hidden justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(listings.length / 1) }).map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300 transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Google Reviews Section
const GoogleReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Julia Mendes",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      text: "Serviço impecável e propriedades deslumbrantes. A equipe da Wordmaster foi extremamente atenciosa e tornou nossa viagem a Búzios inesquecível. Recomendo fortemente!",
      date: "2 meses atrás"
    },
    {
      id: 2,
      name: "Roberto Carlos",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      text: "Alugamos um iate para um passeio em família e foi a melhor decisão. Embarcação de luxo, tripulação profissional e um roteiro incrível pelas praias. Experiência 10/10.",
      date: "5 meses atrás"
    },
    {
      id: 3,
      name: "Ana Vitoria",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      stars: 5,
      text: "A mansão que ficamos era um sonho! Exatamente como nas fotos, com uma vista espetacular. Todo o processo de reserva foi simples e transparente. Voltaremos com certeza.",
      date: "10 meses atrás"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            O QUE NOSSOS CLIENTES DIZEM
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Avaliações reais de clientes que viveram a experiência Wordmaster Beach Búzios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-gray-50/80 p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">{review.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <Image src="/logo.png" alt="Wordmaster Beach Búzios Logo Rodapé" width={160} height={45} />
            </div>
            <p className="text-gray-600 mb-6">Experiências de luxo em Búzios. Mansões, lanchas, táxis aéreos e muito mais.</p>
            <p className="text-gray-500 text-sm">CNPJ: 22.269.571/0001-69</p> 
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Destinos</h4>
            <div className="space-y-3">
              <Link href="/mansoes" className="block text-gray-600 hover:text-gray-900">Aluguel de Mansões</Link>
              <Link href="/lanchas" className="block text-gray-600 hover:text-gray-900">Aluguel de Lanchas</Link>
              <Link href="/taxi-aereo" className="block text-gray-600 hover:text-gray-900">Táxi Aéreo</Link>
              <Link href="/transfer" className="block text-gray-600 hover:text-gray-900">Transfer</Link>
              <Link href="/escuna" className="block text-gray-600 hover:text-gray-900">Passeios de Escuna</Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Contato</h4>
            <div className="space-y-3">
              <div className="text-gray-600"><div>+55 21 976860759</div></div>
              <div className="text-gray-600"><div>wordmaster01@outlook.com</div></div>
              <a href="https://www.instagram.com/wordmasterbeachbuzios" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center"><Instagram className="w-4 h-4 mr-2" />wordmasterbeachbuzios</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-6">Admin</h4>
            <div className="space-y-3"><Link href="/admin" className="block text-blue-600 hover:text-blue-800">Painel Administrativo</Link></div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center"><p className="text-gray-500">© 2025 Wordmaster Beach Búzios. Todos os direitos reservados.</p></div>
      </div>
    </footer>
  )
}

// Main Homepage Component
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allListings, setAllListings] = useState({ mansoes: [], lanchas: [], escuna: [], 'taxi-aereo': [], transfer: [], buggy: [] });
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const [selectedService, setSelectedService] = useState('mansoes');
  const [searchParams, setSearchParams] = useState({
    guests: '',
    bedrooms: '',
    boat_length: '',
    vehicle_type: '',
  });

  const getFallbackData = () => ({
    mansoes: [
      { id: '1', title: 'Villa paradisíaca em Geribá', category: 'mansoes', price_label: 'R$ 3.500,00', guests: 12, bedrooms: 6, bathrooms: 4, area_m2: 350, featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center' },
      { id: '2', title: 'Luxuosa cobertura no Centro', category: 'mansoes', price_label: 'R$ 2.500,00', guests: 8, bedrooms: 4, bathrooms: 3, area_m2: 280, featured_image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=250&fit=crop&crop=center' },
    ],
    lanchas: [
      { id: '5', title: 'Lancha de luxo de 62 pés', category: 'lanchas', price_label: 'R$ 8.500,00', guests: 20, bedrooms: 4, boat_length: 62, boat_year: 2020, featured_image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop&crop=center' },
      { id: '6', title: 'Lancha esportiva premium', category: 'lanchas', price_label: 'R$ 4.200,00', guests: 12, bedrooms: 2, boat_length: 45, boat_year: 2019, featured_image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&h=250&fit=crop&crop=center' }
    ],
    escuna: [
      { id: '7', title: 'Escuna Tradicional Búzios', category: 'escuna', price_label: 'R$ 180,00', guests: 40, duration: '4 horas', boat_length: 85, includes_meal: true, featured_image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center' }
    ],
    'taxi-aereo': [
      { id: '8', title: 'Helicóptero Robinson 44', category: 'taxi-aereo', price_label: 'R$ 2.500,00', guests: 4, vehicle_type: 'helicopter', vehicle_model: 'Robinson 44', duration: '45 min', featured_image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center' },
      { id: '9', title: 'Bimotor Baron G58', category: 'taxi-aereo', price_label: 'R$ 3.500,00', guests: 6, vehicle_type: 'bimotor', vehicle_model: 'Baron G58', duration: '30 min', featured_image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=250&fit=crop&crop=center' }
    ],
    transfer: [
      { id: '10', title: 'Mercedes Sprinter Executive', category: 'transfer', price_label: 'R$ 800,00', guests: 15, vehicle_type: 'van', vehicle_model: 'Mercedes Sprinter', duration: '2 horas', featured_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop&crop=center' },
      { id: '11', title: 'BMW 740i M Sport', category: 'transfer', price_label: 'R$ 500,00', guests: 4, vehicle_type: 'luxury_car', vehicle_model: 'BMW 740i', duration: '2 horas', featured_image: 'https://images.unsplash.com/photo-1555215858-91f61e11ce5f?w=400&h=250&fit=crop&crop=center' }
    ],
    buggy: [
      { id: '12', title: 'Buggy Aventura Off-Road', category: 'buggy', price_label: 'R$ 350,00', guests: 4, vehicle_model: 'Fyber 2000', duration: 'Diária', featured_image: 'https://images.unsplash.com/photo-1558618666-fbd7c94d633d?w=400&h=250&fit=crop&crop=center'}
    ]
  });

  const handleSearch = async (category, params) => {
    setIsSearching(true);
    setSearchResults(null);
    try {
      const query = new URLSearchParams({ category, limit: 50 });
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          query.append(key, value);
        }
      });
      
      const response = await fetch(`/api/listings?${query.toString()}`);
      if (!response.ok) {
        throw new Error('A busca na API falhou');
      }
      const data = await response.json();
      setSearchResults(data.listings || []);
    } catch (error) {
      console.error('Erro na busca:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchParams({ guests: '', bedrooms: '', boat_length: '', vehicle_type: '' });
  };

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const categories = ['mansoes', 'lanchas', 'escuna', 'taxi-aereo', 'transfer', 'buggy'];
        const promises = categories.map(category => 
          fetch(`/api/listings?category=${category}&limit=8`).then(res => res.ok ? res.json() : { listings: [] }).catch(() => ({ listings: [] }))
        );
        const results = await Promise.all(promises);
        const listingsData = {};
        const fallbackData = getFallbackData();
        categories.forEach((category, index) => {
          const apiListings = results[index].listings || [];
          listingsData[category] = apiListings.length > 0 ? apiListings : (fallbackData[category] || []);
        });
        setAllListings(listingsData);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setAllListings(getFallbackData());
      } finally {
        setLoading(false);
      }
    };
    fetchAllListings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <VillasNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection 
        onSearch={handleSearch} 
        isSearching={isSearching}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
      
      {searchResults !== null ? (
        <SearchResults results={searchResults} onClearSearch={clearSearch} />
      ) : (
        !loading && (
          <>
            <CategorySection title="ALUGUEL DE MANSÕES" description="Propriedades exclusivas para uma estadia inesquecível, combinando conforto, elegância e as melhores localizações de Búzios." listings={allListings.mansoes} category="mansoes" />
            <CategorySection title="ALUGUEL DE LANCHAS" description="Confira nossas opções de lanchas para complementar sua viagem com luxo, apreciação e aventura." listings={allListings.lanchas} category="lanchas" />
            <CategorySection title="PASSEIOS DE ESCUNA" description="Navegue pelas águas cristalinas de Búzios a bordo de nossas escunas, visitando as praias mais famosas." listings={allListings.escuna} category="escuna" />
            <CategorySection title="TÁXI AÉREO" description="Helicópteros, bimotores e jatos para garantir sua chegada com total conforto, segurança e exclusividade." listings={allListings['taxi-aereo']} category="taxi-aereo" />
            <CategorySection title="TRANSFER" description="Vans, ônibus e carros de luxo para seu transporte terrestre com máximo conforto." listings={allListings.transfer} category="transfer" />
            <CategorySection title="ALUGUEL DE BUGGY" description="Explore as ruas e praias de Búzios com estilo e diversão em um de nossos buggies." listings={allListings.buggy} category="buggy" />
          </>
        )
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
      
      {searchResults === null && <GoogleReviewsSection />}
      
      <Footer />
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => window.open('https://wa.me/5521976860759', '_blank')} className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110">
          <Phone className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}