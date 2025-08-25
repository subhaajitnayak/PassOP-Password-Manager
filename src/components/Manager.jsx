import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast.success(" Copy to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: "Bounce"
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id: uuidv4()}]));
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" })
  };
  const editPassword = (id) =>{
    console.log("Editing Password with: ", id);
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    
  }
  const deletePassword = (id) => {
    console.log("Deleted Password with: ", id);
    let conf = confirm("Do you really want to delete this password")
    if(conf){
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
    
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition={Bounce}
      />
      <div class="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className=" mycontainer ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-600">&lt;</span>
          <span>Pass</span>
          <span className="text-green-600">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-600 w-[150vh] p-4 py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-[150vh] justify-around gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-600 w-full p-2 py-1"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-600 w-full p-2 py-1"
                type="password"
                name="password"
                id=""
              />
              <span
                className="absolute right-[6px] top-[10px] cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} py-1 width={25} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 rounded-full w-fit px-8 py-2 
          hover:bg-green-400 border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords flex flex-col justify-center items-center p-6">
          <h2 className="font-bold text-3xl py-4">Add Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-[150vh] rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-300">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center border border-white">
                        <div className="flex justify-center items-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-4 cursor-pointer "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "21px" }}
                              src="https://cdn.lordicon.com/xyvcjupc.json"
                              trigger="hover"
                              colors="primary:#b4b4b4,secondary:#848484,tertiary:#000000"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 text-center min-w-32 border border-white">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <div
                            className="lordiconcopy size-4 cursor-pointer "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "21px" }}
                              src="https://cdn.lordicon.com/xyvcjupc.json"
                              trigger="hover"
                              colors="primary:#b4b4b4,secondary:#848484,tertiary:#000000"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center min-w-32 border border-white">
                        <div className="flex items-center justify-center">
                          {item.password}
                          <div
                            className="lordiconcopy size-4 cursor-pointer "
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "21px" }}
                              src="https://cdn.lordicon.com/xyvcjupc.json"
                              trigger="hover"
                              colors="primary:#b4b4b4,secondary:#848484,tertiary:#000000"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center min-w-32 border border-white ">
                        <div className="flex items-center justify-center gap-6">
                          <span className="cursor-pointer" onClick={() => {editPassword(item.id)}}>
                            <lord-icon
                              style={{ width: "25px", height: "21px" }}
                              src="https://cdn.lordicon.com/cbtlerlm.json"
                              trigger="hover"
                              colors="primary:#ffffff,secondary:#000000,tertiary:#000000,quaternary:#000000,quinary:#848484"
                            ></lord-icon>
                          </span>
                          <span className="cursor-pointer" onClick={() => {deletePassword(item.id)}}>
                            <lord-icon
                              style={{ width: "25px", height: "21px" }}
                              src="https://cdn.lordicon.com/sxhqklqh.json"
                              trigger="hover"
                              colors="primary:#ffffff,secondary:#000000,tertiary:#000000"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
