import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../services/service_provider.dart';
import '../models/hayvan.dart';

class RandevuOlusturScreen extends StatefulWidget {
  final int? hayvanId;
  final String? notlar;
  
  const RandevuOlusturScreen({
    super.key,
    this.hayvanId,
    this.notlar,
  });

  @override
  State<RandevuOlusturScreen> createState() => _RandevuOlusturScreenState();
}

class _RandevuOlusturScreenState extends State<RandevuOlusturScreen> {
  final _formKey = GlobalKey<FormState>();
  final _apiService = ServiceProvider().apiService;
  
  // Form controller'ları
  final _notlarController = TextEditingController();
  final _tarihController = TextEditingController();
  final _saatController = TextEditingController();
  
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;
  Hayvan? _selectedHayvan;
  String _selectedRandevuTipi = 'Kontrol';
  List<Hayvan> _hayvanlarim = [];
  bool _isLoading = true;
  bool _isSubmitting = false;
  String _errorMessage = '';
  
  // Randevu tipleri
  final List<String> _randevuTipleri = [
    'Kontrol',
    'Aşı',
    'Tedavi',
    'Ameliyat',
    'Acil',
    'Diğer',
  ];
  
  // Demo veterinerler
  final List<Map<String, dynamic>> _veterinerler = [
    {'id': 1, 'ad': 'Dr. Mehmet Öz', 'uzmanlik': 'Genel'},
    {'id': 2, 'ad': 'Dr. Ayşe Demir', 'uzmanlik': 'Kedi ve Köpek'},
    {'id': 3, 'ad': 'Dr. Ali Yılmaz', 'uzmanlik': 'Cerrahi'},
  ];
  
  Map<String, dynamic>? _selectedVeteriner;

  @override
  void initState() {
    super.initState();
    
    if (widget.notlar != null) {
      _notlarController.text = widget.notlar!;
    }
    
    _fetchHayvanlar();
  }

  @override
  void dispose() {
    _notlarController.dispose();
    _tarihController.dispose();
    _saatController.dispose();
    super.dispose();
  }
  
  Future<void> _fetchHayvanlar() async {
    try {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });
      
      // Sahibin hayvanlarını getir (Mock veri için filtreleme)
      final hayvanlar = await _apiService.getHayvanlar();
      final sahipId = 1; // Demo için sabit bir sahip ID'si
      _hayvanlarim = hayvanlar.where((h) => h.sahipId == sahipId).toList();
      
      // Eğer bir hayvanId verilmişse ve hayvan listesi boş değilse, o hayvanı seç
      if (widget.hayvanId != null && _hayvanlarim.isNotEmpty) {
        _selectedHayvan = _hayvanlarim.firstWhere(
          (h) => h.id == widget.hayvanId,
          orElse: () => _hayvanlarim.first,
        );
      } else if (_hayvanlarim.isNotEmpty) {
        _selectedHayvan = _hayvanlarim.first;
      }
      
      // Varsayılan veteriner seç
      if (_veterinerler.isNotEmpty) {
        _selectedVeteriner = _veterinerler.first;
      }
      
      setState(() {
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Hayvanlar yüklenemedi: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<void> _selectDate(BuildContext context) async {
    final DateTime now = DateTime.now();
    final DateTime firstDate = now;
    final DateTime lastDate = now.add(const Duration(days: 60)); // 2 ay içinde
    
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? now.add(const Duration(days: 1)),
      firstDate: firstDate,
      lastDate: lastDate,
      builder: (BuildContext context, Widget? child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: const ColorScheme.light(
              primary: Colors.green,
            ),
          ),
          child: child!,
        );
      },
    );
    
    if (picked != null) {
      setState(() {
        _selectedDate = picked;
        _tarihController.text = DateFormat('dd/MM/yyyy').format(picked);
      });
    }
  }
  
  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay now = TimeOfDay.now();
    
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: _selectedTime ?? TimeOfDay(hour: now.hour + 1, minute: 0),
      builder: (BuildContext context, Widget? child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: const ColorScheme.light(
              primary: Colors.green,
            ),
          ),
          child: child!,
        );
      },
    );
    
    if (picked != null) {
      setState(() {
        _selectedTime = picked;
        _saatController.text = picked.format(context);
      });
    }
  }
  
  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    
    if (_selectedHayvan == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen bir hayvan seçin')),
      );
      return;
    }
    
    if (_selectedVeteriner == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen bir veteriner seçin')),
      );
      return;
    }
    
    setState(() {
      _isSubmitting = true;
    });
    
    try {
      // Randevu oluşturma simulasyonu (Mock API)
      await Future.delayed(const Duration(seconds: 1));
      
      if (!mounted) return;
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Randevu başarıyla oluşturuldu'),
          backgroundColor: Colors.green,
        ),
      );
      
      Navigator.pop(context, true);
    } catch (e) {
      setState(() {
        _isSubmitting = false;
      });
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Hata: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Randevu Oluştur'),
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Randevu Oluştur'),
        ),
        body: Center(
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
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Randevu Oluştur'),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Açıklama kartı
              Card(
                elevation: 2,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                color: Colors.blue.shade50,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Icon(Icons.info, color: Colors.blue.shade700),
                          const SizedBox(width: 8),
                          Text(
                            'Randevu Bilgileri',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.blue.shade700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Randevunuz veteriner hekim tarafından onaylandıktan sonra aktif olacaktır. Onay durumunu "Randevularım" bölümünden takip edebilirsiniz.',
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              
              // Hayvan seçimi
              const Text(
                'Hangi hayvanınız için randevu alıyorsunuz?',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              if (_hayvanlarim.isEmpty)
                Card(
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
                )
              else
                Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: SizedBox(
                      height: 100,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: _hayvanlarim.length,
                        itemBuilder: (context, index) {
                          final hayvan = _hayvanlarim[index];
                          final isSelected = _selectedHayvan?.id == hayvan.id;
                          
                          return GestureDetector(
                            onTap: () {
                              setState(() {
                                _selectedHayvan = hayvan;
                              });
                            },
                            child: Container(
                              width: 80,
                              margin: const EdgeInsets.only(right: 12),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(12),
                                border: isSelected
                                    ? Border.all(color: Colors.green, width: 2)
                                    : null,
                              ),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  CircleAvatar(
                                    radius: 24,
                                    backgroundColor: _getColorForAnimalType(hayvan.tur),
                                    child: Text(
                                      hayvan.ad.isNotEmpty ? hayvan.ad[0].toUpperCase() : '?',
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    hayvan.ad,
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                      fontSize: 12,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ),
              const SizedBox(height: 24),
              
              // Randevu tipi
              const Text(
                'Randevu Tipi',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Card(
                elevation: 2,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: _randevuTipleri.map((tip) {
                          final isSelected = _selectedRandevuTipi == tip;
                          
                          return ChoiceChip(
                            label: Text(tip),
                            selected: isSelected,
                            onSelected: (bool selected) {
                              if (selected) {
                                setState(() {
                                  _selectedRandevuTipi = tip;
                                });
                              }
                            },
                            selectedColor: Colors.green.shade100,
                          );
                        }).toList(),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              
              // Veteriner seçimi
              const Text(
                'Veteriner Hekim',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Card(
                elevation: 2,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: _veterinerler.map((veteriner) {
                      final isSelected = _selectedVeteriner?['id'] == veteriner['id'];
                      
                      return RadioListTile<Map<String, dynamic>>(
                        title: Text(veteriner['ad'] as String),
                        subtitle: Text('Uzmanlık: ${veteriner['uzmanlik']}'),
                        value: veteriner,
                        groupValue: _selectedVeteriner,
                        onChanged: (Map<String, dynamic>? value) {
                          setState(() {
                            _selectedVeteriner = value;
                          });
                        },
                        activeColor: Colors.green,
                        selected: isSelected,
                      );
                    }).toList(),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              
              // Tarih ve saat seçimi
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Tarih',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _tarihController,
                          readOnly: true,
                          onTap: () => _selectDate(context),
                          decoration: InputDecoration(
                            hintText: 'Tarih seçin',
                            prefixIcon: const Icon(Icons.calendar_today),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Tarih seçiniz';
                            }
                            return null;
                          },
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Saat',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _saatController,
                          readOnly: true,
                          onTap: () => _selectTime(context),
                          decoration: InputDecoration(
                            hintText: 'Saat seçin',
                            prefixIcon: const Icon(Icons.access_time),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Saat seçiniz';
                            }
                            return null;
                          },
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              
              // Notlar
              const Text(
                'Notlar (Opsiyonel)',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _notlarController,
                maxLines: 3,
                decoration: InputDecoration(
                  hintText: 'Randevu hakkında ek bilgiler...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              
              // Randevu oluştur butonu
              ElevatedButton(
                onPressed: _isSubmitting ? null : _submitForm,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: _isSubmitting
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : const Text(
                        'Randevu Oluştur',
                        style: TextStyle(fontSize: 16),
                      ),
              ),
            ],
          ),
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