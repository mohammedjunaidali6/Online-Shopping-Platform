
import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Favorites = () => {
  const { favorites } = useApp();

  useEffect(() => {
    gsap.fromTo('.favorites-header', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
    
    gsap.fromTo('.favorites-grid', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="favorites-header text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary fill-current" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Favorites
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your curated collection of favorite products
          </p>
        </div>

        {/* Favorites Grid */}
        <div className="favorites-grid">
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((product, index) => (
                <div 
                  key={product.id}
                  className="favorite-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">No favorites yet</h3>
              <p className="text-muted-foreground mb-8">
                Start adding products to your favorites to see them here
              </p>
              <Link to="/shop">
                <Button size="lg" className="hover:scale-105 transition-transform duration-300">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
