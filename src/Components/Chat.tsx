import React, {useEffect, useState} from 'react';
import styles from './Chat.module.css'
import Messages from "./Messages.tsx";
import {io, Socket} from "socket.io-client";
import {useParams} from "react-router-dom";

function Chat() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<{ client: string, text: string, isOwnMessage: boolean }[]>([]);
    const [curr, setCurr] = useState<string>("");
    const [joined, setJoined] = useState<string>("");
    const {roomId, clientName} = useParams();

    useEffect(() => {
        const newSocket = io('chatback-production-e1bf.up.railway.app');
        setSocket(newSocket);

        newSocket.emit('join-room', {clientName, roomId});

        newSocket.on('user-joined', data => {
            setJoined(data);
        })

        const handleBeforeUnload = () => {
            if (newSocket) {
                newSocket.emit('user-left', { clientName, roomId });
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        newSocket.on('user-leave', data => {
            console.log(data)
            setJoined(data);
        })

        newSocket.on('reply', (data) => {
            console.log('Отримано відповідь:', data);
            setMessages((prevMessages) => [...prevMessages, { client: data.client, text: data.message, isOwnMessage: false },]);
            setCurr("");
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setJoined("");
        }, 3000)
    }, [joined]);

    const onMessageSend = () => {
        if (socket && curr) {
            socket.emit('send-message', {clientName: clientName, message: curr, roomId: roomId});
            setMessages((prevMessages) => [...prevMessages, { client: 'me', text: curr, isOwnMessage: true }]);
            setCurr('');
        }
    };


    return (
        <div className={styles.mainContainer}>
            <div className={styles.starter}>This is my chat app</div>
            {joined && <span>{joined}</span>}
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
