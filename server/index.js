import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post('/api/auth', async (req, res) => {
  const { telegram_id, first_name, last_name, username, photo_url } = req.body;
  
  try {
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegram_id)
      .single();
    
    if (existingUser) {
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          first_name,
          last_name,
          username,
          photo_url,
          last_login: new Date()
        })
        .eq('telegram_id', telegram_id)
        .select()
        .single();
      
      return res.json({ success: true, user: updatedUser, isNew: false });
    }
    
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        telegram_id,
        first_name,
        last_name,
        username,
        photo_url,
        created_at: new Date(),
        last_login: new Date()
      })
      .select()
      .single();
    
    res.json({ success: true, user: newUser, isNew: true });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
