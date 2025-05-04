USE hayvansaglikdb;
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
END
GO

PRINT 'Reçeteler tablosu kontrol edildi/oluşturuldu.';
GO 