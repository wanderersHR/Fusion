/** @format */

import { defineStore } from "pinia";
import { json } from "stream/consumers";
import loginData from "../data.json";

interface AccessTokenResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

export const useAuthenticationStore = defineStore("authentication", {
	state: () => {
		return { token: undefined as string | undefined, accessToken: undefined as AccessTokenResponse | undefined };
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
				});
		},
		logout() {
			this.token = undefined;
			this.accessToken = undefined;
			localStorage.removeItem("accessToken");
		},
		fetchAccessToken() {
			const token = localStorage.getItem("accessToken");

			if (token != null) {
				this.accessToken = JSON.parse(token);
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
				});
		},
		fetchdata() {
			if (this.isAuthenticated) {
				fetch("https://api.atlassian.com/me", {
					headers: {
						Authorization: "Bearer " + this.getBearerToken,
						Accept: "application/json",
					},
				})
					.then((res) => res.json())
					.then((data) => localStorage.setItem("fetchData", JSON.stringify(data)));
			}
		},
	},
	getters: {
		isAuthenticated: (state) => state.accessToken?.access_token != undefined,
		getBearerToken: (state) => state.accessToken?.access_token,
		getRefreshToken: (state) => state.accessToken?.refresh_token,
	},
});
