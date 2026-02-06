/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Timer } from 'lucide-react';
import styles from './ResponseTimer.module.css';

const ResponseTimer = ({ isActive, onStop }) => {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            setSeconds(0);
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                if (seconds > 0 && onStop) {
                    // Optionally pass back the final time
                }
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    if (!isActive && seconds === 0) return null;

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`${styles.timer} ${isActive ? styles.active : ''}`}>
            <Timer size={16} />
            <span>{formatTime(seconds)}</span>
        </div>
    );
};

export default ResponseTimer;
