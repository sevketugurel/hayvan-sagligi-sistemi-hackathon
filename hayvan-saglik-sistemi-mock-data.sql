USE hayvansaglikdb;
GO

-- =============================================
-- Temel Mock Veriler 
-- =============================================

-- Personel (Veterinerler)
INSERT INTO personel (ad, soyad, e_posta, telefon, ise_baslama_tarihi, aktif)
VALUES 
    ('Mehmet', 'Yılmaz', 'mehmet.yilmaz@klinik.com', '05321234567', '2018-06-15', 1),
    ('Ayşe', 'Demir', 'ayse.demir@klinik.com', '05331234567', '2019-03-10', 1),
    ('Mert', 'Özçelik', 'mert.ozcelik@klinik.com', '05341234567', '2020-09-22', 1),
    ('Deniz', 'Kaya', 'deniz.kaya@klinik.com', '05351234567', '2021-01-05', 1);
GO

-- Rol 
INSERT INTO rol (ad)
VALUES 
    ('Veteriner Hekim'),
    ('Asistan'),
    ('Yönetici'),
    ('Resepsiyonist');
GO

-- Personel Rol İlişkisi
INSERT INTO personel_rol (personel_id, rol_id)
VALUES 
    (1, 1), -- Mehmet Yılmaz - Veteriner Hekim
    (2, 1), -- Ayşe Demir - Veteriner Hekim
    (3, 1), -- Mert Özçelik - Veteriner Hekim
    (3, 3), -- Mert Özçelik - Yönetici
    (4, 2); -- Deniz Kaya - Asistan
GO

-- Sahip
INSERT INTO sahip (ad, soyad, telefon1, telefon2, e_posta, adres, tercih_edilen_iletisim)
VALUES 
    ('Ahmet', 'Yılmaz', '05551234567', '', 'ahmet@email.com', 'Atatürk Mah. Gül Sok. No:12 D:5 Kadıköy/İstanbul', 'Telefon');
GO

-- Türler
INSERT INTO tur (isim)
VALUES 
    ('Köpek'),
    ('Kedi'),
    ('Kuş'),
    ('Kemirgen'),
    ('Sürüngen');
GO

-- Irklar
INSERT INTO irk (tur_id, isim)
VALUES 
    (1, 'Golden Retriever'),
    (1, 'Labrador'),
    (1, 'Alman Çoban Köpeği'),
    (2, 'British Shorthair'),
    (2, 'Scottish Fold'),
    (2, 'Tekir');
GO

-- İlaçlar
INSERT INTO ilac (ilac_ad, aktif_madde, kullanim_alani, uygulama_yolu, notlar)
VALUES 
    ('Amoksisilin 250mg Tablet', 'Amoksisilin', 'Antibiyotik', 'Oral', 'Bakteriyel enfeksiyonlar için'),
    ('Gentamisin Kulak Damlası', 'Gentamisin', 'Antibiyotik', 'Lokal', 'Kulak enfeksiyonları için'),
    ('Prednizolon 5mg Tablet', 'Prednizolon', 'Kortikosteroid', 'Oral', 'Anti-enflamatuar ve immünosupresif'),
    ('Metronidazol 250mg Tablet', 'Metronidazol', 'Antibiyotik', 'Oral', 'Anaerob bakteri ve protozoa enfeksiyonları için'),
    ('Meloksikam Enjeksiyon', 'Meloksikam', 'NSAID', 'Enjeksiyon', 'Ağrı ve enflamasyon için'),
    ('Sefazolin 500mg Tablet', 'Sefazolin', 'Antibiyotik', 'Oral', 'Bakteriyel enfeksiyonlar için'),
    ('Probiyotik Süspansiyon', 'Çeşitli probiyotik suşlar', 'Bağırsak florası düzenleyici', 'Oral', 'Sindirim sistemi için'),
    ('Elektrolit Solüsyon', 'Elektrolit karışımı', 'Dehidrasyon tedavisi', 'Oral', 'Sıvı-elektrolit dengesi için'),
    ('Karaciğer Desteği Şurup', 'SAMe, Milk thistle', 'Karaciğer koruyucu', 'Oral', 'Karaciğer rahatsızlıkları için'),
    ('Anti-enflamatuar Krem', 'Çeşitli anti-enflamatuar bileşenler', 'Cilt enflamasyonu', 'Lokal', 'Cilt hastalıkları için');
GO

-- Hayvan
INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
VALUES 
    (1, 'Max', 1, 1, 'Erkek', '2020-05-10', 32.5, 'Sarı', '123456789012345', 'Tavuk proteini', 'Kronik böbrek yetmezliği');
GO

-- =============================================
-- Klinik İnceleme Verileri
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (1, '2023-07-10', 1, 'Sahibi 3 gündür iştahsızlık ve enerji düşüklüğü olduğunu belirtti.', 'İştahsızlık, halsizlik, aşırı su tüketimi', 'Hafif dehidrasyon belirtileri. Solunum ve nabız normal. Ateş yok. Oral mukozada hafif solukluk.', 'Gastroenterit', 'Dehidrasyon', 'Subkutan sıvı tedavisi, antiemetik enjeksiyon, probiotic verildi.'),
    (1, '2023-08-15', 2, 'Kontrol muayenesi. Sahibi dün akşamdan itibaren ishal şikayeti olduğunu belirtti.', 'İshal, karın bölgesinde rahatsızlık', 'Hafif ishal şikayeti. Dehidrasyon yok. Abdominal bölgede hafif hassasiyet saptandı.', 'Akut Gastrit', NULL, 'Diyet önerildi, bağırsak florasını düzenleyici ilaçlar reçete edildi.'),
    (1, '2023-09-05', 1, 'Yıllık sağlık kontrolü için geldi.', 'Herhangi bir şikayet yok', 'Genel sağlık durumu iyi. Ağız içi kontrol yapıldı, diş taşları tespit edildi.', 'Sağlıklı', 'Diş taşı birikimi', 'Diş taşı temizliği önerildi, sonbahar aşıları yapıldı.');
GO

-- =============================================
-- Hastalık Geçmişi Verileri
-- =============================================
INSERT INTO hastalik_gecmisi (hayvan_id, hastalik_adi, tani_tarihi, iyilesme_tarihi, detaylar, tedavi, hastanede_yatis, yatis_gun_sayisi, durum)
VALUES 
    (1, 'Akut Gastroenterit', '2022-06-05', '2022-06-15', 'Şiddetli kusma ve ishal ile başvurdu. Kan testlerinde hafif elektrolitik dengesizlik tespit edildi.', 'Antibiyotik tedavisi (Amoksisilin), diyet düzenlemesi, IV sıvı tedavisi uygulandı.', 1, 3, 'İyileşti'),
    (1, 'Otit', '2023-03-20', '2023-03-25', 'Sol kulakta kaşıntı ve kızarıklık şikayeti. Kulak salgısı örneği alındı, malassezia tespit edildi.', 'Kulak damlaları (Gentamisin), oral antibiyotik', 0, 0, 'İyileşti'),
    (1, 'Kronik Böbrek Yetmezliği', '2023-05-10', NULL, 'Yaşa bağlı böbrek fonksiyon düşüklüğü. Kan üre ve kreatinin seviyelerinde artış gözlendi.', 'Özel diyet, periyodik subkutan sıvı tedavisi, fosfat bağlayıcılar', 0, 0, 'Devam Ediyor');
GO

-- =============================================
-- Randevu Verileri
-- =============================================
INSERT INTO randevular (hayvan_id, tarih, saat, sebep, durum, tipi, notlar)
VALUES 
    (1, '2023-10-15', '09:30', 'Genel sağlık kontrolü', 'Tamamlandı', 'examination', 'Rutin yıllık kontrol'),
    (1, '2023-10-15', '14:15', 'Kuduz Aşısı', 'Tamamlandı', 'vaccine', 'Zorunlu aşı, sorunsuz uygulandı'),
    (1, '2023-10-22', '11:00', 'Deri problemleri', 'Tamamlandı', 'examination', 'Sağ arka bacakta yoğun kaşıntı şikayeti'),
    (1, '2023-10-29', '16:30', 'Tedavi takibi', 'Tamamlandı', 'treatment', 'Deri enfeksiyonu tedavisinin kontrolü'),
    (1, '2023-11-05', '10:45', 'Aşı - Köpek Gençlik Hastalığı', 'Tamamlandı', 'vaccine', 'Yıllık aşı tekrarı'),
    (1, '2023-11-10', '13:00', 'Diş kontrolü', 'Tamamlandı', 'examination', 'Diş taşı kontrolü ve temizliği'),
    (1, '2023-11-17', '15:30', 'İlaç tedavisi - Final', 'Tamamlandı', 'treatment', 'Deri enfeksiyonu tedavisinin son aşaması'),
    (1, '2023-11-20', '11:30', 'Karma Aşı', 'Planlandı', 'vaccine', 'Koruyucu karma aşı uygulaması'),
    (1, '2023-11-25', '09:15', 'Kan testi', 'Planlandı', 'treatment', 'Rutin kan değerleri kontrolü'),
    (1, '2023-12-05', '14:00', 'Böbrek kontrol muayenesi', 'Planlandı', 'examination', 'Kronik rahatsızlık takibi'),
    (1, '2023-12-12', '16:45', 'Ultrason', 'Planlandı', 'treatment', 'Abdominal ultrason kontrolü'),
    (1, '2023-12-15', '09:45', '6 aylık kontrol', 'Planlandı', 'examination', 'Genel durum değerlendirmesi'),
    (1, '2023-12-23', '10:30', 'Parazit ilacı', 'Planlandı', 'treatment', 'Düzenli parazit koruma tedavisi');
GO

-- =============================================
-- Radyolojik Görüntüleme Verileri
-- =============================================
INSERT INTO radyolojik_goruntuleme (hayvan_id, tarih, tipi, bolge, bulgular, goruntu_url, notlar)
VALUES 
    (1, '2023-08-15', 'Röntgen', 'Toraks', 'Akciğer ve kalp silueti normal. Patolojik bulgu saptanmadı.', 'xray-url.jpg', 'Rutin yıllık kontrol amaçlı çekildi.'),
    (1, '2023-08-16', 'USG', 'Abdomen', 'Hafif karaciğer büyümesi, diğer organlar normal görünümde.', 'ultrasound-url.jpg', 'Karaciğer enzim yüksekliği nedeniyle çekildi.'),
    (1, '2023-09-20', 'EKG', 'Kardiyak', 'Normal sinüs ritmi. Kalp hızı: 120 atım/dk. PR interval ve QRS kompleksi normal sınırlarda.', 'ekg-url.jpg', 'Pre-operatif değerlendirme için çekildi.'),
    (1, '2023-10-05', 'BT', 'Baş', 'Sağ kulak kanalında hafif inflamasyon. İç kulak yapıları normal.', 'ct-url.jpg', 'Tekrarlayan otit şikayeti nedeniyle yapıldı.'),
    (1, '2023-10-12', 'MR', 'Lumbosakral', 'L4-L5 arasında hafif disk protrüzyonu. Spinal kord basısı yok.', 'mri-url.jpg', 'Arka ayak zayıflığı şikayeti için inceleme yapıldı.');
GO

-- =============================================
-- Laboratuvar Testleri Verileri
-- =============================================
INSERT INTO lab_testleri (hayvan_id, tarih, test_adi, sonuclar, rapor_url)
VALUES 
    (1, '2023-08-10', 'Tam Kan Sayımı', 'Normal değerler', 'report-url.pdf'),
    (1, '2023-08-10', 'Karaciğer Fonksiyon Testleri', 'ALT hafif yüksek', 'report-url.pdf'),
    (1, '2023-10-05', 'Böbrek Fonksiyon Testi', 'BUN ve Kreatinin yüksek', 'kidney-report.pdf'),
    (1, '2023-10-05', 'İdrar Tahlili', 'Protein +1, diğer değerler normal', 'urine-report.pdf');
GO

-- =============================================
-- Laboratuvar Test Detayları Verileri
-- =============================================
INSERT INTO lab_test_detaylari (test_id, parametre, deger, birim, referans_araligi, durum)
VALUES 
    -- Tam Kan Sayımı Detayları
    (1, 'WBC', '10.5', '10^3/µL', '6.0-17.0', 'Normal'),
    (1, 'RBC', '6.8', '10^6/µL', '5.5-8.5', 'Normal'),
    (1, 'HGB', '15.2', 'g/dL', '12.0-18.0', 'Normal'),
    (1, 'HCT', '45', '%', '37-55', 'Normal'),
    (1, 'PLT', '320', '10^3/µL', '200-500', 'Normal'),
    -- Karaciğer Fonksiyon Testleri Detayları
    (2, 'ALT', '110', 'U/L', '10-100', 'Yüksek'),
    (2, 'AST', '45', 'U/L', '0-50', 'Normal'),
    (2, 'ALP', '95', 'U/L', '23-212', 'Normal'),
    (2, 'GGT', '5', 'U/L', '0-7', 'Normal'),
    (2, 'Total Bilirubin', '0.3', 'mg/dL', '0.0-0.9', 'Normal'),
    -- Böbrek Fonksiyon Testi Detayları
    (3, 'BUN', '32', 'mg/dL', '7-27', 'Yüksek'),
    (3, 'Kreatinin', '1.8', 'mg/dL', '0.5-1.5', 'Yüksek'),
    (3, 'Fosfor', '4.8', 'mg/dL', '2.5-6.8', 'Normal'),
    (3, 'Kalsiyum', '10.2', 'mg/dL', '9.0-11.3', 'Normal'),
    -- İdrar Tahlili Detayları
    (4, 'Renk', 'Sarı', '', 'Sarı', 'Normal'),
    (4, 'Berraklık', 'Hafif Bulanık', '', 'Berrak', 'Anormal'),
    (4, 'pH', '6.5', '', '5.5-7.5', 'Normal'),
    (4, 'Protein', '+1', '', 'Negatif', 'Yüksek'),
    (4, 'Glukoz', 'Negatif', '', 'Negatif', 'Normal'),
    (4, 'Keton', 'Negatif', '', 'Negatif', 'Normal'),
    (4, 'Bilirubin', 'Negatif', '', 'Negatif', 'Normal'),
    (4, 'Kan', 'Negatif', '', 'Negatif', 'Normal');
GO

-- =============================================
-- Reçete Verileri
-- =============================================
INSERT INTO receteler (hayvan_id, tarih, sure, veteriner_id, veteriner_klinigi)
VALUES 
    (1, '2023-08-15', '7 gün', 1, 'Hayat Veteriner Kliniği'),
    (1, '2023-03-25', '5 gün', 2, 'Hayat Veteriner Kliniği'),
    (1, '2023-02-10', '10 gün', 1, 'Hayat Veteriner Kliniği'),
    (1, '2023-01-05', '7 gün', 2, 'Hayat Veteriner Kliniği');
GO

-- =============================================
-- Reçete İlaçları Verileri
-- =============================================
INSERT INTO recete_ilaclari (recete_id, ilac_adi)
VALUES 
    (1, 'Amoksisilin 250mg Tablet (2x1)'),
    (1, 'Probiyotik Süspansiyon (1x1)'),
    (2, 'Gentamisin Kulak Damlası (3x1)'),
    (2, 'Prednizolon 5mg Tablet (1x1, azalan dozda)'),
    (3, 'Metronidazol 250mg Tablet (2x1)'),
    (3, 'Elektrolit Solüsyon (günde 2 kez, 10ml)'),
    (3, 'Karaciğer Desteği Şurup (1x1)'),
    (4, 'Meloksikam Enjeksiyon (tek doz)'),
    (4, 'Sefazolin 500mg Tablet (2x1)'),
    (4, 'Anti-enflamatuar Krem (2x1, lokal uygulama)');
GO

-- =============================================
-- Aşı Verileri
-- =============================================
INSERT INTO asilar (hayvan_id, tarih, asi_adi, sonraki_tarih, durum, notlar)
VALUES 
    (1, '2021-05-10', 'Kuduz Aşısı', '2022-05-10', 'Tamamlandı', 'Yıllık zorunlu aşı'),
    (1, '2022-06-15', 'Kuduz Aşısı', '2023-06-15', 'Tamamlandı', 'Yıllık zorunlu aşı'),
    (1, '2023-07-20', 'Kuduz Aşısı', '2024-07-20', 'Tamamlandı', 'Yıllık zorunlu aşı'),
    (1, '2022-08-05', 'Köpek Gençlik Hastalığı Aşısı', '2023-08-05', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (1, '2023-09-12', 'Karma Aşı (DHPP)', '2024-09-12', 'Tamamlandı', 'Distemper, Hepatit, Parvovirüs, Parainfluenza'),
    (1, NULL, 'Lyme Hastalığı Aşısı', '2023-11-28', 'Planlandı', 'İlk kez uygulanacak'),
    (1, NULL, 'Bordetella Aşısı', '2023-12-15', 'Planlandı', 'Kennel Cough (Köpek Öksürüğü) için');
GO

-- =============================================
-- Alerji ve Kronik Hastalıklar Verileri
-- =============================================
INSERT INTO alerji_kronik (hayvan_id, tipi, allerjen_veya_hastalik, siddet, belirtiler, tani_tarihi, teshis_koyan_id, durum, notlar)
VALUES 
    (1, 'allergy', 'Tavuk proteini', 'Orta', 'Kaşıntı, kızarıklık, deri tahrişi, hafif şişlik', '2022-06-15', 1, 'Aktif', 'Gıda alerjisi, tavuk içeren mamalardan kaçınılmalı. Sığır ve kuzu proteini içeren diyetler tercih edilmeli.'),
    (1, 'allergy', 'Polen', 'Hafif', 'Hapşırma, gözlerde sulanma, burun akıntısı', '2023-04-20', 2, 'Mevsimsel', 'Mevsimsel alerji, bahar aylarında belirgin. Semptomlar görüldüğünde ilaç tedavisi başlanmalı.'),
    (1, 'chronic', 'Kronik Böbrek Yetmezliği', 'Ciddi', 'Aşırı su tüketimi, sık idrara çıkma, iştah azalması, kilo kaybı', '2023-05-10', 1, 'Aktif - Takip Altında', 'Yaşa bağlı böbrek fonksiyon düşüklüğü. Kan üre ve kreatinin seviyelerinde artış gözlendi. 3 ayda bir kontrol önerilir.'),
    (1, 'chronic', 'Eklem Rahatsızlığı (Osteoartrit)', 'Orta', 'Hareketlerde kısıtlılık, eklem ağrısı, sabah tutukluğu', '2023-08-05', 2, 'Aktif - Tedavi Altında', 'Yaşa bağlı olarak özellikle arka bacak eklemlerinde gelişen osteoartrit. Aşırı aktiviteden kaçınılmalı, düzenli kısa yürüyüşler önerilir.');
GO

-- =============================================
-- Alerji/Kronik Hastalık Tedavileri Verileri
-- =============================================
INSERT INTO alerji_kronik_tedavi (alerji_id, tedavi)
VALUES 
    (1, 'Hipoalerjenik diyet'),
    (1, 'Antihistamin (gerektiğinde)'),
    (2, 'Antihistamin (mevsimsel)'),
    (2, 'Göz damlaları'),
    (3, 'Özel renal diyet'),
    (3, 'Periyodik subkutan sıvı tedavisi'),
    (3, 'Fosfat bağlayıcılar'),
    (4, 'Düşük doz NSAİD'),
    (4, 'Eklem desteği takviyesi'),
    (4, 'Kontrollü egzersiz');
GO

-- =============================================
-- Patolojik Bulgular Verileri
-- =============================================
INSERT INTO patolojik_bulgular (hayvan_id, rapor_no, tarih, uygulayan, ornek_tipi, ornek_lokasyonu, ornek_no, makroskopik_bulgular, mikroskopik_bulgular, tani, derece, sinirlar, metastaz_riski, yorumlar)
VALUES 
    (1, '2025-PAT-0142', '2023-08-24', 'AHMET YILDIZ', 'DOKU BİYOPSİSİ', 'DERİ - SOL ÖN BACAK', 'S-2025-742', 
    'Sol ön bacak lateral yüzünden alınmış 3.5 x 2.8 cm boyutlarında, oval şekilli deri biyopsisi. Kesit yüzeyi düzensiz, üst kısımda 2.2 x 1.8 cm boyutlarında düzgün sınırlı, grimsi beyaz renkte, sert kıvamlı nodüler kitle izlenmektedir.',
    'Histopatolojik incelemede, dermiste iyi sınırlı, kapsüllü, yoğun kollajenöz stroma içerisinde iğsi hücrelerin düzensiz demetler oluşturduğu neoplastik doku izlenmektedir. Neoplastik hücreler, hafif pleomorfik, eozinofilik sitoplazmalı, oval-iğsi nükleuslu olup, mitotik aktivite düşüktür (1-2/10 BBA).',
    'DÜŞÜK DERECELİ KUTANÖZ LEİOMYOSARKOM',
    'I (Düşük Dereceli)',
    'Cerrahi sınırlarda tümör hücresi görülmemektedir (Temiz Sınır)',
    'Düşük (%10-15)',
    'Düşük dereceli kutanöz leiomyosarkom tanısı konulan bu olguda, cerrahi sınırlar temiz olmakla birlikte, bölgesel lenf nodlarının kontrolü önerilir. Tümörün düşük dereceli olması ve temiz cerrahi sınırlarla çıkarılmış olması nedeniyle ek tedaviye gerek yoktur.');
GO

-- =============================================
-- Nekropsi Bulgular Verileri
-- =============================================
INSERT INTO nekropsi_bulgular (hayvan_id, tarih, veteriner, bulgular, rapor_no, rapor_tarihi, uygulayan, tur, irk, yas, kimlik_no)
VALUES 
    (1, '2023-05-03', 'Dr. Mert Özçelik', 
    'Otopsi incelemesinde, abdominal kavitede yaklaşık 500 ml sarı, berrak sıvı saptandı. Karaciğer büyümüş ve yüzeyi düzensiz görünümdeydi. Histopatolojik incelemede kronik hepatit bulguları tespit edildi. Akciğerlerde belirgin bir patoloji saptanmadı. Mide mukozası hiperemikti, ancak ülserasyon gözlenmedi. Böbrekler normal boyutta fakat soluk görünümdeydi. Mikroskobik inceleme böbrek tübüler nekrozu gösterdi. Kalp normal boyutta, herhangi bir anomali saptanmadı. Beyin ve omurilik incelemesinde ödem haricinde belirgin patoloji görülmedi. Ölüm sebebi karaciğer ve böbrek yetmezliği olarak değerlendirildi.', 
    '2025-NEK-0040', '2023-05-03', 'Dr. Mert Özçelik', 'Köpek', 'Golden Retriever', 8, '987654321098765');
GO

-- =============================================
-- Notlar Verileri
-- =============================================
INSERT INTO notlar (hayvan_id, tarih, yazar, icerik)
VALUES 
    (1, '2023-08-15', 'Dr. Ayşe Demir', 'Hasta sahibi düzenli ilaç kullanımı konusunda tekrar bilgilendirildi. Antibiyotik tedavisinin tamamlanmasının önemini vurguladık. Hasta sahibi anlayış gösterdi ve geri kalan tedaviyi tamamlayacağını belirtti.'),
    (1, '2023-09-25', 'Dr. Mehmet Yılmaz', 'Yaşına göre iyi durumda. Kilo takibi önerildi. Mevcut diyetine devam etmesi gerektiği konusunda uyarıldı. Aylık tartım ve 3 ayda bir kontrol önerildi. Diyet programında herhangi bir değişiklik gerekmemektedir.'),
    (1, '2023-10-10', 'Dr. Ayşe Demir', 'Kronik böbrek rahatsızlığı için kontrol muayenesi yapıldı. Kan değerleri stabil seyrediyor. Mevcut tedaviye ve diyete devam edilmesi önerildi. Hasta sahibine sıvı tüketiminin önemi ve takibi hakkında bilgi verildi.'),
    (1, '2023-11-05', 'Dr. Mehmet Yılmaz', 'Yıllık aşı programı planlandı. Önceki aşı reaksiyonları olmadığı teyit edildi. Hasta sahibi, alerji durumunda görülebilecek semptomlar konusunda bilgilendirildi ve herhangi bir anormal durum gözlemlenmesi halinde hemen klinikle iletişime geçmesi önerildi.');
GO

PRINT 'Hayvan Sağlığı Sistemi veri tabanına mock veriler başarıyla eklendi.';
GO 