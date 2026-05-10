# ⚡ Serie de Fourier - Calculadora Web Interactiva

![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-purple?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Aplicación web interactiva para calcular y visualizar **Series de Fourier** de funciones matemáticas arbitrarias. Diseñada como Trabajo Práctico Opcional de Análisis Numérico.

---

## 🎯 Características Principales

✨ **Funcionalidades Implementadas:**
- ✅ Cálculo de coeficientes a₀, aₙ, bₙ hasta N armónicos
- ✅ Control dinámico del número de armónicos
- ✅ Visualización gráfica comparativa (función original vs. aproximación)
- ✅ Tabla interactiva de coeficientes con color-coding
- ✅ Indicador de convergencia en tiempo real
- ✅ Definición de funciones por tramos
- ✅ Representación matemática LaTeX automática
- ✅ Tabla de evaluación en puntos específicos (Dirichlet)

🎨 **Características Visuales:**
- Interfaz moderna con tema oscuro
- Layout responsivo en 2 columnas
- Gráficos interactivos con Recharts
- Slider suave para variar armónicos
- Controles intuitivos con emojis
- Paleta de colores pastel armonizada

---

## 📚 Stack Tecnológico

- **Frontend:** React 19.2 + Vite 8.0
- **Matemáticas:** MathJS, Análisis numérico con integración por trapecio
- **Gráficos:** Recharts 3.8
- **Rendering:** KaTeX 0.16 (fórmulas LaTeX)
- **Linting:** ESLint 9.39
- **Empaquetado:** Vite build

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar o descargar el repositorio
cd "c:\Users\matyb\OneDrive\Escritorio\proyecto AM"

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en: **http://localhost:5174**

### Build para Producción

```bash
# Compilar
npm run build

# Previsualizar
npm run preview

# Verificar errores
npm run lint
```

---

## 📖 Documentación

📘 **[VER GUÍA COMPLETA DE USO →](./GUIA_DE_USO.md)**

La guía incluye:
- Instalación paso a paso
- Interfaz y cómo usar cada componente
- Ejemplos prácticos
- Solución de problemas
- Tips profesionales para la presentación

---

## 🎓 Conceptos Matemáticos

### Serie de Fourier
Una serie de Fourier es la representación de una función periódica como suma infinita de senos y cosenos:

$$S_N(x) = \frac{a_0}{2} + \sum_{n=1}^{N} \left[ a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right]$$

### Cálculo de Coeficientes

**Coeficiente a₀:**
$$a_0 = \frac{1}{L} \int_{-L}^{L} f(x) \, dx$$

**Coeficientes aₙ:**
$$a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx$$

**Coeficientes bₙ:**
$$b_n = \frac{1}{L} \int_{-L}^{L} f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$

En esta aplicación se usa **integración numérica por el método del trapecio** para calcular las integrales.

---

## 📂 Estructura del Proyecto

```
proyecto AM/
├── src/
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos globales
│   ├── main.jsx                # Punto de entrada
│   ├── FourierTable.jsx         # Tabla de coeficientes
│   ├── index.css               # Estilos base
│   ├── assets/                 # Recursos estáticos
│   └── utils/
│       ├── fourier.js          # Funciones de evaluación
│       ├── fourierUtils.js     # Utilidades de Series (nuevo)
│       ├── grafico.jsx         # Componente de gráficos
│       └── fourier/
│           ├── coeficientes.js # Cálculo de coeficientes
│           ├── comfinal.jsx    # Renderizado de serie LaTeX
│           ├── Dirich.jsx      # Tabla de Dirichlet
│           ├── generarSerie.jsx
│           ├── serieRender.jsx
│           └── fs.css
├── public/
│   └── (archivos públicos)
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── GUIA_DE_USO.md             # Guía de usuario (nuevo)
└── README.md                   # Este archivo
```

---

## 🎯 Ejemplos de Funciones

### Función Lineal
```
f(x) = x  (en [-10, 10])
```
Resultado: Convergencia rápida, pocas oscilaciones

### Función Cuadrada
```
f(x) = 5 (en [0, 10])
f(x) = -5 (en [-10, 0))
```
Resultado: Efecto Gibbs visible en los saltos

### Función Cuadrática
```
f(x) = x^2  (en [-10, 10])
```
Resultado: Buena aproximación con N moderado

### Función Trigonométrica
```
f(x) = sin(x)  (en [-10, 10])
```
Resultado: Casi perfecta desde N=1

---

## 🎨 Interfaz y Componentes

### Panel Izquierdo (Controles)
- 📋 Acordeón para definir función
- 📏 Inputs para rango del gráfico
- 🎚️ Slider de armónicos (N)
- 📈 Indicador de convergencia

### Panel Derecho (Visualización)
- 📊 Gráfico comparativo interactivo
- 📋 Tabla de coeficientes formateada
- 🔍 Tabla de convergencia de Dirichlet
- 🧮 Fórmula LaTeX automática

---

## 🔧 API de Funciones Clave

### `evaluarFuncion(x, piezas)`
Evalúa la función por tramos en el punto x.

### `calcularCoeficientes(f, L, N)`
Calcula los coeficientes de Fourier.
- `f`: Función a analizar
- `L`: Semi-período (π)
- `N`: Número de armónicos

### `generarDatosComparacion(xmin, xmax, pasos, funcion, coef, L)`
Genera datos para graficar ambas funciones.

### `calcularErrorMaximo(datos)`
Calcula el error máximo entre función original y aproximación.

---

## 📊 Rendimiento

- **Cálculo rápido** incluso con N=100
- **Gráficos suave** con 1000 puntos de datos
- **Interfaz responsiva** sin lag
- **Integración numérica**: 20,000 pasos por coeficiente

---

## 🎓 Objetivos del TP

Este proyecto cumple con todos los requisitos del Trabajo Práctico:

✅ **Funcionalidades Requeridas:**
1. Calcular e imprimir coeficientes a₀, aₙ, bₙ hasta 10° armónico
2. Permitir al usuario ampliar/disminuir armónicos
3. Mostrar gráficas de función original y aproximación

✅ **Funcionalidades Adicionales Implementadas:**
1. Comparación visual dinámica
2. Control deslizante interactivo para convergencia
3. Tabla de evaluación (Dirichlet)
4. Fórmula matemática LaTeX
5. Indicador de convergencia
6. Interfaz profesional mejorada

---

## 👥 Equipo

Trabajo Práctico Opcional - Análisis Numérico  
Grupo de 4 integrantes

---

## 📝 Notas Importantes

- La serie se expande en **período 2π** por defecto
- Se usa **integración numérica por trapecio** (20,000 pasos)
- Valores menores a **1e-6 se redondean a 0**
- Los gráficos tienen **1000 puntos de datos**
- Máximo **100 armónicos** para evitar sobrecarga

---

## 🐛 Troubleshooting

**El servidor no inicia:**
```bash
# Limpiar caché y reinstalar
rm -r node_modules package-lock.json
npm install
npm run dev
```

**El gráfico se ve vacío:**
- Verifica que xmin < xmax
- Comprueba que los intervalos de la función cubran el rango gráfico
- Recarga la página (F5)

**Errores de compilación:**
- Revisa que Node.js esté actualizado: `node --version`
- Ejecuta: `npm run lint` para encontrar errores

---

## 📄 Licencia

MIT License - Libre para uso educativo y comercial

---

## 🌐 Recursos Adicionales

- [Documentación de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [Series de Fourier (Wikipedia)](https://es.wikipedia.org/wiki/Serie_de_Fourier)
- [Recharts](https://recharts.org)
- [MathJS](https://mathjs.org)

---

**Última actualización:** Mayo 2026  
**Versión:** 1.0 - UI Mejorada con Guía de Usuario

