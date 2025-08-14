<script lang="ts" setup>
import { ref, type PropType, type Ref } from 'vue';
import { Landmass, Territory } from '../../StarSystem';
import NewTerritory from './newTerritory.vue';

const landmass = defineModel({ type: Object as PropType<Landmass>, required: true});

const territoriesModalOpen = ref(false);
const territoryKeys: Ref<number[]> = ref([]);
for (let i = 0; i < landmass.value.territories.length; i++) {
	addTerritory();
}

function addTerritory() {
	let index = territoryKeys.value.length;
	while (territoryKeys.value.includes(index)) { index++ };
	landmass.value.territories[landmass.value.territories.length] = new Territory;
	territoryKeys.value.push(index);
}
function getTerritoryIndex(territoryKey: number) {
	return territoryKeys.value.indexOf(territoryKey);
}
const dialogTerritoryKey: Ref<number | undefined> = ref();
function deleteTerritory(territoryKey: number) {
	let index = getTerritoryIndex(territoryKey);
	landmass.value.territories.splice(index, 1);
	territoryKeys.value.splice(index, 1);
}
</script>

<template>
<div>
	<label>Name
		<input v-model="landmass.name">
	</label>
	<label>Info
		<textarea v-model="landmass.info" />
	</label>
	<button type="button" @click="territoriesModalOpen = true">Territories</button>
</div>
<Teleport to="#content">
	<div class="modal" v-if="territoriesModalOpen">
		<div class="content">
			<button class="closeButton" type="button" @click="territoriesModalOpen = false">X</button>
			<label class="bold big">Territories Modal for {{  landmass.name ? landmass.name : "Landmass" }}</label>
			<div class="subObjectHolder">
				<template v-for="territoryKey in territoryKeys" :key="territoryKey" >
					<div class="subObject">
						<NewTerritory v-model="landmass.territories[getTerritoryIndex(territoryKey)]" />
						<button type="button" @click="dialogTerritoryKey = territoryKey">X</button>
					</div>
				</template>
			</div>
			<button type="button" @click="addTerritory">Add Territory</button>
		</div>
	</div>
</Teleport>
<Teleport to="#content">
	<div class="confirmDialog" v-if="dialogTerritoryKey != undefined">
		<div class="dialogContent">
			<label class="bold">Do you really want to delete {{  landmass.territories[getTerritoryIndex(dialogTerritoryKey)].name ? landmass.territories[getTerritoryIndex(dialogTerritoryKey)].name : "unnamed territory" }}?</label>
			<button @click="deleteTerritory(dialogTerritoryKey); dialogTerritoryKey = undefined">Yes</button>
			<button @click="dialogTerritoryKey = undefined">No</button>
		</div>
	</div>
</Teleport>
</template>

<style lang="css" scoped>

</style>