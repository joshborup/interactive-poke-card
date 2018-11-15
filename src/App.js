import React, { Component } from "react";
import DataFetcher from "./component/DataFetcher";
import PokeCard from "./component/PokeCard";
import "./App.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: 1
		};
	}
	render() {
		return (
			<div className="App">
				<div>
					<DataFetcher
						render={(pokemon) => {
							console.log(pokemon);
							return (
								<div>
									<PokeCard {...pokemon.data} />
									<input
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												pokemon.funcs.fetchData(
													this.state.search
												);
											}
										}}
										onChange={(e) =>
											this.setState({
												search: e.target.value
											})
										}
									/>
									<button
										onClick={() =>
											pokemon.funcs.fetchData(
												this.state.search
											)
										}>
										Search
									</button>
								</div>
							);
						}}
					/>
				</div>
			</div>
		);
	}
}

export default App;
