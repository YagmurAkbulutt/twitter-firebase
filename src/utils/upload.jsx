import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { v4 } from "uuid";
import { toast } from "react-toastify";

// resmi storage a yükleyen fonksiyon
 const upload = async (file) => {
    // dosya resim değilse veya dosya yoksa fonksiyonu durdur
    // dosya ismi image ile başlamıyorsa kontrolü yapıldı
    if(!file?.type.startsWith("image") || !file)
        return null;

    //dosyanın yükleneceği konumun referansını alma
    const imageRef = ref(storage, v4() + file.name);

    //referansı oluşturulan konuma dosya yükle
    try{
        await uploadBytes(imageRef, file)

        //yüklenen dosyanın urlini al return et
        return await getDownloadURL(imageRef)

    } catch (err){
        toast.error("Resim yüklenirken bir sorun oluştu.")
    }
}

export default upload;