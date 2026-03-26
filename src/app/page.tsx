'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayrollSidebar } from '@/components/PayrollSidebar';
import { SearchField, InfoFilled } from '@finity/design-system';

type Status = 'Rejected' | 'Pending' | 'Scheduled' | 'Accepted';
type SubmissionType = 'EPS' | 'FPS' | 'CISr';

interface Submission {
  id: string;
  type: SubmissionType;
  company: string;
  dateCreated: string;
  processDate: string;
  status: Status;
  actionRequired?: string;
  disabled?: boolean;
}

const SUBMISSIONS: Submission[] = [
  { id: '1', type: 'EPS', company: 'Bluecrest Solutions', dateCreated: '21/03/2025 (8:13)', processDate: '21/03/2025', status: 'Rejected', actionRequired: 'Fix and re-submit' },
  { id: '2', type: 'EPS', company: 'Elevate Group', dateCreated: '21/03/2025 (8:12)', processDate: '21/03/2025', status: 'Rejected', actionRequired: 'Fix and re-submit' },
  { id: '3', type: 'FPS', company: 'Bluecrest Solutions', dateCreated: '21/02/2025 (6:22)', processDate: '14/02/2025', status: 'Pending' },
  { id: '4', type: 'FPS', company: 'Elevate Group', dateCreated: '14/02/2025 (6:21)', processDate: '14/02/2025', status: 'Scheduled', disabled: true },
  { id: '5', type: 'FPS', company: 'Bluecrest Solutions', dateCreated: '14/02/2025 (6:20)', processDate: '14/02/2025', status: 'Accepted' },
  { id: '6', type: 'CISr', company: 'Bluecrest Solutions', dateCreated: '10/01/2025 (8:46)', processDate: '10/01/2025', status: 'Accepted' },
  { id: '7', type: 'CISr', company: 'Elevate Group', dateCreated: '10/01/2025 (8:45)', processDate: '10/01/2025', status: 'Accepted' },
];

const STATUS_STYLES: Record<Status, string> = {
  Rejected:  'border border-[var(--color-red-400)]    text-[var(--color-red-600)]    bg-[var(--color-red-50)]',
  Pending:   'border border-[var(--color-yellow-400)] text-[var(--color-yellow-700)] bg-[var(--color-yellow-50)]',
  Scheduled: 'border border-[var(--color-grey-400)]   text-[var(--color-grey-600)]   bg-white',
  Accepted:  'border border-[var(--color-green-400)]  text-[var(--color-green-700)]  bg-[var(--color-green-50)]',
};

function StatusTag({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[12.5px] font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function Caret() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M0 0L5 6L10 0H0Z" fill="#737373" />
    </svg>
  );
}

function SelectFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative inline-flex">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 pl-3 pr-10 rounded-lg border border-[#a3a3a3] bg-white text-[#737373] appearance-none cursor-pointer hover:border-[var(--color-grey-600)] focus:outline-none text-[16px] w-[160px]"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-0 top-0 h-10 w-10 flex items-center justify-center">
        <Caret />
      </div>
    </div>
  );
}

export default function RTISubmissionsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = SUBMISSIONS.filter((s) => {
    const matchSearch = s.company.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === '' || s.type === typeFilter;
    const matchStatus = statusFilter === '' || s.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="flex h-screen bg-white">
      <PayrollSidebar />

      <div className="flex flex-col flex-1 ml-[200px] h-screen overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-end h-14 px-5 bg-white border-b border-[var(--color-border-subtle)] shrink-0">
          <div className="flex items-center gap-2">
            <button className="h-9 px-5 rounded-full bg-[var(--color-red-500)] hover:bg-[var(--color-red-600)] text-white text-[13px] font-semibold transition-colors">
              Exit payroll
            </button>
            <div className="size-8 rounded-full bg-[var(--color-grey-200)]" />
            <div className="size-8 rounded-full bg-[var(--color-grey-200)]" />
          </div>
        </header>

        {/* Notification banner */}
        <div className="flex items-center gap-2 px-4 py-4 bg-[#85C3C2] shrink-0">
          <span className="shrink-0">
            <InfoFilled size={20} color="#171717" />
          </span>
          <p className="text-[16px] font-medium text-[#171717] leading-[22px] tracking-[0.35px]">
            FPS are sent after 5PM on Fridays. EPS and CISR run at 7PM on the 10th of each month. Review RTI every Friday to avoid errors.
          </p>
        </div>

        {/* Page body */}
        <div className="flex-1 overflow-auto px-5 py-6">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-bold tracking-tight text-[var(--color-text-default)]">RTI submissions</h1>
            <button className="h-10 px-5 rounded-full bg-[var(--color-grey-900)] hover:bg-[var(--color-grey-800)] text-white text-[16px] font-medium transition-colors">
              Pre-validation
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-[400px] [&>div]:h-10 [&>div]:flex [&>div]:items-center [&>div>div:first-child]:w-auto [&>div>div:first-child]:px-2">
              <SearchField
                placeholder="Search for a company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch('')}
              />
            </div>
            <SelectFilter
              label="Type"
              options={['EPS', 'FPS', 'CISr']}
              value={typeFilter}
              onChange={setTypeFilter}
            />
            <SelectFilter
              label="Status"
              options={['Rejected', 'Pending', 'Scheduled', 'Accepted']}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)]">
                <th className="py-3 pl-2 pr-6 text-left text-[13px] font-semibold text-[var(--color-text-default)]">Type</th>
                <th className="py-3 pr-6 text-left text-[13px] font-semibold text-[var(--color-text-default)]">Company</th>
                <th className="py-3 pr-6 text-left text-[13px] font-semibold text-[var(--color-text-default)]">Date created</th>
                <th className="py-3 pr-6 text-left text-[13px] font-semibold text-[var(--color-text-default)]">Process date</th>
                <th className="py-3 pr-6 text-left text-[13px] font-semibold text-[var(--color-text-default)]">Status</th>
                <th className="py-3 pr-2 text-right text-[13px] font-semibold text-[var(--color-text-default)]">Action required</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const dis = row.disabled;
                return (
                  <tr
                    key={row.id}
                    onClick={() => {
                      if (!dis) router.push('/rejected');
                    }}
                    className={`border-b border-[var(--color-border-subtle)] last:border-0 transition-colors ${dis ? 'cursor-default' : 'hover:bg-[var(--color-grey-100)] cursor-pointer'}`}
                  >
                    <td className={`py-4 pl-2 pr-6 text-[14px] font-medium ${dis ? 'text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-default)]'}`}>
                      {row.type}
                    </td>
                    <td className={`py-4 pr-6 text-[14px] ${dis ? 'text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-default)]'}`}>
                      {row.company}
                    </td>
                    <td className={`py-4 pr-6 text-[13px] ${dis ? 'text-[var(--color-text-disabled)]' : 'text-[var(--color-text-secondary)]'}`}>
                      {row.dateCreated}
                    </td>
                    <td className={`py-4 pr-6 text-[13px] ${dis ? 'text-[var(--color-text-disabled)]' : 'text-[var(--color-text-secondary)]'}`}>
                      {row.processDate}
                    </td>
                    <td className="py-4 pr-6">
                      <StatusTag status={row.status} />
                    </td>
                    <td className="py-4 pr-2 text-[13px] text-right">
                      {row.actionRequired && (
                        <a href="#" className="text-[var(--color-coral-500)] font-semibold underline">
                          {row.actionRequired}
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[13px] text-[var(--color-text-tertiary)]">
                    No submissions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
