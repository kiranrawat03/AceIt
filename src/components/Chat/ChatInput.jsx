/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useVoice } from '../../hooks/useVoice';
import styles from './ChatInput.module.css';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);
    const { isListening, transcript, setTranscript, startListening } = useVoice();

    // Effect to update text when transcript changes
    useEffect(() => {
        if (transcript) {
            setText((prev) => prev ? `${prev} ${transcript}` : transcript);
            setTranscript(''); // Clear buffer
        }
    }, [transcript, setTranscript]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSendMessage(text);
            setText('');
            // Reset height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset to calculate
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <div className={styles.inputContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <button
                    type="button"
                    className={`${styles.micButton} ${isListening ? styles.listening : ''}`}
                    onClick={startListening}
                    disabled={disabled}
                    aria-label={isListening ? "Listening..." : "Use Microphone"}
                    title={isListening ? "Listening..." : "Click to Speak"}
                >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isListening ? "Listening..." : "Type your answer here..."}
                    disabled={disabled}
                    rows={1}
                />
                <button
                    type="submit"
                    className={styles.sendButton}
                    disabled={!text.trim() || disabled}
                    aria-label="Send message"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
