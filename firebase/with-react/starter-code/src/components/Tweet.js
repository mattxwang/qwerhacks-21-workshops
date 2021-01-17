import {useState} from 'react';

function Tweet(props) {
  const tweetStyle = {
    border: "1px solid white",
    padding: "1em",
    marginTop: "1em"
  };
  const [likes, setLikes] = useState(0);
  const addLike = () => setLikes(likes + 1);
  return (
    <div style={tweetStyle}>
      <p>
        {props.author} says: {props.body}
      </p>
      <p>
        number of likes: {likes}
      </p>
      <button onClick={addLike}>+1!</button>
    </div>
  );
}

export default Tweet;
