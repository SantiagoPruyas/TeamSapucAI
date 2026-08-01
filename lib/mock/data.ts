import { Departamento, Interes, Propuesta, Sapucai, Respuesta, Notificacion, Argumento } from '../types';

export const departamentos: Departamento[] = [
  {
    "id": "d1",
    "nombre": "Capital"
  },
  {
    "id": "d2",
    "nombre": "Goya"
  },
  {
    "id": "d3",
    "nombre": "Santo Tomé"
  },
  {
    "id": "d4",
    "nombre": "Paso de los Libres"
  },
  {
    "id": "d5",
    "nombre": "Curuzú Cuatiá"
  },
  {
    "id": "d6",
    "nombre": "Mercedes"
  },
  {
    "id": "d7",
    "nombre": "Bella Vista"
  },
  {
    "id": "d8",
    "nombre": "Monte Caseros"
  },
  {
    "id": "d9",
    "nombre": "Esquina"
  },
  {
    "id": "d10",
    "nombre": "Ituzaingó"
  },
  {
    "id": "d11",
    "nombre": "Empedrado"
  },
  {
    "id": "d12",
    "nombre": "Saladas"
  },
  {
    "id": "d13",
    "nombre": "San Roque"
  },
  {
    "id": "d14",
    "nombre": "General Paz"
  },
  {
    "id": "d15",
    "nombre": "San Luis del Palmar"
  },
  {
    "id": "d16",
    "nombre": "Concepción"
  },
  {
    "id": "d17",
    "nombre": "San Miguel"
  },
  {
    "id": "d18",
    "nombre": "Mburucuyá"
  },
  {
    "id": "d19",
    "nombre": "Lavalle"
  },
  {
    "id": "d20",
    "nombre": "San Martín"
  },
  {
    "id": "d21",
    "nombre": "Sauce"
  },
  {
    "id": "d22",
    "nombre": "Berón de Astrada"
  },
  {
    "id": "d23",
    "nombre": "Itatí"
  },
  {
    "id": "d24",
    "nombre": "General Alvear"
  },
  {
    "id": "d25",
    "nombre": "San Cosme"
  }
];
export const intereses: Interes[] = [
  {
    "id": "i01",
    "slug": "salud",
    "nombre": "Salud",
    "icono": "heart"
  },
  {
    "id": "i02",
    "slug": "educacion",
    "nombre": "Educación",
    "icono": "book"
  },
  {
    "id": "i03",
    "slug": "seguridad",
    "nombre": "Seguridad",
    "icono": "shield"
  },
  {
    "id": "i04",
    "slug": "trabajo",
    "nombre": "Trabajo",
    "icono": "briefcase"
  },
  {
    "id": "i05",
    "slug": "obras",
    "nombre": "Obras Públicas",
    "icono": "hammer"
  },
  {
    "id": "i06",
    "slug": "campo",
    "nombre": "Campo y Producción",
    "icono": "tractor"
  },
  {
    "id": "i07",
    "slug": "ambiente",
    "nombre": "Ambiente",
    "icono": "leaf"
  },
  {
    "id": "i08",
    "slug": "transporte",
    "nombre": "Transporte",
    "icono": "bus"
  },
  {
    "id": "i09",
    "slug": "cultura",
    "nombre": "Cultura",
    "icono": "palette"
  },
  {
    "id": "i10",
    "slug": "ninez",
    "nombre": "Niñez y Familia",
    "icono": "users"
  }
];
export const propuestas: Propuesta[] = [
  {
    "id": "p01",
    "titulo": "Ley de Promoción de la Apicultura Provincial",
    "textoOriginal": "Que por el presente proyecto de ley se busca fomentar el desarrollo de la apicultura...",
    "resumenIa": null,
    "estado": "procesando",
    "autorDiputado": {
      "id": "dip01",
      "nombre": "Juan G.",
      "bloque": "Unión por Corrientes"
    },
    "intereses": [
      "i06",
      "i07"
    ],
    "publicadaAt": null,
    "totalSapucais": 0,
    "termometro": {
      "aFavor": 0,
      "enContra": 0,
      "neutro": 0
    },
    "tieneRespuesta": false
  },
  {
    "id": "p02",
    "titulo": "Proyecto de ley integral para la refuncionalización, modernización y puesta en valor de todos los hospitales públicos departamentales de Corrientes",
    "textoOriginal": "La presente ley tiene como objeto destinar fondos especiales para la puesta en valor...",
    "resumenIa": "Plan para modernizar y mejorar los hospitales públicos en todos los departamentos de la provincia.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip02",
      "nombre": "María S.",
      "bloque": "Eco + Vamos"
    },
    "intereses": [
      "i01",
      "i05"
    ],
    "publicadaAt": "2026-07-20T10:00:00Z",
    "totalSapucais": 1847,
    "termometro": {
      "aFavor": 1773,
      "enContra": 37,
      "neutro": 37
    },
    "tieneRespuesta": true
  },
  {
    "id": "p03",
    "titulo": "Ley de Pirotecnia",
    "textoOriginal": "Prohíbase el uso y comercialización de pirotecnia sonora en toda la provincia...",
    "resumenIa": "Busca prohibir la venta y uso de pirotecnia ruidosa para proteger a animales y personas sensibles.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip03",
      "nombre": "Carlos M.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i03",
      "i07",
      "i10"
    ],
    "publicadaAt": "2026-07-22T14:30:00Z",
    "totalSapucais": 150,
    "termometro": {
      "aFavor": 144,
      "enContra": 3,
      "neutro": 3
    },
    "tieneRespuesta": false
  },
  {
    "id": "p04",
    "titulo": "Modificación del Régimen de Transporte Escolar",
    "textoOriginal": "Establécese un nuevo régimen tarifario y de subsidios para el transporte escolar rural...",
    "resumenIa": "Nuevos subsidios para mejorar el transporte de estudiantes en zonas rurales.",
    "estado": "cerrada",
    "autorDiputado": {
      "id": "dip01",
      "nombre": "Juan G.",
      "bloque": "Unión por Corrientes"
    },
    "intereses": [
      "i02",
      "i08"
    ],
    "publicadaAt": "2026-06-15T09:00:00Z",
    "totalSapucais": 450,
    "termometro": {
      "aFavor": 153,
      "enContra": 149,
      "neutro": 148
    },
    "tieneRespuesta": true
  },
  {
    "id": "p05",
    "titulo": "Declaración de Interés de la Fiesta del Surubí",
    "textoOriginal": "Declárase de interés turístico y cultural la Fiesta Nacional del Surubí...",
    "resumenIa": "Declaración oficial para apoyar la tradicional fiesta de Goya.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip04",
      "nombre": "Pedro L.",
      "bloque": "Frente Litoral"
    },
    "intereses": [
      "i09"
    ],
    "publicadaAt": "2026-07-30T11:00:00Z",
    "totalSapucais": 0,
    "termometro": {
      "aFavor": 0,
      "enContra": 0,
      "neutro": 0
    },
    "tieneRespuesta": false
  },
  {
    "id": "p06",
    "titulo": "Proyecto de Desarrollo Territorial 6",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 50,
    "termometro": {
      "aFavor": 28,
      "enContra": 11,
      "neutro": 11
    },
    "tieneRespuesta": false
  },
  {
    "id": "p07",
    "titulo": "Proyecto de Desarrollo Territorial 7",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 55,
    "termometro": {
      "aFavor": 31,
      "enContra": 12,
      "neutro": 12
    },
    "tieneRespuesta": false
  },
  {
    "id": "p08",
    "titulo": "Proyecto de Desarrollo Territorial 8",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 60,
    "termometro": {
      "aFavor": 34,
      "enContra": 13,
      "neutro": 13
    },
    "tieneRespuesta": false
  },
  {
    "id": "p09",
    "titulo": "Proyecto de Desarrollo Territorial 9",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 65,
    "termometro": {
      "aFavor": 37,
      "enContra": 14,
      "neutro": 14
    },
    "tieneRespuesta": false
  },
  {
    "id": "p10",
    "titulo": "Proyecto de Desarrollo Territorial 10",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 70,
    "termometro": {
      "aFavor": 40,
      "enContra": 15,
      "neutro": 15
    },
    "tieneRespuesta": true
  },
  {
    "id": "p11",
    "titulo": "Proyecto de Desarrollo Territorial 11",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 75,
    "termometro": {
      "aFavor": 43,
      "enContra": 16,
      "neutro": 16
    },
    "tieneRespuesta": false
  },
  {
    "id": "p12",
    "titulo": "Proyecto de Desarrollo Territorial 12",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 80,
    "termometro": {
      "aFavor": 46,
      "enContra": 17,
      "neutro": 17
    },
    "tieneRespuesta": false
  },
  {
    "id": "p13",
    "titulo": "Proyecto de Desarrollo Territorial 13",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 85,
    "termometro": {
      "aFavor": 49,
      "enContra": 18,
      "neutro": 18
    },
    "tieneRespuesta": false
  },
  {
    "id": "p14",
    "titulo": "Proyecto de Desarrollo Territorial 14",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 90,
    "termometro": {
      "aFavor": 52,
      "enContra": 19,
      "neutro": 19
    },
    "tieneRespuesta": false
  },
  {
    "id": "p15",
    "titulo": "Proyecto de Desarrollo Territorial 15",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 95,
    "termometro": {
      "aFavor": 55,
      "enContra": 20,
      "neutro": 20
    },
    "tieneRespuesta": true
  },
  {
    "id": "p16",
    "titulo": "Proyecto de Desarrollo Territorial 16",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 100,
    "termometro": {
      "aFavor": 58,
      "enContra": 21,
      "neutro": 21
    },
    "tieneRespuesta": false
  },
  {
    "id": "p17",
    "titulo": "Proyecto de Desarrollo Territorial 17",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 105,
    "termometro": {
      "aFavor": 61,
      "enContra": 22,
      "neutro": 22
    },
    "tieneRespuesta": false
  },
  {
    "id": "p18",
    "titulo": "Proyecto de Desarrollo Territorial 18",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 110,
    "termometro": {
      "aFavor": 64,
      "enContra": 23,
      "neutro": 23
    },
    "tieneRespuesta": false
  },
  {
    "id": "p19",
    "titulo": "Proyecto de Desarrollo Territorial 19",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 115,
    "termometro": {
      "aFavor": 67,
      "enContra": 24,
      "neutro": 24
    },
    "tieneRespuesta": false
  },
  {
    "id": "p20",
    "titulo": "Proyecto de Desarrollo Territorial 20",
    "textoOriginal": "Establécese un plan integral de mejoras...",
    "resumenIa": "Propuesta general para el desarrollo de infraestructura y fomento.",
    "estado": "publicada",
    "autorDiputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "intereses": [
      "i05",
      "i04"
    ],
    "publicadaAt": "2026-07-25T10:00:00Z",
    "totalSapucais": 120,
    "termometro": {
      "aFavor": 70,
      "enContra": 25,
      "neutro": 25
    },
    "tieneRespuesta": true
  }
];
export const sapucais: Sapucai[] = [
  {
    "id": "s01",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Goya"
    },
    "audioUrl": "https://fakeaudio.com/a1.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "pendiente",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s02",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Santo Tomé"
    },
    "audioUrl": "https://fakeaudio.com/a2.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "pendiente",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s03",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Paso de los Libres"
    },
    "audioUrl": "https://fakeaudio.com/a3.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "pendiente",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s04",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Curuzú Cuatiá"
    },
    "audioUrl": "https://fakeaudio.com/a4.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "pendiente",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s05",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Mercedes"
    },
    "audioUrl": "https://fakeaudio.com/a5.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "pendiente",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s06",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Bella Vista"
    },
    "audioUrl": "https://fakeaudio.com/a6.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "pendiente",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s07",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Monte Caseros"
    },
    "audioUrl": "https://fakeaudio.com/a7.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "error",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s08",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Esquina"
    },
    "audioUrl": "https://fakeaudio.com/a8.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "error",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s09",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Ituzaingó"
    },
    "audioUrl": "https://fakeaudio.com/a9.webm",
    "duracionSeg": 15,
    "transcripcion": null,
    "postura": null,
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "error",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s10",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Empedrado"
    },
    "audioUrl": "https://fakeaudio.com/a10.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": null,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s11",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Saladas"
    },
    "audioUrl": "https://fakeaudio.com/a11.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": null,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s12",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "San Roque"
    },
    "audioUrl": "https://fakeaudio.com/a12.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": null,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s13",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "General Paz"
    },
    "audioUrl": "https://fakeaudio.com/a13.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": null,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s14",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "San Luis del Palmar"
    },
    "audioUrl": "https://fakeaudio.com/a14.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": false,
    "moderacionMotivo": "Lenguaje inapropiado detectado",
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s15",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Concepción"
    },
    "audioUrl": "https://fakeaudio.com/a15.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": false,
    "moderacionMotivo": "Lenguaje inapropiado detectado",
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s16",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "San Miguel"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s17",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Mburucuyá"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s18",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Lavalle"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s19",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "San Martín"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s20",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Sauce"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s21",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Berón de Astrada"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s22",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Itatí"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s23",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "General Alvear"
    },
    "audioUrl": null,
    "duracionSeg": null,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s24",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "San Cosme"
    },
    "audioUrl": "https://fakeaudio.com/a24.webm",
    "duracionSeg": 15,
    "transcripcion": "Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo. Es crucial que consideremos los impactos profundos de esta normativa en nuestras comunidades, porque afecta el tejido productivo.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s25",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Capital"
    },
    "audioUrl": "https://fakeaudio.com/a25.webm",
    "duracionSeg": 15,
    "transcripcion": "No me gusta.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s26",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Goya"
    },
    "audioUrl": "https://fakeaudio.com/a26.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s27",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Santo Tomé"
    },
    "audioUrl": "https://fakeaudio.com/a27.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s28",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Paso de los Libres"
    },
    "audioUrl": "https://fakeaudio.com/a28.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s29",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Curuzú Cuatiá"
    },
    "audioUrl": "https://fakeaudio.com/a29.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s30",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Mercedes"
    },
    "audioUrl": "https://fakeaudio.com/a30.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s31",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Bella Vista"
    },
    "audioUrl": "https://fakeaudio.com/a31.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s32",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Monte Caseros"
    },
    "audioUrl": "https://fakeaudio.com/a32.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s33",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Esquina"
    },
    "audioUrl": "https://fakeaudio.com/a33.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s34",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Ituzaingó"
    },
    "audioUrl": "https://fakeaudio.com/a34.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s35",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Empedrado"
    },
    "audioUrl": "https://fakeaudio.com/a35.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s36",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Saladas"
    },
    "audioUrl": "https://fakeaudio.com/a36.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s37",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "San Roque"
    },
    "audioUrl": "https://fakeaudio.com/a37.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s38",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "General Paz"
    },
    "audioUrl": "https://fakeaudio.com/a38.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s39",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "San Luis del Palmar"
    },
    "audioUrl": "https://fakeaudio.com/a39.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s40",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Concepción"
    },
    "audioUrl": "https://fakeaudio.com/a40.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s41",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "San Miguel"
    },
    "audioUrl": "https://fakeaudio.com/a41.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s42",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Mburucuyá"
    },
    "audioUrl": "https://fakeaudio.com/a42.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s43",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Lavalle"
    },
    "audioUrl": "https://fakeaudio.com/a43.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s44",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "San Martín"
    },
    "audioUrl": "https://fakeaudio.com/a44.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s45",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Sauce"
    },
    "audioUrl": "https://fakeaudio.com/a45.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s46",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Berón de Astrada"
    },
    "audioUrl": "https://fakeaudio.com/a46.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s47",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Itatí"
    },
    "audioUrl": "https://fakeaudio.com/a47.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s48",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "General Alvear"
    },
    "audioUrl": "https://fakeaudio.com/a48.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s49",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "San Cosme"
    },
    "audioUrl": "https://fakeaudio.com/a49.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s50",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Capital"
    },
    "audioUrl": "https://fakeaudio.com/a50.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s51",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Goya"
    },
    "audioUrl": "https://fakeaudio.com/a51.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s52",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Santo Tomé"
    },
    "audioUrl": "https://fakeaudio.com/a52.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s53",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Paso de los Libres"
    },
    "audioUrl": "https://fakeaudio.com/a53.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s54",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Curuzú Cuatiá"
    },
    "audioUrl": "https://fakeaudio.com/a54.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s55",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Mercedes"
    },
    "audioUrl": "https://fakeaudio.com/a55.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s56",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Bella Vista"
    },
    "audioUrl": "https://fakeaudio.com/a56.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s57",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Mariana V.",
      "departamento": "Monte Caseros"
    },
    "audioUrl": "https://fakeaudio.com/a57.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s58",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Josefa R.",
      "departamento": "Esquina"
    },
    "audioUrl": "https://fakeaudio.com/a58.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "en_contra",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s59",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Roberto T.",
      "departamento": "Ituzaingó"
    },
    "audioUrl": "https://fakeaudio.com/a59.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "neutro",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  },
  {
    "id": "s60",
    "propuestaId": "p02",
    "autor": {
      "nombre": "Luis C.",
      "departamento": "Empedrado"
    },
    "audioUrl": "https://fakeaudio.com/a60.webm",
    "duracionSeg": 15,
    "transcripcion": "Este es mi sapucai sobre esta ley. Creo que es importante porque nos afecta a todos en el día a día.",
    "postura": "a_favor",
    "moderacionOk": true,
    "moderacionMotivo": null,
    "estadoProcesamiento": "listo",
    "createdAt": "2026-07-21T09:00:00Z"
  }
];
export const respuestas: Respuesta[] = [
  {
    "id": "r01",
    "propuestaId": "p02",
    "diputado": {
      "id": "dip02",
      "nombre": "María S.",
      "bloque": "Eco + Vamos"
    },
    "texto": "Muchas gracias por todos sus sapucais. He leído cada uno de ellos y coincido en que la refuncionalización debe hacerse con transparencia.\n\nEn la próxima sesión incluiré las modificaciones que sugirieron sobre el acceso a ambulancias.\n\nSeguimos trabajando juntos por una salud mejor en Corrientes.",
    "audioUrl": null,
    "createdAt": "2026-07-28T16:00:00Z"
  },
  {
    "id": "r02",
    "propuestaId": "p04",
    "diputado": {
      "id": "dip01",
      "nombre": "Juan G.",
      "bloque": "Unión por Corrientes"
    },
    "texto": "Tomamos nota de sus observaciones. Gracias por participar.",
    "audioUrl": null,
    "createdAt": "2026-07-29T10:00:00Z"
  },
  {
    "id": "r03",
    "propuestaId": "p10",
    "diputado": {
      "id": "dip05",
      "nombre": "Ana P.",
      "bloque": "Bloque Libre"
    },
    "texto": "Estamos analizando la viabilidad presupuestaria con el equipo económico.",
    "audioUrl": null,
    "createdAt": "2026-07-30T10:00:00Z"
  }
];
export const notificaciones: Notificacion[] = [
  {
    "id": "n1",
    "tipo": "respuesta_diputado",
    "propuestaId": "p02",
    "propuestaTitulo": "Título de propuesta",
    "leida": false,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n2",
    "tipo": "respuesta_diputado",
    "propuestaId": "p03",
    "propuestaTitulo": "Título de propuesta",
    "leida": false,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n3",
    "tipo": "respuesta_diputado",
    "propuestaId": "p04",
    "propuestaTitulo": "Título de propuesta",
    "leida": false,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n4",
    "tipo": "nueva_propuesta",
    "propuestaId": "p05",
    "propuestaTitulo": "Título de propuesta",
    "leida": false,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n5",
    "tipo": "nueva_propuesta",
    "propuestaId": "p01",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n6",
    "tipo": "nueva_propuesta",
    "propuestaId": "p02",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n7",
    "tipo": "nueva_propuesta",
    "propuestaId": "p03",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n8",
    "tipo": "nueva_propuesta",
    "propuestaId": "p04",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n9",
    "tipo": "nueva_propuesta",
    "propuestaId": "p05",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n10",
    "tipo": "nueva_propuesta",
    "propuestaId": "p01",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n11",
    "tipo": "nueva_propuesta",
    "propuestaId": "p02",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  },
  {
    "id": "n12",
    "tipo": "nueva_propuesta",
    "propuestaId": "p03",
    "propuestaTitulo": "Título de propuesta",
    "leida": true,
    "createdAt": "2026-08-01T08:00:00Z"
  }
];
export const argumentos: Argumento[] = [
  {
    "texto": "Mejora el acceso a la salud pública en el interior",
    "personas": 450,
    "postura": "a_favor"
  },
  {
    "texto": "Falta claridad en la asignación de presupuesto",
    "personas": 120,
    "postura": "en_contra"
  },
  {
    "texto": "Es necesario garantizar el personal médico además de la infraestructura",
    "personas": 85,
    "postura": "neutro"
  }
];
