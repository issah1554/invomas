import { NavItem, type NavItemProps } from "./NavItem";

type NavItemsProps = {
    title?: string;
    items: NavItemProps[];
};

export function NavItems({ title, items }: NavItemsProps) {
    return (
        <div>
            {title && (
                <div className="px-3 py-2 text-xs font-semibold uppercase text-main-500">
                    {title}
                </div>
            )}
            <div className="space-y-0.5">
                {items.map((item, i) => (
                    <NavItem key={i} {...item} />
                ))}
            </div>
        </div>
    );
}
