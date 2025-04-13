export interface modalProps {
  title: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  deskripsi: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  onClose?: () => void;
}

export interface authPros {
  email: string;
  fullName: string;
  password: string;
}
