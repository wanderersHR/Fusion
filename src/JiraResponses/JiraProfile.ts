/** @format */

import { ExtendedProfile } from "./JiraProfileExtended";

export interface JiraProfile {
	account_id: string;
	email: string;
	name: string;
	picture: string;
	account_status: string;
	last_updated: Date;
	nickname: string;
	locale: string;
	extended_profile: ExtendedProfile;
	account_type: string;
	email_verified: boolean;
}
