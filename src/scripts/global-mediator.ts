import { dispatchCustomEvent } from '../utils/events';
import { eventKey } from '../config/events';

function resetNav() {
  dispatchCustomEvent(eventKey.NAV_TOGGLE, { isOpen: false, source: 'resize' });
}

document.addEventListener('astro:before-preparation', resetNav);
