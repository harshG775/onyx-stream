export function formatRuntime(minutes: number | undefined): string {
    if (!minutes || minutes <= 0) return "N/A"

    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    if (h > 0) return `${h}h ${m}m`
    return `${m}m`
}

export function formatDate(dateString?: string): string {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}
