// Función para evaluar la serie de Fourier reconstruida
export const evaluarSerieFourier = (x, coeficientes, L) => {
  if (!coeficientes) return NaN;

  const { a0, an, bn } = coeficientes;
  
  let resultado = a0 / 2;
  
  for (let n = 1; n < an.length; n++) {
    resultado += an[n] * Math.cos((n * Math.PI * x) / L);
    resultado += bn[n] * Math.sin((n * Math.PI * x) / L);
  }
  
  return resultado;
};

// Función para generar datos de ambas funciones (original y aproximación)
export const generarDatosComparacion = (xmin, xmax, pasos, funcionOriginal, coeficientes, L) => {
  const datos = [];
  const dx = (xmax - xmin) / pasos;

  for (let i = 0; i <= pasos; i++) {
    const x = xmin + i * dx;

    try {
      const original = funcionOriginal(x);
      const fourier = evaluarSerieFourier(x, coeficientes, L);
      
      if (!isNaN(original) && isFinite(original)) {
        datos.push({ 
          x, 
          yOriginal: original,
          yFourier: fourier
        });
      }
    } catch {}
  }

  return datos;
};

// Función para calcular error máximo entre función original y aproximación
export const calcularErrorMaximo = (datos) => {
  if (!datos || datos.length === 0) return 0;
  
  let errorMax = 0;
  for (let punto of datos) {
    if (punto.yOriginal !== undefined && punto.yFourier !== undefined) {
      const error = Math.abs(punto.yOriginal - punto.yFourier);
      errorMax = Math.max(errorMax, error);
    }
  }
  
  return errorMax;
};

// Función para calcular error promedio (RMSE)
export const calcularErrorPromedio = (datos) => {
  if (!datos || datos.length === 0) return 0;
  
  let sumErrores = 0;
  let count = 0;
  
  for (let punto of datos) {
    if (punto.yOriginal !== undefined && punto.yFourier !== undefined) {
      const error = Math.pow(punto.yOriginal - punto.yFourier, 2);
      sumErrores += error;
      count++;
    }
  }
  
  return Math.sqrt(sumErrores / count);
};
