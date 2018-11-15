import React, { Component } from "react";
import colorless from "../media/colorless.png";
import firebg from "../media/Fire - 12910.mp4";
import grassbg from "../media/Grass - 13781.mp4";
import smokebg from "../media/Smoke - 9553.mp4";
import waterbg from "../media/Water - 756.mp4";
import cavebg from "../media/Cave - 12634.mp4";
import thunderstorm from "../media/Thunderstorm - 3127.mp4";

const typeKey = [
	{ type: "Lightning", color: "yellow", videobg: thunderstorm },
	{ type: "Colorless", color: "rgb(230,230,230)" },
	{ type: "Darkness", color: "rgb(60,60,60)" },
	{ type: "Grass", color: "rgb(202, 224, 164)", videobg: grassbg },
	{ type: "Dragon", color: "rgb(214, 221, 236)" },
	{ type: "Fairy", color: "pink" },
	{ type: "Fighting", color: "rgb(205, 169, 123)", videobg: cavebg },
	{ type: "Fire", color: "rgb(233, 157, 139)", videobg: firebg },
	{ type: "Metal", color: "silver" },
	{ type: "Psychic", color: "rgb(191, 152, 206)" },
	{ type: "Water", color: "rgb(142, 199, 241)", videobg: waterbg }
];

export default class PokeCard extends Component {
	render() {
		let baseUrl = this.props.name
			? `http://www.pokestadium.com/sprites/xy/${
					this.props.name.includes("-")
						? this.props.name.toLowerCase().split("-")[0]
						: this.props.name.toLowerCase().split(" ")[0]
			  }.gif`
			: "";
		let cardEffects = this.props.types
			? typeKey.filter((type) => {
					if (type.type === this.props.types[0]) {
						return {
							color: type.color,
							videobg: type.videobg ? type.videobg : ""
						};
					}
			  })[0]
			: null;
		return (
			<div className="flip-container">
				<div className="flipper">
					<div
						style={{
							backgroundColor: cardEffects
								? cardEffects.color
								: "white"
						}}
						className="front">
						<h1>
							{this.props.name
								? this.props.name.includes("-")
									? this.props.name.split("-")[0]
									: this.props.name
								: ""}
						</h1>
						<div className="image-container">
							{cardEffects ? (
								<video
									key={cardEffects ? cardEffects.videobg : ""}
									className="video-bg"
									autoPlay
									loop
									muted
									playsInline
									src={cardEffects ? cardEffects.videobg : ""}
								/>
							) : (
								<video
									key={cardEffects ? cardEffects.videobg : ""}
									className="video-bg"
									autoPlay
									loop
									muted
									playsInline
									src={smokebg}
								/>
							)}
							<img
								src={
									baseUrl ||
									"http://www.pokestadium.com/assets/img/sprites/misc/trozei/pikachu.gif"
								}
							/>
						</div>
						<div className="attack-container">
							<div className="attack-cost">
								{this.props.attacks
									? this.props.attacks.map((attack) => {
											return (
												<div>
													{attack.cost.map((cost) => {
														return (
															<img
																src={colorless}
															/>
														);
													})}
												</div>
											);
									  })
									: null}
							</div>
							<div className="attack-name">
								{this.props.attacks
									? this.props.attacks.map((attack) => {
											return (
												<div>
													<span>{attack.name}-</span>
													<p>{attack.text}</p>
												</div>
											);
									  })
									: null}
							</div>

							<div className="attack-damage">
								{this.props.attacks
									? this.props.attacks.map((attack) => {
											return <div>{attack.damage}</div>;
									  })
									: null}
							</div>
						</div>
					</div>

					<div className="back" />
				</div>
			</div>
		);
	}
}
