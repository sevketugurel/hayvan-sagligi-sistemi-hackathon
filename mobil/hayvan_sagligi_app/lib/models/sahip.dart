class Sahip {
  final int? id;
  final String ad;
  final String soyad;
  final String telefon;
  final String email;
  final String adres;

  Sahip({
    this.id,
    required this.ad,
    required this.soyad,
    required this.telefon,
    required this.email,
    required this.adres,
  });

  factory Sahip.fromJson(Map<String, dynamic> json) {
    return Sahip(
      id: json['id'],
      ad: json['ad'],
      soyad: json['soyad'],
      telefon: json['telefon'],
      email: json['email'],
      adres: json['adres'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'ad': ad,
      'soyad': soyad,
      'telefon': telefon,
      'email': email,
      'adres': adres,
    };
  }

  String get tamAd => '$ad $soyad';
} 