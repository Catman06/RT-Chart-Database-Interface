<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import ModalDialog from './ModalDialog.vue';

	const props = defineProps(['chartIn']);
	let url = inject('phpURL');

	const chart = computed(() => {
		return props.chartIn ? props.chartIn : undefined;
	})

	const deleteDialog = ref(false);

	// Deletes a chart from the database
	async function deleteChart() {
		console.log("Attempting to delete");
		console.log(JSON.stringify(props.chartIn));
		
		const response = (await fetch(`${url}/php/chartDeleteChart.php`, {
			method: "POST",
			body: JSON.stringify(props.chartIn)
		})).json();

		// If the chart was deleted successfully, i.e. no return info, move on
		// If not, print the error to the console
		if ((await response).length != 0) {
			console.error("Error when submitting the new chart:", response);
		}
	}
</script>

<template>
	<div id="info" v-if="chart">
		<button class="deleteButton" type="button" @click="deleteDialog = true">X</button>
		<div>
			<div>
				<p class="label">Starting Location</p>
				<p>{{ chart['start'] }}</p>
			</div>
			<div>
				<p class="label">Ending Location</p>
				<p>{{ chart['endpoint'] }}</p>
			</div>
			<div>
				<p class="label">Route Stability</p>
				<p>{{ chart['stability'] }}</p>
			</div>
		</div>
		<div>
			<div>
				<p class="label">Travel Duration</p>
				<p>{{ chart['duration'] }} days</p>
			</div>
			<div>	
				<p class="label">Chart Quality</p>
				<p>{{ chart['quality'] }}</p>
			</div>
			<div>
				<p class="label">Chart Maker</p>
				<p>{{ chart['maker'] }}</p>
			</div>
		</div>
		<p class="label">Astronomican</p>
		<p>{{ chart['astronomican'] }}</p>
		<p class="label" v-if="chart['rules']">Special Rules</p>
		<p>{{ chart['rules'] }}</p>
	</div>
	<ModalDialog v-if="deleteDialog">
		<p>Really permanently delete this chart?</p>
		<p>{{ chartIn['start'] + " to " + chartIn['endpoint'] }}</p>
		<button @click="deleteChart(); deleteDialog = false">Yes</button>
		<button @click="deleteDialog = false">No</button>
	</ModalDialog>
</template>

<style lang="css" scoped>
	.deleteButton {
		float: left;
	}
	#info {
		color: inherit;
		background-color: var(--light_background);
		border: 2px solid var(--line_color);
		padding: 10px;
		margin: 5px;
		
		&>div {
			display: flex;
			justify-content: space-around;

			&>div {
				display: block;
			}
		}
	}
	.label {
		font-weight: bolder;
	}
</style>