import { Component, Input, ElementRef, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { LegoCar } from "./../shared/LegoCar"

@Component({
	moduleId: module.id,
	selector: 'car-control',
	templateUrl: 'control.component.html',
	styleUrls: ['control.component.css']
})
export class CarControlComponent implements AfterViewInit, OnDestroy {
    @Input()
    model: LegoCar;
    @ViewChild('directioncontrol')
    directionControl: ElementRef;
    @ViewChild('directioncontrol_knob')
    directionControlKnob: ElementRef;

    isTouchActive: boolean;
    lastTouch: any;
	resizeHandler: any;

    constructor() {
    }

    ngAfterViewInit() {
        this.setKnobPosFromSpeedAndSteer(0, 0);
		this.resizeHandler = () => this.setKnobPosFromSpeedAndSteer(0, 0);
		window.addEventListener("resize", this.resizeHandler);
    }

	ngOnDestroy() {
		window.removeEventListener("resize", this.resizeHandler);
	}

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    onDirectionControlTouchStart(ev) {
		ev.preventDefault();
		this.isTouchActive = true;
        if (ev.changedTouches) {
            this.lastTouch = ev.changedTouches[0];
        } else {
            this.lastTouch = ev;
        }
		window.requestAnimationFrame(() => this.handleTouch());
	}

    @HostListener('touchend', ['$event'])
    @HostListener('mouseup', ['$event'])
	onDirectionControlTouchEnd(ev) {
		ev.preventDefault();
		this.isTouchActive = false;
		this.lastTouch = null;
		window.requestAnimationFrame(() => this.handleTouch());
	}

    @HostListener('touchcancel', ['$event'])
    @HostListener('mouseout', ['$event'])
	onDirectionControlTouchCancel(ev) {
		ev.preventDefault();
		this.isTouchActive = false;
		this.lastTouch = null;
		window.requestAnimationFrame(() => this.handleTouch());
	}

    @HostListener('touchmove', ['$event'])
    @HostListener('mousemove', ['$event'])
	onDirectionControlTouchMove(ev) {
		ev.preventDefault();
		if (this.isTouchActive) {
            if (ev.changedTouches) {
				this.lastTouch = ev.changedTouches[0];
            } else {
                this.lastTouch = ev;
            }
			window.requestAnimationFrame(() => this.handleTouch());
		}
	}

	handleTouch() {
		if (this.lastTouch) {
			this.setKnobPosFromTouch(this.lastTouch);
		} else {
			this.setKnobPosFromSpeedAndSteer(0, 0);
		}
	}

    setKnobPosFromSpeedAndSteer(speedPercent: number, steerPercent: number) {
		var availableWidth = this.directionControl.nativeElement.offsetWidth - this.directionControlKnob.nativeElement.offsetWidth;
		var availableHeight = this.directionControl.nativeElement.offsetHeight - this.directionControlKnob.nativeElement.offsetHeight;

		var originOffsetX = this.directionControl.nativeElement.offsetLeft + this.directionControlKnob.nativeElement.offsetWidth / 2;
		var originOffsetY = this.directionControl.nativeElement.offsetTop + this.directionControlKnob.nativeElement.offsetHeight / 2;

		var offsetX = originOffsetX + ((steerPercent + 100) * availableWidth) / 200;
		var offsetY = originOffsetY + ((speedPercent + 100) * availableHeight) / 200;

		this.directionControlKnob.nativeElement.style.transform =
			"translate3d(" + (offsetX - originOffsetX) + "px," + (offsetY - originOffsetY) + "px," + "0px)";

		console.log("setting knob pos from values: speed=" + speedPercent + ", steering=" + steerPercent);

		this.model.steering = steerPercent;
		this.model.speed = speedPercent * -1;
	}

	setKnobPosFromTouch(touch: any) {
		var availableWidth = this.directionControl.nativeElement.offsetWidth - this.directionControlKnob.nativeElement.offsetWidth;
		var availableHeight = this.directionControl.nativeElement.offsetHeight - this.directionControlKnob.nativeElement.offsetHeight;

		var originOffsetX = this.directionControl.nativeElement.offsetLeft + this.directionControlKnob.nativeElement.offsetWidth / 2;
		var originOffsetY = this.directionControl.nativeElement.offsetTop + this.directionControlKnob.nativeElement.offsetHeight / 2;

		var translateX = touch.pageX - originOffsetX;
		var translateY = touch.pageY - originOffsetY;

		//normalize touch coordinates to match the control dimension		
		translateX = Math.min(Math.max(translateX, 0), availableWidth);
		translateY = Math.min(Math.max(translateY, 0), availableHeight);

		this.directionControlKnob.nativeElement.style.transform =
			"translate3d(" + (translateX) + "px," + (translateY) + "px," + "0px)";

		var xPercent = ((translateX) * 100) / availableWidth;
		var yPercent = ((translateY) * 100) / availableHeight;

		var steer = (xPercent * 2) - 100;
		var speed = (yPercent * 2) - 100;

		console.log("setting knob pos from touch: speed=" + speed + ", steering=" + steer);

		this.model.steering = steer;
		this.model.speed = speed * -1;
	}
}