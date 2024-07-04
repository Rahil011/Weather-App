
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import { useState } from 'react';
import logo from './logo.png'
import logo2 from './logo2.png'
import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


function App() {
  // State for value 

  let [inputCity, setInputcity] = useState('')
  let [wDetails, setWdetails] = useState()
  let [loader, setloader] = useState(false)
  let [message, setMessage] = useState('')
  let [active, setActive] = useState(false)
  let [btndisable , setBtndisable] = useState(false)

  let handelWeather = (e) => {
    e.preventDefault()
    setloader(true)
    setMessage('')
    setWdetails()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=70d8cbfc766c547ed3c7443b82543244&units=metric`, { method: 'GET' })
      .then((res) => res.json())
      .then((finalData) => {
        if (finalData.cod != 200) {
          console.log(finalData.code)
          setMessage('City Not Found')
          setloader(false)
        }
        else {
          setloader(false)
          setWdetails(finalData)
          setInputcity('')
        }
      })
      .catch((e) => { console.log(e) })
  }

  let activeAll = () => {
    setActive(true)
    setMessage('Enter City')
    setBtndisable(true)
  }
  return (
    <div className='main'>
      <div className={`left ${active ? 'activeleft' : ''} `}>
        <h3><img src={logo} /></h3>
        <div className='top'>
          <form onSubmit={handelWeather}>
            <input type='text' value={inputCity} onChange={(e) => setInputcity(e.target.value)} placeholder="Enter City Name"/>
            <button> <FontAwesomeIcon icon={faMagnifyingGlass} className='searchicon' /> </button>
          </form>
        </div>

      </div>
      <div className='right'>

        <div className={`bottom ${btndisable ? 'changebottombg' : ''}`}>
          <div className={`loader ${loader ? '' : 'loaderdisable'}`}></div>
          {wDetails == undefined ?

            <h4 className='text-dark fw-bolder'>{message}</h4>
            :
            <>
              <div className='city'>
                <h3 className='text-dark fw-bolder'> {wDetails.name} <span style={{ backgroundColor: 'seagreen', padding: "6px", borderRadius: "10px" }}>{wDetails.sys.country}</span></h3>
              </div>
              <div className='img'>
                <img src={`https://openweathermap.org/img/wn/${wDetails.weather[0].icon}.png`} width={'100%'} />
              </div>
              <div className='desc'>
                <h5 className='text-dark fw-bolder'>{wDetails.weather[0].description}</h5>
              </div>
              <div className='temp'>
                <h1 className='text-dark fw-bolder'>{wDetails.main.temp}&deg; C</h1>
              </div>

            </>

          }
        </div>
      </div>

      <div className={`starter ${btndisable ? 'btndisable' : ''}`}>
      <h1><img src={logo2} /></h1>
      <button onClick={activeAll} className={`start ${btndisable ? 'btndisable' : ''}`} >LET'S START <FontAwesomeIcon icon={faArrowRight} /> </button>

      </div>
      
    </div>
  )
}

export default App;
