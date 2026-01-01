type MetaGroupProps = {
    icon: React.ReactNode
    label: string
    values: Array<React.ReactNode> | React.ReactNode
}

const MetaGroup: React.FC<MetaGroupProps> = ({ icon, label, values }) => {
    const items = Array.isArray(values) ? values : [values]

    return (
        <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 font-medium">
                {icon}
                <span>{label}</span>
            </div>

            {items.map((value, index) => (
                <div key={index} className="text-muted-foreground text-sm">
                    {value}
                </div>
            ))}
        </div>
    )
}
type OverviewTabProps = { tagline: string; overview: string; MetaGroupList: Array<MetaGroupProps> }
export function OverviewTab({ tagline, overview, MetaGroupList }: OverviewTabProps) {
    return (
        <div className="h-full space-y-4 p-4 border rounded-2xl shadow">
            <div>
                {tagline && <div className="italic text-xl">&quot;{tagline}&quot;</div>}
                <div className="text-muted-foreground text-sm">{overview}</div>
            </div>

            {MetaGroupList.map((group) => (
                <MetaGroup key={group.label} icon={group.icon} label={group.label} values={group.values} />
            ))}
        </div>
    )
}
