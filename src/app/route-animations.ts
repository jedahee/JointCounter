// TS FOR PAGE TRANSITIONS

// IMPORTS
import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
} from '@angular/animations';

// Basic

export const fader = trigger('routeAnimations', [
        transition('* <=> *', [ // CONDITIONS
            query(':enter, :leave', [ // TRIGGERS
                style({ // STYLES...
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    opacity: 0,
                    transform: 'scale(1.2)',

                }),
                
            ], { optional: true }),

            query(':enter', [ // TRIGGER
                animate('600ms ease', // TIME AND TRANSITION TYPE 
                    style({ // STYLES...
                        opacity: 1,
                        transform: 'scale(1)',
                    })
                )
            ], { optional: true }) // FOR FIX ERROR IN CONSOLE
        ]),
    ]);
