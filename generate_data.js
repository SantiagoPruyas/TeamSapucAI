const fs = require('fs');

const departamentos = [
  'Capital', 'Goya', 'Santo Tomé', 'Paso de los Libres', 'Curuzú Cuatiá',
  'Mercedes', 'Bella Vista', 'Monte Caseros', 'Esquina', 'Ituzaingó',
  'Empedrado', 'Saladas', 'San Roque', 'General Paz', 'San Luis del Palmar',
  'Concepción', 'San Miguel', 'Mburucuyá', 'Lavalle', 'San Martín',
  'Sauce', 'Berón de Astrada', 'Itatí', 'General Alvear', 'San Cosme'
].map((nombre, i) => ({ id: `d${i+1}`, nombre }));

const intereses = [
  { id: 'i01', slug: 'salud', nombre: 'Salud', icono: 'heart' },
  { id: 'i02', slug: 'educacion', nombre: 'Educación', icono: 'book' },
  { id: 'i03', slug: 'seguridad', nombre: 'Seguridad', icono: 'shield' },
  { id: 'i04', slug: 'trabajo', nombre: 'Trabajo', icono: 'briefcase' },
  { id: 'i05', slug: 'obras', nombre: 'Obras Públicas', icono: 'hammer' },
  { id: 'i06', slug: 'campo', nombre: 'Campo y Producción', icono: 'tractor' },
  { id: 'i07', slug: 'ambiente', nombre: 'Ambiente', icono: 'leaf' },
  { id: 'i08', slug: 'transporte', nombre: 'Transporte', icono: 'bus' },
  { id: 'i09', slug: 'cultura', nombre: 'Cultura', icono: 'palette' },
  { id: 'i10', slug: 'ninez', nombre: 'Niñez y Familia', icono: 'users' }
];

const propuestas = [
  {
    id: 'p01',
    titulo: 'Ley de Promoción de la Apicultura Provincial',
    textoOriginal: 'Que por el presente proyecto de ley se busca fomentar el desarrollo de la apicultura...',
    resumenIa: null,
    estado: 'procesando',
    autorDiputado: { id: 'dip01', nombre: 'Juan G.', bloque: 'Unión por Corrientes' },
    intereses: ['i06', 'i07'],
    publicadaAt: null,
    totalSapucais: 0,
    termometro: { aFavor: 0, enContra: 0, neutro: 0 },
    tieneRespuesta: false
  },
  {
    id: 'p02',
    titulo: 'Proyecto de ley integral para la refuncionalización, modernización y puesta en valor de todos los hospitales públicos departamentales de Corrientes',
    textoOriginal: 'La presente ley tiene como objeto destinar fondos especiales para la puesta en valor...',
    resumenIa: 'Plan para modernizar y mejorar los hospitales públicos en todos los departamentos de la provincia.',
    estado: 'publicada',
    autorDiputado: { id: 'dip02', nombre: 'María S.', bloque: 'Eco + Vamos' },
    intereses: ['i01', 'i05'],
    publicadaAt: '2026-07-20T10:00:00Z',
    totalSapucais: 1847,
    termometro: { aFavor: 1773, enContra: 37, neutro: 37 },
    tieneRespuesta: true
  },
  {
    id: 'p03',
    titulo: 'Ley de Pirotecnia',
    textoOriginal: 'Prohíbase el uso y comercialización de pirotecnia sonora en toda la provincia...',
    resumenIa: 'Busca prohibir la venta y uso de pirotecnia ruidosa para proteger a animales y personas sensibles.',
    estado: 'publicada',
    autorDiputado: { id: 'dip03', nombre: 'Carlos M.', bloque: 'Bloque Libre' },
    intereses: ['i03', 'i07', 'i10'],
    publicadaAt: '2026-07-22T14:30:00Z',
    totalSapucais: 150,
    termometro: { aFavor: 144, enContra: 3, neutro: 3 },
    tieneRespuesta: false
  },
  {
    id: 'p04',
    titulo: 'Modificación del Régimen de Transporte Escolar',
    textoOriginal: 'Establécese un nuevo régimen tarifario y de subsidios para el transporte escolar rural...',
    resumenIa: 'Nuevos subsidios para mejorar el transporte de estudiantes en zonas rurales.',
    estado: 'cerrada',
    autorDiputado: { id: 'dip01', nombre: 'Juan G.', bloque: 'Unión por Corrientes' },
    intereses: ['i02', 'i08'],
    publicadaAt: '2026-06-15T09:00:00Z',
    totalSapucais: 450,
    termometro: { aFavor: 153, enContra: 149, neutro: 148 },
    tieneRespuesta: true
  },
  {
    id: 'p05',
    titulo: 'Declaración de Interés de la Fiesta del Surubí',
    textoOriginal: 'Declárase de interés turístico y cultural la Fiesta Nacional del Surubí...',
    resumenIa: 'Declaración oficial para apoyar la tradicional fiesta de Goya.',
    estado: 'publicada',
    autorDiputado: { id: 'dip04', nombre: 'Pedro L.', bloque: 'Frente Litoral' },
    intereses: ['i09'],
    publicadaAt: '2026-07-30T11:00:00Z',
    totalSapucais: 0,
    termometro: { aFavor: 0, enContra: 0, neutro: 0 },
    tieneRespuesta: false
  }
];

// Add 15 generic propuestas
for (let i = 6; i <= 20; i++) {
  propuestas.push({
    id: `p${i.toString().padStart(2, '0')}`,
    titulo: `Proyecto de Desarrollo Territorial ${i}`,
    textoOriginal: 'Establécese un plan integral de mejoras...',
    resumenIa: 'Propuesta general para el desarrollo de infraestructura y fomento.',
    estado: 'publicada',
    autorDiputado: { id: 'dip05', nombre: 'Ana P.', bloque: 'Bloque Libre' },
    intereses: ['i05', 'i04'],
    publicadaAt: '2026-07-25T10:00:00Z',
    totalSapucais: 20 + i * 5,
    termometro: { aFavor: 10 + i * 3, enContra: 5 + i, neutro: 5 + i },
    tieneRespuesta: (i % 5 === 0)
  });
}

const sapucais = [];
const posturas = ['a_favor', 'en_contra', 'neutro'];
const estados = ['pendiente', 'listo', 'error'];
const nombres = ['Luis C.', 'Mariana V.', 'Josefa R.', 'Roberto T.'];

for (let i = 1; i <= 60; i++) {
  let modOk = true;
  let modMotivo = null;
  let audio = `https://fakeaudio.com/a${i}.webm`;
  let duracion = 15;
  let transcripcion = 'Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.';
  let estado = 'listo';
  
  if (i <= 6) estado = 'pendiente';
  if (i > 6 && i <= 9) estado = 'error';
  if (i >= 10 && i <= 13) modOk = null;
  if (i >= 14 && i <= 15) {
    modOk = false;
    modMotivo = 'Lenguaje inapropiado detectado';
  }
  if (i >= 16 && i <= 23) {
    audio = null;
    duracion = null;
  }
  
  if (i === 24) {
    transcripcion = Array(50).fill('Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo.').join(' ');
  }
  if (i === 25) {
    transcripcion = 'No me gusta.';
  }

  if (estado !== 'listo') transcripcion = null;

  sapucais.push({
    id: `s${i.toString().padStart(2, '0')}`,
    propuestaId: 'p02',
    autor: { nombre: nombres[i % 4], departamento: departamentos[i % 25].nombre },
    audioUrl: audio,
    duracionSeg: duracion,
    transcripcion,
    postura: estado === 'listo' ? posturas[i % 3] : null,
    moderacionOk: modOk,
    moderacionMotivo: modMotivo,
    estadoProcesamiento: estado,
    createdAt: '2026-07-21T09:00:00Z'
  });
}

const respuestas = [
  {
    id: 'r01',
    propuestaId: 'p02',
    diputado: { id: 'dip02', nombre: 'María S.', bloque: 'Eco + Vamos' },
    texto: 'Muchas gracias por todos sus sapucais. He leído cada uno de ellos y coincido en que la refuncionalización debe hacerse con transparencia.\n\nEn la próxima sesión incluiré las modificaciones que sugirieron sobre el acceso a ambulancias.\n\nSeguimos trabajando juntos por una salud mejor en Corrientes.',
    audioUrl: null,
    createdAt: '2026-07-28T16:00:00Z'
  },
  {
    id: 'r02',
    propuestaId: 'p04',
    diputado: { id: 'dip01', nombre: 'Juan G.', bloque: 'Unión por Corrientes' },
    texto: 'Tomamos nota de sus observaciones. Gracias por participar.',
    audioUrl: null,
    createdAt: '2026-07-29T10:00:00Z'
  },
  {
    id: 'r03',
    propuestaId: 'p10',
    diputado: { id: 'dip05', nombre: 'Ana P.', bloque: 'Bloque Libre' },
    texto: 'Estamos analizando la viabilidad presupuestaria con el equipo económico.',
    audioUrl: null,
    createdAt: '2026-07-30T10:00:00Z'
  }
];

const notificaciones = [];
for (let i = 1; i <= 12; i++) {
  notificaciones.push({
    id: `n${i}`,
    tipo: i <= 3 ? 'respuesta_diputado' : 'nueva_propuesta',
    propuestaId: `p0${(i % 5) + 1}`,
    propuestaTitulo: 'Título de propuesta',
    leida: i > 4,
    createdAt: '2026-08-01T08:00:00Z'
  });
}

const argumentos = [
  { texto: 'Mejora el acceso a la salud pública en el interior', personas: 450, postura: 'a_favor' },
  { texto: 'Falta claridad en la asignación de presupuesto', personas: 120, postura: 'en_contra' },
  { texto: 'Es necesario garantizar el personal médico además de la infraestructura', personas: 85, postura: 'neutro' }
];

const content = `import { Departamento, Interes, Propuesta, Sapucai, Respuesta, Notificacion, Argumento } from '../types';

export const departamentos: Departamento[] = ${JSON.stringify(departamentos, null, 2)};
export const intereses: Interes[] = ${JSON.stringify(intereses, null, 2)};
export const propuestas: Propuesta[] = ${JSON.stringify(propuestas, null, 2)};
export const sapucais: Sapucai[] = ${JSON.stringify(sapucais, null, 2)};
export const respuestas: Respuesta[] = ${JSON.stringify(respuestas, null, 2)};
export const notificaciones: Notificacion[] = ${JSON.stringify(notificaciones, null, 2)};
export const argumentos: Argumento[] = ${JSON.stringify(argumentos, null, 2)};
`;

fs.writeFileSync('lib/mock/data.ts', content);
console.log('data.ts generated');
