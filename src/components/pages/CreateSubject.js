import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/createuser.css"
import { useEffect, useState } from "react";

const CreateSubject = () => {

  const navigation = useNavigate();
  const [output, setOutput] = useState("");
  const[allFaculty, setAllFaculty] = useState([]);

  useEffect(() => {
    const getAllFaculty = async () => {
      const req = await axios.get(`http://localhost:8080/api/v1/faculty/all`, {withCredentials : true});
      const data = await req.data;
      setAllFaculty(data);
    }
    getAllFaculty();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const subject = {
      subjectCode : formData.get("subject_code"),
      subjectName : formData.get("subject_name"),
      surveyId : formData.get("survey_id"),
      username : formData.get("username")
    }

    const req = await axios.post("http://localhost:8080/api/v1/subject", subject, {withCredentials : true});
    const data = await req.data;
    console.log(data)

    if(data === true){
      return setOutput("Successfully created Subject!")
    } 

    return setOutput("Something went wrong, try again!");


  }


  return(
  <section className="create-card">
    <h1 className="create-card__heading">Create Subject</h1>

    <form onSubmit={(e) => handleSubmit(e)} className="create-card__form">
      <label>Subject Code</label>
      <input placeholder="Subject_Code" className="create-card__input" type="text" name="subject_code" required />

      <label>Subject Name</label>
      <input placeholder="Subject_Name" className="create-card__input" type="text" name="subject_name" required />

      <label>Survey Id</label>
      <input placeholder="Survey_Id" className="create-card__input" type="text" name="survey_id" required />

      <label>Teacher</label>
      <select required name="username" className="create-card__input">
        {allFaculty.map((faculty) => 
          <option key={faculty} value={faculty}>{faculty}</option>
        )}
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

export default CreateSubject;