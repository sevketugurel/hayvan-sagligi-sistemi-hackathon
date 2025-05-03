USE master;
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'hayvansaglikdb')
BEGIN
    CREATE DATABASE hayvansaglikdb;
END
GO

USE hayvansaglikdb;
GO

-- Roller tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'roles')
BEGIN
    CREATE TABLE roles (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(20) UNIQUE NOT NULL
    );
    
    -- Varsayılan rolleri ekle
    INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
    INSERT INTO roles (name) VALUES ('ROLE_VETERINER');
    INSERT INTO roles (name) VALUES ('ROLE_LABORANT');
    INSERT INTO roles (name) VALUES ('ROLE_HEMSIRE');
    INSERT INTO roles (name) VALUES ('ROLE_MUHASEBE');
    INSERT INTO roles (name) VALUES ('ROLE_SAHIP');
END
GO

-- Kullanıcılar tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        username NVARCHAR(50) UNIQUE NOT NULL,
        email NVARCHAR(100) UNIQUE NOT NULL,
        password NVARCHAR(120) NOT NULL,
        first_name NVARCHAR(50),
        last_name NVARCHAR(50),
        phone NVARCHAR(20),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Kullanıcı-Rol ilişki tablosu
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_roles')
BEGIN
    CREATE TABLE user_roles (
        user_id BIGINT NOT NULL,
        role_id BIGINT NOT NULL,
        PRIMARY KEY (user_id, role_id),
        CONSTRAINT FK_UserRoles_Users FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT FK_UserRoles_Roles FOREIGN KEY (role_id) REFERENCES roles(id)
    );
END
GO

-- Admin kullanıcısı oluştur (şifre: admin123)
IF NOT EXISTS (SELECT * FROM users WHERE username = 'admin')
BEGIN
    INSERT INTO users (username, email, password, first_name, last_name, phone)
    VALUES ('admin', 'admin@hayvansaglik.com', '$2a$10$ixlPY3AAd4ty1l6E2IsQ9OFZi2ba9ZQE0bP7RFcGIWNhyFrrT3YUi', 'Admin', 'User', '5555555555');

    -- Admin kullanıcısına ADMIN rolünü ata
    INSERT INTO user_roles (user_id, role_id)
    SELECT u.id, r.id FROM users u, roles r 
    WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN';
END
GO

PRINT 'Database initialization completed successfully.';
GO 