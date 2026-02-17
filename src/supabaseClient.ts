import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

5. Click **"Commit changes"**
6. Click **"Commit changes"** again

### **Step 11: Create .env.local File**

1. Click **"Add file"** → **"Create new file"**
2. Name it: `.env.local`
3. Paste this (but **replace with YOUR actual values**):
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_KEY_HERE
VITE_ADMIN_PASSWORD=Fitnesscourt0987!
