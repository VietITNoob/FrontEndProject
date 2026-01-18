import { useEffect } from 'react';
import './Wishlist.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = async (item: any) => {

    const product = {
      id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      description: item.description,
      categoryId: item.category || '',
      discount: 0,
      sold: 0,
      createdAt: item.dateAdded
    };
    
    await addToCart(product);
  };

  const formatVND = (price: number) => price.toLocaleString('vi-VN') + 'đ';

  return (
    <div className="wishlist-container">
      <Header />

      <section className="wishlist-header">
        <div className="container">
          <h1 className="wishlist-title">
            <Heart size={28} className="wishlist-icon" />
            Danh sách yêu thích của bạn
          </h1>
          <p className="wishlist-subtitle">
            {wishlistItems.length > 0 
              ? `Bạn có ${wishlistItems.length} sản phẩm trong danh sách yêu thích`
              : 'Danh sách yêu thích của bạn đang trống'
            }
          </p>
        </div>
      </section>

      <section className="wishlist-body">
        <div className="container">
          {wishlistItems.length > 0 ? (
            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <div className="wishlist-item-image">
                    <img src={item.image} alt={item.title} />
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Xóa khỏi danh sách yêu thích"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="wishlist-item-details">
                    <h3 className="wishlist-item-title">{item.title}</h3>
                    <p className="wishlist-item-description">
                      {item.description?.substring(0, 100)}...
                    </p>
                    <div className="wishlist-item-price">{formatVND(item.price)}</div>
                    
                    <div className="wishlist-item-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingBag size={16} />
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-wishlist">
              <Heart size={64} className="empty-icon" />
              <h2>Danh sách yêu thích của bạn đang trống</h2>
              <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và thêm vào danh sách yêu thích nhé!</p>
              <Link to="/" className="btn-primary">
                Tiếp tục mua sắm
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WishlistPage;
