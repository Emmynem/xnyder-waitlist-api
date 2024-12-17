import { DB, USER, PASSWORD, HOST, dialect as _dialect, logging as _logging, pool as _pool, dialectOptions as _dialectOptions, timezone, production } from "../config/db.config.js";
import Sequelize from "sequelize";
import apiKeysModel from "./apiKeys.model.js";
import appDefaultsModel from "./appDefaults.model.js";
import newsletterModel from "./newsletter.model.js";

const sequelize = new Sequelize(
	DB,
	USER,
	PASSWORD,
	{
		host: HOST,
		dialect: _dialect,
		logging: _logging,
		operatorsAliases: 0,
		pool: {
			max: _pool.max,
			min: _pool.min,
			acquire: _pool.acquire,
			idle: _pool.idle,
			evict: _pool.evict
		},
		dialectOptions: {
			// useUTC: _dialectOptions.useUTC, 
			dateStrings: _dialectOptions.dateStrings,
			typeCast: _dialectOptions.typeCast
		},
		timezone: timezone
	}
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// * Binding models
db.api_keys = apiKeysModel(sequelize, Sequelize);
db.app_defaults = appDefaultsModel(sequelize, Sequelize);
db.newsletter = newsletterModel(sequelize, Sequelize);

// End - Binding models

// Associations

// End - Associations

export default db;
