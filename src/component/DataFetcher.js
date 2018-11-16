import { Component } from "react";

import axios from "axios";

export default class DataFetcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData("1");
	}

	async fetchData(search) {
		const pokemon = search.match(/[0-9]/)
			? await axios.get(
					`https://api.pokemontcg.io/v1/cards?nationalPokedexNumber=${search}`
			  )
			: await axios.get(
					`https://api.pokemontcg.io/v1/cards?name=${search}`
			  );
		this.setState({
			data: { ...pokemon.data.cards[0] }
		});
		return;
	}

	render() {
		return this.state.data
			? this.props.render({
					data: this.state.data,
					funcs: {
						fetchData: this.fetchData
					}
			  })
			: this.fetchData(1);
	}
}
