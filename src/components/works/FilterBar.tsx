import type { Project } from '../../types/works';

export type WorkFilter = Project['category'] | 'all';

const filters: Array<{ value: WorkFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'maintenance', label: 'Maintenance' },
];

type FilterBarProps = {
  active: WorkFilter;
  count: number;
  onChange: (filter: WorkFilter) => void;
};

export function FilterBar({ active, count, onChange }: FilterBarProps) {
  return (
    <div className="sticky top-[84px] z-40 border-b border-[#d8d7d2] bg-[#f2f1ed] px-5 py-3 md:top-[88px] md:px-20 md:py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-[#111]">{count} Projects</p>
        <div className="scrollbar-hidden -mx-5 flex max-w-[calc(100vw-0px)] gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:max-w-none md:overflow-visible md:px-0 md:pb-0">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              data-cursor="hover"
              onClick={() => onChange(filter.value)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm transition-colors duration-200 ${
                active === filter.value
                  ? 'border border-[#0d0d0d] bg-[#0d0d0d] text-white'
                  : 'border border-[#d8d7d2] bg-transparent text-[#888] hover:text-[#111]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
