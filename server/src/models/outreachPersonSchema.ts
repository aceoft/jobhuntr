import { Schema } from 'mongoose';

export const outreachEventSchema = new Schema(
	{
		text: {
			type: String,
			trim: true,
		},
		isResponse: {
			type: Boolean,
			required: true,
		},
		at: {
			type: Date,
			required: true,
		},
	},
	{ _id: false },
);

export const outreachPersonSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		url: {
			type: String,
			trim: true,
		},
		events: {
			type: [outreachEventSchema],
			default: [],
		},
	},
	{ _id: false },
);
