import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iebnvliwdkqzejpouxxz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllYm52bGl3ZGtxemVqcG91eHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTgxNzcsImV4cCI6MjA5NjU5NDE3N30.HQ3lm51GZGm-rSrl9XbcweUlqx15_j4pp5nb5IlD7gc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
