#!/bin/sh
# Genera www/index.html (versión app) a partir de game.html
cd "$(dirname "$0")"
{ echo '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);box-sizing:border-box}body{margin:0}[hidden]{display:none!important}</style><link rel="stylesheet" href="fonts/fonts.css">'
  sed -n '1,/^<\/style>/p' game.html | grep -v 'fonts.g'
  echo '</head><body>'
  sed -n '/^<\/style>/,$p' game.html | tail -n +2
  echo '</body></html>'; } > www/index.html
