import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/hayvan.dart';
import '../services/api_service.dart';

class HayvanEkleScreen extends StatefulWidget {
  final int? sahipId;
  
  const HayvanEkleScreen({
    super.key,
    this.sahipId,
  });

  @override
  State<HayvanEkleScreen> createState() => _HayvanEkleScreenState();
}

class _HayvanEkleScreenState extends State<HayvanEkleScreen> {
  final _formKey = GlobalKey<FormState>();
  final _apiService = ApiService();
  
  final _adController = TextEditingController();
  final _cinsController = TextEditingController();
  final _turController = TextEditingController();
  final _kiloController = TextEditingController();
  final _dogumTarihiController = TextEditingController();
  
  String _cinsiyet = 'Erkek';
  bool _isSubmitting = false;
  final List<String> _turler = ['Kedi', 'Köpek', 'Kuş', 'Kemirgen', 'Balık', 'Sürüngen', 'Diğer'];
  
  @override
  void dispose() {
    _adController.dispose();
    _cinsController.dispose();
    _turController.dispose();
    _kiloController.dispose();
    _dogumTarihiController.dispose();
    super.dispose();
  }
  
  Future<void> _selectDate(BuildContext context) async {
    final DateTime currentDate = DateTime.now();
    final DateTime firstDate = DateTime(currentDate.year - 30, 1);
    
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: currentDate,
      firstDate: firstDate,
      lastDate: currentDate,
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
        _dogumTarihiController.text = DateFormat('yyyy-MM-dd').format(picked);
      });
    }
  }
  
  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    
    setState(() {
      _isSubmitting = true;
    });
    
    try {
      final yeniHayvan = Hayvan(
        ad: _adController.text,
        cins: _cinsController.text,
        tur: _turController.text.isEmpty ? _turler.first : _turController.text,
        kilo: double.tryParse(_kiloController.text) ?? 0.0,
        cinsiyet: _cinsiyet,
        dogumTarihi: _dogumTarihiController.text,
        sahipId: widget.sahipId,
      );
      
      final createdHayvan = await _apiService.createHayvan(yeniHayvan);
      
      if (!mounted) return;
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Hayvan başarıyla eklendi'),
          backgroundColor: Colors.green,
        ),
      );
      
      // Hayvan detayı sayfasına yönlendir
      Navigator.pop(context, createdHayvan);
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
    return Scaffold(
      appBar: AppBar(
        title: const Text('Yeni Hasta Ekle'),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Adı
              TextFormField(
                controller: _adController,
                decoration: const InputDecoration(
                  labelText: 'Hasta Adı',
                  prefixIcon: Icon(Icons.pets),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Lütfen hastanın adını girin';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              // Hayvan türü dropdown
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Tür',
                  prefixIcon: Icon(Icons.category),
                  border: OutlineInputBorder(),
                ),
                value: _turController.text.isEmpty ? _turler.first : _turController.text,
                items: _turler.map((String tur) {
                  return DropdownMenuItem<String>(
                    value: tur,
                    child: Text(tur),
                  );
                }).toList(),
                onChanged: (String? newValue) {
                  if (newValue != null) {
                    setState(() {
                      _turController.text = newValue;
                    });
                  }
                },
              ),
              const SizedBox(height: 16),
              
              // Cinsi
              TextFormField(
                controller: _cinsController,
                decoration: const InputDecoration(
                  labelText: 'Cins',
                  prefixIcon: Icon(Icons.category_outlined),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              
              // Ağırlık
              TextFormField(
                controller: _kiloController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Kilo (kg)',
                  prefixIcon: Icon(Icons.monitor_weight),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Lütfen hastanın kilosunu girin';
                  }
                  try {
                    double.parse(value);
                  } catch (e) {
                    return 'Geçerli bir sayı girin';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              // Doğum tarihi seçici
              TextFormField(
                controller: _dogumTarihiController,
                readOnly: true,
                onTap: () => _selectDate(context),
                decoration: const InputDecoration(
                  labelText: 'Doğum Tarihi',
                  prefixIcon: Icon(Icons.calendar_today),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Lütfen bir doğum tarihi seçin';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              // Cinsiyet radyo butonları
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Cinsiyet',
                        style: TextStyle(fontSize: 16),
                      ),
                      RadioListTile<String>(
                        title: const Text('Erkek'),
                        value: 'Erkek',
                        groupValue: _cinsiyet,
                        onChanged: (String? value) {
                          if (value != null) {
                            setState(() {
                              _cinsiyet = value;
                            });
                          }
                        },
                      ),
                      RadioListTile<String>(
                        title: const Text('Dişi'),
                        value: 'Dişi',
                        groupValue: _cinsiyet,
                        onChanged: (String? value) {
                          if (value != null) {
                            setState(() {
                              _cinsiyet = value;
                            });
                          }
                        },
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              
              // Kaydet butonu
              ElevatedButton(
                onPressed: _isSubmitting ? null : _submitForm,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: _isSubmitting
                    ? const CircularProgressIndicator(color: Colors.white)
                    : const Text(
                        'Hasta Kaydet',
                        style: TextStyle(fontSize: 16),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
} 