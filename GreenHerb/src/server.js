const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('==============================================');
  console.log(`            Welcome to GREENHERB`);
  console.log(`          Status: Ativa e a correr`);
  console.log(`        URL: http://localhost:${PORT}`);
  console.log('==============================================');
  console.log('Pressione CTRL+C para parar o servidor.');
});