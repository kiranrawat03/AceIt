/* eslint-disable react/prop-types */
import { Lightbulb } from 'lucide-react';
import styles from './QuickActions.module.css';

const QuickActions = ({ hints, onActionClick }) => {
    if (!hints || hints.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <Lightbulb size={16} className={styles.icon} />
            </div>
            <div className={styles.chips}>
                {hints.map((hint, index) => (
                    <button
                        key={index}
                        className={styles.chip}
                        onClick={() => onActionClick(hint)}
                    >
                        {hint}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
