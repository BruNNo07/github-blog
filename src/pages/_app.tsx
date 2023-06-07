import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import cabecalho from '../assets/cabecalho.svg'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <header className=''>
      <Image src={cabecalho} alt='' className='w-full h-auto'/>
    </header>
    <Component {...pageProps} />
  </>
  )
}
