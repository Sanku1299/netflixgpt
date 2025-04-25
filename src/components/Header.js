import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView, setHomePage } from "../utils/gptSlice";
import { changeLanguage, setOtherURL } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const otherURL = useSelector((store) => store.config.otherURL);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute md:px-10 md:py-2 p-4 md:pt-3 z-10 flex items-center justify-between w-full bg-gradient-to-b from-black from-50%">
      <Link
        to="/"
        onClick={() => {
          dispatch(setHomePage());
          dispatch(setOtherURL(false));
        }}
      >
        <img
          className="w-52 md:w-60 max-w-60 mx-auto md:mx-0 cursor-pointer"
          src={LOGO}
          alt="logo"
        />
      </Link>
      {user && (
        <div className="flex items-center p-2 justify-between">
          {otherURL ? (
            <Link to={"/browse"}>
              <button
                onClick={() => {
                  dispatch(setOtherURL(false));
                }}
                className="bg-purple-800 w-20 mr-2 text-white px-1 sm:px-4 py-1.5 md:w-auto md:text-lg rounded-md"
              >
              Home
              </button>
            </Link>
          ) : (
            <>
              {showGptSearch && (
                <select
                  className="p-2 m-2 bg-gray-900 text-white"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="bg-purple-800 text-white px-3 mr-3 sm:px-4 py-1.5 md:w-auto w-28 md:text-lg rounded-md"
                onClick={handleGptSearchClick}
              >
                {showGptSearch ? "Homepage" : "GPT Search"}
              </button>
            </>
          )}
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;