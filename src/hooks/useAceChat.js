import { useRef } from 'react';
import { useChat } from '../context/ChatContext';

const MODEL_DELAY = 1500; // 1.5 seconds

export const useAceChat = () => {
    const {
        messages,
        addMessage,
        setTyping,
        isTyping,
        currentTemplate,
        isSessionActive
    } = useChat();

    // We need a ref to track if we're waiting for a response to prevent duplicates
    const isWaitingForResponse = useRef(false);

    // Simple keyword-based AI logic (Simulated)
    const generateResponse = (userText) => {
        if (!currentTemplate) return "I'm not sure which interview mode we're in.";

        const lowerText = userText.toLowerCase();

        // Check for specific keywords match from the template
        if (currentTemplate.keywords) {
            const hasKeyword = currentTemplate.keywords.some(k => lowerText.includes(k));
            if (hasKeyword) {
                return `That's a great point about **${currentTemplate.keywords.find(k => lowerText.includes(k))}**. \n\n Can you elaborate on how that impacted the final outcome?`;
            }
        }

        // Generic responses based on length/content
        if (lowerText.length < 20) {
            return "Could you provide a bit more detail? In an interview, specific operational examples are key.";
        }

        if (lowerText.includes('example') || lowerText.includes('instance')) {
            return "Excellent use of a concrete example. **STAR Method Tip:** Ensure you clearly emphasize the *Result* of your action.";
        }

        return "I see. That's a solid start. \n\n *Follow-up:* What would you have done differently if you had more time?";
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        // 1. Add User Message
        addMessage(text, 'user');

        // 2. Simulate AI Thinking
        setTyping(true);
        isWaitingForResponse.current = true;

        setTimeout(() => {
            const response = generateResponse(text);
            addMessage(response, 'ai');
            setTyping(false);
            isWaitingForResponse.current = false;
        }, MODEL_DELAY);
    };

    return {
        messages,
        sendMessage,
        isSessionActive,
        isTyping,
        currentTemplate
    };
};
