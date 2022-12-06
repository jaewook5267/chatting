import { Input, Button } from '@material-ui/core';
import React, {useState} from 'react';
import { db, auth } from '../firebase'
// import firebase from 'firebase';
import firebase from 'firebase/compat';

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

     // meet key값(=uuid)을 저장하는 곳입니다.
     const [meetUUID, setMeetUUID] = useState("");

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

    async function sendMessage(e){
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser
        
        // -------------아랫 줄이 변경된 코드입니다. ------------------
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