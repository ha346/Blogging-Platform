import React from 'react'; 
import Notes from './Notes';
const Home = (props) => {
  return (
    <div>
      {/* {props.showAlert("Welcome To iNotebook", "success")} */}
      <Notes showAlert={props.showAlert} /> 
    </div>
  )
}

export default Home;

// rfc ---> react function based component.
// rcc ---> react class based component.
// rafce ---> 
 
