
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://knlcoxqeqhrcvqsussca.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubGNveHFlcWhyY3Zxc3Vzc2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyODQ0NTYsImV4cCI6MjA1OTg2MDQ1Nn0.uUeamU7pEUz-KNTGs5liang-XPmiyBSjpP1KHG945ms";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Function to send welcome email
export const sendWelcomeEmail = async (userData: {
  email: string;
  name: string;
  fitness_goal: string | null;
  fitness_level: string | null;
}) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-welcome-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
};
