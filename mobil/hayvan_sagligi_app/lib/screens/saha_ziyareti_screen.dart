import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../services/service_provider.dart';

class SahaZiyaretiScreen extends StatefulWidget {
  const SahaZiyaretiScreen({super.key});

  @override
  State<SahaZiyaretiScreen> createState() => _SahaZiyaretiScreenState();
}

class _SahaZiyaretiScreenState extends State<SahaZiyaretiScreen> with SingleTickerProviderStateMixin {
  final _apiService = ServiceProvider().apiService;
  late TabController _tabController;
  bool _isLoading = true;
  String _errorMessage = '';
  
  // Ziyaret listeleri
  List<Map<String, dynamic>> _aktifZiyaretler = [];
  List<Map<String, dynamic>> _planlanmisZiyaretler = [];
  List<Map<String, dynamic>> _tamamlananZiyaretler = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _fetchData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _fetchData() async {
    try {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });

      // Mock veri oluştur
      _loadMockData();

      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Veri yüklenemedi: $e';
        _isLoading = false;
      });
    }
  }

  void _loadMockData() {
    // Aktif ziyaretler
    _aktifZiyaretler = [
      {
        'id': 1,
        'yer': 'Yeşil Çiftlik',
        'tarih': DateTime.now(),
        'saat': '13:00',
        'durum': 'Aktif',
        'hayvanTuru': 'Sığır',
        'hayvanSayisi': 25,
        'not': 'Aşılama ve genel kontrol',
        'sahip': 'Ali Yılmaz',
        'telefon': '05551234567',
        'adres': 'Çamlık Köyü, Merkez',
        'enlem': 39.925018,
        'boylam': 32.836956,
      },
    ];

    // Planlanmış ziyaretler
    _planlanmisZiyaretler = [
      {
        'id': 2,
        'yer': 'Doğa Çiftliği',
        'tarih': DateTime.now().add(const Duration(days: 1)),
        'saat': '10:00',
        'durum': 'Planlandı',
        'hayvanTuru': 'Koyun',
        'hayvanSayisi': 40,
        'not': 'Yıllık kontrol',
        'sahip': 'Mehmet Demir',
        'telefon': '05559876543',
        'adres': 'Yeşilova Köyü, Merkez',
        'enlem': 39.935018,
        'boylam': 32.826956,
      },
      {
        'id': 3,
        'yer': 'Bereket Çiftliği',
        'tarih': DateTime.now().add(const Duration(days: 3)),
        'saat': '11:30',
        'durum': 'Planlandı',
        'hayvanTuru': 'Keçi',
        'hayvanSayisi': 15,
        'not': 'Aşılama',
        'sahip': 'Ayşe Yıldız',
        'telefon': '05557891234',
        'adres': 'Gülveren Köyü, Merkez',
        'enlem': 39.915018,
        'boylam': 32.856956,
      },
    ];

    // Tamamlanan ziyaretler
    _tamamlananZiyaretler = [
      {
        'id': 4,
        'yer': 'Mavi Çiftlik',
        'tarih': DateTime.now().subtract(const Duration(days: 2)),
        'saat': '14:00',
        'durum': 'Tamamlandı',
        'hayvanTuru': 'Sığır',
        'hayvanSayisi': 30,
        'not': 'Brucella aşılaması yapıldı',
        'sahip': 'Hasan Kaya',
        'telefon': '05553456789',
        'adres': 'Aktepe Köyü, Merkez',
        'enlem': 39.945018,
        'boylam': 32.846956,
        'rapor': 'Tüm hayvanlar sağlıklı durumda. Aşılama tamamlandı.',
      },
      {
        'id': 5,
        'yer': 'Yıldız Çiftliği',
        'tarih': DateTime.now().subtract(const Duration(days: 5)),
        'saat': '09:30',
        'durum': 'Tamamlandı',
        'hayvanTuru': 'Koyun',
        'hayvanSayisi': 50,
        'not': 'Genel kontrol',
        'sahip': 'Fatma Şahin',
        'telefon': '05552345678',
        'adres': 'Yenimahalle, Merkez',
        'enlem': 39.955018,
        'boylam': 32.866956,
        'rapor': '3 hayvanda ateş tespit edildi. Antibiyotik tedavisi başlandı.',
      },
    ];
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Saha Ziyaretleri'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Saha Ziyaretleri'),
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
        title: const Text('Saha Ziyaretleri'),
        actions: [
          IconButton(
            icon: const Icon(Icons.sync),
            onPressed: _fetchData,
            tooltip: 'Yenile',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Aktif'),
            Tab(text: 'Planlanmış'),
            Tab(text: 'Tamamlanan'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Aktif ziyaretler
          _buildVisitList(_aktifZiyaretler, 'Aktif ziyaret bulunmuyor'),
          
          // Planlanmış ziyaretler
          _buildVisitList(_planlanmisZiyaretler, 'Planlanmış ziyaret bulunmuyor'),
          
          // Tamamlanan ziyaretler
          _buildVisitList(_tamamlananZiyaretler, 'Tamamlanan ziyaret bulunmuyor'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _showAddVisitDialog();
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildVisitList(List<Map<String, dynamic>> visits, String emptyMessage) {
    if (visits.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.directions_car_filled, size: 64, color: Colors.grey),
            const SizedBox(height: 16),
            Text(emptyMessage),
          ],
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _fetchData,
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: visits.length,
        itemBuilder: (context, index) {
          final visit = visits[index];
          return _buildVisitCard(visit);
        },
      ),
    );
  }

  Widget _buildVisitCard(Map<String, dynamic> visit) {
    final date = visit['tarih'] as DateTime;
    final formattedDate = DateFormat('dd/MM/yyyy').format(date);
    
    Color statusColor;
    switch (visit['durum']) {
      case 'Aktif':
        statusColor = Colors.blue;
        break;
      case 'Planlandı':
        statusColor = Colors.orange;
        break;
      case 'Tamamlandı':
        statusColor = Colors.green;
        break;
      default:
        statusColor = Colors.grey;
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () {
          _showVisitDetailsDialog(visit);
        },
        borderRadius: BorderRadius.circular(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              decoration: BoxDecoration(
                color: statusColor.withOpacity(0.1),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
              ),
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: statusColor.withOpacity(0.2),
                    child: Icon(
                      Icons.directions_car,
                      color: statusColor,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          visit['yer'] as String,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '$formattedDate ${visit['saat']}',
                          style: TextStyle(
                            color: Colors.grey[700],
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: statusColor.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      visit['durum'] as String,
                      style: TextStyle(
                        color: statusColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.pets, size: 16, color: Colors.grey[600]),
                      const SizedBox(width: 8),
                      Text(
                        '${visit['hayvanTuru']} - ${visit['hayvanSayisi']} adet',
                        style: TextStyle(
                          color: Colors.grey[800],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(Icons.person, size: 16, color: Colors.grey[600]),
                      const SizedBox(width: 8),
                      Text(
                        visit['sahip'] as String,
                        style: TextStyle(
                          color: Colors.grey[800],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(Icons.location_on, size: 16, color: Colors.grey[600]),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          visit['adres'] as String,
                          style: TextStyle(
                            color: Colors.grey[800],
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      if (visit['durum'] == 'Aktif' || visit['durum'] == 'Planlandı')
                        TextButton.icon(
                          onPressed: () {
                            // Navigasyon başlat
                          },
                          icon: const Icon(Icons.navigation, size: 18),
                          label: const Text('Yol Tarifi'),
                        ),
                      const SizedBox(width: 8),
                      if (visit['durum'] == 'Aktif')
                        TextButton.icon(
                          onPressed: () {
                            _showCompleteVisitDialog(visit);
                          },
                          icon: const Icon(Icons.check_circle, size: 18),
                          label: const Text('Tamamla'),
                        ),
                      if (visit['durum'] == 'Planlandı')
                        TextButton.icon(
                          onPressed: () {
                            _showStartVisitDialog(visit);
                          },
                          icon: const Icon(Icons.play_circle, size: 18),
                          label: const Text('Başlat'),
                        ),
                      if (visit['durum'] == 'Tamamlandı')
                        TextButton.icon(
                          onPressed: () {
                            _showReportDialog(visit);
                          },
                          icon: const Icon(Icons.description, size: 18),
                          label: const Text('Rapor'),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showVisitDetailsDialog(Map<String, dynamic> visit) {
    final date = visit['tarih'] as DateTime;
    final formattedDate = DateFormat('dd/MM/yyyy').format(date);
    
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(visit['yer'] as String),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                _buildDetailRow('Durum', visit['durum']),
                _buildDetailRow('Tarih', formattedDate),
                _buildDetailRow('Saat', visit['saat']),
                _buildDetailRow('Hayvan Türü', visit['hayvanTuru']),
                _buildDetailRow('Hayvan Sayısı', visit['hayvanSayisi'].toString()),
                _buildDetailRow('Not', visit['not']),
                _buildDetailRow('Çiftlik Sahibi', visit['sahip']),
                _buildDetailRow('Telefon', visit['telefon']),
                _buildDetailRow('Adres', visit['adres']),
                if (visit['rapor'] != null)
                  _buildDetailRow('Rapor', visit['rapor']),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Kapat'),
            ),
            if (visit['durum'] == 'Aktif')
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  _showCompleteVisitDialog(visit);
                },
                child: const Text('Tamamla'),
              ),
            if (visit['durum'] == 'Planlandı')
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  _showStartVisitDialog(visit);
                },
                child: const Text('Başlat'),
              ),
          ],
        );
      },
    );
  }

  void _showStartVisitDialog(Map<String, dynamic> visit) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Ziyareti Başlat'),
          content: Text('${visit['yer']} ziyaretini başlatmak istiyor musunuz?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('İptal'),
            ),
            TextButton(
              onPressed: () {
                // Ziyareti başlat
                setState(() {
                  visit['durum'] = 'Aktif';
                  _planlanmisZiyaretler.remove(visit);
                  _aktifZiyaretler.add(visit);
                });
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Ziyaret başlatıldı'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
              child: const Text('Başlat'),
            ),
          ],
        );
      },
    );
  }

  void _showCompleteVisitDialog(Map<String, dynamic> visit) {
    final _raporController = TextEditingController();
    
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Ziyareti Tamamla'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('${visit['yer']} ziyaretini tamamlamak istiyor musunuz?'),
              const SizedBox(height: 16),
              const Text('Ziyaret Raporu:'),
              const SizedBox(height: 8),
              TextField(
                controller: _raporController,
                maxLines: 4,
                decoration: const InputDecoration(
                  hintText: 'Ziyaret hakkında notlar ve gözlemler...',
                  border: OutlineInputBorder(),
                ),
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
            TextButton(
              onPressed: () {
                // Ziyareti tamamla
                setState(() {
                  visit['durum'] = 'Tamamlandı';
                  visit['rapor'] = _raporController.text;
                  _aktifZiyaretler.remove(visit);
                  _tamamlananZiyaretler.add(visit);
                });
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Ziyaret tamamlandı'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
              child: const Text('Tamamla'),
            ),
          ],
        );
      },
    );
  }

  void _showReportDialog(Map<String, dynamic> visit) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('${visit['yer']} Raporu'),
          content: Text(visit['rapor'] ?? 'Rapor bulunmuyor'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Kapat'),
            ),
          ],
        );
      },
    );
  }

  void _showAddVisitDialog() {
    final _yerController = TextEditingController();
    final _hayvanTuruController = TextEditingController();
    final _hayvanSayisiController = TextEditingController();
    final _notController = TextEditingController();
    final _sahipController = TextEditingController();
    final _telefonController = TextEditingController();
    final _adresController = TextEditingController();
    
    DateTime _seciliTarih = DateTime.now().add(const Duration(days: 1));
    TimeOfDay _seciliSaat = const TimeOfDay(hour: 10, minute: 0);
    
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Yeni Saha Ziyareti'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: _yerController,
                  decoration: const InputDecoration(
                    labelText: 'Çiftlik/Yer Adı',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: Text('Tarih: ${DateFormat('dd/MM/yyyy').format(_seciliTarih)}'),
                    ),
                    IconButton(
                      icon: const Icon(Icons.calendar_today),
                      onPressed: () async {
                        final picked = await showDatePicker(
                          context: context,
                          initialDate: _seciliTarih,
                          firstDate: DateTime.now(),
                          lastDate: DateTime.now().add(const Duration(days: 90)),
                        );
                        if (picked != null) {
                          _seciliTarih = picked;
                        }
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: Text('Saat: ${_seciliSaat.format(context)}'),
                    ),
                    IconButton(
                      icon: const Icon(Icons.access_time),
                      onPressed: () async {
                        final picked = await showTimePicker(
                          context: context,
                          initialTime: _seciliSaat,
                        );
                        if (picked != null) {
                          _seciliSaat = picked;
                        }
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _hayvanTuruController,
                  decoration: const InputDecoration(
                    labelText: 'Hayvan Türü',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _hayvanSayisiController,
                  decoration: const InputDecoration(
                    labelText: 'Hayvan Sayısı',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _sahipController,
                  decoration: const InputDecoration(
                    labelText: 'Çiftlik Sahibi',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _telefonController,
                  decoration: const InputDecoration(
                    labelText: 'Telefon',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.phone,
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _adresController,
                  decoration: const InputDecoration(
                    labelText: 'Adres',
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 2,
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _notController,
                  decoration: const InputDecoration(
                    labelText: 'Not',
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 3,
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('İptal'),
            ),
            TextButton(
              onPressed: () {
                // Yeni ziyaret ekle
                if (_yerController.text.isEmpty || 
                    _hayvanTuruController.text.isEmpty ||
                    _hayvanSayisiController.text.isEmpty ||
                    _sahipController.text.isEmpty ||
                    _adresController.text.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Lütfen zorunlu alanları doldurun'),
                      backgroundColor: Colors.red,
                    ),
                  );
                  return;
                }
                
                final yeniZiyaret = {
                  'id': DateTime.now().millisecondsSinceEpoch,
                  'yer': _yerController.text,
                  'tarih': _seciliTarih,
                  'saat': '${_seciliSaat.hour.toString().padLeft(2, '0')}:${_seciliSaat.minute.toString().padLeft(2, '0')}',
                  'durum': 'Planlandı',
                  'hayvanTuru': _hayvanTuruController.text,
                  'hayvanSayisi': int.tryParse(_hayvanSayisiController.text) ?? 0,
                  'not': _notController.text,
                  'sahip': _sahipController.text,
                  'telefon': _telefonController.text,
                  'adres': _adresController.text,
                  'enlem': 39.925018,
                  'boylam': 32.836956,
                };
                
                setState(() {
                  _planlanmisZiyaretler.add(yeniZiyaret);
                });
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Yeni ziyaret eklendi'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
              child: const Text('Ekle'),
            ),
          ],
        );
      },
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.grey[600],
              fontSize: 12,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: const TextStyle(
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }
} 