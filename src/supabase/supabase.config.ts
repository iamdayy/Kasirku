import { createClient } from '@supabase/supabase-js'

const supabaseUrl: any = 'https://nkrpfpqtfwhbasyxmzcc.supabase.co'
const supabaseAnonKey: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rcnBmcHF0ZndoYmFzeXhtemNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY0NjMwOTcsImV4cCI6MTk4MjAzOTA5N30.L9YTzWt8g-EF58IJP-IRmc3hTpW_d2yERcwgqmErfuk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)