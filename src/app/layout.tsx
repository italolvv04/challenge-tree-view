'use client'

import './globals.css'
import { Sidebar } from './_components/Sidebar'
import { CompanyProvider } from '@/contexts/companyContext'
import { metadata } from '@/metadata'
import { SensorProvider } from '@/contexts/sensorContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{String(metadata.title)}</title>
      </head>
      <body>
        <CompanyProvider>
          <SensorProvider>
            <Sidebar />
            {children}
          </SensorProvider>
        </CompanyProvider>
      </body>
    </html>
  )
}
