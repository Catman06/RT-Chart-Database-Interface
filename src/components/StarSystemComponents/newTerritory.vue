<script lang="ts" setup>
import { ref, type PropType, type Ref } from 'vue';
import { Landmark, Territory, Trait } from '../../StarSystem';

const territory = defineModel({ type: Object as PropType<Territory>, required: true});

const traitKeys: Ref<number[]> = ref([]);
for (let i = 0; i < territory.value.traits.length; i++) {
	addTrait();
}

function addTrait() {
	let index = traitKeys.value.length;
	while (traitKeys.value.includes(index)) { index++ };
	territory.value.traits[territory.value.traits.length] = new Trait;
	traitKeys.value.push(index);
}
function getTraitIndex(traitKey: number) {
	return traitKeys.value.indexOf(traitKey);
}
function deleteTrait(traitKey: number) {
	let index = getTraitIndex(traitKey);
	territory.value.traits.splice(index, 1);
	traitKeys.value.splice(index, 1);
}

const landmarkKeys: Ref<number[]> = ref([]);
for (let i = 0; i < territory.value.landmarks.length; i++) {
	addLandmark();
}

function addLandmark() {
	let index = landmarkKeys.value.length;
	while (landmarkKeys.value.includes(index)) { index++ };
	territory.value.landmarks[territory.value.landmarks.length] = new Landmark;
	landmarkKeys.value.push(index);
}
function getLandmarkIndex(landmarkKey: number) {
	return landmarkKeys.value.indexOf(landmarkKey);
}
function deleteLandmark(landmarkKey: number) {
	let index = getTraitIndex(landmarkKey);
	territory.value.landmarks.splice(index, 1);
	landmarkKeys.value.splice(index, 1);
}
</script>

<template>
<div>
	<label>Name
		<input v-model="territory.name">
	</label>
	<label>Base Terrain
		<input v-model="territory.terrain">
	</label>
	<label>Info
		<textarea v-model="territory.info" />
	</label>
	<div id="traits">
		<template v-for="traitKey in traitKeys" :key="traitKey">
			<div class="trait">
				<div>
					<label :for="'trait' + traitKey">Trait</label>
					<input :name="'trait' + traitKey" v-model="territory.traits[getTraitIndex(traitKey)].type">
				</div>
				<div class="traitInfo">
					<label :for="'traitInfo' + traitKey">Info</label>
					<textarea :name="'traitInfo' + traitKey" v-model="territory.traits[getTraitIndex(traitKey)].info"></textarea>
				</div>
				<button type="button" @click="deleteTrait(traitKey)">X</button>
			</div>
		</template>
		<button class="addButton" type="button" @click="addTrait">Add Trait</button>
	</div>
	<div id="landmarks">
		<template v-for="landmarkKey in landmarkKeys" :key="landmarkKey">
			<div class="landmark">
				<div>
					<label :for="'landmark' + landmarkKey">Landmark</label>
					<input :name="'landmark' + landmarkKey" v-model="territory.landmarks[getLandmarkIndex(landmarkKey)].type">
				</div>
				<div class="landmarkInfo">
					<label :for="'landmarkInfo' + landmarkKey">Info</label>
					<textarea :name="'landmarkInfo' + landmarkKey" v-model="territory.landmarks[getLandmarkIndex(landmarkKey)].info"></textarea>
				</div>
				<button type="button" @click="deleteLandmark(landmarkKey)">X</button>
			</div>
		</template>
		<button class="addButton" type="button" @click="addLandmark">Add Landmark</button>
	</div>
</div>
</template>

<style lang="css" scoped>
	.trait, .landmark {
		background-color: var(--background_color);
		border: 2px solid var(--line_color);
	}
</style>