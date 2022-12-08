import React, {useState, useEffect, useRef} from "react";
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import uuid from 'react-uuid'


function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])

    // meet key값(=uuid)을 저장하는 곳입니다.
    // const [meetUUID, setMeetUUID] = useState("");

    // meet key값을 받아올 url을 적어주세요(백엔드에서 제공해주시는 aws RDS 주소가 들어갑니다)
    const url = "";

    // 바로 아래 코드를 맨 위에 적어주시고(저희 기존의 react 파일과 합친 이후)
    // import getData from '../../service/getData';  

    // getData로 data를 받아옵니다. 잘 받아와지지 않는다면 console.log(data)를 then 안에 넣어서 data 형태를 보고 코드를 수정해주세요. (사용하실 때 아래부터 주석 푸시면 됩니다.)
    // getData(url)
    // .then(data => {
    //     console.log(data.data['randomKey']);
    //     randomKey = data.data['randomKey'];
    //     setMeetUUID(randomKey);
    //   })  

    

    useEffect(() => {
         // -------------아랫 줄이 변경된 코드입니다. meetUUID를 이름으로 갖는 새 컬렉션이 chat 문서 안에 생깁니다. (파이어베이스)------------------
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