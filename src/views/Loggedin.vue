<!-- @format -->

<template>
	<div class="main-nav">
		<div>
			<img src="../style sass/logo.svg" alt="Fusion" />
		</div>	
		<div>
		</div>
		<div>
		</div>
		<div>
			<h3 class="main-nav__name">
				Welkom John Doe
			</h3>
		</div>
		<div>
			<LogoutButton />
		</div>
	</div>
	<br>
	<h2>
		Overzicht:
	</h2>
	<div class="main-box">
		<div class="ticket-columns">
			<div class="ticket-columns__box">
				<h4>
					Ticket #123
				</h4>
				<h3>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				</p>
			</div>
			<div class="ticket-columns__box">
				<h4>
					Ticket #123
				</h4>
				<h3>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				</p>
			</div>
			<div class="ticket-columns__box">
				<h4>
					Ticket #123
				</h4>
				<h3>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				</p>
			</div>
		</div>
		<div class="side-columns">
			<div class="side-columns__box">
				<h2>
					Tickets:
				</h2>
				<h1>
					5
				</h1>
				<br>
				<h2>
					Uren:
				</h2>
				<h1>
					76 uur
				</h1>
				<br>
				<h2>
					Kosten:
				</h2>
				<h1>
					€7600
				</h1>
			</div>
			<div class="side-columns__box--empty">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoutButton from "../components/LogoutButton.vue";

export default defineComponent({
	components: {
    LogoutButton
},
});
</script>
