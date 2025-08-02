import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function FunnelChart({ data }) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Воронка найма</h2>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data} margin={{ bottom: 300, left: 200 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}