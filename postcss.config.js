// подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [ // подключите плагины к PostCSS
    autoprefixer, // подключите autoprefixer
    cssnano({ preset: 'default' })// cssnano при подключении нужно передать объект опций, { preset: default } говорит о том, что нужно использовать стандартные настройки минификации
  ],
}; 