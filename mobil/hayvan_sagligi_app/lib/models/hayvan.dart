class Hayvan {
  final int? id;
  final String ad;
  final String cins;
  final String tur;
  final double kilo;
  final String cinsiyet;
  final String dogumTarihi;
  final int? sahipId;

  Hayvan({
    this.id,
    required this.ad,
    required this.cins,
    required this.tur,
    required this.kilo,
    required this.cinsiyet,
    required this.dogumTarihi,
    this.sahipId,
  });

  factory Hayvan.fromJson(Map<String, dynamic> json) {
    return Hayvan(
      id: json['id'],
      ad: json['ad'],
      cins: json['cins'],
      tur: json['tur'],
      kilo: json['kilo'].toDouble(),
      cinsiyet: json['cinsiyet'],
      dogumTarihi: json['dogumTarihi'],
      sahipId: json['sahipId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'ad': ad,
      'cins': cins,
      'tur': tur,
      'kilo': kilo,
      'cinsiyet': cinsiyet,
      'dogumTarihi': dogumTarihi,
      'sahipId': sahipId,
    };
  }
} 