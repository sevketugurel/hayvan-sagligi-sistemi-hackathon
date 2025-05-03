USE hayvansaglikdb;
GO

-- Rol Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rol')
BEGIN
    CREATE TABLE rol (
        rol_id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(50) NOT NULL UNIQUE
    );
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
END
GO

-- Kullanıcı Tablosu (AuthN ve AuthZ için)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'kullanici')
BEGIN
    CREATE TABLE kullanici (
        kullanici_id INT IDENTITY(1,1) PRIMARY KEY,
        personel_id INT NOT NULL,
        kullanici_adi NVARCHAR(50) NOT NULL UNIQUE,
        parola_hash NVARCHAR(255) NOT NULL,
        salt NVARCHAR(255),
        olusturma_tarihi DATETIME DEFAULT GETDATE(),
        son_giris DATETIME,
        CONSTRAINT FK_Kullanici_Personel FOREIGN KEY (personel_id) REFERENCES personel(personel_id)
    );
END
GO

-- Tür Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tur')
BEGIN
    CREATE TABLE tur (
        tur_id INT IDENTITY(1,1) PRIMARY KEY,
        isim NVARCHAR(50) NOT NULL
    );
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
END
GO

-- İlaç Listesi
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ilac')
BEGIN
    CREATE TABLE ilac (
        ilac_id INT IDENTITY(1,1) PRIMARY KEY,
        ilac_ad NVARCHAR(100) NOT NULL,
        aktif_madde NVARCHAR(100),
        kullanim_alani NVARCHAR(100),
        uygulama_yolu NVARCHAR(50),
        notlar NVARCHAR(MAX)
    );
END
GO

-- Aşı Listesi
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'asi')
BEGIN
    CREATE TABLE asi (
        asi_id INT IDENTITY(1,1) PRIMARY KEY,
        asi_ad NVARCHAR(100) NOT NULL,
        hedef_hastalik NVARCHAR(100),
        asi_turu NVARCHAR(50),
        uygulama_yontemi NVARCHAR(50),
        notlar NVARCHAR(MAX)
    );
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
END
GO

-- Hastalık Geçmişi
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hastalik_gecmisi')
BEGIN
    CREATE TABLE hastalik_gecmisi (
        gecmis_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        hastalik_adi NVARCHAR(100) NOT NULL,
        tani_tarihi DATE NOT NULL,
        iyilesme_tarihi DATE,
        aciklama NVARCHAR(MAX),
        CONSTRAINT FK_HastalikGecmisi_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
END
GO

-- Randevu Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'randevu')
BEGIN
    CREATE TABLE randevu (
        randevu_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        veteriner_id INT NOT NULL,
        randevu_zamani DATETIME NOT NULL,
        sure_dk INT NOT NULL,
        tur NVARCHAR(50),
        durum NVARCHAR(20), -- ONAYLANDI, BEKLEMEDE, İPTAL
        iptal_notu NVARCHAR(MAX),
        CONSTRAINT FK_Randevu_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id),
        CONSTRAINT FK_Randevu_Personel FOREIGN KEY (veteriner_id) REFERENCES personel(personel_id)
    );
END
GO

-- Hatırlatma Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hatirlatma')
BEGIN
    CREATE TABLE hatirlatma (
        hatirlatma_id INT IDENTITY(1,1) PRIMARY KEY,
        randevu_id INT NOT NULL,
        gonderim_zamani DATETIME NOT NULL,
        kanal NVARCHAR(10), -- SMS, EMAIL
        durum NVARCHAR(20),
        CONSTRAINT FK_Hatirlatma_Randevu FOREIGN KEY (randevu_id) REFERENCES randevu(randevu_id)
    );
END
GO

-- Klinik İnceleme Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'klinik_inceleme')
BEGIN
    CREATE TABLE klinik_inceleme (
        inceleme_id INT IDENTITY(1,1) PRIMARY KEY,
        randevu_id INT NOT NULL,
        sikayetler NVARCHAR(MAX),
        anamnez NVARCHAR(MAX),
        bulgular NVARCHAR(MAX),
        birincil_tani NVARCHAR(100),
        ikincil_tani NVARCHAR(100),
        islemler NVARCHAR(MAX),
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_KlinikInceleme_Randevu FOREIGN KEY (randevu_id) REFERENCES randevu(randevu_id)
    );
END
GO

-- Reçete Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'recete')
BEGIN
    CREATE TABLE recete (
        recete_id INT IDENTITY(1,1) PRIMARY KEY,
        inceleme_id INT NOT NULL,
        ilac NVARCHAR(100),
        doz NVARCHAR(50),
        talimatlar NVARCHAR(MAX),
        CONSTRAINT FK_Recete_KlinikInceleme FOREIGN KEY (inceleme_id) REFERENCES klinik_inceleme(inceleme_id)
    );
END
GO

-- Laboratuvar Testi Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'laboratuvar_testi')
BEGIN
    CREATE TABLE laboratuvar_testi (
        test_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        ornek_no NVARCHAR(50),
        test_tipi NVARCHAR(50),
        ornek_tarihi DATETIME NOT NULL,
        CONSTRAINT FK_LabTesti_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
END
GO

-- Laboratuvar Sonucu Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'laboratuvar_sonucu')
BEGIN
    CREATE TABLE laboratuvar_sonucu (
        sonuc_id INT IDENTITY(1,1) PRIMARY KEY,
        test_id INT NOT NULL,
        parametre NVARCHAR(100),
        deger NVARCHAR(50),
        referans_araligi NVARCHAR(50),
        CONSTRAINT FK_LabSonucu_LabTesti FOREIGN KEY (test_id) REFERENCES laboratuvar_testi(test_id)
    );
END
GO

-- Görüntü İnceleme Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'goruntu_inceleme')
BEGIN
    CREATE TABLE goruntu_inceleme (
        goruntu_id INT IDENTITY(1,1) PRIMARY KEY,
        hayvan_id INT NOT NULL,
        modalite NVARCHAR(20), -- X-RAY, USG, BT, MR
        inceleme_tarihi DATETIME NOT NULL,
        dosya_url NVARCHAR(MAX),
        rapor NVARCHAR(MAX),
        CONSTRAINT FK_GoruntuInceleme_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
END
GO

-- Stok Ürün Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'stok_urun')
BEGIN
    CREATE TABLE stok_urun (
        urun_id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(100) NOT NULL,
        barkod NVARCHAR(50),
        lot_no NVARCHAR(50),
        uretim_tarihi DATE,
        son_kullanma_tarihi DATE,
        min_stok INT DEFAULT 0,
        max_stok INT DEFAULT 0
    );
END
GO

-- Stok İşlemi Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'stok_islemi')
BEGIN
    CREATE TABLE stok_islemi (
        islem_id INT IDENTITY(1,1) PRIMARY KEY,
        urun_id INT NOT NULL,
        islem_tarihi DATETIME NOT NULL,
        miktar INT NOT NULL,
        birim_maliyet DECIMAL(10,2),
        tur NVARCHAR(10), -- GİRİŞ, ÇIKIŞ
        ilgili_varlik NVARCHAR(50),
        CONSTRAINT FK_StokIslemi_StokUrun FOREIGN KEY (urun_id) REFERENCES stok_urun(urun_id)
    );
END
GO

-- Fatura Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'fatura')
BEGIN
    CREATE TABLE fatura (
        fatura_id INT IDENTITY(1,1) PRIMARY KEY,
        sahip_id INT NOT NULL,
        fatura_tarihi DATE NOT NULL,
        toplam_tutar DECIMAL(12,2) NOT NULL,
        durum NVARCHAR(20), -- ÖDENDİ, BEKLEMEDE, GECİKMİŞ
        CONSTRAINT FK_Fatura_Sahip FOREIGN KEY (sahip_id) REFERENCES sahip(sahip_id)
    );
END
GO

-- Fatura Madde Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'fatura_madde')
BEGIN
    CREATE TABLE fatura_madde (
        fatura_madde_id INT IDENTITY(1,1) PRIMARY KEY,
        fatura_id INT NOT NULL,
        aciklama NVARCHAR(200),
        miktar INT NOT NULL,
        birim_fiyat DECIMAL(10,2) NOT NULL,
        kdv_orani DECIMAL(5,2) DEFAULT 0,
        CONSTRAINT FK_FaturaMadde_Fatura FOREIGN KEY (fatura_id) REFERENCES fatura(fatura_id)
    );
END
GO

-- Ekipman Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ekipman')
BEGIN
    CREATE TABLE ekipman (
        ekipman_id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(100),
        model NVARCHAR(100),
        seri_no NVARCHAR(100),
        satin_alma_tarihi DATE,
        konum NVARCHAR(100)
    );
END
GO

-- Bakım Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'bakim')
BEGIN
    CREATE TABLE bakim (
        bakim_id INT IDENTITY(1,1) PRIMARY KEY,
        ekipaman_id INT NOT NULL,
        bakim_tarihi DATE NOT NULL,
        notlar NVARCHAR(MAX),
        CONSTRAINT FK_Bakim_Ekipman FOREIGN KEY (ekipaman_id) REFERENCES ekipman(ekipman_id)
    );
END
GO

-- Doküman Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'dokuman')
BEGIN
    CREATE TABLE dokuman (
        dokuman_id INT IDENTITY(1,1) PRIMARY KEY,
        sahip_id INT,
        hayvan_id INT,
        tur NVARCHAR(50),
        dosya_url NVARCHAR(MAX),
        olusturma_tarihi DATETIME DEFAULT GETDATE(),
        CONSTRAINT FK_Dokuman_Sahip FOREIGN KEY (sahip_id) REFERENCES sahip(sahip_id),
        CONSTRAINT FK_Dokuman_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
    );
END
GO

-- İletişim Log Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'iletisim_log')
BEGIN
    CREATE TABLE iletisim_log (
        iletisim_id INT IDENTITY(1,1) PRIMARY KEY,
        sahip_id INT,
        gonderim_tarihi DATETIME NOT NULL,
        kanal NVARCHAR(10), -- SMS, EMAIL
        konu NVARCHAR(200),
        mesaj NVARCHAR(MAX),
        durum NVARCHAR(20),
        CONSTRAINT FK_IletisimLog_Sahip FOREIGN KEY (sahip_id) REFERENCES sahip(sahip_id)
    );
END
GO

-- Rapor Takvimi Tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rapor_takvimi')
BEGIN
    CREATE TABLE rapor_takvimi (
        rapor_id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(100),
        frekans NVARCHAR(20),
        son_calistirma DATETIME
    );
END
GO

PRINT 'Tüm tablolar başarıyla oluşturuldu.';
GO 