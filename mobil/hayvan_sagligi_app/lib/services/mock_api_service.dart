import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/hayvan.dart';
import '../models/sahip.dart';

class MockApiService {
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();
  
  // Mock hayvan verileri
  final List<Hayvan> _hayvanlar = [
    Hayvan(
      id: 1,
      ad: 'Karabaş',
      cins: 'Golden Retriever',
      tur: 'Köpek',
      kilo: 32.5,
      cinsiyet: 'Erkek',
      dogumTarihi: '2019-05-12',
      sahipId: 1,
    ),
    Hayvan(
      id: 2,
      ad: 'Pamuk',
      cins: 'Scottish Fold',
      tur: 'Kedi',
      kilo: 4.2,
      cinsiyet: 'Dişi',
      dogumTarihi: '2020-03-15',
      sahipId: 2,
    ),
    Hayvan(
      id: 3,
      ad: 'Fındık',
      cins: 'Pomeranian',
      tur: 'Köpek',
      kilo: 3.7,
      cinsiyet: 'Erkek',
      dogumTarihi: '2021-01-10',
      sahipId: 1,
    ),
    Hayvan(
      id: 4,
      ad: 'Tekir',
      cins: 'Tekir',
      tur: 'Kedi',
      kilo: 3.5,
      cinsiyet: 'Erkek',
      dogumTarihi: '2020-08-20',
      sahipId: 3,
    ),
    Hayvan(
      id: 5,
      ad: 'Şila',
      cins: 'Alman Kurdu',
      tur: 'Köpek',
      kilo: 38.0,
      cinsiyet: 'Dişi',
      dogumTarihi: '2018-11-05',
      sahipId: 2,
    ),
  ];

  // Mock sahip verileri
  final List<Sahip> _sahipler = [
    Sahip(
      id: 1,
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      telefon: '05551234567',
      email: 'ahmet@example.com',
      adres: 'İstanbul, Kadıköy',
    ),
    Sahip(
      id: 2,
      ad: 'Ayşe',
      soyad: 'Kaya',
      telefon: '05559876543',
      email: 'ayse@example.com',
      adres: 'Ankara, Çankaya',
    ),
    Sahip(
      id: 3,
      ad: 'Mehmet',
      soyad: 'Demir',
      telefon: '05553332211',
      email: 'mehmet@example.com',
      adres: 'İzmir, Bornova',
    ),
  ];

  // Demo kullanıcılar
  final Map<String, String> _users = {
    'vet@example.com': '123456',
    'sahip@example.com': '123456',
  };

  // Hayvan fonksiyonları
  Future<List<Hayvan>> getHayvanlar() async {
    // 1 saniye gecikme ekleyerek gerçek API davranışını simüle ediyoruz
    await Future.delayed(const Duration(seconds: 1));
    return _hayvanlar;
  }

  Future<Hayvan> getHayvan(int id) async {
    await Future.delayed(const Duration(seconds: 1));
    final hayvan = _hayvanlar.firstWhere(
      (h) => h.id == id,
      orElse: () => throw Exception('Hayvan bulunamadı'),
    );
    return hayvan;
  }

  Future<Hayvan> createHayvan(Hayvan hayvan) async {
    await Future.delayed(const Duration(seconds: 1));
    final yeniHayvan = Hayvan(
      id: _hayvanlar.length + 1,
      ad: hayvan.ad,
      cins: hayvan.cins,
      tur: hayvan.tur,
      kilo: hayvan.kilo,
      cinsiyet: hayvan.cinsiyet,
      dogumTarihi: hayvan.dogumTarihi,
      sahipId: hayvan.sahipId,
    );
    _hayvanlar.add(yeniHayvan);
    return yeniHayvan;
  }

  Future<Hayvan> updateHayvan(Hayvan hayvan) async {
    await Future.delayed(const Duration(seconds: 1));
    final index = _hayvanlar.indexWhere((h) => h.id == hayvan.id);
    if (index == -1) {
      throw Exception('Hayvan bulunamadı');
    }
    _hayvanlar[index] = hayvan;
    return hayvan;
  }

  Future<void> deleteHayvan(int id) async {
    await Future.delayed(const Duration(seconds: 1));
    final index = _hayvanlar.indexWhere((h) => h.id == id);
    if (index == -1) {
      throw Exception('Hayvan bulunamadı');
    }
    _hayvanlar.removeAt(index);
  }

  // Sahip fonksiyonları
  Future<List<Sahip>> getSahipler() async {
    await Future.delayed(const Duration(seconds: 1));
    return _sahipler;
  }

  Future<Sahip> getSahip(int id) async {
    await Future.delayed(const Duration(seconds: 1));
    final sahip = _sahipler.firstWhere(
      (s) => s.id == id,
      orElse: () => throw Exception('Sahip bulunamadı'),
    );
    return sahip;
  }

  Future<Sahip> createSahip(Sahip sahip) async {
    await Future.delayed(const Duration(seconds: 1));
    final yeniSahip = Sahip(
      id: _sahipler.length + 1,
      ad: sahip.ad,
      soyad: sahip.soyad,
      telefon: sahip.telefon,
      email: sahip.email,
      adres: sahip.adres,
    );
    _sahipler.add(yeniSahip);
    return yeniSahip;
  }

  Future<Sahip> updateSahip(Sahip sahip) async {
    await Future.delayed(const Duration(seconds: 1));
    final index = _sahipler.indexWhere((s) => s.id == sahip.id);
    if (index == -1) {
      throw Exception('Sahip bulunamadı');
    }
    _sahipler[index] = sahip;
    return sahip;
  }

  Future<void> deleteSahip(int id) async {
    await Future.delayed(const Duration(seconds: 1));
    final index = _sahipler.indexWhere((s) => s.id == id);
    if (index == -1) {
      throw Exception('Sahip bulunamadı');
    }
    _sahipler.removeAt(index);
  }

  // Kimlik doğrulama istekleri
  Future<bool> login(String email, String password) async {
    await Future.delayed(const Duration(seconds: 1));
    
    if (_users.containsKey(email) && _users[email] == password) {
      await _secureStorage.write(key: 'token', value: 'mock_token_${DateTime.now().millisecondsSinceEpoch}');
      await _secureStorage.write(key: 'user_email', value: email);
      return true;
    }
    
    return false;
  }

  Future<void> logout() async {
    await _secureStorage.delete(key: 'token');
    await _secureStorage.delete(key: 'user_email');
  }
} 