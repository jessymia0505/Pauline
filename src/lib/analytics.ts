
// Analytics utility for Plausible
// This handles custom event tracking to reduce bounce rate and track engagement

declare global {
  interface Window {
    plausible: any;
  }
}

// Initialize the plausible function if it doesn't exist
if (typeof window !== 'undefined') {
  window.plausible = window.plausible || function() {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };
}

/**
 * Tracks a pageview in Plausible Analytics
 * @param path Optional path to track, defaults to current location
 */
export const trackPageView = (path?: string) => {
  if (typeof window !== 'undefined' && window.plausible) {
    try {
      const url = path ? `${window.location.origin}/${path}` : window.location.href;
      window.plausible('pageview', { url });
      console.log(`[Analytics] Tracked pageview: ${url}`);
    } catch (error) {
      console.error('[Analytics] Error tracking pageview:', error);
    }
  }
};

/**
 * Tracks a custom event in Plausible Analytics
 * @param eventName The name of the event to track
 * @param props Optional properties to include with the event
 */
export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    try {
      if (props) {
        window.plausible(eventName, { props });
      } else {
        window.plausible(eventName);
      }
      console.log(`[Analytics] Tracked event: ${eventName}`, props || '');
    } catch (error) {
      console.error('[Analytics] Error tracking event:', error);
    }
  }
};

export const AnalyticsEvents = {
  GAME_START: 'Game Start',
  GAME_OVER: 'Game Over',
  LEVEL_COMPLETE: 'Level Complete',
  VIEW_LEADERBOARD: 'View Leaderboard',
  VIEW_HOW_TO_PLAY: 'View How to Play',
  VIEW_CONTACT: 'View Contact',
  SCORE_SAVED: 'Score Saved',
  MENU_OPEN: 'Menu Open',
  HEARTBEAT: 'Heartbeat',
};
