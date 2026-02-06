/* eslint-disable react/prop-types */
import { Menu, RotateCcw, Sun, Moon, Download } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { exportTranscript } from '../../utils/localStorageHelpers';
import styles from './Header.module.css';

const Header = ({ onMenuClick }) => {
    const { currentTemplate, endSession, theme, toggleTheme, messages } = useChat();

    const handleExport = () => {
        if (currentTemplate && messages.length > 0) {
            exportTranscript(currentTemplate, messages);
        }
    };

    return (
        <header className={styles.header}>
            <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open sidebar">
                <Menu size={24} />
            </button>

            <div className={styles.titleContainer}>
                {currentTemplate ? (
                    <>
                        <h2 className={styles.title}>{currentTemplate.title} Interview</h2>
                        <span className={styles.badge}>{currentTemplate.role}</span>
                    </>
                ) : (
                    <h2 className={styles.title}>Dashboard</h2>
                )}
            </div>

            <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={toggleTheme} aria-label="Toggle Theme" title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                {currentTemplate && messages.length > 0 && (
                    <button className={styles.actionBtn} onClick={handleExport} aria-label="Export Transcript" title="Download Transcript">
                        <Download size={20} />
                    </button>
                )}
                {currentTemplate && (
                    <button className={styles.actionBtn} onClick={endSession} aria-label="Restart Session" title="Restart Session">
                        <RotateCcw size={20} />
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
