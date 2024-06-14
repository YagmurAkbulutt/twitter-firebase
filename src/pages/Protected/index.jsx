// alt routeun içeriğini kapsayıcı routea çağırmaya yarayan bileşen
import { Outlet, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../../firebase/config"

const Protected = () => {
    const [isAuth, setIsAuth] = useState()
    useEffect(() => {
        //kullanıcı oturumunu canlı olarak izler oturumda herhangib bir değişim olduğunda 2. parametre olarak gönderdiğimiz fonksiyonu tetikler
        onAuthStateChanged(auth, (user) => {
            //user varsa yetkiyi trueya yoksa falea çek
            setIsAuth(user ? true : false)
        })
    },[])

    //eğer yetkisi yoksa logine yönlendir
    if(isAuth === false) {
        return <Navigate to="/"/>
    }

    //yetkisi varsa child routedaki sayfayı ggöster
  return <Outlet/>
}

export default Protected
