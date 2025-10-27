// Test script for Gemini API endpoint verification
// Run this with: node test-gemini-api.js

const https = require('https');

// Configuration
const GEMINI_API_KEY = 'AIzaSyCMlN9eSb-PwFzqgT9-R0eWIq7WjJ3-Na4';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const MODEL = 'models/gemini-flash-latest';

// Test 1: List available models
function testListModels() {
    console.log('🔍 Testing: List available models...');
    
    const options = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: `/v1beta/models?key=${GEMINI_API_KEY}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log('✅ Models API Response:');
                console.log(JSON.stringify(response, null, 2));
                
                // Check if our model is available
                const models = response.models || [];
                const ourModel = models.find(m => m.name === MODEL);
                if (ourModel) {
                    console.log(`✅ Model ${MODEL} is available!`);
                } else {
                    console.log(`❌ Model ${MODEL} not found in available models`);
                }
            } catch (error) {
                console.error('❌ Error parsing response:', error);
                console.log('Raw response:', data);
            }
        });
    });

    req.on('error', (error) => {
        console.error('❌ Request error:', error);
    });

    req.end();
}

// Test 2: Generate content with correct endpoint
function testGenerateContent() {
    console.log('\n🤖 Testing: Generate content with correct endpoint...');
    
    const requestData = JSON.stringify({
        contents: [{
            role: "user",
            parts: [{ text: "Say hello and confirm you are working" }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        }
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: `/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestData)
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log('✅ Generate Content API Response:');
                console.log(JSON.stringify(response, null, 2));
                
                if (response.candidates && response.candidates[0] && response.candidates[0].content) {
                    const aiResponse = response.candidates[0].content.parts[0].text;
                    console.log(`✅ AI Response: "${aiResponse}"`);
                } else {
                    console.log('❌ No valid response from AI');
                }
            } catch (error) {
                console.error('❌ Error parsing response:', error);
                console.log('Raw response:', data);
            }
        });
    });

    req.on('error', (error) => {
        console.error('❌ Request error:', error);
    });

    req.write(requestData);
    req.end();
}

// Test 3: Test with curl command equivalent
function testCurlEquivalent() {
    console.log('\n📋 Curl command equivalent:');
    console.log(`
curl \\
  -H "Content-Type: application/json" \\
  "${GEMINI_BASE_URL}/models?key=${GEMINI_API_KEY}"
    `);
    
    console.log('\n📋 Generate content curl command:');
    console.log(`
curl \\
  -H "Content-Type: application/json" \\
  -d '{"contents":[{"role":"user","parts":[{"text":"Hello"}]}]}' \\
  "${GEMINI_BASE_URL}/${MODEL}:generateContent?key=${GEMINI_API_KEY}"
    `);
}

// Run all tests
console.log('🚀 Starting Gemini API Tests...\n');
console.log(`Using API Key: ${GEMINI_API_KEY.substring(0, 10)}...`);
console.log(`Using Model: ${MODEL}\n`);

testListModels();

// Wait a bit before the second test
setTimeout(() => {
    testGenerateContent();
    testCurlEquivalent();
}, 2000);
