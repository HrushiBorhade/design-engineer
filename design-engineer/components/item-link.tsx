import Link from "next/link";
import Arrow from "./arrow";

export default function ItemLink({ text, src }: { text: string, src: string }) {
    return (
        <Link href={src} className="flex items-center gap-2 overflow-hidden group component-link">
            <span className="font-mono text-lg tracking-tight group-hover:underline underline-offset-4 ">
                {text}
            </span>
            <Arrow />
        </Link>
    )
}