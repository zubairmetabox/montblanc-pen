'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
    placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, id, ...props }, ref) => {
        const generatedId = React.useId()
        const selectId = id || generatedId

        return (
            <div className="space-y-2">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <select
                    id={selectId}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-destructive focus-visible:ring-destructive',
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
        )
    }
)
Select.displayName = 'Select'

export { Select }
