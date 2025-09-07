'use client'

import { useState, useEffect } from "react"
import {
  Plus, Search, Edit, Trash2, Eye, EyeOff, BarChart3, Users, Home, Star, MessageSquare, Settings as SettingsIcon, LogOut, Upload, X, Camera, Percent,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Navigation Sidebar Component
const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'listings', label: 'Propriedades', icon: Home },
    { id: 'promotions', label: 'Promoções', icon: Percent },
    { id: 'reviews', label: 'Avaliações', icon: MessageSquare },
    { id: 'settings', label: 'Configurações', icon: SettingsIcon }
  ]

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Wordmaster</h1>
            <p className="text-gray-400 text-sm">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
            alt="Adson Carlos"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">Adson Carlos</p>
            <p className="text-gray-400 text-sm">Administrador</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-gray-300 border-gray-600 hover:bg-gray-800"
          onClick={() => window.location.href = '/'}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  )
}

// Dashboard Component
const Dashboard = ({ setCurrentPage }) => {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    onPromotion: 0,
    whatsappClicks: 0,
    pendingReviews: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const listingsRes = await fetch('/api/listings?active=false')
        const reviewsRes = await fetch('/api/reviews?is_approved=false')

        if (listingsRes.ok) {
          const listingsData = await listingsRes.json()
          const activeListings = listingsData.listings?.filter((l) => l.is_active).length || 0
          const onPromotion = listingsData.listings?.filter((l) => l.is_featured).length || 0

          setStats((prev) => ({
            ...prev,
            totalListings: listingsData.listings?.length || 0,
            activeListings,
            onPromotion,
          }))
        } else {
          setStats((prev) => ({
            ...prev,
            totalListings: 15,
            activeListings: 15,
            onPromotion: 7,
          }))
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json()
          setStats((prev) => ({
            ...prev,
            pendingReviews: reviewsData.reviews?.length || 0,
          }))
        } else {
          setStats((prev) => ({
            ...prev,
            pendingReviews: 1,
          }))
        }
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          totalListings: 15,
          activeListings: 15,
          onPromotion: 7,
          whatsappClicks: 0,
          pendingReviews: 1,
        }))
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema Wordmaster Beach Búzios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Propriedades</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalListings}</p>
              </div>
              <Home className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Propriedades Ativas</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeListings}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Promoção</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.onPromotion}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clicks WhatsApp (7d)</p>
                <p className="text-3xl font-bold text-purple-600">{stats.whatsappClicks}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" size="lg" onClick={() => setCurrentPage('listings')}>
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Nova Propriedade
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg" onClick={() => setCurrentPage('promotions')}>
              <Star className="w-5 h-5 mr-2" />
              Criar Promoção
            </Button>
            <Link href="/" passHref>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Eye className="w-5 h-5 mr-2" />
                Ver Site Público
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova propriedade adicionada</p>
                  <p className="text-xs text-gray-500">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Click no WhatsApp</p>
                  <p className="text-xs text-gray-500">Há 4 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova avaliação pendente</p>
                  <p className="text-xs text-gray-500">Há 1 dia</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Listings Management Component
const ListingsManagement = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingListing, setEditingListing] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const categoryNames = {
    mansao: 'Mansão',
    mansoes: 'Mansão',
    iate: 'Iate',
    iates: 'Iate',
    escuna: 'Escuna',
    transfer: 'Transfer',
    buggy: 'Buggy',
  }

  const getFallbackListings = () => [
    {
      id: '1',
      category: 'mansoes',
      title: 'Mansão Vista Mar Premium',
      subtitle: 'Luxuosa mansão com vista panorâmica para o mar.',
      description: 'Esta é uma fabulosa mansão em Búzios com vista deslumbrante para o mar, piscina privativa e acabamentos de primeira linha.',
      neighborhood: 'Geribá',
      price_label: 'R$ 3.500/dia',
      guests: 12,
      bedrooms: 6,
      bathrooms: 5,
      area_m2: 350,
      is_active: true,
      is_featured: true,
    },
    {
      id: '2',
      category: 'mansoes',
      title: 'Villa Exclusive Ferradura',
      subtitle: 'Villa de alto padrão na Praia da Ferradura.',
      description: 'Propriedade única com design contemporâneo e acabamentos de luxo.',
      neighborhood: 'Ferradura',
      price_label: 'R$ 2.800/dia',
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      area_m2: 280,
      is_active: true,
      is_featured: true,
    },
    {
      id: '3',
      category: 'iates',
      title: 'Iate de Luxo - 60 pés',
      subtitle: 'Mega iate com tripulação completa.',
      description: 'Experiência náutica premium com bar, sala de jantar e suítes de luxo.',
      neighborhood: 'Marina Porto Búzios',
      price_label: 'R$ 8.500/dia',
      guests: 20,
      is_active: true,
      is_featured: true,
    },
    {
      id: '4',
      category: 'iates',
      title: 'Lancha Esportiva Premium',
      subtitle: 'Lancha de alta performance.',
      description: 'Para passeios rápidos e esportivos pelas praias de Búzios.',
      neighborhood: 'Marina',
      price_label: 'R$ 4.200/dia',
      guests: 12,
      is_active: true,
      is_featured: false,
    },
    {
      id: '5',
      category: 'escuna',
      title: 'Escuna Tradicional Búzios',
      subtitle: 'Passeio clássico pelas praias.',
      description: 'Visitando as 12 praias mais belas de Búzios.',
      neighborhood: 'Porto da Barra',
      price_label: 'R$ 180/pessoa',
      guests: 40,
      is_active: true,
      is_featured: true,
    },
    {
      id: '6',
      category: 'transfer',
      title: 'Helicóptero Executive',
      subtitle: 'Transfer VIP de helicóptero.',
      description: 'Com vista aérea espetacular do litoral fluminense.',
      neighborhood: 'Heliporto',
      price_label: 'R$ 2.500/trecho',
      guests: 4,
      is_active: true,
      is_featured: true,
    },
    {
      id: '7',
      category: 'buggy',
      title: 'Buggy Adventure 4x4',
      subtitle: 'Aventura off-road.',
      description: 'Explorando trilhas selvagens e praias desertas de Búzios.',
      neighborhood: 'Base Centro',
      price_label: 'R$ 350/dia',
      guests: 4,
      is_active: true,
      is_featured: false,
    },
  ]

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/listings?active=false')
      if (response.ok) {
        const data = await response.json()
        setListings(data.listings || [])
      } else {
        console.error('Failed to fetch listings. Using fallback data.')
        setListings(getFallbackListings())
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
      setListings(getFallbackListings())
    } finally {
      setLoading(false)
    }
  }

  const handleSaveListing = async () => {
    fetchListings() // Refresh the list after a successful save
    setOpenModal(false)
    setEditingListing(null)
  }

  const toggleListingStatus = async (listingId, currentStatus) => {
    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus }),
      })
      if (response.ok) {
        fetchListings() // Refresh the list
      } else {
        console.error('Failed to toggle status')
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  const deleteListing = async (listingId) => {
    if (!window.confirm('Tem certeza que deseja deletar esta propriedade?')) {
      return
    }
    try {
      const response = await fetch(`/api/listings/${listingId}`, { method: 'DELETE' })
      if (response.ok) {
        fetchListings() // Refresh the list
      } else {
        console.error('Failed to delete listing')
      }
    } catch (error) {
      console.error('Error deleting listing:', error)
    }
  }

  const editListing = (listing) => {
    setEditingListing(listing)
    setOpenModal(true)
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Propriedades</h2>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingListing(null)
                setOpenModal(true)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Propriedade
            </Button>
          </DialogTrigger>
          <CreateListingModal onSave={handleSaveListing} editingListing={editingListing} onClose={() => setOpenModal(false)} />
        </Dialog>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Buscar por título ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="mansoes">Mansões</SelectItem>
            <SelectItem value="iates">Iates</SelectItem>
            <SelectItem value="escuna">Escuna</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
            <SelectItem value="buggy">Buggy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop&crop=center"
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={listing.is_active ? 'bg-green-600' : 'bg-red-600'}>
                    {listing.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                {listing.is_featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-600">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {categoryNames[listing.category]}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{listing.subtitle}</p>
                <p className="text-sm text-gray-500 mb-3">{listing.neighborhood}</p>
                <p className="font-bold text-lg text-blue-600 mb-4">{listing.price_label}</p>
                <div className="flex items-center text-xs text-gray-500 mb-4 space-x-3">
                  {listing.guests && <span>{listing.guests} pessoas</span>}
                  {listing.bedrooms && <span>{listing.bedrooms} quartos</span>}
                  {listing.bathrooms && <span>{listing.bathrooms} banheiros</span>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => editListing(listing)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleListingStatus(listing.id, listing.is_active)}>
                      {listing.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteListing(listing.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">Nenhuma propriedade encontrada</div>
          <Button onClick={() => setOpenModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Criar primeira propriedade
          </Button>
        </div>
      )}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <CreateListingModal onSave={handleSaveListing} editingListing={editingListing} onClose={() => setOpenModal(false)} />
      </Dialog>
    </div>
  )
}

// Create Listing Modal Component
const CreateListingModal = ({ onSave, editingListing, onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    subtitle: '',
    description: '',
    neighborhood: '',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    area_m2: '',
    base_price: '',
    price_label: '',
    is_featured: false
  })
  const [loading, setLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (editingListing) {
      setFormData({
        category: editingListing.category || '',
        title: editingListing.title || '',
        subtitle: editingListing.subtitle || '',
        description: editingListing.description || '',
        neighborhood: editingListing.neighborhood || '',
        guests: editingListing.guests ? editingListing.guests.toString() : '',
        bedrooms: editingListing.bedrooms ? editingListing.bedrooms.toString() : '',
        bathrooms: editingListing.bathrooms ? editingListing.bathrooms.toString() : '',
        area_m2: editingListing.area_m2 ? editingListing.area_m2.toString() : '',
        base_price: editingListing.base_price ? editingListing.base_price.toString() : '',
        price_label: editingListing.price_label || '',
        is_featured: editingListing.is_featured || false
      })
    } else {
      resetForm()
    }
  }, [editingListing])

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    setUploading(true)
    const newImages = []

    for (const file of files) {
      try {
        const reader = new FileReader()
        const dataUrl = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result)
          reader.readAsDataURL(file)
        })

        newImages.push({
          id: Date.now() + Math.random(),
          file,
          preview: dataUrl,
          name: file.name
        })
      } catch (error) {
        console.error('Error processing image:', error)
      }
    }

    setUploadedImages(prev => [...prev, ...newImages])
    setUploading(false)
  }

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.category || !formData.title) {
      alert('Por favor, preencha a categoria e o título.')
      return
    }
    
    setLoading(true)

    try {
      const method = editingListing ? 'PATCH' : 'POST'
      const url = editingListing ? `/api/listings/${editingListing.id}` : '/api/listings'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          guests: formData.guests ? parseInt(formData.guests) : null,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
          area_m2: formData.area_m2 ? parseInt(formData.area_m2) : null,
          base_price: formData.base_price ? parseFloat(formData.base_price) : null,
        })
      })

      if (response.ok) {
        onSave()
        resetForm()
      } else {
        console.error('Failed to save listing:', await response.json())
      }
    } catch (error) {
      console.error('Error saving listing:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      category: '',
      title: '',
      subtitle: '',
      description: '',
      neighborhood: '',
      guests: '',
      bedrooms: '',
      bathrooms: '',
      area_m2: '',
      base_price: '',
      price_label: '',
      is_featured: false
    })
    setUploadedImages([])
  }

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {editingListing ? 'Editar Propriedade' : 'Adicionar Nova Propriedade'}
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Fotos da Propriedade</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600 mb-2">
                {uploading ? 'Processando imagens...' : 'Clique para adicionar fotos'}
              </p>
              <p className="text-sm text-gray-500">
                Ou arraste e solte as imagens aqui (máximo 10 fotos)
              </p>
            </label>
          </div>
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                    {image.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categoria *</label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mansoes">Mansão</SelectItem>
                <SelectItem value="iates">Iate</SelectItem>
                <SelectItem value="escuna">Escuna</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="buggy">Buggy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Bairro</label>
            <Input
              value={formData.neighborhood}
              onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
              placeholder="Ex: Geribá"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Ex: Mansão Vista Mar em Geribá"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subtítulo</label>
          <Input
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Ex: Luxo e conforto à beira-mar"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descreva a propriedade..."
            className="w-full p-3 border rounded-md resize-none"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hóspedes</label>
            <Input
              type="number"
              value={formData.guests}
              onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
              placeholder="8"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Quartos</label>
            <Input
              type="number"
              value={formData.bedrooms}
              onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
              placeholder="4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Banheiros</label>
            <Input
              type="number"
              value={formData.bathrooms}
              onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
              placeholder="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Área (m²)</label>
            <Input
              type="number"
              value={formData.area_m2}
              onChange={(e) => setFormData(prev => ({ ...prev, area_m2: e.target.value }))}
              placeholder="350"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Preço Base (R$)</label>
            <Input
              type="number"
              step="0.01"
              value={formData.base_price}
              onChange={(e) => setFormData(prev => ({ ...prev, base_price: e.target.value }))}
              placeholder="2500.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Label do Preço</label>
            <Input
              value={formData.price_label}
              onChange={(e) => setFormData(prev => ({ ...prev, price_label: e.target.value }))}
              placeholder="R$ 2.500/dia"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.is_featured}
            onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
            className="rounded border-gray-300"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Marcar como propriedade em destaque
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || uploading}>
            {loading 
              ? (editingListing ? 'Atualizando...' : 'Criando...') 
              : (editingListing ? 'Atualizar Propriedade' : 'Criar Propriedade')
            }
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}

// Settings Component
const Settings = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp Oficial</label>
              <Input value="+55 21 97686-0759" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value="wordmaster01@outlook.com" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instagram</label>
              <Input value="@wordmasterbeachbuzios" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <Input value="wordmasterbeachbuzios.com" readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações do Anfitrião</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome Padrão</label>
              <Input value="Adson Carlos dos Santos" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cidade Base</label>
              <Input value="Búzios, RJ" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Anos de Experiência</label>
              <Input value="7 anos" readOnly />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Main Admin Panel Component
export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />
      case 'listings':
        return <ListingsManagement />
      case 'promotions':
        return <div>Promoções</div> // Placeholder
      case 'reviews':
        return <div>Avaliações</div> // Placeholder
      case 'settings':
        return <Settings />
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 ml-64">
        {renderCurrentPage()}
      </div>
    </div>
  )
}
}

{
type: uploaded file
fileName: route.js
fullContent:
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

// MongoDB connection
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'wordmaster_buzios')
  }
  return db
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Category type mapping
const CATEGORIES = {
  mansao: 'Mansão',
  mansoes: 'Mansão', // Adicionado 'mansoes' para consistência
  iate: 'Iate',
  iates: 'Iate', // Adicionado 'iates' para consistência
  escuna: 'Escuna',
  transfer: 'Transfer',
  buggy: 'Buggy'
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Root endpoint
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({
        message: "Wordmaster Beach Búzios API",
        version: "1.0.0"
      }))
    }

    // **LISTINGS ENDPOINTS**

    // Get all listings - GET /api/listings
    if (route === '/listings' && method === 'GET') {
      const url = new URL(request.url)
      const category = url.searchParams.get('category')
      const featured = url.searchParams.get('featured')
      const active = url.searchParams.get('active')
      const limit = parseInt(url.searchParams.get('limit')) || 50
      const skip = parseInt(url.searchParams.get('skip')) || 0

      let filter = {}
      if (category && (CATEGORIES[category] || CATEGORIES[`${category}s`])) {
        filter.category = category
      }
      if (featured === 'true') {
        filter.is_featured = true
      }
      if (active !== 'false') {
        filter.is_active = true
      }

      const listings = await db.collection('listings')
        .find(filter)
        .sort({ created_at: -1 })
        .limit(limit)
        .skip(skip)
        .toArray()

      // Remove MongoDB _id and return
      const cleanListings = listings.map(({ _id, ...rest }) => rest)

      return handleCORS(NextResponse.json({
        listings: cleanListings,
        total: await db.collection('listings').countDocuments(filter)
      }))
    }

    // Get single listing - GET /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'GET') {
      const listingId = route.split('/listings/')[1]

      const listing = await db.collection('listings').findOne({
        id: listingId,
        is_active: true
      })

      if (!listing) {
        return handleCORS(NextResponse.json(
          { error: "Listing not found" },
          { status: 404 }
        ))
      }

      // Get listing media
      const media = await db.collection('listing_media')
        .find({ listing_id: listingId })
        .sort({ sort_order: 1 })
        .toArray()

      // Get amenities
      const amenities = await db.collection('listing_amenities')
        .aggregate([
          { $match: { listing_id: listingId } },
          {
            $lookup: {
              from: 'amenities',
              localField: 'amenity_id',
              foreignField: 'id',
              as: 'amenity'
            }
          },
          { $unwind: '$amenity' }
        ])
        .toArray()

      // Get active promotion
      const promotion = await db.collection('promotions').findOne({
        listing_id: listingId,
        is_active: true,
        starts_at: { $lte: new Date() },
        ends_at: { $gte: new Date() }
      })

      // Get approved reviews
      const reviews = await db.collection('reviews')
        .find({
          listing_id: listingId,
          is_approved: true
        })
        .sort({ created_at: -1 })
        .limit(10)
        .toArray()

      const { _id, ...cleanListing } = listing

      return handleCORS(NextResponse.json({
        ...cleanListing,
        media: media.map(({ _id, ...rest }) => rest),
        amenities: amenities.map(item => ({
          ...item.amenity,
          available: item.available
        })),
        promotion: promotion ? { ...promotion, _id: undefined } : null,
        reviews: reviews.map(({ _id, ...rest }) => rest)
      }))
    }

    // Update listing - PATCH /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'PATCH') {
      const listingId = route.split('/listings/')[1]
      const body = await request.json()

      const result = await db.collection('listings').updateOne(
        { id: listingId },
        {
          $set: {
            ...body,
            updated_at: new Date()
          }
        }
      )

      if (result.matchedCount === 0) {
        return handleCORS(NextResponse.json(
          { error: "Listing not found" },
          { status: 404 }
        ))
      }

      const updatedListing = await db.collection('listings').findOne({ id: listingId })
      const { _id, ...cleanUpdatedListing } = updatedListing

      return handleCORS(NextResponse.json(cleanUpdatedListing))
    }

    // Delete listing - DELETE /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'DELETE') {
      const listingId = route.split('/listings/')[1]

      const result = await db.collection('listings').deleteOne({ id: listingId })

      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json(
          { error: "Listing not found" },
          { status: 404 }
        ))
      }

      return handleCORS(NextResponse.json({ success: true }))
    }

    // Get reviews - GET /api/reviews
    if (route === '/reviews' && method === 'GET') {
      const reviews = await db.collection('reviews')
        .find({})
        .sort({ created_at: -1 })
        .toArray()

      return handleCORS(NextResponse.json({
        reviews: reviews.map(({ _id, ...rest }) => rest)
      }))
    }
    if (route === '/listings' && method === 'POST') {
      const body = await request.json()

      // Validação corrigida para os campos obrigatórios
      const required = ['category', 'title']
      for (const field of required) {
        if (!body[field]) {
          return handleCORS(NextResponse.json(
            { error: `${field} is required` },
            { status: 400 }
          ))
        }
      }

      // Validate category
      if (!CATEGORIES[body.category]) {
        return handleCORS(NextResponse.json(
          { error: "Invalid category" },
          { status: 400 }
        ))
      }

      const listingId = uuidv4()
      const slug = body.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')

      const listing = {
        id: listingId,
        category: body.category,
        slug: `${slug}-${listingId.split('-')[0]}`,
        title: body.title,
        subtitle: body.subtitle || '',
        description: body.description || '',
        city: body.city || 'Búzios', // Valor padrão para 'city'
        neighborhood: body.neighborhood || '',
        guests: body.guests || null,
        bedrooms: body.bedrooms || null,
        bathrooms: body.bathrooms || null,
        area_m2: body.area_m2 || null,
        attributes: body.attributes || {},
        base_price: body.base_price || null,
        price_label: body.price_label || '',
        whatsapp_e164: body.whatsapp_e164 || '5521976860759', // Valor padrão para 'whatsapp_e164'
        broker_name: body.broker_name || 'Adson Carlos dos Santos',
        is_featured: body.is_featured || false,
        is_active: body.is_active !== false,
        created_at: new Date(),
        updated_at: new Date()
      }

      await db.collection('listings').insertOne(listing)

      const { _id, ...cleanListing } = listing
      return handleCORS(NextResponse.json(cleanListing, { status: 201 }))
    }

    // **AMENITIES ENDPOINTS**
    // ... (O restante das suas rotas) ...

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` },
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
}
aqui está o código do routes.js, pode me dar o código completo e corrigido, por favor?