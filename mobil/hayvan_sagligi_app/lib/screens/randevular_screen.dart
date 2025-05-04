import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class RandevularScreen extends StatefulWidget {
  final String userType;
  
  const RandevularScreen({
    super.key,
    required this.userType,
  });

  @override
  State<RandevularScreen> createState() => _RandevularScreenState();
}

class _RandevularScreenState extends State<RandevularScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isLoading = false;
  DateTime _selectedDate = DateTime.now();
  
  // Demo veri
  final List<Map<String, dynamic>> _randevular = [
    {
      'id': 1,
      'hayvanAd': 'Tekir',
      'sahipAd': 'Ahmet Yılmaz',
      'tarih': DateTime.now().add(const Duration(hours: 2)),
      'durum': 'Bekliyor',
      'tip': 'Kontrol',
      'not': 'İlk muayene',
    },
    {
      'id': 2,
      'hayvanAd': 'Karabaş',
      'sahipAd': 'Mehmet Öz',
      'tarih': DateTime.now().add(const Duration(hours: 4)),
      'durum': 'Bekliyor',
      'tip': 'Aşı',
      'not': 'Yıllık aşı zamanı',
    },
    {
      'id': 3,
      'hayvanAd': 'Pamuk',
      'sahipAd': 'Ayşe Demir',
      'tarih': DateTime.now().subtract(const Duration(hours: 2)),
      'durum': 'Tamamlandı',
      'tip': 'Acil',
      'not': 'Kaza geçirmiş',
    },
    {
      'id': 4,
      'hayvanAd': 'Zeytin',
      'sahipAd': 'Fatma Şen',
      'tarih': DateTime.now().subtract(const Duration(hours: 5)),
      'durum': 'Tamamlandı',
      'tip': 'Ameliyat',
      'not': 'Diş çekimi',
    },
  ];
  
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }
  
  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
  
  List<Map<String, dynamic>> get _todayRandevular {
    return _randevular.where((r) {
      final randevuTarih = r['tarih'] as DateTime;
      return randevuTarih.day == _selectedDate.day &&
          randevuTarih.month == _selectedDate.month &&
          randevuTarih.year == _selectedDate.year;
    }).toList();
  }
  
  List<Map<String, dynamic>> get _bekleyenRandevular {
    return _randevular.where((r) => 
      r['durum'] == 'Bekliyor' && 
      (r['tarih'] as DateTime).isAfter(DateTime.now())
    ).toList();
  }
  
  List<Map<String, dynamic>> get _tamamlananRandevular {
    return _randevular.where((r) => 
      r['durum'] == 'Tamamlandı'
    ).toList();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.userType == 'veteriner' ? 'Randevular' : 'Muayenelerim'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Bugün'),
            Tab(text: 'Bekleyenler'),
            Tab(text: 'Tamamlananlar'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Bugünkü randevular
          _buildTodayTab(),
          
          // Bekleyen randevular
          _buildWaitingTab(),
          
          // Tamamlanan randevular
          _buildCompletedTab(),
        ],
      ),
      floatingActionButton: widget.userType == 'veteriner' ? FloatingActionButton(
        onPressed: () {
          // Yeni randevu oluştur
          _showNewAppointmentDialog();
        },
        backgroundColor: Colors.green,
        child: const Icon(Icons.add),
      ) : null,
    );
  }
  
  Widget _buildTodayTab() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    
    return Column(
      children: [
        // Tarih seçici
        Container(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back_ios),
                onPressed: () {
                  setState(() {
                    _selectedDate = _selectedDate.subtract(const Duration(days: 1));
                  });
                },
              ),
              GestureDetector(
                onTap: () async {
                  final DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: _selectedDate,
                    firstDate: DateTime.now().subtract(const Duration(days: 365)),
                    lastDate: DateTime.now().add(const Duration(days: 365)),
                  );
                  
                  if (pickedDate != null && pickedDate != _selectedDate) {
                    setState(() {
                      _selectedDate = pickedDate;
                    });
                  }
                },
                child: Column(
                  children: [
                    Text(
                      DateFormat('EEEE').format(_selectedDate),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      DateFormat('d MMMM y').format(_selectedDate),
                      style: const TextStyle(fontSize: 14),
                    ),
                  ],
                ),
              ),
              IconButton(
                icon: const Icon(Icons.arrow_forward_ios),
                onPressed: () {
                  setState(() {
                    _selectedDate = _selectedDate.add(const Duration(days: 1));
                  });
                },
              ),
            ],
          ),
        ),
        
        // Bugünün randevuları
        Expanded(
          child: _todayRandevular.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.event_busy,
                        size: 80,
                        color: Colors.grey,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        '${DateFormat('d MMMM').format(_selectedDate)} tarihinde randevu bulunmamaktadır.',
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  itemCount: _todayRandevular.length,
                  itemBuilder: (context, index) {
                    final randevu = _todayRandevular[index];
                    return _buildAppointmentCard(randevu);
                  },
                ),
        ),
      ],
    );
  }
  
  Widget _buildWaitingTab() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    
    return _bekleyenRandevular.isEmpty
        ? Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Icon(
                  Icons.event_available,
                  size: 80,
                  color: Colors.grey,
                ),
                SizedBox(height: 16),
                Text('Bekleyen randevu bulunmamaktadır.'),
              ],
            ),
          )
        : ListView.builder(
            itemCount: _bekleyenRandevular.length,
            itemBuilder: (context, index) {
              final randevu = _bekleyenRandevular[index];
              return _buildAppointmentCard(randevu);
            },
          );
  }
  
  Widget _buildCompletedTab() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    
    return _tamamlananRandevular.isEmpty
        ? Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Icon(
                  Icons.event_note,
                  size: 80,
                  color: Colors.grey,
                ),
                SizedBox(height: 16),
                Text('Tamamlanan randevu bulunmamaktadır.'),
              ],
            ),
          )
        : ListView.builder(
            itemCount: _tamamlananRandevular.length,
            itemBuilder: (context, index) {
              final randevu = _tamamlananRandevular[index];
              return _buildAppointmentCard(randevu);
            },
          );
  }
  
  Widget _buildAppointmentCard(Map<String, dynamic> randevu) {
    final DateTime randevuTarihi = randevu['tarih'] as DateTime;
    final bool isCompleted = randevu['durum'] == 'Tamamlandı';
    final Color statusColor = isCompleted ? Colors.green : Colors.orange;
    
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () {
          // Randevu detayını göster
          _showAppointmentDetails(randevu);
        },
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    DateFormat('HH:mm').format(randevuTarihi),
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: statusColor.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      randevu['durum'],
                      style: TextStyle(
                        color: statusColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.pets, size: 18, color: Colors.grey),
                  const SizedBox(width: 8),
                  Text(
                    randevu['hayvanAd'],
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 16),
                  const Icon(Icons.person, size: 18, color: Colors.grey),
                  const SizedBox(width: 8),
                  Text(randevu['sahipAd']),
                ],
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: _getAppointmentTypeColor(randevu['tip']).withOpacity(0.2),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Text(
                  randevu['tip'],
                  style: TextStyle(
                    color: _getAppointmentTypeColor(randevu['tip']),
                  ),
                ),
              ),
              if (randevu['not'] != null && randevu['not'].isNotEmpty) ...[
                const SizedBox(height: 8),
                Text(
                  'Not: ${randevu['not']}',
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 14,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
  
  void _showAppointmentDetails(Map<String, dynamic> randevu) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Randevu Detayı',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: randevu['durum'] == 'Tamamlandı' ? Colors.green.withOpacity(0.2) : Colors.orange.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      randevu['durum'],
                      style: TextStyle(
                        color: randevu['durum'] == 'Tamamlandı' ? Colors.green : Colors.orange,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              _buildDetailRow('Hasta', randevu['hayvanAd']),
              _buildDetailRow('Sahibi', randevu['sahipAd']),
              _buildDetailRow('Tarih', DateFormat('d MMMM y, HH:mm').format(randevu['tarih'])),
              _buildDetailRow('Tür', randevu['tip']),
              _buildDetailRow('Not', randevu['not'] ?? '-'),
              const SizedBox(height: 24),
              if (randevu['durum'] == 'Bekliyor' && widget.userType == 'veteriner') ...[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {
                          // Randevuyu iptal et
                          Navigator.pop(context);
                        },
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.red,
                          side: const BorderSide(color: Colors.red),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        child: const Text('İptal Et'),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          // Randevuyu başlat
                          Navigator.pop(context);
                          // Muayene sayfasına yönlendir
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        child: const Text('Muayeneyi Başlat'),
                      ),
                    ),
                  ],
                ),
              ] else if (randevu['durum'] == 'Bekliyor' && widget.userType == 'sahip') ...[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {
                          // Randevuyu iptal et
                          Navigator.pop(context);
                        },
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.red,
                          side: const BorderSide(color: Colors.red),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        child: const Text('İptal Et'),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          // Randevuyu düzenle
                          Navigator.pop(context);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        child: const Text('Düzenle'),
                      ),
                    ),
                  ],
                ),
              ] else ...[
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      // Muayene detaylarını göster
                      Navigator.pop(context);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    child: const Text('Muayene Detayı'),
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
  
  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 80,
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
  
  void _showNewAppointmentDialog() {
    // Basit bir randevu oluşturma diyaloğu
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Yeni Randevu'),
          content: const Text('Bu demo sürümünde randevu oluşturma işlevi henüz tamamlanmamıştır.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Tamam'),
            ),
          ],
        );
      },
    );
  }
  
  Color _getAppointmentTypeColor(String type) {
    switch (type) {
      case 'Kontrol':
        return Colors.blue;
      case 'Aşı':
        return Colors.green;
      case 'Ameliyat':
        return Colors.purple;
      case 'Acil':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
} 