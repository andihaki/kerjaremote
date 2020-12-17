import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="shortcut icon"
            href={require('public/favicon.ico')}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={require('public/logo.svg')}
          />
        </Head>
        <body className="text-gray-800 antialiased">
          <div id="page-transition" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
