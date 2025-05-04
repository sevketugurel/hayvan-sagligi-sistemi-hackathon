import 'package:flutter/material.dart';
import '../services/service_provider.dart';
import '../models/hayvan.dart';
import 'hayvan_detay_sahip_screen.dart';
import 'randevu_olustur_screen.dart';

class SahipAnaSayfaScreen extends StatefulWidget {
  const SahipAnaSayfaScreen({super.key});

  @override
  State<SahipAnaSayfaScreen> createState() => _SahipAnaSayfaScreenState();
}

class _SahipAnaSayfaScreenState extends State<SahipAnaSayfaScreen> {
  final _apiService = ServiceProvider().apiService;
  bool _isLoading = true;
  String _errorMessage = '';
  List<Hayvan> _hayvanlarim = [];
  List<Map<String, dynamic>> _yaklasanRandevular = [];

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

      // Sahibin hayvanlarını getir (Mock veri için filtreleme)
      final hayvanlar = await _apiService.getHayvanlar();
      final sahipId = 1; // Demo için sabit bir sahip ID'si
      _hayvanlarim = hayvanlar.where((h) => h.sahipId == sahipId).toList();

      // Yaklaşan randevuları temsil eden demo veriler
      _yaklasanRandevular = [
        {
          'id': 1,
          'hayvanAd': _hayvanlarim.isNotEmpty ? _hayvanlarim[0].ad : 'Bilinmeyen',
          'tarih': DateTime.now().add(const Duration(days: 2)),
          'saat': '14:30',
          'durum': 'Onaylandı',
          'veteriner': 'Dr. Mehmet Öz',
          'not': 'Yıllık kontrol',
        },
        {
          'id': 2,
          'hayvanAd': _hayvanlarim.length > 1 ? _hayvanlarim[1].ad : (_hayvanlarim.isNotEmpty ? _hayvanlarim[0].ad : 'Bilinmeyen'),
          'tarih': DateTime.now().add(const Duration(days: 5)),
          'saat': '10:15',
          'durum': 'Beklemede',
          'veteriner': 'Dr. Ayşe Yılmaz',
          'not': 'Aşı randevusu',
        },
      ];

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
            
            // Hayvanlarım özeti
            _buildPetsSection(),
            
            const SizedBox(height: 24),
            
            // Yaklaşan randevular
            _buildUpcomingAppointments(),
            
            const SizedBox(height: 24),
            
            // Hızlı işlemler
            _buildQuickActions(),
          ],
        ),
      ),
    );
  }

  Widget _buildWelcomeCard() {
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
                  const Text(
                    'Hoş Geldiniz, Ahmet Bey',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    '${_hayvanlarim.length} hayvanınız ve ${_yaklasanRandevular.length} yaklaşan randevunuz var',
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

  Widget _buildPetsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Hayvanlarım',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () {
                // Tüm hayvanları gösteren sayfaya git
              },
              child: const Text('Tümünü Gör'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        _hayvanlarim.isEmpty
            ? _buildNoPetsCard()
            : SizedBox(
                height: 150,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _hayvanlarim.length,
                  itemBuilder: (context, index) {
                    final hayvan = _hayvanlarim[index];
                    return _buildPetCard(hayvan);
                  },
                ),
              ),
      ],
    );
  }

  Widget _buildNoPetsCard() {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Icon(Icons.pets, size: 48, color: Colors.grey),
            const SizedBox(height: 8),
            const Text(
              'Henüz kayıtlı hayvanınız bulunmuyor',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: () {
                // Hayvan ekleme sayfasına git
              },
              child: const Text('Hayvan Ekle'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPetCard(Hayvan hayvan) {
    return GestureDetector(
      onTap: () {
        // Hayvan detayına git
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => HayvanDetaySahipScreen(hayvanId: hayvan.id!),
          ),
        ).then((_) => _fetchData());
      },
      child: Container(
        width: 140,
        margin: const EdgeInsets.only(right: 12),
        child: Card(
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircleAvatar(
                  radius: 32,
                  backgroundColor: _getColorForAnimalType(hayvan.tur),
                  child: Text(
                    hayvan.ad.isNotEmpty ? hayvan.ad[0].toUpperCase() : '?',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 24),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  hayvan.ad,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  hayvan.tur,
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey[600], fontSize: 12),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildUpcomingAppointments() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Yaklaşan Randevular',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () {
                // Tüm randevuları gösteren sayfaya git
              },
              child: const Text('Tümünü Gör'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        _yaklasanRandevular.isEmpty
            ? _buildNoAppointmentsCard()
            : Column(
                children: _yaklasanRandevular.map((randevu) => _buildAppointmentCard(randevu)).toList(),
              ),
      ],
    );
  }

  Widget _buildNoAppointmentsCard() {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Icon(Icons.calendar_today, size: 48, color: Colors.grey),
            const SizedBox(height: 8),
            const Text(
              'Yaklaşan randevunuz bulunmuyor',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const RandevuOlusturScreen(),
                  ),
                ).then((_) => _fetchData());
              },
              child: const Text('Randevu Al'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAppointmentCard(Map<String, dynamic> randevu) {
    final tarih = randevu['tarih'] as DateTime;
    final bugun = DateTime.now();
    final fark = tarih.difference(bugun).inDays;
    
    String tarihMetni;
    if (fark == 0) {
      tarihMetni = 'Bugün';
    } else if (fark == 1) {
      tarihMetni = 'Yarın';
    } else {
      tarihMetni = '${fark} gün sonra';
    }

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
                CircleAvatar(
                  backgroundColor: randevu['durum'] == 'Onaylandı' ? Colors.green.shade100 : Colors.orange.shade100,
                  child: Icon(
                    Icons.calendar_today,
                    color: randevu['durum'] == 'Onaylandı' ? Colors.green : Colors.orange,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${randevu['hayvanAd']} - ${randevu['not']}',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        randevu['veteriner'],
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: randevu['durum'] == 'Onaylandı' ? Colors.green.shade100 : Colors.orange.shade100,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    randevu['durum'],
                    style: TextStyle(
                      color: randevu['durum'] == 'Onaylandı' ? Colors.green : Colors.orange,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const Divider(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Tarih ve Saat',
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 12,
                      ),
                    ),
                    Text(
                      '${tarih.day}/${tarih.month}/${tarih.year} ${randevu['saat']}',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      tarihMetni,
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.edit, color: Colors.blue),
                      onPressed: () {
                        // Randevu düzenleme
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete, color: Colors.red),
                      onPressed: () {
                        // Randevu iptal etme
                      },
                    ),
                  ],
                ),
              ],
            ),
          ],
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
            _buildActionButton('Randevu Al', Icons.calendar_today, Colors.green, () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const RandevuOlusturScreen(),
                ),
              ).then((_) => _fetchData());
            }),
            _buildActionButton('Sağlık Geçmişi', Icons.medical_services, Colors.blue, () {
              // Sağlık geçmişi sayfasına git
            }),
            _buildActionButton('Aşı Takvimi', Icons.event_note, Colors.purple, () {
              // Aşı takvimi sayfasına git
            }),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildActionButton('Hayvan Ekle', Icons.add_circle, Colors.orange, () {
              // Hayvan ekleme sayfasına git
            }),
            _buildActionButton('Veterinerler', Icons.local_hospital, Colors.teal, () {
              // Veterinerler listesi sayfasına git
            }),
            _buildActionButton('Yardım', Icons.help, Colors.grey, () {
              // Yardım sayfasına git
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