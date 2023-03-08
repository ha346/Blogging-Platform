import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const About = () => {

  const navigate = useNavigate()
  const [token, setToken] = useState(false)
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      setToken(true)
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line
  },[]) 

  return (
    
    <>
      {token?
    <div> 
          <div className="container">
    <div className="jumbotron">
        <h1 className="display-4">About iNotebook</h1>
        <h4>An extension of your brain</h4>
        <p className="lead">We recognized three things the human brain does: it remembers the past, builds connections, and creates new ideas for the future.</p>
        <hr className="my-4" />

        <h2>Remember everything</h2>
        <p>iNotebook was founded to address a growing problem that technology helped to create: how to succeed in a world where the volume and velocity of information are constantly increasing.</p>

        <h2>Accomplish anything</h2>
        <p>People today are overwhelmed with information, and anxious about how to handle it all. iNotebook helps people find focus now, in the moment, to make progress on what matters most.</p>

        <h2>Become ever better</h2>
        <p>iNotebook launched the digital personal productivity movement, and has been growing ever since. More than 225 million people around the world have discovered iNotebook, which is used in over 25 languages every day.</p>

        <h2>Many backgrounds, one Evernote.</h2>
        <p>We believe that different perspectives lead to better ideas. We’re continually working to create a more trusting and collaborative environment within iNotebook where all employees can be their authentic selves.</p>

        <a className="btn btn-primary btn-lg" href="/" role="button">Try iNotebook </a>
      </div>
</div>  

          
        </div>
       :<></>}
    </>
  );
};

export default About;

// import React,{useContext,useEffect} from 'react'
// import NoteContext from '../Context/NoteContext'
// const About = () => {
//   const a = useContext(NoteContext);
//    useEffect(() => {
//      a.update();
//      // eslint-disable-next-line
//    }, [])
//   return (
//     <div>
//       This is about {a.state.name} and he is in className {a.state.className}
//     </div>
//   )
// }

// export default About;
