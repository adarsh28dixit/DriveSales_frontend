import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({})
    const [title, setTitle] = useState(userDetail.title);
    const [description, setDescription] = useState(userDetail.description);
    const [startDate, setStartDate] = useState(userDetail.startDate);
    const [endDate, setEndDate] = useState(userDetail.endDate);
    const [priority, setPriority] = useState(userDetail.priority);
    const [status, setStatus] = useState(userDetail.status);

    const getdata = async () => {

        const res = await fetch(`http://localhost:5000/api/getEmployee/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        setUserDetail(data)
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            //setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const updateData = async(e) => {
        e.preventDefault();

        

        const res2 = await fetch(`http://localhost:5000/api/putEmployee/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                title,description,startDate, endDate, priority, status
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate("/")
            //setUPdata(data2);
        }
    }
  return (
    <>
   <div className="container">
            <Link to="/">home</Link>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} name="startDate" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} name="endDate" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Priority</label>
                        <select className="mb-3 col-lg-6 col-md-6 col-12 ml-3" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option>High</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Status</label>
                        <select className="mb-3 col-lg-6 col-md-6 col-12 ml-3" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    
                    

                    <button type="submit" onClick={updateData} className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </>
  )
}
