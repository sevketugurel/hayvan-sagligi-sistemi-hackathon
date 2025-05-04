import 'package:flutter/material.dart';
import 'screens/hastalar_screen.dart';
import 'screens/login_screen.dart';
import 'screens/randevular_screen.dart';
import 'screens/sahip_ana_sayfa_screen.dart';
import 'screens/veteriner_ana_sayfa_screen.dart';
import 'screens/saha_ziyareti_screen.dart';
import 'screens/asi_takip_screen.dart';
import 'screens/muayene_screen.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(const HayvanSagligiApp());
}

class HayvanSagligiApp extends StatelessWidget {
  const HayvanSagligiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hayvan Sağlığı Sistemi',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF4CAF50),
          primary: const Color(0xFF4CAF50),
          secondary: const Color(0xFF8BC34A),
          tertiary: const Color(0xFFCDDC39),
        ),
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF4CAF50),
          foregroundColor: Colors.white,
          elevation: 2,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF4CAF50),
            foregroundColor: Colors.white,
          ),
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/home': (context) => const HayvanSagligiHomePage(),
      },
      localizationsDelegates: const [
        // Türkçe dil desteği için delegeler
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('tr', 'TR'),
        Locale('en', 'US'),
      ],
      locale: const Locale('tr', 'TR'),
    );
  }
}

class HayvanSagligiHomePage extends StatefulWidget {
  const HayvanSagligiHomePage({super.key});

  @override
  State<HayvanSagligiHomePage> createState() => _HayvanSagligiHomePageState();
}

class _HayvanSagligiHomePageState extends State<HayvanSagligiHomePage> {
  int _selectedIndex = 0;
  late String _userType;
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Önceki sayfadan gelen kullanıcı tipini al
    _userType = ModalRoute.of(context)?.settings.arguments as String? ?? 'veteriner';
  }
  
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    // Kullanıcı tipine göre farklı sayfalar göster
    final List<Widget> _pages = _userType == 'veteriner'
        ? [
            const VeterinerAnaSayfaScreen(),
            const HastalarScreen(),
            RandevularScreen(userType: _userType),
            const AsiTakipScreen(),
            const ProfilView(),
          ]
        : [
            const SahipAnaSayfaScreen(), // Hayvan sahipleri için özel ana sayfa
            const HastalarScreen(),
            RandevularScreen(userType: _userType),
            const ProfilView(),
          ];
    
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(_userType == 'veteriner' 
            ? 'Hayvan Sağlığı Sistemi - Veteriner' 
            : 'Hayvan Sağlığı Sistemi - Sahip'),
        actions: [
          IconButton(
            icon: const Icon(Icons.exit_to_app),
            onPressed: () {
              // Çıkış yapıp login ekranına dön
              Navigator.pushReplacementNamed(context, '/');
            },
          ),
        ],
      ),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: _userType == 'veteriner'
            ? <BottomNavigationBarItem>[
                const BottomNavigationBarItem(
                  icon: Icon(Icons.home),
                  label: 'Ana Sayfa',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(Icons.pets),
                  label: 'Hastalar',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(Icons.calendar_today),
                  label: 'Randevular',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(Icons.vaccines),
                  label: 'Aşılar',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(Icons.person),
                  label: 'Profil',
                ),
              ]
            : <BottomNavigationBarItem>[
                const BottomNavigationBarItem(
                  icon: Icon(Icons.home),
                  label: 'Ana Sayfa',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(Icons.pets),
                  label: 'Hayvanlarım',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(Icons.calendar_today),
                  label: 'Randevularım',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(Icons.person),
                  label: 'Profil',
                ),
              ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.green,
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}

// Basit profil görünümü
class ProfilView extends StatelessWidget {
  const ProfilView({super.key});

  @override
  Widget build(BuildContext context) {
    final userType = ModalRoute.of(context)?.settings.arguments as String? ?? 'veteriner';
    
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircleAvatar(
            radius: 50,
            backgroundColor: Colors.green,
            child: Icon(Icons.person, size: 50, color: Colors.white),
          ),
          const SizedBox(height: 16),
          Text(
            userType == 'veteriner' 
              ? 'Dr. Mehmet Öz' 
              : 'Ahmet Yılmaz',
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            userType == 'veteriner'
            ? 'Veteriner Hekim'
            : 'Hayvan Sahibi'
          ),
          const SizedBox(height: 4),
          const Text('example@mail.com'),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {},
            child: const Text('Profili Düzenle'),
          ),
        ],
      ),
    );
  }
}
