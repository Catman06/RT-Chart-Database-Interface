<script lang="ts" setup>
import { ref, type PropType, type Ref } from 'vue';
import { Resource, SystemElement } from '../../StarSystem';
import NewResource from './newResource.vue';
import NewPlanet from './newPlanet.vue';

const element = defineModel({ type: [SystemElement] as PropType<SystemElement>, required: true});

const resourceModalOpen = ref(false);
const resourceKeys: Ref<number[]> = ref([]);
const planetModalOpen = ref(false);

function addResource() {
	let index = resourceKeys.value.length;
	while (resourceKeys.value.includes(index)) { index++ };
	element.value.resources[element.value.resources.length] = new Resource;
	resourceKeys.value.push(index);
}
function getResourceIndex(resourceKey: number) {
	return resourceKeys.value.indexOf(resourceKey);
}
function deleteResource(resourceKey: number) {
	let index = getResourceIndex(resourceKey);
	element.value.resources.splice(index, 1);
	resourceKeys.value.splice(index, 1);
}
</script>

<template>
<div>
	<div>
		<label for="elementName">Element Name</label>
		<input name="elementName" v-model="element.name">
	</div>
	<div>
		<label for="elementType">Element Type</label>
		<input name="elementType" v-model="element.type">
	</div>
	<div>
		<label for="elementInfo">Element Info</label>
		<textarea name="elementInfo" v-model="element.info" />
	</div>
	<div>
		<button type="button" @click="resourceModalOpen = true">Resources</button>
	</div>
	<div>
		<button type="button" @click="planetModalOpen = true">Planet</button>
		
	</div>
</div>
<div class="modal" v-if="resourceModalOpen">
	<div class="content">
		<button class="closeButton" type="button" @click="resourceModalOpen = false">X</button>
		<label>Resource Modal for {{  element.name }}</label>
		<div id="resources">
			<template v-for="resourceKey in resourceKeys" :key="resourceKey" >
				<div class="resource">
					<NewResource v-model="element.resources[getResourceIndex(resourceKey)]" />
					<button type="button" @click="deleteResource(resourceKey)">X</button>
				</div>
			</template>
		</div>
		<button type="button" @click="addResource">Add Resource</button>
	</div>
</div>
<div class="modal" v-if="planetModalOpen">
	<div class="content">
		<button class="closeButton" type="button" @click="planetModalOpen = false">X</button>
		<NewPlanet v-model="element" />
	</div>
</div>
</template>

<style lang="css" scoped>
textarea {
		display: block;
		width: 90%;
		height: 5rem;
		margin: auto;
		z-index: 10;
}

.modal {
	z-index: 20;
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

.content {
	background-color: var(--light_background);
	border: 2px solid var(--line_color);
	width: 95%;
	height: 95%;
	margin: auto;
}

.closeButton {
	position: absolute;
	top: 2.5%;
	left: 2.5%;
	margin: 0;
}

#resources {
width: 90%;
margin: auto;
display: flex;
align-items: center;
flex-wrap: wrap;

	& .resource {
		margin: auto;
		width: 50%;
		&>* {
			margin: auto;
		}
	}
}
</style>