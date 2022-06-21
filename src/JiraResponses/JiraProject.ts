/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { StringLike } from "@firebase/util";

export interface AvatarUrls {
	"48x48": string;
	"24x24": string;
	"16x16": string;
	"32x32": string;
}

export interface Permissions {
	canEdit: boolean;
}

export interface Properties {}

export interface JiraProject {
	expand: string;
	self: string;
	id: string;
	key: string;
	description: string;
	name: string;
	avatarUrls: AvatarUrls;
	projectTypeKey: string;
	simplified: boolean;
	style: string;
	isPrivate: boolean;
	permissions: Permissions;
	properties: Properties;
}
