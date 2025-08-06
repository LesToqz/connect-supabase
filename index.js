require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email }]);

  if (error) {
    return res.send('Error: ' + error.message);
  }

  res.send('Success! Data inserted.');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
