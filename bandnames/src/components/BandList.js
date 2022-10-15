import React, { useEffect, useState } from "react";

export const BandList = ({ data }) => {
	const [bands, setBands] = useState(data);

	useEffect(() => {
		setBands(data);
	}, [data]);

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className="btn btn-primary">+1</button>
				</td>
				<td>
					<input value={band.name} className="form-control" />
				</td>
				<td>
					<p>15</p>
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
