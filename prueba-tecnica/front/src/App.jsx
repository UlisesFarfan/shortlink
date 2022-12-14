import { useState, useEffect } from 'react';
import copy from "copy-to-clipboard";
import axios from "axios";
import './App.css';

function App() {
  const [links, setLinks] = useState([])
  const [link, setLink] = useState("")
  const [btn, setBtn] = useState(true)
  // get the above links
  useEffect(() => {
    axios.get(import.meta.env.VITE_BACK_URL)
      .then(res => res.data)
      .then(res => { setLinks(res) })
    return
  }, [])
  //------Handles-------
  const handleLink = (e) => {
    e.preventDefault()
    setBtn(true)
    if (e.target.value.includes(`.`)) {
      setBtn(false)
    }
    setLink(e.target.value)
  }
  const handleCopy = (e) => {
    e.preventDefault()
    copy(e.target.value);
    alert("copied");
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtn(true)
    setLink("")
    let result = await axios.post(`${import.meta.env.VITE_BACK_URL}`, { link: link })
    setLinks([...links, result.data])
  }
  return (
    <div className="App">
      <div className='conteinShort'>
        <h1>shorten your link!</h1>
        <form className='form'>
          <input type="text" className='input' value={link} onChange={(e) => handleLink(e)} />
          <button className='btn' disabled={btn} onClick={(e) => handleSubmit(e)}>Shorten</button>
        </form>
      </div>
      <div className='links'>
        {
          links && links.slice(0).reverse().map(el => {
            return <div key={el._id} className="conteinLinks">
                      <div className='href'>
                        <div className='hContein'>
                          <a href={`${el.link}`} target="_blank">{el.link}</a>
                        </div>
                      </div>
                      <div className='href'>
                        <div className='none'></div>
                        <div className='aContein'>
                          <div className='hContein'>
                            <a href={`${el.key}`} target="_blank">{`${import.meta.env.VITE_FRONT_URL}/${el.key}`}</a>
                          </div>
                          <button value={`${import.meta.env.VITE_FRONT_URL}/${el.key}`} className="btn" onClick={(e) => handleCopy(e)}>COPY</button>
                        </div>
                      </div>
                    </div>
          })
        }
      </div>
    </div>
  )
}

export default App
