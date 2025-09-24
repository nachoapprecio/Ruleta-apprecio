import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ruleta Apprecio',
  description: 'La oportunidad de ganar puntos ¡está aquí! Juega con la Ruleta apprecio y Gana!',
  keywords: 'ruleta, apprecio, juego, sorteo, spinning wheel, puntos, ganar',
  authors: [{ name: 'Apprecio' }],
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
}