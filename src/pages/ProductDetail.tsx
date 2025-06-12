
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToFavorites, removeFromFavorites, isFavorite, addToCart } = useApp();
  const { toast } = useToast();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.product-image', 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo('.product-info', 
      { x: 100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.6'
    )
    .fromTo('.product-actions', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
      '-=0.3'
    );
  }, []);

  // Mock product data - in real app, fetch based on id
  const productData = {
    id: parseInt(id || '1'),
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop"
    ],
    category: "Electronics",
    rating: 4.8,
    reviews: 124,
    description: "Experience premium audio quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather ear cups",
      "Bluetooth 5.0 connectivity",
      "Quick charge technology",
      "Multi-device pairing"
    ],
    inStock: true
  };

  // Create product object with image property for context functions
  const product = {
    ...productData,
    image: productData.images[0] // Use first image as the main image
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isProductFavorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites`,
      });
    } else {
      addToFavorites(product);
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites`,
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="product-image">
            <div className="sticky top-24">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={productData.images[currentImageIndex]} 
                    alt={product.name}
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                </CardContent>
              </Card>
              
              {/* Image Thumbnails */}
              <div className="flex gap-4 mt-4">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info space-y-6">
            <div>
              <span className="text-primary text-sm font-medium">{product.category}</span>
              <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${i < Math.floor(productData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {productData.rating} ({productData.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {productData.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${productData.originalPrice}
                </span>
              )}
              {productData.originalPrice && (
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm">
                  Save ${productData.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {productData.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="product-actions space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 hover:scale-105 transition-all duration-300"
                  disabled={!productData.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {productData.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="hover:scale-110 transition-transform duration-300"
                  onClick={handleFavoriteClick}
                >
                  <Heart className={`h-5 w-5 ${isProductFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="lg" variant="outline" className="hover:scale-110 transition-transform duration-300">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Stock Status */}
              <p className={`text-sm ${productData.inStock ? 'text-green-600' : 'text-destructive'}`}>
                {productData.inStock ? '✓ In Stock - Ships within 24 hours' : '✗ Currently out of stock'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
