/** @format */

import { useAuthenticationStore } from "../stores/authentication";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export default async function guest(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const authenticationStore = useAuthenticationStore();

	if (await authenticationStore.isAuthenticated()) {
		return next({ name: "home" });
	}

	return next();
}
