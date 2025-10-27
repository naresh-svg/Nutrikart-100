// Simple NutriKart Assistant with Gemini API (No Supabase dependency)
class NutriKartAssistant {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.messageCount = 0;
        
        // API key for Gemini
        this.geminiApiKey = 'AIzaSyCMlN9eSb-PwFzqgT9-R0eWIq7WjJ3-Na4';
        this.geminiModel = 'models/gemini-flash-latest';
        this.geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta';
        
        console.log('🤖 NutriKart Assistant initialized');
        console.log('🔑 API Key:', this.geminiApiKey.substring(0, 10) + '...');
        console.log('🎯 Model:', this.geminiModel);
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing chatbot...');
        this.setupEventListeners();
        this.showWelcomeMessage();
        console.log('✅ Chatbot ready!');
    }

    showWelcomeMessage() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        <p>Hi! I'm your NutriKart AI assistant powered by Gemini. Ask me anything about nutrition, health, or meal planning!</p>
                    </div>
                </div>
            `;
        }
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        // Send message button
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                console.log('📤 Send button clicked');
                this.sendMessage();
            });
        } else {
            console.error('❌ Send button not found');
        }

        // Enter key to send
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    console.log('⌨️ Enter key pressed');
                    this.sendMessage();
                }
            });
        } else {
            console.error('❌ Message input not found');
        }

        // Refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                console.log('🔄 Refresh button clicked');
                this.resetConversation();
            });
        }

        // Close button
        const closeBtn = document.getElementById('close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('❌ Close button clicked');
                this.closeAssistant();
            });
        }

        console.log('✅ Event listeners set up');
    }

    async sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        console.log('📝 User message:', message);
        
        if (!message) {
            console.log('⚠️ Empty message, ignoring');
            return;
        }
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            console.log('🤖 Getting AI response...');
            // Get response from Gemini API
            const response = await this.getGeminiResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            console.log('✅ AI response received:', response.substring(0, 50) + '...');
        } catch (error) {
            console.error('❌ Error getting AI response:', error);
            this.hideTypingIndicator();
            this.addMessage("Sorry, I'm having trouble connecting to the AI service. Please check your API key or try again later.", 'bot');
        }
    }

    async getGeminiResponse(userMessage) {
        console.log('🔗 Calling Gemini API...');
        
        if (!this.geminiApiKey || this.geminiApiKey === 'YOUR_GEMINI_API_KEY') {
            throw new Error("Please configure your Gemini API key");
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

        console.log('📤 Sending request to Gemini API...');
        console.log('🎯 URL:', `${this.geminiBaseUrl}/${this.geminiModel}:generateContent?key=${this.geminiApiKey.substring(0, 10)}...`);

        // Make API call to Gemini with correct endpoint
        const response = await fetch(`${this.geminiBaseUrl}/${this.geminiModel}:generateContent?key=${this.geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('📥 Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ API Error Details:', errorData);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📊 Response data:', data);
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('❌ Invalid API Response:', data);
            throw new Error('Invalid response from Gemini API');
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        console.log('✅ AI Response:', aiResponse);
        
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
        console.log(`💬 Adding ${role} message:`, content.substring(0, 50) + '...');
        
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) {
            console.error('❌ Messages container not found');
            return;
        }
        
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
        
        console.log('⏳ Showing typing indicator');
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
        console.log('✅ Hiding typing indicator');
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    resetConversation() {
        console.log('🔄 Resetting conversation');
        this.chatHistory = [];
        this.messageCount = 0;
        this.showWelcomeMessage();
    }

    closeAssistant() {
        console.log('❌ Closing assistant');
        // In a real app, this would close the assistant
        // For demo purposes, we'll just reset the conversation
        this.resetConversation();
    }
}

// Initialize assistant when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing chatbot...');
    new NutriKartAssistant();
});

// Export for use in other files
window.NutriKartAssistant = NutriKartAssistant;
