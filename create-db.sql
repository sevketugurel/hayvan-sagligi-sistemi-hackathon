USE master;

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'hayvansaglikdb')
BEGIN
    CREATE DATABASE hayvansaglikdb;
    PRINT 'Database hayvansaglikdb created successfully.';
END
ELSE
BEGIN
    PRINT 'Database hayvansaglikdb already exists.';
END 