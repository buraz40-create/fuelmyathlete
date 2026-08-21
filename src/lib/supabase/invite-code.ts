/**
 * Codes a person reads off one phone and types into another.
 *
 * Its own module with no imports so it can be tested: the file that uses it pulls in the
 * Supabase client, and the test runner resolves specifiers literally.
 *
 * No 0, O, 1, I or L. Those are the pairs people get wrong when reading a code aloud, and the
 * whole point of this code is that it survives being spoken across a kitchen.
 */
export const INVITE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const INVITE_LENGTH = 10;

/**
 * crypto.getRandomValues rather than Math.random. This code is the only thing between a
 * stranger and a household's meal plan, and Math.random is not built to resist guessing.
 *
 * Ten characters of a 31 letter alphabet is around 49 bits. Combined with single use and a
 * seven day expiry, guessing is not the weak point; the weak point is the person you send it to.
 */
export function generateInviteCode(): string {
  const bytes = new Uint8Array(INVITE_LENGTH);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => INVITE_ALPHABET[b % INVITE_ALPHABET.length]).join("");
}
