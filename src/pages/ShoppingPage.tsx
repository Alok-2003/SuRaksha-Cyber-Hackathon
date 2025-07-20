import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Filter, 
  Star, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { BuyNow } from '../components/BuyNow';

// Product data with more details
const products = [
    {
      id: 1,
      name: 'Echo Sphere (5th Gen)',
      price: 4499,
      originalPrice: 5999,
      description: 'Smart speaker with Alexa. Crisp vocals and balanced bass for full sound that fills your room.',
      category: 'Electronics',
      rating: 4.7,
      reviews: 25890,
      inStock: true,
      image: 'https://m.media-amazon.com/images/I/41f80Qu98zL._SY450_.jpg',
      features: ['Voice control your music', 'Built-in smart home hub', 'Ask Alexa anything', 'Privacy controls']
    },
    {
      id: 2,
      name: 'Aura Buds Pro',
      price: 7999,
      originalPrice: 10999,
      description: 'True wireless earbuds with Active Noise Cancellation and immersive sound for an enhanced audio experience.',
      category: 'Electronics',
      rating: 4.5,
      reviews: 15234,
      inStock: true,
      image: 'https://m.media-amazon.com/images/I/61MEqB9MfML._SX522_.jpg',
      features: ['Active Noise Cancellation', 'Up to 24 hours battery life', 'Sweat & water resistant', 'Customizable fit']
    },
    {
      id: 3,
      name: 'AromaBrew Coffee Maker',
      price: 2499,
      originalPrice: 3499,
      description: '12-cup programmable coffee maker with a reusable filter and a keep-warm function.',
      category: 'Home & Kitchen',
      rating: 4.6,
      reviews: 8765,
      inStock: true,
      image: 'https://m.media-amazon.com/images/I/31XwXnIUnkL._SX300_SY300_QL70_FMwebp_.jpg',
      features: ['Programmable timer', 'Auto shut-off', 'Brew strength control', 'Easy to clean']
    },
    {
      id: 4,
      name: 'FitTrack Horizon 2',
      price: 3999,
      originalPrice: 4999,
      description: 'Advanced fitness and wellness tracker with heart rate, sleep, and activity monitoring.',
      category: 'Sports & Fitness',
      rating: 4.4,
      reviews: 11342,
      inStock: false,
      image: 'https://m.media-amazon.com/images/I/81RSrpHOiaL._SY355_.jpg',
      features: ['24/7 Heart Rate Tracking', 'Sleep Score Analysis', '15+ Exercise Modes', 'Built-in GPS']
    },
    {
      id: 5,
      name: 'QuickPot 7-in-1 Pressure Cooker',
      price: 8999,
      originalPrice: 11999,
      description: 'Replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, and more.',
      category: 'Home & Kitchen',
      rating: 4.8,
      reviews: 35421,
      inStock: true,
      image: 'https://m.media-amazon.com/images/I/71qc4ccAbBL._SY450_.jpg',
      features: ['7-in-1 functionality', '13 smart programs', 'Stainless steel pot', 'Advanced safety features']
    },
    {
      id: 6,
      name: 'The Alchemist',
      price: 299,
      originalPrice: 450,
      description: 'A classic novel by Paulo Coelho about following your dreams. An international bestseller.',
      category: 'Books',
      rating: 4.7,
      reviews: 95102,
      inStock: true,
      image: 'https://m.media-amazon.com/images/I/617lxveUjYL._SY342_.jpg',
      features: ['Paperback Edition', 'Inspirational allegorical story', 'International bestseller', 'Translated into 80+ languages']
    }
  ];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on search, category, and price
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Cart functions
  const addToCart = (product: typeof products[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckout = () => {
    // In a real app, you would redirect to a checkout page
    alert('Proceeding to checkout!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1 className="text-xl font-bold text-gray-900">SecureShop</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                

              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w- mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-900">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden text-gray-500 hover:text-gray-700"
                >
                  {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              
              <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6`}>
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                  <div className="space-y-2">
                    {['All', ...new Set(products.map(p => p.category))].map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                    <span className="text-sm text-gray-500">Up to ₹{priceRange.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹0</span>
                    <span>₹10,000</span>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange(10000);
                    setSearchQuery('');
                    setSortBy('featured');
                  }}
                  className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </h2>
              <div className="md:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange(10000);
                    setSearchQuery('');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 flex flex-col"
                  >
                    <div className="relative pt-[66.25%] bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {product.originalPrice > product.price && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {product.category}
                        </span>
                      </div>
                      
                      <div className="mt-1 mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs text-gray-500">
                            ({product.reviews.toLocaleString('en-IN')})
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex items-baseline mb-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        
                        <BuyNow
                          amount={product.price}
                          id={product.id.toString()}
                          courseTitle={product.name}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingPage;
