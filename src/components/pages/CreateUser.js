import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/createuser.css"
import { useState } from "react";

const CreateUser = () => {
  
  const navigation = useNavigate();
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const user = {
      user_id : formData.get("user_id"),
      fullName : formData.get("fullname"),
      email : formData.get("email"),
      password : formData.get("password"),
      userType : formData.get("userType")
    };

    const req = await axios.post("http://localhost:8080/api/v1/student", user, {withCredentials: true});
    if(await req.data === true){
      setOutput("Successfully created");
    } else{
      setOutput("Something went wrong try again!");
    }

  }
  
  
  return (
    <section className="create-card">
      <h1 className="create-card__heading">Register User</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="create-card__form">
        <label>User ID</label>
        <input placeholder="User Id" className="create-card__input" type="text" name="user_id" required />

        <label>Full Name</label>
        <input placeholder="Name" className="create-card__input" type="text" name="fullname" required />

        <label>Email</label>
        <input placeholder="Email@address.com" className="create-card__input" type="text" name="email" required />

        <label>Password</label>
        <input placeholder="Password" className="create-card__input" type="password" name="password" required />

        <label>User Type</label>
        <select required name="userType" className="create-card__input">
          <option>Choose User type</option>
          <option option="ROLE_STUDENT">ROLE_STUDENT</option>
          <option option="ROLE_FACULTY">ROLE_FACULTY</option>
        </select>

        <div className="create-card__buttons">
          <button type="submit" className="create_card__button --confirm">Confirm</button>
          <button className="create_card__button --cancel">Cancel</button>
        </div>

        <p className="create-card__output">{output}</p>


      </form>
    </section>
  )
}

export default CreateUser;