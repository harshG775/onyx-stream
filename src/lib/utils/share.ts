export async function sharePage(options?: { title?: string; text?: string; url?: string }) {
    const title = options?.title ?? document.title
    const text = options?.text ?? "Check out this content!"
    const url = options?.url ?? window.location.href

    if (navigator.share) {
        try {
            await navigator.share({ title, text, url })
            console.log("Sharing successful")
        } catch (error) {
            console.error("Error sharing:", error)
        }
    } else {
        console.log("Web Share API not supported. Copying link instead...")
        try {
            await navigator.clipboard.writeText(url)
            alert("Link copied to clipboard!")
        } catch (err) {
            console.error("Failed to copy link:", err)
        }
    }
}
