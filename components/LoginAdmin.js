import React, { useState } from "react";
import classes from "./login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function LoginAdmin({ setLoading }) {
  let [ID, setID] = useState();
  let [PWD, setPWD] = useState();

  const router = useRouter();

  let submitHandler = async () => {
    setLoading(true);
    if (ID.length <= 0 || PWD.length <= 0) {
      setLoading(false);
    }
    const res = await fetch(`http://localhost:3000/api/authadmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID,
        PWD,
      }),
    });
    let response = await res.json();
    if (response.message == "Success!") {
      setLoading(false);
      router.push("./admin");
    } else {
      setLoading(false);
      toast("Register number or dob is wrong");
    }
  };

  return (
    <div className={classes.login}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1
        style={{
          marginBottom: 0,
          borderBottom: "3px solid",
          paddingBottom: "1%",
        }}
      >
        Data Bank Libsoft
      </h1>
      <h2 style={{ color: "green" }}>Admin Login</h2>
      <form>
        <label htmlFor="admin ID">admin ID</label>
        <input
          type="number"
          id="admin ID"
          onChange={(e) => setID(e.target.value)}
        />
        <label htmlFor="pwd">Password</label>
        <input
          type="password"
          id="pwd"
          onChange={(e) => setPWD(e.target.value)}
        />
        <button type="button" onClick={submitHandler}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;
