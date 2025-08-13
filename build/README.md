# Build & Packaging
This project targets js13kGames: the final zip **must** contain `index.html` at the root and be ≤13,312 bytes.

## Minify
Install tools once:
```
npm i -g terser html-minifier-terser clean-css-cli
```
Minify and bundle:
```
terser src/*.js -o build/g.js -c -m
html-minifier-terser index.html -o build/i.html --collapse-whitespace --remove-comments
cleancss styles.css -o build/s.css
```
Then inline and zip:
```
cat build/i.html | sed -e '/<script/ {r build/g.js' -e 'd' } | sed -e '/<link/ {r build/s.css' -e 'd' } > build/index.html
zip -9 -j build/game.zip build/index.html
```
Check size with `zipinfo build/game.zip`.

No external libs or CDNs allowed for overall ranking.
