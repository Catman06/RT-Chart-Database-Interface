<script lang="ts" setup>
import { onMounted, ref, type PropType } from 'vue';
import { StarSystem } from '../../StarSystem';
import DisplayElement from './displayElement.vue';
import ModalFull from '../ModalFull.vue';

const SystemID = defineModel('id', { type: Number });
const System = defineModel('system', { type: Object as PropType<StarSystem>, default: new StarSystem });

const changeModalOpen = ref(false);

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
		<button id="changeButton" @click="changeModalOpen = true">Change</button>
	</div>
	<h2 class="subtitle">Info</h2>
	<pre class="sysInfo" v-if="System.info">{{ System.info }}</pre>
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
	<ModalFull v-if="changeModalOpen" @close-pressed="changeModalOpen = false">
		<button v-for="system in SystemNames" @click="async () => { 
			let returned: StarSystem = await getSystemFromID(system.id);
			System = returned;
			SystemID = system.id; 
			changeModalOpen = false;
		}">
					<p>ID: {{ system.id }}</p>
					<p>Name: {{ system.name }}</p>
				</button>
	</ModalFull>
</template>

<style lang="css">
	.title {
		display: inline;
		font-size: xx-large;
	}

	.subtitle {
		font-size: x-large;
	}

	.name {
		font-size: larger;
	}
	
	.sysInfo {
		border: 2px solid var(--line_color);
		margin: auto;
		padding: 0 .5rem;
		max-width: 90%;
		white-space: pre-wrap;
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

		& .hoverable:hover {
			background-color: hsl(from var(--lighter_background) h calc(s - 5) calc(l + 10));
		}
		
		pre {
			font: inherit;
		}
		
		& .content {
			width: fit-content;
			max-width: 95%;
			margin: .25rem auto;
			border: 2px solid var(--line_color);
			padding: 0 0 .5rem 0;
			background-color: var(--light_background);
		}
		& .wide.content {
			width: 95%;
		}
	}

</style>