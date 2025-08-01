import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";
import FunnelChart from "../components/analytics/FunnelChart";
import AnalyticsTable from "../components/analytics/AnalyticsTable";
import MainLayout from "../layout/MainLayout";
import dayjs from "dayjs";

export default function AnalyticsPage() {
    const [data, setData] = useState([]);
    const [dateRange, setDateRange] = useState({
        from: dayjs().startOf("month").format("YYYY-MM-DD"),
        to: dayjs().endOf("month").format("YYYY-MM-DD")
    });


    const fetchAnalytics = useCallback(async () => {
        const { data: candidates, error } = await supabase
            .from("candidates")
            .select("history, created_at")
            .gte("created_at", dateRange.from)
            .lte("created_at", dateRange.to);

        if (error) {
            console.error(error);
            return;
        }

        const stages = [
            "Отправлено тестов",
            "Посмотрели описание вакансии",
            "Прочитали про корпоративную культуру",
            "Прошли тесты",
            "Пришли на собеседование",
            "Прошли практику",
            "Приняты на работу"
        ];

        const stageCounts = stages.map(stage => ({
            name: stage,
            count: candidates.filter(c => c.history?.some(h => h.stage === stage)).length
        }));

        setData(stageCounts);
    }, [dateRange]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return (
        <MainLayout className="p-6">
            <h1 className="text-2xl font-bold mb-4">Аналитика</h1>

            <div className="flex items-center gap-4 mb-6">
                <label>
                    От:
                    <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        className="ml-2 border rounded px-2 py-1"
                    />
                </label>
                <label>
                    До:
                    <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        className="ml-2 border rounded px-2 py-1"
                    />
                </label>
            </div>

            <FunnelChart data={data} />
            <AnalyticsTable data={data} />
        </MainLayout>
    );
}