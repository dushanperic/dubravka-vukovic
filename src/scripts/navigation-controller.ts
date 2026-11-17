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

    disconnectedCallback() {
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
      if (
        !this.isOpen &&
        (e.detail.source === 'escape' || e.detail.source === 'overlay')
      ) {
        this.button?.focus();
      }
    };

    private onResize = () => {
      const isDesktop = window.innerWidth >= this.breakpoint;

      if (isDesktop && this.isOpen) {
        this.setOpen(false, 'resize');
      } else {
        this.syncUI();
      }
    };

    private onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.setOpen(false, 'escape');
      }
    };

    private syncUI() {
      const isDesktop = window.innerWidth >= this.breakpoint;
      this.button?.setAttribute('aria-expanded', String(this.isOpen));
      if (this.menu) {
        this.menu.dataset.state = this.isOpen ? 'open' : 'closed';
        const isHidden = !isDesktop && !this.isOpen;
        if (isHidden && this.menu.contains(document.activeElement)) {
          this.button?.focus();
        }
        this.menu.inert = isHidden;
        this.menu.setAttribute('aria-hidden', String(isHidden));
      }
    }
  }

  if (!customElements.get('navigation-controller')) {
    customElements.define('navigation-controller', NavigationController);
  }
}
