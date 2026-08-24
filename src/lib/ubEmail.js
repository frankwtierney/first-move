// A UB email is anything @buffalo.edu (incl. subdomains like
// @dental.buffalo.edu). Shared by the intro capture and the results lookup.
// Relax this if you ever need to accept non-UB addresses.
export const UB_EMAIL = /^[^\s@]+@([^\s@.]+\.)*buffalo\.edu$/i

export function isUbEmail(value) {
  return UB_EMAIL.test((value || '').trim())
}
