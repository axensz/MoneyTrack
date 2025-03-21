# MoneyTrack

## Descripción
MoneyTrack es una aplicación web diseñada para ayudar a los usuarios a registrar y gestionar sus ingresos y gastos de manera sencilla y accesible. Su objetivo es mejorar la salud financiera al permitir visualizar transacciones mediante gráficos interactivos y llevar un control detallado de las finanzas, **sin requerir conexión a internet**.

## Características
- Registro de ingresos y gastos.
- Visualización de transacciones mediante gráficos interactivos.
- Gestión de cuentas bancarias con resumen de ingresos, gastos y total.
- Funcionalidad offline: toda la lógica y el contenido se integran en el bundle final.
- Interfaz responsive desarrollada con SASS y clases parciales.

## Tecnologías Utilizadas
- **React** y **Vite** para el frontend.
- **SASS** para la gestión de estilos.
- **JavaScript** para la lógica de la aplicación.
- **Chart.js** para la generación de gráficos.
- **react-number-format** para el formateo de números.
- **React Router** para la navegación.
- **Git** para el control de versiones.

## Estructura del Proyecto
La estructura base del proyecto es la siguiente:
```
MONEYTRACK/
│── dist/                    
│── node_modules/             
│── public/                   
│── src/                      
│   ├── assets/                # Imágenes, íconos, etc.
│   ├── components/            # Componentes reutilizables y específicos (Auth, Transactions, UI)
│   ├── styles/                # Archivos SASS (base, components, pages)
│   ├── utils/                 # Funciones reutilizables (auth, createAccount, generateChart, transactions, etc.)
│   ├── App.jsx                # Componente principal
│   └── main.jsx               # Punto de entrada de la aplicación
│── .gitignore                
│── README.md                
│── package.json             
│── vite.config.js            
```

## Requisitos de Evaluación
- **(20%) Prototipo Figma:**  
  La aplicación refleja lo planteado en el prototipo de Figma (actualiza el archivo de Figma según las modificaciones realizadas).  
  [Enlace al prototipo en Figma](https://www.figma.com/design/sHIYQZ0UkW3tj963tbr9D7/MoneyTrack?node-id=0-1&t=SFJ1Dn56QnZLDxA0-1)

- **(30%) Funcionalidad y Bundle Final:**  
  La aplicación funciona correctamente, está completa y todo el contenido está incrustado en el bundle final que se usará para crear el instalador.

- **(10%) Uso de Repositorio:**  
  Se evidencia el uso del repositorio con un mínimo de 40 commits, con al menos 10 commits por integrante, y se usa correctamente el archivo `.gitignore` y el `README.md` con las instrucciones de ejecución del proyecto.

- **(10%) Offline:**  
  La aplicación no requiere conexión a Internet para funcionar.

- **(10%) Uso de SASS:**  
  La estructura base del proyecto evidencia el uso de SASS y clases parciales.

- **(10%) Bundler:**  
  Se utiliza correctamente Vite para automatizar la minificación de archivos SASS, integración y optimización del código JavaScript.

- **(10%) Asistencia y Puntualidad:**  
  Se registra la asistencia a clases y la entrega puntual del proyecto.

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tuUsuario/MoneyTrack.git
   cd MoneyTrack
   ```

2. **Instalar Dependencias:**

   ```bash
   npm install
   ```

   Asegúrate de tener instaladas las siguientes dependencias:
   - **SASS** (para compilar los archivos .scss)
   - **Chart.js** (para los gráficos)
   - **react-number-format** (para el formateo de números)
   Si no están incluidas en tu `package.json`, puedes instalarlas ejecutando:

   ```bash
   npm install sass chart.js react-number-format
   ```

3. **Ejecutar en Modo Desarrollo:**

   ```bash
   npm run dev
   ```

4. **Construir para Producción:**

   ```bash
   npm run build
   ```

## Uso
- Navega por la aplicación para registrar transacciones, gestionar cuentas y visualizar gráficos interactivos.
- Consulta la documentación interna del proyecto para más detalles sobre la estructura y las funciones implementadas.

## Colaboración

- **Camilo Andrés Guzmán**
- **Mkclaren Tobar Vélez**

Cada integrante ha contribuido con un mínimo de 10 commits, siguiendo buenas prácticas de control de versiones.

