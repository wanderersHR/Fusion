/** @format */

import { defineStore } from "pinia";

interface AccessTokenResponse {
	access_token: string;
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
				grant_type: "authorization_code",
				client_id: "o5OphqyH8bmxCcQqnaJvlZFslyyclMm7",
				client_secret: "SYTQwcrq4w8P5dLl4ZxXybwGT2CmfN_SDv9DJK4FxJfsIxb7sw26PgBe1WrzHPim",
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
	},
	getters: {
		isAuthenticated: (state) => state.accessToken?.access_token != undefined,
		getBearerToken: (state) => state.accessToken?.access_token,
	},
});
