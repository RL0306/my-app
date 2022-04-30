import "../style/studentLogin.css"
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacultyLogin =  () => {
  
  const[output, setOutput] = useState("");
  const [user, setUser] = useContext(UserContext)
  const navigation = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try{
      const req = await axios.post("http://localhost:8080/api/v1/faculty/login", {username : formData.get("user_id"), password : formData.get("password")}, {withCredentials : true});
      const data = await req.data;
      if(data.authentication === "success"){
        // console.log("in?")
        setOutput("Successfully logged in. Redirecting you to home!");
        const facultyLoggedInReq = await axios.get("http://localhost:8080/api/v1/faculty", {withCredentials : true})
        const facultyData = await facultyLoggedInReq.data;


        setTimeout(() => {
          setUser(facultyData);
          sessionStorage.setItem("auth", JSON.stringify(facultyData));
          navigation("/home");
        }, 3000)
      }

    } catch(error){
      setOutput("Login failed, try again!");
    } 

  }
  
  return (
    <section className="student">
      <div className="student__card">
        <img className="student__card__image" src="/logo2.jpg" alt="" />

        <div className="student__card__signin">
          <img className="student__card__logo" src="/logo.png" alt="" />
          <h3 className="student__card__heading">Sign in to your account</h3>
          <form onSubmit={(e) => handleLogin(e)} className="student__card__form" action="">
            <input className="student__card__input" placeholder="user_id" type="text" name="user_id" id="" />
            <input className="student__card__input" placeholder="password" type="password" name="password" id="" />
            <button type="submit" className="student__card__btn">Login</button>
            <p className="student__card__output">{output}</p>
          </form>
        </div>
      </div>
    </section>  
  )
}

export default FacultyLogin;