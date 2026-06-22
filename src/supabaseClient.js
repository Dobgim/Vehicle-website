import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zaffhwofeqvikdihuerf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZmZod29mZXF2aWtkaWh1ZXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMjcyNzAsImV4cCI6MjA4OTcwMzI3MH0.JO6zotH0SF3WatrXHKESx6vNLacTG_WqBmPjlp3tQLA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
