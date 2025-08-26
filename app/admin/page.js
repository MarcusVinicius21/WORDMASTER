'use client'

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Eye, EyeOff, BarChart3, Users, Home, Star, MessageSquare, Settings as SettingsIcon, LogOut, Upload, X, Camera } from "lucide-react"
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
    { id: 'promotions', label: 'Promoções', icon: Star },
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
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    onPromotion: 0,
    whatsappClicks: 0,
    pendingReviews: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [listingsRes, reviewsRes] = await Promise.all([
          fetch('/api/listings'),
          fetch('/api/reviews')
        ])

        if (listingsRes.ok) {
          const listingsData = await listingsRes.json()
          const activeListings = listingsData.listings.filter(l => l.is_active).length
          const onPromotion = listingsData.listings.filter(l => l.is_featured).length
          
          setStats(prev => ({
            ...prev,
            totalListings: listingsData.listings.length,
            activeListings,
            onPromotion
          }))
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
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
            <Button className="w-full justify-start" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Nova Propriedade
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Star className="w-5 h-5 mr-2" />
              Criar Promoção
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Eye className="w-5 h-5 mr-2" />
              Ver Site Público
            </Button>
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
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedListing, setSelectedListing] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const categoryNames = {
    mansao: 'Mansão',
    iate: 'Iate',
    escuna: 'Escuna',
    transfer: 'Transfer',
    buggy: 'Buggy'
  }

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings')
      if (response.ok) {
        const data = await response.json()
        setListings(data.listings)
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleListingStatus = async (listingId, currentStatus) => {
    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      })

      if (response.ok) {
        setListings(prev => 
          prev.map(listing => 
            listing.id === listingId 
              ? { ...listing, is_active: !currentStatus }
              : listing
          )
        )
      }
    } catch (error) {
      console.error('Error updating listing status:', error)
    }
  }

  const deleteListing = async (listingId) => {
    if (!confirm('Tem certeza que deseja excluir esta propriedade?')) return

    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setListings(prev => prev.filter(listing => listing.id !== listingId))
      }
    } catch (error) {
      console.error('Error deleting listing:', error)
    }
  }

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Propriedades</h1>
          <p className="text-gray-600">Adicione, edite ou desative suas propriedades</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Propriedade
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Pesquisar propriedades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="mansao">Mansões</SelectItem>
            <SelectItem value="iate">Iates</SelectItem>
            <SelectItem value="escuna">Escuna</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
            <SelectItem value="buggy">Buggy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1585544314038-a0d3769d0193?w=400&h=240&fit=crop"
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={listing.is_active ? "default" : "secondary"}>
                    {listing.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-white">
                    {categoryNames[listing.category]}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{listing.neighborhood}</p>
                <p className="font-bold text-blue-600 mb-4">{listing.price_label}</p>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleListingStatus(listing.id, listing.is_active)}
                  >
                    {listing.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => deleteListing(listing.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredListings.length === 0 && !loading && (
        <div className="text-center py-12">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhuma propriedade encontrada</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Tente ajustar os filtros de busca'
              : 'Comece adicionando sua primeira propriedade'
            }
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Propriedade
          </Button>
        </div>
      )}

      {/* Create Listing Modal */}
      <CreateListingModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onCreated={fetchListings}
      />
    </div>
  )
}

// Create Listing Modal Component
const CreateListingModal = ({ open, onClose, onCreated }) => {
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

  // Handle image upload
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    setUploading(true)
    const newImages = []

    for (const file of files) {
      try {
        // Create a data URL for preview
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

  // Remove image
  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          guests: formData.guests ? parseInt(formData.guests) : null,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
          area_m2: formData.area_m2 ? parseInt(formData.area_m2) : null,
          base_price: formData.base_price ? parseFloat(formData.base_price) : null,
          whatsapp_e164: '5521976860759',
          city: 'Búzios'
        })
      })

      if (response.ok) {
        const newListing = await response.json()
        
        // If we have images, create media entries
        if (uploadedImages.length > 0) {
          for (let i = 0; i < uploadedImages.length; i++) {
            const image = uploadedImages[i]
            // For now, we'll use placeholder URLs since we don't have cloud storage
            // In a real scenario, you'd upload to a cloud service first
            const mediaData = {
              listing_id: newListing.id,
              type: 'image',
              url: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center`,
              alt_text: image.name,
              sort_order: i + 1
            }
            
            try {
              await fetch('/api/media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mediaData)
              })
            } catch (error) {
              console.error('Error saving media:', error)
            }
          }
        }

        onCreated()
        onClose()
        // Reset form
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
    } catch (error) {
      console.error('Error creating listing:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Propriedade</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">Fotos da Propriedade</label>
            
            {/* Upload Area */}
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

            {/* Image Preview Grid */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categoria *</label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mansao">Mansão</SelectItem>
                  <SelectItem value="iate">Iate</SelectItem>
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
              {loading ? 'Criando...' : 'Criar Propriedade'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
        return <Dashboard />
      case 'listings':
        return <ListingsManagement />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
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