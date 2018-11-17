import React from "react";

const Icon = ({ actualType, typeKey }) => {
	let icon = typeKey.filter((type) => {
		return actualType === type.type;
	})[0].icon;

	return (
		<div className="icon">
			<img src={icon} />
		</div>
	);
};

export default Icon;
