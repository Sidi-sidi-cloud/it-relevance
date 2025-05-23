// Chatbot Relevance - Funzionalità
document.addEventListener('DOMContentLoaded', function() {
    // Aggiungi il markup HTML del chatbot al body
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-button">
                <i class="fas fa-comment chatbot-icon"></i>
            </div>
            <div class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-title">Relevance - Assistente Virtuale</div>
                    <div class="chatbot-close">&times;</div>
                </div>
                <div class="chatbot-messages">
                    <!-- I messaggi verranno aggiunti qui dinamicamente -->
                </div>
                <div class="chatbot-input-container">
                    <input type="text" class="chatbot-input" placeholder="Scrivi un messaggio...">
                    <button class="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="contact-form-container">
                    <div class="contact-form-field">
                        <label for="contact-name">Nome</label>
                        <input type="text" id="contact-name" placeholder="Il tuo nome">
                    </div>
                    <div class="contact-form-field">
                        <label for="contact-email">Email</label>
                        <input type="email" id="contact-email" placeholder="La tua email">
                    </div>
                    <div class="contact-form-field">
                        <label for="contact-phone">Telefono</label>
                        <input type="tel" id="contact-phone" placeholder="Il tuo numero di telefono">
                    </div>
                    <div class="contact-form-field">
                        <label for="contact-company">Azienda</label>
                        <input type="text" id="contact-company" placeholder="Nome della tua azienda">
                    </div>
                    <button class="contact-form-submit">Invia</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    
    // Elementi DOM
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const contactFormContainer = document.querySelector('.contact-form-container');
    const contactFormSubmit = document.querySelector('.contact-form-submit');
    
    // Variabili di stato
    let conversation = [];
    let waitingForOpenAIResponse = false;
    let contactFormActive = false;
    
    // Funzione per aggiungere un messaggio alla chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'message-user' : 'message-bot');
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Aggiungi il messaggio alla conversazione
        conversation.push({
            role: isUser ? 'user' : 'assistant',
            content: text
        });
    }
    
    // Funzione per mostrare l'indicatore di digitazione
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        typingDiv.id = 'typing-indicator';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Funzione per rimuovere l'indicatore di digitazione
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Funzione per inviare la conversazione via email
    function sendConversationByEmail(userEmail = null, userPhone = null, userCompany = null) {
        // In un'implementazione reale, qui si invierebbe una richiesta al server
        // per inviare l'email con la conversazione
        
        // Determina l'indirizzo email di destinazione in base alla lingua/mercato
        // Per semplicità, assumiamo che il mercato italiano sia il default
        const isItalianMarket = true; // In un'implementazione reale, questo verrebbe determinato in base alla lingua o all'IP
        const targetEmail = isItalianMarket ? 'info@forema.it' : 'info@sidi-international.org';
        
        console.log(`Conversazione inviata a ${targetEmail}`);
        console.log('Contenuto della conversazione:', conversation);
        
        if (userEmail) {
            console.log(`Informazioni di contatto: Email: ${userEmail}, Telefono: ${userPhone}, Azienda: ${userCompany}`);
        }
        
        // Qui in una implementazione reale si invierebbe effettivamente l'email
        // tramite una chiamata API a un servizio di backend
    }
    
    // Funzione per gestire la risposta del chatbot
    function handleBotResponse(userMessage) {
        // Mostra l'indicatore di digitazione
        showTypingIndicator();
        waitingForOpenAIResponse = true;
        
        // Simula una risposta del chatbot (in produzione, qui si chiamerebbe l'API di OpenAI)
        setTimeout(() => {
            removeTypingIndicator();
            waitingForOpenAIResponse = false;
            
            // Logica di risposta simulata
            let botResponse = '';
            
            // Verifica se il messaggio contiene parole chiave relative a contatti o ricontatto
            const contactKeywords = ['contatto', 'contatti', 'ricontattare', 'chiamare', 'email', 'telefono', 'parlare'];
            const isContactRequest = contactKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
            
            // Verifica se il messaggio contiene parole chiave relative a Relevance
            const relevanceKeywords = ['relevance', 'chi sei', 'cosa fai', 'assistente', 'virtuale'];
            const isRelevanceQuestion = relevanceKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
            
            // Verifica se il messaggio contiene parole chiave relative ai servizi
            const serviceKeywords = ['servizi', 'intelligenza artificiale', 'ai', 'assessment', 'check-up', 'implementazione', 'action plan'];
            const isServiceQuestion = serviceKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
            
            if (isContactRequest) {
                botResponse = "Sarò felice di metterti in contatto con un consulente. Preferisci essere ricontattato via email o telefono?";
            } else if (isRelevanceQuestion) {
                botResponse = "Sono Relevance, l'assistente virtuale esperta di rilevanza nell'era dell'AI del Centro per la Rilevanza. Sono stato sviluppato dal SIDI per aiutare le aziende a comprendere e sfruttare le opportunità dell'intelligenza artificiale. Come posso aiutarti oggi?";
            } else if (isServiceQuestion) {
                botResponse = "Forema & SIDI offrono una piattaforma completa di servizi per guidare le imprese nell'era dell'Intelligenza Artificiale, tra cui: AI Check-up, AI Assessment, Action Plan e Studio di Fattibilità, Supporto all'Implementazione e Aggiornamento Continuo. Su quale servizio vorresti maggiori informazioni?";
            } else if (userMessage.toLowerCase().includes('email')) {
                botResponse = "Perfetto! Per essere ricontattato via email, avrei bisogno di alcuni tuoi dati. Potresti compilare il modulo che ti mostrerò?";
                // Attiva il form di contatto
                setTimeout(() => {
                    contactFormContainer.classList.add('active');
                    chatbotInput.style.display = 'none';
                    chatbotSend.style.display = 'none';
                    contactFormActive = true;
                }, 1000);
            } else if (userMessage.toLowerCase().includes('telefono')) {
                botResponse = "Ottimo! Per essere ricontattato telefonicamente, avrei bisogno di alcuni tuoi dati. Potresti compilare il modulo che ti mostrerò?";
                // Attiva il form di contatto
                setTimeout(() => {
                    contactFormContainer.classList.add('active');
                    chatbotInput.style.display = 'none';
                    chatbotSend.style.display = 'none';
                    contactFormActive = true;
                }, 1000);
            } else {
                botResponse = "Mi dispiace, posso rispondere solo a domande relative ai servizi di intelligenza artificiale offerti da Forema & SIDI, o metterti in contatto con un consulente. Come posso aiutarti con questi argomenti?";
            }
            
            addMessage(botResponse);
            
            // Invia la conversazione via email dopo ogni interazione
            sendConversationByEmail();
        }, 1500);
    }
    
    // Event listeners
    chatbotButton.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        
        // Se è la prima apertura, mostra il messaggio di benvenuto
        if (conversation.length === 0) {
            addMessage("Ciao! Sono Relevance, l'assistente virtuale esperta di rilevanza nell'era dell'AI. Come posso aiutarti oggi?");
        }
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
    });
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !waitingForOpenAIResponse) {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatbotInput.value = '';
                handleBotResponse(message);
            }
        }
    });
    
    chatbotSend.addEventListener('click', function() {
        if (!waitingForOpenAIResponse) {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatbotInput.value = '';
                handleBotResponse(message);
            }
        }
    });
    
    contactFormSubmit.addEventListener('click', function() {
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const company = document.getElementById('contact-company').value.trim();
        
        if (name && email) {
            // Nascondi il form
            contactFormContainer.classList.remove('active');
            chatbotInput.style.display = '';
            chatbotSend.style.display = '';
            contactFormActive = false;
            
            // Mostra messaggio di conferma
            addMessage(`Grazie ${name}! I tuoi dati sono stati inviati. Un consulente ti contatterà presto.`);
            
            // Invia la conversazione con i dati di contatto
            sendConversationByEmail(email, phone, company);
            
            // Resetta il form
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-email').value = '';
            document.getElementById('contact-phone').value = '';
            document.getElementById('contact-company').value = '';
        } else {
            // Mostra messaggio di errore
            alert('Per favore, compila almeno i campi Nome ed Email.');
        }
    });
});

// Funzione per integrare l'API di OpenAI (da implementare quando si hanno le API key)
function callOpenAI(messages, apiKey) {
    // Questa funzione verrà implementata quando si avranno le API key
    // Per ora è solo un placeholder
    
    // Esempio di come potrebbe essere implementata:
    /*
    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7
        })
    })
    .then(response => response.json())
    .then(data => {
        return data.choices[0].message.content;
    });
    */
}
