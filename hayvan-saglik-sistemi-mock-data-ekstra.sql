USE hayvansaglikdb;
GO

-- =============================================
-- Ek Sahip Verileri
-- =============================================
INSERT INTO sahip (ad, soyad, telefon1, telefon2, e_posta, adres, tercih_edilen_iletisim)
VALUES 
    ('Mehmet', 'Öztürk', '05551112233', '05321112233', 'mehmet@email.com', 'Bahçelievler Mah. Çiçek Sok. No:25 D:8 Bahçelievler/İstanbul', 'E-posta'),
    ('Ayşe', 'Kaya', '05552223344', '', 'ayse@email.com', 'Merkez Mah. Atatürk Cad. No:45 D:12 Şişli/İstanbul', 'Telefon'),
    ('Ali', 'Demir', '05553334455', '05323334455', 'ali@email.com', 'Cumhuriyet Mah. İnönü Cad. No:78 D:3 Bakırköy/İstanbul', 'Telefon'),
    ('Zeynep', 'Çelik', '05554445566', '', 'zeynep@email.com', 'Yıldız Mah. Yılmaz Sok. No:15 D:7 Beşiktaş/İstanbul', 'E-posta'),
    ('Mustafa', 'Yıldız', '05555556677', '05355556677', 'mustafa@email.com', 'Akasya Mah. Gül Sok. No:36 D:10 Üsküdar/İstanbul', 'Telefon');
GO

-- =============================================
-- Ek Hayvan Verileri
-- =============================================
INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
VALUES 
    -- Mehmet Öztürk'ün hayvanları
    (2, 'Boncuk', 2, 4, 'Dişi', '2019-03-15', 4.8, 'Gri', '234567890123456', 'Süt ürünleri', 'Hipertiroidi'),
    (2, 'Pamuk', 2, 5, 'Dişi', '2021-06-22', 3.5, 'Beyaz-Gri', '345678901234567', NULL, NULL),
    
    -- Ayşe Kaya'nın hayvanları
    (3, 'Rocky', 1, 2, 'Erkek', '2018-11-10', 28.2, 'Siyah', '456789012345678', NULL, 'Atopik dermatit'),
    
    -- Ali Demir'in hayvanları
    (4, 'Zeus', 1, 3, 'Erkek', '2020-01-25', 35.6, 'Siyah-Kahverengi', '567890123456789', 'Sığır eti', 'Kalp yetmezliği'),
    (4, 'Luna', 2, 6, 'Dişi', '2022-02-12', 3.2, 'Gri Tekir', '678901234567890', NULL, NULL),
    
    -- Zeynep Çelik'in hayvanları
    (5, 'Lokum', 2, 6, 'Erkek', '2019-07-05', 5.1, 'Sarı Tekir', '789012345678901', NULL, 'Astım'),
    
    -- Mustafa Yıldız'ın hayvanları
    (6, 'Karamel', 1, 1, 'Dişi', '2019-09-30', 29.8, 'Altın', '890123456789012', 'Tavuk proteini, Buğday', 'Epilepsi');
GO

-- =============================================
-- Boncuk (Kedi) için Klinik İnceleme Verileri
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (2, '2023-06-12', 1, 'Sahibi kedinin son bir haftadır iştahında artış olduğunu ve çok su içtiğini belirtti.', 'Aşırı su tüketimi, hareketlilik, kilo kaybı', 'Tiroid bezi palpe edildiğinde büyüme tespit edildi. Kalp ritmi hafif hızlı. Genel durumu iyi.', 'Hipertiroidi şüphesi', NULL, 'Kan tahlili istendi, T4 seviyesine bakılacak. Geçici olarak yüksek proteinli diyet önerildi.'),
    (2, '2023-07-03', 2, 'T4 seviyesi yüksek çıktı. Hipertiroidi tanısı kesinleştirildi.', 'Aşırı iştah, kilo kaybı, huzursuzluk', 'Tiroid bezi büyümüş, kalp hızı yüksek (180 atım/dk), kilo vermiş.', 'Feline Hipertiroidi', NULL, 'Methimazole 2.5 mg 2x1 başlandı. 2 hafta sonra kontrol önerildi. Özel tiroid diyeti reçete edildi.'),
    (2, '2023-07-17', 2, 'İlaç tedavisine yanıt değerlendirmesi', 'Semptomlar azalmış', 'Kalp hızı 160 atım/dk. Genel durumu daha sakin. İştah normale dönmüş.', 'Hipertiroidi - Tedaviye yanıt veriyor', NULL, 'Tedaviye aynı dozda devam. 1 ay sonra T4 kontrolü önerildi.');
GO

-- =============================================
-- Rocky (Labrador) için Klinik İnceleme Verileri
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (4, '2023-05-20', 1, 'Sahibi köpeğin karın bölgesinde ve kulak kenarlarında sürekli kaşıntı olduğunu belirtti.', 'Kaşıntı, deri kızarıklığı, kulak kenarlarında kabuklanma', 'Karın bölgesinde eritem, kulak kenarlarında ekskoriasyonlar, aksiller bölgede likenifikasyon.', 'Atopik Dermatit', 'Sekonder bakteriyel enfeksiyon', 'Antibakteriyel şampuan ile yıkama, prednizolon 5mg 1x1, Amoksisilin-klavulanik asit 250mg 2x1 başlandı.'),
    (4, '2023-06-10', 2, 'Antibiyotik tedavisi tamamlandı, kaşıntı azalmış fakat tamamen geçmemiş.', 'Hafif kaşıntı, deri daha az kızarık', 'Eritem azalmış, kulak lezyonları iyileşme gösteriyor.', 'Atopik Dermatit - İyileşme sürecinde', NULL, 'Prednizolon dozu azaltıldı (günaşırı), hipoalerjenik diyet önerildi, omega-3 takviyesi başlandı.'),
    (4, '2023-09-15', 1, 'Mevsim değişimi ile kaşıntı tekrar artmış.', 'Yeniden başlayan kaşıntı, özellikle pençe aralarında ve kulaklarda', 'Pençe aralarında eritem ve kabuklanma, kulaklarda hafif kızarıklık.', 'Atopik Dermatit - Alevlenme', NULL, 'Siklosporin tedavisi başlandı, lokal kortikosteroid krem reçete edildi.');
GO

-- =============================================
-- Zeus (Alman Çoban Köpeği) için Klinik İnceleme Verileri
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (5, '2023-04-18', 2, 'Sahibi köpeğin egzersiz sonrası nefes almakta zorlandığını ve öksürdüğünü belirtti.', 'Egzersiz intoleransı, öksürük, gece solunumda zorluk', 'Oskültasyonda kalp üfürümü duyuldu, akciğerlerde raller mevcut. Mukoz membranlar hafif siyanotik.', 'Dilate Kardiyomiyopati şüphesi', 'Pulmoner ödem', 'Oksijen desteği, furosemid enjeksiyonu, EKG ve ekokardiyografi istendi.'),
    (5, '2023-04-20', 3, 'Ekokardiyografi sonuçları değerlendirildi.', 'Efor sonrası nefes darlığı devam ediyor', 'Sol ventrikül dilatasyonu, ejeksiyon fraksiyonu düşük (%32), hafif mitral yetmezlik.', 'Dilate Kardiyomiyopati', 'Konjestif Kalp Yetmezliği', 'Enalapril 5mg 1x1, Pimobendane 5mg 2x1, Furosemid 20mg 2x1 başlandı. Tuz kısıtlı diyet, egzersiz kısıtlaması önerildi.'),
    (5, '2023-05-25', 3, 'Kalp yetmezliği tedavisinin değerlendirilmesi', 'Öksürük azalmış, egzersiz toleransı artmış', 'Oskültasyonda üfürüm sürüyor fakat raller azalmış. Mukoz membranlar normal renkte.', 'Stabil Kalp Yetmezliği', NULL, 'Mevcut tedaviye devam, furosemid dozu 20mg 1x1 olarak azaltıldı. Aylık kontrol önerildi.'),
    (5, '2023-10-12', 2, 'Düzenli kontrol muayenesi', 'Hasta stabil, semptomlar kontrol altında', 'Kalp hızı 110 atım/dk, solunum normal, ödem yok.', 'Kompanse Kalp Yetmezliği', NULL, 'Mevcut tedaviye devam edildi, 3 ay sonra kontrol ekokardiyografi planlandı.');
GO

-- =============================================
-- Karamel (Golden Retriever) için Klinik İnceleme Verileri
-- =============================================
INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
VALUES 
    (8, '2022-11-03', 1, 'Sahibi köpeğin aniden bilinç kaybı yaşadığını ve kasılmalar geçirdiğini belirtti. Yaklaşık 2 dakika sürdüğünü ve sonra kendine geldiğini söyledi.', 'Bilinç kaybı, kasılmalar, nöbet sonrası konfüzyon', 'Nörolojik muayenede spesifik anormallik saptanmadı. Vital bulgular normal.', 'Epileptik Nöbet', NULL, 'Kan tahlilleri istendi, kranial MR planlandı, antiepileptik tedavi başlandı (Fenobarbital 30mg 2x1).'),
    (8, '2022-11-15', 3, 'MR sonuçları normal, kan değerleri normal sınırlarda.', 'Takip süresince nöbet gözlenmemiş', 'Nörolojik muayene normal.', 'İdiyopatik Epilepsi', NULL, 'Fenobarbital tedavisine devam, serum fenobarbital seviyesi kontrolü 2 hafta sonra planlandı.'),
    (8, '2023-02-20', 3, 'Serum fenobarbital seviyesi terapötik aralıkta. 3 ay boyunca nöbet olmamış.', 'Yeni şikayet yok', 'Fizik muayene normal, karaciğer enzimleri hafif yüksek (antiepileptik ilaca bağlı).', 'Kontrollü Epilepsi', 'İlaca bağlı karaciğer enzim yüksekliği', 'Tedavi dozunu koruma, 6 ayda bir karaciğer fonksiyon testi kontrolü önerisi.'),
    (8, '2023-08-17', 1, 'Son hafta içinde iki kez hafif nöbet geçirmiş.', 'Kısa süreli kasılmalar, bilinç bulanıklığı', 'Nörolojik muayene normal.', 'Epilepsi - Doz Yetersizliği', NULL, 'Fenobarbital dozu artırıldı (40mg 2x1), nöbet günlüğü tutulması önerildi, 2 hafta sonra serum seviyesi kontrolü planlandı.');
GO

-- =============================================
-- Boncuk (Kedi) için Hastalık Geçmişi Verileri
-- =============================================
INSERT INTO hastalik_gecmisi (hayvan_id, hastalik_adi, tani_tarihi, iyilesme_tarihi, detaylar, tedavi, hastanede_yatis, yatis_gun_sayisi, durum)
VALUES 
    (2, 'İdrar Yolu Enfeksiyonu', '2021-04-12', '2021-04-25', 'İdrar yaparken ağrı, sık idrara çıkma, idrar renginde değişiklik şikayetleri ile geldi. İdrar kültüründe E. coli üredi.', 'Amoksisilin-klavulanik asit süspansiyon, artırılmış su tüketimi', 0, 0, 'İyileşti'),
    (2, 'Hipertiroidi', '2023-07-03', NULL, 'Aşırı su tüketimi, iştah artışı ve kilo kaybı şikayetleri ile başvurdu. Kan testinde T4 seviyesi yüksek bulundu.', 'Methimazole 2.5 mg tablet, tiroid diyeti, düzenli kontrol', 0, 0, 'Devam Ediyor');
GO

-- =============================================
-- Rocky (Labrador) için Hastalık Geçmişi Verileri
-- =============================================
INSERT INTO hastalik_gecmisi (hayvan_id, hastalik_adi, tani_tarihi, iyilesme_tarihi, detaylar, tedavi, hastanede_yatis, yatis_gun_sayisi, durum)
VALUES 
    (4, 'Parvoviral Enterit', '2019-02-15', '2019-02-28', 'Yavru iken şiddetli kusma, kanlı ishal ve dehidratasyon ile geldi. Parvo testi pozitif.', 'IV sıvı tedavisi, antibiyotik, antiemetik, destekleyici bakım', 1, 5, 'İyileşti'),
    (4, 'Atopik Dermatit', '2021-09-10', NULL, 'Tekrarlayan deri enflamasyonu, kaşıntı ve sekonder enfeksiyonlar. Alerji testinde çevresel alerjenlere duyarlılık tespit edildi.', 'Antihistaminikler, siklosporin, kortikosteroidler, hipoalerjenik diyet, düzenli banyo', 0, 0, 'Devam Ediyor');
GO

-- =============================================
-- Zeus (Alman Çoban Köpeği) için Hastalık Geçmişi Verileri
-- =============================================
INSERT INTO hastalik_gecmisi (hayvan_id, hastalik_adi, tani_tarihi, iyilesme_tarihi, detaylar, tedavi, hastanede_yatis, yatis_gun_sayisi, durum)
VALUES 
    (5, 'Kalça Displazisi', '2021-03-18', NULL, 'Arka bacaklarda güçsüzlük ve ağrı şikayeti ile geldi. Radyolojik değerlendirmede bilateral kalça displazisi tespit edildi.', 'Ağrı kesiciler, kilo kontrolü, düzenli egzersiz programı, eklem takviyesi', 0, 0, 'Kronik - Tedavi Altında'),
    (5, 'Dilate Kardiyomiyopati', '2023-04-20', NULL, 'Egzersiz intoleransı, öksürük ve gece solunum güçlüğü şikayetleri. Ekokardiyografide sol ventrikül dilatasyonu ve düşük ejeksiyon fraksiyonu.', 'ACE inhibitörleri, pimobendane, diüretikler, tuz kısıtlı diyet', 1, 3, 'Devam Ediyor - Stabil');
GO

-- =============================================
-- Karamel (Golden Retriever) için Hastalık Geçmişi Verileri
-- =============================================
INSERT INTO hastalik_gecmisi (hayvan_id, hastalik_adi, tani_tarihi, iyilesme_tarihi, detaylar, tedavi, hastanede_yatis, yatis_gun_sayisi, durum)
VALUES 
    (8, 'Gıda Alerjisi', '2020-07-12', NULL, 'Deri lezyonları, kaşıntı ve gastrointestinal belirtiler. Eliminasyon diyeti ile tavuk proteini ve buğday alerjisi tespit edildi.', 'Hipoalerjenik diyet, alerjen kaçınma, semptomatik tedavi', 0, 0, 'Kontrol Altında'),
    (8, 'İdiyopatik Epilepsi', '2022-11-15', NULL, 'Tekrarlayan nöbetler, bilinç kaybı ve kasılmalar. Tetkiklerde organik neden bulunamadı.', 'Fenobarbital, nöbet tetikleyicilerinden kaçınma, düzenli kontrol', 0, 0, 'Devam Ediyor - Medikal Kontrol Altında');
GO

-- =============================================
-- Boncuk (Kedi) için Randevu Verileri
-- =============================================
INSERT INTO randevular (hayvan_id, tarih, saat, sebep, durum, tipi, notlar)
VALUES 
    (2, '2023-06-12', '10:15', 'Aşırı su tüketimi ve kilo kaybı', 'Tamamlandı', 'examination', 'T4 testi istendi'),
    (2, '2023-07-03', '14:30', 'Test sonuçları değerlendirmesi', 'Tamamlandı', 'examination', 'Hipertiroidi tanısı konuldu, tedavi başlandı'),
    (2, '2023-07-17', '11:45', 'Tedavi kontrolü', 'Tamamlandı', 'examination', 'Tedaviye yanıt alındı'),
    (2, '2023-08-17', '09:30', 'T4 seviyesi kontrolü', 'Tamamlandı', 'treatment', 'Kan testi yapıldı'),
    (2, '2023-09-17', '15:00', 'Aylık kontrol', 'Tamamlandı', 'examination', 'Genel durum iyi'),
    (2, '2023-12-15', '14:15', '3 aylık kontrol', 'Planlandı', 'examination', 'T4 seviyesi tekrar kontrol edilecek');
GO

-- =============================================
-- Rocky (Labrador) için Randevu Verileri
-- =============================================
INSERT INTO randevular (hayvan_id, tarih, saat, sebep, durum, tipi, notlar)
VALUES 
    (4, '2023-05-20', '13:30', 'Deri problemleri', 'Tamamlandı', 'examination', 'Atopik dermatit tanısı'),
    (4, '2023-06-10', '11:15', 'Tedavi kontrolü', 'Tamamlandı', 'examination', 'İyileşme var'),
    (4, '2023-09-15', '16:45', 'Yeniden başlayan kaşıntı', 'Tamamlandı', 'examination', 'Mevsimsel alevlenme'),
    (4, '2023-10-15', '10:30', 'Tedavi kontrolü', 'Tamamlandı', 'examination', 'İyileşme var'),
    (4, '2023-12-20', '14:00', 'Aşı zamanı', 'Planlandı', 'vaccine', 'Yıllık aşılar yapılacak');
GO

-- =============================================
-- Boncuk (Kedi) için Laboratuvar Test Verileri
-- =============================================
INSERT INTO lab_testleri (hayvan_id, tarih, test_adi, sonuclar, rapor_url)
VALUES 
    (2, '2023-06-13', 'Tiroid Fonksiyon Testi', 'T4: 7.2 μg/dL (Yüksek)', 'thyroid-report-boncuk.pdf'),
    (2, '2023-06-13', 'Tam Kan Sayımı', 'Normal sınırlarda', 'cbc-report-boncuk.pdf'),
    (2, '2023-06-13', 'Biyokimya Profili', 'ALT ve AST hafif yüksek', 'chemistry-report-boncuk.pdf'),
    (2, '2023-08-17', 'Tiroid Fonksiyon Testi', 'T4: 4.1 μg/dL (Normal değerlere yaklaşmış)', 'thyroid-followup-boncuk.pdf');
GO

-- =============================================
-- Karamel (Golden Retriever) için Radyolojik Görüntüleme Verileri
-- =============================================
INSERT INTO radyolojik_goruntuleme (hayvan_id, tarih, tipi, bolge, bulgular, goruntu_url, notlar)
VALUES 
    (8, '2022-11-07', 'MR', 'Kranial', 'İntrakranial kitle, hemoraji veya yapısal anomali saptanmadı. Beyin parankimi normal görünümde.', 'karamel-brain-mri.jpg', 'İdiyopatik epilepsi tanısı için organik nedenler dışlandı.'),
    (8, '2023-03-15', 'Röntgen', 'Toraks', 'Kalp ve akciğerler normal görünümde. Patolojik bulgu saptanmadı.', 'karamel-chest-xray.jpg', 'Yıllık kontrol için çekildi.');
GO

-- =============================================
-- Zeus (Alman Çoban Köpeği) için Radyolojik Görüntüleme Verileri
-- =============================================
INSERT INTO radyolojik_goruntuleme (hayvan_id, tarih, tipi, bolge, bulgular, goruntu_url, notlar)
VALUES 
    (5, '2021-03-18', 'Röntgen', 'Pelvis', 'Bilateral kalça ekleminde uyumsuzluk, femur başı ve asetabulum arasında subluksasyon, eklem aralığında daralma.', 'zeus-hip-xray.jpg', 'Orta-şiddetli kalça displazisi'),
    (5, '2023-04-19', 'EKG', 'Kardiyak', 'Sinüs taşikardisi, sol ventrikül hipertrofisi bulguları.', 'zeus-ekg.jpg', 'Kalp yetmezliği ön tanısı'),
    (5, '2023-04-19', 'Ekokardiyografi', 'Kardiyak', 'Sol ventrikül dilatasyonu, ejeksiyon fraksiyonu %32, mitral yetmezlik, sol atrium genişlemesi.', 'zeus-echo.mp4', 'Dilate kardiyomiyopati tanısı konuldu.');
GO

-- =============================================
-- Ek Reçete Verileri
-- =============================================
INSERT INTO receteler (hayvan_id, tarih, sure, veteriner_id, veteriner_klinigi)
VALUES 
    (2, '2023-07-03', '30 gün', 2, 'Hayat Veteriner Kliniği'), -- Boncuk hipertiroidi
    (4, '2023-09-15', '14 gün', 1, 'Hayat Veteriner Kliniği'), -- Rocky dermatit alevlenme
    (5, '2023-04-20', '30 gün', 3, 'Hayat Veteriner Kliniği'), -- Zeus kalp yetmezliği
    (8, '2022-11-15', '60 gün', 3, 'Hayat Veteriner Kliniği'); -- Karamel epilepsi başlangıç
GO

-- =============================================
-- Ek Reçete İlaçları Verileri
-- =============================================
INSERT INTO recete_ilaclari (recete_id, ilac_adi)
VALUES 
    (5, 'Methimazole 2.5 mg Tablet (2x1)'),
    (6, 'Siklosporin 100 mg (1x1)'),
    (6, 'Prednizolon Krem (2x1, lokal)'),
    (7, 'Enalapril 5 mg Tablet (1x1)'),
    (7, 'Pimobendane 5 mg Tablet (2x1)'),
    (7, 'Furosemid 20 mg Tablet (2x1)'),
    (8, 'Fenobarbital 30 mg Tablet (2x1)');
GO

-- =============================================
-- Ek Aşı Verileri
-- =============================================
INSERT INTO asilar (hayvan_id, tarih, asi_adi, sonraki_tarih, durum, notlar)
VALUES 
    (2, '2023-02-15', 'Feline Panleukopenia', '2024-02-15', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (2, '2023-02-15', 'Feline Herpesvirus', '2024-02-15', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (2, '2023-02-15', 'Feline Calicivirus', '2024-02-15', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (4, '2023-03-10', 'Kuduz Aşısı', '2024-03-10', 'Tamamlandı', 'Zorunlu yıllık aşı'),
    (4, '2023-03-10', 'DHPP', '2024-03-10', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (5, '2023-01-20', 'Kuduz Aşısı', '2024-01-20', 'Tamamlandı', 'Zorunlu yıllık aşı'),
    (5, '2023-01-20', 'DHPP', '2024-01-20', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (5, '2023-01-20', 'Bordetella', '2024-01-20', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (8, '2023-05-05', 'Kuduz Aşısı', '2024-05-05', 'Tamamlandı', 'Zorunlu yıllık aşı'),
    (8, '2023-05-05', 'DHPP', '2024-05-05', 'Tamamlandı', 'Yıllık koruyucu aşı'),
    (8, '2023-05-05', 'Leptospirosis', '2024-05-05', 'Tamamlandı', 'Yıllık koruyucu aşı');
GO

-- =============================================
-- Ek Notlar Verileri
-- =============================================
INSERT INTO notlar (hayvan_id, tarih, yazar, icerik)
VALUES 
    (2, '2023-07-03', 'Dr. Ayşe Demir', 'Hipertiroidi tanısı kesinleştirildi. Hasta sahibine hastalık ve tedavisi hakkında detaylı bilgilendirme yapıldı. İlaç yan etkileri (kusma, iştah kaybı, letarji) konusunda uyarıldı. İlk hafta dikkatli gözlem yapması istendi.'),
    (4, '2023-09-15', 'Dr. Mehmet Yılmaz', 'Atopik dermatit mevsimsel alevlenme. Hasta sahibine tetikleyici faktörlerden (polen, toz akarları) mümkün olduğunca kaçınması gerektiği hatırlatıldı. Evde temizliğe dikkat etmesi ve köpeğin pençelerini dışarı çıkışlardan sonra silmesi önerildi.'),
    (5, '2023-04-20', 'Dr. Mert Özçelik', 'Dilate kardiyomiyopati tanısı konuldu. Hasta sahibine prognoz hakkında bilgi verildi. İlaçların düzenli kullanımının önemi vurgulandı. Egzersiz kısıtlaması, tuz kısıtlı diyet, düzenli kontrol muayeneleri gerektiği anlatıldı.'),
    (8, '2022-11-15', 'Dr. Mert Özçelik', 'İdiyopatik epilepsi tanısı konuldu. Hasta sahibine nöbetler sırasında yapılması ve yapılmaması gerekenler anlatıldı. Nöbet günlüğü tutmaları istendi. Fenobarbital kullanımının önemi ve yan etkileri (karaciğer yükü) hakkında bilgilendirme yapıldı.');
GO

PRINT 'Hayvan Sağlığı Sistemi veri tabanına ek mock veriler başarıyla eklendi.';
GO 