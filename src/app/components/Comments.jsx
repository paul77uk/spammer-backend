const Comments = ({comments}) => {
  return (
    <div id="messages">
      {comments.map((comment) => (
        <div className="message" key={comment.id}>
          {comment.text} <span className="clud" >
            ✏️
          </span>
          <span id="cluds">
            <div className="clud" >
              👍0{" "}
            </div>
            <div className="clud" >
              🗑️
            </div>
            <div className="clud">💬</div>
          </span>
        </div>
      ))}
    </div>
  );
}
export default Comments