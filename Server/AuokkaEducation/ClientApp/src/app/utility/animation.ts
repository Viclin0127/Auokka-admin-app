import { trigger, transition, style, animate, state } from '@angular/animations';

export const slideIn = trigger('slideIn', [
  state('*', style({
    transform: 'translateX(100%)',
  })),
  state('in', style({
    transform: 'translateX(0)',
  })),
  state('out', style({
    transform: 'translateX(-100%)',
  })),
  transition('* => in', animate('600ms ease-in')),
  transition('in => out', animate('600ms ease-in'))
]);

export const collapseInOut = trigger(
  'collapseInOut', [
    transition(':enter', [
      style({ height: 0, opacity: 0, padding: 0, margin: 0 }),
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1, height: '*', padding: '*', margin: '*' }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ height: 0, opacity: 0, padding: 0, margin: 0 }))
    ])
  ]
)



export const collapsable = trigger(
  'collapsable', [
    state('open', style({ height: '*', opacity: 1, display: 'flex', visibility: 'visible' })),
    state('closed', style({ height: 0, opacity: 0, padding: 0, margin: 0, visibility: 'hidden' })),
    transition('open => closed', [
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)')
    ]),
    transition('closed => open', [
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)')
    ])
  ]
)

export const shrinkPadding = trigger(
  'shrinkPadding', [
    state('triggered', style({ padding: '0.75rem'})),
    state('released', style({ padding: 0 })),
    transition('triggered => released', [
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)')
    ]),
    transition('released => triggered', [
      animate('400ms cubic-bezier(0.35, 0, 0.25, 1)')
    ])
  ]
)

export const fadeInOut = trigger(
  'fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('400ms ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('400ms ease-in-out', style({ opacity: 0 }))
    ])
  ]
)

export const fadeOut = trigger(
  'fadeOut', [
    transition(':leave', [
      style({ opacity: 1 }),
      animate('400ms ease-in-out', style({ opacity: 0 }))
    ])
  ]
)

export const fadeIn = trigger(
  'fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('400ms ease-in-out', style({ opacity: 1 }))
    ])
  ]
)


export const slideToLeftOut = trigger(
  'slideToLeftOut', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('400ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0)', opacity: 1}),
      animate('400ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0}))
    ])
  ]
)

export const slideUpInOut = trigger(
  'slideUpInOut', [
    transition(':enter', [
      style({ transform: 'translateY(100%)', opacity: 0}),
      animate('300ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1}))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)', opacity: 1 }),
      animate('300ms ease-in-out', style({ transform: 'translateY(100%)', opacity: 0}))
    ])
  ]
)


export const collapseOut = trigger(
  'collapseOut', [
    transition(':leave', [
      style({ transform: 'scale(1)', opacity: 1, height: '!' }),
      animate('300ms ease-in-out', style({ transform: 'scale(0)', opacity: 0, height: 0, padding: 0, margin: 0 }))
    ])
  ]
)

export const rotateOpenClose = trigger('rotateOpenClose', [
      // ...
      state('open', style({
        transform: 'rotate(180deg)'
      })),
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      transition('open => closed', [
        animate('300ms ease-in-out')
      ]),
      transition('closed => open', [
        animate('300ms ease-in-out')
      ]),
    ])

export const slideLeftRight = trigger('slideLeftRight', [
  // ...
  state('left-out', style({
    transform: 'translateX(-100%)'
  })),
  state('right-out', style({
    transform: 'translateX(100%)'
  })),
  state('in', style({
    transform: 'translateX(0)'
  })),
  transition('left-out => in', [
    animate('300ms ease-in-out')
  ]),
  transition('right-out => in', [
    animate('300ms ease-in-out')
  ]),
  transition('in => right-out', [
    animate('300ms ease-in-out')
  ]),
  transition('in => left-out', [
    animate('300ms ease-in-out')
  ])
])

