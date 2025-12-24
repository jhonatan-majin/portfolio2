import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jhonatan Majin - Full Stack Developer Portfolio',
  description: 'Portfolio profesional de Jhonatan Majin, desarrollador Full Stack especializado en React, Next.js, Node.js y MongoDB. Conoce mis proyectos y experiencia.',
  keywords: ['Portfolio', 'Full Stack Developer', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Web Development'],
  authors: [{ name: 'Jhonatan Majin' }],
  creator: 'Jhonatan Majin',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'Jhonatan Majin - Full Stack Developer',
    description: 'Portfolio profesional de desarrollo web',
    siteName: 'Jhonatan Majin Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jhonatan Majin - Full Stack Developer',
    description: 'Portfolio profesional de desarrollo web',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
