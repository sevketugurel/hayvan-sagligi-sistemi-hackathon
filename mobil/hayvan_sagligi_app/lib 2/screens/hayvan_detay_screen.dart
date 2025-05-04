import 'package:flutter/material.dart';
import '../models/hayvan.dart';
import '../services/api_service.dart';

class HayvanDetayScreen extends StatefulWidget {
  final int hayvanId;
  
  const HayvanDetayScreen({
    super.key,
    required this.hayvanId,
  });

  @override
  State<HayvanDetayScreen> createState() => _HayvanDetayScreenState();
}

class _HayvanDetayScreenState extends State<HayvanDetayScreen> with SingleTickerProviderStateMixin {
  final ApiService _apiService = ApiService();
  late TabController _tabController;
  bool _isLoading = true;
  Hayvan? _hayvan;
  String _errorMessage = '';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
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

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Hasta Detayları'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Hasta Detayları'),
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

    // Demo amaçlı görüntüleme
    final hayvan = _hayvan ?? Hayvan(
      id: widget.hayvanId,
      ad: 'Demo Hayvan',
      cins: 'Demo Cins',
      tur: 'Kedi',
      kilo: 4.5,
      cinsiyet: 'Dişi',
      dogumTarihi: '2021-05-15',
    );

    return Scaffold(
      appBar: AppBar(
        title: Text(hayvan.ad),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {
              // Hayvan düzenleme sayfasına yönlendirme
            },
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Genel Bilgiler'),
            Tab(text: 'Muayeneler'),
            Tab(text: 'Teşhisler'),
            Tab(text: 'Reçeteler'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Genel Bilgiler sekmesi
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildInfoCard(hayvan),
                const SizedBox(height: 16),
                _buildSahipCard(),
                const SizedBox(height: 16),
                _buildSonMuayeneCard(),
              ],
            ),
          ),
          
          // Muayeneler sekmesi
          _buildMuayenelerTab(),
          
          // Teşhisler sekmesi
          _buildTeshislerTab(),
          
          // Reçeteler sekmesi
          _buildRecetelerTab(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Yeni muayene ekleme
        },
        backgroundColor: Colors.green,
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildInfoCard(Hayvan hayvan) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Hayvan Bilgileri',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Divider(),
            const SizedBox(height: 8),
            _buildInfoRow('Tür', hayvan.tur),
            _buildInfoRow('Cins', hayvan.cins),
            _buildInfoRow('Cinsiyet', hayvan.cinsiyet),
            _buildInfoRow('Doğum Tarihi', hayvan.dogumTarihi),
            _buildInfoRow('Kilo', '${hayvan.kilo} kg'),
          ],
        ),
      ),
    );
  }

  Widget _buildSahipCard() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Sahip Bilgileri',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Divider(),
            const SizedBox(height: 8),
            _buildInfoRow('İsim', 'Ahmet Yılmaz'),
            _buildInfoRow('Telefon', '0532 123 4567'),
            _buildInfoRow('E-posta', 'ahmet@example.com'),
            _buildInfoRow('Adres', 'Örnek Mah. Test Sok. No: 123, İstanbul'),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton.icon(
                  onPressed: () {
                    // Sahip detayına git
                  },
                  icon: const Icon(Icons.person),
                  label: const Text('Sahip Detayı'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSonMuayeneCard() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Son Muayene',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Divider(),
            const SizedBox(height: 8),
            _buildInfoRow('Tarih', '24.04.2025'),
            _buildInfoRow('Veteriner', 'Dr. Mehmet Öz'),
            _buildInfoRow('Tanı', 'Kulak enfeksiyonu'),
            _buildInfoRow('Tedavi', 'Antibiyotik tedavisi'),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton.icon(
                  onPressed: () {
                    _tabController.animateTo(1);
                  },
                  icon: const Icon(Icons.history),
                  label: const Text('Tüm Muayeneler'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
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

  Widget _buildMuayenelerTab() {
    // Demo muayene listesi
    final muayeneler = List.generate(
      5,
      (index) => {
        'id': index + 1,
        'tarih': '${(24 - index).toString().padLeft(2, '0')}.04.2025',
        'veteriner': 'Dr. Mehmet Öz',
        'tani': index % 2 == 0 ? 'Kulak enfeksiyonu' : 'Yıllık kontrol',
      },
    );

    return muayeneler.isEmpty
        ? const Center(child: Text('Henüz muayene kaydı bulunmamaktadır.'))
        : ListView.builder(
            padding: const EdgeInsets.all(8),
            itemCount: muayeneler.length,
            itemBuilder: (context, index) {
              final muayene = muayeneler[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: Colors.green.shade100,
                    child: const Icon(Icons.medical_services, color: Colors.green),
                  ),
                  title: Text('Muayene #${muayene['id']}'),
                  subtitle: Text('${muayene['tarih']} - ${muayene['tani']}'),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                  onTap: () {
                    // Muayene detayına git
                  },
                ),
              );
            },
          );
  }

  Widget _buildTeshislerTab() {
    // Demo teşhis listesi
    final teshisler = List.generate(
      3,
      (index) => {
        'id': index + 1,
        'tarih': '${(24 - index * 2).toString().padLeft(2, '0')}.04.2025',
        'tani': index % 3 == 0 ? 'Kulak enfeksiyonu' : (index % 3 == 1 ? 'Diş sorunu' : 'Deri enfeksiyonu'),
        'tedavi': index % 3 == 0 ? 'Antibiyotik' : (index % 3 == 1 ? 'Diş temizliği' : 'Topikal krem'),
      },
    );

    return teshisler.isEmpty
        ? const Center(child: Text('Henüz teşhis kaydı bulunmamaktadır.'))
        : ListView.builder(
            padding: const EdgeInsets.all(8),
            itemCount: teshisler.length,
            itemBuilder: (context, index) {
              final teshis = teshisler[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: Colors.blue.shade100,
                    child: const Icon(Icons.medical_information, color: Colors.blue),
                  ),
                  title: Text(teshis['tani'].toString()),
                  subtitle: Text('${teshis['tarih']} - ${teshis['tedavi']}'),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                  onTap: () {
                    // Teşhis detayına git
                  },
                ),
              );
            },
          );
  }

  Widget _buildRecetelerTab() {
    // Demo reçete listesi
    final receteler = List.generate(
      4,
      (index) => {
        'id': index + 1,
        'tarih': '${(24 - index).toString().padLeft(2, '0')}.04.2025',
        'ilac': index % 2 == 0 ? 'Amoksisilin 500mg' : 'Dermakrem %5',
        'doktor': 'Dr. Mehmet Öz',
      },
    );

    return receteler.isEmpty
        ? const Center(child: Text('Henüz reçete kaydı bulunmamaktadır.'))
        : ListView.builder(
            padding: const EdgeInsets.all(8),
            itemCount: receteler.length,
            itemBuilder: (context, index) {
              final recete = receteler[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: Colors.orange.shade100,
                    child: const Icon(Icons.receipt_long, color: Colors.orange),
                  ),
                  title: Text(recete['ilac'].toString()),
                  subtitle: Text('${recete['tarih']} - ${recete['doktor']}'),
                  trailing: IconButton(
                    icon: const Icon(Icons.download),
                    onPressed: () {
                      // Reçeteyi indir
                    },
                  ),
                  onTap: () {
                    // Reçete detayına git
                  },
                ),
              );
            },
          );
  }
} 