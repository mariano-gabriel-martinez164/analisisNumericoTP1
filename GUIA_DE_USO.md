# 📚 Guía de Uso - Series de Fourier

## 🎯 Introducción

Esta aplicación web interactiva te permite calcular y visualizar la **Serie de Fourier** de cualquier función matemática. Puedes definir funciones por tramos, calcular sus coeficientes, y ver cómo la serie aproxima la función original.

---

## 📋 Requisitos Previos

- **Node.js** instalado en tu PC
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para la primera instalación)

---

## 🚀 Instalación y Ejecución

### Paso 1: Instalar Dependencias

```bash
npm install
```

Este comando descargará todas las librerías necesarias (React, Vite, Recharts, MathJS, KaTeX, etc.)

### Paso 2: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Verás un mensaje como:
```
  VITE v8.0.10  ready in 203 ms
  ➜  Local:   http://localhost:5174/
  ➜  press h + enter to show help
```

### Paso 3: Abrir en el Navegador

Ve a `http://localhost:5174/` en tu navegador favorito.

---

## 🎨 Interfaz Principal

La aplicación está dividida en **2 columnas**:

### 📍 Columna Izquierda - Controles
- **Definir Función**: Acordeón donde configuras la función
- **Rango del Gráfico**: Establece los límites en X
- **Serie de Fourier**: Slider para ajustar N (número de armónicos)
- **Indicador de Convergencia**: Muestra qué tan bien aproxima la serie

### 📊 Columna Derecha - Visualización
- **Gráfico Comparativo**: Función original vs. Serie de Fourier
- **Tabla de Coeficientes**: Valores de a₀, aₙ, bₙ
- **Tabla de Dirichlet**: Evaluación en puntos específicos
- **Representación Matemática**: Fórmula LaTeX de la serie

---

## 📖 Guía Paso a Paso

### 1️⃣ Definir tu Función

#### Opción A: Función Simple (Un intervalo)

1. Haz clic en **"Definir Función"** para expandir el acordeón
2. El intervalo por defecto es **[-10, 10]**
3. En el campo **"Expresión f(x)"**, escribe tu función

**Ejemplos válidos:**
- `x` (función identidad)
- `x^2` (parábola)
- `sin(x)` (seno)
- `cos(x)` (coseno)
- `abs(x)` (valor absoluto)
- `x^2 + sin(x)` (combinaciones)

**Botones de atajo matemático:**
- `^` - Potencia
- `√` - Raíz cuadrada
- `sin` - Función seno
- `cos` - Función coseno
- `π` - Constante pi
- `e` - Número de Euler
- `|x|` - Valor absoluto

#### Opción B: Función por Tramos

1. Expande **"Definir Función"**
2. Cada "Intervalo #" define una parte de la función
3. Establece el rango: **[inicio, fin]**
4. Elige si incluye o excluye los límites (corchetes vs paréntesis)
5. Escribe la expresión para ese tramo
6. Haz clic en **"+ Agregar intervalo"** para más tramos

**Ejemplo: Función escalera**
```
Intervalo #1: [-10, 0)   →  f(x) = 0
Intervalo #2: [0, 10]    →  f(x) = 5
```

#### Opción C: Usar el Dominio Completo

Haz clic en **"Dominio ℝ"** para establecer los rangos a infinito (-1000, 1000)

### 2️⃣ Evaluar un Punto Específico

Si quieres calcular f(x) en un punto exacto:

1. En el campo **"Evaluar en x"**, escribe el valor
2. Haz clic en **"Calcular"**
3. El resultado aparecerá en un cuadro resaltado

**Ejemplo:**
- Si f(x) = x² y evalúas x = 3
- Resultado: 9

### 3️⃣ Establecer el Rango del Gráfico

En la sección **"Rango del Gráfico"**:
- **xmin**: Valor mínimo en el eje X (por defecto -10)
- **xmax**: Valor máximo en el eje X (por defecto 10)

Cambiar estos valores hace zoom/dezoom en el gráfico.

### 4️⃣ Generar la Serie de Fourier

En la sección **"Serie de Fourier"**:

1. **Ajusta N** (número de armónicos) con el slider
   - Rango: 1 a 100
   - Más armónicos = mejor aproximación
   
2. Haz clic en **"🎯 Generar Serie (N=X)"**

3. Verás inmediatamente:
   - **Gráfico actualizado** con ambas curvas
   - **Tabla de coeficientes** con los valores calculados
   - **Indicador de convergencia** mostrando el error
   - **Fórmula LaTeX** de la serie

---

## 📊 Interpretación de Resultados

### Gráfico Comparativo

- **Línea Azul**: Tu función original
- **Línea Verde**: Aproximación por Serie de Fourier
- **Distancia entre líneas**: Error de aproximación

**Nota:** Con más armónicos, la línea verde se acerca más a la azul.

### Tabla de Coeficientes

| Armónico (n) | aₙ (coseno) | bₙ (seno) |
|---|---|---|
| a₀/2 | Componente DC | 0 |
| 1 | Coef. coseno del armónico 1 | Coef. seno del armónico 1 |
| 2 | ... | ... |

- **a₀/2** (resaltado en azul): Componente constante de la serie
- **aₙ**: Coeficiente del coseno (frecuencia n)
- **bₙ**: Coeficiente del seno (frecuencia n)
- Los valores pequeños (< 0.0001) se redondean a 0

### Indicador de Convergencia

Aparece cuando generas una serie:
- **Barra verde**: Muestra qué porcentaje de convergencia tienes
- **Error máx**: Diferencia máxima entre función original y aproximación
- **Error RMS**: Raíz del error cuadrático medio (más preciso)

### Estadísticas

- **Total de armónicos**: N que seleccionaste
- **Período (T)**: 2π (por defecto)
- **Frecuencia base (ω₀)**: 1/(2π)

### Tabla de Dirichlet

Muestra cómo se comporta tu función en puntos específicos:
- Punto x vs Valor f(x)
- Útil para validar la función

### Representación Matemática (LaTeX)

La fórmula completa de tu serie con los coeficientes calculados:

```
S₁₀(x) = 2·sin(x) + (-1)·sin(2x) + 0.6667·sin(3x) + ...
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Función Cuadrada

**Objetivo:** Aproximar una función cuadrada con Series de Fourier

**Pasos:**
1. Expande "Definir Función"
2. Intervalo #1: [-10, 0) → `-5`
3. Agregar intervalo
4. Intervalo #2: [0, 10] → `5`
5. Establece xmin = -10, xmax = 10
6. Ajusta N = 20 en el slider
7. Haz clic en "🎯 Generar Serie"

**Resultado:** Verás cómo la serie va redondeando los picos de la función cuadrada (efecto Gibbs).

### Ejemplo 2: Función Diente de Sierra

**Pasos:**
1. Expande "Definir Función"
2. Intervalo #1: [-10, 10] → `x` (identidad)
3. xmin = -10, xmax = 10
4. N = 10
5. Generar

**Resultado:** Una aproximación muy buena porque la serie converge rápido para funciones suaves.

### Ejemplo 3: Función Trigonométrica

**Pasos:**
1. Expande "Definir Función"
2. Intervalo #1: [-10, 10] → `sin(x)`
3. N = 5 (es suficiente para seno puro)
4. Generar

**Resultado:** Casi coincidencia perfecta, porque ya es una función periódica simple.

### Ejemplo 4: Función Compuesta

**Pasos:**
1. Expande "Definir Función"
2. Intervalo #1: [-10, 10] → `x^2 + cos(x)`
3. N = 15 (funciones más complejas necesitan más armónicos)
4. Generar

**Resultado:** Verás cómo la serie intenta capturar tanto la parábola como la oscilación.

---

## 🎛️ Controles Interactivos

### Slider de Armónicos

Mientras está generada una serie, puedes **mover el slider** para cambiar N:
- Desliza a la izquierda para menos armónicos (aproximación más tosca)
- Desliza a la derecha para más armónicos (aproximación más precisa)
- Los gráficos y tabla se actualizan automáticamente

### Slider de Rango

Cambiar xmin/xmax hace zoom en el gráfico. Útil para ver detalles.

### Botones de Atajo

En la definición de función, usa los botones para insertar símbolos sin escribir:
- Click en `sin` → inserta `sin(` en la expresión
- Click en `√` → inserta `sqrt(` en la expresión
- etc.

---

## ⚠️ Mensajes de Error

### "Expresión inválida"
**Causa:** Sintaxis incorrecta en la fórmula.

**Soluciones:**
- Verifica paréntesis balanceados: `sin(x)` ✓, `sin(x` ✗
- Usa `*` para multiplicación: `2*x` ✓, `2x` ✗
- Escribe funciones completas: `sin(x)` ✓, `sin` ✗

### "x fuera del dominio"
**Causa:** El valor de x que intentas evaluar no está en los intervalos definidos.

**Solución:** Define intervalos que incluyan el rango que necesitas.

### Gráfico vacío
**Causa:** Los intervalos definidos no intersectan con [xmin, xmax].

**Solución:** Ajusta los rangos o redefine los intervalos.

---

## 🔧 Cambiar a Otros Ejercicios del TP

La aplicación está diseñada para que **cambies solo la función**, todo lo demás es automático.

Para pasar de un ejercicio a otro:
1. Borra la expresión actual
2. Escribe la nueva función
3. Ajusta xmin, xmax si es necesario
4. Genera la serie nuevamente

**Ejemplo:** Pasar de f(x) = x a f(x) = x²
```
Cambio solo en la caja de expresión:
  x  →  x^2
```

---

## 📥 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Verificar errores de código
npm run lint

# Ver vista previa de la producción
npm run preview
```

---

## 🎓 Conceptos Matemáticos

### ¿Qué es una Serie de Fourier?

Es una forma de representar funciones periódicas como suma infinita de senos y cosenos.

Fórmula general:
$$S(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left[ a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right]$$

En esta app:
- **a₀/2**: Componente DC (valor promedio)
- **aₙ**: Amplitud del coseno de frecuencia n
- **bₙ**: Amplitud del seno de frecuencia n
- **N**: Número de armónicos calculados
- **L**: Semi-período (π en esta app)

### Convergencia

Cuanto mayor sea N, mejor la aproximación. Pero siempre hay un "error de Gibbs" en discontinuidades.

### Aplicaciones Prácticas

- Procesamiento de señales
- Análisis de vibraciones
- Compresión JPEG/MP3
- Síntesis de audio
- Telecomunicaciones

---

## 📞 Soporte

Si encuentras problemas:

1. **Recarga la página** (F5 o Ctrl+R)
2. **Limpia la consola** del navegador (F12)
3. **Verifica la sintaxis** de la función
4. **Reinicia el servidor** (Ctrl+C en la terminal, luego `npm run dev`)

---

## ✨ Tips Profesionales

1. **Usa N=100** para obtener las mejores aproximaciones
2. **Zoom en detalles** ajustando xmin/xmax
3. **Compara múltiples N** para entender la convergencia
4. **Toma screenshots** del gráfico para tu presentación
5. **Memoriza los coeficientes** de los primeros armónicos

---

## 🚀 ¡Listo para la Presentación!

Tu proyecto ahora tiene:
- ✅ Interfaz profesional y moderna
- ✅ Cálculos precisos de Series de Fourier
- ✅ Visualización interactiva
- ✅ Tabla de coeficientes formateada
- ✅ Indicador de convergencia
- ✅ Fórmula LaTeX automática
- ✅ Guía de usuario completa

**¡Mucho éxito en tu defensa! 🎉**

---

**Última actualización:** Mayo 2026  
**Versión:** 1.0 - UI Mejorada
