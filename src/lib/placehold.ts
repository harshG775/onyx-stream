/**
 * Placehold SDK
 * A lightweight TypeScript utility for generating placeholder image URLs.
 * Based on the documentation style of placehold.co.
 */

// --- Types & Enums ---

export type PlaceholdFormat = "png" | "jpg" | "jpeg" | "webp" | "svg" | "gif"

// Specific fonts visible in the documentation grid
export type PlaceholdFont =
    | "lato"
    | "lora"
    | "montserrat"
    | "noto-sans"
    | "open-sans"
    | "oswald"
    | "playfair-display"
    | "poppins"
    | "pt-sans"
    | "raleway"
    | "roboto"
    | "source-sans-pro"

export interface PlaceholdOptions {
    /** Width in pixels */
    width: number
    /** Height in pixels (optional, defaults to width for a square) */
    height?: number
    /** Background color (Hex code, e.g., "555555" or "#555555") */
    backgroundColor?: string
    /** Text color (Hex code, e.g., "ffffff" or "#ffffff") */
    textColor?: string
    /** Output format (png, jpg, svg, etc.) */
    format?: PlaceholdFormat
    /** Custom text to display on the image */
    text?: string
    /** Font family to use for the text */
    font?: PlaceholdFont
    /** Retina/High DPI multiplier (e.g., 2 for @2x, 3 for @3x) */
    retina?: number
}

// --- Main Utility Class ---

export class Placehold {
    private static readonly BASE_URL = "https://placehold.co"

    /**
     * Creates a reusable "template" function.
     * Usage: const poster = Placehold.create({ width: 300 });
     * const url = poster("Movie Title");
     */
    public static create(options: Omit<PlaceholdOptions, "text">) {
        // Return a function that takes the title (text) as an argument
        return (title: string) => {
            return this.url({ ...options, text: title })
        }
    }

    public static url(options: PlaceholdOptions): string {
        // ... (keep the existing logic from the previous implementation) ...
        const { width, height, backgroundColor, textColor, format, text, font, retina } = options

        let dims = `${Math.floor(width)}${height ? `x${Math.floor(height)}` : ""}`
        if (retina && retina > 1) dims += `@${Math.floor(retina)}x`

        let colorPath = ""
        const cleanBg = backgroundColor ? backgroundColor.replace("#", "") : null
        const cleanText = textColor ? textColor.replace("#", "") : null

        if (cleanBg) {
            colorPath += `/${cleanBg}${cleanText ? `/${cleanText}` : ""}`
        }

        const extension = format ? `.${format}` : ""
        const params = new URLSearchParams()
        if (text) params.append("text", text)
        if (font) params.append("font", font)

        const suffix = params.toString() ? `?${params.toString()}` : ""
        return `${this.BASE_URL}/${dims}${colorPath}${extension}${suffix}`
    }
}
