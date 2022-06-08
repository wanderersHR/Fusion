/** @format */

import { useAuthenticationStore } from "../stores/authentication";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export default async function auth(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const authenticationStore = useAuthenticationStore();

	if (await authenticationStore.isAuthenticated()) {
		return next();
	}

	return next({ name: "login" });
}
