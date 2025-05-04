import 'package:flutter/material.dart';
import '../services/service_provider.dart';
import '../models/hayvan.dart';
import 'hayvan_detay_screen.dart';
import 'randevular_screen.dart';
import 'saha_ziyareti_screen.dart';
import 'buyukbas_kupe_screen.dart';

class VeterinerAnaSayfaScreen extends StatefulWidget {
  const VeterinerAnaSayfaScreen({super.key});

  @override
  State<VeterinerAnaSayfaScreen> createState() => _VeterinerAnaSayfaScreenState();
}

class _VeterinerAnaSayfaScreenState extends State<VeterinerAnaSayfaScreen> {
  final _apiService = ServiceProvider().apiService;
  bool _isLoading = true;
  String _errorMessage = '';
  List<Map<String, dynamic>> _bugunRandevular = [];
  List<Map<String, dynamic>> _sahaZiyaretleri = [];
  List<Map<String, dynamic>> _acilVakalar = [];
  
  // İstatistik verileri
  final Map<String, int> _istatistikler = {
    'bugünRandevu': 0,
    'bekleyenRandevu': 0,
    'haftalıkRandevu': 0,
    'tamamlananMuayene': 0,
    'planlanmışAşı': 0,
    'sahaZiyareti': 0,
  };

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });

      // Demo verileri yükle
      _loadDemoData();

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
  
  void _loadDemoData() {
    // Bugünkü randevular
    _bugunRandevular = [
      {
        'id': 1,
        'hayvanAd': 'Pamuk',
        'sahipAd': 'Ahmet Yılmaz',
        'saat': '09:30',
        'tip': 'Kontrol',
        'durum': 'Bekliyor',
        'tur': 'Kedi',
        'not': 'Yıllık kontrol',
      },
      {
        'id': 2,
        'hayvanAd': 'Karabaş',
        'sahipAd': 'Mehmet Demir',
        'saat': '11:00',
        'tip': 'Aşı',
        'durum': 'Bekliyor',
        'tur': 'Köpek',
        'not': 'Kuduz aşısı',
      },
      {
        'id': 3,
        'hayvanAd': 'Sarı',
        'sahipAd': 'Zeynep Kaya',
        'saat': '14:15',
        'tip': 'Kontrol',
        'durum': 'Bekliyor',
        'tur': 'Kuş',
        'not': 'Tüy dökme sorunu',
      },
    ];
    
    // Saha ziyaretleri
    _sahaZiyaretleri = [
      {
        'id': 1,
        'yer': 'Yeşil Çiftlik',
        'saat': '13:00',
        'hayvanSayisi': 25,
        'tip': 'Sığır aşılama',
        'durum': 'Planlandı',
        'adres': 'Çamlık Köyü, Merkez',
      },
      {
        'id': 2,
        'yer': 'Doğa Çiftliği',
        'saat': 'Yarın, 10:00',
        'hayvanSayisi': 12,
        'tip': 'Genel kontrol',
        'durum': 'Planlandı',
        'adres': 'Yeşilova Köyü, Merkez',
      },
    ];
    
    // Acil vakalar
    _acilVakalar = [
      {
        'id': 1,
        'hayvanAd': 'Max',
        'sahipAd': 'Ali Can',
        'saat': '08:15',
        'tip': 'Kaza',
        'durum': 'Tedavi Edildi',
        'tur': 'Köpek',
        'not': 'Araç çarpması, bacak yaralanması',
      },
    ];
    
    // İstatistikler
    _istatistikler['bugünRandevu'] = _bugunRandevular.length;
    _istatistikler['bekleyenRandevu'] = 8;
    _istatistikler['haftalıkRandevu'] = 22;
    _istatistikler['tamamlananMuayene'] = 156;
    _istatistikler['planlanmışAşı'] = 18;
    _istatistikler['sahaZiyareti'] = _sahaZiyaretleri.length;
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_errorMessage.isNotEmpty) {
      return Center(
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
      );
    }

    return RefreshIndicator(
      onRefresh: _fetchData,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Karşılama kartı
            _buildWelcomeCard(),
            
            const SizedBox(height: 24),
            
            // İstatistikler
            _buildStatisticsSection(),
            
            const SizedBox(height: 24),
            
            // Bugünkü randevular
            _buildTodayAppointments(),
            
            const SizedBox(height: 24),
            
            // Saha ziyaretleri
            _buildFieldVisits(),
            
            const SizedBox(height: 24),
            
            // Acil vakalar
            _buildEmergencyCases(),
            
            const SizedBox(height: 24),
            
            // Hızlı işlemler
            _buildQuickActions(),
          ],
        ),
      ),
    );
  }

  Widget _buildWelcomeCard() {
    // Günün saatine göre karşılama mesajı
    final hour = DateTime.now().hour;
    String greeting;
    
    if (hour < 12) {
      greeting = 'Günaydın';
    } else if (hour < 18) {
      greeting = 'İyi günler';
    } else {
      greeting = 'İyi akşamlar';
    }
    
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: Colors.green.shade100,
              child: const Icon(Icons.person, size: 36, color: Colors.green),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '$greeting, Dr. Mehmet',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Bugün ${_istatistikler['bugünRandevu']} randevunuz ve ${_istatistikler['sahaZiyareti']} saha ziyaretiniz var',
                    style: TextStyle(
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatisticsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'İstatistikler',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          children: [
            _buildStatCard('Bugünkü Randevular', _istatistikler['bugünRandevu']!, Icons.today, Colors.blue),
            _buildStatCard('Bekleyen Randevular', _istatistikler['bekleyenRandevu']!, Icons.watch_later, Colors.orange),
            _buildStatCard('Haftalık Randevular', _istatistikler['haftalıkRandevu']!, Icons.calendar_month, Colors.purple),
            _buildStatCard('Tamamlanan Muayeneler', _istatistikler['tamamlananMuayene']!, Icons.check_circle, Colors.green),
            _buildStatCard('Planlanmış Aşılar', _istatistikler['planlanmışAşı']!, Icons.vaccines, Colors.amber),
            _buildStatCard('Saha Ziyaretleri', _istatistikler['sahaZiyareti']!, Icons.directions_car, Colors.teal),
          ],
        ),
      ],
    );
  }

  Widget _buildStatCard(String title, int value, IconData icon, Color color) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 32, color: color),
            const SizedBox(height: 8),
            Text(
              value.toString(),
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              title,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTodayAppointments() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Bugünkü Randevular',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => RandevularScreen(userType: 'veteriner'),
                  ),
                ).then((_) => _fetchData());
              },
              child: const Text('Tümünü Gör'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        _bugunRandevular.isEmpty
            ? _buildEmptyCard('Bugün için randevu bulunmuyor', Icons.event_busy)
            : Column(
                children: _bugunRandevular.map((randevu) => _buildAppointmentCard(randevu)).toList(),
              ),
      ],
    );
  }

  Widget _buildFieldVisits() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Saha Ziyaretleri',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.push(
                  context, 
                  MaterialPageRoute(
                    builder: (context) => const SahaZiyaretiScreen(),
                  ),
                ).then((_) => _fetchData());
              },
              child: const Text('Tümünü Gör'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        _sahaZiyaretleri.isEmpty
            ? _buildEmptyCard('Planlanmış saha ziyareti bulunmuyor', Icons.directions_car)
            : Column(
                children: _sahaZiyaretleri.map((ziyaret) => _buildFieldVisitCard(ziyaret)).toList(),
              ),
      ],
    );
  }

  Widget _buildEmergencyCases() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Acil Vakalar',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () {
                // Tüm acil vakaları gösteren sayfaya git
              },
              child: const Text('Tümünü Gör'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        _acilVakalar.isEmpty
            ? _buildEmptyCard('Acil vaka bulunmuyor', Icons.medical_services)
            : Column(
                children: _acilVakalar.map((vaka) => _buildEmergencyCard(vaka)).toList(),
              ),
      ],
    );
  }

  Widget _buildEmptyCard(String message, IconData icon) {
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
          ],
        ),
      ),
    );
  }

  Widget _buildAppointmentCard(Map<String, dynamic> randevu) {
    final Color statusColor = randevu['durum'] == 'Tamamlandı' 
        ? Colors.green 
        : (randevu['durum'] == 'Bekliyor' ? Colors.orange : Colors.blue);
    
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () {
          // Randevu detayına git
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 4,
                height: 80,
                decoration: BoxDecoration(
                  color: statusColor,
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          randevu['saat'] as String,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: statusColor,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: statusColor.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            randevu['durum'] as String,
                            style: TextStyle(
                              color: statusColor,
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${randevu['hayvanAd']} (${randevu['tur']})',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      'Sahip: ${randevu['sahipAd']}',
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 12,
                      ),
                    ),
                    Text(
                      'Not: ${randevu['not']}',
                      style: const TextStyle(
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: _getTypeColor(randevu['tip'] as String).withOpacity(0.2),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      _getTypeIcon(randevu['tip'] as String),
                      color: _getTypeColor(randevu['tip'] as String),
                      size: 20,
                    ),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    width: 60,
                    child: Text(
                      randevu['tip'] as String,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 10,
                        color: Colors.grey[700],
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFieldVisitCard(Map<String, dynamic> ziyaret) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context, 
            MaterialPageRoute(
              builder: (context) => const SahaZiyaretiScreen(),
            ),
          ).then((_) => _fetchData());
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    ziyaret['yer'] as String,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.teal.shade100,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      ziyaret['durum'] as String,
                      style: TextStyle(
                        color: Colors.teal.shade700,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
              const Divider(height: 24),
              Row(
                children: [
                  const Icon(Icons.access_time, size: 16, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text(
                    ziyaret['saat'] as String,
                    style: TextStyle(color: Colors.grey[600]),
                  ),
                  const SizedBox(width: 16),
                  const Icon(Icons.pets, size: 16, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text(
                    '${ziyaret['hayvanSayisi']} hayvan',
                    style: TextStyle(color: Colors.grey[600]),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.info_outline, size: 16, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text(
                    ziyaret['tip'] as String,
                    style: TextStyle(color: Colors.grey[600]),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.location_on, size: 16, color: Colors.grey),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      ziyaret['adres'] as String,
                      style: TextStyle(color: Colors.grey[600]),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton.icon(
                    onPressed: () {
                      // Haritada göster
                    },
                    icon: const Icon(Icons.map, size: 18),
                    label: const Text('Haritada Göster'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildEmergencyCard(Map<String, dynamic> vaka) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: vaka['durum'] == 'Bekliyor' ? Colors.red.shade50 : null,
      child: InkWell(
        onTap: () {
          // Acil vaka detayına git
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.emergency,
                    color: vaka['durum'] == 'Bekliyor' ? Colors.red : Colors.orange,
                    size: 24,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Acil: ${vaka['tip']}',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: vaka['durum'] == 'Bekliyor' ? Colors.red : Colors.orange,
                    ),
                  ),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: vaka['durum'] == 'Bekliyor' 
                          ? Colors.red.shade100
                          : vaka['durum'] == 'Tedavi Edildi'
                              ? Colors.green.shade100
                              : Colors.orange.shade100,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      vaka['durum'] as String,
                      style: TextStyle(
                        color: vaka['durum'] == 'Bekliyor' 
                            ? Colors.red
                            : vaka['durum'] == 'Tedavi Edildi'
                                ? Colors.green
                                : Colors.orange,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
              const Divider(height: 24),
              Text(
                '${vaka['hayvanAd']} (${vaka['tur']})',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Sahip: ${vaka['sahipAd']}',
                style: TextStyle(
                  color: Colors.grey[600],
                  fontSize: 12,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Not: ${vaka['not']}',
                style: const TextStyle(
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton.icon(
                    onPressed: () {
                      // Muayene sayfasına git
                    },
                    icon: const Icon(Icons.medical_services, size: 18),
                    label: const Text('Muayene Et'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickActions() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Hızlı İşlemler',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildActionButton('Muayene Başlat', Icons.medical_services, Colors.blue, () {
              // Muayene başlat sayfasına git
            }),
            _buildActionButton('Saha Ziyareti', Icons.directions_car, Colors.teal, () {
              Navigator.push(
                context, 
                MaterialPageRoute(
                  builder: (context) => const SahaZiyaretiScreen(),
                ),
              ).then((_) => _fetchData());
            }),
            _buildActionButton('Randevu Ekle', Icons.event_note, Colors.purple, () {
              // Randevu ekleme sayfasına git
            }),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildActionButton('Hasta Kayıt', Icons.pets, Colors.orange, () {
              // Hasta kayıt sayfasına git
            }),
            _buildActionButton('Büyükbaş Küpe', Icons.qr_code, Colors.deepOrange, () {
              // Büyükbaş küpe sayfasına git
              Navigator.push(
                context, 
                MaterialPageRoute(
                  builder: (context) => const BuyukbasKupeScreen(),
                ),
              ).then((_) => _fetchData());
            }),
            _buildActionButton('Raporlar', Icons.bar_chart, Colors.green, () {
              // Raporlar sayfasına git
            }),
          ],
        ),
      ],
    );
  }

  Widget _buildActionButton(String label, IconData icon, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Container(
        width: 100,
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            CircleAvatar(
              radius: 24,
              backgroundColor: color.withOpacity(0.2),
              child: Icon(icon, color: color),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }

  Color _getTypeColor(String type) {
    switch (type) {
      case 'Kontrol':
        return Colors.blue;
      case 'Aşı':
        return Colors.green;
      case 'Tedavi':
        return Colors.orange;
      case 'Ameliyat':
        return Colors.red;
      case 'Acil':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }

  IconData _getTypeIcon(String type) {
    switch (type) {
      case 'Kontrol':
        return Icons.search;
      case 'Aşı':
        return Icons.vaccines;
      case 'Tedavi':
        return Icons.medication;
      case 'Ameliyat':
        return Icons.medical_services;
      case 'Acil':
        return Icons.emergency;
      default:
        return Icons.pets;
    }
  }
} 