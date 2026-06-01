const WebSocket = require('ws');

global.WebSocket = WebSocket;

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/users', async (req, res) => {
    const { data, error } = await supabase
      .from('users')
      .select('*');
  
    if (error) {
      return res.status(500).json(error);
    }
  
    res.json(data);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) {
      return res.status(500).json(error);
    }
  
    res.json(data);
  });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});