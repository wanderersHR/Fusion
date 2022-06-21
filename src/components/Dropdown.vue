<!-- @format -->

<template>
	<div v-if="usertype != 'customer'" class="dropdown">
		<button @click="show = !show" class="dropbtn">
			<font-awesome-icon icon="chevron-circle-down" size="xl" /> User List
		</button>
		<div v-if="show && usertype != 'customer'">
			<div class="dropdown-content">
				<a href="#" @click="setUser(user.accountId)" v-for="user in userList" v-bind:key="user.accountId">{{
					user.displayName
				}}</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { UserList } from "../JiraResponses/JiraProjectDetail";
import { useAuthenticationStore } from "../stores/authentication";
import { useSelectedUserStore } from "../stores/selecteduser";

export default defineComponent({
	props: {
		userList: {
			type: Object as () => UserList[],
			required: true,
		},
	},
	setup(props) {
		const { userList } = toRefs(props);
		const selectedUser = useSelectedUserStore();
		const authstore = useAuthenticationStore();
		const usertype = ref(authstore.getUser?.account_type);
		const show = ref(false);

		function setUser(account_id: string) {
			selectedUser.setAccountId(account_id);
			console.log(account_id);
			console.log(usertype);
		}

		return {
			show,
			userList,
			setUser,
			usertype,
		};
	},
});
</script>
