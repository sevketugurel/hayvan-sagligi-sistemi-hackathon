import 'package:flutter/material.dart';
import '../models/hayvan.dart';
import '../services/service_provider.dart';
import 'dart:io';

class MuayeneScreen extends StatefulWidget {
  final int hayvanId;
  final String? randevuNotu;
  
  const MuayeneScreen({
    super.key,
    required this.hayvanId,
    this.randevuNotu,
  });

  @override
  State<MuayeneScreen> createState() => _MuayeneScreenState();
}

class _MuayeneScreenState extends State<MuayeneScreen> {
  final _formKey = GlobalKey<FormState>();
  final _apiService = ServiceProvider().apiService;
  final _sikayetController = TextEditingController();
  final _bulgularController = TextEditingController();
  final _teshisController = TextEditingController();
  final _tedaviController = TextEditingController();
  final _notlarController = TextEditingController();
  
  bool _isLoading = true;
  bool _isSaving = false;
  String _errorMessage = '';
  Hayvan? _hayvan;
  
  // Seçilen muayene verileri
  final List<String> _asilar = [];
  final List<String> _asiSecimleri = ['Karma Aşı', 'Kuduz Aşısı', 'İç Parazit', 'Dış Parazit', 'Lösemi', 'FIP'];
  
  // Checkbox durumları
  bool _tahlilYapildi = false;
  bool _rontgenCekildi = false;
  bool _ultrasonYapildi = false;
  
  // Eklenen fotoğraflar
  final List<String> _fotograflar = [];

  @override
  void initState() {
    super.initState();
    
    if (widget.randevuNotu != null && widget.randevuNotu!.isNotEmpty) {
      _sikayetController.text = widget.randevuNotu!;
    }
    
    _fetchHayvanDetay();
  }

  @override
  void dispose() {
    _sikayetController.dispose();
    _bulgularController.dispose();
    _teshisController.dispose();
    _tedaviController.dispose();
    _notlarController.dispose();
    super.dispose();
  }

  Future<void> _fetchHayvanDetay() async {
    try {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });
      
      // Hayvan detaylarını getir
      final hayvan = await _apiService.getHayvan(widget.hayvanId);
      
      setState(() {
        _hayvan = hayvan;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Hayvan detayları alınamadı: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    
    setState(() {
      _isSaving = true;
    });
    
    try {
      // Muayene kaydetme simülasyonu (Mock API)
      await Future.delayed(const Duration(seconds: 1));
      
      if (!mounted) return;
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Muayene kaydedildi'),
          backgroundColor: Colors.green,
        ),
      );
      
      Navigator.pop(context, true);
    } catch (e) {
      setState(() {
        _isSaving = false;
      });
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Hata: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
  
  void _showConfirmExitDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Sayfadan Çıkış'),
          content: const Text('Kaydedilmemiş değişiklikleriniz var. Çıkmak istediğinize emin misiniz?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Dialog'u kapat
              },
              child: const Text('İptal'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Dialog'u kapat
                Navigator.of(context).pop(); // Sayfadan çık
              },
              child: const Text('Çık'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Muayene'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Muayene'),
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
        title: Text('Muayene: ${hayvan.ad}'),
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: _isSaving ? null : _submitForm,
            tooltip: 'Kaydet',
          ),
        ],
      ),
      body: WillPopScope(
        onWillPop: () async {
          if (_sikayetController.text.isNotEmpty || 
              _bulgularController.text.isNotEmpty || 
              _teshisController.text.isNotEmpty || 
              _tedaviController.text.isNotEmpty || 
              _notlarController.text.isNotEmpty || 
              _asilar.isNotEmpty || 
              _tahlilYapildi || 
              _rontgenCekildi || 
              _ultrasonYapildi ||
              _fotograflar.isNotEmpty) {
            _showConfirmExitDialog();
            return false;
          }
          return true;
        },
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Hayvan özet bilgileri
                _buildAnimalSummary(hayvan),
                
                const SizedBox(height: 24),
                
                // Şikayet
                const Text(
                  'Şikayet/Anamnez',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _sikayetController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    hintText: 'Hasta sahibinin şikayeti...',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Lütfen şikayeti girin';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 24),
                
                // Klinik bulgular
                const Text(
                  'Klinik Bulgular',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _bulgularController,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    hintText: 'Muayene sırasında tespit edilen bulgular...',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Lütfen bulguları girin';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 24),
                
                // Yapılan işlemler
                const Text(
                  'Yapılan İşlemler',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        CheckboxListTile(
                          title: const Text('Kan Tahlili Yapıldı'),
                          value: _tahlilYapildi,
                          onChanged: (value) {
                            setState(() {
                              _tahlilYapildi = value ?? false;
                            });
                          },
                          controlAffinity: ListTileControlAffinity.leading,
                          contentPadding: EdgeInsets.zero,
                        ),
                        CheckboxListTile(
                          title: const Text('Röntgen Çekildi'),
                          value: _rontgenCekildi,
                          onChanged: (value) {
                            setState(() {
                              _rontgenCekildi = value ?? false;
                            });
                          },
                          controlAffinity: ListTileControlAffinity.leading,
                          contentPadding: EdgeInsets.zero,
                        ),
                        CheckboxListTile(
                          title: const Text('Ultrason Yapıldı'),
                          value: _ultrasonYapildi,
                          onChanged: (value) {
                            setState(() {
                              _ultrasonYapildi = value ?? false;
                            });
                          },
                          controlAffinity: ListTileControlAffinity.leading,
                          contentPadding: EdgeInsets.zero,
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Aşılar
                const Text(
                  'Uygulanan Aşılar',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: _asiSecimleri.map((asi) {
                            final isSelected = _asilar.contains(asi);
                            
                            return FilterChip(
                              label: Text(asi),
                              selected: isSelected,
                              onSelected: (bool selected) {
                                setState(() {
                                  if (selected) {
                                    _asilar.add(asi);
                                  } else {
                                    _asilar.remove(asi);
                                  }
                                });
                              },
                              selectedColor: Colors.green.shade100,
                              checkmarkColor: Colors.green,
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Teşhis
                const Text(
                  'Teşhis',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _teshisController,
                  maxLines: 2,
                  decoration: const InputDecoration(
                    hintText: 'Teşhis...',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Lütfen teşhisi girin';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 24),
                
                // Tedavi/Reçete
                const Text(
                  'Tedavi/Reçete',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _tedaviController,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    hintText: 'Önerilen tedavi ve reçete...',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Lütfen tedaviyi girin';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 24),
                
                // Fotoğraf yükleme
                const Text(
                  'Fotoğraflar',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Muayene Fotoğrafları'),
                            TextButton.icon(
                              onPressed: () {
                                // Demo fotoğraf ekliyoruz
                                setState(() {
                                  _fotograflar.add('photo_${DateTime.now().millisecondsSinceEpoch}.jpg');
                                });
                              },
                              icon: const Icon(Icons.add_a_photo),
                              label: const Text('Ekle'),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        _fotograflar.isEmpty
                            ? const Center(
                                child: Padding(
                                  padding: EdgeInsets.all(16),
                                  child: Text('Fotoğraf eklenmedi'),
                                ),
                              )
                            : SizedBox(
                                height: 100,
                                child: ListView.builder(
                                  scrollDirection: Axis.horizontal,
                                  itemCount: _fotograflar.length,
                                  itemBuilder: (context, index) {
                                    return Padding(
                                      padding: const EdgeInsets.only(right: 8),
                                      child: Stack(
                                        children: [
                                          Container(
                                            width: 100,
                                            height: 100,
                                            decoration: BoxDecoration(
                                              color: Colors.grey[300],
                                              borderRadius: BorderRadius.circular(8),
                                            ),
                                            child: const Icon(Icons.photo, size: 50, color: Colors.grey),
                                          ),
                                          Positioned(
                                            top: 0,
                                            right: 0,
                                            child: IconButton(
                                              icon: const Icon(Icons.remove_circle, color: Colors.red),
                                              onPressed: () {
                                                setState(() {
                                                  _fotograflar.removeAt(index);
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
                const Text(
                  'Ek Notlar',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _notlarController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    hintText: 'Ek notlar...',
                    border: OutlineInputBorder(),
                  ),
                ),
                
                const SizedBox(height: 32),
                
                // Kaydet butonu
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _isSaving ? null : _submitForm,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: Colors.green,
                      foregroundColor: Colors.white,
                    ),
                    child: _isSaving
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                              strokeWidth: 2,
                            ),
                          )
                        : const Text('Muayene Kaydet'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAnimalSummary(Hayvan hayvan) {
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
                  radius: 24,
                  backgroundColor: _getColorForAnimalType(hayvan.tur),
                  child: Text(
                    hayvan.ad.isNotEmpty ? hayvan.ad[0].toUpperCase() : '?',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
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
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        '${hayvan.tur} - ${hayvan.cins}',
                        style: TextStyle(
                          color: Colors.grey[700],
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Yaş: ${_calculateAge(hayvan.dogumTarihi)}',
                      style: const TextStyle(
                        fontSize: 14,
                      ),
                    ),
                    Text(
                      'Cinsiyet: ${hayvan.cinsiyet}',
                      style: const TextStyle(
                        fontSize: 14,
                      ),
                    ),
                    Text(
                      'Kilo: ${hayvan.kilo} kg',
                      style: const TextStyle(
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const Divider(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Sahip: ${hayvan.sahipId ?? "Sahibi belirtilmemiş"}',
                  style: const TextStyle(
                    fontSize: 14,
                  ),
                ),
                TextButton.icon(
                  onPressed: () {
                    // Hayvan detayına git
                  },
                  icon: const Icon(Icons.medical_information, size: 16),
                  label: const Text('Sağlık Geçmişi'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  String _calculateAge(String birthDate) {
    try {
      final birthDateParts = birthDate.split('.');
      if (birthDateParts.length != 3) {
        return 'Bilinmiyor';
      }
      
      final day = int.parse(birthDateParts[0]);
      final month = int.parse(birthDateParts[1]);
      final year = int.parse(birthDateParts[2]);
      
      final birth = DateTime(year, month, day);
      final now = DateTime.now();
      
      int years = now.year - birth.year;
      int months = now.month - birth.month;
      
      if (now.day < birth.day) {
        months--;
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      if (years > 0) {
        return '$years yıl $months ay';
      } else {
        return '$months ay';
      }
    } catch (e) {
      return 'Bilinmiyor';
    }
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