#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Wordmaster Beach Búzios
Tests all core API endpoints with proper validation and error handling
"""

import requests
import json
import uuid
import time
from datetime import datetime

# Configuration - Using production URL for admin testing
BASE_URL = "https://wordmaster-admin.preview.emergentagent.com/api"
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

class BackendTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS
        self.test_results = []
        self.created_listing_id = None
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def make_request(self, method, endpoint, data=None, params=None):
        """Make HTTP request with error handling"""
        url = f"{self.base_url}{endpoint}"
        try:
            if method.upper() == 'GET':
                response = requests.get(url, headers=self.headers, params=params, timeout=30)
            elif method.upper() == 'POST':
                response = requests.post(url, headers=self.headers, json=data, timeout=30)
            elif method.upper() == 'PUT':
                response = requests.put(url, headers=self.headers, json=data, timeout=30)
            elif method.upper() == 'DELETE':
                response = requests.delete(url, headers=self.headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            return response
        except requests.exceptions.RequestException as e:
            return None, str(e)
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        print("\n=== Testing Root Endpoint ===")
        response = self.make_request('GET', '/')
        
        if response is None:
            self.log_test("Root Endpoint", False, "Failed to connect to API")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'message' in data and 'Wordmaster Beach Búzios API' in data['message']:
                    self.log_test("Root Endpoint", True, "API is accessible and responding correctly")
                    return True
                else:
                    self.log_test("Root Endpoint", False, "Unexpected response format", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Root Endpoint", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Root Endpoint", False, f"HTTP {response.status_code}", response.text)
            return False
    
    def test_seed_database(self):
        """Test database seeding"""
        print("\n=== Testing Database Seeding ===")
        response = self.make_request('POST', '/seed')
        
        if response is None:
            self.log_test("Database Seeding", False, "Failed to connect to API")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if 'message' in data and 'seeded successfully' in data['message']:
                    counts = data.get('counts', {})
                    self.log_test("Database Seeding", True, 
                                f"Database seeded successfully - Amenities: {counts.get('amenities', 0)}, Listings: {counts.get('listings', 0)}")
                    return True
                else:
                    self.log_test("Database Seeding", False, "Unexpected response format", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Database Seeding", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Database Seeding", False, f"HTTP {response.status_code}", response.text)
            return False
    
    def test_categories_api(self):
        """Test categories API"""
        print("\n=== Testing Categories API ===")
        response = self.make_request('GET', '/categories')
        
        if response is None:
            self.log_test("Categories API", False, "Failed to connect to API")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                categories = data.get('categories', [])
                
                # Check if we have expected categories
                expected_categories = ['mansao', 'iate', 'escuna', 'transfer', 'buggy']
                found_categories = [cat['key'] for cat in categories]
                
                if all(cat in found_categories for cat in expected_categories):
                    self.log_test("Categories API", True, f"All {len(categories)} categories returned correctly")
                    return True
                else:
                    missing = [cat for cat in expected_categories if cat not in found_categories]
                    self.log_test("Categories API", False, f"Missing categories: {missing}", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Categories API", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Categories API", False, f"HTTP {response.status_code}", response.text)
            return False
    
    def test_amenities_api(self):
        """Test amenities API"""
        print("\n=== Testing Amenities API ===")
        response = self.make_request('GET', '/amenities')
        
        if response is None:
            self.log_test("Amenities API", False, "Failed to connect to API")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                amenities = data.get('amenities', [])
                
                if len(amenities) > 0:
                    # Check structure of first amenity
                    first_amenity = amenities[0]
                    required_fields = ['id', 'name', 'icon']
                    
                    if all(field in first_amenity for field in required_fields):
                        self.log_test("Amenities API", True, f"Retrieved {len(amenities)} amenities with correct structure")
                        return True
                    else:
                        missing_fields = [field for field in required_fields if field not in first_amenity]
                        self.log_test("Amenities API", False, f"Missing fields in amenity: {missing_fields}", first_amenity)
                        return False
                else:
                    self.log_test("Amenities API", False, "No amenities returned", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Amenities API", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Amenities API", False, f"HTTP {response.status_code}", response.text)
            return False
    
    def test_listings_get_all(self):
        """Test GET /api/listings"""
        print("\n=== Testing GET All Listings ===")
        response = self.make_request('GET', '/listings')
        
        if response is None:
            self.log_test("GET All Listings", False, "Failed to connect to API")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                listings = data.get('listings', [])
                total = data.get('total', 0)
                
                if isinstance(listings, list) and isinstance(total, int):
                    self.log_test("GET All Listings", True, f"Retrieved {len(listings)} listings, total: {total}")
                    
                    # Store first listing ID for later tests
                    if listings:
                        self.created_listing_id = listings[0].get('id')
                    
                    return True
                else:
                    self.log_test("GET All Listings", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("GET All Listings", False, "Invalid JSON response")
                return False
        else:
            self.log_test("GET All Listings", False, f"HTTP {response.status_code}", response.text)
            return False
    
    def test_listings_filtering(self):
        """Test listings filtering by category and featured status"""
        print("\n=== Testing Listings Filtering ===")
        
        # Test category filtering
        response = self.make_request('GET', '/listings', params={'category': 'mansao'})
        
        if response and response.status_code == 200:
            try:
                data = response.json()
                listings = data.get('listings', [])
                
                # Check if all returned listings are mansao category
                if all(listing.get('category') == 'mansao' for listing in listings):
                    self.log_test("Category Filtering", True, f"Category filter working - {len(listings)} mansao listings")
                else:
                    wrong_category = [l for l in listings if l.get('category') != 'mansao']
                    self.log_test("Category Filtering", False, f"Wrong category listings returned", wrong_category)
            except json.JSONDecodeError:
                self.log_test("Category Filtering", False, "Invalid JSON response")
        else:
            self.log_test("Category Filtering", False, f"HTTP {response.status_code if response else 'No response'}")
        
        # Test featured filtering
        response = self.make_request('GET', '/listings', params={'featured': 'true'})
        
        if response and response.status_code == 200:
            try:
                data = response.json()
                listings = data.get('listings', [])
                
                # Check if all returned listings are featured
                if all(listing.get('is_featured') == True for listing in listings):
                    self.log_test("Featured Filtering", True, f"Featured filter working - {len(listings)} featured listings")
                else:
                    non_featured = [l for l in listings if not l.get('is_featured')]
                    self.log_test("Featured Filtering", False, f"Non-featured listings returned", non_featured)
            except json.JSONDecodeError:
                self.log_test("Featured Filtering", False, "Invalid JSON response")
        else:
            self.log_test("Featured Filtering", False, f"HTTP {response.status_code if response else 'No response'}")
    
    def test_listings_pagination(self):
        """Test listings pagination"""
        print("\n=== Testing Listings Pagination ===")
        
        # Test with limit
        response = self.make_request('GET', '/listings', params={'limit': 1})
        
        if response and response.status_code == 200:
            try:
                data = response.json()
                listings = data.get('listings', [])
                
                if len(listings) <= 1:
                    self.log_test("Pagination Limit", True, f"Limit parameter working - returned {len(listings)} listings")
                else:
                    self.log_test("Pagination Limit", False, f"Limit not respected - returned {len(listings)} listings")
            except json.JSONDecodeError:
                self.log_test("Pagination Limit", False, "Invalid JSON response")
        else:
            self.log_test("Pagination Limit", False, f"HTTP {response.status_code if response else 'No response'}")
    
    def test_listings_get_single(self):
        """Test GET /api/listings/[id]"""
        print("\n=== Testing GET Single Listing ===")
        
        if not self.created_listing_id:
            self.log_test("GET Single Listing", False, "No listing ID available for testing")
            return False
        
        response = self.make_request('GET', f'/listings/{self.created_listing_id}')
        
        if response is None:
            self.log_test("GET Single Listing", False, "Failed to connect to API")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                
                # Check required fields
                required_fields = ['id', 'category', 'title', 'city']
                if all(field in data for field in required_fields):
                    # Check if we get additional data like media, amenities
                    has_media = 'media' in data
                    has_amenities = 'amenities' in data
                    has_reviews = 'reviews' in data
                    
                    self.log_test("GET Single Listing", True, 
                                f"Single listing retrieved with media: {has_media}, amenities: {has_amenities}, reviews: {has_reviews}")
                    return True
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("GET Single Listing", False, f"Missing required fields: {missing_fields}", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("GET Single Listing", False, "Invalid JSON response")
                return False
        elif response.status_code == 404:
            self.log_test("GET Single Listing", False, "Listing not found - may be inactive or deleted")
            return False
        else:
            self.log_test("GET Single Listing", False, f"HTTP {response.status_code}", response.text)
            return False
    
    def test_listings_create(self):
        """Test POST /api/listings"""
        print("\n=== Testing POST Create Listing ===")
        
        # Test with valid data
        test_listing = {
            "category": "mansao",
            "title": "Casa de Teste Automatizado",
            "subtitle": "Teste de API",
            "description": "Esta é uma propriedade criada durante teste automatizado da API",
            "city": "Búzios",
            "neighborhood": "Centro",
            "guests": 6,
            "bedrooms": 3,
            "bathrooms": 2,
            "area_m2": 150,
            "base_price": 800.00,
            "price_label": "R$ 800/dia",
            "whatsapp_e164": "5521987654321",
            "broker_name": "Teste Automatizado",
            "is_featured": False,
            "is_active": True
        }
        
        response = self.make_request('POST', '/listings', data=test_listing)
        
        if response is None:
            self.log_test("Create Listing - Valid Data", False, "Failed to connect to API")
            return False
            
        if response.status_code == 201:
            try:
                data = response.json()
                
                # Check if listing was created with correct data
                if data.get('title') == test_listing['title'] and data.get('category') == test_listing['category']:
                    # Store the created listing ID for cleanup
                    self.created_listing_id = data.get('id')
                    self.log_test("Create Listing - Valid Data", True, f"Listing created successfully with ID: {self.created_listing_id}")
                else:
                    self.log_test("Create Listing - Valid Data", False, "Created listing data doesn't match input", data)
            except json.JSONDecodeError:
                self.log_test("Create Listing - Valid Data", False, "Invalid JSON response")
        else:
            self.log_test("Create Listing - Valid Data", False, f"HTTP {response.status_code}", response.text)
        
        # Test with missing required fields
        invalid_listing = {
            "title": "Incomplete Listing"
            # Missing category, city, whatsapp_e164
        }
        
        response = self.make_request('POST', '/listings', data=invalid_listing)
        
        if response and response.status_code == 400:
            self.log_test("Create Listing - Missing Fields", True, "Correctly rejected listing with missing required fields")
        else:
            self.log_test("Create Listing - Missing Fields", False, 
                        f"Should have returned 400 for missing fields, got {response.status_code if response else 'No response'}")
        
        # Test with invalid category
        invalid_category_listing = {
            "category": "invalid_category",
            "title": "Invalid Category Test",
            "city": "Búzios",
            "whatsapp_e164": "5521987654321"
        }
        
        response = self.make_request('POST', '/listings', data=invalid_category_listing)
        
        if response and response.status_code == 400:
            self.log_test("Create Listing - Invalid Category", True, "Correctly rejected listing with invalid category")
        else:
            self.log_test("Create Listing - Invalid Category", False, 
                        f"Should have returned 400 for invalid category, got {response.status_code if response else 'No response'}")
    
    def test_analytics_whatsapp_click(self):
        """Test POST /api/analytics/whatsapp-click"""
        print("\n=== Testing Analytics WhatsApp Click ===")
        
        if not self.created_listing_id:
            self.log_test("WhatsApp Click Analytics", False, "No listing ID available for testing")
            return False
        
        # Test with valid data
        analytics_data = {
            "listing_id": self.created_listing_id,
            "meta": {
                "source": "test",
                "button_location": "listing_detail"
            }
        }
        
        response = self.make_request('POST', '/analytics/whatsapp-click', data=analytics_data)
        
        if response is None:
            self.log_test("WhatsApp Click Analytics", False, "Failed to connect to API")
            return False
            
        if response.status_code == 201:
            try:
                data = response.json()
                
                # Check if event was created correctly
                if data.get('listing_id') == self.created_listing_id and data.get('type') == 'click_whatsapp':
                    self.log_test("WhatsApp Click Analytics", True, f"Analytics event created successfully with ID: {data.get('id')}")
                else:
                    self.log_test("WhatsApp Click Analytics", False, "Created event data doesn't match input", data)
            except json.JSONDecodeError:
                self.log_test("WhatsApp Click Analytics", False, "Invalid JSON response")
        else:
            self.log_test("WhatsApp Click Analytics", False, f"HTTP {response.status_code}", response.text)
        
        # Test with missing listing_id
        invalid_analytics = {
            "meta": {
                "source": "test"
            }
        }
        
        response = self.make_request('POST', '/analytics/whatsapp-click', data=invalid_analytics)
        
        if response and response.status_code == 400:
            self.log_test("WhatsApp Click Analytics - Missing listing_id", True, "Correctly rejected analytics without listing_id")
        else:
            self.log_test("WhatsApp Click Analytics - Missing listing_id", False, 
                        f"Should have returned 400 for missing listing_id, got {response.status_code if response else 'No response'}")
    
    def test_cors_headers(self):
        """Test CORS headers are properly set"""
        print("\n=== Testing CORS Headers ===")
        
        response = self.make_request('GET', '/categories')
        
        if response is None:
            self.log_test("CORS Headers", False, "Failed to connect to API")
            return False
        
        cors_headers = [
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Headers'
        ]
        
        missing_headers = []
        for header in cors_headers:
            if header not in response.headers:
                missing_headers.append(header)
        
        if not missing_headers:
            self.log_test("CORS Headers", True, "All required CORS headers are present")
        else:
            self.log_test("CORS Headers", False, f"Missing CORS headers: {missing_headers}")
    
    def test_error_handling(self):
        """Test error handling for non-existent routes"""
        print("\n=== Testing Error Handling ===")
        
        # Test non-existent route
        response = self.make_request('GET', '/nonexistent-route')
        
        if response and response.status_code == 404:
            try:
                data = response.json()
                if 'error' in data:
                    self.log_test("404 Error Handling", True, "Correctly returns 404 for non-existent routes")
                else:
                    self.log_test("404 Error Handling", False, "404 response missing error field", data)
            except json.JSONDecodeError:
                self.log_test("404 Error Handling", False, "Invalid JSON in 404 response")
        else:
            self.log_test("404 Error Handling", False, 
                        f"Should have returned 404, got {response.status_code if response else 'No response'}")
        
        # Test non-existent listing
        response = self.make_request('GET', '/listings/non-existent-id')
        
        if response and response.status_code == 404:
            self.log_test("Listing Not Found", True, "Correctly returns 404 for non-existent listing")
        else:
            self.log_test("Listing Not Found", False, 
                        f"Should have returned 404 for non-existent listing, got {response.status_code if response else 'No response'}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive Backend API Tests for Wordmaster Beach Búzios")
        print(f"🌐 Testing against: {self.base_url}")
        print("=" * 80)
        
        start_time = time.time()
        
        # Run tests in logical order
        self.test_root_endpoint()
        self.test_seed_database()
        self.test_categories_api()
        self.test_amenities_api()
        self.test_listings_get_all()
        self.test_listings_filtering()
        self.test_listings_pagination()
        self.test_listings_get_single()
        self.test_listings_create()
        self.test_analytics_whatsapp_click()
        self.test_cors_headers()
        self.test_error_handling()
        
        end_time = time.time()
        duration = end_time - start_time
        
        # Summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        passed = sum(1 for result in self.test_results if result['success'])
        failed = len(self.test_results) - passed
        
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        print(f"📈 Success Rate: {(passed/len(self.test_results)*100):.1f}%")
        
        if failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   ❌ {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)
        return passed, failed

if __name__ == "__main__":
    tester = BackendTester()
    passed, failed = tester.run_all_tests()
    
    # Exit with appropriate code
    exit(0 if failed == 0 else 1)