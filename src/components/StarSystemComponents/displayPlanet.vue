<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import { Planet } from '../../StarSystem';
import DisplayElement from './displayElement.vue';

const props = defineProps({'planet': { type: Object as PropType<Planet>, required: true }});
const planet = ref(props.planet);
</script>

<template>
	<p>Body: {{ planet.body ? planet.body : "Undefined" }}</p>
	<p>Gravity: {{ planet.gravity ? planet.gravity : "Undefined" }}</p>
	<p>Atmosphere: {{ planet.atmosphere ? planet.atmosphere : "Undefined" }}</p>
	<p>Atmosphere Composition: {{ planet.atmosphereComposition ? planet.atmosphereComposition : "Undefined" }}</p>
	<p>Climate: {{ planet.climate ? planet.climate : "Undefined" }}</p>
	<p>Habitability: {{ planet.habitability ? planet.habitability : "Undefined" }}</p>
	<template v-if="planet.landmasses.length > 0">
		<p>Landmass{{ planet.landmasses.length > 1 ? "es" : "" }}</p>
		<div class="contentHolder">
			<div class="wide content" v-for="landmass in planet.landmasses">
				<p>Name: {{  landmass.name ? landmass.name : "Undefined" }}</p>
				<pre v-if="landmass.info">Info: {{ landmass.info }}</pre>
				<template v-if="landmass.territories.length > 0">
					<p>Territor{{ landmass.territories.length > 1 ? "ies" : "y" }}</p>
					<div class="contentHolder">
						<div class="content" v-for="territory in landmass.territories">
							<p>Name: {{  territory.name ? territory.name : "Undefined" }}</p>
							<p>Terrain: {{  territory.terrain ? territory.terrain : "Undefined" }}</p>
							<pre v-if="territory.info">Info: {{ territory.info }}</pre>
							<template v-if="territory.traits.length > 0">
								<p>Trait{{ territory.traits.length > 1 ? "s" : "" }}</p>
								<div class="contentHolder">
									<div class="content" v-for="trait in territory.traits">
										<p>Type: {{ trait.type ? trait.type : "Undefined" }}</p>
										<pre v-if="trait.info">Info: {{ trait.info }}</pre>
									</div>
								</div>
							</template>
							<template v-if="territory.landmarks.length > 0">
								<p>Landmark{{ territory.landmarks.length > 1 ? "s" : "" }}</p>
								<div class="contentHolder">
									<div class="content" v-for="landmark in territory.landmarks">
										<p>Type: {{ landmark.type ? landmark.type : "Undefined" }}</p>
										<pre v-if="landmark.info">Info: {{ landmark.info }}</pre>
									</div>
								</div>
							</template>
						</div>
					</div>
				</template>
			</div>
		</div>
	</template>
	<p>Orbital Feature{{ planet.orbitalFeatures.length > 1 ? "s" : "" }}</p>
	<template v-if="planet.orbitalFeatures.length > 0">
		<DisplayElement v-for="element in planet.orbitalFeatures" :element="element"/>
	</template>
</template>