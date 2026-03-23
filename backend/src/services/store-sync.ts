/**
 * Store sync service — stubs for App Store / Play Store data sync.
 *
 * Real implementation requires:
 *
 * Apple (App Store Connect):
 *   - APP_STORE_CONNECT_KEY_ID
 *   - APP_STORE_CONNECT_ISSUER_ID
 *   - APP_STORE_CONNECT_PRIVATE_KEY ( .p8 content )
 *
 * Google (Play Console):
 *   - Google Play service account JSON (downloaded from Play Console)
 *
 * Use App Store Connect API and Google Play Developer API to fetch
 * rankings and reviews. Store results in app_store_rankings and app_store_reviews.
 */

export async function syncAppStoreRankings(
  _appId: string,
  _store: "ios" | "android" | "amazon",
): Promise<void> {
  // Stub: real impl would call App Store Connect / Play API
  return;
}

export async function syncAppStoreReviews(
  _appId: string,
  _store: "ios" | "android" | "amazon",
): Promise<void> {
  // Stub: real impl would call App Store Connect / Play API
  return;
}
