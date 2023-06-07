const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // Permet de supprimer le contenu du dist avant de générer un nouveau bundle 
    clean: true
  },
  // Permet de générer une source map pour facilité le débogage
  devtool: 'inline-source-map',
  devServer: {
    // 
    contentBase: path.join(__dirname, './dist'),
    // Permet de spécifier l'hôte et le port à utiliser
    host: '0.0.0.0',
    port: 8080,
    // Permet de spécifier si le serveru doit être accessible depuis un ordinateur distant
    disableHostCheck: true,
    /* watchOptions: permet à Webpack de surveiller les fichiers de l'application pour détecter 
    les modifications et de recompiler automatiquement le code 
    lorsque des changements sont détectés. 
    La propriété poll est définie sur true, 
    ce qui signifie que Webpack utilisera la méthode de sondage pour surveiller 
    les fichiers au lieu d'utiliser les événements du système de fichiers. 
    Cela peut être utile si vous travaillez avec un système de fichiers monté à distance, 
    car les événements du système de fichiers ne fonctionnent pas toujours correctement dans ce cas. */
    watchOptions: {
      poll: true
    }
  },
  // Permet de spécifier les plugins à utiliser
  plugins: [
    // Permet de générer un fichier HTML à partir d'un template
    new HtmlWebpackPlugin({
      title: 'Javascript Objet avec Webpack',
    })
  ],
  module: {
    // Permet de spécifier les loaders à utiliser
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js']
  },
};