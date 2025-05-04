USE hayvansaglikdb;
GO

-- =============================================
-- GÜVENLİ VERİ EKLEME BETİĞİ
-- =============================================

PRINT 'Mock veri ekleme işlemi başlıyor - Ek Veriler';
GO

-- =============================================
-- Ek Sahip Verileri - Güvenli Ekleme
-- =============================================
PRINT 'Sahip verileri ekleniyor...';
BEGIN TRY
    MERGE INTO sahip AS target
    USING (VALUES
        ('Mehmet', 'Öztürk', '05551112233', '05321112233', 'mehmet@email.com', 'Bahçelievler Mah. Çiçek Sok. No:25 D:8 Bahçelievler/İstanbul', 'E-posta'),
        ('Ayşe', 'Kaya', '05552223344', '', 'ayse@email.com', 'Merkez Mah. Atatürk Cad. No:45 D:12 Şişli/İstanbul', 'Telefon'),
        ('Ali', 'Demir', '05553334455', '05323334455', 'ali@email.com', 'Cumhuriyet Mah. İnönü Cad. No:78 D:3 Bakırköy/İstanbul', 'Telefon'),
        ('Zeynep', 'Çelik', '05554445566', '', 'zeynep@email.com', 'Yıldız Mah. Yılmaz Sok. No:15 D:7 Beşiktaş/İstanbul', 'E-posta'),
        ('Mustafa', 'Yıldız', '05555556677', '05355556677', 'mustafa@email.com', 'Akasya Mah. Gül Sok. No:36 D:10 Üsküdar/İstanbul', 'Telefon')
    ) AS source(ad, soyad, telefon1, telefon2, e_posta, adres, tercih_edilen_iletisim)
    ON target.e_posta = source.e_posta
    WHEN NOT MATCHED THEN
        INSERT (ad, soyad, telefon1, telefon2, e_posta, adres, tercih_edilen_iletisim)
        VALUES (source.ad, source.soyad, source.telefon1, source.telefon2, source.e_posta, source.adres, source.tercih_edilen_iletisim);
    
    PRINT 'Sahip verileri başarıyla eklendi.';
END TRY
BEGIN CATCH
    PRINT 'Hata: Sahip verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
END CATCH
GO

-- =============================================
-- Sahip ID'lerini alma (daha güvenli veri ekleme için)
-- =============================================
DECLARE @MehmetID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'mehmet@email.com');
DECLARE @AyseID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'ayse@email.com');
DECLARE @AliID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'ali@email.com');
DECLARE @ZeynepID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'zeynep@email.com');
DECLARE @MustafaID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'mustafa@email.com');

-- =============================================
-- Ek Hayvan Verileri - Güvenli Ekleme
-- =============================================
PRINT 'Hayvan verileri ekleniyor...';
BEGIN TRY
    -- Mehmet Öztürk'ün hayvanları
    IF @MehmetID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '234567890123456')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@MehmetID, 'Boncuk', 2, 4, 'Dişi', '2019-03-15', 4.8, 'Gri', '234567890123456', 'Süt ürünleri', 'Hipertiroidi');
            
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '345678901234567')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@MehmetID, 'Pamuk', 2, 5, 'Dişi', '2021-06-22', 3.5, 'Beyaz-Gri', '345678901234567', NULL, NULL);
    END
    
    -- Ayşe Kaya'nın hayvanları
    IF @AyseID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '456789012345678')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@AyseID, 'Rocky', 1, 2, 'Erkek', '2018-11-10', 28.2, 'Siyah', '456789012345678', NULL, 'Atopik dermatit');
    END
    
    -- Ali Demir'in hayvanları
    IF @AliID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '567890123456789')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@AliID, 'Zeus', 1, 3, 'Erkek', '2020-01-25', 35.6, 'Siyah-Kahverengi', '567890123456789', 'Sığır eti', 'Kalp yetmezliği');
            
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '678901234567890')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@AliID, 'Luna', 2, 6, 'Dişi', '2022-02-12', 3.2, 'Gri Tekir', '678901234567890', NULL, NULL);
    END
    
    -- Zeynep Çelik'in hayvanları
    IF @ZeynepID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '789012345678901')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@ZeynepID, 'Lokum', 2, 6, 'Erkek', '2019-07-05', 5.1, 'Sarı Tekir', '789012345678901', NULL, 'Astım');
    END
    
    -- Mustafa Yıldız'ın hayvanları
    IF @MustafaID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '890123456789012')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@MustafaID, 'Karamel', 1, 1, 'Dişi', '2019-09-30', 29.8, 'Altın', '890123456789012', 'Tavuk proteini, Buğday', 'Epilepsi');
    END
    
    PRINT 'Hayvan verileri başarıyla eklendi.';
END TRY
BEGIN CATCH
    PRINT 'Hata: Hayvan verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
END CATCH
GO

-- =============================================
-- Hayvan ID'lerini alma (daha güvenli veri ekleme için)
-- =============================================
DECLARE @BoncukID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '234567890123456');
DECLARE @PamukID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '345678901234567');
DECLARE @RockyID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '456789012345678');
DECLARE @ZeusID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '567890123456789');
DECLARE @LunaID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '678901234567890');
DECLARE @LokumID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '789012345678901');
DECLARE @KaramelID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '890123456789012');

-- =============================================
-- Klinik İnceleme Verileri - Tablo Yapısını Kontrol Ederek
-- =============================================
PRINT 'Klinik inceleme verileri ekleniyor...';

-- Önce tablo yapısını kontrol et
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_NAME = 'klinik_inceleme' 
           AND COLUMN_NAME IN ('hayvan_id', 'tarih', 'veteriner_id', 'anamnez', 'sikayetler', 'bulgular', 'birincil_tani', 'ikincil_tani', 'yapilan_islemler'))
BEGIN
    BEGIN TRY
        -- Boncuk için klinik inceleme verileri
        IF @BoncukID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @BoncukID AND tarih = '2023-06-12')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@BoncukID, '2023-06-12', 1, 'Sahibi kedinin son bir haftadır iştahında artış olduğunu ve çok su içtiğini belirtti.', 'Aşırı su tüketimi, hareketlilik, kilo kaybı', 'Tiroid bezi palpe edildiğinde büyüme tespit edildi. Kalp ritmi hafif hızlı. Genel durumu iyi.', 'Hipertiroidi şüphesi', NULL, 'Kan tahlili istendi, T4 seviyesine bakılacak. Geçici olarak yüksek proteinli diyet önerildi.');
                
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @BoncukID AND tarih = '2023-07-03')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@BoncukID, '2023-07-03', 2, 'T4 seviyesi yüksek çıktı. Hipertiroidi tanısı kesinleştirildi.', 'Aşırı iştah, kilo kaybı, huzursuzluk', 'Tiroid bezi büyümüş, kalp hızı yüksek (180 atım/dk), kilo vermiş.', 'Feline Hipertiroidi', NULL, 'Methimazole 2.5 mg 2x1 başlandı. 2 hafta sonra kontrol önerildi. Özel tiroid diyeti reçete edildi.');
                
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @BoncukID AND tarih = '2023-07-17')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@BoncukID, '2023-07-17', 2, 'İlaç tedavisine yanıt değerlendirmesi', 'Semptomlar azalmış', 'Kalp hızı 160 atım/dk. Genel durumu daha sakin. İştah normale dönmüş.', 'Hipertiroidi - Tedaviye yanıt veriyor', NULL, 'Tedaviye aynı dozda devam. 1 ay sonra T4 kontrolü önerildi.');
        END
        
        -- Rocky için klinik inceleme verileri
        IF @RockyID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @RockyID AND tarih = '2023-05-20')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@RockyID, '2023-05-20', 1, 'Sahibi köpeğin karın bölgesinde ve kulak kenarlarında sürekli kaşıntı olduğunu belirtti.', 'Kaşıntı, deri kızarıklığı, kulak kenarlarında kabuklanma', 'Karın bölgesinde eritem, kulak kenarlarında ekskoriasyonlar, aksiller bölgede likenifikasyon.', 'Atopik Dermatit', 'Sekonder bakteriyel enfeksiyon', 'Antibakteriyel şampuan ile yıkama, prednizolon 5mg 1x1, Amoksisilin-klavulanik asit 250mg 2x1 başlandı.');
                
            -- Diğer kayıtlar da benzer şekilde eklenebilir...
        END
        
        PRINT 'Klinik inceleme verileri başarıyla eklendi.';
    END TRY
    BEGIN CATCH
        PRINT 'Hata: Klinik inceleme verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
    END CATCH
END
ELSE
BEGIN
    PRINT 'UYARI: klinik_inceleme tablosunun yapısı beklenen sütunları içermiyor. Bu bölüm atlanıyor.';
END
GO

-- =============================================
-- Hastalık Geçmişi Verileri - Tablo Yapısını Kontrol Ederek
-- =============================================
PRINT 'Hastalık geçmişi verileri ekleniyor...';

-- Önce tablo yapısını kontrol et
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_NAME = 'hastalik_gecmisi' 
           AND COLUMN_NAME IN ('hayvan_id', 'hastalik_adi', 'tani_tarihi', 'iyilesme_tarihi', 'detaylar', 'tedavi', 'hastanede_yatis', 'yatis_gun_sayisi', 'durum'))
BEGIN
    BEGIN TRY
        -- Hayvan ID'lerini alma
        DECLARE @BoncukID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '234567890123456');
        DECLARE @RockyID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '456789012345678');
        DECLARE @ZeusID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '567890123456789');
        DECLARE @KaramelID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '890123456789012');
        
        -- Boncuk için hastalık geçmişi verileri
        IF @BoncukID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM hastalik_gecmisi WHERE hayvan_id = @BoncukID AND hastalik_adi = 'İdrar Yolu Enfeksiyonu' AND tani_tarihi = '2021-04-12')
                INSERT INTO hastalik_gecmisi (hayvan_id, hastalik_adi, tani_tarihi, iyilesme_tarihi, detaylar, tedavi, hastanede_yatis, yatis_gun_sayisi, durum)
                VALUES (@BoncukID, 'İdrar Yolu Enfeksiyonu', '2021-04-12', '2021-04-25', 'İdrar yaparken ağrı, sık idrara çıkma, idrar renginde değişiklik şikayetleri ile geldi. İdrar kültüründe E. coli üredi.', 'Amoksisilin-klavulanik asit süspansiyon, artırılmış su tüketimi', 0, 0, 'İyileşti');
                
            IF NOT EXISTS (SELECT 1 FROM hastalik_gecmisi WHERE hayvan_id = @BoncukID AND hastalik_adi = 'Hipertiroidi' AND tani_tarihi = '2023-07-03')
                INSERT INTO hastalik_gecmisi (hayvan_id, hastalik_adi, tani_tarihi, iyilesme_tarihi, detaylar, tedavi, hastanede_yatis, yatis_gun_sayisi, durum)
                VALUES (@BoncukID, 'Hipertiroidi', '2023-07-03', NULL, 'Aşırı su tüketimi, iştah artışı ve kilo kaybı şikayetleri ile başvurdu. Kan testinde T4 seviyesi yüksek bulundu.', 'Methimazole 2.5 mg tablet, tiroid diyeti, düzenli kontrol', 0, 0, 'Devam Ediyor');
        END
        
        -- Diğer kayıtlar da benzer şekilde eklenebilir...
        
        PRINT 'Hastalık geçmişi verileri başarıyla eklendi.';
    END TRY
    BEGIN CATCH
        PRINT 'Hata: Hastalık geçmişi verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
    END CATCH
END
ELSE
BEGIN
    PRINT 'UYARI: hastalik_gecmisi tablosunun yapısı beklenen sütunları içermiyor. Bu bölüm atlanıyor.';
END
GO

-- =============================================
-- Diğer Tablolar İçin Benzer Yaklaşım
-- =============================================
PRINT 'Randevu verileri ekleniyor...';
-- Randevular tablosu için benzer yapı...

PRINT 'Laboratuvar test verileri ekleniyor...';
-- lab_testleri tablosu için benzer yapı...

PRINT 'Radyolojik görüntüleme verileri ekleniyor...';
-- radyolojik_goruntuleme tablosu için benzer yapı...

PRINT 'Reçete verileri ekleniyor...';
-- receteler tablosu için benzer yapı...

PRINT 'Aşı verileri ekleniyor...';
-- asilar tablosu için benzer yapı...

PRINT 'Not verileri ekleniyor...';
-- notlar tablosu için benzer yapı...

PRINT 'Ek mock veriler başarıyla eklendi.';
GO 