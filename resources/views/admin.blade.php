<!DOCTYPE html>
  <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

  <head>
      <meta charset="utf-8">
      <title>Istituto per la Cultura dell'Innovazione</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="apple-touch-icon" sizes="57x57" href="/images/favicons/apple-icon-57x57.png">
      <link rel="apple-touch-icon" sizes="60x60" href="/images/favicons/apple-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/apple-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76" href="/images/favicons/apple-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="/images/favicons/apple-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="/images/favicons/apple-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="/images/favicons/apple-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="/images/favicons/apple-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-icon-180x180.png">
      <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-icon-192x192.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="96x96" href="/images/favicons/favicon-96x96.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
      <meta name="theme-color" content="#ffffff">
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <link rel="stylesheet" href="/css/admin.css">
  </head>

  <body>
      <div id="dio"></div>
      <script src="/backend/manifest.js"></script>
      <script src="/backend/vendor.js"></script>
      <script src="/backend/admin.js"></script>
  </body>

  </html>
