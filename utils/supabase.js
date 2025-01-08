import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zevyexiwijxhonmmluyt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldnlleGl3aWp4aG9ubW1sdXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMjA3NDcsImV4cCI6MjA0OTg5Njc0N30.ucBpO-DGoWH8H_gradkiTxOOVKL4QeWndm6hiMycMC0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
