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

export interface todosPros {
  _id: any;
  text: any;
  onCheckList: any;
}

export interface tokenPros {
  token: any;
}

export interface returnPros {
  todo: todosPros;
  index: number;
}
