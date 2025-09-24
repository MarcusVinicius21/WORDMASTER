'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import {
  Plus, Search, Edit, Trash2, Eye, EyeOff, BarChart3, Home, Star, MessageSquare, Settings as SettingsIcon, LogOut, Upload, X, Camera, Percent, Plane, Bus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 }, { id: 'listings', label: 'Propriedades', icon: Home },
    { id: 'promotions', label: 'Promoções', icon: Percent }, { id: 'reviews', label: 'Avaliações', icon: MessageSquare },
    { id: 'settings', label: 'Configurações', icon: SettingsIcon }
  ];
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8"><div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">W</span></div><div><h1 className="font-bold text-lg">Wordmaster</h1><p className="text-gray-400 text-sm">Admin Panel</p></div></div>
        <nav className="space-y-2">{menuItems.map((item) => { const IconComponent = item.icon; return (<button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${ currentPage === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}><IconComponent className="w-5 h-5" /><span>{item.label}</span></button>)})}</nav>
      </div>
      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="flex items-center space-x-3 mb-4"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Adson Carlos" className="w-10 h-10 rounded-full" /><div><p className="font-medium">Adson Carlos</p><p className="text-gray-400 text-sm">Administrador</p></div></div>
        <Button variant="outline" size="sm" className="w-full text-gray-300 border-gray-600 hover:bg-gray-800" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Sair</Button>
      </div>
    </div>
  )
}

const Dashboard = ({ setCurrentPage }) => {
  const [stats, setStats] = useState({ totalListings: 0, activeListings: 0, onPromotion: 0, pendingReviews: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [listingsRes, reviewsRes] = await Promise.all([fetch('/api/listings?active=false'), fetch('/api/reviews?is_approved=false')]);
        if (listingsRes.ok) {
          const { listings } = await listingsRes.json();
          setStats(prev => ({ ...prev, totalListings: listings.length, activeListings: listings.filter(l => l.is_active).length, onPromotion: listings.filter(l => l.is_featured).length }));
        }
        if (reviewsRes.ok) {
          const { reviews } = await reviewsRes.json();
          setStats(prev => ({ ...prev, pendingReviews: reviews.length }));
        }
      } catch (error) { console.error("Failed to fetch stats", error) }
    };
    fetchStats();
  }, []);
  return (
    <div className="p-8">
      <div className="mb-8"><h1 className="text-3xl font-bold mb-2">Dashboard</h1><p className="text-gray-600">Visão geral do sistema</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Total de Propriedades</p><p className="text-3xl font-bold text-blue-600">{stats.totalListings}</p></div><Home className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Propriedades Ativas</p><p className="text-3xl font-bold text-green-600">{stats.activeListings}</p></div><Eye className="w-8 h-8 text-green-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Em Destaque</p><p className="text-3xl font-bold text-yellow-600">{stats.onPromotion}</p></div><Star className="w-8 h-8 text-yellow-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Avaliações Pendentes</p><p className="text-3xl font-bold text-purple-600">{stats.pendingReviews}</p></div><MessageSquare className="w-8 h-8 text-purple-600" /></div></CardContent></Card>
      </div>
    </div>
  )
}

const ListingsManagement = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingListing, setEditingListing] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const categoryNames = {
    mansao: 'Mansão', mansoes: 'Mansão',
    lancha: 'Lancha', lanchas: 'Lancha',
    escuna: 'Escuna',
    'taxi-aereo': 'Táxi Aéreo',
    transfer: 'Transfer',
    buggy: 'Buggy'
  }

  useEffect(() => { fetchListings() }, [])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/listings?active=false&limit=100')
      if (response.ok) {
        const data = await response.json();
        setListings(data.listings || []);
      } else { setListings([]) }
    } catch (error) { setListings([]) }
    finally { setLoading(false) }
  }

  const handleSaveListing = () => { fetchListings(); setOpenModal(false); setEditingListing(null) }
  const toggleListingStatus = async (id, status) => { await fetch(`/api/listings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !status }) }); fetchListings() }
  const deleteListing = async (id) => { if (window.confirm('Tem certeza?')) { await fetch(`/api/listings/${id}`, { method: 'DELETE' }); fetchListings() }}
  const editListing = (listing) => { setEditingListing(listing); setOpenModal(true) }

  const filteredListings = listings.filter(l => (l.title?.toLowerCase().includes(searchTerm.toLowerCase()) || l.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase())) && (categoryFilter === 'all' || l.category === categoryFilter))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Propriedades</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setEditingListing({ category: 'mansoes' }); setOpenModal(true) }} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Nova Mansão
          </Button>
          <Button onClick={() => { setEditingListing({ category: 'lanchas' }); setOpenModal(true) }} className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" /> Nova Lancha
          </Button>
          <Button onClick={() => { setEditingListing({ category: 'escuna' }); setOpenModal(true) }} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" /> Nova Escuna
          </Button>
          <Button onClick={() => { setEditingListing({ category: 'taxi-aereo' }); setOpenModal(true) }} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" /> Novo Táxi Aéreo
          </Button>
          <Button onClick={() => { setEditingListing({ category: 'transfer' }); setOpenModal(true) }} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" /> Novo Transfer
          </Button>
          <Button onClick={() => { setEditingListing({ category: 'buggy' }); setOpenModal(true) }} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" /> Novo Buggy
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Input placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todas</SelectItem><SelectItem value="mansoes">Mansões</SelectItem><SelectItem value="lanchas">Lanchas</SelectItem><SelectItem value="escuna">Escuna</SelectItem><SelectItem value="taxi-aereo">Táxi Aéreo</SelectItem><SelectItem value="transfer">Transfer</SelectItem><SelectItem value="buggy">Buggy</SelectItem></SelectContent></Select>
      </div>

      {loading ? (<div className="text-center py-10">Carregando...</div>) :
      filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => {
            const imageUrl = listing.featured_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop&crop=center";
            return (
              <Card key={listing.id} className="overflow-hidden">
                <div className="relative"><img src={imageUrl} alt={listing.title} className="w-full h-48 object-cover" /><div className="absolute top-3 left-3"><Badge className={listing.is_active ? 'bg-green-600' : 'bg-red-600'}>{listing.is_active ? 'Ativo' : 'Inativo'}</Badge></div>{listing.is_featured && (<div className="absolute top-3 right-3"><Badge className="bg-yellow-600"><Star className="w-3 h-3 mr-1" />Destaque</Badge></div>)}</div>
                <CardContent className="p-4">
                    <span className="text-xs text-gray-500 uppercase">{categoryNames[listing.category] || listing.category}</span>
                    <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{listing.neighborhood}</p>
                    <p className="font-bold text-lg text-blue-600 mb-4">{listing.price_label}</p>
                    <div className="flex items-center justify-end"><div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => editListing(listing)}><Edit className="w-3 h-3 mr-1" />Editar</Button>
                        <Button size="sm" variant="outline" onClick={() => toggleListingStatus(listing.id, listing.is_active)}>{listing.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}</Button>
                        <Button size="sm" variant="outline" onClick={() => deleteListing(listing.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3" /></Button>
                    </div></div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12"><div className="text-gray-400 text-lg mb-4">Nenhuma propriedade encontrada</div><div className="flex justify-center space-x-2 flex-wrap gap-2"><Button onClick={() => { setEditingListing({ category: 'mansoes' }); setOpenModal(true) }} className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Mansão</Button><Button onClick={() => { setEditingListing({ category: 'lanchas' }); setOpenModal(true) }} className="bg-cyan-600 hover:bg-cyan-700"><Plus className="w-4 h-4 mr-2" />Lancha</Button><Button onClick={() => { setEditingListing({ category: 'escuna' }); setOpenModal(true) }} className="bg-teal-600 hover:bg-teal-700"><Plus className="w-4 h-4 mr-2" />Escuna</Button></div></div>
      )}
      <Dialog open={openModal} onOpenChange={setOpenModal}><CreateListingModal onSave={handleSaveListing} editingListing={editingListing} onClose={() => setOpenModal(false)} /></Dialog>
    </div>
  )
}

const CreateListingModal = ({ onSave, editingListing, onClose }) => {
  const [formData, setFormData] = useState({
    category: '', title: '', subtitle: '', description: '', neighborhood: '', guests: '', bedrooms: '', bathrooms: '', area_m2: '', base_price: '', price_label: '', is_featured: false,
    boat_length: '', boat_year: '', duration: '', includes_meal: false,
    vehicle_type: '',
    vehicle_model: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingListing && editingListing.id) {
      setFormData({
        category: editingListing.category || '',
        title: editingListing.title || '',
        subtitle: editingListing.subtitle || '',
        description: editingListing.description || '',
        neighborhood: editingListing.neighborhood || '',
        guests: String(editingListing.guests || ''),
        bedrooms: String(editingListing.bedrooms || ''),
        bathrooms: String(editingListing.bathrooms || ''),
        area_m2: String(editingListing.area_m2 || ''),
        base_price: String(editingListing.base_price || ''),
        price_label: editingListing.price_label || '',
        is_featured: editingListing.is_featured || false,
        boat_length: String(editingListing.boat_length || ''),
        boat_year: String(editingListing.boat_year || ''),
        duration: editingListing.duration || '',
        includes_meal: editingListing.includes_meal || false,
        vehicle_type: editingListing.vehicle_type || '',
        vehicle_model: editingListing.vehicle_model || ''
      });
    } else if (editingListing && editingListing.category) {
      resetForm();
      setFormData(prev => ({ ...prev, category: editingListing.category }));
    } else {
      resetForm();
    }
  }, [editingListing]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    setUploading(true);
    const newImages = files.map(file => ({ id: Date.now() + Math.random(), file, preview: URL.createObjectURL(file), name: file.name }));
    setUploadedImages(prev => [...prev, ...newImages]);
    setUploading(false);
  };

  const removeImage = (id) => { setUploadedImages(prev => prev.filter(img => img.id !== id)) };

  const resetForm = () => {
    setFormData({
      category: '', title: '', subtitle: '', description: '', neighborhood: '', guests: '', bedrooms: '', bathrooms: '', area_m2: '', base_price: '', price_label: '', is_featured: false,
      boat_length: '', boat_year: '', duration: '', includes_meal: false, vehicle_type: '', vehicle_model: ''
    });
    setUploadedImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.title) {
      alert('Categoria e Título são obrigatórios.');
      return;
    }
    setLoading(true);

    try {
      const method = editingListing && editingListing.id ? 'PATCH' : 'POST';
      const url = editingListing && editingListing.id ? `/api/listings/${editingListing.id}` : '/api/listings';
      const payload = {
        ...formData,
        guests: parseInt(formData.guests) || null,
        bedrooms: parseInt(formData.bedrooms) || null,
        bathrooms: parseInt(formData.bathrooms) || null,
        area_m2: parseInt(formData.area_m2) || null,
        base_price: parseFloat(formData.base_price) || null,
        boat_length: parseInt(formData.boat_length) || null,
        boat_year: parseInt(formData.boat_year) || null
      };
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Falha ao salvar propriedade');
      const savedListing = await response.json();

      if (uploadedImages.length > 0) {
        for (const image of uploadedImages) {
          if (image.file) {
            const uploadResponse = await fetch(`/api/upload?filename=${image.file.name}`, {
              method: 'POST',
              body: image.file,
            });
            const newBlob = await uploadResponse.json();

            if (newBlob.url) {
              const mediaPayload = {
                listing_id: savedListing.id,
                type: "image",
                url: newBlob.url,
                alt_text: formData.title,
              };
              await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mediaPayload) });
            }
          }
        }
      }

      onSave();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao salvar. Verifique o console para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'mansoes':
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className="block text-sm font-medium mb-1">Hóspedes</label><Input type="number" value={formData.guests} onChange={(e) => setFormData(p => ({ ...p, guests: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Quartos</label><Input type="number" value={formData.bedrooms} onChange={(e) => setFormData(p => ({ ...p, bedrooms: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Banheiros</label><Input type="number" value={formData.bathrooms} onChange={(e) => setFormData(p => ({ ...p, bathrooms: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Área (m²)</label><Input type="number" value={formData.area_m2} onChange={(e) => setFormData(p => ({ ...p, area_m2: e.target.value }))} /></div>
            </div>
          </>
        );

      case 'lanchas':
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className="block text-sm font-medium mb-1">Passageiros</label><Input type="number" value={formData.guests} onChange={(e) => setFormData(p => ({ ...p, guests: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Tamanho (pés)</label><Input type="number" value={formData.boat_length} onChange={(e) => setFormData(p => ({ ...p, boat_length: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Cabines</label><Input type="number" value={formData.bedrooms} onChange={(e) => setFormData(p => ({ ...p, bedrooms: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Ano</label><Input type="number" value={formData.boat_year} onChange={(e) => setFormData(p => ({ ...p, boat_year: e.target.value }))} /></div>
            </div>
          </>
        );

      case 'escuna':
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Passageiros</label><Input type="number" value={formData.guests} onChange={(e) => setFormData(p => ({ ...p, guests: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Duração</label><Input value={formData.duration} onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))} placeholder="Ex: 4 horas" /></div>
              <div><label className="block text-sm font-medium mb-1">Tamanho (pés)</label><Input type="number" value={formData.boat_length} onChange={(e) => setFormData(p => ({ ...p, boat_length: e.target.value }))} /></div>
            </div>
            <div className="flex items-center space-x-2"><input type="checkbox" id="includes_meal" checked={formData.includes_meal} onChange={(e) => setFormData(p => ({ ...p, includes_meal: e.target.checked }))} /><label htmlFor="includes_meal" className="text-sm font-medium">Inclui refeição</label></div>
          </>
        );

      case 'taxi-aereo':
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className="block text-sm font-medium mb-1">Passageiros</label><Input type="number" value={formData.guests} onChange={(e) => setFormData(p => ({ ...p, guests: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Tipo de Aeronave</label><Select value={formData.vehicle_type} onValueChange={(v) => setFormData(p => ({ ...p, vehicle_type: v }))}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent><SelectItem value="helicopter">Helicóptero</SelectItem><SelectItem value="bimotor">Bimotor</SelectItem><SelectItem value="jet">Jato</SelectItem></SelectContent></Select></div>
              <div><label className="block text-sm font-medium mb-1">Modelo</label><Input value={formData.vehicle_model} onChange={(e) => setFormData(p => ({ ...p, vehicle_model: e.target.value }))} placeholder="Ex: Robinson 44" /></div>
              <div><label className="block text-sm font-medium mb-1">Duração</label><Input value={formData.duration} onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))} placeholder="Ex: 45 min" /></div>
            </div>
          </>
        );

      case 'transfer':
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className="block text-sm font-medium mb-1">Passageiros</label><Input type="number" value={formData.guests} onChange={(e) => setFormData(p => ({ ...p, guests: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Tipo de Veículo</label><Select value={formData.vehicle_type} onValueChange={(v) => setFormData(p => ({ ...p, vehicle_type: v }))}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent><SelectItem value="van">Van</SelectItem><SelectItem value="bus">Ônibus</SelectItem><SelectItem value="luxury_car">Carro de Luxo</SelectItem></SelectContent></Select></div>
              <div><label className="block text-sm font-medium mb-1">Modelo</label><Input value={formData.vehicle_model} onChange={(e) => setFormData(p => ({ ...p, vehicle_model: e.target.value }))} placeholder="Ex: Mercedes Sprinter" /></div>
              <div><label className="block text-sm font-medium mb-1">Duração</label><Input value={formData.duration} onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))} placeholder="Ex: 2 horas" /></div>
            </div>
          </>
        );

      case 'buggy':
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Pessoas</label><Input type="number" value={formData.guests} onChange={(e) => setFormData(p => ({ ...p, guests: e.target.value }))} /></div>
              <div><label className="block text-sm font-medium mb-1">Modelo</label><Input value={formData.vehicle_model} onChange={(e) => setFormData(p => ({ ...p, vehicle_model: e.target.value }))} placeholder="Ex: Fyber 2000" /></div>
              <div><label className="block text-sm font-medium mb-1">Duração</label><Input value={formData.duration} onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))} placeholder="Ex: Dia completo" /></div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getCategoryTitle = () => {
    const titles = {
      mansoes: 'Mansão',
      lanchas: 'Lancha',
      escuna: 'Escuna',
      'taxi-aereo': 'Táxi Aéreo',
      transfer: 'Transfer',
      buggy: 'Buggy'
    };
    return titles[formData.category] || 'Propriedade';
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {editingListing && editingListing.id ? `Editar ${getCategoryTitle()}` : `Adicionar Novo ${getCategoryTitle()}`}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fotos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" disabled={uploading}/>
            <label htmlFor="image-upload" className="cursor-pointer"><Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-lg font-medium text-gray-600 mb-2">{uploading ? 'Processando...' : 'Clique para adicionar fotos'}</p></label>
          </div>
          {uploadedImages.length > 0 && (<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">{uploadedImages.map((image) => (<div key={image.id} className="relative group"><img src={image.preview} alt={image.name} className="w-full h-24 object-cover rounded-lg" /><button type="button" onClick={() => removeImage(image.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><X className="w-4 h-4" /></button></div>))}</div>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!editingListing?.id && (
            <div><label className="block text-sm font-medium mb-1">Categoria *</label><Select required value={formData.category} onValueChange={(v) => setFormData(p => ({ ...p, category: v }))}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent><SelectItem value="mansoes">Mansão</SelectItem><SelectItem value="lanchas">Lancha</SelectItem><SelectItem value="escuna">Escuna</SelectItem><SelectItem value="taxi-aereo">Táxi Aéreo</SelectItem><SelectItem value="transfer">Transfer</SelectItem><SelectItem value="buggy">Buggy</SelectItem></SelectContent></Select></div>
          )}
          <div><label className="block text-sm font-medium mb-1">Bairro</label><Input value={formData.neighborhood} onChange={(e) => setFormData(p => ({ ...p, neighborhood: e.target.value }))} placeholder="Ex: Geribá" /></div>
        </div>

        <div><label className="block text-sm font-medium mb-1">Título *</label><Input value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} placeholder={`Ex: ${getCategoryTitle()} de luxo`} required /></div>
        <div><label className="block text-sm font-medium mb-1">Subtítulo</label><Input value={formData.subtitle} onChange={(e) => setFormData(p => ({ ...p, subtitle: e.target.value }))} placeholder="Ex: Luxo e conforto" /></div>
        <div><label className="block text-sm font-medium mb-1">Descrição</label><textarea value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} className="w-full p-2 border rounded-md" rows={4} /></div>

        {renderCategorySpecificFields()}

        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Preço Base (R$)</label><Input type="number" step="0.01" value={formData.base_price} onChange={(e) => setFormData(p => ({ ...p, base_price: e.target.value }))} /></div>
          <div><label className="block text-sm font-medium mb-1">Label do Preço</label><Input value={formData.price_label} onChange={(e) => setFormData(p => ({ ...p, price_label: e.target.value }))} placeholder="R$ 2.500/dia" /></div>
        </div>

        <div className="flex items-center space-x-2"><input type="checkbox" id="featured" checked={formData.is_featured} onChange={(e) => setFormData(p => ({ ...p, is_featured: e.target.checked }))} /><label htmlFor="featured" className="text-sm font-medium">Marcar como destaque</label></div>

        <div className="flex justify-end space-x-3 pt-4 border-t mt-6"><Button type="button" variant="outline" onClick={onClose}>Cancelar</Button><Button type="submit" disabled={loading || uploading}>{loading ? 'Salvando...' : 'Salvar'}</Button></div>
      </form>
    </DialogContent>
  );
};

const Settings = () => ( <div className="p-8"> <div className="mb-8"><h1 className="text-3xl font-bold mb-2">Configurações</h1><p className="text-gray-600">Gerencie as configurações do sistema</p></div> <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> <Card><CardHeader><CardTitle>Informações da Empresa</CardTitle></CardHeader><CardContent className="space-y-4"> <div><label className="block text-sm font-medium mb-1">WhatsApp Oficial</label><Input value="+55 21 97686-0759" readOnly /></div> <div><label className="block text-sm font-medium mb-1">Email</label><Input value="wordmaster01@outlook.com" readOnly /></div> </CardContent></Card> <Card><CardHeader><CardTitle>Configurações do Anfitrião</CardTitle></CardHeader><CardContent className="space-y-4"> <div><label className="block text-sm font-medium mb-1">Nome Padrão</label><Input value="Adson Carlos dos Santos" readOnly /></div> <div><label className="block text-sm font-medium mb-1">Cidade Base</label><Input value="Búzios, RJ" readOnly /></div> </CardContent></Card> </div> </div> )

export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    if (!loggedIn) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false)
  }, [router]);

  if (isLoading || !isAuthenticated) {
    return <div className="flex h-screen w-full items-center justify-center">Carregando...</div>;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />
      case 'listings': return <ListingsManagement />
      case 'promotions': return <div className="p-8"><h1 className="text-2xl font-bold">Promoções (em breve)</h1></div>
      case 'reviews': return <div className="p-8"><h1 className="text-2xl font-bold">Avaliações (em breve)</h1></div>
      case 'settings': return <Settings />
      default: return <Dashboard setCurrentPage={setCurrentPage} />
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