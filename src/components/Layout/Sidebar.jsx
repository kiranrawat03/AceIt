/* eslint-disable react/prop-types */
import { MessageSquare, Bot } from 'lucide-react';
import prompts from '../../templates/prompts.json';
import { useChat } from '../../context/ChatContext';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
    const { startSession, endSession, currentTemplate } = useChat();

    const handleSelectTemplate = (template) => {
        endSession(); // Clear current session
        startSession(template); // Start new one
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Bot className={styles.logoIcon} size={28} />
                    <h1>AceIt</h1>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Templates</h3>
                <ul className={styles.list}>
                    {prompts.map((template) => (
                        <li key={template.id}>
                            <button
                                className={`${styles.navItem} ${currentTemplate?.id === template.id ? styles.active : ''}`}
                                onClick={() => handleSelectTemplate(template)}
                            >
                                <MessageSquare size={18} />
                                <span>{template.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.footer}>
                <p>© 2026 AceIt Coach</p>
            </div>
        </aside>
    );
};

export default Sidebar;
