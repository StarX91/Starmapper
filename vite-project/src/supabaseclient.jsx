import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oioxzlksvtfxxtyidytp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb3h6bGtzdnRmeHh0eWlkeXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MTk2NDcsImV4cCI6MjAzNjE5NTY0N30.AxN469QjVb42L1dPt7MwA8tYgvZbakIUXeQ9AwLM_eg';

export const supabase = createClient(supabaseUrl, supabaseKey);
