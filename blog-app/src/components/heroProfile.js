import { NavLink } from "react-router-dom";

export default function HeroProfile(props) {
  let { username, email, bio, image } = props.user;
  return (
    <>
      <div className="bg-creme relative p-4 ">
        <div className="flex items-center flex-col justify-evenly ">
          <div className="flex items-center">
            <img
              className="w-16  rounded-2xl h-16"
              src={image}
              alt={username}
            ></img>
            <h1 className="medBlue text-3xl capitalize p-3">{username}</h1>
          </div>
          <a
            className="  text-xl p-3"
            href="/"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            {email}
          </a>
          <p className="text-lg">{bio}</p>
        </div>
        {props.follow ? (
          <NavLink
            to="/follow"
            className="absolute bottom-2 right-4 p-2 underline pink text-base"
          >
            Follow
          </NavLink>
        ) : (
          <NavLink
            to="/settings"
            className="absolute bottom-2 right-4 p-2 underline pink text-base"
          >
            Update settings
          </NavLink>
        )}
      </div>
    </>
  );
}
