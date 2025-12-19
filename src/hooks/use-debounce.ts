import { useEffect, useState } from "react"

export function useDebounce<ValueT>(value: ValueT, delay: number = 500): [ValueT] {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return [debouncedValue]
}
