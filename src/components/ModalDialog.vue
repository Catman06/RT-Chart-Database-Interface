<script lang="ts" setup>

</script>

<template>
<Teleport to="#content">
	<div class="dialog">
		<div class="dialogContent">
			<slot></slot>
		</div>
	</div>
</Teleport>
</template>

<style lang="css" scoped>
.dialog {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(100%);
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #10101080;

	& .dialogContent {
		background-color: var(--light_background);
		border: 2px solid var(--line_color);
		padding: 1rem;
	}
}
</style>