import axios from "axios"
import { useEffect, useState } from "react"
import "../style/manager.css"
import { Link } from "react-router-dom"

const ManageUser = () => {

  const[users, setUsers] = useState([]);
  const[active, setActive] = useState(-1);
  const[edit, setEdit] = useState({
    user_id : "",
    name : "",
    user_type : ""
  });

  const getAllPeople = async () => {
    const req = await axios.get("http://localhost:8080/api/v1/admin/all", {withCredentials : true});
    const data = await req.data;
    setUsers(data);
  }

  useEffect(() => {
    getAllPeople();
  },[])

  const handleOpen = (user) => {
    setActive(1);
    
    setEdit({
      id : user.id,
      user_id : user.username,
      fullName : user.fullName,
      user_type : user.role
    })
  }

  const handleClose = () => {
    setActive(-1);
  }

  const handleDelete = async (id) => {
    const req = await axios.delete(`http://localhost:8080/api/v1/student/${id}`, {withCredentials : true});
    getAllPeople();
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const editData = {
      user_id : formData.get("user_id"),
      name : formData.get("fullname"),
      userType : formData.get("user_type")
    }
    console.log(editData);
    await axios.patch(`http://localhost:8080/api/v1/student/${edit.id}`, editData, {withCredentials:true});
  } 

  

  return (
    <section className="manage-container">
      <Link to={"/user-create"}>+</Link>
      <table className="manage-container__table">
        <thead className="manage-container__thead">
          <tr className="manage-container__tr">
            <th className="manage-container__th">User_Id</th>
            <th className="manage-container__th">Name</th>
            <th className="manage-container__th">User_Type</th>
            <th className="manage-container__th">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) =>
            <tr key={user.id} className="manage-container__tr">
              <td className="manage-container__td">{user.username}</td>
              <td className="manage-container__td">{user.fullName}</td>
              <td className="manage-container__td">{user.role}</td>
              <td className="manage-container__td">
                <button className="manage-container__btn --edit" onClick={() => handleOpen(user)}>Edit</button>
                <button className="manage-container__btn --delete" onClick={() => handleDelete(user.id)}>Delete</button>
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
            <label>User Id</label>
            <input className="edit-container__input" value={edit.user_id} onChange={(e) => setEdit({...edit, user_id : e.target.value})} type="text" name="user_id" />

            <label>Name</label>
            <input className="edit-container__input" type="text" onChange={(e) => setEdit({...edit, fullName : e.target.value})} value={edit.fullName} name="fullname" />

            <label>User Type</label>
            <input className="edit-container__input" type="text" value={edit.user_type} onChange={(e) => setEdit({...edit, user_type : e.target.value})} name="user_type"/>

            <div className="edit__form__buttons">
              <button type="submit" className="edit__form__btn --save">Save Changes</button>
              <button onClick={handleClose} className="edit__form__btn --close">Close</button>
            </div>
          </form>
      </section>
      }


      


    </section>
  )
}

export default ManageUser