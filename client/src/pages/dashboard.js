import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formData;
  const user = JSON.parse(localStorage.getItem("user"));
  const [todo, setTodo] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("/api", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data) {
        setTodo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: description }),
      });

      const data = await res.json();
      if (data) {
        toast.success("task added successfully");
      }
    } catch (error) {
      toast.error("oops!some error occured");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: description }),
      });

      const data = await res.json();
      if (data) {
        toast.success("task deleted successfully");
      }
    } catch (error) {
      toast.error("oops!some error occured");
    }
  };

  const showTask = () => {
    setOpen(!open);
  };

  const del = (id) => {
    deleteUser(id);
  };
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex-col cont gap-5 justify-center items-center my-2">
        <h1 className="font-extrabold text-3xl">
          {user ? `Hi,${user.name} your todo list` : ``}
        </h1>
        <button
          onClick={showTask}
          className="text-sm p-2
       bg-black text-white rounded-md"
        >
          {open ? `close` : `show task`}
        </button>
        {open ? (
          <div>
            {todo.data !== null ? (
              todo.data.map((d) => {
                const { title, description, _id, createdAt } = d;
                const create = createdAt.toString().split("T")[0];
                return (
                  <article
                    className="flex-col justify-center 
                items-center rounded-md h-[100px] p-4 shadow-2xl my-4"
                  >
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <p>{description}</p>
                    <p>{create}</p>
                    <div className="flex gap-[1rem] p-4">
                      <button className="text-red-600">
                        <FaTrash size={20} onClick={() => del(_id)} />
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <h1 className="text-2xl text-center">
                oops!you haven't set any task yet
              </h1>
            )}
          </div>
        ) : (
          <div className="flex-col cont gap-5 justify-center items-center my-2">
            <h1 className="text-xl font-bold">
              {isEdit ? "Edit Task" : "Add Task"}
            </h1>
            <form
              className="shadow-2xl rounded-md  m-8 p-4"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-6 justify-evenly">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  placeholder="Enter your task"
                  className="p-4 border-black border-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-6 justify-evenly">
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter descripiton if any"
                  className="p-4 border-black border-2 
           rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="p-2 text-white bg-black
            hover:text-black hover:bg-slate-400
           duration-100 rounded-md hover:p-3"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
