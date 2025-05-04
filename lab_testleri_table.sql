USE hayvansaglikdb;
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
END
GO

PRINT 'Laboratuvar Testleri tablosu kontrol edildi/oluşturuldu.';
GO 