import { useState } from "react";
import { storage } from "./firebase";
//import update from 'immutability-helper';


function Upload() {
  const [progress, setProgress] = useState(0);
  
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    
  
  };
  
  const uploadFiles = (file) => {
    //
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);

        
      },
       (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  }
  
  return (
    <div class="container2">
  <div class="row">
    <div class="col">
    <div class="container3">
      <h3>Make Your Submission</h3>
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="file" className="inputfile" />
        <button className="btn" type="submit">Upload</button>
      </form>
      <hr />
      <h2>Uploading done {progress}%</h2>
</div></div></div>
<div class="col">
<img className="img3" src="/submit.png"/>
</div>
      
    </div></div>
    
  );
}


export default Upload;
