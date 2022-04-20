/** @format */

import { useAuthenticationStore } from "../stores/authentication";

export default function auth({ next, router }) {
	const authenticationStore = useAuthenticationStore();

	if (authenticationStore.isAuthenticated) {
		return next();
	}

	return router.push({ name: "login" });
}
