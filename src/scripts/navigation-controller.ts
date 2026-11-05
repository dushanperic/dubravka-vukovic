import { eventKey } from '../config/events';
import type { EventType } from '../env';
import { dispatchCustomEvent } from '../utils/events';

if (typeof HTMLElement !== 'undefined') {
  class NavigationController extends HTMLElement {
    private isOpen = false;
    private breakpoint = 768;

    private button: HTMLButtonElement | null = null;
    private menu: HTMLElement | null = null;

    connectedCallback() {
      this.button = this.querySelector<HTMLButtonElement>('button');
      this.menu = this.querySelector<HTMLElement>('nav');

      this.breakpoint = Number(this.dataset.breakpoint) || 768;

      this.button?.addEventListener('click', this.toggle);
      document.addEventListener(eventKey.NAV_TOGGLE, this.onToggle);
      window.addEventListener('resize', this.onResize);
      window.addEventListener('keydown', this.onKeyDown);

      this.syncUI();
    }

    disconectedCallback() {
      this.button?.removeEventListener('click', this.toggle);
      document.removeEventListener(eventKey.NAV_TOGGLE, this.onToggle);
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('keydown', this.onKeyDown);
    }

    private setOpen(isOpen: boolean, source: EventType) {
      dispatchCustomEvent(eventKey.NAV_TOGGLE, {
        isOpen,
        source,
      });
    }

    private toggle = () => {
      this.setOpen(!this.isOpen, 'trigger');
    };

    private onToggle = (e: DocumentEventMap['site:navigation-toggle']) => {
      this.isOpen = e.detail.isOpen;
      this.syncUI();
    };

    private onResize = () => {
      const isDesktop = window.innerWidth >= this.breakpoint;

      if (isDesktop !== this.isOpen) {
        this.setOpen(false, 'resize');
      }
    };

    private onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.setOpen(false, 'escape');
      }
    };

    private syncUI() {
      this.button?.setAttribute('aria-expanded', String(this.isOpen));
      this.menu?.setAttribute('data-state', this.isOpen ? 'open' : 'closed');
    }
  }

  if (!customElements.get('navigation-controller')) {
    customElements.define('navigation-controler', NavigationController);
  }
}
