import {useState} from 'react';

function UserCreation(props) {
  const [text, setText] = useState("");
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const createUser = () => {
    props.createUser(text);
    setText("");
  }
  return (
    <div>
      <p>introduce yourself</p>
      <input type="text" onChange={handleInput} value={text} />
      <button onClick={createUser}>create</button>
    </div>
  )
}

export default UserCreation;
