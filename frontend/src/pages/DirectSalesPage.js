import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/Global.css';

// Örnek ürün verileri
const initialProducts = [
    {
        id: 1,
        name: 'Pro Plan Kedi Maması',
        category: 'Mama',
        description: 'Yetişkin kediler için tam besleyici kuru mama',
        price: 450.00,
        stock: 15,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Royal Canin Köpek Maması',
        category: 'Mama',
        description: 'Yetişkin köpekler için özel formül',
        price: 520.00,
        stock: 12,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        name: 'Kedi Kumu (10kg)',
        category: 'Aksesuarlar',
        description: 'Topaklanan bentonit kedi kumu',
        price: 120.00,
        stock: 8,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 4,
        name: 'Köpek Tasması (M)',
        category: 'Aksesuarlar',
        description: 'Dayanıklı, orta boy köpekler için',
        price: 85.00,
        stock: 20,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 5,
        name: 'Köpek Parazit Damlası',
        category: 'İlaç',
        description: 'Dış parazit koruma damlası',
        price: 175.00,
        stock: 25,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 6,
        name: 'Kedi Vitamin Takviyesi',
        category: 'İlaç',
        description: 'Kediler için tüy ve deri sağlığı takviyesi',
        price: 110.00,
        stock: 18,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 7,
        name: 'Kedi Oyuncak Seti',
        category: 'Aksesuar',
        description: '5 parça kedi oyuncak seti',
        price: 65.00,
        stock: 10,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 8,
        name: 'Köpek Yatağı (L)',
        category: 'Aksesuar',
        description: 'Büyük boy köpekler için konforlu yatak',
        price: 220.00,
        stock: 5,
        image: 'https://via.placeholder.com/150'
    }
];

const DirectSalesPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState(initialProducts);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: '',
        paymentMethod: 'nakit'
    });

    // Bildirim ekleme fonksiyonu
    const addStockNotification = (productName, stock) => {
        // LocalStorage'dan mevcut bildirimleri al veya boş array oluştur
        const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');

        // Yeni bildirimi oluştur
        const newNotification = {
            id: Date.now(),
            type: 'stock',
            message: `Düşük stok uyarısı: ${productName} (${stock} adet kaldı)`,
            time: 'Şimdi',
            isRead: false
        };

        // Bildirimleri güncelle ve localStorage'a kaydet
        const updatedNotifications = [newNotification, ...storedNotifications];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

        // NavBar'daki bildirim sayısını güncellemek için event yayınla
        window.dispatchEvent(new CustomEvent('newNotification', { detail: newNotification }));
    };

    // Kategoriye ve arama terimine göre filtrelenmiş ürünler
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sepete ürün ekleme
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            // Eğer ürün zaten sepetteyse, adet artırılır (stok kontrolü ile)
            if (existingItem.quantity < product.stock) {
                setCart(cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ));
            } else {
                alert('Bu ürün için yeterli stok bulunmamaktadır!');
            }
        } else {
            // Sepette yoksa yeni eklenir
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Sepetten ürün çıkarma
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // Ürün adedini değiştirme
    const updateQuantity = (productId, newQuantity) => {
        // Stok kontrolü
        const product = products.find(p => p.id === productId);

        if (newQuantity > product.stock) {
            alert('Bu ürün için yeterli stok bulunmamaktadır!');
            return;
        }

        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    // Sepet toplamını hesaplama
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Siparişi tamamlama
    const completeOrder = (e) => {
        e.preventDefault();

        // Stokları güncelle ve stok kontrol listesi oluştur
        const lowStockItems = [];

        const updatedProducts = products.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem) {
                const newStock = product.stock - cartItem.quantity;

                // Stok 10'un altına düştüyse, düşük stok listesine ekle
                if (newStock < 10 && product.stock >= 10) {
                    lowStockItems.push({
                        name: product.name,
                        stock: newStock
                    });
                }

                return {
                    ...product,
                    stock: newStock
                };
            }
            return product;
        });

        setProducts(updatedProducts);

        // Düşük stok bildirimleri gönder
        lowStockItems.forEach(item => {
            addStockNotification(item.name, item.stock);
        });

        // Sipariş özeti
        const orderSummary = {
            customer: customerInfo,
            items: cart,
            total: calculateTotal(),
            date: new Date().toLocaleString()
        };

        console.log('Sipariş tamamlandı:', orderSummary);

        alert('Satış başarıyla tamamlandı!');

        // Sepeti temizle ve ödeme ekranını kapat
        setCart([]);
        setShowCheckout(false);
        setCustomerInfo({
            name: '',
            phone: '',
            email: '',
            paymentMethod: 'nakit'
        });
    };

    // Form değişikliklerini takip etme
    const handleCustomerInfoChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({
            ...customerInfo,
            [name]: value
        });
    };

    return (
        <>
            <NavBar />
            <div className="direct-sales-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1>Doğrudan Satış</h1>

                {/* Filtre ve Arama */}
                <div className="filters" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div className="categories" style={{ display: 'flex', gap: '10px' }}>
                        {['Tümü', 'Mama', 'İlaç', 'Aksesuar'].map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: selectedCategory === category ? '#3498db' : '#f1f1f1',
                                    color: selectedCategory === category ? 'white' : 'black',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="search" style={{ width: '300px' }}>
                        <input
                            type="text"
                            placeholder="Ürün ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                width: '100%',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                </div>

                <div className="content-wrapper" style={{ display: 'flex', gap: '20px' }}>
                    {/* Ürün Listesi */}
                    <div className="product-list" style={{ flex: 2 }}>
                        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <div key={product.id} className="product-card" style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: 'white'
                                    }}>
                                        <h3 style={{ fontSize: '16px', margin: '0 0 5px', color: '#2c3e50' }}>{product.name}</h3>
                                        <p style={{ color: '#666', margin: '0 0 10px', fontSize: '13px', flexGrow: 1 }}>{product.description}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                                            <div>
                                                <p style={{ fontWeight: 'bold', margin: '0', fontSize: '15px', color: '#27ae60' }}>{product.price.toFixed(2)} ₺</p>
                                                <p style={{ color: product.stock < 5 ? '#e74c3c' : '#2ecc71', margin: '3px 0 0', fontSize: '12px' }}>
                                                    Stok: {product.stock}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                disabled={product.stock === 0}
                                                style={{
                                                    backgroundColor: product.stock === 0 ? '#ccc' : '#3498db',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '6px 10px',
                                                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                {product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Aradığınız kriterlere uygun ürün bulunamadı.</p>
                            )}
                        </div>
                    </div>

                    {/* Sepet */}
                    <div className="cart" style={{
                        flex: 1.5,
                        backgroundColor: '#f9f9f9',
                        padding: '20px',
                        borderRadius: '8px',
                        position: 'sticky',
                        top: '20px',
                        alignSelf: 'flex-start',
                        maxHeight: 'calc(100vh - 100px)',
                        overflowY: 'auto',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        minWidth: '350px'
                    }}>
                        <h2 style={{ margin: '0 0 20px', fontSize: '22px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Sepet</h2>

                        {cart.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '16px', margin: '20px 0' }}>Sepetiniz boş.</p>
                        ) : (
                            <>
                                <div className="cart-items" style={{ marginBottom: '20px' }}>
                                    {cart.map(item => (
                                        <div key={item.id} className="cart-item" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '12px 0',
                                            borderBottom: '1px solid #eee',
                                            fontSize: '16px'
                                        }}>
                                            <div style={{ flex: '3' }}>
                                                <p style={{ margin: '0', fontWeight: 'bold', fontSize: '16px' }}>{item.name}</p>
                                                <p style={{ margin: '5px 0 0', color: '#27ae60', fontSize: '15px', fontWeight: 'bold' }}>{item.price.toFixed(2)} ₺</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '2', justifyContent: 'center' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{
                                                        border: 'none',
                                                        backgroundColor: '#e74c3c',
                                                        color: 'white',
                                                        width: '24px',
                                                        height: '24px',
                                                        borderRadius: '50%',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '0'
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{
                                                        border: 'none',
                                                        backgroundColor: '#2ecc71',
                                                        color: 'white',
                                                        width: '24px',
                                                        height: '24px',
                                                        borderRadius: '50%',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '0'
                                                    }}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    style={{
                                                        border: 'none',
                                                        backgroundColor: 'transparent',
                                                        color: '#e74c3c',
                                                        cursor: 'pointer',
                                                        fontSize: '18px',
                                                        marginLeft: '5px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '0',
                                                        width: '24px',
                                                        height: '24px'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div style={{ marginLeft: '10px', flex: '2', textAlign: 'right' }}>
                                                <p style={{ margin: '0', fontWeight: 'bold', color: '#2c3e50', fontSize: '16px' }}>{(item.price * item.quantity).toFixed(2)} ₺</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-total" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    padding: '15px',
                                    backgroundColor: '#eef8ff',
                                    borderRadius: '6px',
                                    marginBottom: '15px',
                                    color: '#2c3e50'
                                }}>
                                    <span>Toplam:</span>
                                    <span>{calculateTotal().toFixed(2)} ₺</span>
                                </div>

                                <button
                                    onClick={() => setShowCheckout(true)}
                                    style={{
                                        backgroundColor: '#2ecc71',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '12px',
                                        width: '100%',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 4px rgba(46, 204, 113, 0.3)'
                                    }}
                                >
                                    Satışı Tamamla
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Ödeme Modal */}
            {showCheckout && (
                <div className="checkout-modal" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        width: '100%',
                        maxWidth: '500px'
                    }}>
                        <h2 style={{ marginTop: 0 }}>Satış Bilgileri</h2>

                        <form onSubmit={completeOrder}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Müşteri Adı Soyadı</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleCustomerInfoChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Telefon</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={handleCustomerInfoChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>E-posta (İsteğe Bağlı)</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={customerInfo.email}
                                    onChange={handleCustomerInfoChange}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label htmlFor="paymentMethod" style={{ display: 'block', marginBottom: '5px' }}>Ödeme Yöntemi</label>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={customerInfo.paymentMethod}
                                    onChange={handleCustomerInfoChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    <option value="nakit">Nakit</option>
                                    <option value="kredi_karti">Kredi Kartı</option>
                                    <option value="havale">Havale/EFT</option>
                                </select>
                            </div>

                            <div className="order-summary" style={{
                                backgroundColor: '#f9f9f9',
                                padding: '15px',
                                borderRadius: '4px',
                                marginBottom: '20px'
                            }}>
                                <h3 style={{ margin: '0 0 10px' }}>Sipariş Özeti</h3>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>{(item.price * item.quantity).toFixed(2)} ₺</span>
                                    </div>
                                ))}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                    borderTop: '1px solid #ddd',
                                    paddingTop: '10px'
                                }}>
                                    <span>Toplam:</span>
                                    <span>{calculateTotal().toFixed(2)} ₺</span>
                                </div>
                            </div>

                            <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowCheckout(false)}
                                    style={{
                                        backgroundColor: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#2ecc71',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    Tamamla
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DirectSalesPage; 