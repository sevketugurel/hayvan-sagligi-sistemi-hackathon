import 'mock_api_service.dart';

class ServiceProvider {
  // Singleton pattern
  static final ServiceProvider _instance = ServiceProvider._internal();
  
  factory ServiceProvider() {
    return _instance;
  }
  
  ServiceProvider._internal();
  
  // Mock API servisini döndür
  MockApiService get apiService => MockApiService();
} 