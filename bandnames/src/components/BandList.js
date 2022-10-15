import React, { useEffect, useState } from "react";

export const BandList = ({ data }) => {
	const [bands, setBands] = useState(data);

	useEffect(() => {
		setBands(data);
	}, [data]);

	const changedName = (e, id) => {
		const newName = e.target.value;
		setBands((bands) =>
			bands.map((band) => {
				if (band.id === id) {
					band.name = newName;
				}
				return band;
			})
		);
	};

	const onLostFocus = (id, name) => {};

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className="btn btn-primary">+1</button>
				</td>
				<td>
					<input
						value={band.name}
						className="form-control"
						onChange={(e) => changedName(e, band.id)}
						onBlur={() => onLostFocus(band.id, band.name)}
					/>
				</td>
				<td>
					<p>{band.votes}</p>
				</td>
				<td>
					<button className="btn btn-danger">Delete</button>
				</td>
			</tr>
		));
	};

	return (
		<>
			<table className="table table-stripped">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Votes</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>{createRows()}</tbody>
			</table>
		</>
	);
};
