/** @format */

import { useAuthenticationStore } from "../stores/authentication";

export default function guest(to, from, next) {
	const authenticationStore = useAuthenticationStore();

	if (authenticationStore.isAuthenticated) {
		return next({ name: "home" });
	}

	return next();
}
