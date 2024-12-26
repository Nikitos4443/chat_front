import React, {useEffect, useState} from 'react';
import styles from './Chat.module.css'
import Messages from "./Messages.tsx";
import {io, Socket} from "socket.io-client";

function Chat() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<{ text: string, isOwnMessage: boolean }[]>([]);
    const [curr, setCurr] = useState<string>("");

    useEffect(() => {
        const newSocket = io('http://localhost:3002');
        setSocket(newSocket);

        newSocket.on('reply', (data) => {
            console.log('Отримано відповідь:', data);
            setMessages((prevMessages) => [...prevMessages, { text: data, isOwnMessage: false },]);
            setCurr("");
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const onMessageSend = () => {
        if (socket && curr) {
            socket.emit('newMessage', curr);
            setMessages((prevMessages) => [...prevMessages, { text: curr, isOwnMessage: true }]);
            setCurr('');
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.starter}>This is my chat app</div>
            <Messages messages={messages} />
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    value={curr}
                    placeholder='Введіть ваше повідомлення'
                    onChange={(e) => {
                        setCurr(e.target.value);
                    }}
                />
                <button onClick={onMessageSend} className={styles.button}>S</button>
            </div>
        </div>
    );
}

export default Chat;