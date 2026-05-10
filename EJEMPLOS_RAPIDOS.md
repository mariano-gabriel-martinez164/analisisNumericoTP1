# 🚀 Ejemplos Rápidos - Series de Fourier

## Copiar y Pegar para Usar Inmediatamente

Cada ejemplo incluye el paso a paso exacto para obtener resultados visibles.

---

## 📌 Ejemplo 1: Función Identidad (Muy Fácil)

**Complejidad:** ⭐ Muy fácil  
**Convergencia:** Rápida (N=10 es suficiente)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 10]` → `x`
3. xmin: `-10`, xmax: `10`
4. N = 10
5. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Línea recta diagonal
- Serie verde: Línea diagonal con pequeñas oscilaciones
- Los coeficientes coseno (aₙ) serán todos cercanos a 0
- Solo los bₙ tendrán valores significativos

---

## 📌 Ejemplo 2: Función Cuadrada (Clásico)

**Complejidad:** ⭐⭐ Fácil  
**Convergencia:** Media (necesita N=20+ para buena aproximación)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 0)` → `-5` (constante negativa)
3. Click en "+ Agregar intervalo"
4. Intervalo #2: `[0, 10]` → `5` (constante positiva)
5. xmin: `-10`, xmax: `10`
6. N = 30
7. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Dos líneas horizontales (salto en 0)
- Serie verde: Intenta seguir el salto pero con ondulaciones (efecto Gibbs)
- Con N=50, mejor aproximación
- Con N=100, casi perfecta

### Interactivo:
- Mueve el slider N de 1 a 100 para ver cómo converge
- A N=1: Casi una onda senoidal
- A N=30: Ya reconoce la forma cuadrada
- A N=100: Muy cercana al original

---

## 📌 Ejemplo 3: Diente de Sierra (Intermedio)

**Complejidad:** ⭐⭐⭐ Intermedio  
**Convergencia:** Buena (N=15 es suficiente)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 10]` → `x` (identidad)
3. xmin: `-10`, xmax: `10`
4. N = 15
5. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Línea recta diagonal
- Serie verde: Casi perfecta desde el principio
- Error RMS muy bajo
- Convergencia de Dirichlet: Valores exactos en puntos específicos

---

## 📌 Ejemplo 4: Función Parabólica (Intermedio)

**Complejidad:** ⭐⭐⭐ Intermedio  
**Convergencia:** Media-buena (N=20)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 10]` → `x^2`
3. xmin: `-10`, xmax: `10`
4. N = 20
5. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Parábola clásica
- Serie verde: Buena aproximación en el centro
- Oscilaciones pequeñas en los extremos
- Con N=40 o N=60, mejor en los bordes

### Fórmula LaTeX:
Verás términos con cosenos principalmente (función par)

---

## 📌 Ejemplo 5: Onda Triangular (Avanzado)

**Complejidad:** ⭐⭐⭐⭐ Avanzado  
**Convergencia:** Rápida pero con oscilaciones (N=25)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 0)` → `-x-10`
3. Click en "+ Agregar intervalo"
4. Intervalo #2: `[0, 10]` → `x`
5. xmin: `-10`, xmax: `10`
6. N = 25
7. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Forma de triángulo
- Serie verde: Captura bien la forma
- Con N=10: Aproximación tosca
- Con N=50: Casi perfecta

---

## 📌 Ejemplo 6: Función por Tramos (Personalizado)

**Complejidad:** ⭐⭐⭐⭐⭐ Avanzado  
**Convergencia:** Depende de la función

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, -5]` → `0`
3. "+ Agregar intervalo"
4. Intervalo #2: `[-5, 5)` → `10`
5. "+ Agregar intervalo"
6. Intervalo #3: `[5, 10]` → `-5`
7. xmin: `-10`, xmax: `10`
8. N = 30
9. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Pulso rectangular asimétrico
- Serie verde: Intenta capturar todos los saltos
- Efecto Gibbs en cada transición
- Buena para entender cómo la serie maneja discontinuidades

---

## 📌 Ejemplo 7: Función Trigonométrica (Demostración)

**Complejidad:** ⭐ Muy fácil  
**Convergencia:** Inmediata (N=1 es suficiente)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 10]` → `sin(x)`
3. xmin: `-10`, xmax: `10`
4. N = 5
5. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Onda senoidal
- Serie verde: Casi idéntica (porque ya es una componente de Fourier)
- Error RMS: Extremadamente bajo
- Con N=1: Prácticamente perfecta

### Dato Interesante:
- La Serie de Fourier de sin(x) es sin(x) (trivial)
- Pero con funciones complejas de seno/coseno, verás la descomposición

---

## 📌 Ejemplo 8: Función Exponencial (Desafío)

**Complejidad:** ⭐⭐⭐⭐⭐ Muy avanzado  
**Convergencia:** Lenta (necesita N=50+)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-5, 5]` → `e^(x/5)` o `exp(x/5)`
3. xmin: `-5`, xmax: `5`
4. N = 50
5. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Curva exponencial
- Serie verde: Intenta capturar pero con oscilaciones
- Convergencia lenta (como en funciones no periódicas)
- Error mayor en los extremos

### Tip:
- Las funciones exponenciales no convergen bien
- Este es un buen ejemplo para entender limitaciones

---

## 📌 Ejemplo 9: Función Combinada (Realista)

**Complejidad:** ⭐⭐⭐⭐ Avanzado  
**Convergencia:** Depende (N=30)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 10]` → `sin(x) + 0.5*x`
3. xmin: `-10`, xmax: `10`
4. N = 30
5. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: Combinación de onda + línea
- Serie verde: Captura tanto la oscilación como la tendencia
- Coeficientes mixtos (senos y cosenos)
- Demostración práctica de superposición

---

## 📌 Ejemplo 10: Función Valor Absoluto (Reto)

**Complejidad:** ⭐⭐⭐ Intermedio  
**Convergencia:** Media (N=20)

### Pasos:
1. Expande "Definir Función"
2. Intervalo #1: `[-10, 10]` → `abs(x)`
3. xmin: `-10`, xmax: `10`
4. N = 20
5. Click en "🎯 Generar Serie"

### Qué verás:
- Función azul: "V" simétrica
- Serie verde: Buena aproximación pero con oscilaciones en el pico
- Función par → solo cosenos en la serie
- Con N=50: Mucho mejor en la punta

---

## 💡 Tips Generales

### Para Máxima Convergencia:
1. Usa N = 50 o más
2. Asegúrate de que la función sea periódica
3. Evita discontinuidades abruptas si es posible

### Para Mejor Visualización:
1. Ajusta xmin/xmax para hacer zoom
2. Observa el indicador de convergencia
3. Mueve el slider N para ver convergencia en tiempo real

### Para Presentación:
1. Toma screenshots de 3-4 ejemplos distintos
2. Muestra cómo aumentar N mejora la aproximación
3. Explica el efecto Gibbs en saltos/discontinuidades

---

## 🎯 Orden Recomendado para Presentar

Si vas a defender este trabajo, el orden óptimo es:

1. **Función Identidad** (N=10) - Rápido, fácil de entender
2. **Función Cuadrada** (N=30) - Muestra efecto Gibbs, impresionante
3. **Función Parabólica** (N=20) - Demuestra convergencia
4. **Función Personalizada** (tu TP específico) - Lo que te pidieron

**Duración total:** ~5-7 minutos

---

## 🔗 Conexión con Conceptos Teóricos

Mientras presentas, comenta:

- **Función Identidad**: "Ejemplo simple, converge rápido"
- **Función Cuadrada**: "Efecto Gibbs - oscilaciones en saltos"
- **Función Parabólica**: "Función suave, sin saltos = convergencia suave"
- **Función Trigonométrica**: "Ya es componente de Fourier = Serie trivial"

---

## 📊 Tabla Resumen

| Función | Complejidad | N recomendado | Tiempo | Notas |
|---------|-------------|---------------|--------|-------|
| x | ⭐ | 10 | 2 min | Muy simple |
| Cuadrada | ⭐⭐ | 30 | 2 min | Efecto Gibbs |
| x² | ⭐⭐⭐ | 20 | 2 min | Convergencia suave |
| sin(x) | ⭐ | 5 | 1 min | Trivial |
| Triangular | ⭐⭐⭐ | 25 | 2 min | Buen ejemplo |
| Exponencial | ⭐⭐⭐⭐⭐ | 50 | 3 min | Difícil |
| Personalizada | ⭐⭐⭐⭐ | 40 | 3 min | Tu TP |

---

**¡Usa estos ejemplos para practicar y dominar la aplicación! 🚀**
