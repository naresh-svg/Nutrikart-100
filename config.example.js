// NutriKart Configuration Example
// Copy this file to config.js and add your actual values

const config = {
    // Supabase Configuration
    SUPABASE_URL: 'https://knbwwhsrsszrhrcsgvxg.supabase.co',
    SUPABASE_ANON_KEY: 'your_supabase_anon_key_here',
    
    // Gemini API Configuration
    GEMINI_API_KEY: 'your_gemini_api_key_here',
    
    // API Endpoints
    GEMINI_MODEL: 'models/gemini-flash-latest',
    GEMINI_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
    
    // Environment
    NODE_ENV: 'development'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
}
