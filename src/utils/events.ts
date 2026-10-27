import type { eventKey } from '../config/events';
import type { NavigationButtonEventInterface } from '../env';

type EventRegistry = {
  [eventKey.NAV_TOGGLE]: NavigationButtonEventInterface;
};

export function dispatchCustomEvent<K extends keyof EventRegistry>(
  eventName: K,
  detail: EventRegistry[K],
  options?: Omit<CustomEventInit, 'details'>,
): boolean {
  if (typeof document === 'undefined') return false;

  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    ...options,
    detail,
  });

  return document.dispatchEvent(event);
}
