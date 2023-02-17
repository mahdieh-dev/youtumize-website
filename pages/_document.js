import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Youtumize" key="title"/>
        <meta property="og:description" content="level-up your Youtube channel" key="description"/>
        <meta
          property="og:image"
          content="<%= require('../assets/logo.png') %>"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
