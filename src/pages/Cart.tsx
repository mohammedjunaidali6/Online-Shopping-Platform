import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, getTotalPrice, getTotalItems } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo('.cart-header', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
    
    gsap.fromTo('.cart-content', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="cart-header text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="cart-content">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Cart Items</h2>
                  <Button 
                    variant="outline" 
                    onClick={handleClearCart}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Clear Cart
                  </Button>
                </div>

                {cart.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-48 sm:h-32">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                              <p className="text-muted-foreground text-sm">{item.category}</p>
                              <p className="text-primary font-bold text-xl mt-2">${item.price}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">Quantity:</span>
                              <div className="flex items-center border rounded-lg">
                                <button 
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-secondary transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 border-x min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-secondary transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Subtotal</p>
                              <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal ({getTotalItems()} items)</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full mb-4 hover:scale-105 transition-transform duration-300"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Link to="/shop">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Your cart is empty</h3>
              <p className="text-muted-foreground mb-8">
                Add some products to your cart to see them here
              </p>
              <Link to="/shop">
                <Button size="lg" className="hover:scale-105 transition-transform duration-300">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
