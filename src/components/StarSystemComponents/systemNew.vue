<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import NewSystemElement from './newSystemElement.vue';
import { Star, StarSystem, SystemElement } from '../../StarSystem';

const System = ref(new StarSystem);
const starKeys: Ref<number[]> = ref([]);
const elementKeys: Ref<number[]> = ref([]);

// Setup keys if a populated System is given UNTESTED
for (let i = 0; i < System.value.stars.length; i++) {
	addStar();
}
for (let i = 0; i < System.value.elements.length; i++) {
	addElement();
}

function addStar() {
	let index = starKeys.value.length;
	while (starKeys.value.includes(index)) { index++ };
	System.value.stars[System.value.stars.length] = new Star;
	starKeys.value.push(index);
}
function getStarIndex(starKey: number) {
	return starKeys.value.indexOf(starKey);
}
function deleteStar(starKey: number) {
	let index = getStarIndex(starKey);
	System.value.stars.splice(index, 1);
	starKeys.value.splice(index, 1);
}
function addElement() {
	let index = elementKeys.value.length;
	while (elementKeys.value.includes(index)) { index++ };
	System.value.elements[System.value.elements.length] = new SystemElement;
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
			<template v-for="starKey in starKeys" :key="starKey">
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
			<template v-for="elementKey in elementKeys" :key="elementKey">
				<div class="element">
					<NewSystemElement v-model="System.elements[getElementIndex(elementKey)]" />
					<button type="button" @click="dialogElementKey = elementKey">X</button>
				</div>
			</template>
		</div>
		<button type="button" @click="addElement">Add Element</button>
	</form>
	<div class="confirmDialog" v-if="dialogElementKey != undefined">
		<div class="dialogContent">
			<p>Do you really want to delete {{  System.elements[getElementIndex(dialogElementKey)].name ? System.elements[getElementIndex(dialogElementKey)].name : "unnamed element" }}?</p>
			<button @click="deleteElement(dialogElementKey); dialogElementKey = undefined">Yes</button>
			<button @click="dialogElementKey = undefined">No</button>
		</div>
	</div>
</template>

<style lang="css">
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

.confirmDialog {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #10101080;

	& .dialogContent {
		background-color: var(--light_background);
		border: 2px solid var(--line_color);
		padding: 1rem;
	}
}
</style>