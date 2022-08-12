import React, {  useState } from "react";
import Font from 'react-font'

export default function TaskList(props) {
	
	let taskList = ""
	if(props.tasks != "")
		taskList = props.tasks 
	else 
		taskList = "No hay tareas, añadir tareas"

	return (
		<div className="d-flex justify-content-center" style={{ marginTop: "2rem" }}>
			<Font family='Fredericka the Great'>
				<ul className="list-group list-group-flush" style={{width: "50rem"}}>
					{taskList}						
				</ul>
			</Font>
		</div>
	);
};
