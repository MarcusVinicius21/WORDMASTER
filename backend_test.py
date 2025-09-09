import requests
import json
from datetime import datetime
import uuid

# URL da API (ajuste conforme necessário)
API_BASE_URL = "http://localhost:3000/api"

def create_listing(listing_data):
    """Cria uma nova listagem via API"""
    try:
        response = requests.post(f"{API_BASE_URL}/listings", json=listing_data)
        if response.status_code == 201:
            print(f"✅ {listing_data['category'].upper()}: {listing_data['title']} criado com sucesso!")
            return response.json()
        else:
            print(f"❌ Erro ao criar {listing_data['title']}: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
        return None

def create_media_for_listing(listing_id, media_data):
    """Adiciona mídia para uma listagem"""
    try:
        media_payload = {
            "listing_id": listing_id,
            "type": "image",
            "url": media_data["url"],
            "alt_text": media_data.get("alt_text", ""),
            "sort_order": media_data.get("sort_order", 1)
        }
        response = requests.post(f"{API_BASE_URL}/media", json=media_payload)
        if response.status_code == 201:
            print(f"  📷 Mídia adicionada para {listing_id}")
        else:
            print(f"  ❌ Erro ao adicionar mídia: {response.text}")
    except Exception as e:
        print(f"  ❌ Erro ao adicionar mídia: {e}")

# Dados de teste para cada categoria
SAMPLE_LISTINGS = [
    # MANSÕES
    {
        "category": "mansoes",
        "title": "Villa Geribá Luxo",
        "subtitle": "Vista mar deslumbrante",
        "description": "Luxuosa villa com vista panorâmica para o mar de Geribá. Possui piscina infinita, churrasqueira gourmet e acesso privativo à praia. Perfeita para famílias e grupos que buscam conforto e exclusividade.",
        "neighborhood": "Geribá",
        "guests": 12,
        "bedrooms": 6,
        "bathrooms": 5,
        "area_m2": 450,
        "base_price": 3500.00,
        "price_label": "R$ 3.500/dia",
        "is_featured": True,
        "media": [
            {"url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", "sort_order": 1},
            {"url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", "sort_order": 2}
        ]
    },
    {
        "category": "mansoes", 
        "title": "Casa Centro Histórico",
        "subtitle": "Charme colonial moderno",
        "description": "Belíssima casa no coração do centro histórico de Búzios, totalmente restaurada mantendo o charme colonial. Localização privilegiada próxima aos melhores restaurantes e vida noturna.",
        "neighborhood": "Centro",
        "guests": 8,
        "bedrooms": 4,
        "bathrooms": 3,
        "area_m2": 280,
        "base_price": 2200.00,
        "price_label": "R$ 2.200/dia",
        "is_featured": False,
        "media": [
            {"url": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", "sort_order": 1}
        ]
    },

    # IATES
    {
        "category": "iates",
        "title": "Iate Azimut 68 pés",
        "subtitle": "Luxo e conforto no mar",
        "description": "Magnífico iate de 68 pés com 4 cabines luxuosas, sala de estar ampla, deck superior com jacuzzi e tripulação especializada. Ideal para day trips ou pernoites navegando pela costa de Búzios.",
        "neighborhood": "Marina Porto Búzios",
        "guests": 16,
        "bedrooms": 4,  # cabines
        "boat_length": 68,
        "boat_year": 2019,
        "base_price": 8500.00,
        "price_label": "R$ 8.500/dia",
        "is_featured": True,
        "media": [
            {"url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop", "sort_order": 1},
            {"url": "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop", "sort_order": 2}
        ]
    },
    {
        "category": "iates",
        "title": "Lancha Cigarette 42",
        "subtitle": "Velocidade e estilo",
        "description": "Lancha esportiva de alta performance para quem busca adrenalina e velocidade. Perfeita para passeios rápidos às praias mais exclusivas e atividades aquáticas.",
        "neighborhood": "Marina Porto Búzios", 
        "guests": 12,
        "bedrooms": 2,
        "boat_length": 42,
        "boat_year": 2021,
        "base_price": 4200.00,
        "price_label": "R$ 4.200/dia",
        "is_featured": False,
        "media": [
            {"url": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=600&fit=crop", "sort_order": 1}
        ]
    },

    # ESCUNAS
    {
        "category": "escuna",
        "title": "Escuna Tradicional Búzios",
        "subtitle": "Passeio clássico pelas praias",
        "description": "Tradicional escuna para o famoso passeio pelas 12 praias de Búzios. Inclui paradas para banho em Ilha Feia, João Fernandes e Azeda. Bar a bordo e música ambiente.",
        "neighborhood": "Cais de Búzios",
        "guests": 40,
        "boat_length": 55,
        "duration": "3 horas",
        "includes_meal": True,
        "base_price": 180.00,
        "price_label": "R$ 180/pessoa",
        "is_featured": True,
        "media": [
            {"url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop", "sort_order": 1}
        ]
    },

    # TRANSFER
    {
        "category": "transfer",
        "title": "Helicóptero Executive",
        "subtitle": "Transfer VIP Rio-Búzios",
        "description": "Transfer executivo de helicóptero entre Rio de Janeiro e Búzios. Voe sobre as belezas da Região dos Lagos com total segurança e conforto. Inclui transfer terrestre nos aeroportos.",
        "neighborhood": "Aeroporto de Búzios",
        "guests": 4,
        "vehicle_type": "helicopter",
        "duration": "45 minutos",
        "base_price": 2500.00,
        "price_label": "R$ 2.500/trecho",
        "is_featured": True,
        "media": [
            {"url": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=600&fit=crop", "sort_order": 1}
        ]
    },
    {
        "category": "transfer",
        "title": "Van Executiva", 
        "subtitle": "Conforto para grupos",
        "description": "Transfer terrestre em van executiva com ar-condicionado, WiFi e motorista bilíngue. Ideal para grupos e famílias. Serviço porta a porta com paradas para fotos.",
        "neighborhood": "Todo Búzios",
        "guests": 12,
        "vehicle_type": "van",
        "duration": "Flexível",
        "base_price": 450.00,
        "price_label": "R$ 450/dia",
        "is_featured": False,
        "media": [
            {"url": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=600&fit=crop", "sort_order": 1}
        ]
    },

    # BUGGY
    {
        "category": "buggy",
        "title": "Buggy Polaris RZR",
        "subtitle": "Aventura off-road",
        "description": "Buggy Polaris RZR para aventuras off-road pelas trilhas e praias desertas de Búzios. Equipado com GPS, equipamentos de segurança e mapa das melhores trilhas.",
        "neighborhood": "Base Geribá",
        "guests": 4,
        "vehicle_model": "Polaris RZR 1000",
        "duration": "Dia completo",
        "base_price": 850.00,
        "price_label": "R$ 850/dia",
        "is_featured": True,
        "media": [
            {"url": "https://images.unsplash.com/photo-1558618666-fbd7c94d633d?w=800&h=600&fit=crop", "sort_order": 1}
        ]
    }
]

def main():
    print("🚀 Iniciando seed dos dados de teste para Wordmaster Búzios...")
    print(f"📡 API Base URL: {API_BASE_URL}")
    print("-" * 60)
    
    created_count = 0
    
    for listing_data in SAMPLE_LISTINGS:
        # Separar os dados de mídia
        media_list = listing_data.pop('media', [])
        
        # Criar a listagem
        created_listing = create_listing(listing_data)
        
        if created_listing:
            created_count += 1
            
            # Adicionar mídia se criou com sucesso
            for media_data in media_list:
                create_media_for_listing(created_listing['id'], media_data)
    
    print("-" * 60)
    print(f"✅ Seed concluído! {created_count} listagens criadas com sucesso.")
    print("\n📋 Resumo por categoria:")
    print("  🏠 Mansões: 2 propriedades")
    print("  ⛵ Iates: 2 embarcações") 
    print("  🚢 Escunas: 1 passeio")
    print("  ✈️ Transfer: 2 opções")
    print("  🚗 Buggy: 1 veículo")
    print("\n🌐 Acesse http://localhost:3000 para ver o resultado!")

if __name__ == "__main__":
    main()