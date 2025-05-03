import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginPage.css';
import veterinerImage from '../assets/images/veteriner.png';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Temporarily define base64 fallbacks until we fix the proper imports
const petOwnerImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
const vetImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('vet');
  const [vetUsername, setVetUsername] = useState('');
  const [vetPassword, setVetPassword] = useState('');
  const [vetLoginType, setVetLoginType] = useState('tc');
  const [chipNumber, setChipNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [vetImageLoaded, setVetImageLoaded] = useState(false);
  
  const { login, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // location.state'den önceki sayfayı al, yoksa dashboard'a yönlendir
  const from = location.state?.from?.pathname || '/dashboard';

  // Eğer kullanıcı zaten giriş yapmışsa, önceki sayfaya veya dashboard'a yönlendir
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Veteriner görselinin yüklenip yüklenemediğini kontrol edelim
  useEffect(() => {
    const vetImg = new Image();
    
    vetImg.onload = () => setVetImageLoaded(true);
    vetImg.onerror = () => setVetImageLoaded(false);
    
    vetImg.src = veterinerImage;
  }, []);

  // Klavye kısayolları için event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        if (e.key === '1') setActiveTab('vet');
        if (e.key === '2') setActiveTab('petOwner');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const validateTCKimlik = (tcKimlikNo) => {
    // TC Kimlik Numarası doğrulama
    if (tcKimlikNo.length !== 11) return false;
    if (!/^\d+$/.test(tcKimlikNo)) return false;
    if (tcKimlikNo[0] === '0') return false;

    return true;
  };

  const validateChipNumber = (chipNo) => {
    // Çip numarası doğrulama (15 haneli sayısal değer)
    if (chipNo.length !== 15) return false;
    if (!/^\d+$/.test(chipNo)) return false;

    return true;
  };

  const handleVetLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    // TC Kimlik No doğrulama
    if (vetLoginType === 'tc' && !validateTCKimlik(vetUsername)) {
      setLoginError('Geçerli bir T.C. Kimlik Numarası giriniz.');
      setIsLoading(false);
      return;
    }

    try {
      // AuthContext'teki login fonksiyonunu kullan
      const credentials = {
        username: vetUsername,
        password: vetPassword,
        rememberMe: rememberMe
      };

      const result = await login(credentials, vetLoginType);
      
      if (result.success) {
        setLoginSuccess(true);
        setTimeout(() => {
          // Başarılı girişten sonra, geldiği sayfaya yönlendir
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setLoginError(result.error || 'Giriş başarısız oldu. Kullanıcı adı veya şifre hatalı.');
      }
    } catch (error) {
      setLoginError('Giriş sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePetOwnerLookup = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    // Çip numarası doğrulama
    if (!validateChipNumber(chipNumber)) {
      setLoginError('Geçerli bir çip numarası giriniz (15 haneli sayısal değer).');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/animals/chip/${chipNumber}`);
      setIsLoading(false);
      
      if (response.data) {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate(`/animals/${chipNumber}`, { replace: true });
        }, 1500);
      } else {
        setLoginError('Hayvan bulunamadı. Lütfen çip numarasını kontrol ediniz.');
      }
    } catch (error) {
      setIsLoading(false);
      setLoginError('Sorgu sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const formatChipNumber = (value) => {
    // Sadece sayısal değerlere izin ver ve maksimum 15 karakter olsun
    const formattedValue = value.replace(/\D/g, '').substring(0, 15);
    // Her 5 karakterde bir boşluk ekle (okunabilirlik için)
    return formattedValue.replace(/(\d{5})(?=\d)/g, '$1 ');
  };

  const handleChipNumberChange = (e) => {
    const formattedValue = formatChipNumber(e.target.value);
    setChipNumber(formattedValue.replace(/\s/g, '')); // Boşlukları kaldırarak kaydet
  };

  // Başarılı login sonrası gösterilecek içerik
  if (loginSuccess) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2 style={{color: '#333', fontSize: '32px', marginBottom: '15px'}}>İşlem Başarılı!</h2>
            <p style={{color: '#555', fontSize: '18px', marginBottom: '20px'}}>{activeTab === 'vet' ? 'Veteriner hekim girişiniz yapıldı.' : 'Hayvan bilgileri sorgulanıyor.'}</p>
            <p className="small-text" style={{color: '#888'}}>Ana sayfaya yönlendiriliyorsunuz...</p>
            <p style={{color: '#555', fontSize: '16px', marginBottom: '0'}}>
              Giriş yapılan rol: <strong>{currentUser?.role || 'Bilinmiyor'}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Hayvan Sağlık Sistemi</h1>
          <p>Hoş geldiniz! Lütfen giriş yapın veya hayvan sorgulayın.</p>
        </div>

        <div className="login-tabs">
          <button 
            className={`tab-btn ${activeTab === 'vet' ? 'active' : ''}`}
            onClick={() => setActiveTab('vet')}
          >
            Veteriner Hekim Girişi
            <span className="keyboard-shortcut">Alt+1</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'petOwner' ? 'active' : ''}`}
            onClick={() => setActiveTab('petOwner')}
          >
            <i className="tab-icon pet-icon">🐾</i>
            Hayvan Sorgulama
            <span className="keyboard-shortcut">Alt+2</span>
          </button>
        </div>

        <div className="login-content">
          {activeTab === 'vet' ? (
            <div className="login-form-container">
              <div className="login-image-container">
                <img 
                  src={vetImageLoaded ? veterinerImage : vetImageBase64} 
                  alt="Veteriner Hekim" 
                  className="login-image" 
                />
                <div className="image-overlay">
                  <div className="overlay-text">
                    <h3>Veteriner Portalı</h3>
                    <p>Hastalarınızın kayıtlarına hızlıca erişin, tedavi planları oluşturun ve randevuları yönetin.</p>
                  </div>
                </div>
              </div>
              <div className="login-form">
                <h2>Veteriner Hekim Girişi</h2>
                <form onSubmit={handleVetLogin}>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="loginType" 
                        value="tc" 
                        checked={vetLoginType === 'tc'} 
                        onChange={() => setVetLoginType('tc')}
                      />
                      <span className="radio-text">T.C. Kimlik No ile Giriş</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="loginType" 
                        value="username" 
                        checked={vetLoginType === 'username'} 
                        onChange={() => setVetLoginType('username')}
                      />
                      <span className="radio-text">Kullanıcı Adı ile Giriş</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>{vetLoginType === 'tc' ? 'T.C. Kimlik No' : 'Kullanıcı Adı'}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder={vetLoginType === 'tc' ? 'T.C. Kimlik No Giriniz' : 'Kullanıcı Adı Giriniz'} 
                      value={vetUsername}
                      onChange={(e) => setVetUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Parola</label>
                    <div className="password-input-container">
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Parolanızı Giriniz" 
                        value={vetPassword}
                        onChange={(e) => setVetPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {loginError && <div className="error-message">{loginError}</div>}

                  <div className="form-group remember-me">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      /> 
                      <span>Beni Hatırla</span>
                    </label>
                    <a href="#forgot-password" className="forgot-password">Parolamı Unuttum</a>
                  </div>

                  <button 
                    type="submit" 
                    className={`login-btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner">
                        <span className="spinner-dot"></span>
                        <span className="spinner-dot"></span>
                        <span className="spinner-dot"></span>
                      </span>
                    ) : 'Giriş Yap'}
                  </button>
                </form>

                <div className="help-section">
                  <p>Kayıt olmak için Veteriner Odanıza başvurunuz.</p>
                  <a href="#help" className="help-link">Yardıma ihtiyacım var</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="login-form-container">
              <div className="login-image-container" style={{background: 'linear-gradient(135deg, #43cea2, #185a9d)'}}>
                <div style={{
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  textAlign: 'center', 
                  padding: '20px', 
                  color: 'white'
                }}>
                  <div style={{fontSize: '72px', marginBottom: '20px'}}>🐾</div>
                  <h3 style={{fontSize: '28px', marginBottom: '15px', textShadow: '1px 1px 3px rgba(0,0,0,0.3)'}}>Hayvan Sahipleri için</h3>
                  <p style={{fontSize: '16px', lineHeight: '1.6'}}>Evcil hayvanınızın sağlık bilgilerine, aşı takvimine ve tedavi geçmişine kolayca erişin.</p>
                </div>
              </div>
              <div className="login-form">
                <h2>Hayvan Sorgulama</h2>
                <p>Hayvanınızın çip numarasını girerek sağlık durumunu ve kayıtlarını görüntüleyebilirsiniz.</p>
                <form onSubmit={handlePetOwnerLookup}>
                  <div className="form-group">
                    <label>Hayvan Çip Numarası</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="15 Haneli Çip Numarasını Giriniz" 
                      value={formatChipNumber(chipNumber)}
                      onChange={handleChipNumberChange}
                      required
                    />
                    <small className="form-text">Örnek: 90037 00054 67890</small>
                  </div>

                  {loginError && <div className="error-message">{loginError}</div>}

                  <button 
                    type="submit" 
                    className={`login-btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner">
                        <span className="spinner-dot"></span>
                        <span className="spinner-dot"></span>
                        <span className="spinner-dot"></span>
                      </span>
                    ) : 'Sorgula'}
                  </button>
                </form>
                <div className="info-box">
                  <h3>Çip Numarası Nedir?</h3>
                  <p>Çip numarası, hayvanınıza yerleştirilen mikroçipte bulunan 15 haneli bir tanımlayıcı numaradır. Bu numara ile hayvanınızın tüm sağlık kayıtlarına erişebilirsiniz.</p>
                  <p>Eğer çip numarasını bilmiyorsanız, lütfen veteriner hekiminize başvurun.</p>
                </div>

                <div className="qr-option">
                  <p>Çip numaranızı bilmiyor musunuz?</p>
                  <button className="secondary-btn">
                    <i className="qr-icon">📱</i>
                    QR Kod ile Sorgula
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="login-footer">
          <p>© {new Date().getFullYear()} Hayvan Sağlık Sistemi. Tüm hakları saklıdır.</p>
          <div className="footer-links">
            <a href="#terms">Kullanım Şartları</a>
            <a href="#privacy">Gizlilik Politikası</a>
            <a href="#contact">İletişim</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 