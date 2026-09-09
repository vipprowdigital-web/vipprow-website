import mongoSanitize from "express-mongo-sanitize";

/**
 * NoSQL-injection guard for request payloads.
 *
 * Strips keys that start with "$" or contain "." from the request body
 * (and route params) so a client can't smuggle Mongo query/update
 * operators such as { "email": { "$ne": null } } or { "role.$": ... }
 * into a controller that passes req.body straight to a query.
 *
 * Why not `app.use(mongoSanitize())` directly:
 *   express-mongo-sanitize@2's middleware reassigns `req.query`, which
 *   throws under Express 5 (req.query is a getter-only property). Here we
 *   call its in-place sanitizer instead and never reassign anything.
 *
 * req.query is intentionally left untouched: Express's default "simple"
 * query parser only ever produces string values (or arrays of strings),
 * so req.query cannot carry a nested operator object.
 */
const sanitizeMongo = (req, _res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
};

export default sanitizeMongo;
