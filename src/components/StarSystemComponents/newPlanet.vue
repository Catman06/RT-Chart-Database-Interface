<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import { Planet, SystemElement } from '../../StarSystem';

const element = defineModel({ type: [SystemElement] as PropType<SystemElement>, required: true});
const planet = ref(element.value.planet ? element.value.planet : element.value.planet = new Planet);
</script>

<template>
	<div>
		<div>
			<label for="planetBody">Body</label>
			<input name="planetBody" v-model="planet.body">
		</div>
		<div>
			<label for="planetGravity">Gravity</label>
			<input name="planetGravity" v-model="planet.gravity">
		</div>
		<div>
			<label for="planetAtmosphere">Atmosphere</label>
			<input name="planetAtmosphere" v-model="planet.atmosphere">
		</div>
		<div>
			<label for="planetAtmosComposition">Atmospheric Composition</label>
			<input name="planetAtmosComposition" v-model="planet.atmosphereComposition">
		</div>
		<div>
			<label for="planetClimate">Climate</label>
			<input name="planetClimate" v-model="planet.climate">
		</div>
		<div>
			<label for="planetHabitability">Habitability</label>
			<input name="planetHabitability" v-model="planet.habitability">
		</div>
		<div>
			<label for="planetInfo">Planet Info</label>
			<textarea name="planetInfo" v-model="planet.info" />
		</div>
	</div>
</template>

<style lang="css" scoped>
#isPlanet {
	width: fit-content;
}
</style>