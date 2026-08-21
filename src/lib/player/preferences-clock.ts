// When the device-local preferences last changed.
//
// Its own module with no imports, because both preference stores write it and the sync layer
// reads it, and anything richer would be a circular import.
//
// Why a timestamp at all: exclusions and the weekly schedule cannot be merged item by item the
// way the meal plan is. Restoring oatmeal on the phone and then merging with a stale laptop
// copy that still excludes it would silently undo the restore, and the parent would have no way
// to tell which device was arguing with them. Whole-record last-write-wins is blunt, but it is
// predictable, and these are two small settings a parent changes rarely and deliberately.

const KEY = "fma:preferences-updated-at";

export function markPreferencesChanged(when: string = new Date().toISOString()): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, when);
  } catch {
    // Storage blocked or full. The change still applies for this session; it just will not be
    // recognised as the newer copy on another device.
  }
}

export function preferencesUpdatedAt(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
