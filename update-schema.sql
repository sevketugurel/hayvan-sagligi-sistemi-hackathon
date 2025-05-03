USE hayvansaglikdb;
GO

-- Drop the existing asi table if it exists
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'asi')
BEGIN
    DROP TABLE asi;
END
GO

-- Create the asi table with the correct structure matching the entity model
CREATE TABLE asi (
    id INT IDENTITY(1,1) PRIMARY KEY,
    hayvan_id INT NOT NULL,
    asi_adi NVARCHAR(100) NOT NULL,
    uygulama_tarihi DATE,
    sonraki_uygulama_tarihi DATE,
    doz NVARCHAR(50),
    uygulayan_veteriner NVARCHAR(100),
    aciklama NVARCHAR(500),
    batch_no NVARCHAR(50),
    CONSTRAINT FK_Asi_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
);
GO

-- Drop the existing rapor_takvimi table if it exists
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'rapor_takvimi')
BEGIN
    DROP TABLE rapor_takvimi;
END
GO

-- Create the rapor_takvimi table with the correct structure matching the entity model
CREATE TABLE rapor_takvimi (
    id INT IDENTITY(1,1) PRIMARY KEY,
    hayvan_id INT NOT NULL,
    rapor_tipi NVARCHAR(100) NOT NULL,
    tarih DATE NOT NULL,
    aciklama NVARCHAR(500),
    tamamlandi BIT DEFAULT 0 NOT NULL,
    CONSTRAINT FK_RaporTakvimi_Hayvan FOREIGN KEY (hayvan_id) REFERENCES hayvan(hayvan_id)
);
GO

PRINT 'Schema updated successfully to match entity models.';
GO 