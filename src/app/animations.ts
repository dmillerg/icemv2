import { trigger, transition, style, animate } from "@angular/animations";

export const scaleAnimation = trigger('scaleAnimation', [
    transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('500ms', style({ transform: 'scale(1)', opacity: 1 })),
    ]),
    transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('500ms', style({ transform: 'scale(2)', opacity: 0 })),
    ]),
]);