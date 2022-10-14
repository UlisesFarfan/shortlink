import React, { useState, useEffect } from 'react'
import './contactoCss.css'

const initialState = {
    from: "",
    asunto: "",
    msg: ""
}
function Contacto() {
    const [form, setForm] = useState(initialState)
    const [btn, setBtn] = useState(true)
    const [errorFrom, setErrorFrom] = ("")
    const [errorAsunto, setErrorAsunto] = ("")
    const [errorMsg, setErrorMsg] = ("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(errorFrom === "" && errorAsunto === "" && errorMsg === "" && form.from !== "" && form.asunto !== "" && from.msg !== "") {
        const a = axios.post(`/`, form)
        setForm(initialState)
        setBtn(true)
        return
        }
        setBtn(true)
    }
    return (
        <div>

        </div>
    );
}
export default Contacto;