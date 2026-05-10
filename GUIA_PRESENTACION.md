# 🎤 Guía de Presentación - Series de Fourier

## Para la Clase Presencial (Máximo 10 minutos)

---

## 📋 Checklist Pre-Presentación

- [ ] Proyecto corriendo en `http://localhost:5174`
- [ ] Ejemplos precargados y testiados
- [ ] Pantalla compartida o monitor conectado
- [ ] Font size legible (zoom en navegador si es necesario)
- [ ] Tomar 2-3 capturas de pantalla importantes
- [ ] Tener impresos los comandos principales

---

## ⏱️ Timeline Recomendado (10 minutos)

| Tiempo | Actividad | Duración |
|--------|-----------|----------|
| 0:00 - 0:30 | Introducción teórica | 30 seg |
| 0:30 - 1:30 | Explicar interfaz | 1 min |
| 1:30 - 4:00 | Demo en vivo (3 ejemplos) | 2.5 min |
| 4:00 - 8:00 | Profundizar en concepto elegido | 4 min |
| 8:00 - 9:30 | Responder preguntas del profesor | 1.5 min |
| 9:30 - 10:00 | Cierre | 0.5 min |

---

## 🎯 Guión de Presentación (Detallado)

### **INTRODUCCIÓN (30 segundos)**

> "Buenos días/tardes. Nuestro proyecto implementa un **calculador interactivo de Series de Fourier**. 
> 
> Una Serie de Fourier es una forma matemática de representar funciones periódicas como suma de senos y cosenos. Específicamente, calculamos los coeficientes a₀, aₙ, bₙ y permitimos al usuario variar dinámicamente el número de armónicos para observar cómo converge la aproximación.
> 
> El proyecto está desarrollado en **React + Vite** con gráficos interactivos en tiempo real."

---

### **INTERFAZ (1 minuto)**

**Mientras muestras la pantalla:**

> "La aplicación está dividida en dos paneles principales:
> 
> **[Señala la izquierda]** En esta columna izquierda tenemos los controles:
> - Definir la función (puede ser por tramos)
> - Establecer el rango del gráfico (xmin, xmax)
> - Controlar el número de armónicos con un slider
> - Un indicador de convergencia que muestra qué tan bien aproxima
> 
> **[Señala la derecha]** En esta columna derecha está la visualización:
> - Gráfico comparativo con dos líneas (función original en azul, Serie de Fourier en verde)
> - Tabla de coeficientes con valores precisos
> - Tabla de convergencia de Dirichlet
> - La fórmula LaTeX automática de la serie calculada"

---

### **DEMOSTRACIÓN EN VIVO (2.5 minutos)**

#### **Ejemplo 1: Función Simple (45 seg)**

1. Expande "Definir Función"
2. Muestra que ya hay `f(x) = x` en [-10, 10]
3. Establece N = 10
4. Haz click en "🎯 Generar Serie"

> "Este es el ejemplo más simple. Tenemos la función identidad: f(x) = x.
> La serie de Fourier (línea verde) ya sigue muy bien la función original (azul).
> 
> Aquí puedes ver la tabla de coeficientes con los valores a₀, aₙ, bₙ."

**[Muestra la tabla, señala los valores]**

---

#### **Ejemplo 2: Función Cuadrada (60 seg)**

1. Limpia la expresión actual
2. Intervalo #1: `[-10, 0)` → `-5`
3. "+ Agregar intervalo"
4. Intervalo #2: `[0, 10]` → `5`
5. N = 30
6. Generar Serie

> "Este es un caso más interesante. Tenemos una **función cuadrada** con un salto discontinuo en x=0.
> 
> Fíjense cómo la Serie de Fourier (verde) intenta seguir este salto, pero tiene pequeñas oscilaciones. Esto se llama el **efecto Gibbs** - una limitación fundamental de las Series de Fourier en discontinuidades.
> 
> Ahora miren los coeficientes: los valores bₙ (seno) son los dominantes porque la función es impar."

**[Señala la tabla]**

> "Si muevo el slider para aumentar N a 50..."

**[Arrastra el slider]**

> "...verán que la aproximación mejora considerablemente. Las oscilaciones disminuyen."

---

#### **Ejemplo 3: Función Parabólica (45 seg)**

1. Cambiar a `x^2`
2. N = 20
3. Generar

> "Este ejemplo es con una **función suave**, una parábola. Como no tiene discontinuidades, la Series de Fourier converge mucho mejor.
> 
> Aquí ven que la serie (verde) prácticamente coincide con la original (azul).
> 
> Noten que principalmente hay términos con coseno (aₙ) porque es una función par: f(-x) = f(x)."

---

### **PROFUNDIZACIÓN (4 minutos)**

#### Opción A: Si el Profesor Pregunta por el Cálculo

> "Los coeficientes se calculan usando integración numérica. Específicamente:
> 
> - Para a₀ integramos la función en todo el intervalo
> - Para aₙ integramos la función multiplicada por cos(nπx/L)
> - Para bₙ integramos la función multiplicada por sin(nπx/L)
> 
> Usamos el **método del trapecio** con 20,000 pasos para precisión numérica.
> 
> Luego construimos la serie como suma: S(x) = a₀/2 + Σ[aₙ·cos(nπx/L) + bₙ·sin(nπx/L)]"

**[Muestra la fórmula LaTeX en pantalla]**

---

#### Opción B: Si el Profesor Pregunta por la Convergencia

> "La convergencia se mide de dos formas:
> 
> 1. **Error máximo**: La diferencia máxima entre la función original y la aproximación
> 2. **Error RMS**: Raíz del error cuadrático medio, más preciso estadísticamente
> 
> El indicador de convergencia muestra el porcentaje de aproximación.
> 
> Con pocas armónicas, el error es alto. Con muchas, el error es bajo. Pero siempre hay un límite debido al efecto Gibbs en discontinuidades."

**[Muestra el indicador de convergencia]**

---

#### Opción C: Si el Profesor Pregunta por Aplicaciones

> "Las Series de Fourier tienen aplicaciones prácticas enormes:
> 
> 1. **Procesamiento de audio**: Descomponer sonidos complejos en frecuencias
> 2. **Compresión**: JPEG y MP3 usan conceptos similares
> 3. **Ingeniería**: Análisis de vibraciones en estructuras
> 4. **Telecomunicaciones**: Modulación de señales
> 
> Este proyecto demuestra los principios fundamentales de todas estas aplicaciones."

---

### **RESPONDER PREGUNTAS (1.5 minutos)**

**Preguntas probables y respuestas:**

**P1: ¿Por qué algunas funciones convergen mejor que otras?**

R: "Porque las funciones suaves convergen mejor. Las discontinuidades (saltos) causan el efecto Gibbs. Funciones sin derivadas también convergen lentamente."

---

**P2: ¿Cuántos armónicos necesitas para una buena aproximación?**

R: "Depende de la función. Para funciones suaves, 10-20 es suficiente. Para funciones complejas, 50-100. El indicador de convergencia te lo dice en tiempo real."

---

**P3: ¿Qué sucede si N tiende a infinito?**

R: "Matemáticamente, la serie converge a la función original (excepto en discontinuidades donde converge al punto medio). En la práctica, con N=100 tenemos aproximaciones excelentes."

---

**P4: ¿Por qué algunos coeficientes son exactamente cero?**

R: "Porque la función tiene simetría. Las funciones pares solo tienen cosenos (aₙ), las impares solo senos (bₙ). Valores menores a 1e-6 se redondean a cero."

---

**P5: ¿Cómo se compara esto con otros métodos de aproximación?**

R: "Las Series de Fourier son óptimas para funciones periódicas. Para otros tipos, existen métodos como Series de Taylor o polinomios de interpolación."

---

### **CIERRE (30 segundos)**

> "En resumen, hemos desarrollado una herramienta interactiva que:
> 
> ✅ Calcula Series de Fourier automáticamente
> ✅ Visualiza la convergencia en tiempo real
> ✅ Permite experimentar con diferentes funciones
> ✅ Muestra los conceptos matemáticos de forma visual e intuitiva
> 
> Esto resuelve todos los ejercicios del Punto 4 de la guía de trabajos prácticos.
> 
> Gracias."

---

## 🎥 Demo en Vivo: Checklist Técnico

Antes de presentar, verifica:

- [ ] Navegador abierto en http://localhost:5174
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Zoom del navegador al 100% o legible
- [ ] Pantalla con suficiente resolución
- [ ] Mouse/trackpad funcionando bien
- [ ] Conexión a internet estable
- [ ] Ejemplos precargados y listos

---

## 📸 Screenshots Importantes para Tomar

Guarda estas imágenes para referencia posterior:

1. **Función Lineal con N=10**: Interface completa
2. **Función Cuadrada con N=30**: Mostrando efecto Gibbs
3. **Convergencia en tiempo real**: Slider moviendo N
4. **Tabla de coeficientes**: Con valores destacados
5. **Indicador de convergencia**: Error bajo

---

## 🎤 Tips Profesionales

### Lenguaje Corporal
- ✅ Mantén contacto visual con el profesor
- ✅ Señala la pantalla al explicar
- ✅ Habla claro y a ritmo moderado
- ✅ Sonríe (estás orgulloso de tu trabajo)

### Manejo de la Presentación
- ✅ Practica antes en tu PC
- ✅ Ten notas, pero no las leas
- ✅ Conoce los ejemplos de memoria
- ✅ Sé honesto si algo no sale perfecto ("Es un bug conocido...")

### Dominio Técnico
- ✅ Entiende TODOS los números que ves
- ✅ Puedes explicar qué hace cada botón
- ✅ Sabes por qué se usa Vite/React
- ✅ Puedes cambiar parámetros sobre la marcha

### Gestión del Tiempo
- ✅ Practica todo el discurso con cronómetro
- ✅ Sé flexible si el profesor interrumpe
- ✅ Ten ejemplos "rápidos" por si falta tiempo
- ✅ Resuelve preguntas rápidamente sin desviarte

---

## 🚨 Problemas Potenciales y Soluciones

| Problema | Solución |
|----------|----------|
| El gráfico se ve vacío | Recarga la página, verifica intervalos |
| Expresión inválida | Comprueba sintaxis, usa paréntesis |
| Servidor lento | Reinicia con `npm run dev` |
| Números raros | Son errores numéricos insignificantes (< 1e-6) |
| Slider no funciona | Recarga la página |
| Servidor no inicia | Verifica Node.js, limpia cache |

---

## 💬 Frases Clave para Recordar

- "Como ven aquí en el gráfico..."
- "La tabla de coeficientes muestra..."
- "El indicador de convergencia indica..."
- "Con más armónicos, la aproximación mejora"
- "Este efecto se llama..."
- "La Serie de Fourier permite..."

---

## 🎓 Conexión Teórica

Al presentar, conecta siempre con la teoría:

- **Fórmula:** "Esta es la fórmula de la Serie de Fourier que vimos en clase"
- **Coeficientes:** "Estos aₙ y bₙ son los coeficientes de Fourier"
- **Convergencia:** "Este es el Teorema de Convergencia de Fourier en acción"
- **Integración:** "Usamos integración numérica para calcular los coeficientes"

---

## 📝 Guion de Respaldo

Si olvidas algo, recuerda:

> "Lo que hacemos es tomar una función, calcular sus coeficientes de Fourier, y luego reconstruir la función como suma de senos y cosenos. Cuantos más términos (armónicos) usamos, mejor es la aproximación. Esta herramienta permite experimentar interactivamente con este concepto."

---

## ✨ Extra: Impresiona al Profesor

Si tienes tiempo extra, muestras:

1. **Cambio de función en tiempo real**: "Ahora cambio a una función diferente..."
2. **Comparación lado a lado**: Muestra N=5 vs N=50
3. **Tabla de Dirichlet**: "Aquí evaluamos en puntos específicos..."
4. **Fórmula LaTeX**: "Aquí está la representación matemática completa..."

---

## 🎯 Objetivo Final

Tu presentación debe dejar claro:

✅ Entiendes el concepto matemático  
✅ La aplicación funciona correctamente  
✅ Puedes explicar componentes clave  
✅ El código está bien estructurado  
✅ Experimentaste interactivamente  

Si logras esto en 10 minutos, ¡obtendrás un excelente resultado!

---

**¡Buena suerte en tu presentación! 🚀**
