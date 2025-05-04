USE hayvansaglikdb;
GO

-- =============================================
-- Daha Fazla Sahip Verileri
-- =============================================
INSERT INTO sahip (ad, soyad, telefon1, telefon2, e_posta, adres, tercih_edilen_iletisim)
VALUES 
    ('Hasan', 'Aydın', '05556667788', '', 'hasan@email.com', 'Ataşehir Mah. Güneş Sok. No:42 D:15 Ataşehir/İstanbul', 'Telefon'),
    ('Fatma', 'Şahin', '05557778899', '05327778899', 'fatma@email.com', 'Bağdat Cad. No:156 D:8 Kadıköy/İstanbul', 'E-posta'),
    ('Emre', 'Kılıç', '05558889900', '', 'emre@email.com', 'Göztepe Mah. Bağdat Cad. No:217 D:5 Kadıköy/İstanbul', 'Telefon'),
    ('Seda', 'Yıldırım', '05559990011', '05359990011', 'seda@email.com', 'Erenköy Mah. Çamlık Sok. No:8 D:3 Kadıköy/İstanbul', 'Telefon'),
    ('Kemal', 'Özkan', '05551112233', '', 'kemal@email.com', 'Kozyatağı Mah. Şemsettin Sok. No:24 D:12 Kadıköy/İstanbul', 'E-posta');
GO

-- =============================================
-- Daha Fazla Hayvan Verileri
-- =============================================
INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
VALUES 
    -- Hasan Aydın'ın hayvanları
    (7, 'Çakıl', 1, 2, 'Erkek', '2017-12-03', 31.2, 'Sarı', '901234567890123', 'Penisilin', 'Tip 1 Diabetes Mellitus'),
    
    -- Fatma Şahin'in hayvanları
    (8, 'Minnoş', 2, 5, 'Dişi', '2020-04-18', 3.7, 'Gri-Beyaz', '012345678901234', NULL, NULL),
    (8, 'Oscar', 2, 4, 'Erkek', '2018-09-14', 5.2, 'Mavi Gri', '123456789012345', 'Balık proteini', 'Kronik Böbrek Yetmezliği'),
    
    -- Emre Kılıç'ın hayvanları
    (9, 'Tarçın', 1, 1, 'Dişi', '2019-11-22', 28.5, 'Kızıl-Altın', '234567890123456', NULL, 'Hipotiroidi'),
    
    -- Seda Yıldırım'ın hayvanları
    (10, 'Mia', 2, 6, 'Dişi', '2021-07-09', 3.4, 'Siyah-Beyaz', '345678901234567', NULL, NULL),
    
    -- Kemal Özkan'ın hayvanları
    (11, 'Pati', 1, 3, 'Erkek', '2020-02-26', 34.1, 'Siyah-Tan', '456789012345678', 'Mısır, Soya', 'Koksofemoral Artrit');
GO

-- =============================================
-- Çakıl (Labrador) için Klinik İnceleme Verileri - Diyabet
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (9, '2021-10-10', 1, 'Sahibi köpeğinin son zamanlarda çok su içtiğini, sık idrara çıktığını ve kilo kaybettiğini belirtti.', 'Polidipsi, poliüri, kilo kaybı', 'Dehidrasyon belirtileri, kas kaybı, kan glukozu 320 mg/dL, idrarda glukoz (++++).', 'Diabetes Mellitus', 'Dehidrasyon', 'Kan şekeri düzenleme, insülin tedavisi (NPH insülin 0.5 U/kg 2x1), düşük karbonhidratlı diyet.'),
    (9, '2021-10-17', 2, 'İnsülin tedavisi başlangıcı sonrası kontrol', 'Semptomlar azalmış', 'Kan şekeri 210 mg/dL, dehidrasyon düzelmiş.', 'Diabetes Mellitus - Regülasyon sürecinde', NULL, 'İnsülin dozunun titrasyonu (0.7 U/kg 2x1), diyet ve egzersiz programı düzenlendi.'),
    (9, '2021-11-15', 1, 'Aylık diyabet kontrolü', 'Genel durumu iyi', 'Kan şekeri 180 mg/dL, idrar glukozu (+).', 'Regüle Diyabet', NULL, 'İnsülin dozuna devam, günlük izlem eğrisini tutmaya devam edilmesi önerildi.'),
    (9, '2023-05-20', 3, 'Yıllık diyabet kontrolü', 'Hipoglisemi atağı geçirmiş', 'Kan şekeri 75 mg/dL, halsizlik, hafif tremor.', 'Düşük Kan Şekeri (Diyabetik)', NULL, 'İnsülin dozu düşürüldü (0.6 U/kg 2x1), beslenme düzeni gözden geçirildi.'),
    (9, '2023-09-12', 1, 'Özel diyabet kontrolü', 'Stabil', 'Kan şekeri 160 mg/dL, fructosamine seviyesi normal sınırlarda.', 'İyi Regüle Diyabet', NULL, 'Mevcut tedaviye devam.');
GO

-- =============================================
-- Oscar (British Shorthair) için Klinik İnceleme Verileri - Kronik Böbrek Hastalığı
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (11, '2022-03-15', 2, 'Sahibi kedinin son haftalarda daha fazla su içtiğini ve kilo kaybettiğini belirtti.', 'Polidipsi, kilo kaybı, iştahsızlık', 'Dehidrasyon, oral ülserler, kan testlerinde BUN ve kreatinin yüksekliği, USG'de böbreklerde küçülme.', 'Kronik Böbrek Hastalığı (IRIS Evre 3)', 'Üremi', 'Subkutan sıvı tedavisi, düşük proteinli böbrek diyeti, fosfor bağlayıcı, vitamin B kompleksi.'),
    (11, '2022-03-30', 3, 'Böbrek hastalığı tedavisi sonrası kontrol', 'İştah ve enerji düzelmiş', 'Oral ülserler azalmış, BUN ve kreatinin yüksek ancak düşüş göstermiş.', 'Kronik Böbrek Hastalığı - IRIS Evre 2-3', NULL, 'Tedaviye devam, ev ortamında subkutan sıvı uygulaması eğitimi verildi.'),
    (11, '2022-06-20', 2, '3 Aylık böbrek kontrolü', 'Durumu stabil', 'Klinik olarak iyi durumda, kan değerleri stabil.', 'Stabil Kronik Böbrek Hastalığı', NULL, 'Tedaviye devam, 3 ayda bir kontrol önerildi.'),
    (11, '2023-08-05', 3, 'Yıllık böbrek kontrolü', 'Son hafta iştahsızlık başlamış', 'Dehidrasyon, anemi (PCV %24), BUN ve kreatinin yükselmiş.', 'Kronik Böbrek Hastalığı Alevlenmesi', 'Renal Anemi', 'Hastaneye yatış, IV sıvı tedavisi, eritropoietin tedavisi başlandı.');
GO

-- =============================================
-- Tarçın (Golden Retriever) için Klinik İnceleme Verileri - Hipotiroidi
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (12, '2022-07-14', 1, 'Sahibi köpeğinin son aylarda daha yorgun olduğunu, kilo aldığını ve tüylerinin dökülmeye başladığını belirtti.', 'Letarji, kilo artışı, bilateral simetrik alopesi', 'Obezite, kuru deri, bradikardi, T4 ve serbest T4 düşük, TSH yüksek.', 'Hipotiroidi', NULL, 'Levotiroksin 0.02 mg/kg 2x1 başlandı, düşük kalorili diyet önerildi.'),
    (12, '2022-08-14', 2, 'Tiroid tedavisi sonrası 1. ay kontrolü', 'Enerji düzeyi artmaya başlamış', 'Kalp hızı normal sınırlarda, kilo kaybı başlamış.', 'Hipotiroidi - Tedaviye yanıt alınıyor', NULL, 'Levotiroksin dozuna devam, 2 ay sonra kontrol kan testi planlandı.'),
    (12, '2022-10-15', 3, 'Tiroid tedavisi 3. ay kontrolü', 'Enerji düzeyi normale dönmüş, tüy dökülmesi azalmış', 'T4 normal sınırlarda, TSH düşmüş.', 'Kontrollü Hipotiroidi', NULL, 'Levotiroksin dozunu koruma, 6 ayda bir kontrol önerildi.');
GO

-- =============================================
-- Pati (Alman Çoban Köpeği) için Klinik İnceleme Verileri - Koksofemoral Artrit
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (14, '2022-05-03', 3, 'Sahibi köpeğinin hareket etmekte zorlandığını, özellikle arka bacaklarında güçsüzlük olduğunu belirtti.', 'Arka bacaklarda ağrı, topallık, hareketlerde zorlanma', 'Kalça eklemi palpasyonunda ağrı, hareket kısıtlılığı, radyografide kalça ekleminde dejeneratif değişiklikler.', 'Koksofemoral Artrit', 'Kalça Displazisi', 'Meloksikam 0.1 mg/kg 1x1, glukozamin-kondroitin sülfat takviyesi, kilo kontrolü, kontrollü egzersiz.'),
    (14, '2022-06-05', 2, 'Artrit tedavisi kontrolü', 'Ağrı azalmış, hareketlilik artmış', 'Ağrı azalmış, eklem hareket açıklığı artmış.', 'Koksofemoral Artrit - İyileşme sürecinde', NULL, 'NSAİD tedavisini azaltarak kesme, eklem takviyelerine devam, hidroterapi önerildi.'),
    (14, '2023-07-12', 1, 'Yıllık artrit kontrolü', 'Soğuk havalarda ağrı artışı oluyormuş', 'Koksofemoral eklemde crepitus, hafif ağrı.', 'Kronik Koksofemoral Artrit', NULL, 'Meloksikam (gerektiğinde), omega-3 takviyesi, fizik tedavi önerildi.');
GO

-- =============================================
-- Çakıl (Labrador) için Laboratuvar Test Verileri
-- =============================================
INSERT INTO lab_testleri (hayvan_id, tarih, test_adi, sonuclar, rapor_url)
VALUES 
    (9, '2021-10-10', 'Kan Şekeri Ölçümü', 'Glukoz: 320 mg/dL (Yüksek)', 'diabetes-report-cakil.pdf'),
    (9, '2021-10-10', 'İdrar Tahlili', 'Glukoz: ++++, Keton: ++', 'urinalysis-cakil.pdf'),
    (9, '2021-10-10', 'Biyokimya Profili', 'ALT, AST, ALP normal. BUN, Kreatinin normal.', 'biochem-cakil.pdf'),
    (9, '2021-10-17', 'Kan Şekeri Ölçümü', 'Glukoz: 210 mg/dL', 'glucose-f1-cakil.pdf'),
    (9, '2021-11-15', 'Kan Şekeri Ölçümü', 'Glukoz: 180 mg/dL', 'glucose-f2-cakil.pdf'),
    (9, '2023-05-20', 'Kan Şekeri Ölçümü', 'Glukoz: 75 mg/dL', 'glucose-f3-cakil.pdf'),
    (9, '2023-09-12', 'Glikozillenmiş Hemoglobin', 'HbA1c: 7.2%', 'hba1c-cakil.pdf');
GO

-- =============================================
-- Oscar (British Shorthair) için Laboratuvar Test Verileri
-- =============================================
INSERT INTO lab_testleri (hayvan_id, tarih, test_adi, sonuclar, rapor_url)
VALUES 
    (11, '2022-03-15', 'Böbrek Fonksiyon Testi', 'BUN: 68 mg/dL, Kreatinin: 3.8 mg/dL, Fosfor: 7.2 mg/dL', 'kidney-oscar.pdf'),
    (11, '2022-03-15', 'İdrar Tahlili', 'Düşük özgül ağırlık (1.018), Protein: ++', 'urine-oscar.pdf'),
    (11, '2022-03-15', 'Tam Kan Sayımı', 'PCV: %29, WBC normal', 'cbc-oscar.pdf'),
    (11, '2022-03-30', 'Böbrek Fonksiyon Testi', 'BUN: 58 mg/dL, Kreatinin: 3.2 mg/dL', 'kidney-f1-oscar.pdf'),
    (11, '2022-06-20', 'Böbrek Fonksiyon Testi', 'BUN: 62 mg/dL, Kreatinin: 3.0 mg/dL', 'kidney-f2-oscar.pdf'),
    (11, '2023-08-05', 'Tam Kan Sayımı', 'PCV: %24, Anemi', 'cbc-f2-oscar.pdf'),
    (11, '2023-08-05', 'Böbrek Fonksiyon Testi', 'BUN: 85 mg/dL, Kreatinin: 4.5 mg/dL, Fosfor: 8.5 mg/dL', 'kidney-f3-oscar.pdf');
GO

-- =============================================
-- Tarçın (Golden Retriever) için Laboratuvar Test Verileri
-- =============================================
INSERT INTO lab_testleri (hayvan_id, tarih, test_adi, sonuclar, rapor_url)
VALUES 
    (12, '2022-07-14', 'Tiroid Fonksiyon Testi', 'T4: 0.8 μg/dL (Düşük), sT4: 0.5 ng/dL (Düşük), TSH: 0.8 ng/mL (Yüksek)', 'thyroid-tarcin.pdf'),
    (12, '2022-07-14', 'Biyokimya Profili', 'Kolesterol yüksek (320 mg/dL), diğer parametreler normal', 'biochem-tarcin.pdf'),
    (12, '2022-10-15', 'Tiroid Fonksiyon Testi', 'T4: 2.2 μg/dL (Normal), sT4: 1.4 ng/dL (Normal), TSH: 0.4 ng/mL (Normal)', 'thyroid-f1-tarcin.pdf');
GO

-- =============================================
-- Ek Patolojik Bulgular Verileri
-- =============================================
INSERT INTO patolojik_bulgular (hayvan_id, rapor_no, tarih, uygulayan, ornek_tipi, ornek_lokasyonu, ornek_no, makroskopik_bulgular, mikroskopik_bulgular, tani, derece, sinirlar, metastaz_riski, yorumlar)
VALUES 
    (11, '2023-PAT-0245', '2023-08-10', 'DR. ELİF YILMAZ', 'RENAL BİYOPSİ', 'SOL BÖBREK', 'S-2023-1142', 
    'Sol böbrekten alınmış 0.8 x 0.5 cm boyutlarında kortikomedüller biyopsi materyali. Korteks soluk ve granüler görünümde.',
    'Histopatolojik incelemede, glomerüllerde global ve segmental skleroz, tübüler atrofi, interstisyel fibrozis ve mononükleer hücre infiltrasyonu izlenmektedir. Orta derecede arteriyosklerotik değişiklikler mevcuttur.',
    'KRONİK TÜBÜLOİNTERSTİSYEL NEFRİT',
    'ORTA-ŞİDDETLİ',
    'Biyopsi materyal sınırlarında patoloji devam etmektedir',
    'UYGULANAMAZ',
    'Kronik böbrek hastalığı tanısı histopatolojik olarak doğrulanmıştır. Bulgular IRIS Evre 3 kronik böbrek hastalığı ile uyumludur. Mevcut tedaviye devam edilmesi önerilir. Progresyonu yavaşlatmak için fosfor kısıtlaması, ACE inhibitörleri ve antihipertansif tedavi düşünülebilir.');
GO

-- =============================================
-- Ek Alerji ve Kronik Hastalıklar Verileri
-- =============================================
INSERT INTO alerji_kronik (hayvan_id, tipi, allerjen_veya_hastalik, siddet, belirtiler, tani_tarihi, teshis_koyan_id, durum, notlar)
VALUES 
    (9, 'chronic', 'Tip 1 Diabetes Mellitus', 'Ciddi', 'Poliüri, polidipsi, kilo kaybı, glikozüri', '2021-10-10', 1, 'Aktif - Medikal Kontrol Altında', 'İnsülin bağımlı diyabet. Günde iki kez insülin enjeksiyonu gerekli. Düzenli kan şekeri takibi önemli. Hipoglisemi riski açısından dikkatli olunmalı.'),
    (11, 'allergy', 'Balık proteini', 'Orta', 'Deride kızarıklık, kaşıntı, kusma', '2021-05-15', 2, 'Aktif', 'Balık içeren tüm gıdalardan kaçınılmalı. Özellikle balık yağı takviyelerinden de uzak durulmalı.'),
    (11, 'chronic', 'Kronik Böbrek Yetmezliği', 'Ciddi', 'Poliüri, polidipsi, iştahsızlık, kilo kaybı, kusma', '2022-03-15', 2, 'Aktif - İlerleyici', 'IRIS Evre 3 kronik böbrek hastalığı. Özel renal diyet, fosfor bağlayıcılar ve düzenli subkutan sıvı desteği gerekli. Prognoz rezerve.'),
    (12, 'chronic', 'Hipotiroidi', 'Orta', 'Letarji, kilo alımı, bilateral simetrik alopesi, soğuk intoleransı', '2022-07-14', 1, 'Aktif - Medikal Kontrol Altında', 'Levotiroksin ile iyi kontrol ediliyor. Ömür boyu tedavi gerekli. 6 ayda bir TFT kontrolü önemli.'),
    (14, 'allergy', 'Mısır', 'Hafif', 'Deride kaşıntı, kızarıklık', '2021-09-08', 3, 'Aktif', 'Mısır içeren mama ve ödüllerden kaçınılmalı.'),
    (14, 'allergy', 'Soya', 'Hafif', 'Deride kaşıntı, kızarıklık', '2021-09-08', 3, 'Aktif', 'Soya içeren ürünlerden kaçınılmalı.'),
    (14, 'chronic', 'Koksofemoral Artrit', 'Orta', 'Topallık, arka bacaklarda ağrı, hareket güçlüğü', '2022-05-03', 3, 'Aktif - Tedavi Altında', 'Dejeneratif eklem hastalığı. Eklem takviyesi, gerektiğinde ağrı kesici, kilo kontrolü ve düzenli, kontrollü egzersiz gerekli.');
GO

-- =============================================
-- Ek Alerji/Kronik Hastalık Tedavileri Verileri
-- =============================================
INSERT INTO alerji_kronik_tedavi (alerji_id, tedavi)
VALUES 
    (5, 'NPH İnsülin (0.6 U/kg 2x1)'),
    (5, 'Düşük karbonhidratlı diyet'),
    (5, 'Düzenli egzersiz'),
    (6, 'Eliminasyon diyeti'),
    (6, 'Antihistaminikler (gerektiğinde)'),
    (7, 'Fosfor bağlayıcılar'),
    (7, 'Subkutan sıvı tedavisi (haftada 3 kez)'),
    (7, 'Düşük proteinli böbrek diyeti'),
    (7, 'ACE inhibitörü (Enalapril)'),
    (8, 'Levotiroksin (0.02 mg/kg 2x1)'),
    (8, 'Dengeli diyet'),
    (8, 'Düzenli egzersiz'),
    (9, 'Hipoalerjenik diyet'),
    (10, 'Hipoalerjenik diyet'),
    (11, 'Glukozamin-kondroitin sülfat takviyesi'),
    (11, 'Omega-3 yağ asitleri takviyesi'),
    (11, 'Meloksikam (gerektiğinde)'),
    (11, 'Kontrollü egzersiz programı');
GO

-- =============================================
-- Ek Reçete Verileri
-- =============================================
INSERT INTO receteler (hayvan_id, tarih, sure, veteriner_id, veteriner_klinigi)
VALUES 
    (9, '2021-10-10', '30 gün', 1, 'Hayat Veteriner Kliniği'), -- Çakıl diyabet başlangıç
    (11, '2022-03-15', '30 gün', 2, 'Hayat Veteriner Kliniği'), -- Oscar kronik böbrek
    (12, '2022-07-14', '60 gün', 1, 'Hayat Veteriner Kliniği'), -- Tarçın hipotiroidi
    (14, '2022-05-03', '14 gün', 3, 'Hayat Veteriner Kliniği'); -- Pati artrit
GO

-- =============================================
-- Ek Reçete İlaçları Verileri
-- =============================================
INSERT INTO recete_ilaclari (recete_id, ilac_adi)
VALUES 
    (9, 'NPH İnsülin (0.5 U/kg 2x1)'),
    (9, 'Vitamin B Kompleksi (1x1)'),
    (10, 'Enalapril 1.25 mg (1x1)'),
    (10, 'Fosfor bağlayıcı toz (yemekle)'),
    (10, 'Vitamin B Kompleksi (1x1)'),
    (11, 'Levotiroksin 0.5 mg Tablet (2x1)'),
    (12, 'Meloksikam 1.5 mg/ml solüsyon (0.1 mg/kg 1x1)'),
    (12, 'Glukozamin-kondroitin 500 mg Tablet (1x1)');
GO

PRINT 'Hayvan Sağlığı Sistemi veri tabanına daha fazla mock veriler başarıyla eklendi.';
GO 