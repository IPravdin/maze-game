import { ReactNode } from 'react';

export function StatCard({ title, value, desc, icon }: { title: string, value: string, desc?: string, icon: ReactNode }) {
    return (
        <li className="stat">
            <div className="stat-figure text-primary">
                {icon}
            </div>
            <div className="stat-title">{title}</div>
            <div className="stat-value text-primary">{value}</div>
            {desc && <div className='stat-desc'>{desc}</div>}
        </li>
    );
}