export default function Home() {
    return (
        <div className="grid grid-cols-3 gap-2 p-2    [&>section]:min-h-96 [&>section]:bg-primary/20 [&>section]:animate-pulse [&>section]:rounded-md ">
            <section className="col-span-3"></section>
            <section className="col-span-2"></section>
            <section></section>
            <section className="col-span-2"></section>
            <section></section>
        </div>
    );
}