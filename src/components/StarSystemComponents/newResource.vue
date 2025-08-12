<script lang="ts" setup>
import type { PropType } from 'vue';
import { Resource } from '../../StarSystem';

const resource = defineModel({ type: [Resource] as PropType<Resource>, required: true});
</script>

<template>
	<div>
		<div>
			<label for="resourceType">Type</label>
			<input name="resourceType" v-model="resource.type" required>
		</div>
		<div>
			<label for="resourceQuantity">Quantity</label>
			<input name="resourceQuantity" type="number" v-model="resource.quantity" required>
		</div>
		<div>
			<label for="resourceExploited">Exploited</label>
			<input name="resourceExploited" type="checkbox" v-model="resource.exploited">
		</div>
		<div>
			<label for="resourceInfo">Resource Info</label>
			<textarea name="resourceInfo" v-model="resource.info" />
		</div>
	</div>
</template>

<style lang="css" scoped>

</style>