import { useState } from "react";
import { Button } from "../../../components/ui/Buttons";
import { TextInput } from "../../../components/ui/TextInput";

const faqItems = [
    { question: "How do I add a new product?", answer: "Navigate to Products & Services > Products, then click the 'Add Product' button to open the product form." },
    { question: "How can I export my sales data?", answer: "Go to the Sales page and click the 'Export' button. You can export data in CSV or Excel format." },
    { question: "How do I manage user permissions?", answer: "Access IAM > Roles to create roles with specific permissions, then assign these roles to users in IAM > Users." },
    { question: "Can I customize my dashboard?", answer: "Dashboard customization is coming soon. Currently, the dashboard shows a default set of widgets." },
    { question: "How do I generate reports?", answer: "Go to Reports page, select the report type you need, and click 'Generate'. You can then download or print the report." },
];

const helpCategories = [
    { name: "Getting Started", icon: "bi-rocket-takeoff", articles: 12 },
    { name: "Products & Inventory", icon: "bi-box", articles: 8 },
    { name: "Sales & Invoicing", icon: "bi-cart", articles: 15 },
    { name: "User Management", icon: "bi-people", articles: 6 },
    { name: "Reports & Analytics", icon: "bi-bar-chart", articles: 10 },
    { name: "Troubleshooting", icon: "bi-wrench", articles: 20 },
];

export function Help() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex-1 text-main-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text font-bold">Help & Support</h3>
                <Button color="primary" size="sm" rounded="md">
                    <i className="bi bi-headset mr-2" />
                    Contact Support
                </Button>
            </div>

            {/* Search */}
            <div className="bg-primary/5 rounded-lg p-8 mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
                <p className="text-main-500 mb-4">Search our knowledge base or browse categories below</p>
                <div className="max-w-xl mx-auto">
                    <TextInput 
                        color="primary" 
                        size="lg" 
                        rounded="lg" 
                        placeholder="Search for help articles..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Help Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {helpCategories.map(category => (
                    <div key={category.name} 
                        className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer hover:border-primary/30">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i className={`bi ${category.icon} text-primary text-xl`} />
                        </div>
                        <h4 className="font-medium text-sm">{category.name}</h4>
                        <p className="text-xs text-main-500 mt-1">{category.articles} articles</p>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-main-100 rounded-lg shadow-sm border border-main-200">
                <div className="p-4 border-b border-main-200">
                    <h4 className="font-semibold">Frequently Asked Questions</h4>
                </div>
                <div className="divide-y divide-main-200">
                    {faqItems.map((faq, index) => (
                        <div key={index} className="p-4">
                            <button 
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                className="w-full flex items-center justify-between text-left font-medium hover:text-primary transition-colors"
                            >
                                {faq.question}
                                <i className={`bi ${expandedFaq === index ? 'bi-chevron-up' : 'bi-chevron-down'} text-main-500`} />
                            </button>
                            {expandedFaq === index && (
                                <p className="mt-3 text-main-600 text-sm pl-0 animate-fadeIn">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-5 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="bi bi-envelope text-primary text-xl" />
                    </div>
                    <h4 className="font-semibold">Email Support</h4>
                    <p className="text-sm text-main-500 mt-1">support@stationery.com</p>
                </div>
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-5 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="bi bi-telephone text-primary text-xl" />
                    </div>
                    <h4 className="font-semibold">Phone Support</h4>
                    <p className="text-sm text-main-500 mt-1">+1 (555) 123-4567</p>
                </div>
                <div className="bg-main-100 rounded-lg shadow-sm border border-main-200 p-5 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="bi bi-chat-dots text-primary text-xl" />
                    </div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-sm text-main-500 mt-1">Available 9am - 5pm</p>
                </div>
            </div>
        </div>
    );
}

