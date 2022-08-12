import React, {  useState } from "react";
import Font from 'react-font'
import Form from "./form.jsx";

const Home = () => {

	return (
		<div className="text-center" style={{ marginTop: "1rem" }}>
			
			<Font family='Fredericka the Great'>
				<h3 style={{ color: "rgb(244, 209, 166)", fontSize: "5rem" }}>
					To do list
				</h3>
			</Font>
			
			<Form />

		</div>
	);
};

export default Home;
