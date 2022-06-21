/** @format */

export interface Employee {
	id: string;
	name: string;
}

export interface Organization {
	id: string;
	name: string;
}

export interface Project {
	id: string;
	name: string;
	project_number: string;
	organization: Organization;
}

export interface Projectservice {
	id: string;
	name: string;
	start_date: string;
	default_service_id: string;
	revenue_group_id: string;
}

export interface Vatclass {
	id: string;
	label: string;
	percentage: number;
}

export interface Type {
	id: string;
	type: string;
	vatclass: Vatclass;
	label: string;
	tariff: string;
	color: string;
}

export interface CustomField {
	id: string;
	name: string;
	label: string;
	render_type: string;
	position: number;
	value_type: string;
	options: any[];
}

export interface IsEditable {
	value: boolean;
}

export interface IsDeletable {
	value: boolean;
}

export interface Corrections {
	amount: number;
	value: number;
	last_correction_date: string;
}

export interface HourResponse {
	id: string;
	employee: Employee;
	project: Project;
	projectservice: Projectservice;
	type: Type;
	tariff: number;
	custom_fields: CustomField[];
	created_at: string;
	updated_at: string;
	locked: boolean;
	is_editable: IsEditable;
	is_deletable: IsDeletable;
	corrections: Corrections;
	is_productive: boolean;
	hours: number;
	start_date: string;
	end_date: string;
	is_time_defined: boolean;
	is_recurring: boolean;
	is_external: boolean;
	billable: boolean;
	note: string;
	should_sync_to_cronofy: boolean;
	source: string;
}

export interface Hour {
	data: HourResponse[];
}

export interface UserList {
	self: string;
	key: string;
	accountId: string;
	accountType: string;
	name: string;
	avatarUrls: AvatarUrls;
	displayName: string;
	active: boolean;
}

export interface AvatarUrls {
	"48x48": string;
	"24x24": string;
	"16x16": string;
	"32x32": string;
}
