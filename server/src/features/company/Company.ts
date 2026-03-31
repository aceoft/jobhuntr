import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
import { outreachPersonSchema } from '../outreach/outreachPersonSchema';

const companySchema = new Schema(
	{
		name: { type: String, required: true },
		careersUrl: String,
		outreach: {
			type: [outreachPersonSchema],
			default: [],
		},
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	},
);

export type CompanyDocument = HydratedDocument<InferSchemaType<typeof companySchema>>;
export const Company = model('Company', companySchema);
