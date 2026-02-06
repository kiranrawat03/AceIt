/* eslint-disable react/prop-types */
import { Volume2, VolumeX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useVoice } from '../../hooks/useVoice';
import styles from './MessageBubble.module.css';
import { useState } from 'react';

const MessageBubble = ({ sender, text, timestamp }) => {
    const isUser = sender === 'user';
    const { speak, stopSpeaking } = useVoice();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = () => {
        if (isSpeaking) {
            stopSpeaking();
            setIsSpeaking(false);
        } else {
            setIsSpeaking(true);
            speak(text);
            // Simple timeout to reset icon (imperfect but works for MVP)
            // A better way would be tracking speaking state in hook per ID, but let's keep it simple
            setTimeout(() => setIsSpeaking(false), text.length * 60 + 1000);
        }
    };

    return (
        <div className={`${styles.bubbleContainer} ${isUser ? styles.userContainer : styles.aiContainer}`}>
            <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
                {isUser ? (
                    <p>{text}</p>
                ) : (
                    <div className={styles.markdown}>
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                )}
                <div className={styles.footer}>
                    <span className={styles.timestamp}>
                        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {!isUser && (
                        <button
                            className={`${styles.speakBtn} ${isSpeaking ? styles.speaking : ''}`}
                            onClick={handleSpeak}
                            aria-label="Read Aloud"
                        >
                            {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
