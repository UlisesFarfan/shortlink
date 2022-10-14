import { useState, useEffect } from 'react';
import copy from "copy-to-clipboard";
import axios from "axios";
import { useParams } from "react-router-dom";
import './App.css'

function App() {
  const [links, setLinks] = useState([])
  const [link, setLink] = useState("")
  const [btn, setBtn] = useState(true)
  const { key } = useParams()
  key ? axios.get(`/?webKey=${key}`).then(res => console.log(res.data)) : null

  // get the above links
  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => res.data)
      .then(res => { setLinks(res) })
    return
  }, [])

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
    let result = await axios.post(`${import.meta.env.VITE_BACK_URL}`, { link: link })
    setLinks([...links, result.data])
  }
  return (
    <div className="App">
      <div className='contein'>
        <h1>shorten your link!</h1>
        <form className='form'>
        <input type="text" className='input' value={link} onChange={(e) => handleLink(e)} />
        <button className='btn' disabled={btn} onClick={(e) => handleSubmit(e)}>Shorten</button>
        </form>
        <div className='links'>
        {
          links && links.slice(0).reverse().map(el => {
            return <div key={el._id} className="conteinLinks">
            <a href={`http://${el.link}`} target="_blank" rel="noopener noreferrer">{el.link}</a>
            <div className='href'>
            <a href={`${el.key}`}>{`${import.meta.env.VITE_FRONT_URL}/${el.key}`}</a>
            <button value={`${import.meta.env.VITE_FRONT_URL}/${el.key}`} className="btn" onClick={(e) => handleCopy(e)}>COPY</button>
            </div>
            </div>
          })
        }
        </div>
      </div>
    </div>
  )
}

export default App
