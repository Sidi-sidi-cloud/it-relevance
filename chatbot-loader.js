// Aggiorna il file index.html per includere i file del chatbot
document.addEventListener('DOMContentLoaded', function() {
    // Aggiungi i link ai file CSS e JavaScript del chatbot
    const head = document.head || document.getElementsByTagName('head')[0];
    
    // Aggiungi il link al CSS del chatbot
    const chatbotCssLink = document.createElement('link');
    chatbotCssLink.rel = 'stylesheet';
    chatbotCssLink.href = 'chatbot.css';
    head.appendChild(chatbotCssLink);
    
    // Carica gli script del chatbot
    const chatbotScript = document.createElement('script');
    chatbotScript.src = 'chatbot.js';
    chatbotScript.defer = true;
    
    const chatbotOpenAIScript = document.createElement('script');
    chatbotOpenAIScript.src = 'chatbot-openai.js';
    chatbotOpenAIScript.defer = true;
    
    // Aggiungi gli script al body
    document.body.appendChild(chatbotOpenAIScript);
    document.body.appendChild(chatbotScript);
    
    console.log('Chatbot Relevance caricato con successo!');
});
