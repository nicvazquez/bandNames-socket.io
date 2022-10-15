import React, { useState } from "react";

export const AddBand = ({ addBand }) => {
	const [inputValue, setInputValue] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim().length > 0) {
			addBand(inputValue);
			setInputValue("");
		}
	};
	return (
		<>
			<h3>Add Band</h3>

			<form onSubmit={onSubmit}>
				<input
					type="text"
					className="form-control"
					placeholder="New band name"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</form>
		</>
	);
};
