class BuyukbasKupe {
  final int? id;
  final String kupeNo;
  final String hayvanTuru; // Sığır, Koyun, Keçi vb.
  final String hayvanIrki;
  final String cinsiyet;
  final String dogumTarihi;
  final String islemTarihi;
  final String sahipAdSoyad;
  final String sahipTcNo;
  final String adres;
  final String ilce;
  final String il;
  final String islemDurumu; // Bekliyor, Tamamlandı, İptal
  final String koordinat; // Enlem,Boylam formatında
  final String? notlar;
  final List<String> fotograflar; // Fotoğraf yolları
  final bool esync; // E-Sync ile sisteme yüklenip yüklenmediği
  
  BuyukbasKupe({
    this.id,
    required this.kupeNo,
    required this.hayvanTuru,
    required this.hayvanIrki,
    required this.cinsiyet,
    required this.dogumTarihi,
    required this.islemTarihi,
    required this.sahipAdSoyad,
    required this.sahipTcNo,
    required this.adres,
    required this.ilce,
    required this.il,
    required this.islemDurumu,
    required this.koordinat,
    this.notlar,
    required this.fotograflar,
    required this.esync,
  });

  // JSON Serileştirme / Deserileştirme metodları
  factory BuyukbasKupe.fromJson(Map<String, dynamic> json) {
    return BuyukbasKupe(
      id: json['id'],
      kupeNo: json['kupeNo'],
      hayvanTuru: json['hayvanTuru'],
      hayvanIrki: json['hayvanIrki'],
      cinsiyet: json['cinsiyet'],
      dogumTarihi: json['dogumTarihi'],
      islemTarihi: json['islemTarihi'],
      sahipAdSoyad: json['sahipAdSoyad'],
      sahipTcNo: json['sahipTcNo'],
      adres: json['adres'],
      ilce: json['ilce'],
      il: json['il'],
      islemDurumu: json['islemDurumu'],
      koordinat: json['koordinat'],
      notlar: json['notlar'],
      fotograflar: List<String>.from(json['fotograflar']),
      esync: json['esync'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'kupeNo': kupeNo,
      'hayvanTuru': hayvanTuru,
      'hayvanIrki': hayvanIrki,
      'cinsiyet': cinsiyet,
      'dogumTarihi': dogumTarihi,
      'islemTarihi': islemTarihi,
      'sahipAdSoyad': sahipAdSoyad,
      'sahipTcNo': sahipTcNo,
      'adres': adres,
      'ilce': ilce,
      'il': il,
      'islemDurumu': islemDurumu,
      'koordinat': koordinat,
      'notlar': notlar,
      'fotograflar': fotograflar,
      'esync': esync,
    };
  }
} 