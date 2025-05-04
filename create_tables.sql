USE hayvansaglikdb;
GO

PRINT 'Hayvan Sağlığı Sistemi Tablo Yapısı Oluşturuluyor...';
GO

-- Rol Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rol')
BEGIN
    CREATE TABLE rol (
        rol_id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(50) NOT NULL UNIQUE
    );
    PRINT 'Rol tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Rol tablosu zaten mevcut.';
END
GO

-- Personel Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'personel')
BEGIN
    CREATE TABLE personel (
        personel_id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(100),
        soyad NVARCHAR(100),
        e_posta NVARCHAR(150),
        telefon NVARCHAR(20),
        ise_baslama_tarihi DATE,
        aktif BIT DEFAULT 1
    );
    PRINT 'Personel tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Personel tablosu zaten mevcut.';
END
GO

-- Personel Rol İlişki Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'personel_rol')
BEGIN
    CREATE TABLE personel_rol (
        personel_id INT NOT NULL,
        rol_id INT NOT NULL,
        PRIMARY KEY (personel_id, rol_id),
        CONSTRAINT FK_PersonelRol_Personel FOREIGN KEY (personel_id) REFERENCES personel(personel_id),
        CONSTRAINT FK_PersonelRol_Rol FOREIGN KEY (rol_id) REFERENCES rol(rol_id)
    );
    PRINT 'Personel Rol ilişki tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Personel Rol ilişki tablosu zaten mevcut.';
END
GO

-- Tür Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tur')
BEGIN
    CREATE TABLE tur (
        tur_id INT IDENTITY(1,1) PRIMARY KEY,
        isim NVARCHAR(50) NOT NULL
    );
    PRINT 'Tür tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Tür tablosu zaten mevcut.';
END
GO

-- Irk Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'irk')
BEGIN
    CREATE TABLE irk (
        irk_id INT IDENTITY(1,1) PRIMARY KEY,
        tur_id INT NOT NULL,
        isim NVARCHAR(100) NOT NULL,
        CONSTRAINT FK_Irk_Tur FOREIGN KEY (tur_id) REFERENCES tur(tur_id)
    );
    PRINT 'Irk tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Irk tablosu zaten mevcut.';
END
GO

-- Sahip Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'sahip')
BEGIN
    CREATE TABLE sahip (
        sahip_id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(100) NOT NULL,
        soyad NVARCHAR(100) NOT NULL,
        telefon1 NVARCHAR(20),
        telefon2 NVARCHAR(20),
        e_posta NVARCHAR(150),
        adres NVARCHAR(MAX),
        tercih_edilen_iletisim NVARCHAR(20)
    );
    PRINT 'Sahip tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Sahip tablosu zaten mevcut.';
END
GO

-- Hayvan Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hayvan')
BEGIN
    CREATE TABLE hayvan (
        hayvan_id INT IDENTITY(1,1) PRIMARY KEY,
        sahip_id INT NOT NULL,
        ad NVARCHAR(100) NOT NULL,
        tur_id INT NOT NULL,
        irk_id INT NOT NULL,
        cinsiyet NVARCHAR(10),
        dogum_tarihi DATE,
        kilo DECIMAL(5,2),
        renk NVARCHAR(50),
        mikrocip_no NVARCHAR(50),
        alerjiler NVARCHAR(MAX),
        kronik_hastaliklar NVARCHAR(MAX),
        CONSTRAINT FK_Hayvan_Sahip FOREIGN KEY (sahip_id) REFERENCES sahip(sahip_id),
        CONSTRAINT FK_Hayvan_Tur FOREIGN KEY (tur_id) REFERENCES tur(tur_id),
        CONSTRAINT FK_Hayvan_Irk FOREIGN KEY (irk_id) REFERENCES irk(irk_id)
    );
    PRINT 'Hayvan tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Hayvan tablosu zaten mevcut.';
END
GO

-- Klinik İnceleme Tablosu
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
        birincil_tani NVARCHAR(100),
        ikincil_tani NVARCHAR(100),
        yapilan_islemler NVARCHAR(MAX),
        CONSTRAINT FK_KlinikInceleme_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_KlinikInceleme_Personel FOREIGN KEY (veteriner_id) REFERENCES personel(personel_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_KlinikInceleme_HayvanID ON klinik_inceleme(hayvan_id);
    CREATE INDEX IX_KlinikInceleme_Tarih ON klinik_inceleme(tarih);
    PRINT 'Klinik İnceleme tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Klinik İnceleme tablosu zaten mevcut.';
END
GO

-- Hastalık Geçmişi Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hastalik_gecmisi')
BEGIN
    CREATE TABLE hastalik_gecmisi (
        gecmis_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        hastalik_adi NVARCHAR(100) NOT NULL,
        tani_tarihi DATE NOT NULL,
        iyilesme_tarihi DATE,
        detaylar NVARCHAR(MAX),
        tedavi NVARCHAR(MAX),
        hastanede_yatis BIT NOT NULL DEFAULT 0,
        yatis_gun_sayisi INT DEFAULT 0,
        durum NVARCHAR(20) DEFAULT 'Devam Ediyor',
        CONSTRAINT FK_HastalikGecmisi_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_HastalikGecmisi_HayvanID ON hastalik_gecmisi(hayvan_id);
    CREATE INDEX IX_HastalikGecmisi_HastalikAdi ON hastalik_gecmisi(hastalik_adi);
    PRINT 'Hastalık Geçmişi tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Hastalık Geçmişi tablosu zaten mevcut.';
END
GO

-- Reçeteler Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'receteler')
BEGIN
    CREATE TABLE receteler (
        recete_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        sure NVARCHAR(50),
        veteriner_id INT NOT NULL,
        veteriner_klinigi NVARCHAR(100),
        CONSTRAINT FK_Receteler_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_Receteler_Personel FOREIGN KEY (veteriner_id) REFERENCES personel(personel_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_Receteler_HayvanID ON receteler(hayvan_id);
    CREATE INDEX IX_Receteler_Tarih ON receteler(tarih);
    PRINT 'Reçeteler tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Reçeteler tablosu zaten mevcut.';
END
GO

-- Reçete İlaç İlişkisi Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'recete_ilac')
BEGIN
    CREATE TABLE recete_ilac (
        recete_ilac_id INT IDENTITY(1,1) PRIMARY KEY,
        recete_id INT NOT NULL,
        ilac_adi NVARCHAR(100) NOT NULL,
        doz NVARCHAR(50),
        kullanim_talimati NVARCHAR(MAX),
        CONSTRAINT FK_ReceteIlac_Recete FOREIGN KEY (recete_id) REFERENCES receteler(recete_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_ReceteIlac_ReceteID ON recete_ilac(recete_id);
    PRINT 'Reçete İlaç ilişki tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Reçete İlaç ilişki tablosu zaten mevcut.';
END
GO

-- Laboratuvar Testleri Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'lab_testleri')
BEGIN
    CREATE TABLE lab_testleri (
        test_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        istek_yapan_id INT NOT NULL,
        test_tipi NVARCHAR(100) NOT NULL,
        sonuc NVARCHAR(MAX),
        referans_aralik NVARCHAR(100),
        birim NVARCHAR(20),
        sonuc_tarihi DATE,
        analiz_yapan NVARCHAR(100),
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_LabTestleri_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_LabTestleri_Personel FOREIGN KEY (istek_yapan_id) REFERENCES personel(personel_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_LabTestleri_HayvanID ON lab_testleri(hayvan_id);
    CREATE INDEX IX_LabTestleri_Tarih ON lab_testleri(tarih);
    CREATE INDEX IX_LabTestleri_TestTipi ON lab_testleri(test_tipi);
    PRINT 'Laboratuvar Testleri tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Laboratuvar Testleri tablosu zaten mevcut.';
END
GO

-- Radyolojik Görüntüleme Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'radyolojik_goruntuleme')
BEGIN
    CREATE TABLE radyolojik_goruntuleme (
        goruntuleme_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        istek_yapan_id INT NOT NULL,
        goruntuleme_tipi NVARCHAR(50) NOT NULL, -- X-Ray, USG, MRI, CT
        vucut_bolge NVARCHAR(50) NOT NULL,
        sonuc NVARCHAR(MAX),
        goruntu_yolu NVARCHAR(MAX),
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_RadyolojikGoruntuleme_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_RadyolojikGoruntuleme_Personel FOREIGN KEY (istek_yapan_id) REFERENCES personel(personel_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_RadyolojikGoruntuleme_HayvanID ON radyolojik_goruntuleme(hayvan_id);
    CREATE INDEX IX_RadyolojikGoruntuleme_Tarih ON radyolojik_goruntuleme(tarih);
    CREATE INDEX IX_RadyolojikGoruntuleme_Tipi ON radyolojik_goruntuleme(goruntuleme_tipi);
    PRINT 'Radyolojik Görüntüleme tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Radyolojik Görüntüleme tablosu zaten mevcut.';
END
GO

-- Aşılar Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'asilar')
BEGIN
    CREATE TABLE asilar (
        asi_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATE NOT NULL,
        asi_tipi NVARCHAR(100) NOT NULL,
        uygulayan_id INT NOT NULL,
        doz NVARCHAR(20),
        seri_no NVARCHAR(50),
        sonraki_doz_tarihi DATE,
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_Asilar_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_Asilar_Personel FOREIGN KEY (uygulayan_id) REFERENCES personel(personel_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_Asilar_HayvanID ON asilar(hayvan_id);
    CREATE INDEX IX_Asilar_Tarih ON asilar(tarih);
    CREATE INDEX IX_Asilar_AsiTipi ON asilar(asi_tipi);
    PRINT 'Aşılar tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Aşılar tablosu zaten mevcut.';
END
GO

-- Alerji ve Kronik Hastalık Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'alerji_kronik')
BEGIN
    CREATE TABLE alerji_kronik (
        kayit_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tip NVARCHAR(20) NOT NULL, -- Alerji veya Kronik
        ad NVARCHAR(100) NOT NULL,
        tanim_tarihi DATE,
        onem_derecesi NVARCHAR(20), -- Düşük, Orta, Yüksek
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_AlerjiKronik_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_AlerjiKronik_HayvanID ON alerji_kronik(hayvan_id);
    CREATE INDEX IX_AlerjiKronik_Tip ON alerji_kronik(tip);
    PRINT 'Alerji ve Kronik Hastalık tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Alerji ve Kronik Hastalık tablosu zaten mevcut.';
END
GO

-- Patolojik Bulgular Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'patolojik_bulgular')
BEGIN
    CREATE TABLE patolojik_bulgular (
        patoloji_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        rapor_no NVARCHAR(50) NOT NULL,
        tarih DATE NOT NULL,
        uygulayan NVARCHAR(100),
        ornek_tipi NVARCHAR(100) NOT NULL,
        ornek_lokasyonu NVARCHAR(100),
        ornek_no NVARCHAR(50),
        makroskopik_bulgular NVARCHAR(MAX),
        mikroskopik_bulgular NVARCHAR(MAX),
        tani NVARCHAR(MAX) NOT NULL,
        derece NVARCHAR(50),
        sinirlar NVARCHAR(100),
        metastaz_riski NVARCHAR(50),
        yorumlar NVARCHAR(MAX),
        CONSTRAINT FK_PatolojikBulgular_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_PatolojikBulgular_HayvanID ON patolojik_bulgular(hayvan_id);
    CREATE INDEX IX_PatolojikBulgular_Tarih ON patolojik_bulgular(tarih);
    CREATE INDEX IX_PatolojikBulgular_RaporNo ON patolojik_bulgular(rapor_no);
    PRINT 'Patolojik Bulgular tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Patolojik Bulgular tablosu zaten mevcut.';
END
GO

-- Notlar Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'notlar')
BEGIN
    CREATE TABLE notlar (
        not_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        tarih DATETIME NOT NULL DEFAULT GETDATE(),
        ekleyen_id INT NOT NULL,
        baslik NVARCHAR(100),
        not_icerigi NVARCHAR(MAX) NOT NULL,
        onem_derecesi NVARCHAR(20), -- Düşük, Orta, Yüksek
        CONSTRAINT FK_Notlar_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_Notlar_Personel FOREIGN KEY (ekleyen_id) REFERENCES personel(personel_id)
    );
    
    -- İndeksler
    CREATE INDEX IX_Notlar_HayvanID ON notlar(hayvan_id);
    CREATE INDEX IX_Notlar_Tarih ON notlar(tarih);
    PRINT 'Notlar tablosu oluşturuldu.';
END
ELSE
BEGIN
    PRINT 'Notlar tablosu zaten mevcut.';
END
GO

PRINT 'Hayvan Sağlığı Sistemi tüm tabloları başarıyla oluşturuldu/kontrol edildi.';
GO 