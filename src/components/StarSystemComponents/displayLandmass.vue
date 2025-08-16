<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import type { Landmass } from '../../StarSystem';
import DisplayTerritory from './displayTerritory.vue';

const props = defineProps({'landmass': { type: Object as PropType<Landmass>, required: true }});
const landmass = ref(props.landmass);

const landmassShown = ref(false);
</script>

<template>
<div class="wide content">
	<p class="hoverable name" @click="landmassShown = !landmassShown">{{  landmass.name ? landmass.name : "Undefined" }}{{ landmassShown ? " \u25BC" : " \u25C0"}}</p>
	<template v-if="landmassShown">
		<pre v-if="landmass.info">Info: {{ landmass.info }}</pre>
		<template v-if="landmass.territories.length > 0">
			<p>Territor{{ landmass.territories.length > 1 ? "ies" : "y" }}</p>
			<div class="contentHolder">
				<DisplayTerritory v-for="territory in landmass.territories" :territory="territory"></DisplayTerritory>
			</div>
		</template>
	</template>
	</div>
</template>

<style lang="css" scoped>
</style>