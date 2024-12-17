import { validationResult, matchedData } from 'express-validator';
import { ServerError, SuccessResponse, ValidationError, OtherSuccessResponse, NotFoundError, BadRequestError, logger } from '../common/index.js';
import {
	false_status, true_status, tag_root, paginate, timestamp_str_alt
} from '../config/config.js';
import db from "../models/index.js";

const NEWSLETTER = db.newsletter;
const Op = db.Sequelize.Op;

export async function getAnalytics(req, res) {

	try {
		const total_newsletters = await NEWSLETTER.count();

		SuccessResponse(res, { unique_id: tag_root, text: "Analytics Loaded" }, {
			total_newsletters
		});
	} catch (err) {
		ServerError(res, { unique_id: tag_root, text: err.message }, null);
	}
};