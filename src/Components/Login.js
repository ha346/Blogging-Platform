import React,{useState} from 'react' 
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
 
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await response.json();
        // console.log("LOGIN: ", json);
        if (json.success)
        {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            setCredentials({ email: "", password: "" });
            navigate('/');
            props.showAlert("Logged In Succesfully", "success");
            
        }
        else
        {
            props.showAlert("Invalid UserId/Password", "danger");
            setCredentials({ email: "", password: "" });
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials,[e.target.name]:e.target.value })
    }

  return (
      <div className='container mt-2'>
          <h2 className='mt-2'>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div> 
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
       </form>
    </div>
  )
}

export default Login
