import { Link } from "react-router-dom";

const statsCards = [
    { label: "Total Revenue", value: "$24,580", change: "+12.5%", trend: "up", icon: "bi-currency-dollar", color: "text-success", bg: "bg-success/10" },
    { label: "Total Orders", value: "1,248", change: "+8.2%", trend: "up", icon: "bi-cart-check", color: "text-primary", bg: "bg-primary/10" },
    { label: "Total Customers", value: "892", change: "+5.1%", trend: "up", icon: "bi-people", color: "text-info", bg: "bg-info/10" },
    { label: "Pending Orders", value: "23", change: "-3.4%", trend: "down", icon: "bi-clock-history", color: "text-warning", bg: "bg-warning/10" },
];

const recentSales = [
    { id: "INV-001", customer: "John Doe", product: "Notebook Set", amount: 45.99, time: "2 min ago" },
    { id: "INV-002", customer: "Jane Smith", product: "Pen Collection", amount: 28.50, time: "15 min ago" },
    { id: "INV-003", customer: "ABC Corp", product: "Office Supplies", amount: 156.00, time: "1 hour ago" },
    { id: "INV-004", customer: "Mike Johnson", product: "Art Materials", amount: 89.99, time: "2 hours ago" },
    { id: "INV-005", customer: "Sarah Wilson", product: "Stationery Pack", amount: 34.50, time: "3 hours ago" },
];

const weeklyData = [
    { day: "Mon", sales: 65 },
    { day: "Tue", sales: 45 },
    { day: "Wed", sales: 78 },
    { day: "Thu", sales: 52 },
    { day: "Fri", sales: 89 },
    { day: "Sat", sales: 95 },
    { day: "Sun", sales: 40 },
];

const topProducts = [
    { name: "Premium Notebook", sold: 234, revenue: 4680 },
    { name: "Gel Pen Set", sold: 189, revenue: 2835 },
    { name: "Desk Organizer", sold: 156, revenue: 3120 },
    { name: "Sticky Notes Pack", sold: 142, revenue: 1420 },
];

const quickActions = [
    { label: "New Sale", icon: "bi-cart-plus", to: "/sales", color: "bg-primary" },
    { label: "Add Product", icon: "bi-box-seam", to: "/products", color: "bg-success" },
    { label: "View Reports", icon: "bi-bar-chart", to: "/reports", color: "bg-info" },
    { label: "Manage Users", icon: "bi-people", to: "/users", color: "bg-warning" },
];

export function Dashboard() {
    const maxSales = Math.max(...weeklyData.map(d => d.sales));

    return (
        <div className="flex-1 text-main-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-main-500 text-sm">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex gap-2">
                    <select className="px-3 py-2 bg-main-200 border border-main-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>This month</option>
                        <option>This year</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsCards.map((stat, index) => (
                    <div key={index} className="bg-main-200 rounded-lg shadow-none border border-main-300 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-main-500">{stat.label}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                <p className={`text-xs mt-1 flex items-center gap-1 ${stat.trend === "up" ? "text-success" : "text-error"}`}>
                                    <i className={`bi ${stat.trend === "up" ? "bi-arrow-up" : "bi-arrow-down"}`} />
                                    {stat.change} from last week
                                </p>
                            </div>
                            <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                                <i className={`bi ${stat.icon} ${stat.color} text-2xl`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Weekly Sales Chart */}
                <div className="lg:col-span-2 bg-main-200 rounded-lg shadow-none border border-main-300 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Weekly Sales Overview</h3>
                        <span className="text-sm text-main-500">This Week</span>
                    </div>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {weeklyData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-main-200 rounded-t-md relative" style={{ height: "100%" }}>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md transition-all hover:bg-primary/80"
                                        style={{ height: `${(data.sales / maxSales) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-main-500">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-main-200 rounded-lg shadow-none border border-main-300 p-5">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action, index) => (
                            <Link
                                key={index}
                                to={action.to}
                                className="flex flex-col items-center justify-center p-4 rounded-lg bg-main-100 hover:bg-main-300 transition-colors group "
                            >
                                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110  transition-transform`}>
                                    <i className={`bi ${action.icon} text-white text-lg`} />
                                </div>
                                <span className="text-sm font-medium">{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Sales */}
                <div className="bg-main-200 rounded-lg shadow-none border border-main-300">
                    <div className="flex items-center justify-between p-4 border-b border-main-300">
                        <h3 className="font-semibold">Recent Sales</h3>
                        <Link to="/sales" className="text-sm text-primary hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-main-200">
                        {recentSales.map((sale) => (
                            <div key={sale.id} className="flex items-center justify-between p-4 hover:bg-main-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <i className="bi bi-person text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{sale.customer}</p>
                                        <p className="text-xs text-main-500">{sale.product}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-success">${sale.amount.toFixed(2)}</p>
                                    <p className="text-xs text-main-500">{sale.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-main-200 rounded-lg shadow-none border border-main-300">
                    <div className="flex items-center justify-between p-4 border-b border-main-300">
                        <h3 className="font-semibold">Top Products</h3>
                        <Link to="/products" className="text-sm text-primary hover:underline">View All</Link>
                    </div>
                    <div className="p-4 space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-main-200 rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{product.name}</p>
                                    <div className="w-full bg-main-200 rounded-full h-2 mt-1">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: `${(product.sold / topProducts[0].sold) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-sm">${product.revenue}</p>
                                    <p className="text-xs text-main-500">{product.sold} sold</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
