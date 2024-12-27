import React from 'react';
import styles from './Messages.module.css';

interface MessagesProps {
    messages: { client: string, text: string, isOwnMessage: boolean }[];
}

function Messages(props: MessagesProps) {
    return (
        <div className={styles.messageContainer}>
            {props.messages.map((message, index) => (
                <span
                    key={index}
                    className={`${styles.message} ${message.isOwnMessage ? styles.ownMessage : styles.otherMessage}`}
                >
                    {message.text}
                    <span className={styles.clientName}>{message.client}</span>
                </span>
            ))}
        </div>
    );
}

export default Messages;