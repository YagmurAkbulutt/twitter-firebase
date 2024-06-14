import { doc, updateDoc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import upload from "../../utils/upload";

const Modal = ({ tweet, close }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    //inputlardaki verilere eriş
    const text = e.target.title.value;
    const file = e.target.file.files[0];

    //güncellenecek dokümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    try {
      //eğer fotoğraf seçilmediyse sadece yazıyı değiştir
      if (!file && !file?.type.startsWith("image")) {
        await updateDoc(tweetRef, {
          textContent: text,
          isEdited: true,
        });
        toast.success("Tweet güncellendi.");
      } else {
        //fotoğraf seçildiyse hem yazı hem fotoğrafı güncelle

        //seçilen fotoğrafı storagea yükle
        const newUrl = await upload(file);

        //belgenin hem yazı hem fotoğraf değerini güncelle
        await updateDoc(tweetRef, {
          textContent: text,
          imageContent: newUrl,
          isEdited: true,
        });
      }
      toast.success("Tweet başarıyla güncellendi.");
    } catch (err) {
      toast.error("Bir sorun oluştu.");
    }
    //modalı kapat
    close();
  };
  return (
    <div className="bg-gray-500 bg-opacity-50 w-full h-full fixed inset-0 grid place-items-center">
      <div className="w-3/4 min-h-[60vh] max-h-[80vh] bg-black rounded-md py-10 px-5 flex flex-col max-w-[90vh]">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Tweet'i Düzenle</h1>
          <button onClick={close}>
            <IoMdClose className="text-2xl hover:text-gray-500 transition" />{" "}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col mt-10 justify-between"
        >
          <div className="flex flex-col">
            <label className="mb-5 underline underline-offset-8">
              İçeriği Değiştir
            </label>
            <input
              name="title"
              defaultValue={tweet.textContent}
              className="border rounded-md p-1 text-black"
              type="text"
            />

            <label className="mt-10 mb-5 underline underline-offset-8">
              Fotoğrafı Değiştir / Ekle{" "}
            </label>
            <input name="file" type="file" />
          </div>

          <div className="flex justify-end mt-10 gap-3">
            <button
              className="bg-gray-500 py-2 px-5 rounded-full hover:bg-gray-600"
              type="button"
              onClick={close}
            >
              Vazgeç
            </button>
            <button
              className="bg-blue-500 py-2 px-5 rounded-full hover:bg-blue-600"
              type="submit"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
