import {
  MaintenanceWindow
} from 'checkly/constructs';

// Maintenance Window
export const maintenanceWindow = new MaintenanceWindow('next-danube-maintenance-window-1', {
  name: 'Next Danube Website Maintenance',
  // the tag determines what is created by 
  tags: ['next-danube'],
  // 2023-07-20 at 11 PM EST in UTC
  startsAt: new Date(Date.UTC(2023, 6, 21, 4, 0, 0)), // Note: JavaScript's months are 0-indexed
  // 2023-07-21 at 12 AM EST in UTC
  endsAt: new Date(Date.UTC(2023, 6, 21, 5, 0, 0)),
  repeatInterval: 1,
  repeatUnit: 'MONTH',
  repeatEndsAt: new Date(new Date().valueOf() + (2160 * 60 * 60 * 1000)), // ~three months from now
})