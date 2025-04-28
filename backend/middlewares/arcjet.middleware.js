import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const userAgent = req.headers["user-agent"] || "Unknown-UA";
    const decision = await aj.protect(req, {
      requested: 1,
      ua: userAgent,
      ip: req.ip,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const error = new Error("Too many requests");
        error.status = 429; // Too Many Requests
        throw error;
      } else if (decision.reason.isBot()) {
        const error = new Error("Bot detected");
        error.status = 403; // Forbidden
        throw error;
      } else if (decision.reason.isShield()) {
        const error = new Error("Request blocked by shield");
        error.status = 403; // Forbidden
        throw error;
      } else {
        const error = new Error("Request denied");
        error.status = 403; // Forbidden
        throw error;
      }
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    next(error);
  }
};

export default arcjetMiddleware;
