-- Crear base de datos
CREATE DATABASE InventarioDB;
GO

-- Usar la base de datos
USE InventarioDB;
GO

-- Crear tabla de Roles
CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY(1,1),
    RoleName NVARCHAR(50) NOT NULL
);
GO

-- Crear tabla de Permisos
CREATE TABLE Permissions (
    PermissionID INT PRIMARY KEY IDENTITY(1,1),
    PermissionName NVARCHAR(50) NOT NULL
);
GO

-- Crear tabla intermedia Roles_Permissions
CREATE TABLE Roles_Permissions (
    RoleID INT NOT NULL,
    PermissionID INT NOT NULL,
    PRIMARY KEY (RoleID, PermissionID),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (PermissionID) REFERENCES Permissions(PermissionID)
);
GO

-- Crear tabla de Usuarios
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
	Name NVARCHAR(150) NOT NULL,
    Password NVARCHAR(100) NOT NULL,
    RoleID INT NOT NULL,
	Email NVARCHAR(100) NOT NULL,
	Status INT NOT NULL,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);
GO

-- Crear tabla de Productos
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    Status NVARCHAR(10) NOT NULL DEFAULT 'Activo'
);
GO

-- Crear tabla de Inventario
CREATE TABLE Inventory (
    InventoryID INT PRIMARY KEY IDENTITY(1,1),
    ProductID INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 0,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
GO

-- Crear tabla de Movimientos de Inventario
CREATE TABLE InventoryMovements (
    MovementID INT PRIMARY KEY IDENTITY(1,1),
    ProductID INT NOT NULL,
    UserID INT NOT NULL,
    MovementType NVARCHAR(10) NOT NULL CHECK (MovementType IN ('Entrada', 'Salida')),
    Quantity INT NOT NULL,
    MovementDate DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Insertar datos de ejemplo en Roles
INSERT INTO Roles (RoleName) VALUES ('Administrador'), ('Almacenista');
GO

-- Insertar datos de ejemplo en Permisos
INSERT INTO Permissions (PermissionName) VALUES 
('Ver módulo inventario'), 
('Agregar nuevos productos'),
('Aumentar inventario'), 
('Dar de baja/reactivar un producto'), 
('Ver módulo para Salida de productos'), 
('Sacar inventario del almacén'), 
('Ver módulo del histórico');
GO

-- Asignar permisos a los roles (Ejemplo)
INSERT INTO Roles_Permissions (RoleID, PermissionID) VALUES 
(1, 1), -- Administrador - Ver módulo inventario
(1, 2), -- Administrador - Agregar nuevos productos
(1, 3), -- Administrador - Aumentar inventario
(1, 4), -- Administrador - Dar de baja/reactivar un producto
(1, 7), -- Administrador - Ver módulo del histórico
(2, 1), -- Almacenista - Ver módulo inventario
(2, 5), -- Almacenista - Ver módulo para Salida de productos
(2, 6); -- Almacenista - Sacar inventario del almacén
GO

-- Insertar datos de ejemplo en Usuarios
INSERT INTO Users (Name, Password, RoleID) VALUES 
('admin', '$2y$15$GscK8mbQ9KYD1w4m1F7da.8BWaUYpVfVUGI8BTbE45HKADOfxR9LS', 1), 
('almacen', '$2y$15$rd0REyrju9kNcsvlaEgHC.wvGSmX2/gvSYgGBeOByy94CbQYcSHkm', 2);
GO
