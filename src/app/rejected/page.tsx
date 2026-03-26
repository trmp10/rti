'use client';

import Link from 'next/link';
import { PayrollSidebar } from '@/components/PayrollSidebar';

function RejectedTag() {
  return (
    <span className="inline-flex items-center h-6 px-2 rounded-md border border-[var(--color-red-800)] bg-[var(--color-red-100)] text-[var(--color-red-800)] text-[14px] font-medium">
      Rejected
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[16px] font-semibold text-[var(--color-text-default)] leading-[22px]">{label}</span>
      <span className="text-[16px] font-normal text-[var(--color-text-default)] leading-[22px]">{value}</span>
    </div>
  );
}

function DataRow({ label, value, labelColor }: { label: string; value: string; labelColor?: string }) {
  return (
    <div className="flex items-center h-[22px] w-full">
      <span className={`w-[360px] shrink-0 text-[16px] font-normal leading-[22px] ${labelColor ?? 'text-[var(--color-text-default)]'}`}>{label}</span>
      <span className="flex-1 text-right text-[16px] font-normal text-[#171717] leading-[22px]">{value}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
      {children}
    </span>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-[2px]">
      <circle cx="10" cy="10" r="9" fill="#DC2626" />
      <path d="M10 6v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill="white" />
    </svg>
  );
}

export default function RejectedPage() {
  return (
    <div className="flex h-screen bg-[var(--color-grey-50)]">
      <PayrollSidebar />

      <div className="flex flex-col flex-1 ml-[200px] h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-end h-14 px-5 bg-white border-b border-[var(--color-border-subtle)] shrink-0">
          <div className="flex items-center gap-2">
            <button className="h-9 px-5 rounded-full bg-[var(--color-red-600)] hover:bg-[var(--color-red-700)] text-white text-[14px] font-semibold transition-colors">
              Exit payroll
            </button>
            <div className="size-8 rounded-full bg-[var(--color-grey-200)]" />
            <div className="size-8 rounded-full bg-[var(--color-grey-200)]" />
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-auto p-5">
          <div className="flex gap-4 items-start">

            {/* Left info card */}
            <div className="w-[280px] shrink-0 bg-white border border-[var(--color-border-subtle)] rounded-xl p-5 flex flex-col gap-[32px]">
              <div className="flex flex-col gap-4">
                {/* Title + tag */}
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-[20px] font-semibold text-[var(--color-text-default)] leading-[28px]">EPS</span>
                  <RejectedTag />
                </div>

                {/* Company + dates */}
                <div className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-[16px] font-semibold text-[var(--color-coral-400)] underline leading-[22px]"
                  >
                    Bluecrest Solutions
                  </Link>
                  <div className="flex flex-col gap-2">
                    <InfoRow label="Date created" value="21/03/2025" />
                    <InfoRow label="Process date" value="21/03/2025" />
                  </div>
                </div>
              </div>

              {/* Re-send button (disabled) */}
              <button
                disabled
                className="w-full h-10 rounded-full bg-[var(--color-grey-200)] text-[var(--color-grey-400)] text-[14px] font-medium cursor-not-allowed"
              >
                Re-send to HMRC
              </button>
            </div>

            {/* Right content */}
            <div className="flex flex-col flex-1 gap-4 min-w-0">

              {/* Employer Payment Summary card */}
              <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
                {/* Card header */}
                <div className="px-5 py-4 border-b border-[var(--color-border-subtle)]">
                  <p className="text-[18px] font-semibold text-[var(--color-text-default)] leading-[24px]">Employer Payment Summary</p>
                  <p className="text-[16px] font-normal text-[#404040] leading-[22px] mt-0.5">
                    Recoverable amounts and periods of incapacity or zero pay sent to HMRC.
                  </p>
                </div>

                {/* Card body */}
                <div className="px-5 pt-5 pb-5">
                  {/* Inline info rows */}
                  <div className="flex flex-col gap-[4px]">
                    <DataRow label="Tax year" value="2024-2025" labelColor="text-[#404040]" />
                    <DataRow label="Period" value="Month 10" labelColor="text-[#404040]" />
                    <DataRow label="PAYE reference" value="123/AB123" labelColor="text-[#404040]" />
                    <DataRow label="Submission ID" value="EPS-2024-07-001" labelColor="text-[#404040]" />
                    <DataRow label="Accounts office reference" value="147PK13301315" labelColor="text-[#404040]" />
                  </div>

                  {/* 32px gap then sections */}
                  <div className="flex flex-col gap-4" style={{ marginTop: 32 }}>
                    {/* Statutory pay recovered */}
                    <div className="flex flex-col gap-[4px]">
                      <SectionLabel>Statutory pay recovered</SectionLabel>
                      <div className="flex flex-col gap-[4px]">
                        <DataRow label="Maternity Pay (SMP)" value="£1,240.50" />
                        <DataRow label="Paternity Pay (SPP)" value="£432.00" />
                        <DataRow label="Adoption Pay (SAP)" value="£0.00" />
                        <DataRow label="Shared Parental Pay (ShPP)" value="£780.20" />
                        <DataRow label="Parental Bereavement Pay (SPBP)" value="£0.00" />
                      </div>
                    </div>

                    {/* NIC compensation */}
                    <div className="flex flex-col gap-[4px]">
                      <SectionLabel>NIC compensation</SectionLabel>
                      <div className="flex flex-col gap-[4px]">
                        <DataRow label="SMP" value="£171.19" />
                        <DataRow label="SPP" value="£59.61" />
                        <DataRow label="SAP" value="£0.00" />
                        <DataRow label="ShPP" value="£107.63" />
                        <DataRow label="SPBP" value="£0.00" />
                      </div>
                    </div>

                    {/* CIS */}
                    <DataRow label="CIS deductions suffered" value="£3,450.00" />
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-3 border-t border-[var(--color-border-subtle)] flex justify-end">
                  <button className="h-10 px-4 rounded-full border border-[var(--color-border-default)] bg-white text-[16px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-50)] transition-colors">
                    Download receipt
                  </button>
                </div>
              </div>

              {/* Submission history card */}
              <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
                {/* Card header */}
                <div className="px-5 py-4 border-b border-[var(--color-border-subtle)]">
                  <p className="text-[18px] font-semibold text-[var(--color-text-default)] leading-[24px]">Submission history</p>
                </div>

                {/* Table */}
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-grey-50)]">
                      <th className="px-6 py-3 text-left text-[16px] font-semibold text-[var(--color-text-secondary)] w-[100px]">Attempt</th>
                      <th className="px-6 py-3 text-left text-[16px] font-semibold text-[var(--color-text-secondary)] w-[160px]">Date</th>
                      <th className="px-6 py-3 text-left text-[16px] font-semibold text-[var(--color-text-secondary)] w-[120px]">Status</th>
                      <th className="px-6 py-3 text-left text-[16px] font-semibold text-[var(--color-text-secondary)]">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-3 text-[16px] font-medium text-[var(--color-text-default)] align-top">1</td>
                      <td className="px-6 py-3 text-[16px] font-medium text-[var(--color-text-default)] align-top whitespace-nowrap">21/03/2025 (8:12)</td>
                      <td className="px-6 py-3 align-top">
                        <RejectedTag />
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex flex-col gap-4">
                          {/* Section notification */}
                          <div className="flex items-center gap-2">
                            <ErrorIcon />
                            <span className="text-[16px] font-medium text-[#171717] leading-[22px]">3 errors are blocking this submission</span>
                          </div>
                          {/* Error list */}
                          <div className="flex flex-col gap-[4px]">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[16px] font-normal text-[var(--color-text-default)] leading-[22px]">Missing or incorrect dates of birth</span>
                              <a href="#" className="text-[16px] font-semibold text-[var(--color-coral-400)] underline leading-[22px] shrink-0">Fix</a>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[16px] font-normal text-[var(--color-text-default)] leading-[22px]">Missing address lines 1 and 2</span>
                              <a href="#" className="text-[16px] font-semibold text-[var(--color-coral-400)] underline leading-[22px] shrink-0">Fix</a>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[16px] font-normal text-[var(--color-text-default)] leading-[22px]">Missing or unmatched National Insurance numbers (NiNo)</span>
                              <a href="#" className="text-[16px] font-semibold text-[var(--color-coral-400)] underline leading-[22px] shrink-0">Fix</a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Card footer */}
                <div className="px-5 py-3 border-t border-[var(--color-border-subtle)] flex items-center justify-end gap-2">
                  <button className="h-10 px-4 rounded-full text-[16px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-100)] transition-colors">
                    Request XML
                  </button>
                  <button className="h-10 px-4 rounded-full text-[16px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-100)] transition-colors">
                    Response XML
                  </button>
                  <button className="h-10 px-4 rounded-full border border-[var(--color-border-default)] bg-white text-[16px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-50)] transition-colors">
                    Smart inspection
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
