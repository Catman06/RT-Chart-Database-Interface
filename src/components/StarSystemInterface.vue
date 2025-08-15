<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import SystemDisplay from './StarSystemComponents/systemDisplay.vue';
import NewSystem from './StarSystemComponents/systemEdit.vue';
import type { StarSystem } from '../StarSystem';

const System: Ref<StarSystem | undefined> = ref();
const SystemID: Ref<number | undefined> = ref();
const mode: Ref<string | undefined> = ref("show");
</script>

<template>
	<div id="loginText">
		<p>// IDENTITY VERIFIED</p>
		<p>// SYSTEM DISPLAY ACCESS GRANTED</p>
	</div>
	<div id="modeSelect">
		<label for="showRadio">Display Mode
			<input id="showRadio" type="radio" name="mode" value="show" v-model="mode" />
			<span class="mark"></span>
		</label>
			<label for="editRadio">Edit Mode
				<input id="editRadio" type="radio" name="mode" value="edit" v-model="mode" />
				<span class="mark"></span>
			</label>
	</div>
<NewSystem v-if="mode == 'edit'" v-model:system="System" v-model:id="SystemID" />
<SystemDisplay v-if="mode == 'show'" v-model:system="System" v-model:id="SystemID" />
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

	#showRadio ~ .mark {
		left: unset;
		right: 0;
	}

	& label {
		position: relative;
		margin: 0;
		width: 7.5rem;

		& input:checked ~ .mark:after {
			display: block;
			top: .2rem;
			left: .2rem;
			height: calc(1.5rem - .4rem);
			width: calc(1.5rem - .4rem);
			background-color: var(--line_color);
		}
	}
	
	& label[for="showRadio"] {
		text-align: right;
		padding-right: 2rem;
	}

	& label[for="editRadio"] {
		text-align: left;
		padding-left: 2rem;
	}

	.mark:after {
		content: "";
		position: absolute;
		display: none;
	}
}
</style>