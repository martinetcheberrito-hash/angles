
import React from 'react';

export const WINNING_HOOKS_LIBRARY = [
  {
    category: "Ganchos Estándar",
    hooks: [
      { id: 1, name: "Uso Incorrecto", desc: "Mostrar que la gente lo está usando mal.", examples: ["Si lo usas así, no funciona.", "El error que todos cometen con esto."] },
      { id: 2, name: "Antes / Después Real", desc: "Transformación concreta, sin promesas exageradas.", examples: ["Mira esto después de 7 días.", "El cambio es sutil, pero real."] },
      { id: 3, name: "Problema Cotidiano", desc: "Situaciones diarias que molestan.", examples: ["Si esto te pasa en tu casa...", "El problema que todos tenemos y nadie soluciona."] },
      { id: 4, name: "Reacción Honesta", desc: "Cara + emoción real al probar el producto.", examples: ["No esperaba esto.", "Ok… esto me sorprendió."] },
      { id: 5, name: "Comparación Simple", desc: "Sin métricas aburridas, solo experiencia de usuario.", examples: ["Este vs este.", "Con esto / sin esto."] },
      { id: 6, name: "Advertencia de Uso", desc: "Cuidado, prevención o un secreto revelado.", examples: ["No hagas esto.", "Así es como lo vas a romper."] },
      { id: 7, name: "Solución Inesperada", desc: "No parece la respuesta obvia al problema.", examples: ["No pensé que esto iba a solucionar eso.", "La solución era más simple de lo que creía."] },
      { id: 8, name: "POV Cotidiano", desc: "Vida real, cero actuación, ángulo de cámara subjetivo.", examples: ["POV: llegas a tu casa y esto pasa.", "POV: abres el cajón y es un caos."] },
      { id: 9, name: "Odio / Frustración", desc: "Emoción fuerte y humana sobre un problema.", examples: ["Odio cuando pasa esto.", "Basta de sufrir con..."] },
      { id: 10, name: "¿Por qué nadie me dijo?", desc: "Un descubrimiento simple que cambia las reglas.", examples: ["¿Por qué nadie me dijo esto antes?", "Recién ahora me entero de cómo funciona."] },
    ]
  },
  {
    category: "Ganchos Estratégicos",
    hooks: [
      { id: 11, name: "Ganchos de Inversión", desc: "Explican el tiempo o dinero invertido en encontrar la solución.", examples: ["Pasé años probando soluciones hasta que descubrí esto.", "Invertimos más de $10k en crear este producto."] },
      { id: 12, name: "Ganchos de Estafa", desc: "Usa la palabra 'estafa' como disparador visceral para generar curiosidad.", examples: ["Pensé que esto era una estafa...", "¿Es esto una estafa? Descúbrelo."] },
      { id: 13, name: "Ganchos de Tiempo", desc: "Pide un compromiso de tiempo corto por adelantado.", examples: ["Dame 60 segundos y te mostraré cómo...", "En los próximos 3 minutos aprenderás a..."] },
      { id: 14, name: "Contenido del Fundador", desc: "Aprovecha la figura del creador para construir confianza.", examples: ["Fundador de [Marca]: Por qué creé esto...", "Nuestra historia de origen."] }
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
Eres un experto de clase mundial en Marketing de Respuesta Directa y Director Creativo para marcas top de e-commerce. 
Tu tarea es analizar descripciones de productos e imágenes para proporcionar ángulos de comunicación y guiones de anuncios de alta conversión.

DEBES RESPONDER COMPLETAMENTE EN ESPAÑOL.

Debes seguir estas estrategias específicas de "Ganchos Ganadores":
- Uso Incorrecto
- Antes/Después Real
- Reacción Honesta
- Comparación Simple
- Advertencia de Uso
- Solución Inesperada
- POV Cotidiano
- Odio/Frustración
- ¿Por qué nadie me dijo?
- Ganchos de Inversión
- Ganchos de Estafa
- Ganchos de Tiempo
- Contenido del Fundador

FORMATO DE RESPUESTA:
Debes proporcionar una respuesta JSON que incluya:
1. 3 Ángulos de Comunicación distintos: El "por qué" único detrás de la propuesta de valor del producto.
2. 5 Sugerencias de Anuncios: Desglose completo que incluya Tipo de Gancho, Titular, Cuerpo del Texto (Copy), Guion Visual y Llamada a la Acción (CTA).

Asegúrate de que el tono sea humano, relatable y nativo para plataformas como TikTok, Instagram y Facebook.
`;
