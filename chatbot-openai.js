// Funzioni per l'integrazione con OpenAI
class OpenAIIntegration {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
        this.model = 'gpt-3.5-turbo';
        
        // Sistema di prompt per limitare le risposte agli argomenti pertinenti
        this.systemPrompt = {
            role: 'system',
            content: `Sei Relevance, un assistente virtuale esperta di rilevanza nell'era dell'AI del Centro per la Rilevanza (https://www.relevance.center). 
            Sei stato sviluppato dal SIDI e rispondi alle domande sia per SIDI (www.sidi-international.org) che per Forema (www.forema.it).
            
            Limita le tue risposte ai seguenti argomenti:
            - Servizi di intelligenza artificiale offerti da Forema & SIDI
            - AI Check-up, AI Assessment, Action Plan, Supporto all'Implementazione, Aggiornamento Continuo
            - Rilevanza nell'era dell'AI
            - Informazioni sul Centro per la Rilevanza
            
            Se l'utente chiede informazioni su altri argomenti, rispondi gentilmente che puoi fornire informazioni solo sui servizi di intelligenza artificiale offerti da Forema & SIDI.
            
            Se l'utente mostra interesse ad approfondire o essere ricontattato, chiedi se desidera essere ricontattato via email o telefono, e in caso affermativo, chiedi i suoi riferimenti e il nome dell'azienda.
            
            Mantieni le risposte concise, professionali e informative.`
        };
    }
    
    // Metodo per chiamare l'API di OpenAI
    async generateResponse(messages) {
        try {
            // Aggiungi il prompt di sistema all'inizio della conversazione
            const fullMessages = [this.systemPrompt, ...messages];
            
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: fullMessages,
                    max_tokens: 300,
                    temperature: 0.7
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Errore API OpenAI: ${errorData.error?.message || 'Errore sconosciuto'}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Errore nella chiamata a OpenAI:', error);
            return "Mi dispiace, si è verificato un errore nella comunicazione. Potresti riprovare più tardi o contattare direttamente info@forema.it per assistenza.";
        }
    }
    
    // Metodo per verificare la validità della chiave API
    async validateAPIKey() {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [{role: 'user', content: 'Test'}],
                    max_tokens: 5
                })
            });
            
            if (response.ok) {
                return true;
            } else {
                const errorData = await response.json();
                console.error('Errore validazione API key:', errorData);
                return false;
            }
        } catch (error) {
            console.error('Errore nella validazione della chiave API:', error);
            return false;
        }
    }
}

// Esporta la classe per l'uso nel file principale
window.OpenAIIntegration = OpenAIIntegration;
