# Hayvan Sağlık Yönetim Sistemi

Veterinerler, hayvan sahipleri ve sağlık personeli için kapsamlı bir hayvan sağlık yönetim sistemi. Bu proje, veteriner kliniklerinde hayvan sağlık kayıtlarının etkin yönetimini, laboratuvar testlerinin takibini, reçete oluşturmayı ve hastalık geçmişi izlemeyi sağlar.

![Hayvan Sağlık Sistemi](https://via.placeholder.com/800x400?text=Hayvan+Sa%C4%9Fl%C4%B1k+Y%C3%B6netim+Sistemi)

## 🌟 Özellikler

- **Hayvan Kayıtları**: Detaylı hayvan profilleri ve sağlık kayıtları
- **Hasta Takibi**: Klinik incelemeleri ve tedavi planları
- **Sağlık Geçmişi**: Kapsamlı hastalık ve tedavi geçmişi
- **Laboratuvar Testleri**: Test sonuçlarının kaydı ve takibi
- **Reçete Yönetimi**: Dijital reçete oluşturma ve arşivleme
- **Randevu Sistemi**: Randevu oluşturma ve hatırlatmalar
- **Bildirimler**: Aşı zamanı, kontrol ve takip bildirimleri
- **İstatistikler ve Raporlar**: Detaylı veri analizi ve raporlama
- **Veteriner/Hayvan Sahibi Arayüzleri**: Farklı kullanıcı tipleri için özelleştirilmiş erişim
- **Mobil Erişim**: Mobil uygulama ile her yerden erişim

## 🔧 Proje Yapısı

Proje üç ana bileşenden oluşmaktadır:

- **Backend**: Spring Boot tabanlı REST API
- **Frontend**: React tabanlı web arayüzü
- **Mobil**: Flutter ile geliştirilmiş mobil uygulama

## 🚀 Kurulum ve Çalıştırma

### Önkoşullar

- Java 17+
- Node.js 16+
- Docker ve Docker Compose
- Flutter SDK (mobil geliştirme için)
- MSSQL Server (veya Docker üzerinde MSSQL)

### Veritabanı Kurulumu

```bash
# Docker ile MSSQL Server ve veritabanı başlatma
docker-compose up -d mssql adminer
```

Adminer veritabanı yönetim arayüzüne `http://localhost:8081` adresinden erişebilirsiniz.

### Backend Kurulumu

```bash
# Docker ile backend servisini başlatma
docker-compose up -d backend

# Veya manuel olarak çalıştırmak için
cd backend
./mvnw spring-boot:run
```

Backend API `http://localhost:8080` adresinde çalışacaktır.

### Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend uygulaması `http://localhost:3000` adresinde çalışacaktır.

### Mobil Uygulama Kurulumu

```bash
cd mobil/hayvan_sagligi_app
flutter pub get
flutter run
```

## 📊 API Dokümantasyonu

API endpoints ve kullanımı ile ilgili Postman koleksiyonu projede mevcuttur: `HayvanSagligi-Postman.json`

### Temel API Endpointleri

#### Hayvan API

```
GET    /api/hayvanlar                # Tüm hayvanları listele
GET    /api/hayvanlar/{id}           # ID'ye göre hayvan getir
GET    /api/hayvanlar/sahip/{sahipId} # Sahibin hayvanlarını getir
GET    /api/hayvanlar/ara?ad={ad}    # Ada göre hayvan ara
GET    /api/hayvanlar/tur/{turId}    # Türe göre hayvanları getir
GET    /api/hayvanlar/irk/{irkId}    # Irka göre hayvanları getir
GET    /api/hayvanlar/mikrocip/{mikrocipNo} # Mikroçip numarasına göre hayvan getir
POST   /api/hayvanlar                # Yeni hayvan oluştur
PUT    /api/hayvanlar/{id}           # Hayvanı güncelle
DELETE /api/hayvanlar/{id}           # Hayvanı sil
```

#### Sahip API

```
GET    /api/sahip                    # Tüm sahipleri listele
GET    /api/sahip/{id}               # ID'ye göre sahip getir
GET    /api/sahip/search?ad={ad}&soyad={soyad}&telefon={telefon} # Sahip ara
POST   /api/sahip                    # Yeni sahip oluştur
PUT    /api/sahip/{id}               # Sahibi güncelle
DELETE /api/sahip/{id}               # Sahibi sil
```

#### Klinik İnceleme API

```
GET    /api/klinik-incelemeler       # Tüm klinik incelemeleri listele
GET    /api/klinik-incelemeler/{id}  # ID'ye göre klinik inceleme getir
GET    /api/klinik-incelemeler/randevu/{randevuId} # Randevuya göre klinik inceleme getir
POST   /api/klinik-incelemeler       # Yeni klinik inceleme oluştur
PUT    /api/klinik-incelemeler/{id}  # Klinik incelemeyi güncelle
DELETE /api/klinik-incelemeler/{id}  # Klinik incelemeyi sil
```

#### Randevu API

```
GET    /api/randevular               # Tüm randevuları listele
GET    /api/randevular/{id}          # ID'ye göre randevu getir
GET    /api/randevular/hayvan/{hayvanId} # Hayvana göre randevuları getir
POST   /api/randevular               # Yeni randevu oluştur
PUT    /api/randevular/{id}          # Randevuyu güncelle
DELETE /api/randevular/{id}          # Randevuyu sil
```

#### Laboratuvar Testleri API

```
GET    /api/lab-testleri/hayvan/{hayvanId} # Hayvana göre testleri getir
GET    /api/lab-testleri/{id}        # ID'ye göre test getir
GET    /api/lab-testleri/hayvan/{hayvanId}/tarih?baslangic={baslangic}&bitis={bitis} # Tarih aralığına göre testleri getir
GET    /api/lab-testleri/test-adi?testAdi={testAdi} # Test adına göre arama yap
POST   /api/lab-testleri             # Yeni test kaydet
```

#### Reçete API

```
GET    /api/receteler                # Tüm reçeteleri listele
GET    /api/receteler/{id}           # ID'ye göre reçete getir
GET    /api/receteler/hayvan/{hayvanId} # Hayvana göre reçeteleri getir
GET    /api/receteler/doz/{doz}      # Doza göre reçeteleri getir
POST   /api/receteler                # Yeni reçete oluştur
PUT    /api/receteler/{id}           # Reçeteyi güncelle
DELETE /api/receteler/{id}           # Reçeteyi sil
```

#### Aşı API

```
GET    /api/asilar                   # Tüm aşıları listele
GET    /api/asilar/{id}              # ID'ye göre aşı getir
GET    /api/asilar/hayvan/{hayvanId} # Hayvana göre aşıları getir
GET    /api/asilar/sonraki-uygulama-tarihi?baslangicTarihi={baslangic}&bitisTarihi={bitis} # Sonraki uygulama tarihine göre aşıları getir
GET    /api/asilar/due               # Zamanı gelmiş aşıları getir
POST   /api/asilar                   # Yeni aşı oluştur
```

### Örnek Veri Yapıları

#### Hayvan JSON Örneği

```json
{
  "id": 1,
  "sahipId": 1,
  "sahipAdSoyad": "Ahmet Yılmaz",
  "ad": "Max",
  "turId": 1,
  "turAd": "Köpek",
  "irkId": 1,
  "irkAd": "Golden Retriever", 
  "cinsiyet": "Erkek",
  "dogumTarihi": "2020-05-10",
  "kilo": 32.5,
  "renk": "Sarı",
  "mikrocipNo": "123456789012345",
  "alerjiler": "Tavuk proteini",
  "kronikHastaliklar": "Kronik böbrek yetmezliği"
}
```

#### Sahip JSON Örneği

```json
{
  "id": 1,
  "ad": "Ahmet",
  "soyad": "Yılmaz",
  "telefon1": "05551234567",
  "telefon2": "",
  "eposta": "ahmet@email.com",
  "adres": "Atatürk Mah. Gül Sok. No:12 D:5 Kadıköy/İstanbul",
  "tercihEdilenIletisim": "Telefon",
  "hayvanSayisi": 1
}
```

#### Klinik İnceleme JSON Örneği

```json
{
  "id": 1,
  "hayvanId": 1,
  "hayvanAd": "Max",
  "tarih": "2023-08-15",
  "veterinerId": 1,
  "veterinerAdSoyad": "Mehmet Yılmaz",
  "anamnez": "3 gündür devam eden iştahsızlık ve halsizlik şikayeti ile getirildi.",
  "sikayetler": "İştahsızlık, halsizlik, kusma",
  "bulgular": "Dehidratasyon, abdominal hassasiyet, 39.2°C ateş",
  "birincilTani": "Akut gastroenterit",
  "ikincilTani": "Dehidratasyon",
  "yapilanIslemler": "IV sıvı tedavisi, antiemetik, antibiyotik"
}
```

#### Randevu JSON Örneği

```json
{
  "id": 1,
  "hayvanId": 1,
  "hayvanAd": "Max",
  "sahipId": 1,
  "sahipAdSoyad": "Ahmet Yılmaz",
  "tarih": "2023-08-15T10:00:00",
  "randevuTipi": "Kontrol",
  "notlar": "Kontrol randevusu",
  "veterinerId": 1,
  "veterinerAdSoyad": "Mehmet Yılmaz",
  "durum": "Tamamlandı",
  "olusturulmaTarihi": "2023-08-10T14:30:00"
}
```

#### Laboratuvar Testi JSON Örneği

```json
{
  "id": 1,
  "hayvanId": 1,
  "tarih": "2023-08-15",
  "testAdi": "Tam Kan Sayımı",
  "sonuclar": "Normal sınırlar içinde",
  "referansAralik": "Normal",
  "yorumlar": "Herhangi bir anormallik gözlenmedi"
}
```

## 🛠 Teknolojiler

### Backend
- Java 17
- Spring Boot 3.1
- Spring Security ve JWT Kimlik Doğrulama
- Spring Data JPA
- Microsoft SQL Server

### Frontend
- React 19
- React Router
- Axios
- Bootstrap 5
- Leaflet/MapBox (harita görselleştirme)

### Mobil
- Flutter
- Provider (Durum Yönetimi)
- Dio (HTTP İstekleri)
- Flutter Secure Storage
- Shared Preferences

### DevOps ve Deployment
- Docker ve Docker Compose
- Maven (Backend Build)
- NPM (Frontend Build)

## 📝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik: Muhteşem özellik'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 📞 İletişim

Proje Yöneticisi - [@sevketugurel](https://github.com/sevketugurel) - ugurelsevket@gmail.com

Proje Linki: [https://github.com/sevketugurel/hayvan-sagligi-sistemi-hackathon](https://github.com/sevketugurel/hayvan-sagligi-sistemi-hackathon) 