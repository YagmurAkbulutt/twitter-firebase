import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useEffect, useState } from "react";

const Feed = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsub();
  }, []);

  return (
    <div className="feed h-screen bg-black ">
      <Nav user={user} />

      <Main user={user} />

      <Aside />
    </div>
  );
};

export default Feed;
