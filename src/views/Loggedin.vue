<!-- @format -->

<template>
	<div class="mainnav">
		<div class="itemnav">
			<img src="../style sass/logo.svg" alt="Fusion" />
		</div>	
		<div class="itemnav">
		</div>
		<div class="itemnav">
		</div>
		<div class="itemnav">
			<h3 class="johnav">
				Welkom John Doe
			</h3>
		</div>
		<div class="itemnav">
		</div>
	</div>
	<br>
	<h2>
		Overzicht:
	</h2>
	<div class="mainflex">
		<div class="ticketcolumns">
			<div class="ticketbox">
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
			<div class="ticketbox">
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
			<div class="ticketbox">
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
			<div class="ticketbox">
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
			<div class="ticketbox">
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
		<div class="sidecolumns">
			<div class="sidebox">
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
			<div class="sidebox1">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginButton from "../components/LoginButton.vue";

export default defineComponent({
	components: {
    LoginButton
},
});
</script>
