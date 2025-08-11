<script lang="ts" setup>
import systemNew from './StarSystemComponents/systemNew.vue';
async function getNames() {
	return (await fetch(`https://zipperserver.duckdns.org/php/systemsGetNames.php`)).json();
}
async function getSystem(name: string) {
	return (await fetch(`https://zipperserver.duckdns.org/php/systemGetSystem?name=${name}`)).json();
}
</script>

<template>
<systemNew />
</template>

<style lang="css" scoped>

</style>