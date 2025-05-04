import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/buyukbas_kupe.dart';
import '../services/service_provider.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class BuyukbasKupeScreen extends StatefulWidget {
  const BuyukbasKupeScreen({super.key});

  @override
  State<BuyukbasKupeScreen> createState() => _BuyukbasKupeScreenState();
}

class _BuyukbasKupeScreenState extends State<BuyukbasKupeScreen> with SingleTickerProviderStateMixin {
  final _apiService = ServiceProvider().apiService;
  late TabController _tabController;
  
  // Durum değişkenleri
  bool _isLoading = true;
  bool _isSubmitting = false;
  bool _isLoadingLocation = false;
  String _errorMessage = '';
  
  // Küpe listeleri
  List<BuyukbasKupe> _bekleyenIslemler = [];
  List<BuyukbasKupe> _tamamlananIslemler = [];
  List<BuyukbasKupe> _esynchIslemleri = [];
  
  // Formlar için controller'lar
  final _formKey = GlobalKey<FormState>();
  final _kupeNoController = TextEditingController();
  final _hayvanIrkiController = TextEditingController();
  final _sahipAdSoyadController = TextEditingController();
  final _sahipTcNoController = TextEditingController();
  final _adresController = TextEditingController();
  final _ilceController = TextEditingController();
  final _ilController = TextEditingController();
  final _notlarController = TextEditingController();
  final _enlemController = TextEditingController();
  final _boylamController = TextEditingController();
  
  // Seçim değişkenleri
  String _selectedHayvanTuru = 'Sığır';
  String _selectedCinsiyet = 'Erkek';
  DateTime _selectedDogumTarihi = DateTime.now().subtract(const Duration(days: 30));
  final List<String> _hayvanTurleri = ['Sığır', 'Koyun', 'Keçi'];
  final List<String> _cinsiyetler = ['Erkek', 'Dişi'];
  
  // Konum ve fotoğraf değişkenleri
  String _currentLocation = '';
  List<String> _selectedPhotos = [];
  
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _fetchData();
  }
  
  @override
  void dispose() {
    _tabController.dispose();
    _kupeNoController.dispose();
    _hayvanIrkiController.dispose();
    _sahipAdSoyadController.dispose();
    _sahipTcNoController.dispose();
    _adresController.dispose();
    _ilceController.dispose();
    _ilController.dispose();
    _notlarController.dispose();
    _enlemController.dispose();
    _boylamController.dispose();
    super.dispose();
  }

  // Verileri yükleme fonksiyonu
  Future<void> _fetchData() async {
    try {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });

      // Mock veri yükle - gerçek API entegrasyonunda burası değişecek
      _loadMockData();

      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Veriler alınamadı: $e';
        _isLoading = false;
      });
    }
  }
  
  // Mock veri oluşturma
  void _loadMockData() {
    // Bekleyen işlemler
    _bekleyenIslemler = [
      BuyukbasKupe(
        id: 1,
        kupeNo: 'TR4256789123',
        hayvanTuru: 'Sığır',
        hayvanIrki: 'Holstein',
        cinsiyet: 'Dişi',
        dogumTarihi: '01/03/2023',
        islemTarihi: '05/05/2023',
        sahipAdSoyad: 'Ahmet Çiftçi',
        sahipTcNo: '12345678901',
        adres: 'Yeşilova Köyü No:14',
        ilce: 'Odunpazarı',
        il: 'Eskişehir',
        islemDurumu: 'Bekliyor',
        koordinat: '39.768002,30.505233',
        fotograflar: ['assets/images/cattle1.jpg'],
        esync: false,
      ),
      BuyukbasKupe(
        id: 2,
        kupeNo: 'TR4256789124',
        hayvanTuru: 'Koyun',
        hayvanIrki: 'Merinos',
        cinsiyet: 'Erkek',
        dogumTarihi: '15/02/2023',
        islemTarihi: '06/05/2023',
        sahipAdSoyad: 'Mehmet Yılmaz',
        sahipTcNo: '23456789012',
        adres: 'Çamlık Köyü No:5',
        ilce: 'Tepebaşı',
        il: 'Eskişehir',
        islemDurumu: 'Bekliyor',
        koordinat: '39.778002,30.515233',
        fotograflar: ['assets/images/sheep1.jpg'],
        esync: false,
      ),
    ];
    
    // Tamamlanan işlemler
    _tamamlananIslemler = [
      BuyukbasKupe(
        id: 3,
        kupeNo: 'TR4256789125',
        hayvanTuru: 'Sığır',
        hayvanIrki: 'Simental',
        cinsiyet: 'Erkek',
        dogumTarihi: '10/01/2023',
        islemTarihi: '01/05/2023',
        sahipAdSoyad: 'Ali Demir',
        sahipTcNo: '34567890123',
        adres: 'Yenidoğan Köyü No:22',
        ilce: 'Alpu',
        il: 'Eskişehir',
        islemDurumu: 'Tamamlandı',
        koordinat: '39.758002,30.495233',
        fotograflar: ['assets/images/cattle2.jpg', 'assets/images/cattle2_ear.jpg'],
        esync: true,
      ),
    ];
    
    // E-Sync bekleyen işlemler
    _esynchIslemleri = [
      BuyukbasKupe(
        id: 4,
        kupeNo: 'TR4256789126',
        hayvanTuru: 'Keçi',
        hayvanIrki: 'Ankara Keçisi',
        cinsiyet: 'Dişi',
        dogumTarihi: '20/02/2023',
        islemTarihi: '02/05/2023',
        sahipAdSoyad: 'Ayşe Yıldız',
        sahipTcNo: '45678901234',
        adres: 'Günyüzü Köyü No:8',
        ilce: 'Mahmudiye',
        il: 'Eskişehir',
        islemDurumu: 'Tamamlandı',
        koordinat: '39.748002,30.485233',
        fotograflar: ['assets/images/goat1.jpg', 'assets/images/goat1_ear.jpg'],
        esync: false,
      ),
    ];
  }
  
  // Konum alma fonksiyonu
  Future<void> _getLocation() async {
    setState(() {
      _isLoadingLocation = true;
    });
    
    try {
      // Manuel konum girişi için dialog gösterelim
      await _showLocationInputDialog();
      
      setState(() {
        _isLoadingLocation = false;
      });
      
      if (_currentLocation.isNotEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Konum girildi')),
        );
      }
    } catch (e) {
      setState(() {
        _isLoadingLocation = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Konum girilemedi: $e')),
      );
    }
  }

  // Manuel konum girişi için dialog
  Future<void> _showLocationInputDialog() async {
    await showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Konum Bilgisi Girin'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _enlemController,
                decoration: const InputDecoration(
                  labelText: 'Enlem (Latitude)',
                  hintText: 'Örn: 39.768002',
                ),
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _boylamController,
                decoration: const InputDecoration(
                  labelText: 'Boylam (Longitude)',
                  hintText: 'Örn: 30.505233',
                ),
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('İptal'),
            ),
            ElevatedButton(
              onPressed: () {
                if (_enlemController.text.isNotEmpty && _boylamController.text.isNotEmpty) {
                  setState(() {
                    _currentLocation = '${_enlemController.text},${_boylamController.text}';
                  });
                  Navigator.of(context).pop();
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Lütfen geçerli koordinat girin')),
                  );
                }
              },
              child: const Text('Kaydet'),
            ),
          ],
        );
      },
    );
  }
  
  // Fotoğraf ekleme fonksiyonu
  Future<void> _addPhoto() async {
    final ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(
      source: ImageSource.camera,
      maxWidth: 1200,
      maxHeight: 1200,
      imageQuality: 85,
    );
    
    if (image != null) {
      setState(() {
        _selectedPhotos.add(image.path);
      });
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Fotoğraf eklendi')),
      );
    }
  }
  
  // Form temizleme fonksiyonu
  void _clearForm() {
    _kupeNoController.clear();
    _hayvanIrkiController.clear();
    _sahipAdSoyadController.clear();
    _sahipTcNoController.clear();
    _adresController.clear();
    _ilceController.clear();
    _ilController.clear();
    _notlarController.clear();
    _enlemController.clear();
    _boylamController.clear();
    setState(() {
      _selectedHayvanTuru = 'Sığır';
      _selectedCinsiyet = 'Erkek';
      _selectedDogumTarihi = DateTime.now().subtract(const Duration(days: 30));
      _currentLocation = '';
      _selectedPhotos = [];
    });
  }
  
  // Form gönderme fonksiyonu
  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    
    if (_currentLocation.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen konum bilgisi ekleyin')),
      );
      return;
    }
    
    if (_selectedPhotos.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen en az bir fotoğraf ekleyin')),
      );
      return;
    }
    
    setState(() {
      _isSubmitting = true;
    });
    
    try {
      // İnternet bağlantısı kontrolü
      final connectivityResult = await Connectivity().checkConnectivity();
      final hasInternet = connectivityResult != ConnectivityResult.none;
      
      // Yeni küpe kaydı oluştur
      final yeniKupe = BuyukbasKupe(
        id: DateTime.now().millisecondsSinceEpoch,
        kupeNo: _kupeNoController.text,
        hayvanTuru: _selectedHayvanTuru,
        hayvanIrki: _hayvanIrkiController.text,
        cinsiyet: _selectedCinsiyet,
        dogumTarihi: DateFormat('dd/MM/yyyy').format(_selectedDogumTarihi),
        islemTarihi: DateFormat('dd/MM/yyyy').format(DateTime.now()),
        sahipAdSoyad: _sahipAdSoyadController.text,
        sahipTcNo: _sahipTcNoController.text,
        adres: _adresController.text,
        ilce: _ilceController.text,
        il: _ilController.text,
        islemDurumu: 'Tamamlandı',
        koordinat: _currentLocation,
        notlar: _notlarController.text,
        fotograflar: _selectedPhotos,
        esync: hasInternet,
      );
      
      // Mock kayıt işlemi - gerçek API entegrasyonunda değişecek
      await Future.delayed(const Duration(seconds: 1));
      
      setState(() {
        // İnternet varsa doğrudan tamamlandı olarak kaydet
        if (hasInternet) {
          _tamamlananIslemler.add(yeniKupe);
        } else {
          // İnternet yoksa E-Sync listesine ekle
          final esyncKupe = BuyukbasKupe(
            id: yeniKupe.id,
            kupeNo: yeniKupe.kupeNo,
            hayvanTuru: yeniKupe.hayvanTuru,
            hayvanIrki: yeniKupe.hayvanIrki,
            cinsiyet: yeniKupe.cinsiyet,
            dogumTarihi: yeniKupe.dogumTarihi,
            islemTarihi: yeniKupe.islemTarihi,
            sahipAdSoyad: yeniKupe.sahipAdSoyad,
            sahipTcNo: yeniKupe.sahipTcNo,
            adres: yeniKupe.adres,
            ilce: yeniKupe.ilce,
            il: yeniKupe.il,
            islemDurumu: yeniKupe.islemDurumu,
            koordinat: yeniKupe.koordinat,
            notlar: yeniKupe.notlar,
            fotograflar: yeniKupe.fotograflar,
            esync: false,
          );
          _esynchIslemleri.add(esyncKupe);
        }
        
        _isSubmitting = false;
      });
      
      // Form temizle
      _clearForm();
      
      // Bildirim göster
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(hasInternet 
              ? 'Küpe işlemi başarıyla kaydedildi' 
              : 'Küpe işlemi kaydedildi, internet bağlantısı sağlandığında merkeze gönderilecek'),
          backgroundColor: Colors.green,
        ),
      );
      
      // Tamamlanan işlemler sekmesine geç
      _tabController.animateTo(hasInternet ? 1 : 2);
    } catch (e) {
      setState(() {
        _isSubmitting = false;
      });
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Hata: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
  
  // E-Sync işlemi
  Future<void> _syncData(BuyukbasKupe kupe) async {
    try {
      // İnternet bağlantısı kontrolü
      final connectivityResult = await Connectivity().checkConnectivity();
      final hasInternet = connectivityResult != ConnectivityResult.none;
      
      if (!hasInternet) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('İnternet bağlantısı yok. Lütfen daha sonra tekrar deneyin.'),
            backgroundColor: Colors.orange,
          ),
        );
        return;
      }
      
      // Senkronizasyon simulasyonu - gerçek API entegrasyonunda değişecek
      await Future.delayed(const Duration(seconds: 1));
      
      setState(() {
        // E-Sync listesinden kaldır
        _esynchIslemleri.removeWhere((item) => item.id == kupe.id);
        
        // Tamamlanan işlemlere ekle
        final syncedKupe = BuyukbasKupe(
          id: kupe.id,
          kupeNo: kupe.kupeNo,
          hayvanTuru: kupe.hayvanTuru,
          hayvanIrki: kupe.hayvanIrki,
          cinsiyet: kupe.cinsiyet,
          dogumTarihi: kupe.dogumTarihi,
          islemTarihi: kupe.islemTarihi,
          sahipAdSoyad: kupe.sahipAdSoyad,
          sahipTcNo: kupe.sahipTcNo,
          adres: kupe.adres,
          ilce: kupe.ilce,
          il: kupe.il,
          islemDurumu: kupe.islemDurumu,
          koordinat: kupe.koordinat,
          notlar: kupe.notlar,
          fotograflar: kupe.fotograflar,
          esync: true,
        );
        _tamamlananIslemler.add(syncedKupe);
      });
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Senkronizasyon başarılı'),
          backgroundColor: Colors.green,
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Senkronizasyon hatası: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Büyükbaş Küpe Takibi'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Büyükbaş Küpe Takibi'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(_errorMessage, textAlign: TextAlign.center),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _fetchData,
                child: const Text('Tekrar Dene'),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Büyükbaş Küpe Takibi'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchData,
            tooltip: 'Yenile',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Yeni Kayıt'),
            Tab(text: 'Tamamlanan'),
            Tab(text: 'E-Sync'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Yeni Kayıt Tab'ı
          _buildNewRegistrationForm(),
          
          // Tamamlanan İşlemler Tab'ı
          _buildCompletedList(),
          
          // E-Sync İşlemleri Tab'ı
          _buildSyncList(),
        ],
      ),
    );
  }

  Widget _buildNewRegistrationForm() {
    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Bilgi Kartı
            Card(
              color: Colors.blue.shade50,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Icon(Icons.info, color: Colors.blue.shade700),
                        const SizedBox(width: 8),
                        Text(
                          'Küpe Kayıt Bilgileri',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.blue.shade700,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Tüm alanları eksiksiz doldurunuz. Konum bilgisi ve fotoğraf eklemek zorunludur.',
                      style: TextStyle(fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            // Hayvan Bilgileri
            const Text(
              'Hayvan Bilgileri',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 16),
            
            // Küpe No
            TextFormField(
              controller: _kupeNoController,
              decoration: const InputDecoration(
                labelText: 'Küpe Numarası',
                hintText: 'TR ile başlayan numara',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.tag),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Küpe numarası gerekli';
                }
                if (!value.startsWith('TR')) {
                  return 'Küpe numarası TR ile başlamalı';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // Hayvan Türü ve Cinsiyet
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _selectedHayvanTuru,
                    decoration: const InputDecoration(
                      labelText: 'Hayvan Türü',
                      border: OutlineInputBorder(),
                    ),
                    items: _hayvanTurleri.map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      if (newValue != null) {
                        setState(() {
                          _selectedHayvanTuru = newValue;
                        });
                      }
                    },
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _selectedCinsiyet,
                    decoration: const InputDecoration(
                      labelText: 'Cinsiyet',
                      border: OutlineInputBorder(),
                    ),
                    items: _cinsiyetler.map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      if (newValue != null) {
                        setState(() {
                          _selectedCinsiyet = newValue;
                        });
                      }
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            
            // Hayvan Irkı
            TextFormField(
              controller: _hayvanIrkiController,
              decoration: const InputDecoration(
                labelText: 'Hayvan Irkı',
                hintText: 'Ör: Holstein, Simental vs.',
                border: OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Hayvan ırkı gerekli';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // Doğum Tarihi
            InkWell(
              onTap: () async {
                final DateTime? picked = await showDatePicker(
                  context: context,
                  initialDate: _selectedDogumTarihi,
                  firstDate: DateTime(DateTime.now().year - 5),
                  lastDate: DateTime.now(),
                );
                if (picked != null) {
                  setState(() {
                    _selectedDogumTarihi = picked;
                  });
                }
              },
              child: InputDecorator(
                decoration: const InputDecoration(
                  labelText: 'Doğum Tarihi',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.calendar_today),
                ),
                child: Text(
                  DateFormat('dd/MM/yyyy').format(_selectedDogumTarihi),
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            // Sahip Bilgileri
            const Text(
              'Sahip Bilgileri',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 16),
            
            // Ad Soyad
            TextFormField(
              controller: _sahipAdSoyadController,
              decoration: const InputDecoration(
                labelText: 'Ad Soyad',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.person),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Ad soyad gerekli';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // TC Kimlik No
            TextFormField(
              controller: _sahipTcNoController,
              keyboardType: TextInputType.number,
              maxLength: 11,
              decoration: const InputDecoration(
                labelText: 'TC Kimlik Numarası',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.credit_card),
                counterText: '',
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'TC kimlik numarası gerekli';
                }
                if (value.length != 11) {
                  return 'TC kimlik numarası 11 haneli olmalı';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // Adres
            TextFormField(
              controller: _adresController,
              maxLines: 2,
              decoration: const InputDecoration(
                labelText: 'Adres',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.home),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Adres gerekli';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // İlçe ve İl
            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _ilceController,
                    decoration: const InputDecoration(
                      labelText: 'İlçe',
                      border: OutlineInputBorder(),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'İlçe gerekli';
                      }
                      return null;
                    },
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: TextFormField(
                    controller: _ilController,
                    decoration: const InputDecoration(
                      labelText: 'İl',
                      border: OutlineInputBorder(),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'İl gerekli';
                      }
                      return null;
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            
            // Konum Bilgisi
            const Text(
              'Konum Bilgisi',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Güncel Konum:'),
                        ElevatedButton.icon(
                          onPressed: _isLoadingLocation ? null : _getLocation,
                          icon: _isLoadingLocation 
                              ? const SizedBox(
                                  width: 20, 
                                  height: 20, 
                                  child: CircularProgressIndicator(strokeWidth: 2),
                                )
                              : const Icon(Icons.my_location),
                          label: const Text('Konum Al'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _currentLocation.isEmpty 
                          ? 'Konum alınmadı' 
                          : 'Konum: $_currentLocation',
                      style: TextStyle(
                        color: _currentLocation.isEmpty ? Colors.red : Colors.green,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            // Fotoğraflar
            const Text(
              'Fotoğraflar',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Küpe Fotoğrafları:'),
                        ElevatedButton.icon(
                          onPressed: _addPhoto,
                          icon: const Icon(Icons.camera_alt),
                          label: const Text('Fotoğraf Çek'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    _selectedPhotos.isEmpty
                        ? const Center(
                            child: Text(
                              'Fotoğraf eklenmedi',
                              style: TextStyle(color: Colors.red),
                            ),
                          )
                        : SizedBox(
                            height: 120,
                            child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              itemCount: _selectedPhotos.length,
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.only(right: 8),
                                  child: Stack(
                                    children: [
                                      Container(
                                        width: 120,
                                        height: 120,
                                        decoration: BoxDecoration(
                                          border: Border.all(color: Colors.grey),
                                          borderRadius: BorderRadius.circular(8),
                                          image: DecorationImage(
                                            image: FileImage(File(_selectedPhotos[index])),
                                            fit: BoxFit.cover,
                                          ),
                                        ),
                                      ),
                                      Positioned(
                                        top: 0,
                                        right: 0,
                                        child: IconButton(
                                          icon: const Icon(
                                            Icons.delete,
                                            color: Colors.red,
                                          ),
                                          onPressed: () {
                                            setState(() {
                                              _selectedPhotos.removeAt(index);
                                            });
                                          },
                                        ),
                                      ),
                                    ],
                                  ),
                                );
                              },
                            ),
                          ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            // Notlar
            TextFormField(
              controller: _notlarController,
              maxLines: 3,
              decoration: const InputDecoration(
                labelText: 'Notlar (Opsiyonel)',
                border: OutlineInputBorder(),
                hintText: 'Ek bilgiler...',
              ),
            ),
            const SizedBox(height: 32),
            
            // Form Butonları
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: _clearForm,
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text('Formu Temizle'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _isSubmitting ? null : _submitForm,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: _isSubmitting
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                              strokeWidth: 2,
                            ),
                          )
                        : const Text('Kaydet'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // Tamamlanan İşlemler Listesi
  Widget _buildCompletedList() {
    if (_tamamlananIslemler.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.done_all, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text('Tamamlanan işlem bulunmuyor'),
          ],
        ),
      );
    }
    
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _tamamlananIslemler.length,
      itemBuilder: (context, index) {
        final kupe = _tamamlananIslemler[index];
        return _buildKupeCard(kupe, isSync: false);
      },
    );
  }
  
  // E-Sync Listesi
  Widget _buildSyncList() {
    if (_esynchIslemleri.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.sync, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text('Senkronize edilecek işlem bulunmuyor'),
          ],
        ),
      );
    }
    
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _esynchIslemleri.length,
      itemBuilder: (context, index) {
        final kupe = _esynchIslemleri[index];
        return _buildKupeCard(kupe, isSync: true);
      },
    );
  }
  
  // Küpe Kartı
  Widget _buildKupeCard(BuyukbasKupe kupe, {required bool isSync}) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Küpe No: ${kupe.kupeNo}',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: kupe.esync ? Colors.green.shade100 : Colors.orange.shade100,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    kupe.esync ? 'Senkronize' : 'Bekliyor',
                    style: TextStyle(
                      color: kupe.esync ? Colors.green.shade800 : Colors.orange.shade800,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const Divider(),
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Tür: ${kupe.hayvanTuru}'),
                      Text('Irk: ${kupe.hayvanIrki}'),
                      Text('Cinsiyet: ${kupe.cinsiyet}'),
                      Text('Doğum: ${kupe.dogumTarihi}'),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Sahip: ${kupe.sahipAdSoyad}'),
                      Text('İlçe/İl: ${kupe.ilce}/${kupe.il}'),
                      Text('İşlem: ${kupe.islemTarihi}'),
                    ],
                  ),
                ),
              ],
            ),
            if (kupe.fotograflar.isNotEmpty) ...[
              const SizedBox(height: 16),
              const Text(
                'Fotoğraflar:',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              SizedBox(
                height: 80,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: kupe.fotograflar.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          image: DecorationImage(
                            image: kupe.fotograflar[index].startsWith('assets') 
                                ? AssetImage(kupe.fotograflar[index]) as ImageProvider
                                : FileImage(File(kupe.fotograflar[index])),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
            if (isSync) ...[
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () => _syncData(kupe),
                  icon: const Icon(Icons.sync),
                  label: const Text('Senkronize Et'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
} 