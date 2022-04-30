import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ManageQuestion = () => {
  
  const[question, setQuestions] = useState([]);
  const[active, setActive] = useState(-1);
  const[edit, setEdit] = useState({id : -1, questionNumber : -1, question : ""});
  const[output, setOutput] = useState("");

  const getAllQuestions = async () => {
    const req = await axios.get(`http://localhost:8080/api/v1/question/all`, {withCredentials : true});
    const data = await req.data;
    setQuestions(data);
  }

  useEffect(() => {
    getAllQuestions();
  },[])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/question/${id}`, {withCredentials : true});
    getAllQuestions();
  }

  const handleOpen = (question) => {
    setActive(1);
    setEdit(question);
  }

  const handleClose = () =>{
    setActive(-1);
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedQuestion =  {
      number : formData.get("question_number"),
      question : formData.get("question")
    }

    const req = await axios.patch(`http://localhost:8080/api/v1/question/${edit.id}`, updatedQuestion, {withCredentials : true});
    const data = await req.data;

    if(data === true){
      setOutput("Successfully Edited!");
      getAllQuestions();
    } else{
      setOutput("Something went wrong")
    }

  }
  
  
  return(
    <section className="manage-container">
    <Link to={"/create-question"}>+</Link>
    <table className="manage-container__table">
      <thead className="manage-container__thead">
        
        <tr className="manage-container__tr">
          <th className="manage-container__th">Question Number</th>
          <th className="manage-container__th">Question</th>
          <th className="manage-container__th">Action</th>
        </tr>
      </thead>

      <tbody>
        {question.map((question) =>
          <tr key={question.id} className="manage-container__tr">
            <td className="manage-container__td">{question.questionNumber}</td>
            <td className="manage-container__td">{question.question}</td>
            <td className="manage-container__td">
              <button onClick={() => handleOpen(question)} className="manage-container__btn --edit">Edit</button>
              {/* <button onClick={() => handleDelete(question.id)} className="manage-container__btn --delete">Delete</button> */}
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
            <label>Question Number</label>
            <input className="edit-container__input" value={edit.questionNumber} onChange={(e) => setEdit({...edit, questionNumber : e.target.value})} type="text" name="question_number" />

            <label>Question</label>
            <input className="edit-container__input" type="text" onChange={(e) => setEdit({...edit, question : e.target.value})} value={edit.question} name="question" />

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

export default ManageQuestion