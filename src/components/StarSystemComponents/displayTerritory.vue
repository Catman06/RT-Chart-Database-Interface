<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import type { Territory } from '../../StarSystem';

const props = defineProps({'territory': { type: Object as PropType<Territory>, required: true }});
const territory = ref(props.territory);

const territoryShown = ref(false);
</script>

<template>
	<div class="content">
		<p class="hoverable name" @click="territoryShown = !territoryShown">{{  territory.name ? territory.name : "Undefined" }}{{ territoryShown ? " \u25BC" : " \u25C0"}}</p>
		<template v-if="territoryShown">
			<p>Terrain: {{  territory.terrain ? territory.terrain : "Undefined" }}</p>
			<pre v-if="territory.info">Info: {{ territory.info }}</pre>
			<template v-if="territory.traits.length > 0">
				<p>Trait{{ territory.traits.length > 1 ? "s" : "" }}</p>
				<div class="contentHolder">
					<div class="content" v-for="trait in territory.traits">
						<p>Type: {{ trait.type ? trait.type : "Undefined" }}</p>
						<pre v-if="trait.info">Info: {{ trait.info }}</pre>
					</div>
				</div>
			</template>
			<template v-if="territory.landmarks.length > 0">
				<p>Landmark{{ territory.landmarks.length > 1 ? "s" : "" }}</p>
				<div class="contentHolder">
					<div class="content" v-for="landmark in territory.landmarks">
						<p>Type: {{ landmark.type ? landmark.type : "Undefined" }}</p>
						<pre v-if="landmark.info">Info: {{ landmark.info }}</pre>
					</div>
				</div>
			</template>
		</template>
	</div>
</template>