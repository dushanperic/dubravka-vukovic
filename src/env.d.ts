import type { eventKey } from './config/events';

export type EventType = 'trigger' | 'resize' | 'escape' | 'overlay';
export interface NavigationButtonEventInterface {
  isOpen: boolean;
  source: EventType;
}

declare global {
  interface DocumentEventMap {
    [eventKey.NAV_TOGGLE]: CustomEvent<NavigationButtonEventInterface>;
  }
  interface Window {
    __curtainListenersAttached?: boolean;
  }
}

export {};
