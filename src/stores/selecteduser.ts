/** @format */

import { defineStore } from "pinia";

export const useSelectedUserStore = defineStore("selecteduser", {
	state: () => {
		return {
			account_id: null as string | null,
		};
	},
	actions: {
		setAccountId(account_id: string) {
			this.account_id = account_id;
			localStorage.setItem("selectedUser", account_id);
		},
		removeAccountId() {
			localStorage.removeItem("selectedUser");
			this.account_id = null;
		},
		fetchAccountId() {
			if (localStorage.getItem("selectedUser")) {
				this.account_id = localStorage.getItem("selectedUser");
			}
		},
	},
	getters: {
		getAccountId: (state) => state.account_id,
	},
});
