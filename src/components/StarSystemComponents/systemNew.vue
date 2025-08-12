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

async function saveSystem() {
	await fetch("https://zipperserver.duckdns.org/php/systemAddSystem.php", {
			method: "POST",
			body: JSON.stringify(System.value),
		})
}
</script>

<template>
	<button @click="() => console.log(System)">Print</button>
	<button @click="saveSystem()">Save</button>
	<form id="newSystemForm">
		<label class="bold big">System</label>
		<div>
			<label for="systemName">System Name</label>
			<input name="systemName" v-model="System.name">
		</div>
		<div>
			<label for="systemInfo">System Info</label>
			<textarea name="systemInfo" v-model="System.info" />
		</div>
		<label class="bold big">System Stars</label>
		<div id="stars">
			<template v-for="starKey in starKeys" :key="starKey">
				<div class="star">
					<div>
						<label :for="'starName' + starKey">Name</label>
						<input :name="'starName' + starKey" v-model="System.stars[getStarIndex(starKey)].name">
						<label :for="'starType' + starKey">Type</label>
						<input :name="'starType' + starKey" v-model="System.stars[getStarIndex(starKey)].type">
						<button type="button" @click="deleteStar(starKey)">X</button>
					</div>
					<div class="starInfo">
						<label :for="'starInfo' + starKey">Info</label>
						<textarea :name="'starInfo' + starKey"></textarea>
					</div>
				</div>
			</template>
		</div>
		<button class="addButton" type="button" @click="addStar">Add Star</button>
		<label class="bold big">System Elements</label>
		<div id="elements" class="subObjectHolder">
			<template v-for="elementKey in elementKeys" :key="elementKey">
				<div class="subObject">
					<label class="bold">System Element</label>
					<NewSystemElement v-model="System.elements[getElementIndex(elementKey)]" />
					<button type="button" @click="dialogElementKey = elementKey">X</button>
				</div>
			</template>
		</div>
		<button type="button" class="addButton" @click="addElement">Add Element</button>
	</form>
	<Teleport to="#content">
		<div class="confirmDialog" v-if="dialogElementKey != undefined">
			<div class="dialogContent">
				<p>Do you really want to delete {{  System.elements[getElementIndex(dialogElementKey)].name ? System.elements[getElementIndex(dialogElementKey)].name : "unnamed element" }}?</p>
				<button @click="deleteElement(dialogElementKey); dialogElementKey = undefined">Yes</button>
				<button @click="dialogElementKey = undefined">No</button>
			</div>
		</div>
	</Teleport>
</template>

<style lang="css">
#newSystemForm {
	&>* {
		display: block;
		margin: auto;
	}

	& textarea {
		display: block;
		width: 90%;
		height: 5rem;
		margin: auto;
	}

	& .star {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		background-color: var(--light_background);
		border: 2px solid var(--line_color);
		margin: .5rem auto;
		padding: .5rem 0rem;
		width: 95%;
		&>*:not(.starInfo) {
			display: inherit;
			align-items: center;
			width: 100%;
			height: 1.5rem;
		}
		&>.starInfo {
			width: 100%;
		}
	}

	& .addButton {
		margin: .5rem auto auto auto;
	}
}

.subObjectHolder {
	width: 90%;
	margin: auto;
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	& .subObject {
		background-color: var(--light_background);
		border: 2px solid var(--line_color);
		margin: auto;
		width: 49%;
		&>* {
			margin: auto;
		}
	}
}

.confirmDialog {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(100% - 4.4rem);
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

.modal {
	position: fixed;
	top: 0;
	left: 0;
	background-color: #10101050;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;	
	justify-items: center;
}

.modal>.content {
	background-color: var(--light_background);
	border: 2px solid var(--line_color);
	width: 95%;
	height: 95%;
	margin: auto;
	overflow: auto;
	filter:blur(0px);
}

.closeButton {
	position: absolute;
	top: 0;
	left: 0;
	margin: 0;
}

& label.bold {
	font-weight: bold;
	margin: .5rem;
}

& label.big {
	font-size: 1.25rem;
	display: block;
}
</style>