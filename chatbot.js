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

    // Integrazione con OpenAI: la chiave viene letta dalla variabile globale
    // `OPENAI_API_KEY` che può essere definita prima di caricare questo script.
    // Sostituire il valore con la propria chiave oppure impostare la variabile
    // in modo sicuro (ad esempio da un file separato non tracciato).
    const openAI = new OpenAIIntegration(window.OPENAI_API_KEY || '');

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
    async function handleBotResponse(userMessage) {
        // Mostra l'indicatore di digitazione
        showTypingIndicator();
        waitingForOpenAIResponse = true;

        try {
            // Ottieni la risposta dal modello OpenAI utilizzando la conversazione corrente
            const reply = await openAI.generateResponse(conversation);
            addMessage(reply);

            // Mostra il form di contatto se l'utente ha richiesto un ricontatto specifico
            if (userMessage.toLowerCase().includes('email') || userMessage.toLowerCase().includes('telefono')) {
                setTimeout(() => {
                    contactFormContainer.classList.add('active');
                    chatbotInput.style.display = 'none';
                    chatbotSend.style.display = 'none';
                    contactFormActive = true;
                }, 1000);
            }

            // Invia la conversazione via email dopo ogni interazione
            sendConversationByEmail();
        } catch (error) {
            console.error('Errore nella generazione della risposta:', error);
            addMessage('Mi dispiace, si è verificato un problema con la risposta.');
        } finally {
            removeTypingIndicator();
            waitingForOpenAIResponse = false;
        }
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

