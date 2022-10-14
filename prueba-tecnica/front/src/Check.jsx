import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import './App.css'

function Check() {
    const [redirenting, setRedirenting] = useState(true)
    const { key } = useParams()
    axios.get(`/?webKey=${key}`)
        .then(res => res.data)
        .then(res => location.href = res[0].link.includes("https://") ? res[0].link : `https://${res[0].link}`)
        .catch(() => setRedirenting(false))

    if (redirenting) {
        return (
            <div className="Check">
                <h1>redirecting...</h1>
            </div>
        )
    } else {
        return (
            <div className="Check">
                <h1>Error, this link is invalid</h1>
            </div>
        )
    }

}

export default Check
