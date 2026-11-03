import type { eventKey } from './config/events';

export interface NavigationButtonEventInterface {
  isOpen: boolean;
  source: 'trigger' | 'resize' | 'escape';
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
