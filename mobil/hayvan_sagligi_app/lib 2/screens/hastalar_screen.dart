import 'package:flutter/material.dart';
import '../models/hayvan.dart';
import '../services/api_service.dart';
import 'hayvan_detay_screen.dart';
import 'hayvan_ekle_screen.dart';

class HastalarScreen extends StatefulWidget {
  const HastalarScreen({super.key});

  @override
  State<HastalarScreen> createState() => _HastalarScreenState();
}

class _HastalarScreenState extends State<HastalarScreen> {
  final ApiService _apiService = ApiService();
  List<Hayvan> _hayvanlar = [];
  bool _isLoading = true;
  String _errorMessage = '';
  String _searchQuery = '';
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _fetchHayvanlar();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _fetchHayvanlar() async {
    try {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });
      
      final hayvanlar = await _apiService.getHayvanlar();
      
      setState(() {
        _hayvanlar = hayvanlar;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Hastalar yüklenemedi: $e';
        _isLoading = false;
      });
    }
  }

  void _navigateToHayvanDetay(Hayvan hayvan) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => HayvanDetayScreen(hayvanId: hayvan.id!),
      ),
    ).then((_) {
      // Geri dönüldüğünde verileri yenile
      _fetchHayvanlar();
    });
  }

  void _navigateToHayvanEkle() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const HayvanEkleScreen(),
      ),
    );
    
    if (result != null) {
      // Yeni hayvan eklendiyse, listeyi yenile
      _fetchHayvanlar();
    }
  }

  // Arama filtreleme fonksiyonu
  List<Hayvan> get _filteredHayvanlar {
    if (_searchQuery.isEmpty) {
      return _hayvanlar;
    }
    
    return _hayvanlar.where((hayvan) {
      final query = _searchQuery.toLowerCase();
      return hayvan.ad.toLowerCase().contains(query) ||
          hayvan.cins.toLowerCase().contains(query) ||
          hayvan.tur.toLowerCase().contains(query);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_errorMessage, textAlign: TextAlign.center),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _fetchHayvanlar,
              child: const Text('Tekrar Dene'),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      body: Column(
        children: [
          // Arama alanı
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Hasta Ara...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                suffixIcon: _searchQuery.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          setState(() {
                            _searchController.clear();
                            _searchQuery = '';
                          });
                        },
                      )
                    : null,
              ),
              onChanged: (value) {
                setState(() {
                  _searchQuery = value;
                });
              },
            ),
          ),
          
          // Filtreler
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              children: [
                _buildFilterChip('Hepsi', true),
                _buildFilterChip('Köpek', false),
                _buildFilterChip('Kedi', false),
                _buildFilterChip('Kuş', false),
                _buildFilterChip('Diğer', false),
              ],
            ),
          ),
          
          const Divider(),
          
          // Hasta listesi
          Expanded(
            child: _filteredHayvanlar.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.pets, size: 80, color: Colors.grey),
                        const SizedBox(height: 16),
                        _searchQuery.isNotEmpty
                            ? const Text('Aramanızla eşleşen hasta bulunamadı.')
                            : const Text('Henüz hasta kaydı bulunmamaktadır.'),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: _navigateToHayvanEkle,
                          child: const Text('Yeni Hasta Ekle'),
                        ),
                      ],
                    ),
                  )
                : RefreshIndicator(
                    onRefresh: _fetchHayvanlar,
                    child: ListView.builder(
                      itemCount: _filteredHayvanlar.length,
                      itemBuilder: (context, index) {
                        final hayvan = _filteredHayvanlar[index];
                        return Card(
                          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          elevation: 2,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: InkWell(
                            borderRadius: BorderRadius.circular(12),
                            onTap: () => _navigateToHayvanDetay(hayvan),
                            child: Padding(
                              padding: const EdgeInsets.all(12.0),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    radius: 30,
                                    backgroundColor: _getColorForAnimalType(hayvan.tur),
                                    child: Text(
                                      hayvan.ad.isNotEmpty ? hayvan.ad[0].toUpperCase() : '?',
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 24,
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
                                            fontWeight: FontWeight.bold,
                                            fontSize: 18,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          '${hayvan.tur} - ${hayvan.cins}',
                                          style: TextStyle(
                                            color: Colors.grey[600],
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Row(
                                          children: [
                                            Icon(
                                              hayvan.cinsiyet == 'Erkek' ? Icons.male : Icons.female,
                                              size: 16,
                                              color: hayvan.cinsiyet == 'Erkek' ? Colors.blue : Colors.pink,
                                            ),
                                            const SizedBox(width: 4),
                                            Text(hayvan.cinsiyet),
                                            const SizedBox(width: 8),
                                            Text('•'),
                                            const SizedBox(width: 8),
                                            Text('${hayvan.kilo} kg'),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                  Icon(Icons.arrow_forward_ios, color: Colors.grey[400], size: 16),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _navigateToHayvanEkle,
        backgroundColor: Colors.green,
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildFilterChip(String label, bool isSelected) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: ChoiceChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (bool selected) {
          // TODO: Filtreleme işlemi
        },
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