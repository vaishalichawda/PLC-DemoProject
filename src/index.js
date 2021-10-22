import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Student from './Mycomponent/Student';


ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Element/> */}
  </React.StrictMode>,
  // // [
  // <>
  //   <h4>hello new</h4>,
  //   <p> finally multiple done</p>
  //   <Li/>     //function component example
  // </>,
  // // ],
  document.getElementById('root')
  // document.getElementById('myDivOne')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Student />
//   </React.StrictMode>,
 
//   document.getElementById('stu')
// );
//  ReactDOM.unmountComponentAtNode(document.getElementById('root')  );



// create react element code here...(pure javascript code)
// var h6 = document.createElement("h6");
// h6.innerHTML = "hello new element render method create self element";
// document.getElementById("root").appendChild(h6);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
