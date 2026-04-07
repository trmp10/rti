'use client';

import { useRouter } from 'next/navigation';
import { PayrollSidebar } from '@/components/PayrollSidebar';

function PendingTag() {
  return (
    <span className="inline-flex items-center h-6 px-2 rounded-md border border-[#854d0e] bg-[#fef9c3] text-[#854d0e] text-[14px] font-medium">
      Pending
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
    <div className="flex items-center w-full">
      <span className="flex-1 text-[16px] font-normal leading-[22px] text-[#404040]">{label}</span>
      <span className="text-right text-[16px] font-normal leading-[22px] text-[#171717]">{value}</span>
    </div>
  );
}

export default function SendToHmrcPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-[#fafafa]">
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

            {/* Left card */}
            <div className="w-[300px] shrink-0 bg-white border border-[var(--color-border-subtle)] rounded-xl p-5 flex flex-col gap-4">
              {/* Title + tag */}
              <div className="flex items-center gap-2">
                <span className="flex-1 text-[18px] font-semibold text-[var(--color-text-default)] leading-[28px]">FPS</span>
                <PendingTag />
              </div>

              {/* Company + dates */}
              <div className="flex flex-col gap-2 mt-[4px]">
                <span className="text-[16px] font-semibold text-[var(--color-coral-400)] underline leading-[22px] cursor-pointer">
                  Bluecrest Solutions
                </span>
                <div className="flex flex-col gap-2">
                  <InfoRow label="Date created" value="21/03/2025" />
                  <InfoRow label="Process date" value="21/03/2025" />
                </div>
              </div>

              {/* Info notification */}
              <div className="flex items-start gap-2 bg-[#f5f5f5] rounded-xl px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 14.6667 14.6667" fill="none" className="shrink-0 mt-[3px]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.6667 7.33333C14.6667 11.3834 11.3834 14.6667 7.33333 14.6667C3.28325 14.6667 0 11.3834 0 7.33333C0 3.28325 3.28325 0 7.33333 0C11.3834 0 14.6667 3.28325 14.6667 7.33333Z" fill="#171717"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.33333 12.3333C6.78105 12.3333 6.33333 11.8856 6.33333 11.3333L6.33333 7.33333C6.33333 6.78105 6.78105 6.33333 7.33333 6.33333C7.88562 6.33333 8.33333 6.78105 8.33333 7.33333L8.33333 11.3333C8.33333 11.8856 7.88562 12.3333 7.33333 12.3333Z" fill="white"/>
                  <path d="M6 4C6 3.26362 6.59695 2.66667 7.33333 2.66667C8.06971 2.66667 8.66667 3.26362 8.66667 4C8.66667 4.73638 8.06971 5.33333 7.33333 5.33333C6.59695 5.33333 6 4.73638 6 4Z" fill="white"/>
                </svg>
                <p className="text-[16px] font-medium text-[#171717] leading-[22px] tracking-[0.35px]">
                  This may take a few minutes. Please check back shortly.
                </p>
              </div>

              {/* Cancel button */}
              <button
                onClick={() => router.back()}
                className="w-full h-10 rounded-full bg-[#262626] hover:bg-[#171717] text-white text-[16px] font-medium transition-colors cursor-pointer mt-4"
              >
                Cancel
              </button>
            </div>

            {/* Right column */}
            <div className="flex flex-col flex-1 gap-4 min-w-0">

              {/* Full Payment Submission card */}
              <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
                <div className="px-5 py-4">
                  <p className="text-[18px] font-semibold text-[var(--color-text-default)] leading-[24px]">Full Payment Submission</p>
                  <p className="text-[16px] font-medium text-[#404040] leading-[22px] mt-0.5">
                    Employee payments and deductions sent to HMRC.
                  </p>
                </div>
                <div className="px-5 pb-5 flex flex-col gap-[4px]">
                  <DataRow label="Employees submitted" value="602" />
                  <DataRow label="Total gross pay" value="£1,245,820.00" />
                  <DataRow label="Total tax" value="£316,875.00" />
                  <DataRow label="Total NI" value="£98,530.00" />
                </div>
                <div className="mx-5 border-t border-[var(--color-border-subtle)]" />
                <div className="px-5 pt-4 pb-5 flex justify-end">
                  <button className="h-10 px-4 rounded-full border border-[#a3a3a3] bg-white text-[16px] font-medium text-[#171717] hover:bg-[var(--color-grey-50)] transition-colors cursor-pointer">
                    Download CSV
                  </button>
                </div>
              </div>

              {/* Submission history card */}
              <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
                <div className="px-5 pt-4 pb-0">
                  <p className="text-[18px] font-semibold text-[var(--color-text-default)] leading-[24px]">Submission history</p>
                </div>

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
                      <td className="py-4 pl-5 pr-4 text-[14px] font-medium text-[var(--color-text-default)] tracking-[0.3px] align-top">1</td>
                      <td className="p-4 text-[14px] font-medium text-[var(--color-text-default)] tracking-[0.3px] align-top whitespace-nowrap">21/03/2025 (8:12)</td>
                      <td className="p-4 align-top">
                        <PendingTag />
                      </td>
                      <td className="py-4 pl-4 pr-5 align-top" />
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
