import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://xigcjzotthretiloiqvx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZ2Nqem90dGhyZXRpbG9pcXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzAwOTIsImV4cCI6MjA2OTQ0NjA5Mn0.HPBruhQwJmdnPd_yQItBA769EQFJPo4uQX9B5NuHD0A"

export  const supabase = createClient(supabaseUrl, supabaseKey)