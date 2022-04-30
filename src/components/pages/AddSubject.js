import axios from "axios";
import { useState } from "react"

const AddSubject = () => {
  
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const subjectJoin = {
      username : formData.get("userId"),
      subject_code : formData.get("subject_code")
    };
    try{
      const req = await axios.post(`http://localhost:8080/api/v1/student/join`, subjectJoin, {withCredentials : true});
      setOutput("Successfully joined subject!");
    } catch(error){
      setOutput("Something went wrong, please check details!");
    }

  
  }
  
  return (
    <section className="create-card">
    <h1 className="create-card__heading">Join Subject</h1>

    <form onSubmit={(e) => handleSubmit(e)} className="create-card__form">
      <label>User Id</label>
      <input placeholder="User Id" className="create-card__input" type="text" name="userId" required />

      <label>Subject Id</label>
      <input placeholder="Subject Id" className="create-card__input" type="text" name="subject_code" required />

      <div className="create-card__buttons">
        <button type="submit" className="create_card__button --confirm">Join</button>
      </div>

      <p className="create-card__output">{output}</p>
    </form>
  </section>
  )
}

export default AddSubject