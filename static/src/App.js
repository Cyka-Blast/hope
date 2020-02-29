import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import logo from './logo.svg';
import './App.css';

let endPoint="http://127.0.0.1:5000/";
let socket=io.connect(endPoint);
function Chat(){
	const [messages,setMessages]=useState([]);
	const [message, setMessage]=useState({text:"", user:""});
	useEffect(()=>{
		getMessages();
	}, [messages.length]);
	const getMessages = () => {
		socket.on("message", msg => {
			setMessages([...messages,msg]);
		});
	};
	const onChange =e => {
		var msg=e.target.value;
		setMessage({text:msg,user:"current"});
	};
	const onClick = (e) => {
		e.preventDefault()
	if(message.text != ""){
		socket.emit("message",{text:message.text,user:"other"});
		setMessages([...messages,message]);
		setMessage({text:"",user:""});
	}else{
		alert("Please Add a Message");
	}
	};

	return(
		<div>
		<nav className="navbar">
			<div className="backbutton">
			<a href="#">&#8672;</a>
			</div>
			<div className="navbar-brand">The Rapist or User</div>
		</nav>
		{messages.length>0 && messages.map(msg => (
			<div className={msg.user}>
			<p>{msg.text}</p>
			</div>
		))}
		<form className="input" onSubmit={(e) => onClick(e)}>
		<input value={message.text} name="message" onChange={e => onChange(e)} />
		<button className="submit-button" >Send</button>
		</form>
		</div>
	);
};
export default Chat;
