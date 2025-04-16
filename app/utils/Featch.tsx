import API from "./API";
const fetchTodos = (token: string, setTodos: any) => {
  API.get("/todo/getAllTodos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      setTodos(res.data.data);
    })
    .catch((err) => {
      console.log("Gagal ambil todos", err.response?.data || err.message);
    });
};

export default fetchTodos;
