/** @format */

import { useAuthenticationStore } from "../stores/authentication";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export default function guest(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
	const authenticationStore = useAuthenticationStore();

	if (authenticationStore.isAuthenticated) {
		return next({ name: "home" });
	}

	return next();
}
