function Tweet(props) {
  const tweetStyle = {
    border: "1px solid white",
    padding: "1em",
    marginTop: "1em"
  };
  return (
    <div style={tweetStyle}>
      <p>
        {props.author} says: {props.body}
      </p>
      <p>
        number of likes: {props.likes}
      </p>
      <button onClick={props.addLike}>+1!</button>
    </div>
  );
}

export default Tweet;
