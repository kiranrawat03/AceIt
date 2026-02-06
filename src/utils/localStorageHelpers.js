// src/utils/localStorageHelpers.js

export const exportTranscript = (template, messages) => {
    if (!messages || messages.length === 0) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `AceIt_Interview_${template?.title || 'Practice'}_${timestamp}.html`;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>AceIt Interview Transcript</title>
        <style>
            body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 2rem auto; line-height: 1.6; color: #1e293b; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 2rem; }
            .message { margin-bottom: 1.5rem; padding: 1rem; border-radius: 0.5rem; }
            .ai { background-color: #f1f5f9; border: 1px solid #e2e8f0; }
            .user { background-color: #eef2ff; border: 1px solid #c7d2fe; }
            .sender { font-weight: bold; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
            .timestamp { font-size: 0.75rem; opacity: 0.6; float: right; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Interview Transcript</h1>
            <p><strong>Role:</strong> ${template?.title} (${template?.role})</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        ${messages.map(msg => `
            <div class="message ${msg.sender}">
                <div class="sender">
                    ${msg.sender === 'user' ? 'You' : 'Ace (AI Coach)'}
                    <span class="timestamp">${new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <div>${msg.text.replace(/\n/g, '<br>')}</div>
            </div>
        `).join('')}
    </body>
    </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};


const STORAGE_KEYS = {
    SESSION: 'aceit_current_session',
    HISTORY: 'aceit_chat_history',
    THEME: 'aceit_theme',
};

export const saveSession = (session) => {
    try {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } catch (error) {
        console.error("Error saving session to localStorage:", error);
    }
};

export const getSession = () => {
    try {
        const session = localStorage.getItem(STORAGE_KEYS.SESSION);
        return session ? JSON.parse(session) : null;
    } catch (error) {
        console.error("Error retrieving session from localStorage:", error);
        return null;
    }
};

export const clearSession = () => {
    try {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (error) {
        console.error("Error clearing session:", error);
    }
};

export const saveHistory = (history) => {
    try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (error) {
        console.error("Failed to save history:", error);
    }
};

export const getHistory = () => {
    try {
        const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error("Failed to load history:", error);
        return [];
    }
};

export const saveTheme = (theme) => {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
        console.error("Failed to save theme:", error);
    }
};

export const getTheme = () => {
    try {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    } catch (error) {
        console.error("Failed to load theme:", error);
        return 'light';
    }
};
