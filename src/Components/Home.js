import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Home() {
  const [user, setUser] = useState([]);
console.log(user);
  const getdata = async () => {

    const res = await fetch("http://localhost:5000/api/getEmployee", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");

    } else {
        setUser(data)
        console.log("get data");

    }
}

useEffect(() => {
  getdata();
}, [])

const deleteuser = async(id) => {
  const res2 = await fetch(`http://localhost:5000/api/deleteEmployee/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            //setDLTdata(deletedata)
            getdata();
        }
}
  return (
    <>
            {/* {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            } */}
            {/* {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            } */}

            {/* {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            } */}


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <Link to="/addNewUser" className="btn btn-primary">Add data</Link>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                user.map((element) => {
                                    return (
                                        <>
                                            <tr key={element._id}>
                                                
                                                <td>{element.title}</td>
                                                <td>{element.description}</td>
                                                <td>{element.startDate}</td>
                                                <td>{element.endDate}</td>
                                                <td>{element.priority}</td>
                                                <td>{element.status}</td>
                                                <td className="d-flex justify-content-between">
                                                    {/* <Link to={`details/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></Link> */}
                                                    <Link to={`edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></Link>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
  )
}
