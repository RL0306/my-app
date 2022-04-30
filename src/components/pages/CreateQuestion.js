import axios from "axios";
import { useState } from "react";

const CreateQuestion = () => {
  
  const[output, setOutput] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = {
      number : formData.get("questionNumber"),
      question : formData.get("question")
    }

    const req = await axios.post("http://localhost:8080/api/v1/question", question, {withCredentials : true});
    if(await req.data === true){
      return setOutput("Successfully created Question!")
    }

    setOutput("Something went wrong try again!");
  }
  
  return (
    <section className="create-card">
    <h1 className="create-card__heading">Create Question</h1>

    <form onSubmit={(e) => handleSubmit(e)} className="create-card__form">
      <label>Question Number</label>
      <input placeholder="Question Number" className="create-card__input" type="text" name="questionNumber" required />

      <label>Question</label>
      <textarea placeholder="Question" className="create-card__input" type="text" name="question" required />


      <div className="create-card__buttons">
        <button type="submit" className="create_card__button --confirm">Confirm</button>
        <button className="create_card__button --cancel">Cancel</button>
      </div>

      <p className="create-card__output">{output}</p>


    </form>
  </section>
  )
}

export default CreateQuestion;