import styles from './TypingIndicator.module.css';

const TypingIndicator = () => {
    return (
        <div className={styles.container}>
            <span className={styles.text}>AceIt is analyzing your answer...</span>
            <div className={styles.dots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </div>
    );
};

export default TypingIndicator;
