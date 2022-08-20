import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [priority, setPriority] = useState('High');
    const [status, setStatus] = useState('Active');

    const navigate = useNavigate()

    const addinpdata = async(e) => {
        e.preventDefault();
        // console.log(title,description,startDate, endDate, priority, status)
        // const { name, email, work, add, mobile, desc, age } = inpval;

        const res = await fetch("http://localhost:5000/api/postEmployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,description,startDate, endDate, priority, status
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            navigate("/")
            // setUdata(data)
            console.log("data added");

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
                    
                    

                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </>
  )
}
