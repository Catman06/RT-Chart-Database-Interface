<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import { Planet } from '../../StarSystem';
import DisplayElement from './displayElement.vue';
import DisplayLandmass from './displayLandmass.vue';

const props = defineProps({'planet': { type: Object as PropType<Planet>, required: true }});
const planet = ref(props.planet);

const landmassesShown = ref(false);
</script>

<template>
	<p>Body: {{ planet.body ? planet.body : "Undefined" }}</p>
	<p>Gravity: {{ planet.gravity ? planet.gravity : "Undefined" }}</p>
	<p>Atmosphere: {{ planet.atmosphere ? planet.atmosphere : "Undefined" }}</p>
	<p>Atmosphere Composition: {{ planet.atmosphereComposition ? planet.atmosphereComposition : "Undefined" }}</p>
	<p>Climate: {{ planet.climate ? planet.climate : "Undefined" }}</p>
	<p>Habitability: {{ planet.habitability ? planet.habitability : "Undefined" }}</p>
	<template v-if="planet.landmasses.length > 0">
		<p @click="landmassesShown = !landmassesShown" class="hoverable">Landmass{{ planet.landmasses.length > 1 ? "es" : "" }}{{ landmassesShown ? " \u25BC" : " \u25C0"}}</p>
		<div class="contentHolder" v-if="landmassesShown">
			<DisplayLandmass v-for="landmass in planet.landmasses" :landmass="landmass"></DisplayLandmass>
		</div>
	</template>
	<p v-if="planet.orbitalFeatures.length > 0">Orbital Feature{{ planet.orbitalFeatures.length > 1 ? "s" : "" }}</p>
	<template v-if="planet.orbitalFeatures.length > 0">
		<DisplayElement v-for="element in planet.orbitalFeatures" :element="element"/>
	</template>
</template>