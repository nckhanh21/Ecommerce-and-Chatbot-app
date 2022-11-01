import {useState, useEffect} from 'react'
import axios from 'axios'

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        var config = {
            method: 'get',
            url: url,
            headers: { }
          };
          axios(config)
          .then(function (response) {
            setResponse(response.data);
          })
          .catch(function (error) {
            setError(error);
          });          
    }, [url, options])

    return { response, error }
}

export default useFetch