import React, {useState, useEffect, useRef} from "react";
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import uuid from 'react-uuid'


function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        db.collection('tayongMessage').doc('chat').collection(uuid()).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
            <SignOut />
            <div className="msgs">
                {messages.map(({id, text, photoURL, uid}) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt=""/>
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat