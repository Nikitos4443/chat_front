import React, {useState} from 'react';
import styles from './Main.module.css'
import {useNavigate} from "react-router-dom";

function Main() {

    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [roomId, setRoomId] = useState<string>('');

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!name || !roomId) {
            return;
        }
        navigate(`/room/${roomId}/${name}`)
    }

    return (
        <div className={styles.cont}>
            <span>Chat App</span>
            <form className={styles.form}>
                <input className={styles.input_main} value={name} type="text" id="name" onChange={e => {setName(e.target.value)}} placeholder="Enter your name..." />
                <input className={styles.input_main} value={roomId} type="text" id="roomId" onChange={e => {setRoomId(e.target.value)}} placeholder="Enter room id..."/>

                <button className={styles.button_main} type='submit' onClick={handleSubmit}>Confirm</button>
            </form>
        </div>
    );
}

export default Main;