import { Button } from "../../../components/ui/Buttons";

const reportTypes = [
    { id: 1, name: "Sales Report", description: "Overview of sales performance", icon: "bi-graph-up-arrow", color: "text-success" },
    { id: 2, name: "Expense Report", description: "Detailed expense breakdown", icon: "bi-graph-down-arrow", color: "text-error" },
    { id: 3, name: "Inventory Report", description: "Current stock levels and movements", icon: "bi-box-seam", color: "text-info" },
    { id: 4, name: "Purchase Report", description: "Purchase orders and supplier analysis", icon: "bi-bag", color: "text-primary" },
    { id: 5, name: "Profit & Loss", description: "Financial performance summary", icon: "bi-currency-dollar", color: "text-warning" },
    { id: 6, name: "Customer Report", description: "Customer activity and analytics", icon: "bi-people", color: "text-secondary" },
];

const recentReports = [
    { name: "Monthly Sales - December 2025", generated: "2025-12-31", type: "Sales Report" },
    { name: "Q4 Expense Summary", generated: "2025-12-30", type: "Expense Report" },
    { name: "Year End Inventory Count", generated: "2025-12-29", type: "Inventory Report" },
];

export function Reports() {
    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Reports</h3>
                <Button color="primary" size="sm" rounded="md">
                    <i className="bi bi-plus-lg mr-2" />
                    Custom Report
                </Button>
            </div>

            {/* Report Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {reportTypes.map(report => (
                    <div key={report.id}
                        className="bg-main-200 rounded-lg  border border-main-300 p-5 hover:scale-101 transition-all cursor-pointer hover:border-primary/60">
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-main-200 rounded-lg flex items-center justify-center ${report.color}`}>
                                <i className={`bi ${report.icon} text-2xl`} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold">{report.name}</h4>
                                <p className="text-sm text-main-500 mt-1">{report.description}</p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button color="primary" size="xs" variant="outline" rounded="md">
                                Generate <i className="bi bi-arrow-right ml-1" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Reports */}
            <div className="bg-main-200 rounded-lg  border border-main-300">
                <div className="p-4 border-b border-main-300">
                    <h4 className="font-semibold">Recent Reports</h4>
                </div>
                <div className="divide-y divide-main-300">
                    {recentReports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-4 hover:bg-main-300/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-main-200 rounded-lg flex items-center justify-center">
                                    <i className="bi bi-file-earmark-text text-main-600" />
                                </div>
                                <div>
                                    <p className="font-medium">{report.name}</p>
                                    <p className="text-sm text-main-500">{report.type} • Generated {report.generated}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-main-200 rounded-md transition-colors" title="View">
                                    <i className="bi bi-eye" />
                                </button>
                                <button className="p-2 hover:bg-main-200 rounded-md transition-colors" title="Download">
                                    <i className="bi bi-download" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

