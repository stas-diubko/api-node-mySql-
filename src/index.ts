import app from './app';
import CONFIG from './config/config';
import './config/db';

const db = require('./config/db');
const PORT = CONFIG.PORT;

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((error) => console.log('Error: ' + error))

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server is listening on port: ${PORT}`);
});