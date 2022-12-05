function Feed(props) {
  return (
    <div className="flex justify-start ml-4 outline-active">
      {props.author ? (
        <span
          onClick={() => {
            props.handleState("myfeed", true);
          }}
          className={`${
            !props.myfeed || props.openTag
              ? "border-gray-400 text-gray-400"
              : "border-blue-900 blue"
          }  cursor-pointer capitalize p-4 border-b-2 border-solid `}
        >
          {props.myArticles ? "Your Articles" : "Your Feed"}
        </span>
      ) : (
        ""
      )}
      <span
        onClick={() => {
          props.handleState("myfeed", false);
        }}
        className={`${
          props.openTag || props.myfeed
            ? "border-gray-400 text-gray-400"
            : "border-blue-900 blue"
        }  cursor-pointer capitalize p-4 border-b-2 border-solid `}
      >
        {props.favouritedFeed ? "Favourited Articles" : "Global Feed"}
      </span>
      {props.openTag ? (
        <span className="blue cursor-pointer capitalize p-4 border-b-2 border-solid border-blue-900">
          #{props.openTag}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
export default Feed;
