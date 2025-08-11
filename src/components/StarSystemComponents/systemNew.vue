<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import SystemNewElement from './newSystemElement.vue';
import { Star, StarSystem, SystemElement } from '../../StarSystem';

const starKeys: Ref<number[]> = ref([]);
const elementKeys: Ref<number[]> = ref([]);

const System = ref(new StarSystem);

function addStar(_event: Event) {
	let index = starKeys.value.length;
	while (starKeys.value.includes(index)) { index++ };
	System.value.stars[System.value.stars.length] = new Star;
	starKeys.value.push(index);
}
function getStarIndex(keyIndex: number) {
	return starKeys.value.indexOf(keyIndex);
}
function deleteStar(starKey: number) {
	let index = getStarIndex(starKey);
	System.value.stars.splice(index, 1);
	starKeys.value.splice(index, 1);
}
function addElement(_event: Event) {
	let index = elementKeys.value.length;
	while (elementKeys.value.includes(index)) { index++ };
	System.value.elements[System.value.elements.length] = new SystemElement;
	elementKeys.value.push(index);
}
function getElementIndex(keyIndex: number) {
	return elementKeys.value.indexOf(keyIndex);
}
function deleteElement(elementKey: number) {
	let index = getElementIndex(elementKey);
	System.value.elements.splice(index, 1);
	elementKeys.value.splice(index, 1);
}
</script>

<template>
	<button @click="() => console.log(System)">Print</button>
	<form id="newSystemForm">
		<div>
			<label for="systemName">System Name</label>
			<input name="systemName" v-model="System.name">
		</div>
		<div>
			<label for="systemInfo">System Info</label>
			<textarea name="systemInfo" v-model="System.info" />
		</div>
		<label>System Stars</label>
		<div id="stars">
			<template v-for="starKey in starKeys" :key="starIndex">
				<div class="star">
					<label :for="'starName' + starKey">Name</label>
					<input :name="'starName' + starKey" v-model="System.stars[getStarIndex(starKey)].name">
					<label :for="'starType' + starKey">Type</label>
					<input :name="'starType' + starKey" v-model="System.stars[getStarIndex(starKey)].type">
					<button type="button" @click="deleteStar(starKey)">X</button>
				</div>
			</template>
		</div>
		<button type="button" @click="addStar">Add Star</button>
		<label>System Elements</label>
		<div id="elements">
			<template v-for="elementKey in elementKeys" :name="elementIndex" :key="elementIndex">
				<div class="element">
					<SystemNewElement  :index="elementKey" v-model="System.elements[getElementIndex(elementKey)]" />
					<button type="button" @click="deleteElement(elementKey)">X</button>
				</div>
			</template>
		</div>
		<button type="button" @click="addElement">Add Element</button>
	</form>
</template>

<style lang="css" scoped>
#newSystemForm {
	&>* {
		display: block;
		margin: auto;
	}

	& textarea {
		width: 90%;
		height: 5rem;
		margin: auto;
	}

	& .star {
		display: flex;
		align-items: center;
		margin: auto;
		width: 95%;
		&>* {
			height: 1.5rem;
		}
	}

	& #elements {
		width: 90%;
		margin: auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		& .element {
			margin: auto;
			width: 50%;
			&>* {
				margin: auto;
			}
		}
	}
}
</style>