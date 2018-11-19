import React, { Component } from "react";
import colorless from "../media/colorless.png";
import firebg from "../media/Fire - 12910.mp4";
import grassbg from "../media/Grass.mp4";
import ghostbg from "../media/Darkness - 2106.mp4";
import smokebg from "../media/Smoke.mp4";
import waterbg from "../media/Water - 756.mp4";
import cavebg from "../media/Cave - 12634.mp4";
import dragonbg from "../media/Dragon.mp4";
import fairybg from "../media/Fairy.mp4";
import metalbg from "../media/Metal.mp4";
import thunderstorm from "../media/Thunderstorm - 3127.mp4";
import waterIcon from "../media/water.png";
import lightIcon from "../media/lightning.png";
import grassIcon from "../media/grass.png";
import fightingIcon from "../media/fighting.png";
import darknessIcon from "../media/darkness.png";
import fairyIcon from "../media/fairy.png";
import fireIcon from "../media/fire.png";
import metalIcon from "../media/metal.png";
import psychicIcon from "../media/psychic.png";
import dragonIcon from "../media/dragon.png";
import Icon from "./Icon";

const typeKey = [
	{
		type: "Lightning",
		color: "yellow",
		videobg: thunderstorm,
		icon: lightIcon
	},
	{
		type: "Colorless",
		color: "rgb(230,230,230)",
		videobg: smokebg,
		icon: colorless
	},
	{
		type: "Darkness",
		color: "rgb(60,60,60)",
		videobg: smokebg,
		icon: darknessIcon
	},
	{
		type: "Grass",
		color: "rgb(202, 224, 164)",
		videobg: grassbg,
		icon: grassIcon
	},
	{
		type: "Dragon",
		color: "rgb(214, 221, 236)",
		videobg: dragonbg,
		icon: dragonIcon
	},
	{ type: "Fairy", color: "pink", videobg: fairybg, icon: fairyIcon },
	{
		type: "Fighting",
		color: "rgb(205, 169, 123)",
		videobg: cavebg,
		icon: fightingIcon
	},
	{
		type: "Fire",
		color: "rgb(233, 157, 139)",
		videobg: firebg,
		icon: fireIcon
	},
	{ type: "Metal", color: "silver", videobg: metalbg, icon: metalIcon },
	{
		type: "Psychic",
		color: "rgb(191, 152, 206)",
		videobg: ghostbg,
		icon: psychicIcon
	},
	{
		type: "Water",
		color: "rgb(142, 199, 241)",
		videobg: waterbg,
		icon: waterIcon
	}
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
		console.log(this.props.name);
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
						<div className="name-hp">
							<h1>
								{this.props.name ? (
									this.props.name.includes("-") ? (
										<span>
											{this.props.name.split("-")[0]} (
											{this.props.types
												? this.props.types[0]
												: null}
											)
										</span>
									) : (
										<span>
											{this.props.name} (
											{this.props.types
												? this.props.types[0]
												: null}
											)
										</span>
									)
								) : (
									""
								)}
							</h1>
							<h1 className="hp">{this.props.hp} HP</h1>
						</div>
						<div className="image-container">
							{cardEffects ? (
								<video
									className="video-bg"
									autoPlay
									loop
									muted
									playsInline
									src={cardEffects ? cardEffects.videobg : ""}
								/>
							) : (
								<video
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
												<div className="atk">
													<div className="cost-img">
														{attack.cost.map(
															(cost) => {
																return (
																	<Icon
																		actualType={
																			cost
																		}
																		typeKey={
																			typeKey
																		}
																	/>
																);
															}
														)}
													</div>
													<div className="atk-desc">
														<span
															style={
																attack.text
																	? null
																	: {
																			alignSelf:
																				"center"
																	  }
															}>
															{attack.name}
														</span>
														{attack.text ? (
															<p>{attack.text}</p>
														) : null}
													</div>
													<div>{attack.damage}</div>
												</div>
											);
									  })
									: null}
							</div>
						</div>
						<div className="weakness-retreat-container">
							<div>
								<span>Weakness</span>
								<span>Retreat Cost</span>
							</div>
							<div>
								<div>
									{this.props.weaknesses &&
									this.props.weaknesses.length
										? this.props.weaknesses.map(
												(weakness) => {
													return (
														<span>
															<Icon
																actualType={
																	weakness.type
																}
																typeKey={
																	typeKey
																}
															/>
														</span>
													);
												}
										  )
										: null}
								</div>
								<div>
									{this.props.retreatCost &&
									this.props.retreatCost.length
										? this.props.retreatCost.map((cost) => {
												return <img src={colorless} />;
										  })
										: null}
								</div>
							</div>
						</div>
					</div>

					<div className="back" />
				</div>
			</div>
		);
	}
}
