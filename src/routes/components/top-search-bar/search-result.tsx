export function SearchResult({ query }: { query: string }) {
    console.log(query)
    return (
        <div className="bg-muted">
            {query}
            <p className="text-sm text-muted-foreground p-4 text-center">
                Try searching for a title, genre, or person.
            </p>
        </div>
    )
}
