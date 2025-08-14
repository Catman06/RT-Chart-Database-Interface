<script lang="ts" setup>
import { ref } from 'vue';
import DisplayPlanet from './displayPlanet.vue';

const props = defineProps(['element']);
const element = ref(props.element);
</script>

<template>
<div class="wide content">
	<p>Name: {{ element.name ? element.name : "Undefined" }}</p>
	<p>Zone: {{ element.zone ? element.zone : "Undefined" }}</p>
	<p>Type: {{ element.type ? element.type : "Undefined" }}</p>
	<pre v-if="element.info">Info: {{ element.info }}</pre>
	<DisplayPlanet v-if="element.planet" :planet="element.planet" />
	<template v-if="element.resources.length > 0">
		<p>Resource{{ element.resources.length > 1 ? "s" : "" }}</p>
		<div class="contentHolder">
			<div class="content" v-for="resource in element.resources">
				<p>Type: {{ resource.type ? resource.type : "Undefined" }}</p>
				<p>Quantity: {{ resource.quantity ? resource.quantity : "Undefined" }}</p>
				<p>Exploited: {{ resource.exploited ? "Yes" : "No" }}</p>
				<pre v-if="resource.info">Info: {{ resource.info }}</pre>
			</div>
		</div>
	</template>
</div>
</template>

<style lang="css" scoped>

</style>