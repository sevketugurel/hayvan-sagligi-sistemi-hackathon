import 'package:flutter/material.dart';
import '../models/hayvan.dart';
import '../services/service_provider.dart';
import 'randevu_olustur_screen.dart';

class HayvanDetaySahipScreen extends StatefulWidget {
  final int hayvanId;
  
  const HayvanDetaySahipScreen({
    super.key,
    required this.hayvanId,
  });

  @override
  State<HayvanDetaySahipScreen> createState() => _HayvanDetaySahipScreenState();
}

class _HayvanDetaySahipScreenState extends State<HayvanDetaySahipScreen> with SingleTickerProviderStateMixin {
  final _apiService = ServiceProvider().apiService;
  late TabController _tabController;
  bool _isLoading = true;
  Hayvan? _hayvan;
  String _errorMessage = '';
  
  // Mock veri
  final List<Map<String, dynamic>> _muayeneler = [];
  final List<Map<String, dynamic>> _asilar = [];
  final List<Map<String, dynamic>> _tedaviler = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _fetchHayvanDetay();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _fetchHayvanDetay() async {
    try {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });
      
      final hayvan = await _apiService.getHayvan(widget.hayvanId);
      
      // Mock veri oluştur
      _olusturMockVeri();
      
      setState(() {
        _hayvan = hayvan;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Hayvan detayları yüklenemedi: $e';
        _isLoading = false;
      });
    }
  }

  void _olusturMockVeri() {
    // Mock muayene geçmişi
    _muayeneler.addAll([
      {
        'id': 1,
        'tarih': '12.04.2025',
        'veteriner': 'Dr. Mehmet Öz',
        'tani': 'Kulak enfeksiyonu',
        'tedavi': 'Antibiyotik tedavisi',
        'notlar': 'Kulak içi temizlik yapıldı',
      },
      {
        'id': 2,
        'tarih': '05.03.2025',
        'veteriner': 'Dr. Ayşe Demir',
        'tani': 'Yıllık kontrol',
        'tedavi': '-',
        'notlar': 'Genel durumu iyi',
      },
    ]);
    
    // Mock aşı bilgileri
    _asilar.addAll([
      {
        'id': 1,
        'adi': 'Karma Aşı',
        'tarih': '05.03.2025',
        'sonrakiTarih': '05.03.2026',
        'veteriner': 'Dr. Ayşe Demir',
        'durum': 'Tamamlandı',
      },
      {
        'id': 2,
        'adi': 'Kuduz Aşısı',
        'tarih': '05.03.2025',
        'sonrakiTarih': '05.03.2026',
        'veteriner': 'Dr. Ayşe Demir',
        'durum': 'Tamamlandı',
      },
      {
        'id': 3,
        'adi': 'Parazit Kontrolü',
        'tarih': '',
        'sonrakiTarih': '15.06.2025',
        'veteriner': '',
        'durum': 'Planlandı',
      },
    ]);
    
    // Mock tedavi bilgileri
    _tedaviler.addAll([
      {
        'id': 1,
        'adi': 'Antibiyotik',
        'baslangic': '12.04.2025',
        'bitis': '19.04.2025',
        'doz': 'Günde 2 kez, 1 tablet',
        'aciklama': 'Yemeklerle birlikte verilmeli',
        'durum': 'Devam ediyor',
      },
      {
        'id': 2,
        'adi': 'Kulak Damlası',
        'baslangic': '12.04.2025',
        'bitis': '26.04.2025',
        'doz': 'Günde 2 kez, 2 damla',
        'aciklama': 'Kulağı temizledikten sonra uygulanmalı',
        'durum': 'Devam ediyor',
      },
    ]);
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Hayvan Detayları'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Hayvan Detayları'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(_errorMessage, textAlign: TextAlign.center),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _fetchHayvanDetay,
                child: const Text('Tekrar Dene'),
              ),
            ],
          ),
        ),
      );
    }

    final hayvan = _hayvan!;

    return Scaffold(
      appBar: AppBar(
        title: Text(hayvan.ad),
        actions: [
          IconButton(
            icon: const Icon(Icons.calendar_today),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => RandevuOlusturScreen(hayvanId: hayvan.id),
                ),
              );
            },
            tooltip: 'Randevu Al',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Genel Bilgiler'),
            Tab(text: 'Sağlık Geçmişi'),
            Tab(text: 'Aşı Takvimi'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Genel Bilgiler sekmesi
          _buildGenelBilgilerTab(hayvan),
          
          // Sağlık Geçmişi sekmesi
          _buildSaglikGecmisiTab(),
          
          // Aşı Takvimi sekmesi
          _buildAsiTakvimiTab(),
        ],
      ),
    );
  }

  Widget _buildGenelBilgilerTab(Hayvan hayvan) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Hayvan profil kartı
          _buildProfilCard(hayvan),
          
          const SizedBox(height: 24),
          
          // Yaklaşan randevular
          _buildYaklasanRandevular(),
          
          const SizedBox(height: 24),
          
          // Güncel tedaviler
          _buildGuncelTedaviler(),
        ],
      ),
    );
  }

  Widget _buildProfilCard(Hayvan hayvan) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Profil resmi ve temel bilgiler
            Row(
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: _getColorForAnimalType(hayvan.tur),
                  child: Text(
                    hayvan.ad.isNotEmpty ? hayvan.ad[0].toUpperCase() : '?',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 30,
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        hayvan.ad,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${hayvan.tur} - ${hayvan.cins}',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Icon(
                            hayvan.cinsiyet == 'Erkek' ? Icons.male : Icons.female,
                            size: 18,
                            color: hayvan.cinsiyet == 'Erkek' ? Colors.blue : Colors.pink,
                          ),
                          const SizedBox(width: 4),
                          Text(hayvan.cinsiyet),
                          const SizedBox(width: 16),
                          const Icon(Icons.monitor_weight, size: 18),
                          const SizedBox(width: 4),
                          Text('${hayvan.kilo} kg'),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            
            const Divider(height: 32),
            
            // Detaylı bilgiler
            Column(
              children: [
                _buildInfoRow('Doğum Tarihi', hayvan.dogumTarihi),
                _buildInfoRow('Son Muayene', _muayeneler.isNotEmpty ? _muayeneler.first['tarih'] : 'Yok'),
                _buildInfoRow('Aşı Durumu', _getAsiDurumu()),
                _buildInfoRow('Sağlık Durumu', 'İyi'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildYaklasanRandevular() {
    // Demo randevu verileri
    final randevular = [
      {
        'id': 1,
        'tarih': '02.05.2025',
        'saat': '14:30',
        'veteriner': 'Dr. Mehmet Öz',
        'not': 'Kontrol muayenesi',
        'durum': 'Onaylandı',
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Yaklaşan Randevular',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        randevular.isEmpty
            ? _buildEmptyCard('Yaklaşan randevu bulunmuyor', Icons.calendar_today, () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => RandevuOlusturScreen(hayvanId: _hayvan?.id),
                  ),
                );
              }, 'Randevu Al')
            : Column(
                children: randevular.map((randevu) {
                  return Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  const Icon(Icons.calendar_today, color: Colors.green),
                                  const SizedBox(width: 8),
                                  Text(
                                    '${randevu['tarih']} - ${randevu['saat']}',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.green.shade100,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  randevu['durum'] as String,
                                  style: const TextStyle(
                                    color: Colors.green,
                                    fontSize: 12,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const Divider(height: 24),
                          Text('Veteriner: ${randevu['veteriner']}'),
                          Text('Not: ${randevu['not']}'),
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              TextButton(
                                onPressed: () {
                                  // Randevu iptal et
                                },
                                child: const Text('İptal Et'),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
      ],
    );
  }

  Widget _buildGuncelTedaviler() {
    final guncelTedaviler = _tedaviler.where((t) => t['durum'] == 'Devam ediyor').toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Güncel Tedaviler',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        guncelTedaviler.isEmpty
            ? _buildEmptyCard('Güncel tedavi bulunmuyor', Icons.medication)
            : Column(
                children: guncelTedaviler.map((tedavi) {
                  return Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.medication, color: Colors.blue),
                              const SizedBox(width: 8),
                              Text(
                                tedavi['adi'] as String,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ],
                          ),
                          const Divider(height: 24),
                          Text('Doz: ${tedavi['doz']}'),
                          Text('Başlangıç: ${tedavi['baslangic']}'),
                          Text('Bitiş: ${tedavi['bitis']}'),
                          const SizedBox(height: 8),
                          if (tedavi['aciklama'] != null)
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: Colors.yellow.shade100,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Row(
                                children: [
                                  const Icon(Icons.info, color: Colors.orange, size: 16),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      tedavi['aciklama'] as String,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
      ],
    );
  }

  Widget _buildSaglikGecmisiTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Muayene geçmişi
          const Text(
            'Muayene Geçmişi',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          _muayeneler.isEmpty
              ? _buildEmptyCard('Muayene geçmişi bulunmuyor', Icons.medical_services)
              : Column(
                  children: _muayeneler.map((muayene) {
                    return Card(
                      elevation: 2,
                      margin: const EdgeInsets.only(bottom: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.event, color: Colors.blue),
                                    const SizedBox(width: 8),
                                    Text(
                                      muayene['tarih'] as String,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                Text(muayene['veteriner'] as String),
                              ],
                            ),
                            const Divider(height: 24),
                            _buildInfoRow('Tanı', muayene['tani'] as String),
                            _buildInfoRow('Tedavi', muayene['tedavi'] as String),
                            if (muayene['notlar'] != null)
                              _buildInfoRow('Notlar', muayene['notlar'] as String),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                ),
          
          const SizedBox(height: 24),
          
          // Tedavi geçmişi
          const Text(
            'Tedavi Geçmişi',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          _tedaviler.isEmpty
              ? _buildEmptyCard('Tedavi geçmişi bulunmuyor', Icons.medication)
              : Column(
                  children: _tedaviler.map((tedavi) {
                    return Card(
                      elevation: 2,
                      margin: const EdgeInsets.only(bottom: 12),
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
                                  tedavi['adi'] as String,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: tedavi['durum'] == 'Devam ediyor'
                                        ? Colors.green.shade100
                                        : Colors.grey.shade100,
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    tedavi['durum'] as String,
                                    style: TextStyle(
                                      color: tedavi['durum'] == 'Devam ediyor'
                                          ? Colors.green
                                          : Colors.grey,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const Divider(height: 24),
                            _buildInfoRow('Başlangıç', tedavi['baslangic'] as String),
                            _buildInfoRow('Bitiş', tedavi['bitis'] as String),
                            _buildInfoRow('Doz', tedavi['doz'] as String),
                            if (tedavi['aciklama'] != null)
                              _buildInfoRow('Açıklama', tedavi['aciklama'] as String),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                ),
        ],
      ),
    );
  }

  Widget _buildAsiTakvimiTab() {
    final gelecekAsilar = _asilar.where((a) => a['durum'] == 'Planlandı').toList();
    final tamamlananAsilar = _asilar.where((a) => a['durum'] == 'Tamamlandı').toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Yaklaşan aşılar
          const Text(
            'Yaklaşan Aşılar',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          gelecekAsilar.isEmpty
              ? _buildEmptyCard('Yaklaşan aşı bulunmuyor', Icons.vaccines)
              : Column(
                  children: gelecekAsilar.map((asi) {
                    return Card(
                      elevation: 2,
                      margin: const EdgeInsets.only(bottom: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.vaccines, color: Colors.orange),
                                    const SizedBox(width: 8),
                                    Text(
                                      asi['adi'] as String,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: Colors.orange.shade100,
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: const Text(
                                    'Planlandı',
                                    style: TextStyle(
                                      color: Colors.orange,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const Divider(height: 24),
                            _buildInfoRow('Tarih', asi['sonrakiTarih'] as String),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                TextButton.icon(
                                  onPressed: () {
                                    // Randevu oluştur
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => RandevuOlusturScreen(
                                          hayvanId: _hayvan?.id,
                                          notlar: '${asi['adi']} aşısı için',
                                        ),
                                      ),
                                    );
                                  },
                                  icon: const Icon(Icons.calendar_today),
                                  label: const Text('Randevu Al'),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                ),
          
          const SizedBox(height: 24),
          
          // Tamamlanan aşılar
          const Text(
            'Tamamlanan Aşılar',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          tamamlananAsilar.isEmpty
              ? _buildEmptyCard('Tamamlanan aşı bulunmuyor', Icons.vaccines)
              : Column(
                  children: tamamlananAsilar.map((asi) {
                    return Card(
                      elevation: 2,
                      margin: const EdgeInsets.only(bottom: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.vaccines, color: Colors.green),
                                    const SizedBox(width: 8),
                                    Text(
                                      asi['adi'] as String,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: Colors.green.shade100,
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: const Text(
                                    'Tamamlandı',
                                    style: TextStyle(
                                      color: Colors.green,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const Divider(height: 24),
                            _buildInfoRow('Yapıldığı Tarih', asi['tarih'] as String),
                            _buildInfoRow('Gelecek Tarih', asi['sonrakiTarih'] as String),
                            _buildInfoRow('Veteriner', asi['veteriner'] as String),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                ),
        ],
      ),
    );
  }

  String _getAsiDurumu() {
    final tamamlananAsilar = _asilar.where((a) => a['durum'] == 'Tamamlandı').length;
    final toplamAsilar = _asilar.length;
    
    return '$tamamlananAsilar/$toplamAsilar Tamamlandı';
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(
              '$label:',
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(
            child: Text(value),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyCard(String message, IconData icon, [VoidCallback? onPressed, String? buttonText]) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(icon, size: 48, color: Colors.grey),
            const SizedBox(height: 8),
            Text(
              message,
              textAlign: TextAlign.center,
            ),
            if (onPressed != null) ...[
              const SizedBox(height: 8),
              ElevatedButton(
                onPressed: onPressed,
                child: Text(buttonText ?? 'Ekle'),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Color _getColorForAnimalType(String tur) {
    switch (tur.toLowerCase()) {
      case 'kedi':
        return Colors.orange;
      case 'köpek':
        return Colors.brown;
      case 'kuş':
        return Colors.blue;
      case 'balık':
        return Colors.lightBlue;
      case 'kemirgen':
        return Colors.amber;
      case 'sürüngen':
        return Colors.green;
      default:
        return Colors.purple;
    }
  }
} 