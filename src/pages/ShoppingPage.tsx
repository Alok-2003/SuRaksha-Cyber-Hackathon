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
    name: 'Premium Security Suite',
    price: 2999,
    originalPrice: 3999,
    description: 'Advanced protection for all your devices with real-time threat detection and removal.',
    category: 'Security',
    rating: 4.8,
    reviews: 1245,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Security+Suite',
    features: ['Real-time protection', 'Multi-device support', 'Phishing protection', 'Parental controls']
  },
  {
    id: 2,
    name: 'VPN Subscription',
    price: 999,
    originalPrice: 1499,
    description: 'Secure and private internet access with high-speed servers across 50+ countries.',
    category: 'Privacy',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=VPN',
    features: ['Unlimited bandwidth', 'No-logs policy', '50+ locations', 'P2P support']
  },
  {
    id: 3,
    name: 'Password Manager',
    price: 499,
    originalPrice: 799,
    description: 'Store and manage all your passwords securely with military-grade encryption.',
    category: 'Security',
    rating: 4.7,
    reviews: 1567,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Password+Manager',
    features: ['Unlimited passwords', 'Auto-fill', 'Password generator', 'Secure sharing']
  },
  {
    id: 4,
    name: 'Data Backup Plan',
    price: 799,
    originalPrice: 999,
    description: 'Automated cloud backup solution for all your important files and documents.',
    category: 'Storage',
    rating: 4.5,
    reviews: 754,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/ec4899/ffffff?text=Backup',
    features: ['1TB Storage', 'Automatic backup', 'File versioning', 'Cross-platform']
  },
  {
    id: 5,
    name: 'Firewall Protection',
    price: 1499,
    originalPrice: 1999,
    description: 'Advanced network security to protect against unauthorized access.',
    category: 'Security',
    rating: 4.6,
    reviews: 432,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Firewall',
    features: ['Network monitoring', 'Intrusion prevention', 'Custom rules', 'Application control']
  },
  {
    id: 6,
    name: 'Parental Control',
    price: 699,
    originalPrice: 899,
    description: 'Keep your children safe online with comprehensive parental controls.',
    category: 'Family',
    rating: 4.4,
    reviews: 321,
    inStock: true,
    image: 'https://via.placeholder.com/300x200/14b8a6/ffffff?text=Parental+Control',
    features: ['Content filtering', 'Screen time limits', 'Location tracking', 'Activity reports']
  },

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                
                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Your Cart ({getCartCount()} items)</h3>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {cart.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                          <p>Your cart is empty</p>
                        </div>
                      ) : (
                        <>
                          {cart.map(item => (
                            <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                              <div className="flex items-center">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="ml-3 flex-1">
                                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                                  <p className="text-sm font-medium text-gray-900 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                                  <div className="flex items-center mt-1">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(item.id);
                                      }}
                                      className="text-gray-400 hover:text-red-500 p-1"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="mx-2 text-sm text-gray-600">{item.quantity}</span>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(products.find(p => p.id === item.id)!);
                                      }}
                                      className="text-gray-400 hover:text-green-500 p-1"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCart(cart.filter(cartItem => cartItem.id !== item.id));
                                  }}
                                  className="text-gray-400 hover:text-red-500 p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between mb-4">
                              <span className="font-medium">Subtotal</span>
                              <span className="font-medium">₹{getCartTotal().toLocaleString('en-IN')}</span>
                            </div>
                            <button
                              onClick={handleCheckout}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <div className="relative pt-[56.25%] bg-gray-100">
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
                        
                        <button
                          onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                          className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {expandedProduct === product.id ? 'Show less' : 'View details'}
                        </button>
                        
                        {expandedProduct === product.id && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {product.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
