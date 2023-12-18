import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@trigam/css/globals.css'

import PageWrapper from '@trigam/components/layout/PageWrapper'

const mainFont = Poppins({ preload: true, weight: [ '500', '600' ], style: 'normal', subsets: ['latin'], variable: '--font' })

export const metadata: Metadata = {
    title: 'Trigam',
    description: 'Artist, Programmer, and Professional Procrastinator',
    keywords: 'trigam, trigamdev, trigamyt, tstan2004, trigam discord, trigam youtube, trigam twitter, trigam art, trigam botnet'
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={mainFont.className}>
                <PageWrapper>
                    <div>{children}</div>
                </PageWrapper>
            </body>
        </html>
    )
}
