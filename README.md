# FENIX - Sistema de Inventarios

## Descripción
FENIX es un sistema de gestión de inventarios que consta de un frontend desarrollado con Angular y un backend desarrollado con Java. La aplicación permite gestionar productos, movimientos de inventario y usuarios, proporcionando un sistema seguro y eficiente para el manejo de inventarios.

## IDE Utilizado
- **Frontend**: Visual Studio Code
- **Backend**: Eclipse IDE

## Versión del Lenguaje de Programación Utilizado
- **Frontend**: TypeScript 4.5+
- **Backend**: Java 11+

## DBMS Utilizado y su Versión
- **DBMS**: SQL Server
- **Versión**: 2019 o superior

## Instalación y Ejecución

### Backend (Java)

#### Requisitos previos
- JDK 11 o superior
- Maven
- SQL Server

#### Pasos para Configurar y Ejecutar

1. **Clonar el Repositorio**:
   ```sh
   git clone https://github.com/LMZ3423/sistema-fenix.git
   cd sistema-fenix-back-end
   ```

2. **Configurar la Base de Datos**:
   - Crea una base de datos en SQL Server.
   - Actualiza el archivo `application.properties` con la configuración de tu base de datos. Aquí tienes un ejemplo de configuración:
     ```properties
     server.port=3000
     logging.level.org.springframework.web.cors=DEBUG

     spring.datasource.url=jdbc:sqlserver://<HOST>:<PUERTO>;databaseName=<NOMBRE_BASE_DE_DATOS>
     spring.datasource.username=<USUARIO>
     spring.datasource.password=<CONTRASEÑA>
     spring.datasource.url=jdbc:sqlserver://<NOMBRE_DEL_SERVIDOR>:<PUERTO>;databaseName=<NOMBRE_BASE_DE_DATOS>;encrypt=true;trustServerCertificate=true;
     ```

3. **Importar el Proyecto en Eclipse**:
   - Abre Eclipse.
   - Ve a `File` > `Import`.
   - Selecciona `Existing Maven Projects` y haz clic en `Next`.
   - Navega a la carpeta del proyecto y selecciona el directorio raíz.
   - Haz clic en `Finish` para importar el proyecto.

4. **Construir el Proyecto**:
   - Asegúrate de que la opción `Build Automatically` esté habilitada desde `Project` > `Build Automatically`.
   - Si prefieres compilar manualmente, haz clic derecho en el proyecto y selecciona `Run As` > `Maven build...`. En `Goals`, ingresa `clean package` y haz clic en `Run`.

5. **Ejecutar la Aplicación**:
   - Localiza la clase principal con el método `main` (anotada con `@SpringBootApplication`).
   - Haz clic derecho en la clase y selecciona `Run As` > `Java Application`.

6. **Verificar la Ejecución**:
   - Abre un navegador web y navega a `http://localhost:3000` para verificar que la API está funcionando.

### Frontend (Angular)

#### Requisitos previos
- Node.js (v14 o superior)
- Angular CLI

#### Pasos para Configurar y Ejecutar

1. **Clonar el Repositorio**:
   ```sh
   git clone https://github.com/LMZ3423/sistema-fenix.git
   cd sistema-fenix-front-end
   ```

2. **Instalar Dependencias**:
   ```sh
   npm install
   ```

3. **Iniciar la Aplicación**:
   ```sh
   ng serve
   ```

4. **Abrir la Aplicación**:
   - Abre tu navegador y navega a `http://localhost:4200`.

## Uso

- **Registro e Inicio de Sesión**: Usa las páginas de registro e inicio de sesión para autenticarte.
- **Gestión de Inventarios**: Navega a la sección de productos para gestionar inventarios y movimientos.


## Contacto
Para cualquier duda o sugerencia, puedes contactarme en (lumz1416@gmail.com).
```
