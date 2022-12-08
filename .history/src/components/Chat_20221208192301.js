import React, {useState, useEffect, useRef, useParams} from "react";
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import uuid from 'react-uuid'


function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])


    // meet key값(=uuid)을 저장하는 곳입니다.
    const [meetUUID, setMeetUUID] = useState("temp uuid");

    useEffect(() => {
        fetch('https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/getmeetdetail')
        .then(res => res.json())
        .then(data => {
          var k=0;
          for (var i = 0; i < JSON.parse(data['body']).length; i++) {
            if(JSON.parse(data['body'])[i].randomKey==param['*'].split('/')[0]){     // 이제 제목이 아닌 randomKey로 해당 모임 정보를 가져옵니다!
                k=i;
                
            }
          }
          setMeetUUID(JSON.parse(data['body'])[k].randomKey);   // randomKey를 meetDetail에서도 받아와서 갖고 있습니다.
          console.log("here!",{meetUUID});
        });
      }, [])
    

    useEffect(() => {
         // -------------아랫 줄이 변경된 코드입니다. meetUUID를 이름으로 갖는 새 컬렉션이 chat 문서 안에 생깁니다. (파이어베이스)------------------
        db.collection('tayongMessage').doc('chat').collection(meetUUID).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
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