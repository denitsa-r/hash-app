import {useEffect, useState, useRef} from "react";
import axiosClient from "../axios-client.js";
import {MD5, SHA256, SHA1, SHA512, SHA3} from "crypto-js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Hash() {
  const msgRef = useRef();
  const algorithmRef = useRef();
  const hashMsgRef = useRef();
  const setHash = useStateContext();
  let [output,setOutput] = useState('');
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      input_text: msgRef.current.value,
      algorithm: algorithmRef.current.value,
      hash_value: hashMsgRef.current.value,
      user_id: setHash.user.id,
    }

    if(algorithmRef.current.value == 'MD5'){ 
      payload.hash_value = MD5(payload.input_text).toString();
    } else if(algorithmRef.current.value == 'SHA-1') {
      payload.hash_value = SHA1(payload.input_text).toString();
    } else if(algorithmRef.current.value == 'SHA-256') {
      payload.hash_value = SHA256(payload.input_text).toString();
    }  else if (algorithmRef.current.value == 'SHA-3') {
      payload.hash_value = SHA3(payload.input_text).toString();
    }

    msgRef.current.value = '';

    setOutput(payload.hash_value);

    console.log(payload);

    //want oto display an error for empty message

    axiosClient.post('/hash', payload)
        .then( ({data}) => {
            setHash(data.hash);
        })
        .catch(err => {
          const response = err.response;
          if(response && response.status == 422) {
            setErrors(response.data.errors);
          }
        })
  }

  return (
    <div>
     <h1 className="title">Hash a message</h1>
     <div className="fadeIn animated m-y-1">
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
        <div className="form">
            <form onSubmit={onSubmit}>
                <input ref={msgRef} type="text" name="input_text" placeholder="Enter message to hash"/>
                <label htmlFor="hashes" className="m-y-1 m-x-1">Choose a hashing algorithm:</label>
                    <select ref={algorithmRef} name="hashes" id="hashes">
                        <option value="MD5">MD5</option>
                        <option value="SHA-1">SHA-1</option>
                        <option value="SHA-256">SHA-256</option>
                        <option value="SHA-3">SHA-3</option>
                    </select>
                <button className="btn btn-block m-y-1">Submit hash</button>
            </form>
            {!errors && 
              <div ref={hashMsgRef}>{output}</div>
            }
        </div>
     </div>
     
    </div>
  )
}
