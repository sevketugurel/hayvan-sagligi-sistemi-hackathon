import 'package:flutter/material.dart';
import '../services/service_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String? _selectedUserType;
  final _apiService = ServiceProvider().apiService;
  bool _isLoading = false;

  // Demo kullanıcılar
  final Map<String, String> _demoUsers = {
    'vet@example.com': 'veteriner',
    'sahip@example.com': 'sahip',
  };

  @override
  void initState() {
    super.initState();
    // Demo için
    _emailController.text = 'vet@example.com';
    _passwordController.text = '123456';
    _selectedUserType = 'veteriner'; // Veteriner seçeneği varsayılan olarak seçili gelsin
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (_selectedUserType == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen bir kullanıcı tipi seçin')),
      );
      return;
    }

    if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen email ve şifrenizi girin')),
      );
      return;
    }

    // Kullanıcı tipi kontrolü
    final userType = _demoUsers[_emailController.text];
    if (userType != null && userType == _selectedUserType) {
      setState(() {
        _isLoading = true;
      });

      try {
        // Mock API ile login işlemi
        final success = await _apiService.login(
          _emailController.text,
          _passwordController.text,
        );

        setState(() {
          _isLoading = false;
        });

        if (success && mounted) {
          // Başarılı giriş sonrası ana sayfaya yönlendirme
          Navigator.pushReplacementNamed(context, '/home', arguments: _selectedUserType);
        } else if (mounted) {
          // Hatalı giriş
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')),
          );
        }
      } catch (e) {
        setState(() {
          _isLoading = false;
        });

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Hata: $e')),
          );
        }
      }
    } else {
      // Hatalı kullanıcı tipi
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Email veya kullanıcı tipi yanlış')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Icon(
                    Icons.pets,
                    size: 100,
                    color: Colors.green,
                  ),
                  const SizedBox(height: 32),
                  const Text(
                    'Hayvan Sağlığı Sistemi',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Giriş Yap',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 48),
                  
                  // Kullanıcı tipi seçimi
                  Card(
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
                            'Kullanıcı Tipi Seçin',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 16),
                          Row(
                            children: [
                              Expanded(
                                child: InkWell(
                                  onTap: () {
                                    setState(() {
                                      _selectedUserType = 'veteriner';
                                      _emailController.text = 'vet@example.com';
                                    });
                                  },
                                  child: Card(
                                    color: _selectedUserType == 'veteriner'
                                        ? Colors.green.shade100
                                        : Colors.white,
                                    elevation: 2,
                                    child: Padding(
                                      padding: const EdgeInsets.all(16),
                                      child: Column(
                                        children: [
                                          Icon(
                                            Icons.medical_services,
                                            size: 48,
                                            color: _selectedUserType == 'veteriner'
                                                ? Colors.green
                                                : Colors.grey,
                                          ),
                                          const SizedBox(height: 8),
                                          const Text('Veteriner Hekim'),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: InkWell(
                                  onTap: () {
                                    setState(() {
                                      _selectedUserType = 'sahip';
                                      _emailController.text = 'sahip@example.com';
                                    });
                                  },
                                  child: Card(
                                    color: _selectedUserType == 'sahip'
                                        ? Colors.green.shade100
                                        : Colors.white,
                                    elevation: 2,
                                    child: Padding(
                                      padding: const EdgeInsets.all(16),
                                      child: Column(
                                        children: [
                                          Icon(
                                            Icons.person,
                                            size: 48,
                                            color: _selectedUserType == 'sahip'
                                                ? Colors.green
                                                : Colors.grey,
                                          ),
                                          const SizedBox(height: 8),
                                          const Text('Hayvan Sahibi'),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Demo bilgileri
                  const Card(
                    child: Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Demo Giriş Bilgileri:', style: TextStyle(fontWeight: FontWeight.bold)),
                          Text('Veteriner: vet@example.com / 123456'),
                          Text('Hayvan Sahibi: sahip@example.com / 123456'),
                          SizedBox(height: 5),
                          Text('Not: Kullanıcı tipine uygun e-postayı kullanın', style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic)),
                        ],
                      ),
                    ),
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Email alanı
                  TextField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: 'Email',
                      prefixIcon: const Icon(Icons.email),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    keyboardType: TextInputType.emailAddress,
                  ),
                  const SizedBox(height: 16),
                  
                  // Şifre alanı
                  TextField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      labelText: 'Şifre',
                      prefixIcon: const Icon(Icons.lock),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    obscureText: true,
                  ),
                  const SizedBox(height: 24),
                  
                  // Giriş butonu
                  _isLoading
                      ? const Center(child: CircularProgressIndicator())
                      : ElevatedButton(
                          onPressed: _login,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: const Text(
                            'Giriş Yap',
                            style: TextStyle(fontSize: 16),
                          ),
                        ),
                  
                  const SizedBox(height: 16),
                  
                  // Kayıt olma butonu
                  TextButton(
                    onPressed: () {
                      // Kayıt olma sayfasına yönlendirme kodu
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Kayıt işlemi şu anda demo için devre dışı')),
                      );
                    },
                    child: const Text('Hesabınız yok mu? Kayıt Olun'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
} 