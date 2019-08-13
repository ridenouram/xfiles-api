const app = require('./lib/app');

const PORT = 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}`);
});
