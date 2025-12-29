export default function Card({ title, description }: { title:string, description: string }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}