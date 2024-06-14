import { useEffect, useState } from "react"
import Form from "../../components/Form"
import Post from "../../components/Post"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../firebase/config"
import React from "react"
import Loader from "../../components/Loader"


const Main = ({user}) => {
  const [tweets, setTweets] = useState()

  useEffect(() => {
    //abone olunacak koleksiyonun referansını al
    const tweetsCol = collection(db, "tweets")

    //sorgu ayarlarını yap (en yeni tarihli tweet en üstte)
    const q = query(tweetsCol, orderBy("createdAt" , "desc"))

    // koleksiyondaki verilere abone ol
    onSnapshot(q, (snapshot) => {
      const tempTweets = [];

      snapshot.docs.map((doc) => tempTweets.push({...doc.data(), id:doc.id}))

      setTweets(tempTweets)
    })
  }, [])

  return (
    <main className="border border-zinc-600 overflow-y-auto scrollbar">
      <header className="border-b border-zinc-600 p-4 font-bold">
        Anasayfa
      </header>

      <Form user={user}/>

      {!tweets ? <div className="my-20 flex justify-center scale-[1.5]">
        <Loader/>
      </div> : tweets.map((tweet) => <Post key={tweet.id} tweet={tweet}/> )}
      

    </main>
  )
}

export default Main