<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps(['systemIn']);

const starSystem = computed(() => {
	return props.systemIn ? props.systemIn : undefined;
})
</script>

<template>

</template>

<style lang="css" scoped>

</style>