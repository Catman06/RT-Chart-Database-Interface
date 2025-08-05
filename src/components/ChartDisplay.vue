<script setup lang="ts">
import { computed } from 'vue';

	const props = defineProps(['chartIn', 'list']);

	const chart = computed(() => {
		return props.chartIn ? props.chartIn : undefined;
	})
</script>

<template>
	<div id="info" v-if="chart">
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
		<p class="label" v-if="chart['rules']">Special Rules</p>
		<p >{{ chart['rules'] }}</p>
	</div>
	<ul id="list" v-else-if="list">
		<li v-for="item in list">{{ item }}</li>
	</ul>
</template>

<style lang="css" scoped>

</style>