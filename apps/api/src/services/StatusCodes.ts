export const StatusCodes = {
  HTTP_CONTINUE: 100 as const,
  HTTP_SWITCHING_PROTOCOLS: 101 as const,
  HTTP_PROCESSING: 102 as const,
  HTTP_OK: 200 as const,
  HTTP_CREATED: 201 as const,
  HTTP_ACCEPTED: 202 as const,
  HTTP_NON_AUTHORITATIVE_INFORMATION: 203 as const,
  HTTP_NO_CONTENT: 204 as const,
  HTTP_RESET_CONTENT: 205 as const,
  HTTP_PARTIAL_CONTENT: 206 as const,
  HTTP_MULTI_STATUS: 207 as const,
  HTTP_ALREADY_REPORTED: 208 as const,
  HTTP_IM_USED: 226 as const,
  HTTP_MULTIPLE_CHOICES: 300 as const,
  HTTP_MOVED_PERMANENTLY: 301 as const,
  HTTP_FOUND: 302 as const,
  HTTP_SEE_OTHER: 303 as const,
  HTTP_NOT_MODIFIED: 304 as const,
  HTTP_USE_PROXY: 305 as const,
  HTTP_RESERVED: 306 as const,
  HTTP_TEMPORARY_REDIRECT: 307 as const,
  HTTP_PERMANENTLY_REDIRECT: 308 as const,
  HTTP_BAD_REQUEST: 400 as const,
  HTTP_UNAUTHORIZED: 401 as const,
  HTTP_PAYMENT_REQUIRED: 402 as const,
  HTTP_FORBIDDEN: 403 as const,
  HTTP_NOT_FOUND: 404 as const,
  HTTP_METHOD_NOT_ALLOWED: 405 as const,
  HTTP_NOT_ACCEPTABLE: 406 as const,
  HTTP_PROXY_AUTHENTICATION_REQUIRED: 407 as const,
  HTTP_REQUEST_TIMEOUT: 408 as const,
  HTTP_CONFLICT: 409 as const,
  HTTP_GONE: 410 as const,
  HTTP_LENGTH_REQUIRED: 411 as const,
  HTTP_PRECONDITION_FAILED: 412 as const,
  HTTP_REQUEST_ENTITY_TOO_LARGE: 413 as const,
  HTTP_REQUEST_URI_TOO_LONG: 414 as const,
  HTTP_UNSUPPORTED_MEDIA_TYPE: 415 as const,
  HTTP_REQUESTED_RANGE_NOT_SATISFIABLE: 416 as const,
  HTTP_EXPECTATION_FAILED: 417 as const,
  HTTP_I_AM_A_TEAPOT: 418 as const,
  HTTP_MISDIRECTED_REQUEST: 421 as const,
  HTTP_UNPROCESSABLE_ENTITY: 422 as const,
  HTTP_LOCKED: 423 as const,
  HTTP_FAILED_DEPENDENCY: 424 as const,
  HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL: 425 as const,
  HTTP_UPGRADE_REQUIRED: 426 as const,
  HTTP_PRECONDITION_REQUIRED: 428 as const,
  HTTP_TOO_MANY_REQUESTS: 429 as const,
  HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE: 431 as const,
  HTTP_UNAVAILABLE_FOR_LEGAL_REASONS: 451 as const,
  HTTP_INTERNAL_SERVER_ERROR: 500 as const,
  HTTP_NOT_IMPLEMENTED: 501 as const,
  HTTP_BAD_GATEWAY: 502 as const,
  HTTP_SERVICE_UNAVAILABLE: 503 as const,
  HTTP_GATEWAY_TIMEOUT: 504 as const,
  HTTP_VERSION_NOT_SUPPORTED: 505 as const,
  HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL: 506 as const,
  HTTP_INSUFFICIENT_STORAGE: 507 as const,
  HTTP_LOOP_DETECTED: 508 as const,
  HTTP_NOT_EXTENDED: 510 as const,
  HTTP_NETWORK_AUTHENTICATION_REQUIRED: 511 as const,
};
