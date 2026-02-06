/* eslint-disable react/prop-types */
// src/context/ChatContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { saveSession, getSession, clearSession, saveTheme, getTheme } from '../utils/localStorageHelpers';

const ChatContext = createContext();

const initialState = {
    messages: [],
    isTyping: false,
    currentTemplate: null,
    isSessionActive: false,
    theme: getTheme(), // Initialize from storage
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case 'START_SESSION':
            return {
                ...state,
                isSessionActive: true,
                currentTemplate: action.payload.template,
                messages: [
                    {
                        id: Date.now(),
                        sender: 'ai',
                        text: action.payload.template.initialMessage,
                        timestamp: new Date().toISOString(),
                    },
                ],
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case 'SET_TYPING':
            return {
                ...state,
                isTyping: action.payload,
            };
        case 'CLEAR_SESSION':
            // Preserve theme when clearing session
            return {
                ...initialState,
                theme: state.theme
            };
        case 'RESTORE_SESSION':
            return {
                ...action.payload,
                theme: state.theme // Keep current theme, don't overwrite from session if it was stored there (it shouldn't be anymore)
            };
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            };
        default:
            return state;
    }
};

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    // Restore session on mount
    useEffect(() => {
        const savedSession = getSession();
        if (savedSession && savedSession.isSessionActive) {
            dispatch({ type: 'RESTORE_SESSION', payload: savedSession });
        }
    }, []);

    // Save session on change
    useEffect(() => {
        if (state.isSessionActive) {
            saveSession(state);
        } else {
            clearSession();
        }
    }, [state.messages, state.isSessionActive, state.currentTemplate]); // Don't save session on theme change

    // Handle Theme Side Effects
    useEffect(() => {
        saveTheme(state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
    }, [state.theme]);

    const startSession = (template) => {
        dispatch({ type: 'START_SESSION', payload: { template } });
    };

    const addMessage = (text, sender = 'user') => {
        const message = {
            id: Date.now(),
            sender,
            text,
            timestamp: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_MESSAGE', payload: message });
    };

    const setTyping = (isTyping) => {
        dispatch({ type: 'SET_TYPING', payload: isTyping });
    };

    const endSession = () => {
        dispatch({ type: 'CLEAR_SESSION' });
    };

    const toggleTheme = () => {
        dispatch({ type: 'TOGGLE_THEME' });
    };

    return (
        <ChatContext.Provider
            value={{
                ...state,
                startSession,
                addMessage,
                setTyping,
                endSession,
                toggleTheme,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
