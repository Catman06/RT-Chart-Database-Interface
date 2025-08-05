<script setup lang="ts">
import { computed } from 'vue';

	const props = defineProps(['chartIn']);

	const chart = computed(() => {
		console.log(props.chartIn);
		return props.chartIn ? props.chartIn[0] : "Nothing";
	})
</script>

<template>
	<div>
		<p class="label">Starting Location</p>
		<p>{{ chart['start'] }}</p>
		<p class="label">Ending Location</p>
		<p>{{ chart['endpoint'] }}</p>
		<p class="label">Route Stability</p>
		<p>{{ chart['stability'] }}</p>
		<p class="label">Travel Duration</p>
		<p>{{ chart['duration'] }} days</p>
		<p class="label">Chart Quality</p>
		<p>{{ chart['quality'] }}</p>
		<p class="label">Chart Maker</p>
		<p>{{ chart['maker'] }}</p>
		<p class="label">Astronomican</p>
		<p>{{ chart['astronomican'] }}</p>
		<p class="label">Special Rules</p>
		<p v-if="chart['rules'] != null">{{ chart['rules'] }}</p>
	</div>
</template>

<style lang="css" scoped>

</style>