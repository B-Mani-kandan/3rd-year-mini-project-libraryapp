import React, { useState } from "react";
import classes from "./login.module.css";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginCard() {
  let [Regno, setRegno] = useState();
  let [DOB, setDOB] = useState();

  const [btn, setBtn] = useState("Student");

  const router = useRouter();

  let submitHandler = async () => {
    const res = await fetch(`http://localhost:3000/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Regno,
        DOB,
      }),
    });
    let response = await res.json();
    if (response.message == "Success!") {
      router.push("./dashboard");
    } else {
      toast("Registor number or dob is wrong");
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
      <h2 style={{ color: "green" }}>Student Login</h2>
      <form>
        <label htmlFor="regno">Registor number</label>
        <input
          type="text"
          id="regno"
          onChange={(e) => setRegno(e.target.value)}
        />
        <label htmlFor="DOB">DOB(optional)</label>
        <input type="text" id="DOB" onChange={(e) => setDOB(e.target.value)} />
        <button type="button" onClick={submitHandler}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginCard;
