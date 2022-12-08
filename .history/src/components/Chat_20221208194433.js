import React, {useState, useEffect, useRef, useParams} from "react";
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import uuid from 'react-uuid'


function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])


    // meet key값(=uuid)을 저장하는 곳입니다.
    // const [meetUUID, setMeetUUID] = useState("temp uuid");

    const url = ' https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/sendparticipate';
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            {
            meetUUID = (JSON.parse(data['body'])[0].randomKey);
            db.collection('tayongMessage').doc('chat').collection(meetUUID).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
                console.log(meetUUID);
            })
          }
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