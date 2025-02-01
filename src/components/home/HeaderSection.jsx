import { Link } from 'react-router';

export default function HeaderSection({ data }) {
    return (
        <section className="px-3 py-2">
            <ul>
                {data.map((_item, i) => (
                    <li key={i} className="h-96 w-full animate-pulse bg-gray-600/40">
                        <Link to={""} className="flex h-full gap-2 items-center justify-center ">
                            <div>img</div>
                            <div>item</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}