import { useState, useEffect, useCallback } from 'react';

export const useVoice = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isThinking, setIsThinking] = useState(false); // For TTS state if needed

    // Speech Recognition
    const startListening = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Speech Recognition is not supported in this browser. Try Chrome.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript || interimTranscript) {
                setTranscript(finalTranscript || interimTranscript);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    }, []);

    // Text to Speech
    const speak = useCallback((text) => {
        if (!('speechSynthesis' in window)) return;

        // Cancel existing utterance
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Strip markdown/formatting for cleaner speech
        const cleanText = text.replace(/[*#_`]/g, '');
        utterance.text = cleanText;

        window.speechSynthesis.speak(utterance);
    }, []);

    const stopSpeaking = useCallback(() => {
        window.speechSynthesis.cancel();
    }, []);

    return {
        isListening,
        transcript,
        setTranscript, // To clear it after sending
        startListening,
        speak,
        stopSpeaking
    };
};
