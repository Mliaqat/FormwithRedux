import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dataActions } from '../store/dataSlice';



const DisplayData = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const goBackHandler = () => {
    nav('/')
  }
  const deleteHandler = (id) => {
    dispatch(dataActions.deleteData(id))
  }

  let Incomingdata = useSelector((state) => state.data)
  console.log('data show ', Incomingdata[0]);
  let data = Incomingdata[0];

  return (<div>
    <table >
      <thead>
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Email</td>
          <td>Password</td>
          <td>Confirm Password</td>
          {/* <td>Action</td> */}

        </tr>
      </thead>

      {data?.map((item, index) => {
        return (
          <tbody className='form-contbodyol' key={index} >
            <tr>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.confirmPassword}</td>
              {/* <td><button onClick={() => deleteHandler(item.id)} >Delete</button></td> */}
            </tr>
          </tbody>
        )
      })}
    </table>


    <button onClick={goBackHandler}>Go to Home</button>

  </div>

  )
}

export default DisplayData