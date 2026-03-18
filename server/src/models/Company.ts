import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		careersUrl: String,
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Company', companySchema);
