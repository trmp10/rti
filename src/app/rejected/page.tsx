'use client';

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

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center h-[22px] w-full">
      <span className="w-[360px] shrink-0 text-[16px] font-normal leading-[22px]" style={{ color: '#404040' }}>{label}</span>
      <span className="flex-1 text-right text-[16px] font-normal leading-[22px]" style={{ color: '#171717' }}>{value}</span>
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
        <header className="flex items-center justify-end h-[64px] py-2 px-5 bg-[#e5e5e5] shrink-0">
          <div className="flex items-center gap-2">
            <button className="h-[48px] px-4 rounded-full bg-[var(--color-red-600)] hover:bg-[var(--color-red-700)] text-white text-[16px] font-medium tracking-[0.35px] transition-colors">
              Exit payroll
            </button>
            <div className="size-[48px] rounded-full bg-[var(--color-grey-300)]" />
            <div className="h-[48px] w-[72px] rounded-full bg-[var(--color-grey-300)]" />
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
                  <span className="text-[16px] font-semibold text-[var(--color-coral-400)] underline leading-[22px] cursor-pointer">
                    Bluecrest Solutions
                  </span>
                  <div className="flex flex-col gap-2">
                    <InfoRow label="Date created" value="21/03/2025" />
                    <InfoRow label="Process date" value="21/03/2025" />
                  </div>
                </div>
              </div>

              {/* Re-send button (disabled) */}
              <span className="cursor-not-allowed w-full">
                <button
                  disabled
                  className="w-full h-10 rounded-full bg-[var(--color-grey-200)] text-[var(--color-grey-400)] text-[16px] font-medium pointer-events-none"
                >
                  Re-send to HMRC
                </button>
              </span>
            </div>

            {/* Right content */}
            <div className="flex flex-col flex-1 gap-4 min-w-0">

              {/* Employer Payment Summary card */}
              <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
                {/* Card header */}
                <div className="px-5 pt-4 pb-0">
                  <p className="text-[18px] font-semibold text-[var(--color-text-default)] leading-[24px]">Employer Payment Summary</p>
                  <p className="text-[16px] font-normal text-[#404040] leading-[22px] mt-0.5">
                    Recoverable amounts and periods of incapacity or zero pay sent to HMRC.
                  </p>
                </div>

                <div className="h-4" />

                {/* Card body */}
                <div className="px-5 pt-0 pb-5">
                  {/* Inline info rows */}
                  <div className="flex flex-col gap-[4px]">
                    <DataRow label="Tax year" value="2024-2025" />
                    <DataRow label="Period" value="Month 10" />
                    <DataRow label="PAYE reference" value="123/AB123" />
                    <DataRow label="Submission ID" value="EPS-2024-07-001" />
                    <DataRow label="Accounts office reference" value="147PK13301315" />
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


              </div>

              {/* Submission history card */}
              <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
                {/* Card header — no bottom divider */}
                <div className="px-5 pt-4 pb-0">
                  <p className="text-[18px] font-semibold text-[var(--color-text-default)] leading-[24px]">Submission history</p>
                </div>

                {/* Table */}
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-4 pl-5 pr-4 text-left text-[14px] font-semibold text-[var(--color-text-secondary)] tracking-[0.3px] w-[100px]">Attempt</th>
                      <th className="p-4 text-left text-[14px] font-semibold text-[var(--color-text-secondary)] tracking-[0.3px] w-[160px]">Date</th>
                      <th className="p-4 text-left text-[14px] font-semibold text-[var(--color-text-secondary)] tracking-[0.3px] w-[120px]">Status</th>
                      <th className="py-4 pl-4 pr-5 text-left text-[14px] font-semibold text-[var(--color-text-secondary)] tracking-[0.3px]">Details</th>
                    </tr>
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div className="mx-5 border-t border-[var(--color-border-subtle)]" />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 pl-5 pr-4 text-[14px] font-medium text-[var(--color-text-default)] tracking-[0.3px] align-top">2</td>
                      <td className="p-4 text-[14px] font-medium text-[var(--color-text-default)] tracking-[0.3px] align-top whitespace-nowrap">28/03/2025 (5:35)</td>
                      <td className="p-4 align-top">
                        <RejectedTag />
                      </td>
                      <td className="py-4 pl-4 pr-5 align-top">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <ErrorIcon />
                            <span className="text-[14px] font-medium text-[#171717] leading-[20px] tracking-[0.3px]">1 error is blocking this submission</span>
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <div className="flex items-center justify-between gap-2 px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors">
                              <span className="text-[14px] font-normal text-[var(--color-text-default)] leading-[20px] tracking-[0.3px] font-medium">Missing or unmatched National Insurance numbers (NiNo)</span>
                              <a href="#" className="text-[14px] font-semibold text-[var(--color-coral-400)] underline leading-[20px] shrink-0 cursor-pointer">Fix</a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="h-[32px] px-[12px] rounded-full text-[14px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-100)] transition-colors cursor-pointer">
                            Request XML
                          </button>
                          <button className="h-[32px] px-[12px] rounded-full text-[14px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-100)] transition-colors cursor-pointer">
                            Response XML
                          </button>
                          <button className="h-[32px] px-[12px] rounded-full border border-[var(--color-border-default)] bg-white text-[14px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-50)] transition-colors cursor-pointer">
                            Smart inspection
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div className="mx-5 border-t border-[var(--color-border-subtle)]" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 pl-5 pr-4 text-[14px] font-medium text-[var(--color-text-default)] tracking-[0.3px] align-top">1</td>
                      <td className="p-4 text-[14px] font-medium text-[var(--color-text-default)] tracking-[0.3px] align-top whitespace-nowrap">21/03/2025 (8:12)</td>
                      <td className="p-4 align-top">
                        <RejectedTag />
                      </td>
                      <td className="py-4 pl-4 pr-5 align-top">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <ErrorIcon />
                            <span className="text-[14px] font-medium text-[#171717] leading-[20px] tracking-[0.3px]">3 errors are blocking this submission</span>
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <div className="flex items-center justify-between gap-2 px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors">
                              <span className="text-[14px] font-normal text-[var(--color-text-default)] leading-[20px] tracking-[0.3px] font-medium">Missing or incorrect dates of birth</span>
                              <a href="#" className="text-[14px] font-semibold text-[var(--color-coral-400)] underline leading-[20px] shrink-0 cursor-pointer">Fix</a>
                            </div>
                            <div className="flex items-center justify-between gap-2 px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors">
                              <span className="text-[14px] font-normal text-[var(--color-text-default)] leading-[20px] tracking-[0.3px] font-medium">Missing address lines 1 and 2</span>
                              <a href="#" className="text-[14px] font-semibold text-[var(--color-coral-400)] underline leading-[20px] shrink-0 cursor-pointer">Fix</a>
                            </div>
                            <div className="flex items-center justify-between gap-2 px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors">
                              <span className="text-[14px] font-normal text-[var(--color-text-default)] leading-[20px] tracking-[0.3px] font-medium">Missing or unmatched National Insurance numbers (NiNo)</span>
                              <a href="#" className="text-[14px] font-semibold text-[var(--color-coral-400)] underline leading-[20px] shrink-0 cursor-pointer">Fix</a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="h-[32px] px-[12px] rounded-full text-[14px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-100)] transition-colors cursor-pointer">
                            Request XML
                          </button>
                          <button className="h-[32px] px-[12px] rounded-full text-[14px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-100)] transition-colors cursor-pointer">
                            Response XML
                          </button>
                          <button className="h-[32px] px-[12px] rounded-full border border-[var(--color-border-default)] bg-white text-[14px] font-medium text-[var(--color-text-default)] hover:bg-[var(--color-grey-50)] transition-colors cursor-pointer">
                            Smart inspection
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="h-5" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
