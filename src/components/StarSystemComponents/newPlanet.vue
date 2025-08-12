<script lang="ts" setup>
import { ref, type PropType, type Ref } from 'vue';
import { Planet, SystemElement } from '../../StarSystem';
import NewSystemElement from './newSystemElement.vue';

const element = defineModel({ type: [SystemElement] as PropType<SystemElement>, required: true});
const planet = ref(element.value.planet ? element.value.planet : element.value.planet = new Planet);

const elementKeys: Ref<number[]> = ref([]);
for (let i = 0; i < planet.value.orbitalFeatures.length; i++) {
	addElement();
}

function addElement() {
	let index = elementKeys.value.length;
	while (elementKeys.value.includes(index)) { index++ };
	planet.value.orbitalFeatures[planet.value.orbitalFeatures.length] = new SystemElement;
	elementKeys.value.push(index);
}
function getElementIndex(elementKey: number) {
	return elementKeys.value.indexOf(elementKey);
}

// Handle deleting elements
// When close is clicked, dialogElementKey is set, and the dialog is shown
const dialogElementKey: Ref<number | undefined> = ref();
async function deleteElement(elementKey: number) {
	let index = getElementIndex(elementKey);
	planet.value.orbitalFeatures.splice(index, 1);
	elementKeys.value.splice(index, 1);
}
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
</div>
<label class="bold">System Elements</label>
<div id="elements">
	<template v-for="elementKey in elementKeys" :key="elementKey">
		<div class="element">
			<NewSystemElement v-model="planet.orbitalFeatures[getElementIndex(elementKey)]" />
			<button type="button" @click="dialogElementKey = elementKey">X</button>
		</div>
	</template>
</div>
<button type="button" @click="addElement">Add Element</button>
<Teleport to="body">
	<div class="confirmDialog" v-if="dialogElementKey != undefined">
		<div class="dialogContent">
			<label class="bold">Do you really want to delete {{  planet.orbitalFeatures[getElementIndex(dialogElementKey)].name ? planet.orbitalFeatures[getElementIndex(dialogElementKey)].name : "unnamed element" }}?</label>
			<button @click="deleteElement(dialogElementKey); dialogElementKey = undefined">Yes</button>
			<button @click="dialogElementKey = undefined">No</button>
		</div>
	</div>
</Teleport>
</template>

<style lang="css" scoped>

</style>