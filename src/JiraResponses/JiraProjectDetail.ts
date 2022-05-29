/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

export interface Issuetype {
	self: string;
	id: string;
	description: string;
	iconUrl: string;
	name: string;
	subtask: boolean;
	avatarId: number;
	hierarchyLevel: number;
}

export interface AvatarUrls {
	"48x48": string;
	"24x24": string;
	"16x16": string;
	"32x32": string;
}

export interface Project {
	self: string;
	id: string;
	key: string;
	name: string;
	projectTypeKey: string;
	simplified: boolean;
	avatarUrls: AvatarUrls;
}

export interface Links {
	self: string;
}

export interface StartTime {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: any;
}

export interface BreachTime {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: any;
}

export interface GoalDuration {
	millis: number;
	friendly: string;
}

export interface ElapsedTime {
	millis: number;
	friendly: string;
}

export interface RemainingTime {
	millis: number;
	friendly: string;
}

export interface OngoingCycle {
	startTime: StartTime;
	breachTime: BreachTime;
	breached: boolean;
	paused: boolean;
	withinCalendarHours: boolean;
	goalDuration: GoalDuration;
	elapsedTime: ElapsedTime;
	remainingTime: RemainingTime;
}

export interface Customfield10035 {
	id: string;
	name: string;
	_links: Links;
	completedCycles: any[];
	ongoingCycle: OngoingCycle;
}

export interface StartTime2 {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: number;
}

export interface StopTime {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: number;
}

export interface BreachTime2 {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: number;
}

export interface GoalDuration2 {
	millis: number;
	friendly: string;
}

export interface ElapsedTime2 {
	millis: number;
	friendly: string;
}

export interface RemainingTime2 {
	millis: number;
	friendly: string;
}

export interface CompletedCycle {
	startTime: StartTime2;
	stopTime: StopTime;
	breachTime: BreachTime2;
	breached: boolean;
	goalDuration: GoalDuration2;
	elapsedTime: ElapsedTime2;
	remainingTime: RemainingTime2;
}

export interface StartTime3 {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: any;
}

export interface BreachTime3 {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: any;
}

export interface GoalDuration3 {
	millis: number;
	friendly: string;
}

export interface ElapsedTime3 {
	millis: number;
	friendly: string;
}

export interface RemainingTime3 {
	millis: number;
	friendly: string;
}

export interface OngoingCycle2 {
	startTime: StartTime3;
	breachTime: BreachTime3;
	breached: boolean;
	paused: boolean;
	withinCalendarHours: boolean;
	goalDuration: GoalDuration3;
	elapsedTime: ElapsedTime3;
	remainingTime: RemainingTime3;
}

export interface Customfield10036 {
	id: string;
	name: string;
	_links: Links;
	completedCycles: CompletedCycle[];
	ongoingCycle: OngoingCycle2;
}

export interface Customfield10037 {
	languageCode: string;
	displayName: string;
}

export interface Watches {
	self: string;
	watchCount: number;
	isWatching: boolean;
}

export interface Priority {
	self: string;
	iconUrl: string;
	name: string;
	id: string;
}

export interface NonEditableReason {
	reason: string;
	message: string;
}

export interface Customfield10018 {
	hasEpicLinkFieldDependency: boolean;
	showField: boolean;
	nonEditableReason: NonEditableReason;
}

export interface StatusCategory {
	self: string;
	id: number;
	key: string;
	colorName: string;
	name: string;
}

export interface Status {
	self: string;
	description: string;
	iconUrl: string;
	name: string;
	id: string;
	statusCategory: StatusCategory;
}

export interface Content2 {
	type: string;
	text: string;
}

export interface Content {
	type: string;
	content: Content2[];
}

export interface Description {
	version: number;
	type: string;
	content: Content[];
}

export interface IconUrls {
	"48x48": string;
	"24x24": string;
	"16x16": string;
	"32x32": string;
}

export interface Icon {
	id: string;
	_links: Links;
}

export interface RequestType {
	_expands: string[];
	id: string;
	_links: Links;
	name: string;
	description: string;
	helpText: string;
	issueTypeId: string;
	serviceDeskId: string;
	groupIds: string[];
	icon: Icon;
}

export interface StatusDate {
	iso8601: Date;
	jira: Date;
	friendly: string;
	epochMillis: any;
}

export interface CurrentStatus {
	status: string;
	statusCategory: string;
	statusDate: StatusDate;
}

export interface Customfield10010 {
	_links: Links;
	requestType: RequestType;
	currentStatus: CurrentStatus;
}

export interface Customfield10055 {
	id: string;
	name: string;
	_links: Links;
	completedCycles: any[];
}

export interface Customfield10056 {
	id: string;
	name: string;
	_links: Links;
	completedCycles: any[];
}

export interface Creator {
	self: string;
	accountId: string;
	emailAddress: string;
	avatarUrls: AvatarUrls;
	displayName: string;
	active: boolean;
	timeZone: string;
	accountType: string;
}

export interface Reporter {
	self: string;
	accountId: string;
	emailAddress: string;
	avatarUrls: AvatarUrls;
	displayName: string;
	active: boolean;
	timeZone: string;
	accountType: string;
}

export interface Aggregateprogress {
	progress: number;
	total: number;
}

export interface Progress {
	progress: number;
	total: number;
}

export interface Votes {
	self: string;
	votes: number;
	hasVoted: boolean;
}

export interface Fields {
	statuscategorychangedate: Date;
	issuetype: Issuetype;
	timespent?: any;
	customfield_10030?: any;
	project: Project;
	fixVersions: any[];
	customfield_10033?: any;
	aggregatetimespent?: any;
	customfield_10034?: any;
	customfield_10035: Customfield10035;
	resolution?: any;
	customfield_10036: Customfield10036;
	customfield_10037: Customfield10037;
	customfield_10027?: any;
	customfield_10028: any[];
	customfield_10029?: any;
	resolutiondate?: any;
	workratio: number;
	watches: Watches;
	lastViewed: Date;
	created: Date;
	customfield_10020?: any;
	customfield_10021?: any;
	customfield_10022?: any;
	customfield_10023?: any;
	priority: Priority;
	customfield_10024?: Date;
	customfield_10025?: any;
	customfield_10026: string;
	labels: any[];
	customfield_10016?: any;
	customfield_10017?: any;
	customfield_10018: Customfield10018;
	customfield_10019: string;
	aggregatetimeoriginalestimate?: any;
	timeestimate?: any;
	versions: any[];
	issuelinks: any[];
	assignee?: any;
	updated: Date;
	status: Status;
	components: any[];
	customfield_10050?: any;
	timeoriginalestimate?: any;
	customfield_10051?: any;
	customfield_10052?: any;
	description: Description;
	customfield_10053: any[];
	customfield_10054?: any;
	customfield_10010: Customfield10010;
	customfield_10055: Customfield10055;
	customfield_10056: Customfield10056;
	customfield_10014?: any;
	customfield_10015?: any;
	customfield_10005?: any;
	customfield_10049?: any;
	customfield_10006?: any;
	customfield_10007?: any;
	security?: any;
	customfield_10008?: any;
	customfield_10009?: any;
	aggregatetimeestimate?: any;
	summary: string;
	creator: Creator;
	subtasks: any[];
	customfield_10040?: any;
	customfield_10041?: any;
	customfield_10042?: any;
	reporter: Reporter;
	customfield_10043?: any;
	aggregateprogress: Aggregateprogress;
	customfield_10000: string;
	customfield_10044?: any;
	customfield_10001?: any;
	customfield_10045?: any;
	customfield_10002: any[];
	customfield_10046?: any;
	customfield_10047?: any;
	customfield_10003?: any;
	customfield_10048?: any;
	customfield_10004?: any;
	customfield_10038?: any;
	customfield_10039?: any;
	environment?: any;
	duedate?: any;
	progress: Progress;
	votes: Votes;
}

export interface Issue {
	expand: string;
	id: string;
	self: string;
	key: string;
	fields: Fields;
}

export interface JiraProjectDetails {
	expand: string;
	startAt: number;
	maxResults: number;
	total: number;
	issues: Issue[];
}
