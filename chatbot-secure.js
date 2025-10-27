// NutriKart Assistant with Secure API Configuration
class NutriKartAssistant {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.messageCount = 0;
        
        // Load configuration from environment or config file
        this.loadConfiguration();
        
        this.init();
    }

    loadConfiguration() {
        // Try to load from config.js first, then fallback to environment variables
        if (typeof config !== 'undefined') {
            this.geminiApiKey = config.GEMINI_API_KEY;
            this.SUPABASE_URL = config.SUPABASE_URL;
            this.SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY;
            this.geminiModel = config.GEMINI_MODEL;
            this.geminiBaseUrl = config.GEMINI_BASE_URL;
        } else {
            // Fallback to environment variables or defaults
            this.geminiApiKey = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
            this.SUPABASE_URL = process.env.SUPABASE_URL || 'https://knbwwhsrsszrhrcsgvxg.supabase.co';
            this.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            this.geminiModel = 'models/gemini-flash-latest';
            this.geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta';
        }
        
        // Initialize Supabase (using correct CDN syntax)
        const { createClient } = supabase;
        this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
    }

    async init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Hi! I'm your NutriKart AI assistant powered by Gemini. Ask me anything about nutrition, health, or meal planning!</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Send message
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Refresh button
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.resetConversation();
        });

        // Close button
        document.getElementById('close-btn').addEventListener('click', () => {
            this.closeAssistant();
        });
    }

    async sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get response from Gemini API
            const response = await this.getGeminiResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage("Sorry, I'm having trouble connecting to the AI service. Please check your API key or try again later.", 'bot');
            console.error('Gemini API Error:', error);
        }
    }

    async getGeminiResponse(userMessage) {
        if (!this.geminiApiKey || this.geminiApiKey === 'YOUR_GEMINI_API_KEY') {
            return "Please configure your Gemini API key in the config.js file to use the AI assistant.";
        }

        // If first message, add system context
        if (this.chatHistory.length === 0) {
            this.chatHistory.push({
                role: "user",
                parts: [{ text: "You are a helpful nutrition assistant for NutriKart. Provide friendly, accurate nutrition and health advice." }]
            });
            this.chatHistory.push({
                role: "model",
                parts: [{ text: "I understand. I'll help with nutrition and health questions in a friendly, accurate way." }]
            });
        }

        // Add user message to chat history
        this.chatHistory.push({
            role: "user",
            parts: [{ text: userMessage }]
        });

        // Prepare the request
        const requestBody = {
            contents: this.chatHistory,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        // Make API call to Gemini with correct endpoint
        const response = await fetch(`${this.geminiBaseUrl}/${this.geminiModel}:generateContent?key=${this.geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('Invalid API Response:', data);
            throw new Error('Invalid response from Gemini API');
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Add AI response to chat history
        this.chatHistory.push({
            role: "model",
            parts: [{ text: aiResponse }]
        });

        // Keep only last 10 messages to avoid token limit
        if (this.chatHistory.length > 20) {
            this.chatHistory = this.chatHistory.slice(-20);
        }

        return aiResponse;
    }

    addMessage(content, role) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    resetConversation() {
        this.chatHistory = [];
        this.messageCount = 0;
        this.showWelcomeMessage();
    }

    closeAssistant() {
        // In a real app, this would close the assistant
        // For demo purposes, we'll just reset the conversation
        this.resetConversation();
    }
}

// Initialize assistant when page loads
document.addEventListener('DOMContentLoaded', () => {
    new NutriKartAssistant();
});

// Export for use in other files
window.NutriKartAssistant = NutriKartAssistant;
