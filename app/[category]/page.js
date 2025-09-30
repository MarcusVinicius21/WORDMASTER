// app/[category]/page.js
'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Home, Anchor, Sailboat, Car, Plane, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"

const WhatsAppButton = ({ listing }) => {
  const whatsappNumber = "5521976860759"
  const message = `Olá! Tenho interesse em "${listing?.title || 'propriedade'}". Vi no site.`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  return (<Button className="bg-brand-teal hover:bg-brand-teal/90 text-white transition-transform hover:scale-105" onClick={(e) => { e.preventDefault(); window.open(whatsappUrl, '_blank')}}>WhatsApp</Button>)
}

// Esqueleto de Carregamento para os Cards de Propriedade com Efeito Shimmer
const PropertyCardSkeleton = () => (
    <div className="bg-white border border-gray-200 overflow-hidden h-full flex flex-col rounded-2xl">
      <div className="p-0 flex flex-col flex-grow">
        <div className="bg-gray-200 h-64 w-full shimmer" />
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <div className="h-5 bg-gray-200 rounded w-3/4 shimmer" />
          <div className="h-4 bg-gray-200 rounded w-5/6 shimmer" />
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20 shimmer" />
              <div className="h-4 bg-gray-200 rounded w-24 shimmer" />
            </div>
            <div className="h-10 bg-gray-200 rounded-full w-24 shimmer" />
          </div>
        </div>
      </div>
    </div>
);

const PropertyCard = ({ listing, category }) => {
  const getCategoryImage = (category) => {
    const images = {
      mansoes: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center',
      lanchas: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop&crop=center',
      escuna: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center',
      'taxi-aereo': 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=250&fit=crop&crop=center',
      transfer: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop&crop=center',
      buggy: 'https://images.unsplash.com/photo-1558618666-fbd7c94d633d?w=400&h=250&fit=crop&crop=center'
    }
    return images[category] || images.mansoes
  }
  
  const imageUrl = (listing && listing.featured_image && listing.featured_image.startsWith('http'))
    ? listing.featured_image
    : getCategoryImage(category);

  return (
    <Link href={`/${category}/${listing.slug || listing.id}`}>
      <Card className="group bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={listing.title}
            width={400}
            height={250}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">{listing.title}</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed h-10">{listing.subtitle}</p>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div><span className="text-sm text-gray-500">A partir de</span><div className="text-2xl font-semibold text-gray-900">{listing.price_label || 'Consulte'}</div></div>
              <WhatsAppButton listing={listing} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function CategoryPage() {
    const params = useParams();
    const { category } = params;
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryInfo = {
        mansoes: { title: "Aluguel de Mansões", icon: <Home className="w-8 h-8 mr-3" /> },
        lanchas: { title: "Aluguel de Lanchas", icon: <Anchor className="w-8 h-8 mr-3" /> },
        escuna: { title: "Passeios de Escuna", icon: <Sailboat className="w-8 h-8 mr-3" /> },
        'taxi-aereo': { title: "Táxi Aéreo", icon: <Plane className="w-8 h-8 mr-3" /> },
        transfer: { title: "Transfer", icon: <Bus className="w-8 h-8 mr-3" /> },
        buggy: { title: "Aluguel de Buggy", icon: <Car className="w-8 h-8 mr-3" /> },
    };
    const currentCategory = categoryInfo[category] || { title: "Propriedades", icon: <Home className="w-8 h-8 mr-3" /> };

    useEffect(() => {
        if (category) {
            const fetchListings = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`/api/listings?category=${category}`);
                    if (!response.ok) throw new Error('Falha ao buscar dados');
                    const data = await response.json();
                    setListings(data.listings || []);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchListings();
        }
    }, [category]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-6 py-12">
                <div className="mb-10 text-center border-b pb-6">
                    <div className="flex items-center justify-center">{currentCategory.icon}<h1 className="text-4xl font-light text-gray-800 tracking-wide">{currentCategory.title} em Búzios</h1></div>
                    <p className="mt-2 text-lg text-gray-600">Explore nossa seleção exclusiva.</p>
                </div>
                
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => <PropertyCardSkeleton key={i} />)}
                  </div>
                )}
                {error && (<div className="text-center py-20"><p className="text-red-600 text-lg">Erro ao carregar: {error}</p></div>)}
                {!loading && !error && listings.length === 0 && (<div className="text-center py-20"><p className="text-gray-700 text-lg">Nenhuma propriedade encontrada nesta categoria.</p><Link href="/" passHref><Button className="mt-4">Voltar</Button></Link></div>)}
                {!loading && !error && listings.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{listings.map((listing) => (<PropertyCard key={listing.id} listing={listing} category={category} />))}</div>)}
            </main>
        </div>
    );
}
