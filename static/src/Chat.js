import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import logo from './logo.svg';
import './App.css';

let endPoint="http://127.0.0.1:5000/";
let socket=io.connect(endPoint);
function Chat(){
	const [messages,setMessages]=useState([]);
	const [message, setMessage]=useState("");
	const [typing,setTyping]=useState("");
	useEffect(()=>{
		getMessages();
	}, [messages.length]);
	var timeout=undefined;
	function timeoutFunction(){
		clear(timeout);
    		timeout = setTimeout(getTyping, 5000);
	}
	const getMessages = () => {
		socket.on("message", msg => {
			setMessages([...messages,msg]);
		});
	};
	const getTyping = () => {
		socket.on("typing", type=>{
			setTyping(type);
		});
	};
	const onChange =e => {
		var msg=e.target.value;
		setMessage(msg);
		if (msg!=""){
			socket.emit("typing","***typing noises***");
		}else{
			socket.emit("typing","");
		}
	};
	const onClick = () => {
	if(message != ""){
		socket.emit("message",message);
		setMessages([...messages,message]);
		setMessage("");
	}else{
		alert("Please Add a Message");
	}
	};

	return(
		<div>
		{messages.length>0 && messages.map(msg => (
			<div>
			<p>{msg}</p>
			</div>
		))}
			<div>
			<p>{typing}</p>
			</div>
		<input value={message} name="message" onChange={e => onChange(e)} />
		<button onClick={() => onClick()}>Send</button>
		</div>
	);
};
export default Chat;
