import React from "react";
import DataTable from "react-data-table-component";
import { FaPen } from "react-icons/fa";
import clsx from "clsx";
import { useState, useEffect } from "react";
const data = [];

export default function Details() {
  const columns = [
    {
      name: "",
      cell: (row) => <input type="checkbox" />,
      width: "50px",
    },
    {
      name: "CUSTOMER NAME",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <img src={row.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-gray-800">{row.name}</span>
        </div>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: "COMPANY",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "ORDER VALUE",
      selector: (row) => row.orderValue,
    },
    {
      name: "ORDER DATE",
      selector: (row) => row.orderDate,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={clsx("px-3 py-1 rounded-full text-sm font-medium", {
            "bg-blue-100 text-blue-600": row.status === "New",
            "bg-yellow-100 text-yellow-600": row.status === "In-progress",
            "bg-green-100 text-green-600": row.status === "Completed",
          })}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <button
          onClick={() => handleEditClick(row)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaPen />
        </button>
      ),
      width: "60px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#f9fafb",
      },
    },
    rows: {
      style: {
        minHeight: "56px",
      },
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    company: "",
    orderValue: "",
    orderDate: "",
    status: "New",
    avatar: "",
  });
  const [userData, setUserData] = useState(data); // Dùng để render bảng

  const handleEditClick = (row) => {
    setNewUser({
      id: row.id, // Gán id khi chỉnh sửa
      name: row.name,
      company: row.company,
      orderValue: row.orderValue,
      orderDate: row.orderDate,
      status: row.status,
      avatar: row.avatar,
    });
    setIsModalOpen(true); // Mở modal để chỉnh sửa
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddClick = () => setIsModalOpen(true);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let res;

      if (newUser.id !== undefined && newUser.id !== null) {
        const userId = newUser.id.toString();

        res = await fetch(`http://localhost:5000/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      } else {
        res = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      }

      if (!res.ok) throw new Error("Không thể lưu người dùng");

      const savedUser = await res.json();

      setUserData((prevData) => {
        const exists = prevData.some(
          (user) => user.id.toString() === savedUser.id.toString()
        );
        return exists
          ? prevData.map((user) =>
              user.id.toString() === savedUser.id.toString() ? savedUser : user
            )
          : [...prevData, savedUser];
      });

      setIsModalOpen(false);
      setNewUser({
        name: "",
        company: "",
        orderValue: "",
        orderDate: "",
        status: "New",
        avatar: "",
        id: undefined,
      });
    } catch (error) {
      console.error("Lỗi khi lưu người dùng:", error);
      alert("Không thể lưu người dùng. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="flex mb-10">
        <img src="src/assets/img/File text 1.png" alt="" />
        <h2 className="font-bold ml-3 mr-245 text-2xl">Detailed report</h2>
        <button
          onClick={handleAddClick}
          className="min-w-[100px] rounded-md border border-gray-400 text-base font-medium transition-colors"
        >
          Add
        </button>
      </div>
      <div className="rounded-lg border overflow-hidden shadow-sm">
        <DataTable
          columns={columns}
          data={userData}
          pagination
          customStyles={customStyles}
          highlightOnHover
          responsive
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
            <h3 className="text-xl font-semibold">
              {newUser.name ? "Edit User" : "Add New User"}
            </h3>
            <input
              name="name"
              value={newUser.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded"
            />
            <input
              name="company"
              value={newUser.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-full border p-2 rounded"
            />
            <input
              name="orderValue"
              value={newUser.orderValue}
              onChange={handleChange}
              placeholder="Order Value"
              className="w-full border p-2 rounded"
            />
            <input
              name="orderDate"
              value={newUser.orderDate}
              onChange={handleChange}
              placeholder="Order Date (DD/MM/YYYY)"
              className="w-full border p-2 rounded"
            />
            <input
              name="avatar"
              value={newUser.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-blue-500 text-white rounded"
              >
                {newUser.name ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
