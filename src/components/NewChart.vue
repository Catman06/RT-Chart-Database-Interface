<script lang="ts" setup>
import { onMounted } from 'vue';

	const props = defineProps(['start', 'end']);
	let form: HTMLElement | null;
	onMounted(() => {
		form = document.getElementById("newChartForm");
	})


	// Submits the form to the database
	async function submit(_event: Event) {
		if (!(form instanceof HTMLFormElement)) { return };
		
		let formdata = new FormData(form);
		
		const response = await fetch("https://zipperserver.duckdns.org/php/chartAddChart.php", {
			method: "POST",
			body: formdata
		})
		
		console.log(response);
	}
</script>

<template>
	<div id="newChartModal">
		<button id="closeButton" type="button" @click="$emit('closeModal')">X</button>
		<form id="newChartForm">
			<div>
				<div>
					<label for="start">Starting Location</label>
					<input id="newStart" name="start" required :value="props.start">
				</div>
				<div>
					<label for="endpoint">Ending Location</label>
					<input id="newEnd" name="endpoint" required :value="props.end">
				</div>
				<div>
					<label for="stability">Route Stability</label>
					<input id="newStability" name="stability">
				</div>
			</div>
			<div>
				<div>
					<label for="duration">Travel Duration</label>
					<input id="newDuration" type="number" name="duration">
				</div>
				<div>	
					<label for="quality">Chart Quality</label>
					<input id="newQuality" name="quality">
				</div>
				<div>
					<label for="maker">Chart Maker</label>
					<input id="newMaker" name="maker">
				</div>
			</div>
			<div class="textInputs">
				<div>
					<label for="astronomican">Astronomican</label>
					<textarea id="newAstronomican" name="astronomican" resize="none" />
				</div>
				<div>
					<label for="rules">Special Rules</label>
					<textarea id="newRules" name="rules" resize="none" />
				</div>
				<button type="button" @click="submit">Create Chart</button>
			</div>
		</form>
	</div>
	</template>

<style lang="css" scoped>
	#newChartModal {
		position: fixed;
		background-color: #1e201c;
		border-color: inherit;
		border-style: solid;
		width: 90vw;
		height: 90vh;
		top: 5vh;
		left: 5vw;
		display: flex;
		flex-direction: column;
		overflow: auto;

		&>form>div {
			display: flex;
			margin: 1rem;
			justify-content: space-evenly;

			&>div {
				width: 100%;
			}
		}

		& .textInputs {
			display: block;

			& * {
				display: block;
				margin: auto;
				padding: .5rem;
			}
		}
	}

	textarea {
		color: inherit;
		font: inherit;
		border-color: inherit;
		border-style: solid;
		width: 90%;
		height: 20vh;
		overflow: auto;
		z-index: 1;
		filter: blur(0px);
	}

	#closeButton {
		position: absolute;
		top: -1.1rem;
		left: -1.1rem;
	}
</style>