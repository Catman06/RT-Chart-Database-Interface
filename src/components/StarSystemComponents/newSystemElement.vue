<script lang="ts" setup>
import { ref, type PropType, type Ref } from 'vue';
import { SystemElement } from '../../StarSystem';
import NewResource from './newResource.vue';

const element = defineModel({ type: [SystemElement] as PropType<SystemElement>, required: true});

const resourceModalOpen = ref(false);
const resourceKeys: Ref<number[]> = ref([]);

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
		<button type="button">Planet</button>
		
	</div>
</div>
<div id="resourceModal" v-if="resourceModalOpen">
	<div class="content">
		<button class="closeButton" type="button" @click="resourceModalOpen = false">X</button>
		<label>Resource Modal for {{  element.name }}</label>
		<div id="resources">
			<template v-for="resource in element.resources">
				<NewResource />
			</template>
		</div>
	</div>
</div>
</template>

<style lang="css" scoped>
textarea {
		display: block;
		width: 90%;
		height: 5rem;
		margin: auto;
}

#resourceModal {
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
</style>