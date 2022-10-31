function Feed(props) {
  return (
    <div className="flex justify-start">
      <span
        onClick={() => {
          props.handleState("openTag", "");
        }}
        className={`${
          props.openTag
            ? "border-gray-500 text-gray-500"
            : "border-blue-900 blue"
        }  cursor-pointer ml-4 capitalize p-4 border-b-2 border-solid `}
      >
        global feed
      </span>
      {props.openTag ? (
        <span className="blue cursor-pointer ml-4 capitalize p-4 border-b-2 border-solid border-blue-900">
          #{props.openTag}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
export default Feed;
