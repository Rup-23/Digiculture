export {}

const Roles = {
  ADMIN: 'digi_culture',
  MODERATOR: 'Member',
}

globalThis.CustomJwtSessionClaims = globalThis.CustomJwtSessionClaims || {};

globalThis.CustomJwtSessionClaims.metadata = {
  role: undefined, // Optional, can be 'admin' or 'moderator'
}

export { Roles }
