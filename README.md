# Sistema de Gestión de Restaurante

Un sistema integral de gestión de restaurante basado en Angular que maneja tanto las reservaciones de clientes como las operaciones administrativas. La aplicación se divide en dos interfaces principales: un sistema de reservas para clientes y un panel administrativo para el personal del restaurante.

## 🌟 Características

### Portal del Cliente
- **Sistema de Reserva de Mesas**
  - Selección de número de comensales (1-1000)
  - Elección entre horarios de almuerzo y cena
  - Especificación de solicitudes especiales
  - Verificación de disponibilidad en tiempo real
  - Descarga de confirmación de reserva en PDF

### Panel Administrativo
- **Gestión de Reservas**
  - Ver y administrar todas las reservas
  - Funcionalidad de filtrado y búsqueda
  - Actualizaciones en tiempo real
  - Información detallada del cliente

- **Gestión de Personal**
  - Control de acceso basado en roles
  - Programación del personal
  - Seguimiento del desempeño
  - Gestión de permisos de usuario

- **Análisis e Informes**
  - Estadísticas diarias de reservas
  - Análisis de tráfico de clientes
  - Identificación de horas pico
  - Informes semanales/mensuales
  - Gráficos interactivos

## 🚀 Stack Tecnológico

- **Frontend**: Angular 18+
- **Componentes UI**: Angular Material
- **Estilos**: Tailwind CSS
- **Gráficos**: Chart.js
- **Generación de PDF**: jsPDF
- **Base de Datos**: Supabase
- **Autenticación**: Implementación personalizada con acceso basado en roles

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- Angular CLI (v17 o superior)
- NPM (v9 o superior)

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tuusuario/sistema-gestion-restaurante.git
```

2. Navegar al directorio del proyecto:
```bash
cd sistema-gestion-restaurante
```

3. Instalar dependencias:
```bash
npm install
```

4. Configurar variables de entorno:
```bash
cp .env.example .env
```
Agregar las credenciales de Supabase y otras variables de entorno necesarias.

5. Ejecutar el servidor de desarrollo:
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## 🔐 Acceso Basado en Roles

El sistema implementa diferentes niveles de acceso:

- **Cliente**
  - Realizar reservas
  - Ver/modificar sus reservas
  - Descargar confirmaciones de reserva

- **Personal**
  - Ver mesas asignadas
  - Gestionar reservas
  - Actualizar estado de reservas

- **Gerente**
  - Acceso a análisis
  - Gestión de personal
  - Configuración del sistema
  - Control total de reservas

- **Administrador**
  - Acceso completo al sistema
  - Gestión de roles de usuario
  - Configuración de ajustes del sistema

## 📱 Componentes Principales

### Interfaz del Cliente
- Formulario de reserva con proceso paso a paso
- Selección interactiva de calendario y horarios
- Verificación de disponibilidad en tiempo real
- Gestión de solicitudes especiales
- Diseño responsivo para móviles

### Interfaz Administrativa
- Panel con métricas clave
- Sistema de gestión de reservas
- Interfaz de programación del personal
- Herramientas de análisis e informes
- Sistema de gestión de usuarios

## 🔄 Flujo de Trabajo

1. **Proceso de Reserva del Cliente**
   - Seleccionar fecha y hora
   - Elegir número de comensales
   - Completar datos personales
   - Agregar solicitudes especiales
   - Recibir confirmación

2. **Gestión Administrativa**
   - Notificaciones de reservas en tiempo real
   - Asignación de mesas
   - Asignación de personal
   - Comunicación con clientes
   - Seguimiento de análisis

## 📊 Visualización de Datos

El sistema incluye gráficos y estadísticas:
- Tendencias diarias de reservas
- Análisis de horas pico
- Demografía de clientes
- Estadísticas de ingresos
- Tasas de utilización de mesas

## 🛡️ Características de Seguridad

- Autenticación basada en roles
- Guardias de ruta
- Validación de formularios
- Protección XSS
- Protección CSRF
- Endpoints API seguros

## 🤝 Contribuir

1. Hacer fork del repositorio
2. Crear rama de características (`git checkout -b feature/NuevaCaracteristica`)
3. Hacer commit de los cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles

## 👥 Autores

- Israel Almanza - *Trabajo inicial* - [TuGitHub](https://github.com/ialmanza)

## 🙏 Agradecimientos

- Al equipo de Angular por el fantástico framework
- A Supabase por la infraestructura backend
- Al equipo de Chart.js por las herramientas de visualización

## 📞 Soporte

Para soporte, enviar un correo a almanza.desarrolloweb@gmail.com o crear un issue en el repositorio.
