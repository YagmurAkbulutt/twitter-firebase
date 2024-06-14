import UserInfo from "./UserInfo";
import Dropdown from "./Dropdown";
import Content from "./Content";
import Buttons from "./Buttons";
import { auth } from "../../firebase/config";


const Post = ({ tweet }) => {
  // tweeti oturumu açık olan kullanıcı mı attı
  const isOwn = tweet.user.id === auth.currentUser.uid
  return (
    <div className="flex gap-3 border-b py-6 mx-3 border-zinc-600">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <UserInfo tweet={tweet}/>

          {isOwn && <Dropdown tweet={tweet}/>}
          
        </div>

        <Content tweet={tweet}/>

        <Buttons tweet={tweet}/>
      </div>
    </div>
  );
};

export default Post;
