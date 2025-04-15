import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://36be948fdd4ed19a7814987b57b6da58@o4509152952254464.ingest.de.sentry.io/4509152954875984',

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

// This export will instrument router navigations, and is only relevant if you enable tracing.
// `captureRouterTransitionStart` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
