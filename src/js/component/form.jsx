import React, { useState, useEffect } from "react";
import Font from 'react-font'
import TaskList from "./task_list.jsx";

export default function Form() {

	const [tasks, setTask] = useState([])
	const [input, setInput] = useState("")
	const urlTasks = "https://assets.breatheco.de/apis/fake/todos/user/itsmerichart"

	useEffect(async () => {
		let getTasks = await fetch(urlTasks)
		getTasks = await getTasks.json()
		setTask(getTasks)
	},[])	

	useEffect(async () => {
		await fetch(urlTasks, {	
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {"Content-Type": "application/json"}
		})
	},[tasks])	

	const handleChange = (event) => {
		setInput(event.target.value)
	}

	const infoSubmited = async (event) => {
		event.preventDefault()
		const data = new FormData(event.target)
		setTask([...tasks, {
			label: data.get("task"),
			done: data.get("taskStatus") == "on" ? true : false
		}])	
	}

	const removeTask = itemIndex => {
		setTask(prevState =>
			prevState.filter((todo, index) => index !== itemIndex)
		);
	};

	const statusChange = async (itemIndex) => {
		let newTasks = [...tasks]
		newTasks[itemIndex].done = !newTasks[itemIndex].done
		setTask(newTasks)
	}

	let allTasks = tasks.map((element, index) => 

				<li key={index.toString()} className="list-group-item"> 
					<div className="mb-3 d-flex justify-content-between">
						<p style={{margin:"1rem"}}>
							{element.label} 
						</p>
						<div>
							<button type="button" className="btn btn-primary" onClick={() => statusChange(index)}
									style={{background:`${element.done ? "rgb(13, 186, 13)" : "orange"}`, margin:"1rem"}}>
								<span className="badge text-bg-secondary" style={{color:"black"}}>
									{element.done ? "Completado" : "Pendiente"}
								</span>
							</button>
							<button onClick={() => removeTask(index)}>
								Remove
							</button>
						</div>
					</div>
				</li>
				)
	return (
		<div className="text-center" style={{ marginTop: "1rem" }}>
			
			<form id="formulario" onSubmit={infoSubmited}>
				<div className="form-group d-flex justify-content-center">	
					<Font family='Fredericka the Great'>				
						<input className="form-control" type="text" 
							name="task" style={{width: "50rem"}}
							id="task" placeholder="what do you want to do?"
							value={input} onChange={(handleChange)}/>
					</Font>
				</div>
				{/* <div className="form-check d-flex justify-content-center">
					<input className="form-check-input" type="checkbox" value="taskStatus" name="taskStatus"/>
					<label className="form-check-label" htmlFor="taskStatus">
						Estado de la tarea
					</label>
				</div> */}
				<div className="form-group" style={{ marginTop: "1rem" }}>					
					<Font family='Fredericka the Great'>
						<button type="submit" className="btn btn-light" 
						style={{background: "white"}}>
							Submit
						</button>
					</Font>
				</div>
			</form>

			<TaskList tasks={allTasks}/>
			
		</div>
	);
};
