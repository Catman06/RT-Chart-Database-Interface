<script lang="ts" setup>
import { onMounted, ref, type PropType } from 'vue';
import { StarSystem } from '../../StarSystem';
import DisplayElement from './displayElement.vue';

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
		<h1 class="title">{{ System.name ? System.name : "System" }}</h1>
		<button id="changeButton" @click="changeModal = true">Change</button>
	</div>
	<h2 class="subtitle">Star{{ System.stars.length > 1 ? "s" : "" }}</h2>
	<div class="contentHolder">
		<div class="star content" v-for="star in System.stars">
			<p>Name: {{ star.name ? star.name : "Undefined" }}</p>
			<p>Type: {{ star.type ? star.type : "Undefined" }}</p>
			<pre v-if="star.info">Info: {{ star.info }}</pre>
		</div>
	</div>
	<h2>System Element{{ System.elements.length > 1 ? "s" : "" }}</h2>
	<div class="contentHolder">
		<DisplayElement class="wide content" v-for="element in System.elements" :element="element" />
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

<style lang="css">
	.title {
		display: inline;
		font-size: xx-large;
	}

	.subtitle {
		font-size: x-large;
	}
	
	.contentHolder {
		display: flex;
		flex-wrap: wrap;
		
		& p, pre {
			margin:auto;
			padding: 0 .5rem;
			white-space: pre-wrap;
		}
		& p:nth-child(2n) {
			background-color: var(--lighter_background);
		}
		
		pre {
			font: inherit;
		}
		
		& .content {
			width: fit-content;
			max-width: 95%;
			margin: auto;
			border: 2px solid var(--line_color);
			padding: .5rem 0;
			background-color: var(--light_background);
		}
		& .wide.content {
			width: 95%;
		}
	}
</style>