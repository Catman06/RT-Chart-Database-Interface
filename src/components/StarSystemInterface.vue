<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import SystemDisplay from './StarSystemComponents/systemDisplay.vue';
import NewSystem from './StarSystemComponents/newSystem.vue';

const mode: Ref<string | undefined> = ref();
</script>

<template>
	<div id="modeSelect">
			<label for="addRadio">Add Mode
				<input id="addRadio" type="radio" name="mode" value="add" v-model="mode" />
				<span class="mark"></span>
			</label>
			<label for="showRadio">Display Mode
				<input id="showRadio" type="radio" name="mode" value="show" v-model="mode" />
				<span class="mark"></span>
			</label>
	</div>
<NewSystem v-if="mode == 'add'" />
<SystemDisplay v-if="mode == 'show'" />
</template>

<style lang="css" scoped>
#modeSelect {
	display: flex;
	justify-content: center;
	
	& div {
		width: fit-content;
		border: 2px solid var(--line_color);
	}

	& input[type="radio"] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.mark {
		position: absolute;
		top: 0;
		left: 0;
		width: 1.5rem;
		height: 1.5rem;
		background-color: var(--lighter_background);
	}

	#addRadio ~ .mark {
		left: unset;
		right: 0;
	}

	& label {
		position: relative;
		margin: 0;

		& input:checked ~ .mark:after {
			display: block;
			top: .2rem;
			left: .2rem;
			height: calc(1.5rem - .4rem);
			width: calc(1.5rem - .4rem);
			background-color: var(--line_color);
		}
	}
	
	& label[for="addRadio"] {
		padding-right: 2rem;
	}

	& label[for="showRadio"] {
		padding-left: 2rem;
	}

	.mark:after {
		content: "";
		position: absolute;
		display: none;
	}
}
</style>