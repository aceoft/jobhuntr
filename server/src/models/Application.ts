import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
import { ApplicationStatusValues, ApplicationLevelValues, FirstResponseTypeValues } from 'jobhuntr-shared';
import { outreachPersonSchema } from './outreachPersonSchema';

const applicationStatusChangeSchema = new Schema(
	{
		status: {
			type: String,
			enum: ApplicationStatusValues,
			required: true,
		},
		at: {
			type: Date,
			required: true,
		},
		note: {
			type: String,
			trim: true,
		},
	},
	{ _id: false },
);

const noteSchema = new Schema({
	text: {
		type: String,
		required: true,
		trim: true,
	},
	at: {
		type: Date,
		required: true,
	},
});

const applicationSchema = new Schema(
	{
		companyId: {
			type: Schema.Types.ObjectId,
			ref: 'Company',
			required: true,
			index: true,
		},
		companyNameSnapshot: {
			type: String,
			required: true,
			trim: true,
		},
		roleTitle: {
			type: String,
			required: true,
			trim: true,
		},
		postingUrl: {
			type: String,
			trim: true,
		},
		postingSource: {
			type: String,
			trim: true,
		},
		level: {
			type: String,
			enum: ApplicationLevelValues,
			required: true,
			index: true,
		},
		salaryRangeLow: {
			type: Number,
			min: 0,
		},
		salaryRangeHigh: {
			type: Number,
			min: 0,
		},
		resumeUsed: {
			type: String,
			trim: true,
		},

		status: {
			type: String,
			enum: ApplicationStatusValues,
			required: true,
			index: true,
		},
		open: {
			type: Boolean,
			required: true,
			default: true,
			index: true,
		},

		postedAt: Date,
		appliedAt: Date,
		postingAgeDaysAtApply: {
			type: Number,
			min: 0,
		},

		firstResponseAt: Date,
		firstResponseType: {
			type: String,
			enum: FirstResponseTypeValues,
		},

		rejectedAt: Date,
		closedAt: Date,

		statusHistory: {
			type: [applicationStatusChangeSchema],
			default: [],
		},
		outreach: {
			type: [outreachPersonSchema],
			default: [],
		},
		notes: {
			type: [noteSchema],
			default: [],
		},
	},
	{
		timestamps: true,
	},
);

applicationSchema.index({ companyId: 1, createdAt: -1 });
applicationSchema.index({ open: 1, status: 1 });
applicationSchema.index({ appliedAt: -1 });

export type ApplicationDocument = HydratedDocument<InferSchemaType<typeof applicationSchema>>;

export const Application = model('Application', applicationSchema);
