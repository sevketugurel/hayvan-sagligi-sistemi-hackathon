import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../services/service_provider.dart';

class AsiTakipScreen extends StatefulWidget {
  const AsiTakipScreen({super.key});

  @override
  State<AsiTakipScreen> createState() => _AsiTakipScreenState();
}

class _AsiTakipScreenState extends State<AsiTakipScreen> with SingleTickerProviderStateMixin {
  final _apiService = ServiceProvider().apiService;
  late TabController _tabController;
  bool _isLoading = true;
  String _errorMessage = '';
  
  // Aşı listeleri
  List<Map<String, dynamic>> _bugunAsilar = [];
  List<Map<String, dynamic>> _yaklasanAsilar = [];
  List<Map<String, dynamic>> _gecmisAsilar = [];
  
  // Filtreler
  String _selectedHayvanTuru = 'Tümü';
  final List<String> _hayvanTurleri = ['Tümü', 'Kedi', 'Köpek', 'Kuş', 'Sığır', 'Koyun', 'Keçi'];

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
      
      _filterData();

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
    // Ortak aşı verileri
    final List<Map<String, dynamic>> tumAsilar = [
      {
        'id': 1,
        'hayvanAd': 'Pamuk',
        'hayvanTuru': 'Kedi',
        'sahipAd': 'Ahmet Yılmaz',
        'asiAdi': 'Karma Aşı',
        'planTarihi': DateTime.now(),
        'durum': 'Bekliyor',
        'notlar': 'İlk doz',
      },
      {
        'id': 2,
        'hayvanAd': 'Karabaş',
        'hayvanTuru': 'Köpek',
        'sahipAd': 'Mehmet Demir',
        'asiAdi': 'Kuduz Aşısı',
        'planTarihi': DateTime.now(),
        'durum': 'Bekliyor',
        'notlar': 'Yıllık tekrar',
      },
      {
        'id': 3,
        'hayvanAd': 'Tosun',
        'hayvanTuru': 'Sığır',
        'sahipAd': 'Ali Çiftçi',
        'asiAdi': 'Şap Aşısı',
        'planTarihi': DateTime.now().add(const Duration(days: 3)),
        'durum': 'Planlandı',
        'notlar': '',
      },
      {
        'id': 4,
        'hayvanAd': 'Maviş',
        'hayvanTuru': 'Kuş',
        'sahipAd': 'Zeynep Kaya',
        'asiAdi': 'Newcastle Aşısı',
        'planTarihi': DateTime.now().add(const Duration(days: 5)),
        'durum': 'Planlandı',
        'notlar': '',
      },
      {
        'id': 5,
        'hayvanAd': 'Minnoş',
        'hayvanTuru': 'Kedi',
        'sahipAd': 'Ayşe Demir',
        'asiAdi': 'Lösemi Aşısı',
        'planTarihi': DateTime.now().add(const Duration(days: 10)),
        'durum': 'Planlandı',
        'notlar': '',
      },
      {
        'id': 6,
        'hayvanAd': 'Çoban',
        'hayvanTuru': 'Köpek',
        'sahipAd': 'Hüseyin Yıldız',
        'asiAdi': 'Karma Aşı',
        'planTarihi': DateTime.now().subtract(const Duration(days: 5)),
        'yapildigiTarih': DateTime.now().subtract(const Duration(days: 5)),
        'durum': 'Tamamlandı',
        'notlar': '',
        'asiYapanVeteriner': 'Dr. Mehmet Öz',
      },
      {
        'id': 7,
        'hayvanAd': 'Boncuk',
        'hayvanTuru': 'Köpek',
        'sahipAd': 'Fatma Şahin',
        'asiAdi': 'Kuduz Aşısı',
        'planTarihi': DateTime.now().subtract(const Duration(days: 10)),
        'yapildigiTarih': DateTime.now().subtract(const Duration(days: 10)),
        'durum': 'Tamamlandı',
        'notlar': 'Yıllık tekrar',
        'asiYapanVeteriner': 'Dr. Ayşe Demir',
      },
      {
        'id': 8,
        'hayvanAd': 'Sarıkız',
        'hayvanTuru': 'Sığır',
        'sahipAd': 'Mustafa Çiftçi',
        'asiAdi': 'Brucella Aşısı',
        'planTarihi': DateTime.now().subtract(const Duration(days: 15)),
        'yapildigiTarih': DateTime.now().subtract(const Duration(days: 15)),
        'durum': 'Tamamlandı',
        'notlar': '',
        'asiYapanVeteriner': 'Dr. Mehmet Öz',
      },
    ];
    
    // Aşıları kategorize et
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    
    _bugunAsilar = tumAsilar.where((asi) {
      final asiDate = DateTime(asi['planTarihi'].year, asi['planTarihi'].month, asi['planTarihi'].day);
      return asiDate.isAtSameMomentAs(today) && asi['durum'] != 'Tamamlandı';
    }).toList();
    
    _yaklasanAsilar = tumAsilar.where((asi) {
      final asiDate = DateTime(asi['planTarihi'].year, asi['planTarihi'].month, asi['planTarihi'].day);
      return asiDate.isAfter(today) && asi['durum'] != 'Tamamlandı';
    }).toList();
    
    _gecmisAsilar = tumAsilar.where((asi) {
      return asi['durum'] == 'Tamamlandı';
    }).toList();
  }
  
  void _filterData() {
    if (_selectedHayvanTuru == 'Tümü') {
      // Filtreleme yapmaya gerek yok
      return;
    }
    
    // Hayvan türüne göre filtrele
    _bugunAsilar = _bugunAsilar.where((asi) => asi['hayvanTuru'] == _selectedHayvanTuru).toList();
    _yaklasanAsilar = _yaklasanAsilar.where((asi) => asi['hayvanTuru'] == _selectedHayvanTuru).toList();
    _gecmisAsilar = _gecmisAsilar.where((asi) => asi['hayvanTuru'] == _selectedHayvanTuru).toList();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Aşı Takibi'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Aşı Takibi'),
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
        title: const Text('Aşı Takibi'),
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
            Tab(text: 'Bugün'),
            Tab(text: 'Yaklaşan'),
            Tab(text: 'Geçmiş'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Filtre alanı
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                const Text('Hayvan Türü: '),
                const SizedBox(width: 8),
                Expanded(
                  child: DropdownButton<String>(
                    value: _selectedHayvanTuru,
                    isExpanded: true,
                    onChanged: (String? newValue) {
                      if (newValue != null) {
                        setState(() {
                          _selectedHayvanTuru = newValue;
                          _loadMockData(); // Verileri yeniden yükle
                          _filterData(); // Filtreyi uygula
                        });
                      }
                    },
                    items: _hayvanTurleri.map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
          ),
          
          // Tab view
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                // Bugünkü aşılar
                _buildAsiList(_bugunAsilar, 'Bugün yapılacak aşı bulunmuyor'),
                
                // Yaklaşan aşılar
                _buildAsiList(_yaklasanAsilar, 'Yaklaşan aşı bulunmuyor'),
                
                // Geçmiş aşılar
                _buildAsiList(_gecmisAsilar, 'Geçmiş aşı kaydı bulunmuyor'),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _showAddVaccineDialog();
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildAsiList(List<Map<String, dynamic>> asilar, String emptyMessage) {
    if (asilar.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.vaccines, size: 64, color: Colors.grey),
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
        itemCount: asilar.length,
        itemBuilder: (context, index) {
          final asi = asilar[index];
          return _buildAsiCard(asi);
        },
      ),
    );
  }

  Widget _buildAsiCard(Map<String, dynamic> asi) {
    final planTarihi = asi['planTarihi'] as DateTime;
    final formattedPlanTarihi = DateFormat('dd/MM/yyyy').format(planTarihi);
    
    Color statusColor;
    switch (asi['durum']) {
      case 'Bekliyor':
        statusColor = Colors.orange;
        break;
      case 'Planlandı':
        statusColor = Colors.blue;
        break;
      case 'Tamamlandı':
        statusColor = Colors.green;
        break;
      default:
        statusColor = Colors.grey;
    }
    
    Color animalColor = _getColorForAnimalType(asi['hayvanTuru']);

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () {
          // Aşı detayları
          _showVaccineDetailsDialog(asi);
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: animalColor.withOpacity(0.2),
                    child: Text(
                      asi['hayvanAd'][0].toUpperCase(),
                      style: TextStyle(
                        color: animalColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${asi['hayvanAd']} (${asi['hayvanTuru']})',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        Text(
                          'Sahip: ${asi['sahipAd']}',
                          style: TextStyle(
                            color: Colors.grey[600],
                            fontSize: 12,
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
                      asi['durum'],
                      style: TextStyle(
                        color: statusColor,
                        fontWeight: FontWeight.bold,
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
                      Text(
                        asi['asiAdi'],
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(Icons.calendar_today, size: 16, color: Colors.grey),
                          const SizedBox(width: 4),
                          Text(
                            asi['durum'] == 'Tamamlandı'
                                ? 'Yapıldığı tarih: ${DateFormat('dd/MM/yyyy').format(asi['yapildigiTarih'])}'
                                : 'Planlanan tarih: $formattedPlanTarihi',
                            style: TextStyle(
                              color: Colors.grey[600],
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  if (asi['durum'] != 'Tamamlandı')
                    TextButton.icon(
                      onPressed: () {
                        _completeVaccine(asi);
                      },
                      icon: const Icon(Icons.check_circle, size: 18),
                      label: const Text('Yapıldı'),
                    ),
                ],
              ),
              if (asi['notlar'].isNotEmpty) ...[
                const SizedBox(height: 8),
                Text(
                  'Not: ${asi['notlar']}',
                  style: TextStyle(
                    color: Colors.grey[800],
                    fontSize: 14,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ],
              if (asi['durum'] == 'Tamamlandı' && asi['asiYapanVeteriner'] != null) ...[
                const SizedBox(height: 8),
                Text(
                  'Aşıyı Yapan: ${asi['asiYapanVeteriner']}',
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 12,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  void _showVaccineDetailsDialog(Map<String, dynamic> asi) {
    final planTarihi = asi['planTarihi'] as DateTime;
    final formattedPlanTarihi = DateFormat('dd/MM/yyyy').format(planTarihi);
    
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(asi['asiAdi']),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                _buildDetailRow('Hayvan', '${asi['hayvanAd']} (${asi['hayvanTuru']})'),
                _buildDetailRow('Sahip', asi['sahipAd']),
                _buildDetailRow('Durum', asi['durum']),
                _buildDetailRow('Planlanan Tarih', formattedPlanTarihi),
                if (asi['durum'] == 'Tamamlandı')
                  _buildDetailRow('Yapıldığı Tarih', DateFormat('dd/MM/yyyy').format(asi['yapildigiTarih'])),
                if (asi['notlar'].isNotEmpty)
                  _buildDetailRow('Notlar', asi['notlar']),
                if (asi['durum'] == 'Tamamlandı' && asi['asiYapanVeteriner'] != null)
                  _buildDetailRow('Aşıyı Yapan', asi['asiYapanVeteriner']),
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
            if (asi['durum'] != 'Tamamlandı')
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  _completeVaccine(asi);
                },
                child: const Text('Yapıldı İşaretle'),
              ),
          ],
        );
      },
    );
  }

  void _completeVaccine(Map<String, dynamic> asi) {
    showDialog(
      context: context,
      builder: (context) {
        final _notController = TextEditingController(text: asi['notlar']);
        
        return AlertDialog(
          title: const Text('Aşı Yapıldı'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('${asi['hayvanAd']} için ${asi['asiAdi']} yapıldı olarak işaretlensin mi?'),
              const SizedBox(height: 16),
              const Text('Notlar:'),
              const SizedBox(height: 8),
              TextField(
                controller: _notController,
                maxLines: 3,
                decoration: const InputDecoration(
                  hintText: 'Aşı hakkında notlar...',
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
                // Aşıyı tamamla
                setState(() {
                  asi['durum'] = 'Tamamlandı';
                  asi['notlar'] = _notController.text;
                  asi['yapildigiTarih'] = DateTime.now();
                  asi['asiYapanVeteriner'] = 'Dr. Mehmet Öz'; // Giriş yapan veteriner adı
                  
                  if (asi['planTarihi'].day == DateTime.now().day) {
                    _bugunAsilar.remove(asi);
                  } else {
                    _yaklasanAsilar.remove(asi);
                  }
                  
                  _gecmisAsilar.add(asi);
                });
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Aşı yapıldı olarak işaretlendi'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
              child: const Text('Kaydet'),
            ),
          ],
        );
      },
    );
  }

  void _showAddVaccineDialog() {
    final _hayvanAdController = TextEditingController();
    final _sahipAdController = TextEditingController();
    final _asiAdiController = TextEditingController();
    final _notlarController = TextEditingController();
    
    String _seciliHayvanTuru = 'Kedi';
    DateTime _seciliTarih = DateTime.now().add(const Duration(days: 1));
    
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Yeni Aşı Planla'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: _hayvanAdController,
                  decoration: const InputDecoration(
                    labelText: 'Hayvan Adı',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: _seciliHayvanTuru,
                  decoration: const InputDecoration(
                    labelText: 'Hayvan Türü',
                    border: OutlineInputBorder(),
                  ),
                  items: ['Kedi', 'Köpek', 'Kuş', 'Sığır', 'Koyun', 'Keçi'].map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (String? newValue) {
                    if (newValue != null) {
                      _seciliHayvanTuru = newValue;
                    }
                  },
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _sahipAdController,
                  decoration: const InputDecoration(
                    labelText: 'Sahip Adı',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _asiAdiController,
                  decoration: const InputDecoration(
                    labelText: 'Aşı Adı',
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
                          lastDate: DateTime.now().add(const Duration(days: 365)),
                        );
                        if (picked != null) {
                          _seciliTarih = picked;
                        }
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _notlarController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    labelText: 'Notlar',
                    border: OutlineInputBorder(),
                  ),
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
                // Yeni aşı ekle
                if (_hayvanAdController.text.isEmpty || 
                    _sahipAdController.text.isEmpty ||
                    _asiAdiController.text.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Lütfen zorunlu alanları doldurun'),
                      backgroundColor: Colors.red,
                    ),
                  );
                  return;
                }
                
                final yeniAsi = {
                  'id': DateTime.now().millisecondsSinceEpoch,
                  'hayvanAd': _hayvanAdController.text,
                  'hayvanTuru': _seciliHayvanTuru,
                  'sahipAd': _sahipAdController.text,
                  'asiAdi': _asiAdiController.text,
                  'planTarihi': _seciliTarih,
                  'durum': 'Planlandı',
                  'notlar': _notlarController.text,
                };
                
                setState(() {
                  final now = DateTime.now();
                  final today = DateTime(now.year, now.month, now.day);
                  final asiDate = DateTime(_seciliTarih.year, _seciliTarih.month, _seciliTarih.day);
                  
                  if (asiDate.isAtSameMomentAs(today)) {
                    yeniAsi['durum'] = 'Bekliyor';
                    _bugunAsilar.add(yeniAsi);
                  } else {
                    _yaklasanAsilar.add(yeniAsi);
                  }
                });
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Yeni aşı planlandı'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
              child: const Text('Kaydet'),
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

  Color _getColorForAnimalType(String tur) {
    switch (tur.toLowerCase()) {
      case 'kedi':
        return Colors.orange;
      case 'köpek':
        return Colors.brown;
      case 'kuş':
        return Colors.blue;
      case 'sığır':
        return Colors.green;
      case 'koyun':
        return Colors.lightBlue;
      case 'keçi':
        return Colors.teal;
      default:
        return Colors.purple;
    }
  }
} 