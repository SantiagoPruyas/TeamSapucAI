import { Archivo, Libre_Franklin } from 'next/font/google';

export const fontDisplay = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['wdth'],
});

export const fontBody = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
