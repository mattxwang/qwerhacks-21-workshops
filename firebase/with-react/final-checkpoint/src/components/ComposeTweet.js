import {useState} from 'react';

function ComposeTweet(props) {
  const [text, setText] = useState("");
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const composeTweet = () => {
    props.createTweet(text);
    setText("");
  }
  return (
    <div>
      <p>write your own tweet</p>
      <input type="text" onChange={handleInput} value={text} />
      <button onClick={composeTweet}>create</button>
    </div>
  )
}

export default ComposeTweet;
