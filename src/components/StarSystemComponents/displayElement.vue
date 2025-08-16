<script lang="ts" setup>
import { ref } from 'vue';
import DisplayPlanet from './displayPlanet.vue';

const props = defineProps(['element']);
const element = ref(props.element);

const elementShown = ref(false);
const resourcesShown = ref(false);
</script>

<template>
<div class="wide content">
	<p class="subtitle hoverable" @click="elementShown = !elementShown">{{ element.name ? element.name : "Undefined" }}{{ elementShown ? " \u25BC" : " \u25C0"}}</p> 
	<template v-if="elementShown">
		<p>Zone: {{ element.zone ? element.zone : "Undefined" }}</p>
		<p>Type: {{ element.type ? element.type : "Undefined" }}</p>
		<pre v-if="element.info">Info: {{ element.info }}</pre>
		<DisplayPlanet v-if="element.planet" :planet="element.planet" />
		<template v-if="element.resources.length > 0">
			<p @click="resourcesShown = !resourcesShown" class="hoverable">Resource{{ element.resources.length > 1 ? "s" : "" }}{{ resourcesShown ? " \u25BC" : " \u25C0"}}</p>
			<div class="contentHolder" v-if="resourcesShown">
				<div class="content" v-for="resource in element.resources">
					<p>Type: {{ resource.type ? resource.type : "Undefined" }}</p>
					<p>Quantity: {{ resource.quantity ? resource.quantity : "Undefined" }}</p>
					<p>Exploited: {{ resource.exploited ? "Yes" : "No" }}</p>
					<pre v-if="resource.info">Info: {{ resource.info }}</pre>
				</div>
			</div>
		</template>
	</template>
</div>
</template>

<style lang="css" scoped>

</style>