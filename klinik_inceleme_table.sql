USE hayvansaglikdb;
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
END
GO

PRINT 'Klinik İnceleme tablosu kontrol edildi/oluşturuldu.';
GO 