import { MdEdit } from "react-icons/md"
import { FaTrashAlt } from "react-icons/fa"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { toast } from "react-toastify"
import { useState } from "react"
import Modal from "../Modal"

const Dropdown = ({tweet}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleEdit = () => {
    setIsModalOpen(true)

  }

  const handleDelete = () => {
    //silinecek dokümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id)

    //dokümanı koleksiyondan kaldır
    deleteDoc(tweetRef)
    .then(() => toast.info("Tweet silindi."))
    .catch(() => toast.error("Bir sorun oluştu."))

  }
  return (
    <>
    <label className="popup">
  <input type="checkbox" />
  <div className="burger" tabIndex="0">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <nav className="popup-window">
    <legend>Aksiyonlar</legend>
    <ul>
      
      <li>
        <button onClick={handleEdit}>
          <MdEdit/>
          <span>Düzenle</span>
        </button>
      </li>
      <hr />
      <li>
        <button onClick={handleDelete}>
          <FaTrashAlt/>
          <span>Sil</span>
        </button>
      </li>
    </ul>
  </nav>
</label>

{isModalOpen && <Modal tweet={tweet} close={() => setIsModalOpen(false)}/>}
</>
  )
}

export default Dropdown