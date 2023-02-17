import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TodoFormProps {
  onSuccess: () => void;
}
const hayu = (param: string) => {
  toast(`${param} succesfully inputed !`);
};

const TodoForm: React.FC<TodoFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  console.log(title);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      toast.info("form cannot empty");
    }
    if (title) {
      try {
        const result = await axios.post(
          "https://jsonplaceholder.typicode.com/todos",
          { title }
        );
        setTitle("");
        onSuccess();
        console.log(result);
        hayu(result.data.title);
      } catch (error) {
        console.error(error);
        console.log("gagal");
      }
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <button type="submit">Add Todo</button>
      <ToastContainer />
    </form>
  );
};

export default TodoForm;
