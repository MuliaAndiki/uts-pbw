import { modalProps } from "@/app/type";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Modal: React.FC<modalProps> = ({
  title,
  icon = "success",
  deskripsi,
  confirmButtonText = "OK",
  confirmButtonColor = "#3085d6",
  onClose,
}) => {
  const showModal = () => {
    Swal.fire({
      title,
      text: deskripsi,
      icon,
      confirmButtonText,
      confirmButtonColor,
      background: "#0d222f",
      color: "#ffffff",
    }).then(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  useEffect(() => {
    showModal();
  }, []);

  return null;
};

export default Modal;
