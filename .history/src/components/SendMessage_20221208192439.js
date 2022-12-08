import { Input, Button } from '@material-ui/core';
import React, {useState, useParams} from 'react';
import { db, auth } from '../firebase'
// import firebase from 'firebase';
import firebase from 'firebase/compat';

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

     // meet key값(=uuid)을 저장하는 곳입니다.
     const [meetUUID, setMeetUUID] = useState("temp uuid");

     let param = useParams();
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
           console.log("chatting Room ID!",{meetUUID});
         });
       }, [])
     
    async function sendMessage(e){
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser
        
         // -------------아랫 줄이 변경된 코드입니다. meetUUID를 이름으로 갖는 새 컬렉션이 chat 문서 안에 생깁니다. (파이어베이스)------------------
        await db.collection('tayongMessage').doc('chat').collection(meetUUID).add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage