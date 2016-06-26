import { ComponentResolver, OpaqueToken } from '@angular/core';
import { OverlayState } from './overlay-state';
import { OverlayRef } from './overlay-ref';
import { OverlayPositionBuilder } from './position/overlay-position-builder';
import { ViewportRuler } from './position/viewport-ruler';
/** Token used to inject the DOM element that serves as the overlay container. */
export declare const OVERLAY_CONTAINER_TOKEN: OpaqueToken;
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
export declare class Overlay {
    private _overlayContainerElement;
    private _componentResolver;
    private _positionBuilder;
    constructor(_overlayContainerElement: HTMLElement, _componentResolver: ComponentResolver, _positionBuilder: OverlayPositionBuilder);
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns A reference to the created overlay.
     */
    create(state?: OverlayState): Promise<OverlayRef>;
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    position(): OverlayPositionBuilder;
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Promise resolving to the created element.
     */
    private _createPaneElement();
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    private _createPortalHost(pane);
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     * @param state
     * @returns {OverlayRef}
     */
    private _createOverlayRef(pane, state);
}
/** Providers for Overlay and its related injectables. */
export declare const OVERLAY_PROVIDERS: (typeof ViewportRuler | typeof OverlayPositionBuilder | typeof Overlay)[];
export { OverlayState } from './overlay-state';
export { OverlayRef } from './overlay-ref';
export { createOverlayContainer } from './overlay-container';
export { OVERLAY_DIRECTIVES, ConnectedOverlayDirective, OverlayOrigin } from './overlay-directives';
