/* eslint-disable react/prop-types */
const Pagination = ({ totalPages, handleCurrentPage }) => {
	return (
		<div
			style={{
				margin: "50px auto",
				width: "500px",
				display: "flex",
				justifyContent: "center",
				gap: "20px",
			}}
		>
			{/* 
				/**
				 * TODO: page number
				 */}
			{Array.from({ length: totalPages }, (_, i) => (
				<button
					style={{
						cursor: "pointer",
					}}
					key={i}
					onClick={() => handleCurrentPage(i + 1)}
				>
					{i + 1}
				</button>
			))}
		</div>
	);
};
export default Pagination;
