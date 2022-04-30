import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ManageSubject = () => {
  

  const[subjects, setSubjects] = useState([]);
  const[active, setActive] = useState(-1);
  const[edit, setEdit] = useState({
    id : -1,
    subjectCode : "",
    subjectName : ""
  });
  const[output, setOutput] = useState("");

  const getAllSubjects = async () => {
    const req = await axios.get("http://localhost:8080/api/v1/subject/all", {withCredentials : true})
    setSubjects(await req.data);
  }
  
  useEffect(() => {
    getAllSubjects()
  },[])

  const handleOpen = (subject) => {
    setActive(1);
    setEdit(subject);
  }

  const handleClose = () =>{
    setActive(-1);
  }
  

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/subject/${id}`, {withCredentials : true})
    getAllSubjects();
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedSubject =  {
      subjectCode : formData.get("subject_code"),
      subjectName : formData.get("subject_name")
    }

    const req = await axios.patch(`http://localhost:8080/api/v1/subject/${edit.id}`, updatedSubject, {withCredentials : true});
    const data = await req.data;

    if(data === true){
      setOutput("Successfully Edited!");
      getAllSubjects();
    } else{
      setOutput("Something went wrong")
    }
  }

  
  return (
    <section className="manage-container">
      <Link to={"/subject-create"}>+</Link>
      <table className="manage-container__table">
        <thead className="manage-container__thead">
          <tr className="manage-container__tr">
            <th className="manage-container__th">Employee ID</th>
            <th className="manage-container__th">Subject Code</th>
            <th className="manage-container__th">Subject Title</th>
            <th className="manage-container__th">Action</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => 
            <tr key={subject.id} className="manage-container__tr">
              <td className="manage-container__td">{subject.employeeId}</td>
              <td className="manage-container__td">{subject.subjectCode}</td>
              <td className="manage-container__td">{subject.subjectTitle}</td>
              <td className="manage-container__td">
                <button className="manage-container__btn --edit" onClick={() => handleOpen(subject)}>Edit</button>
                <button className="manage-container__btn --delete" onClick={() => handleDelete(subject.id)}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {active === 1 &&
      <section className="edit-container">
          <form onSubmit={(e) => handleEdit(e)} className="edit__form">
            <div className="edit__container__buttons">
              <h2 className="edit__container__edit">Edit Table</h2>
              <h3 onClick={handleClose} className="edit__container__close">x</h3>
            </div>
            <label>Subject ID</label>
            <input className="edit-container__input" value={edit.subjectCode} onChange={(e) => setEdit({...edit, subjectCode : e.target.value})} type="text" name="subject_code" />

            <label>Subject Name</label>
            <input className="edit-container__input" type="text" onChange={(e) => setEdit({...edit, subjectTitle : e.target.value})} value={edit.subjectTitle} name="subject_name" />

            <div className="edit__form__buttons">
              <button type="submit" className="edit__form__btn --save">Save Changes</button>
              <button onClick={handleClose} className="edit__form__btn --close">Close</button>
            </div>

            <p className="create-card__output">{output}</p>
          </form>
      </section>
      }



    </section>
  )
}

export default ManageSubject