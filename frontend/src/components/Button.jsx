import React from 'react';
import { cn } from '../lib/cn';

export const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={cn(
      'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      className
    )}
    ref={ref}
    {...props}
  />
));
Button.displayName = 'Button';

export const ButtonSecondary = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={cn(
      'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
      className
    )}
    ref={ref}
    {...props}
  />
));
ButtonSecondary.displayName = 'ButtonSecondary';

export const ButtonDanger = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={cn(
      'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      className
    )}
    ref={ref}
    {...props}
  />
));
ButtonDanger.displayName = 'ButtonDanger';

export const ButtonWarning = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={cn(
      'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
      className
    )}
    ref={ref}
    {...props}
  />
));
ButtonWarning.displayName = 'ButtonWarning';
