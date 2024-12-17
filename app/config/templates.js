import { return_all_orders_table, year_str } from "./config";

const top_logo = "https://res.cloudinary.com/dydpyidi5/image/upload/v1733162504/logo/ctrtkvi1wbhnywvuo1oh.png";
const bottom_logo = "https://res.cloudinary.com/dydpyidi5/image/upload/v1733162504/logo/ctrtkvi1wbhnywvuo1oh.png";

const copyright_year = year_str();

export const user_email_verification = (data) => {
	const email_subject = `Verify your email address`;
	const email_text = `Details of email here`;
	const email_html = `Details of email here`;

	return { email_html, email_subject, email_text };
};
