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
		<label for="elementName">Name</label>
		<input name="elementName" v-model="element.name">
	</div>
	<div>
		<label for="elementZone">Solar Zone</label>
		<input name="elementZone" v-model="element.zone">
	</div>
	<div>
		<label for="elementType">Type</label>
		<input name="elementType" v-model="element.type">
	</div>
	<div>
		<label for="elementInfo">Info</label>
		<textarea name="elementInfo" v-model="element.info" />
	</div>
	<button type="button" @click="resourceModalOpen = true">Resources</button>
	<!-- Planet button only appears when element.type is "planet" or "moon" (Case insensitive) -->
	<button type="button" @click="planetModalOpen = true" v-if="element.type?.match(/^(planet|moon)$/i)">Planet</button>
</div>
<Teleport to="body">
	<div class="modal" v-if="resourceModalOpen">
		<div class="content">
			<button class="closeButton" type="button" @click="resourceModalOpen = false">X</button>
			<label class="bold big">Resource Modal for {{  element.name ? element.name : "System Element" }}</label>
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
</Teleport>
<Teleport to="body">
	<div class="modal" v-if="planetModalOpen">
		<div class="content">
			<button class="closeButton" type="button" @click="planetModalOpen = false">X</button>
			<label class="bold big">Planet Modal for {{  element.name ? element.name : "System Element"  }}</label>
			<NewPlanet v-model="element" />
		</div>
	</div>
</Teleport>
</template>

<style lang="css">
textarea {
		display: block;
		width: 90%;
		height: 5rem;
		margin: auto;
}

.modal {
	position: fixed;
	top: 0;
	left: 0;
	background-color: #10101050;
	width: 100%;
	height: calc(100% - 4.4rem);
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