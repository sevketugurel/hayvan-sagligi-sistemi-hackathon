import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/hayvan.dart';
import '../models/sahip.dart';

class ApiService {
  final String baseUrl = 'http://localhost:8080/api'; // Android emulator ip for localhost
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  Future<String?> _getToken() async {
    return await _secureStorage.read(key: 'token');
  }

  Future<dynamic> _makeRequest(String url, String method, {Map<String, dynamic>? body}) async {
    final token = await _getToken();
    final headers = {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };

    http.Response response;
    
    try {
      if (method == 'GET') {
        response = await http.get(Uri.parse(url), headers: headers);
      } else if (method == 'POST') {
        response = await http.post(
          Uri.parse(url),
          headers: headers,
          body: jsonEncode(body),
        );
      } else if (method == 'PUT') {
        response = await http.put(
          Uri.parse(url),
          headers: headers,
          body: jsonEncode(body),
        );
      } else if (method == 'DELETE') {
        response = await http.delete(Uri.parse(url), headers: headers);
      } else {
        throw Exception('Geçersiz HTTP metodu');
      }

      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body);
      } else if (response.statusCode == 401) {
        throw Exception('Oturum süresi doldu');
      } else {
        throw Exception('API isteği başarısız oldu: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Bağlantı hatası: $e');
    }
  }

  // Hayvan API istekleri
  Future<List<Hayvan>> getHayvanlar() async {
    final data = await _makeRequest('$baseUrl/hayvanlar', 'GET');
    return (data as List).map((item) => Hayvan.fromJson(item)).toList();
  }

  Future<Hayvan> getHayvan(int id) async {
    final data = await _makeRequest('$baseUrl/hayvanlar/$id', 'GET');
    return Hayvan.fromJson(data);
  }

  Future<Hayvan> createHayvan(Hayvan hayvan) async {
    final data = await _makeRequest('$baseUrl/hayvanlar', 'POST', body: hayvan.toJson());
    return Hayvan.fromJson(data);
  }

  Future<Hayvan> updateHayvan(Hayvan hayvan) async {
    final data = await _makeRequest('$baseUrl/hayvanlar/${hayvan.id}', 'PUT', body: hayvan.toJson());
    return Hayvan.fromJson(data);
  }

  Future<void> deleteHayvan(int id) async {
    await _makeRequest('$baseUrl/hayvanlar/$id', 'DELETE');
  }

  // Sahip API istekleri
  Future<List<Sahip>> getSahipler() async {
    final data = await _makeRequest('$baseUrl/sahipler', 'GET');
    return (data as List).map((item) => Sahip.fromJson(item)).toList();
  }

  Future<Sahip> getSahip(int id) async {
    final data = await _makeRequest('$baseUrl/sahipler/$id', 'GET');
    return Sahip.fromJson(data);
  }

  Future<Sahip> createSahip(Sahip sahip) async {
    final data = await _makeRequest('$baseUrl/sahipler', 'POST', body: sahip.toJson());
    return Sahip.fromJson(data);
  }

  Future<Sahip> updateSahip(Sahip sahip) async {
    final data = await _makeRequest('$baseUrl/sahipler/${sahip.id}', 'PUT', body: sahip.toJson());
    return Sahip.fromJson(data);
  }

  Future<void> deleteSahip(int id) async {
    await _makeRequest('$baseUrl/sahipler/$id', 'DELETE');
  }

  // Kimlik doğrulama istekleri
  Future<bool> login(String email, String password) async {
    try {
      final data = await _makeRequest(
        '$baseUrl/auth/login',
        'POST',
        body: {'email': email, 'password': password},
      );
      
      await _secureStorage.write(key: 'token', value: data['token']);
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<void> logout() async {
    await _secureStorage.delete(key: 'token');
  }
} 