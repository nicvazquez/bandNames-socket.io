import React, { useEffect, useState } from "react";

export const BandList = ({ data, vote, removeBand, changeBandName }) => {
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

	const onLostFocus = (id, name) => {
		changeBandName(id, name);
	};

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className="btn btn-primary" onClick={() => vote(band.id)}>
						+1
					</button>
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
					<button onClick={() => removeBand(band.id)} className="btn btn-danger">
						Remove
					</button>
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
						<th>Remove</th>
					</tr>
				</thead>

				<tbody>{createRows()}</tbody>
			</table>
		</>
	);
};
