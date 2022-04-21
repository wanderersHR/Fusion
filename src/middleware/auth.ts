/** @format */

import { useAuthenticationStore } from "../stores/authentication";

export default function auth(to, from, next) {
	const authenticationStore = useAuthenticationStore();

	if (authenticationStore.isAuthenticated) {
		return next();
	}

	return next({ name: "login" });
}
