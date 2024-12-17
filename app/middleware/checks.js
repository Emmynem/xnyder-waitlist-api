import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { UnauthorizedError, ForbiddenError, SuccessResponse } from '../common/index.js';
import db from "../models/index.js";
import { 
    access_granted, access_suspended, default_delete_status, xwaitlist_header_key, xwaitlist_header_token, tag_root, tag_internal_api_key
} from "../config/config.js";

dotenv.config();

const { secret } = process.env;

const { verify } = jwt;

const API_KEYS = db.api_keys;

const verifyKey = (req, res, next) => {
    const key = req.headers[xwaitlist_header_key] || req.query.key || req.body.key || '';
    if (!key) {
        ForbiddenError(res, "No key provided!", null);
    } else {
        req.API_KEY = key;
        next();
    }
};

const keyExists = (req, res, next) => {
    API_KEYS.findOne({
        where: {
            type: tag_root,
            api_key: req.API_KEY
        }
    }).then(api_key => {
        if (!api_key) {
            ForbiddenError(res, `Require ${tag_root} key!`, null);
        } else if (api_key.status === default_delete_status) {
            ForbiddenError(res, "Api key not available!", null);
        } else {
            SuccessResponse(res, "Key Exists!", { type: api_key.type });
        }
    });
};

const isRootKey = (req, res, next) => {
    API_KEYS.findOne({
        where: {
            type: tag_root,
            api_key: req.API_KEY
        }
    }).then(api_key => {
        if (!api_key) {
            ForbiddenError(res, `Require ${tag_root} key!`, null);
        } else if (api_key.status === default_delete_status) {
            ForbiddenError(res, "Api key not available!", null);
        } else {
            next();
        }
    });
};

const isInternalKey = (req, res, next) => {
    API_KEYS.findOne({
        where: {
            type: tag_internal_api_key,
            api_key: req.API_KEY
        }
    }).then(api_key => {
        if (!api_key) {
            ForbiddenError(res, `Require ${tag_internal_api_key} key!`, null);
        } else if (api_key.status === default_delete_status) {
            ForbiddenError(res, "Api key not available!", null);
        } else {
            next();
        }
    });
};

const verifyToken = (req, res, next) => {
    let token = req.headers[xwaitlist_header_token] || req.query.token || req.body.token || '';
    if (!token) {
        ForbiddenError(res, "No token provided!", null);
    } else {
        verify(token, secret, (err, decoded) => {
            if (err) {
                UnauthorizedError(res, "Unauthorized!", null);
            } else {
                if (!decoded.user_unique_id) {
                    UnauthorizedError(res, "Invalid token!", null);
                } else {
                    req.USER_UNIQUE_ID = decoded.user_unique_id;
                    next();
                }
            }
        });
    }
};

export default { verifyKey, verifyToken, isRootKey, isInternalKey, keyExists };