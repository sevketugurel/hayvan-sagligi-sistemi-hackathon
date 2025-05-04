USE hayvansaglikdb;
GO

-- =============================================
-- Klinik İnceleme Tablosu (Clinical Examination)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'klinik_inceleme')
BEGIN
    CREATE TABLE klinik_inceleme (
        inceleme_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        veteriner_id INT NOT NULL, 
        anamnez NVARCHAR(MAX),
        sikayetler NVARCHAR(MAX),
        bulgular NVARCHAR(MAX),
        birincil_tani NVARCHAR(255),
        ikincil_tani NVARCHAR(255),
        yapilan_islemler NVARCHAR(MAX),
        CONSTRAINT FK_KlinikInceleme_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_KlinikInceleme_Personel FOREIGN KEY (veteriner_id) REFERENCES personel(personel_id)
    );
    
    CREATE INDEX IX_KlinikInceleme_HayvanID ON klinik_inceleme(hayvan_id);
    CREATE INDEX IX_KlinikInceleme_Tarih ON klinik_inceleme(tarih);
END
GO

-- =============================================
-- Hastalık Geçmişi Tablosu (Disease History)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hastalik_gecmisi')
BEGIN
    CREATE TABLE hastalik_gecmisi (
        hastalik_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        hastalik_adi NVARCHAR(255) NOT NULL,
        tani_tarihi DATE NOT NULL,
        iyilesme_tarihi DATE NULL,
        detaylar NVARCHAR(MAX),
        tedavi NVARCHAR(MAX),
        hastanede_yatis BIT DEFAULT 0,
        yatis_gun_sayisi INT DEFAULT 0,
        durum NVARCHAR(50), -- 'Devam Ediyor', 'İyileşti'
        CONSTRAINT FK_HastalikGecmisi_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_HastalikGecmisi_HayvanID ON hastalik_gecmisi(hayvan_id);
END
GO

-- =============================================
-- Randevu Takip Tablosu (Appointment Tracking)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'randevular')
BEGIN
    CREATE TABLE randevular (
        randevu_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        saat NVARCHAR(10) NOT NULL,
        sebep NVARCHAR(255),
        durum NVARCHAR(50), -- 'Planlandı', 'Tamamlandı', 'İptal Edildi'
        tipi NVARCHAR(50), -- 'examination', 'vaccine', 'treatment'
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_Randevular_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_Randevu_HayvanID ON randevular(hayvan_id);
    CREATE INDEX IX_Randevu_Tarih ON randevular(tarih);
END
GO

-- =============================================
-- Radyolojik Görüntüleme Tablosu (Radiological Imaging)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'radyolojik_goruntuleme')
BEGIN
    CREATE TABLE radyolojik_goruntuleme (
        goruntuleme_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        tipi NVARCHAR(50) NOT NULL, -- 'Röntgen', 'USG', 'BT', 'MR', 'EKG' etc.
        bolge NVARCHAR(100) NOT NULL, -- 'Toraks', 'Abdomen', 'Kardiyak' etc.
        bulgular NVARCHAR(MAX),
        goruntu_url NVARCHAR(255),
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_RadyolojikGoruntuleme_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_RadyolojikGoruntuleme_HayvanID ON radyolojik_goruntuleme(hayvan_id);
    CREATE INDEX IX_RadyolojikGoruntuleme_Tipi ON radyolojik_goruntuleme(tipi);
END
GO

-- =============================================
-- Laboratuvar Testleri Tablosu (Laboratory Tests)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'lab_testleri')
BEGIN
    CREATE TABLE lab_testleri (
        test_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        test_adi NVARCHAR(100) NOT NULL,
        sonuclar NVARCHAR(MAX),
        rapor_url NVARCHAR(255),
        CONSTRAINT FK_LabTestleri_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_LabTestleri_HayvanID ON lab_testleri(hayvan_id);
END
GO

-- =============================================
-- Laboratuvar Test Detayları Tablosu (Lab Test Details)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'lab_test_detaylari')
BEGIN
    CREATE TABLE lab_test_detaylari (
        detay_id INT IDENTITY(1,1) PRIMARY KEY,
        test_id INT NOT NULL,
        parametre NVARCHAR(100) NOT NULL,
        deger NVARCHAR(50),
        birim NVARCHAR(20),
        referans_araligi NVARCHAR(50),
        durum NVARCHAR(20), -- 'Normal', 'Yüksek', 'Düşük'
        CONSTRAINT FK_LabTestDetay_LabTest FOREIGN KEY (test_id) REFERENCES lab_testleri(test_id)
    );
    
    CREATE INDEX IX_LabTestDetay_TestID ON lab_test_detaylari(test_id);
END
GO

-- =============================================
-- Reçete Tablosu (Prescription)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'receteler')
BEGIN
    CREATE TABLE receteler (
        recete_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        sure NVARCHAR(50), -- '7 gün', '10 gün' vb.
        veteriner_id INT NOT NULL,
        veteriner_klinigi NVARCHAR(255) NOT NULL,
        CONSTRAINT FK_Recete_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_Recete_Veteriner FOREIGN KEY (veteriner_id) REFERENCES personel(personel_id)
    );
    
    CREATE INDEX IX_Recete_HayvanID ON receteler(hayvan_id);
END
GO

-- =============================================
-- Reçete İlaçları Tablosu (Prescription Medications)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'recete_ilaclari')
BEGIN
    CREATE TABLE recete_ilaclari (
        recete_ilac_id INT IDENTITY(1,1) PRIMARY KEY,
        recete_id INT NOT NULL,
        ilac_adi NVARCHAR(255) NOT NULL,
        CONSTRAINT FK_ReceteIlac_Recete FOREIGN KEY (recete_id) REFERENCES receteler(recete_id)
    );
    
    CREATE INDEX IX_ReceteIlac_ReceteID ON recete_ilaclari(recete_id);
END
GO

-- =============================================
-- Aşı Tablosu (Vaccination)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'asilar')
BEGIN
    CREATE TABLE asilar (
        asi_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE,
        asi_adi NVARCHAR(100) NOT NULL,
        sonraki_tarih DATE,
        durum NVARCHAR(50), -- 'Tamamlandı', 'Planlandı'
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_Asilar_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_Asi_HayvanID ON asilar(hayvan_id);
END
GO

-- =============================================
-- Alerji ve Kronik Hastalıklar Tablosu (Allergies and Chronic Conditions)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'alerji_kronik')
BEGIN
    CREATE TABLE alerji_kronik (
        alerji_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tipi NVARCHAR(50) NOT NULL, -- 'allergy', 'chronic'
        allerjen_veya_hastalik NVARCHAR(255) NOT NULL,
        siddet NVARCHAR(50), -- 'Hafif', 'Orta', 'Ciddi'
        belirtiler NVARCHAR(MAX),
        tani_tarihi DATE,
        teshis_koyan_id INT, -- veteriner id
        durum NVARCHAR(50), -- 'Aktif', 'Mevsimsel', 'Aktif - Takip Altında'
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_AlerjiKronik_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_AlerjiKronik_Veteriner FOREIGN KEY (teshis_koyan_id) REFERENCES personel(personel_id)
    );
    
    CREATE INDEX IX_AlerjiKronik_HayvanID ON alerji_kronik(hayvan_id);
    CREATE INDEX IX_AlerjiKronik_Tipi ON alerji_kronik(tipi);
END
GO

-- =============================================
-- Alerji/Kronik Hastalık Tedavileri Tablosu (Allergy/Chronic Condition Treatments)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'alerji_kronik_tedavi')
BEGIN
    CREATE TABLE alerji_kronik_tedavi (
        tedavi_id INT IDENTITY(1,1) PRIMARY KEY,
        alerji_id INT NOT NULL,
        tedavi NVARCHAR(255) NOT NULL,
        CONSTRAINT FK_AlerjiTedavi_Alerji FOREIGN KEY (alerji_id) REFERENCES alerji_kronik(alerji_id)
    );
    
    CREATE INDEX IX_AlerjiTedavi_AlerjiID ON alerji_kronik_tedavi(alerji_id);
END
GO

-- =============================================
-- Patolojik Bulgular Tablosu (Pathological Findings)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'patolojik_bulgular')
BEGIN
    CREATE TABLE patolojik_bulgular (
        patoloji_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        rapor_no NVARCHAR(50),
        tarih DATE NOT NULL,
        uygulayan NVARCHAR(100),
        ornek_tipi NVARCHAR(100), -- 'DOKU BİYOPSİSİ' vb.
        ornek_lokasyonu NVARCHAR(100), -- 'DERİ - SOL ÖN BACAK' vb.
        ornek_no NVARCHAR(50),
        makroskopik_bulgular NVARCHAR(MAX),
        mikroskopik_bulgular NVARCHAR(MAX),
        tani NVARCHAR(255),
        derece NVARCHAR(50), -- 'I (Düşük Dereceli)' vb.
        sinirlar NVARCHAR(MAX), -- 'Cerrahi sınırlarda tümör hücresi görülmemektedir' vb.
        metastaz_riski NVARCHAR(50), -- 'Düşük (%10-15)' vb.
        yorumlar NVARCHAR(MAX),
        CONSTRAINT FK_Patoloji_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_Patoloji_HayvanID ON patolojik_bulgular(hayvan_id);
END
GO

-- =============================================
-- Nekropsi Bulgular Tablosu (Necropsy Findings)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'nekropsi_bulgular')
BEGIN
    CREATE TABLE nekropsi_bulgular (
        nekropsi_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        veteriner NVARCHAR(100),
        bulgular NVARCHAR(MAX),
        rapor_no NVARCHAR(50),
        rapor_tarihi DATE,
        uygulayan NVARCHAR(100),
        tur NVARCHAR(50),
        irk NVARCHAR(50),
        yas INT,
        kimlik_no NVARCHAR(50),
        CONSTRAINT FK_Nekropsi_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_Nekropsi_HayvanID ON nekropsi_bulgular(hayvan_id);
END
GO

-- =============================================
-- Notlar Tablosu (Notes)
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'notlar')
BEGIN
    CREATE TABLE notlar (
        not_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        yazar NVARCHAR(100) NOT NULL,
        icerik NVARCHAR(MAX) NOT NULL,
        CONSTRAINT FK_Not_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    CREATE INDEX IX_Not_HayvanID ON notlar(hayvan_id);
END
GO

PRINT 'Hayvan Sağlığı Sistemi veri tabanı tabloları başarıyla oluşturuldu.';
GO 