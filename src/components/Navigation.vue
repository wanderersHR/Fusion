<!-- @format -->

<template>
	<div class="main-nav">
		<div>
			<router-link to="/projects">
				<img src="/logo.svg" alt="Fusion" class="main-nav__logo" />
			</router-link>
		</div>
		<div>
			<Dropdown :userList="usersList" />

			<router-link to="/">
				<font-awesome-icon icon="arrow-right-from-bracket" size="xl" />
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

		const userList = httpsCallable(functions, "getUsersList");
		userList().then((result) => {
			const { data } = result as {
				data: UserList[];
			};
			usersList.value = data;
		});

		function logout() {
			authenticationStore.logout();
			router.push({ name: "login" });
		}

		return { logout, usersList };
	},
});
</script>
