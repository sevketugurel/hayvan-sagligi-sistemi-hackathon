USE hayvansaglikdb;
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
END
GO

PRINT 'Hastalık Geçmişi tablosu kontrol edildi/oluşturuldu.';
GO 