import { BsCardImage } from "react-icons/bs"
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import { useState } from "react";
import Loader from "../../components/Loader"
import React from "react";
import  upload  from "../../utils/upload";

const Form = ({user}) => {
    const [isLoading, setIsLoading] = useState(false)
    //tweets koleksiyonun referansı 
    const tweetsCol = collection(db, "tweets")

    


    const handleSubmit = async (e) => {
        e.preventDefault();

        //inputtaki verilere eriş
        const text = e.target[0].value;
        const file = e.target[1].files[0];

        //yazı ve resim içeriği var mı diye kontrol et yoksa uyarı ver
        if(!text && !file) {
            return toast.warning("Lütfen içerik giriniz.", {position: "bottom-right"})
        };

        //yükleniyor stateini trueya çek
        setIsLoading(true)

        
        
        try {

            //resim-video varsa storage a yükle
        const url = await upload(file);
        //yeni tweeti koleksiyona ekle (firebase)
        await addDoc(tweetsCol, {
            textContent: text ,
            imageContent: url,
            likes : [],
            isEdited: false,
            createdAt: serverTimestamp(),
            user: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName ,
                photo: auth.currentUser.photoURL,
            }
        })
    } catch (err) {
        toast.error("Tweeti gönderirken sorun oluştu.")
    }

        //yükleniyor stateini false a çek
        setIsLoading(false)

        //formu sıfırla
        e.target.reset()
    }
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 border-b border-zinc-600 p-4">
      <img src={user?.photoURL} alt={user?.displayName} className=" w-[40px] h-[40px] md:h-[50px] md:w-[50px] rounded-full"/>

      <div className="w-full">
        <input className="w-full mt-1 mb-2 bg-transparent outline-none md:text-lg" type="text" placeholder="Neler Oluyor?"/>

        <div className="flex justify-between items-center">
            <label htmlFor="image" className="cursor-pointer text-lg transition p-4 rounded-full hover:bg-gray-800">
            <BsCardImage/>
            </label>
            <input id="image" type= "file" className="hidden"/>
            <button className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">{isLoading ? <Loader/> : "Tweetle"}</button>
        </div>
      </div>
    </form>
  )
}

export default React.memo(Form)
