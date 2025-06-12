
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite, addToCart } = useApp();
  const { toast } = useToast();
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
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
            {product.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className="bg-background/80 hover:bg-background hover:scale-110 transition-all duration-300"
          >
            <Heart 
              className={`h-4 w-4 ${isProductFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
            />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-primary mb-4">
          ${product.price}
        </p>
        
        <div className="flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button 
            size="icon" 
            className="hover:scale-110 transition-transform duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
