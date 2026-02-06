/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from '../UI/TypingIndicator';
import ResponseTimer from '../UI/ResponseTimer';
import QuickActions from './QuickActions';
import { useAceChat } from '../../hooks/useAceChat';
import styles from './ChatContainer.module.css';

const ChatContainer = () => {
    const { messages, sendMessage, isTyping, isSessionActive, currentTemplate } = useAceChat();
    const messagesEndRef = useRef(null);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Timer Logic: Start when AI finishes typing (user turn), stop when user sends
    useEffect(() => {
        if (messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.sender === 'ai' && !isTyping) {
                // AI just finished, user's turn to answer -> Start Timer
                setIsTimerActive(true);
            }
        }
    }, [messages, isTyping]);

    const handleSendMessage = (text) => {
        setIsTimerActive(false); // Stop timer
        sendMessage(text);
    };

    if (!isSessionActive) {
        return (
            <div className={styles.emptyState}>
                <h2>Select a template to start practicing!</h2>
            </div>
        )
    }

    // Show hints only during User's turn (Timer is active or it's not typing)
    // And ideally only if the last message was AI
    const showHints = !isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'ai';

    return (
        <div className={styles.container}>
            <div className={styles.headerBar}>
                <ResponseTimer isActive={isTimerActive} />
            </div>
            <div className={styles.messageList}>
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        sender={msg.sender}
                        text={msg.text}
                        timestamp={msg.timestamp}
                    />
                ))}
                {isTyping && (
                    <div className={styles.typingContainer}>
                        <TypingIndicator />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {showHints && currentTemplate?.hints && (
                <QuickActions
                    hints={currentTemplate.hints}
                    onActionClick={(hint) => handleSendMessage(hint)} // Immediately send or populate? Let's send for "Quick Action" feel, or maybe better to populate input. 
                // Requirement said "Hints". Let's send it as a starting point? 
                // Actually, usually "Chips" populate text. But "Quick Actions" perform action.
                // Let's populate ChatInput ideally. But ChatInputstate is inside ChatInput.
                // Refactoring to lift state would be best, but for now let's just SEND it as an answer starter.
                // "Tell me about..." -> User clicks "Start with Context" -> "Let me start with the context..."
                // Wait, the hints are content suggestions like "Effect timing".
                // If I click "Effect timing", it sends "Effect timing" as my answer? That's weird.
                // Let's make it populate the input. But I can't easily reach into ChatInput state without lifting.
                // Let's change ChatInput to accept `initialValue` or expose a method.
                // Simplest: Just send it for now, as if the user chose that topic.
                />
            )}
            {/* 
                Re-thinking: If I click "Synchronous vs Async", sending that as a message is okay-ish as a keyword answer.
                But better would be pasting it into the input. 
                New Plan: Pass `setInputText` to ChatInput or use a ref. 
                Let's stick to simple: Send it. It acts like a "I want to talk about X" prompt.
             */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
    );
};

export default ChatContainer;
