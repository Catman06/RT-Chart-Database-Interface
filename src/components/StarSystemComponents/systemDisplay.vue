<script lang="ts" setup>
import { onMounted, ref, type PropType } from 'vue';
import { StarSystem } from '../../StarSystem';

const SystemID = defineModel('id', { type: Number });
const SystemIn = defineModel('system', { type: Object as PropType<StarSystem> });
const System = ref(SystemIn.value ? SystemIn.value : SystemIn.value = new StarSystem);

const changeModal = ref(false);

const SystemNames = ref();
async function getSystemNames() {
	return (await fetch(`https://zipperserver.duckdns.org/php/systemGetLists.php?col=names`)).json();
}

async function getSystemFromID(id: number): Promise<StarSystem> {
	return (await (await fetch(`https://zipperserver.duckdns.org./php/systemGetContent.php?id=${id}`)).json())[0].system;
}

onMounted(async () => {
	let changeButton = document.getElementById("changeButton");
	changeButton?.addEventListener("click", async () => {
		SystemNames.value = await getSystemNames();
	})
})
</script>

<template>
	<div>
		<h1>{{ System.name ? System.name : "System" }}</h1>
		<button id="changeButton" @click="changeModal = true">Change</button>
	</div>
	<h2>Star{{ System.stars.length > 1 ? "s" : "" }}</h2>
	<div class="star" v-for="star in System.stars">
		<p>Name: {{ star.name ? star.name : "Undefined" }}</p>
		<p>Type: {{ star.type ? star.type : "Undefined" }}</p>
		<p v-if="star.info">Info: {{ star.info }}</p>
	</div>
	<Teleport to="#content">
		<div class="modal" v-if="changeModal">
			<div class="content">
				<button class="closeButton" type="button" @click="changeModal = false">X</button>
				<button v-for="system in SystemNames" @click="async () => { 
					let returned: StarSystem = await getSystemFromID(system.id);
					System = returned;
					SystemIn = returned;
					SystemID = system.id; 
					}">
					<p>ID: {{ system.id }}</p>
					<p>Name: {{ system.name }}</p>
				</button>
			</div>
		</div>
	</Teleport>
</template>

<style lang="css" scoped>
	h1 {
		display: inline;
		font-size: xx-large;
	}

	h2 {
		font-size: x-large;
	}
</style>