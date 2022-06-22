<!-- @format -->

<template>
	<div class="main-nav">
		<div>
			<router-link to="/projects">
				<img src="/logo.svg" alt="Fusion" class="main-nav__logo" />
			</router-link>
		</div>
		<div class="dropdown-placing">
			<Dropdown :userList="usersList" />
		</div>
		<div class="main-nav__logout">
			<router-link to="/">
				<font-awesome-icon icon="arrow-right-from-bracket" size="xl" />
				Log out
			</router-link>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthenticationStore } from "../stores/authentication";
import { useRouter } from "vue-router";
import Dropdown from "../components/Dropdown.vue";
import { UserList } from "../JiraResponses/JiraProjectDetail";
import { useFirebaseStore } from "../stores/firebase";
import { httpsCallable } from "firebase/functions";
import { useSelectedUserStore } from "../stores/selecteduser";

export default defineComponent({
	components: {
		Dropdown,
	},
	setup() {
		const authenticationStore = useAuthenticationStore();
		const selectedUserStore = useSelectedUserStore();
		const router = useRouter();
		const usersList = ref<UserList[]>([]);
		const firebaseStore = useFirebaseStore();
		firebaseStore.loadFirebase();
		selectedUserStore.fetchAccountId();

		const functions = firebaseStore.functions;

		// Get all the customers from atlassian
		const userList = httpsCallable(functions, "getUsersList");
		userList().then((result) => {
			const { data } = result as {
				data: UserList[];
			};
			usersList.value = data;
		});

		// Log the user out and redirect the user to the login page
		function logout() {
			authenticationStore.logout();
			router.push({ name: "login" });
		}

		return { logout, usersList };
	},
});
</script>
