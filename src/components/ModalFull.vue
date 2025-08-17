<script lang="ts" setup>
const emit = defineEmits(['close-pressed']);
// Saves how many modals are open (including itself) so that it doesn't close when a modal above it closes
const index = document.getElementsByClassName("modalBackground").length + 1;

function closeModal(event: Event) {
	if (event instanceof KeyboardEvent && event.key != "Escape") {
		return;
	}
	if (index == document.getElementsByClassName("modalBackground").length) {
		document.removeEventListener("keyup", closeModal);
		emit('close-pressed');
	}
}

document.addEventListener("keyup", closeModal);
</script>

<template>
<Teleport to="#content">
	<div class="modalBackground">
		<div class="modal">
			<button class="closeButton" type="button" @click="closeModal">X</button>
			<slot></slot>
		</div>
	</div>
</Teleport>
</template>

<style lang="css" scoped>
.modalBackground {
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

.modal {
	background-color: var(--light_background);
	border: 2px solid var(--line_color);
	width: 95%;
	height: 95%;
	margin: auto;
	overflow: auto;
	filter:blur(0px);
}

.closeButton {
	position: sticky;
	float: left;
	top: 0;
	left: 0;
	margin: 0;
}
</style>