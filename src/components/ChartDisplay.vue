<script setup lang="ts">
import { computed } from 'vue';

	const props = defineProps(['chartIn']);

	const chart = computed(() => {
		return props.chartIn ? props.chartIn : undefined;
	})
</script>

<template>
	<div id="info" v-if="chart">
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
		<p >{{ chart['rules'] }}</p>
	</div>
</template>

<style lang="css" scoped>
	#info {
		color: rgba(0, 0, 0, 0.729);
		background-color: #a5a078;
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