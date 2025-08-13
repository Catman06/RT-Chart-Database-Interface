<script lang="ts" setup>
import type { PropType } from 'vue';
import { Resource } from '../../StarSystem';

const resource = defineModel({ type: [Resource] as PropType<Resource>, required: true});
</script>

<template>
	<div>
			<label for="resourceType">Type
				<input name="resourceType" v-model="resource.type" required>
			</label>
			<label for="resourceQuantity">Quantity
				<input name="resourceQuantity" type="number" v-model="resource.quantity" required>
			</label>
			<label for="resourceExploited">Exploited
				<input name="resourceExploited" type="checkbox" v-model="resource.exploited">
			</label>
			<label for="resourceInfo">Resource Info
				<textarea name="resourceInfo" v-model="resource.info" />
			</label>
	</div>
</template>

<style lang="css" scoped>

</style>