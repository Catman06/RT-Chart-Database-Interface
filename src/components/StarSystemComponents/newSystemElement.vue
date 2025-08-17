<script lang="ts" setup>
import { ref, type PropType, type Ref } from 'vue';
import { Resource, SystemElement } from '../../StarSystem';
import NewResource from './newResource.vue';
import NewPlanet from './newPlanet.vue';
import ModalFull from '../ModalFull.vue';

const element = defineModel({ type: Object as PropType<SystemElement>, required: true});

const resourceModalOpen = ref(false);
const resourceKeys: Ref<number[]> = ref([]);
element.value.resources.forEach(() => {
	resourceKeys.value.push(resourceKeys.value.length);
});
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
	<label for="elementName">Name
		<input name="elementName" v-model="element.name">
	</label>
	<label for="elementZone">Solar Zone
		<input name="elementZone" v-model="element.zone">
	</label>
	<label for="elementZone">Order from Star
		<input name="elementOrder" v-model="element.order">
	</label>
	<label for="elementType">Type
		<input name="elementType" v-model="element.type">
	</label>
	<label for="elementInfo">Info
		<textarea name="elementInfo" v-model="element.info" />
	</label>
	<button type="button" @click="resourceModalOpen = true">Resources</button>
	<!-- Planet button only appears when element.type is "planet", "moon", or "gas giant" (Case insensitive) -->
	<button type="button" @click="planetModalOpen = true" v-if="element.type?.match(/^(planet|moon|gas\sgiant)$/i)">Planet</button>
</div>
<ModalFull v-if="resourceModalOpen" @close-pressed="resourceModalOpen = false">
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
</ModalFull>
<ModalFull v-if="planetModalOpen" @close-pressed="planetModalOpen = false">
	<label class="bold big">Planet Modal for {{  element.name ? element.name : "System Element"  }}</label>
	<NewPlanet v-model="element" />
</ModalFull>
</template>

<style lang="css" scoped>
#resources {
width: 90%;
margin: auto;
display: flex;
align-items: center;
flex-wrap: wrap;

& .resource {
		border: 2px solid var(--line_color);
		margin: auto;
		width: 49%;
		&>* {
			margin: auto;
		}
	}
}
</style>