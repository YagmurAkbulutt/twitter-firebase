import { LuMessageCircle } from "react-icons/lu";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebase/config";

const Buttons = ({tweet}) => {
  //oturumu açık olan kullanıcı tweeti likeladı mı
  const isLiked = tweet.likes.includes(auth.currentUser.uid)



  // like durumunu tersine çevirir
  const toggleLike = () => {
      //güncellenecek dokümanın referansını alma
  const tweetRef = doc(db, "tweets", tweet.id)

  
    updateDoc(tweetRef, {
      likes: isLiked 
      //eğer like varsa likes dizisinden oturumu açık olan kullanıcnın idsini kaldır
      ? arrayRemove(auth.currentUser.uid) 
      //eğer like yoksa dizide aynı elemandan bir tane like ekler. kullanıcının tek bir likeını alır. kullanıcının idsini ekle
      : arrayUnion(auth.currentUser.uid),
    })
  }

  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00a6ff43]">
        <LuMessageCircle />
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#04ff0031]">
        <FaRetweet />
      </div >
      <div onClick={toggleLike} className="flex items-center gap-2 p-3 rounded-full cursor-pointer transition hover:bg-[#ff000064]">
       
        {isLiked ? <FaHeart className="text-red-500"/> : <FaRegHeart />}
        
        {tweet.likes.length}
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#83898d43]">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
