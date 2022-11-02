function Feed(props) {
  return (
    <div className="flex justify-start">
      {props.author ? (
        <span
          onClick={() => {
            props.handleState("myfeed", true);
          }}
          className={`${
            !props.myfeed || props.openTag
              ? "border-gray-500 text-gray-500"
              : "border-blue-900 blue"
          }  cursor-pointer ml-4 capitalize p-4 border-b-2 border-solid `}
        >
          Your Feed
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
            ? "border-gray-500 text-gray-500"
            : "border-blue-900 blue"
        }  cursor-pointer ml-4 capitalize p-4 border-b-2 border-solid `}
      >
        Global Feed
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
