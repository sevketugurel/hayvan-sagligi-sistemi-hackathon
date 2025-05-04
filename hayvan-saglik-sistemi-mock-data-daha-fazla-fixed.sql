USE hayvansaglikdb;
GO

-- =============================================
-- GÜVENLİ VERİ EKLEME BETİĞİ - İKİNCİ GRUP
-- =============================================

PRINT 'Mock veri ekleme işlemi başlıyor - Daha Fazla Veri';
GO

-- =============================================
-- Ek Sahip Verileri - Güvenli Ekleme
-- =============================================
PRINT 'Daha fazla sahip verileri ekleniyor...';
BEGIN TRY
    MERGE INTO sahip AS target
    USING (VALUES
        ('Hasan', 'Aydın', '05556667788', '', 'hasan@email.com', 'Ataşehir Mah. Güneş Sok. No:42 D:15 Ataşehir/İstanbul', 'Telefon'),
        ('Fatma', 'Şahin', '05557778899', '05327778899', 'fatma@email.com', 'Bağdat Cad. No:156 D:8 Kadıköy/İstanbul', 'E-posta'),
        ('Emre', 'Kılıç', '05558889900', '', 'emre@email.com', 'Göztepe Mah. Bağdat Cad. No:217 D:5 Kadıköy/İstanbul', 'Telefon'),
        ('Seda', 'Yıldırım', '05559990011', '05359990011', 'seda@email.com', 'Erenköy Mah. Çamlık Sok. No:8 D:3 Kadıköy/İstanbul', 'Telefon'),
        ('Kemal', 'Özkan', '05551112233', '', 'kemal@email.com', 'Kozyatağı Mah. Şemsettin Sok. No:24 D:12 Kadıköy/İstanbul', 'E-posta')
    ) AS source(ad, soyad, telefon1, telefon2, e_posta, adres, tercih_edilen_iletisim)
    ON target.e_posta = source.e_posta
    WHEN NOT MATCHED THEN
        INSERT (ad, soyad, telefon1, telefon2, e_posta, adres, tercih_edilen_iletisim)
        VALUES (source.ad, source.soyad, source.telefon1, source.telefon2, source.e_posta, source.adres, source.tercih_edilen_iletisim);
    
    PRINT 'Ek sahipler başarıyla eklendi.';
END TRY
BEGIN CATCH
    PRINT 'Hata: Ek sahip verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
END CATCH
GO

-- =============================================
-- Sahip ID'lerini alma
-- =============================================
DECLARE @HasanID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'hasan@email.com');
DECLARE @FatmaID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'fatma@email.com');
DECLARE @EmreID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'emre@email.com');
DECLARE @SedaID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'seda@email.com');
DECLARE @KemalID INT = (SELECT sahip_id FROM sahip WHERE e_posta = 'kemal@email.com');

-- =============================================
-- Daha Fazla Hayvan Verileri - Güvenli Ekleme
-- =============================================
PRINT 'Daha fazla hayvan verileri ekleniyor...';
BEGIN TRY
    -- Hasan Aydın'ın hayvanları
    IF @HasanID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '901234567890123')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@HasanID, 'Çakıl', 1, 2, 'Erkek', '2017-12-03', 31.2, 'Sarı', '901234567890123', 'Penisilin', 'Tip 1 Diabetes Mellitus');
    END
    
    -- Fatma Şahin'in hayvanları
    IF @FatmaID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '012345678901234')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@FatmaID, 'Minnoş', 2, 5, 'Dişi', '2020-04-18', 3.7, 'Gri-Beyaz', '012345678901234', NULL, NULL);
            
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '123456789012345')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@FatmaID, 'Oscar', 2, 4, 'Erkek', '2018-09-14', 5.2, 'Mavi Gri', '123456789012345', 'Balık proteini', 'Kronik Böbrek Yetmezliği');
    END
    
    -- Emre Kılıç'ın hayvanları
    IF @EmreID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '234567890123456' AND ad = 'Tarçın')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@EmreID, 'Tarçın', 1, 1, 'Dişi', '2019-11-22', 28.5, 'Kızıl-Altın', '234567890123456', NULL, 'Hipotiroidi');
    END
    
    -- Seda Yıldırım'ın hayvanları
    IF @SedaID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '345678901234567' AND ad = 'Mia')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@SedaID, 'Mia', 2, 6, 'Dişi', '2021-07-09', 3.4, 'Siyah-Beyaz', '345678901234567', NULL, NULL);
    END
    
    -- Kemal Özkan'ın hayvanları
    IF @KemalID IS NOT NULL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM hayvan WHERE mikrocip_no = '456789012345678' AND ad = 'Pati')
            INSERT INTO hayvan (sahip_id, ad, tur_id, irk_id, cinsiyet, dogum_tarihi, kilo, renk, mikrocip_no, alerjiler, kronik_hastaliklar)
            VALUES (@KemalID, 'Pati', 1, 3, 'Erkek', '2020-02-26', 34.1, 'Siyah-Tan', '456789012345678', 'Mısır, Soya', 'Koksofemoral Artrit');
    END
    
    PRINT 'Daha fazla hayvan verileri başarıyla eklendi.';
END TRY
BEGIN CATCH
    PRINT 'Hata: Daha fazla hayvan verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
END CATCH
GO

-- =============================================
-- Hayvan ID'lerini alma - Benzersiz mikroçip numarası ve isme göre
-- =============================================
DECLARE @CakilID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '901234567890123');
DECLARE @MinnosID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '012345678901234');
DECLARE @OscarID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '123456789012345');
DECLARE @TarcinID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '234567890123456' AND ad = 'Tarçın');
DECLARE @MiaID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '345678901234567' AND ad = 'Mia');
DECLARE @PatiID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '456789012345678' AND ad = 'Pati');

-- =============================================
-- Klinik İnceleme Verileri - Diyabet, Böbrek, Tiroid ve Artrit
-- =============================================
PRINT 'Hastalık bazlı klinik inceleme verileri ekleniyor...';

-- Önce tablo yapısını kontrol et
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_NAME = 'klinik_inceleme' 
           AND COLUMN_NAME IN ('hayvan_id', 'tarih', 'veteriner_id', 'anamnez', 'sikayetler', 'bulgular', 'birincil_tani', 'ikincil_tani', 'yapilan_islemler'))
BEGIN
    BEGIN TRY
        -- Çakıl için klinik inceleme verileri (Diyabet)
        IF @CakilID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @CakilID AND tarih = '2021-10-10')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@CakilID, '2021-10-10', 1, 'Sahibi köpeğinin son zamanlarda çok su içtiğini, sık idrara çıktığını ve kilo kaybettiğini belirtti.', 'Polidipsi, poliüri, kilo kaybı', 'Dehidrasyon belirtileri, kas kaybı, kan glukozu 320 mg/dL, idrarda glukoz (++++).', 'Diabetes Mellitus', 'Dehidrasyon', 'Kan şekeri düzenleme, insülin tedavisi (NPH insülin 0.5 U/kg 2x1), düşük karbonhidratlı diyet.');
                
            -- Diğer kayıtlar...
        END
        
        -- Oscar için klinik inceleme verileri (Kronik Böbrek Hastalığı)
        IF @OscarID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @OscarID AND tarih = '2022-03-15')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@OscarID, '2022-03-15', 2, 'Sahibi kedinin son haftalarda daha fazla su içtiğini ve kilo kaybettiğini belirtti.', 'Polidipsi, kilo kaybı, iştahsızlık', 'Dehidrasyon, oral ülserler, kan testlerinde BUN ve kreatinin yüksekliği, USG''de böbreklerde küçülme.', 'Kronik Böbrek Hastalığı (IRIS Evre 3)', 'Üremi', 'Subkutan sıvı tedavisi, düşük proteinli böbrek diyeti, fosfor bağlayıcı, vitamin B kompleksi.');
                
            -- Diğer kayıtlar...
        END
        
        -- Tarçın için klinik inceleme verileri (Hipotiroidi)
        IF @TarcinID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @TarcinID AND tarih = '2022-07-14')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@TarcinID, '2022-07-14', 1, 'Sahibi köpeğinin son aylarda daha yorgun olduğunu, kilo aldığını ve tüylerinin dökülmeye başladığını belirtti.', 'Letarji, kilo artışı, bilateral simetrik alopesi', 'Obezite, kuru deri, bradikardi, T4 ve serbest T4 düşük, TSH yüksek.', 'Hipotiroidi', NULL, 'Levotiroksin 0.02 mg/kg 2x1 başlandı, düşük kalorili diyet önerildi.');
                
            -- Diğer kayıtlar...
        END
        
        -- Pati için klinik inceleme verileri (Koksofemoral Artrit)
        IF @PatiID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM klinik_inceleme WHERE hayvan_id = @PatiID AND tarih = '2022-05-03')
                INSERT INTO klinik_inceleme (hayvan_id, tarih, veteriner_id, anamnez, sikayetler, bulgular, birincil_tani, ikincil_tani, yapilan_islemler)
                VALUES (@PatiID, '2022-05-03', 3, 'Sahibi köpeğinin hareket etmekte zorlandığını, özellikle arka bacaklarında güçsüzlük olduğunu belirtti.', 'Arka bacaklarda ağrı, topallık, hareketlerde zorlanma', 'Kalça eklemi palpasyonunda ağrı, hareket kısıtlılığı, radyografide kalça ekleminde dejeneratif değişiklikler.', 'Koksofemoral Artrit', 'Kalça Displazisi', 'Meloksikam 0.1 mg/kg 1x1, glukozamin-kondroitin sülfat takviyesi, kilo kontrolü, kontrollü egzersiz.');
                
            -- Diğer kayıtlar...
        END
        
        PRINT 'Hastalık bazlı klinik inceleme verileri başarıyla eklendi.';
    END TRY
    BEGIN CATCH
        PRINT 'Hata: Hastalık bazlı klinik inceleme verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
    END CATCH
END
ELSE
BEGIN
    PRINT 'UYARI: klinik_inceleme tablosunun yapısı beklenen sütunları içermiyor. Bu bölüm atlanıyor.';
END
GO

-- =============================================
-- Laboratuvar Test Verileri ve Alerji Kronik Kayıtları
-- =============================================
PRINT 'Laboratuvar test verileri ve kronik hastalık/alerji kayıtları ekleniyor...';

-- Önce lab_testleri tablosunu kontrol et
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'lab_testleri')
BEGIN
    -- Burada lab_testleri kayıtlarını ekleyebilirsiniz
    PRINT 'Laboratuvar test verileri eklemek için lab_testleri tablosu mevcut.';
END
ELSE
BEGIN
    PRINT 'UYARI: lab_testleri tablosu bulunamadı. Bu bölüm atlanıyor.';
END

-- Alerji ve kronik hastalık tablosunu kontrol et
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'alerji_kronik')
BEGIN
    -- Burada alerji_kronik kayıtlarını ekleyebilirsiniz
    PRINT 'Alerji ve kronik hastalık verileri eklemek için alerji_kronik tablosu mevcut.';
END
ELSE
BEGIN
    PRINT 'UYARI: alerji_kronik tablosu bulunamadı. Bu bölüm atlanıyor.';
END
GO

-- =============================================
-- Patolojik Bulgular
-- =============================================
PRINT 'Patolojik bulgular ekleniyor...';

-- Patolojik bulgular tablosunu kontrol et
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_NAME = 'patolojik_bulgular' 
           AND COLUMN_NAME IN ('hayvan_id', 'rapor_no', 'tarih', 'uygulayan', 'ornek_tipi', 'tani'))
BEGIN
    BEGIN TRY
        -- Hayvan ID'sini tekrar al
        DECLARE @OscarID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '123456789012345');
        
        IF @OscarID IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM patolojik_bulgular WHERE rapor_no = '2023-PAT-0245')
                INSERT INTO patolojik_bulgular (hayvan_id, rapor_no, tarih, uygulayan, ornek_tipi, ornek_lokasyonu, ornek_no, makroskopik_bulgular, mikroskopik_bulgular, tani, derece, sinirlar, metastaz_riski, yorumlar)
                VALUES (@OscarID, '2023-PAT-0245', '2023-08-10', 'DR. ELİF YILMAZ', 'RENAL BİYOPSİ', 'SOL BÖBREK', 'S-2023-1142', 
                'Sol böbrekten alınmış 0.8 x 0.5 cm boyutlarında kortikomedüller biyopsi materyali. Korteks soluk ve granüler görünümde.',
                'Histopatolojik incelemede, glomerüllerde global ve segmental skleroz, tübüler atrofi, interstisyel fibrozis ve mononükleer hücre infiltrasyonu izlenmektedir. Orta derecede arteriyosklerotik değişiklikler mevcuttur.',
                'KRONİK TÜBÜLOİNTERSTİSYEL NEFRİT',
                'ORTA-ŞİDDETLİ',
                'Biyopsi materyal sınırlarında patoloji devam etmektedir',
                'UYGULANAMAZ',
                'Kronik böbrek hastalığı tanısı histopatolojik olarak doğrulanmıştır. Bulgular IRIS Evre 3 kronik böbrek hastalığı ile uyumludur. Mevcut tedaviye devam edilmesi önerilir. Progresyonu yavaşlatmak için fosfor kısıtlaması, ACE inhibitörleri ve antihipertansif tedavi düşünülebilir.');
        END
        
        PRINT 'Patolojik bulgular başarıyla eklendi.';
    END TRY
    BEGIN CATCH
        PRINT 'Hata: Patolojik bulgular eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
    END CATCH
END
ELSE
BEGIN
    PRINT 'UYARI: patolojik_bulgular tablosunun yapısı beklenen sütunları içermiyor. Bu bölüm atlanıyor.';
END
GO

-- =============================================
-- Reçete Verileri
-- =============================================
PRINT 'Reçete verileri ekleniyor...';

-- Reçeteler tablosunu kontrol et
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'receteler')
BEGIN
    BEGIN TRY
        -- Hayvan ID'lerini al
        DECLARE @CakilID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '901234567890123');
        DECLARE @OscarID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '123456789012345');
        DECLARE @TarcinID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '234567890123456' AND ad = 'Tarçın');
        DECLARE @PatiID INT = (SELECT hayvan_id FROM hayvan WHERE mikrocip_no = '456789012345678' AND ad = 'Pati');
        
        -- Reçeteleri ekle
        IF @CakilID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM receteler WHERE hayvan_id = @CakilID AND tarih = '2021-10-10')
            INSERT INTO receteler (hayvan_id, tarih, sure, veteriner_id, veteriner_klinigi)
            VALUES (@CakilID, '2021-10-10', '30 gün', 1, 'Hayat Veteriner Kliniği'); -- Çakıl diyabet başlangıç
            
        IF @OscarID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM receteler WHERE hayvan_id = @OscarID AND tarih = '2022-03-15')
            INSERT INTO receteler (hayvan_id, tarih, sure, veteriner_id, veteriner_klinigi)
            VALUES (@OscarID, '2022-03-15', '30 gün', 2, 'Hayat Veteriner Kliniği'); -- Oscar kronik böbrek
            
        IF @TarcinID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM receteler WHERE hayvan_id = @TarcinID AND tarih = '2022-07-14')
            INSERT INTO receteler (hayvan_id, tarih, sure, veteriner_id, veteriner_klinigi)
            VALUES (@TarcinID, '2022-07-14', '60 gün', 1, 'Hayat Veteriner Kliniği'); -- Tarçın hipotiroidi
            
        IF @PatiID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM receteler WHERE hayvan_id = @PatiID AND tarih = '2022-05-03')
            INSERT INTO receteler (hayvan_id, tarih, sure, veteriner_id, veteriner_klinigi)
            VALUES (@PatiID, '2022-05-03', '14 gün', 3, 'Hayat Veteriner Kliniği'); -- Pati artrit
            
        PRINT 'Reçete verileri başarıyla eklendi.';
    END TRY
    BEGIN CATCH
        PRINT 'Hata: Reçete verileri eklenirken bir hata oluştu - ' + ERROR_MESSAGE();
    END CATCH
END
ELSE
BEGIN
    PRINT 'UYARI: receteler tablosu bulunamadı. Bu bölüm atlanıyor.';
END
GO

PRINT 'Hayvan Sağlığı Sistemi veri tabanına daha fazla mock veriler başarıyla eklendi.';
GO 