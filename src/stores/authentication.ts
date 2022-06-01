/** @format */

import { defineStore } from "pinia";
import loginData from "../data.json";
import { JiraProfile } from "../JiraResponses/JiraProfile";

interface AccessTokenResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

export const useAuthenticationStore = defineStore("authentication", {
	state: () => {
		return {
			token: undefined as string | undefined,
			accessToken: undefined as AccessTokenResponse | undefined,
			user: undefined as JiraProfile | undefined,
		};
	},
	actions: {
		login(token: string) {
			this.token = token;

			const data = {
				grant_type: loginData.grant_type,
				client_id: loginData.client_id,
				client_secret: loginData.client_secret,
				code: this.token,
				redirect_uri: window.location.origin + "/callback",
			};

			fetch("https://auth.atlassian.com/oauth/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((data) => {
					this.accessToken = data as AccessTokenResponse;
					localStorage.setItem("accessToken", JSON.stringify(data));
					this.getUserFromApi();
				});
		},
		logout() {
			this.token = undefined;
			this.accessToken = undefined;
			this.user = undefined;
			localStorage.removeItem("accessToken");
			localStorage.removeItem("user");
		},
		fetchAccessToken() {
			const token = localStorage.getItem("accessToken");

			if (token != null) {
				this.accessToken = JSON.parse(token);
			}
		},
		fetchUser() {
			const user = localStorage.getItem("user");

			if (user != null) {
				this.user = JSON.parse(user);
			}
		},
		refresh() {
			const refreshData = {
				grant_type: "refresh_token",
				client_id: loginData.client_id,
				client_secret: loginData.client_secret,
				refresh_token: this.getRefreshToken,
			};

			fetch(`https://auth.atlassian.com/oauth/token`, {
				method: "POST",
				headers: {
					"Content-type": "appplication/json",
				},
				body: JSON.stringify(refreshData),
			})
				.then((response) => response.json())
				.then((data) => {
					this.accessToken = data as AccessTokenResponse;
					localStorage.setItem("accessToken", JSON.stringify(data));
					this.getUserFromApi();
				});
		},
		getUserFromApi() {
			if (this.isAuthenticated) {
				fetch("https://api.atlassian.com/me", {
					headers: {
						Authorization: "Bearer " + this.getBearerToken,
						Accept: "application/json",
					},
				})
					.then((res) => res.json())
					.then((data) => {
						localStorage.setItem("user", JSON.stringify(data));
						this.user = data as JiraProfile;
					});
			}
		},
	},
	getters: {
		isAuthenticated: (state) => state.accessToken?.access_token != undefined,
		getBearerToken: (state) => state.accessToken?.access_token,
		getRefreshToken: (state) => state.accessToken?.refresh_token,
		getUser: (state) => state.user,
	},
});
