<script lang="ts" setup>

</script>

<template>
	<div id="loginText">
		<p>// IDENTITY VERIFIED</p>
		<p>// ARCHIVE ACCESS GRANTED</p>
	</div>
	<div id="downloads">
		<p>++++ DOWNLOADS</p>
		<p>++ IMAGES</p>
		<p>
			<a href="Downloads/Heraldry Valentine.svg" download>
				VALENTINE HERALDIC ACHEIVEMENT (SVG)
			</a>
			 | USES FONTS "<a href="https://www.dafont.com/cloister-black.font">CLOISTER BLACK</a>" & "<a href="https://fonts.google.com/specimen/IM+Fell+English+SC?query=IM+fell">IM FELL ENGLISH SC</a>"
		</p>
		<a href="Downloads/Heraldry Valentine.png" download>
			<p>VALENTINE HERALDIC ACHEIVEMENT (PNG)</p>
		</a>
		<p>
			<a href="Downloads/Koronus Expanse Printable.svg" download>
				KORONUS EXPANSE MAP
			</a>
			 | USES FONTS "<a href="https://fonts.google.com/specimen/IM+Fell+English+SC?query=IM+fell">IM FELL ENGLISH SC</a>" & "<a href="Downloads/REQUIEM-Inquisitor.otf" download>REQUIEM-INQUISITOR</a>"
		</p>
		<a href="Downloads/Valentine Coat of Arms Logo.svg" download>
			<p>VALENTINE LOGO</p>
		</a>
		<a href="Downloads/Downloads/Valentine Coat of Arms Logo Greyscale.svg" download>
			<p>VALENTINE LOGO GREYSCALE</p>
		</a>
		<p>++ PRINTABLES</p>
		<p>
			<a href="Downloads/roguetrader_charactersheet_v3_Valentine.pdf" download>CHARACTER SHEET</a>
			 | BASED ON <a href="https://georgellovett.wordpress.com/portfolio/rogue-trader-character-sheet-redesign/">THIS</a> SHEET
		</p>
		<a href="Downloads/NPC Sheets.pdf" download>NPC SHEETS</a>
		<p>
			<a href="Downloads/Ship Sheet.pdf" download>SHIP SHEET</a>
			 | BASED ON THE ONE IN THE CORE RULEBOOK
		</p>
		<a href="Downloads/Vehicle Sheet.pdf" download>VEHICLE SHEET</a>
	</div>
</template>

<style lang="css" scoped>
#downloads {
	text-align: left;
	line-height: 1;
	padding: 1rem;

	& a {
		color: lch(from var(--line_color) calc(l + 30) calc(c - 10) h);
	}
}
</style>