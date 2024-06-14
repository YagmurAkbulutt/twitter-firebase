import { useState } from "react"
import {signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {auth, provider} from "./../../firebase/config"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("")
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()

    //form gönderilince
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
            //kaydol modundaysa hesap oluştur
            createUserWithEmailAndPassword(auth, email,pass)
            .then(() => { toast.success("Hesabınız oluşturuldu.");
                navigate('/home')
            })
            .catch((err) => toast.error("Bir sorun oluştu. " + err.code))

        }else {
            //giriş modundaysa giriş yap
            signInWithEmailAndPassword(auth, email, pass).then(() => { toast.success("Hesaba giriş yapıldı.");
                navigate('/home')
            })
            .catch((err) => {
                //eğer giriş bilgileri yanlışsa
                if(err.code === "auth/invalid-credential"){
                    setIsError(true)
                }
                toast.error("Bir sorun oluştu. " + err.code)} )
        }
    }

    //şifremi unuttuma basılınca
    const handleReset = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => toast.info("Şifre sıfırlama e-postası gönderildi. Mailinizi kontrol ediniz."))
        .catch((err) => toast.error("Bir hata oluştu. " + err.code))
    }

    //google ile giriş
    const handleGoogle = () => {
        signInWithPopup(auth, provider)
        .then(() => { toast.success("Hesaba giriş yapıldı.");
            navigate('/home')
        })
        .catch((err) => toast.error("Bir sorun oluştu. " + err.code))

    }




  return (
    <div className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
            <img src="/x-logo.webp" className="h-[60px]" />
        </div>

        <h1 className="text-lg font-bold text-center">Twitter'a Giriş Yap</h1>

        <button onClick={handleGoogle} className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap">
            <img src="/google-logo.svg"  className="h-[20px]"/>
            Google İle Giriş Yap
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>E-Mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]" required/>

            <label className="mt-5">Şifre</label>
            <input onChange={(e) => setPass(e.target.value)} type="password" className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]" required/>

            <button className="cursor-pointer mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">{isSignUp ? 'Kaydol' : 'Giriş Yap'}</button>
        </form>

        <p className="mt-3 text-center">
            <span className="text-gray-500">{isSignUp ? 'Hesabın varsa' : 'Hesabın yoksa'}</span>
            <span onClick={() => setIsSignUp(!isSignUp)} className="ms-2 text-blue-500 cursor-pointer">{isSignUp ? 'Giriş Yap' : 'Kaydol'}</span>
        </p>

        {isError && <button onClick={handleReset} className="text-red-500">Şifremi unuttum</button>}
      </div>
    </div>
  )
}

export default Login
