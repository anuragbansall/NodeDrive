import arcjet, {
  shield,
  detectBot,
  tokenBucket,
  validateEmail,
} from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src", "requested", "ua"], // characteristics to be used for the decision
  // ip.src: the source IP address of the request
  // requested: the requested resource (e.g., URL path)
  // ua: the user agent string of the request
  // You can add more characteristics as needed
  rules: [
    shield({ mode: "LIVE" }), // Shield rule to block unwanted traffic
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "POSTMAN"],
    }), // Detect bots and allow search engines and Postman
    validateEmail({
      mode: "LIVE",
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }), // Validate email addresses and deny disposable, invalid, and no MX records
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // 5 tokens per 10 sec
      interval: 10,
      capacity: 10,
    }), // Token bucket rate limiting
  ],
});

export default aj;
