'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PayrollSidebar } from '@/components/PayrollSidebar';
import { Button } from '@finity/design-system';

// ─── Date helpers ────────────────────────────────────────────────────────────

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDay(date: Date) {
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`;
}

function taxYearLabel(startYear: number) {
  return `${startYear}/${startYear + 1}`;
}

function taxYearStart(startYear: number) {
  return new Date(startYear, 3, 6); // April 6
}

function getTaxYearStartYear(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return m > 4 || (m === 4 && d >= 6) ? y : y - 1;
}

// ─── Tax week ────────────────────────────────────────────────────────────────

function getTaxWeekNumber(date: Date): number {
  const startYear = getTaxYearStartYear(date);
  const start = taxYearStart(startYear);
  const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(Math.floor(diff / 7) + 1, 52);
}

function generateTaxWeeks(startYear: number): string[] {
  const start = taxYearStart(startYear);
  const weeks: string[] = [];
  for (let w = 1; w <= 52; w++) {
    const weekStart = new Date(start);
    weekStart.setDate(weekStart.getDate() + (w - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const sameMonth = weekStart.getMonth() === weekEnd.getMonth();
    const range = sameMonth
      ? `${weekStart.getDate()}–${weekEnd.getDate()} ${SHORT_MONTHS[weekEnd.getMonth()]}`
      : `${formatDay(weekStart)}–${formatDay(weekEnd)}`;
    weeks.push(`Week ${w} (${range})`);
  }
  return weeks.reverse();
}

// ─── Tax month ───────────────────────────────────────────────────────────────

function getTaxMonthEndDate(startYear: number, monthNum: number): Date {
  const calMonthIndex = (3 + monthNum) % 12;
  const yearOffset = 3 + monthNum >= 12 ? 1 : 0;
  return new Date(startYear + yearOffset, calMonthIndex, 5);
}

function getCurrentTaxMonth(date: Date): number {
  const startYear = getTaxYearStartYear(date);
  for (let m = 1; m <= 12; m++) {
    if (date <= getTaxMonthEndDate(startYear, m)) return m;
  }
  return 12;
}

function generateTaxMonths(): string[] {
  const months: string[] = [];
  for (let m = 1; m <= 12; m++) {
    const endMonthName = SHORT_MONTHS[(3 + m) % 12];
    months.push(`Tax month ${m} (Ends 5 ${endMonthName})`);
  }
  return months.reverse(); // Month 12 first
}

// ─── Tax year ────────────────────────────────────────────────────────────────

function generateTaxYears(currentStartYear: number): string[] {
  return Array.from({ length: 5 }, (_, i) => taxYearLabel(currentStartYear - i));
}

// ─── Dropdown ────────────────────────────────────────────────────────────────

function CaretIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="shrink-0">
      <path d="M0 0L5 6L10 0H0Z" fill="#737373" />
    </svg>
  );
}

function Dropdown({
  label,
  value,
  options,
  onChange,
  triggerHeight = 48,
  className,
}: {
  label?: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  triggerHeight?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col gap-1 ${className ?? ''}`} ref={ref}>
      {label && (
        <div className="h-6 flex items-center">
          <span className="text-[16px] font-medium leading-[22px] tracking-[0.35px] text-[#404040]">
            {label}
          </span>
        </div>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{ height: triggerHeight }}
          className="w-full flex items-center justify-between pl-3 pr-4 rounded-lg border border-[#a3a3a3] bg-white text-[16px] font-medium text-[#171717] tracking-[0.35px] leading-[22px] cursor-pointer focus:outline-none"
        >
          <span className="truncate text-left flex-1 min-w-0">{value}</span>
          <CaretIcon />
        </button>
        {open && (
          <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#a3a3a3] rounded-lg shadow-md overflow-auto max-h-[240px]">
            {options.map((o) => (
              <li
                key={o}
                onClick={() => { onChange(o); setOpen(false); }}
                className={`px-3 py-2.5 text-[16px] font-normal text-[#171717] tracking-[0.35px] leading-[22px] cursor-pointer hover:bg-[#f5f5f5] ${o === value ? 'bg-[#fafafa]' : ''}`}
              >
                {o}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Section notification ────────────────────────────────────────────────────

const NOTIFICATION_TEXT: Partial<Record<'FPS' | 'EPS' | 'CISr', string>> = {};

function SectionNotification({ type }: { type: 'FPS' | 'EPS' | 'CISr' }) {
  return (
    <div className="flex items-start gap-2 bg-[#f5f5f5] rounded-[12px] pl-4 pr-5 py-4 w-full">
      <div className="pt-[2px] shrink-0">
        <svg width="16" height="16" viewBox="0 0 14.6667 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.6667 7.33333C14.6667 11.3834 11.3834 14.6667 7.33333 14.6667C3.28325 14.6667 0 11.3834 0 7.33333C0 3.28325 3.28325 0 7.33333 0C11.3834 0 14.6667 3.28325 14.6667 7.33333Z" fill="#525252"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M7.33333 12.3333C6.78105 12.3333 6.33333 11.8856 6.33333 11.3333L6.33333 7.33333C6.33333 6.78105 6.78105 6.33333 7.33333 6.33333C7.88562 6.33333 8.33333 6.78105 8.33333 7.33333L8.33333 11.3333C8.33333 11.8856 7.88562 12.3333 7.33333 12.3333Z" fill="white"/>
          <path d="M6 4C6 3.26362 6.59695 2.66667 7.33333 2.66667C8.06971 2.66667 8.66667 3.26362 8.66667 4C8.66667 4.73638 8.06971 5.33333 7.33333 5.33333C6.59695 5.33333 6 4.73638 6 4Z" fill="white"/>
        </svg>
      </div>
      <p className="text-[16px] font-medium text-[#171717] leading-[22px] tracking-[0.35px]">
        {NOTIFICATION_TEXT[type]}
      </p>
    </div>
  );
}

// ─── Report download dropdown (static label) ─────────────────────────────────

function ReportDownloadDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-[40px] flex items-center justify-between gap-3 pl-3 pr-4 rounded-lg border border-[#a3a3a3] bg-white text-[16px] font-medium text-[#171717] tracking-[0.35px] leading-[22px] cursor-pointer focus:outline-none w-[240px]"
      >
        <span>Invalid RTI report</span>
        <CaretIcon />
      </button>
      {open && (
        <ul className="absolute z-50 top-full right-0 mt-1 w-full bg-white border border-[#a3a3a3] rounded-lg shadow-md overflow-hidden">
          {['Invalid employee report', 'Invalid company report'].map((o) => (
            <li
              key={o}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-[16px] font-normal text-[#171717] tracking-[0.35px] leading-[22px] cursor-pointer hover:bg-[#f5f5f5]"
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Verification table ──────────────────────────────────────────────────────

const TABLE_ROWS = [
  { employee: 'Dax Champlin',       nino: 'AA600102A', starter: '',           leaver: '2024/04/26', taxableYTD: '1,158.00', taxYTD: '221.40', taxable: '558.00',   tax: '149.80', ni: '33.18' },
  { employee: 'Cordie Russel',      nino: '',          starter: '2025/03/04', leaver: '2025/03/04', taxableYTD: '15.00',    taxYTD: '0.00',   taxable: '15.00',    tax: '0.00',   ni: '0.00'  },
  { employee: 'Kraig Hammes',       nino: 'JK757536A', starter: '2025/03/20', leaver: '2024/04/12', taxableYTD: '540.00',   taxYTD: '59.80',  taxable: '540.00',   tax: '59.80',  ni: '23.84' },
  { employee: 'Anibal Champlin',    nino: '',          starter: '2025/03/31', leaver: '',           taxableYTD: '600.00',   taxYTD: '71.80',  taxable: '600.00',   tax: '71.80',  ni: '28.64' },
  { employee: 'Theodora Witting',   nino: 'BC234567B', starter: '',           leaver: '',           taxableYTD: '2,400.00', taxYTD: '480.00', taxable: '800.00',   tax: '160.00', ni: '72.00' },
  { employee: 'Lena Brakus',        nino: 'CD345678C', starter: '2024/09/01', leaver: '',           taxableYTD: '3,200.00', taxYTD: '640.00', taxable: '1,066.00', tax: '213.20', ni: '95.94' },
  { employee: 'Orrin Metz',         nino: '',          starter: '',           leaver: '2025/01/15', taxableYTD: '980.00',   taxYTD: '196.00', taxable: '490.00',   tax: '98.00',  ni: '44.10' },
  { employee: 'Felicia Steuber',    nino: 'DE456789D', starter: '2025/02/10', leaver: '',           taxableYTD: '720.00',   taxYTD: '144.00', taxable: '720.00',   tax: '144.00', ni: '64.80' },
  { employee: 'Reginald Olson',     nino: 'EF567890E', starter: '',           leaver: '',           taxableYTD: '5,100.00', taxYTD: '1,020.00', taxable: '1,700.00', tax: '340.00', ni: '153.00' },
  { employee: 'Cassidy Feil',       nino: '',          starter: '2024/12/01', leaver: '2025/03/01', taxableYTD: '300.00',   taxYTD: '60.00',  taxable: '100.00',   tax: '20.00',  ni: '9.00'  },
  { employee: 'Percival Tremblay',  nino: 'FG678901F', starter: '',           leaver: '',           taxableYTD: '4,800.00', taxYTD: '960.00', taxable: '1,600.00', tax: '320.00', ni: '144.00' },
  { employee: 'Isadora Klein',      nino: 'GH789012G', starter: '2025/01/07', leaver: '',           taxableYTD: '1,050.00', taxYTD: '210.00', taxable: '1,050.00', tax: '210.00', ni: '94.50' },
  { employee: 'Barnaby Conn',       nino: '',          starter: '',           leaver: '2024/11/30', taxableYTD: '2,100.00', taxYTD: '420.00', taxable: '700.00',   tax: '140.00', ni: '63.00' },
  { employee: 'Millicent Hauck',    nino: 'HI890123H', starter: '2024/07/15', leaver: '',           taxableYTD: '6,300.00', taxYTD: '1,260.00', taxable: '2,100.00', tax: '420.00', ni: '189.00' },
  { employee: 'Sylvester Pagac',    nino: 'IJ901234I', starter: '',           leaver: '',           taxableYTD: '900.00',   taxYTD: '180.00', taxable: '300.00',   tax: '60.00',  ni: '27.00' },
  { employee: 'Araminta Boyle',     nino: '',          starter: '2025/03/17', leaver: '',           taxableYTD: '480.00',   taxYTD: '96.00',  taxable: '480.00',   tax: '96.00',  ni: '43.20' },
  { employee: 'Fletcher Runolfsson',nino: 'JK012345J', starter: '',           leaver: '2025/02/28', taxableYTD: '3,900.00', taxYTD: '780.00', taxable: '1,300.00', tax: '260.00', ni: '117.00' },
  { employee: 'Rosalind Schuppe',   nino: 'KL123456K', starter: '2024/10/01', leaver: '',           taxableYTD: '2,700.00', taxYTD: '540.00', taxable: '900.00',   tax: '180.00', ni: '81.00' },
  { employee: 'Crispin Wehner',     nino: '',          starter: '',           leaver: '',           taxableYTD: '1,800.00', taxYTD: '360.00', taxable: '600.00',   tax: '120.00', ni: '54.00' },
  { employee: 'Evangeline Nader',   nino: 'LM234567L', starter: '2025/01/20', leaver: '',           taxableYTD: '660.00',   taxYTD: '132.00', taxable: '660.00',   tax: '132.00', ni: '59.40' },
  { employee: 'Thaddeus Larkin',    nino: 'MN345678M', starter: '',           leaver: '2024/09/30', taxableYTD: '4,200.00', taxYTD: '840.00', taxable: '1,400.00', tax: '280.00', ni: '126.00' },
  { employee: 'Sophronia Grimes',   nino: '',          starter: '2024/08/12', leaver: '2025/03/12', taxableYTD: '2,550.00', taxYTD: '510.00', taxable: '850.00',   tax: '170.00', ni: '76.50' },
  { employee: 'Leontine Nitzsche',  nino: 'NO456789N', starter: '',           leaver: '',           taxableYTD: '7,200.00', taxYTD: '1,440.00', taxable: '2,400.00', tax: '480.00', ni: '216.00' },
  { employee: 'Mortimer Stanton',   nino: 'OP567890O', starter: '2025/02/03', leaver: '',           taxableYTD: '390.00',   taxYTD: '78.00',  taxable: '390.00',   tax: '78.00',  ni: '35.10' },
  { employee: 'Calliope Bruen',     nino: '',          starter: '',           leaver: '2025/01/31', taxableYTD: '1,500.00', taxYTD: '300.00', taxable: '500.00',   tax: '100.00', ni: '45.00' },
  { employee: 'Ignatius Funk',      nino: 'PQ678901P', starter: '2024/06/01', leaver: '',           taxableYTD: '8,400.00', taxYTD: '1,680.00', taxable: '2,800.00', tax: '560.00', ni: '252.00' },
  { employee: 'Seraphina Gutmann',  nino: 'QR789012Q', starter: '',           leaver: '',           taxableYTD: '3,600.00', taxYTD: '720.00', taxable: '1,200.00', tax: '240.00', ni: '108.00' },
  { employee: 'Ptolemy Considine',  nino: '',          starter: '2025/03/10', leaver: '',           taxableYTD: '240.00',   taxYTD: '48.00',  taxable: '240.00',   tax: '48.00',  ni: '21.60' },
  { employee: 'Lavinia Rohan',      nino: 'RS890123R', starter: '',           leaver: '2024/12/31', taxableYTD: '2,250.00', taxYTD: '450.00', taxable: '750.00',   tax: '150.00', ni: '67.50' },
  { employee: 'Cornelius Senger',   nino: 'ST901234S', starter: '2024/11/15', leaver: '',           taxableYTD: '1,440.00', taxYTD: '288.00', taxable: '480.00',   tax: '96.00',  ni: '43.20' },
  { employee: 'Mehetabel Wiza',     nino: '',          starter: '',           leaver: '',           taxableYTD: '5,400.00', taxYTD: '1,080.00', taxable: '1,800.00', tax: '360.00', ni: '162.00' },
  { employee: 'Florentine Kiehn',   nino: 'TU012345T', starter: '2025/01/02', leaver: '',           taxableYTD: '810.00',   taxYTD: '162.00', taxable: '810.00',   tax: '162.00', ni: '72.90' },
  { employee: 'Algernon Pouros',    nino: 'UV123456U', starter: '',           leaver: '2025/02/14', taxableYTD: '3,000.00', taxYTD: '600.00', taxable: '1,000.00', tax: '200.00', ni: '90.00' },
  { employee: 'Celestine Bayer',    nino: '',          starter: '2024/09/23', leaver: '2025/03/23', taxableYTD: '1,620.00', taxYTD: '324.00', taxable: '540.00',   tax: '108.00', ni: '48.60' },
  { employee: 'Peregrine Frami',    nino: 'VW234567V', starter: '',           leaver: '',           taxableYTD: '9,000.00', taxYTD: '1,800.00', taxable: '3,000.00', tax: '600.00', ni: '270.00' },
  { employee: 'Thomasina Hyatt',    nino: 'WX345678W', starter: '2024/07/01', leaver: '',           taxableYTD: '6,000.00', taxYTD: '1,200.00', taxable: '2,000.00', tax: '400.00', ni: '180.00' },
  { employee: 'Benedikt Lockman',   nino: '',          starter: '',           leaver: '2024/10/15', taxableYTD: '1,350.00', taxYTD: '270.00', taxable: '450.00',   tax: '90.00',  ni: '40.50' },
  { employee: 'Xiomara Blanda',     nino: 'XY456789X', starter: '2025/03/01', leaver: '',           taxableYTD: '120.00',   taxYTD: '24.00',  taxable: '120.00',   tax: '24.00',  ni: '10.80' },
  { employee: 'Obadiah Cormier',    nino: 'YZ567890Y', starter: '',           leaver: '',           taxableYTD: '4,500.00', taxYTD: '900.00', taxable: '1,500.00', tax: '300.00', ni: '135.00' },
  { employee: 'Philomena Jacobi',   nino: '',          starter: '2024/08/05', leaver: '2025/02/05', taxableYTD: '1,980.00', taxYTD: '396.00', taxable: '660.00',   tax: '132.00', ni: '59.40' },
  { employee: 'Lysander Huel',      nino: 'ZA678901Z', starter: '',           leaver: '',           taxableYTD: '7,800.00', taxYTD: '1,560.00', taxable: '2,600.00', tax: '520.00', ni: '234.00' },
  { employee: 'Amaryllis Conn',     nino: 'AB789012A', starter: '2024/12/16', leaver: '',           taxableYTD: '630.00',   taxYTD: '126.00', taxable: '630.00',   tax: '126.00', ni: '56.70' },
  { employee: 'Desmond Feest',      nino: '',          starter: '',           leaver: '2025/01/10', taxableYTD: '2,880.00', taxYTD: '576.00', taxable: '960.00',   tax: '192.00', ni: '86.40' },
  { employee: 'Clementine Okon',    nino: 'BC890123B', starter: '2025/02/17', leaver: '',           taxableYTD: '510.00',   taxYTD: '102.00', taxable: '510.00',   tax: '102.00', ni: '45.90' },
  { employee: 'Archibald Wunsch',   nino: 'CD901234C', starter: '',           leaver: '',           taxableYTD: '6,600.00', taxYTD: '1,320.00', taxable: '2,200.00', tax: '440.00', ni: '198.00' },
  { employee: 'Sophronia Blick',    nino: '',          starter: '2024/10/28', leaver: '2025/03/28', taxableYTD: '1,710.00', taxYTD: '342.00', taxable: '570.00',   tax: '114.00', ni: '51.30' },
  { employee: 'Ezekiel Purdy',      nino: 'DE012345D', starter: '',           leaver: '',           taxableYTD: '3,300.00', taxYTD: '660.00', taxable: '1,100.00', tax: '220.00', ni: '99.00' },
  { employee: 'Wilhelmina Farrell', nino: 'EF123456E', starter: '2024/06/15', leaver: '',           taxableYTD: '9,600.00', taxYTD: '1,920.00', taxable: '3,200.00', tax: '640.00', ni: '288.00' },
  { employee: 'Horatio Bins',       nino: '',          starter: '',           leaver: '2024/08/31', taxableYTD: '2,040.00', taxYTD: '408.00', taxable: '680.00',   tax: '136.00', ni: '61.20' },
  { employee: 'Venetia Abshire',    nino: 'FG234567F', starter: '2025/03/25', leaver: '',           taxableYTD: '300.00',   taxYTD: '60.00',  taxable: '300.00',   tax: '60.00',  ni: '27.00' },
];

const TH = 'border-b border-[#e5e5e5] text-[14px] font-semibold text-[#404040] tracking-[0.3px] leading-[20px] whitespace-nowrap py-[10px]';
const TD = 'border-b border-[#e5e5e5] text-[14px] font-medium text-[#171717] tracking-[0.3px] leading-[20px] py-[10px]';

function ErrorResultBanner() {
  return (
    <div className="flex items-start gap-2 bg-[#f5f5f5] rounded-[12px] pl-4 pr-5 py-4 w-full">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-[1px]">
        <circle cx="10" cy="10" r="10" fill="#DC2626" />
        <path d="M10 5.5v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="10" cy="14" r="1" fill="white" />
      </svg>
      <p className="text-[16px] font-medium text-[#171717] leading-[22px] tracking-[0.35px]">
        3 errors are blocking this submission
      </p>
    </div>
  );
}

const ELEVATE_ERRORS = [
  'Missing or incorrect dates of birth',
  'Missing surnames',
  'Missing or unmatched National Insurance numbers (NiNo)',
];

function ModalShell({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white w-[600px] rounded-2xl shadow-xl">
        <button onClick={onClose} className="absolute top-2 right-2 size-[32px] flex items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors">
          <svg width="10" height="10" viewBox="0 0 11.5 11.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.75 0.75L5.75 5.75L10.75 10.75M0.75 10.75L10.75 0.75" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-[20px] font-semibold text-[#171717] leading-[28px] tracking-[0.2px]">{title}</h2>
          <p className="text-[16px] font-normal text-[#171717] leading-[22px] tracking-[0.35px] mt-1">{subtitle}</p>
        </div>
        <div className="overflow-y-auto max-h-[320px] show-scrollbar">
          {children}
        </div>
        <div className="flex justify-end px-6 py-6">
          <Button variant="primary" size="medium" className="!text-base" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

function MissingSurnamesModal({ taxWeekLabel, onClose }: { taxWeekLabel: string; onClose: () => void }) {
  const rows = [
    { name: 'James', ref: 'EMP102384' },
    { name: 'Sophie', ref: 'EMP103219' },
    { name: 'Oliver', ref: 'EMP104875' },
    { name: 'Charlotte', ref: 'EMP105612' },
    { name: 'Harry', ref: 'EMP106743' },
    { name: 'Amelia', ref: 'EMP107891' },
    { name: 'George', ref: 'EMP108234' },
    { name: 'Isla', ref: 'EMP109567' },
    { name: 'Jack', ref: 'EMP110023' },
    { name: 'Poppy', ref: 'EMP111456' },
    { name: 'Alfie', ref: 'EMP112789' },
    { name: 'Ava', ref: 'EMP113012' },
    { name: 'Freddie', ref: 'EMP114345' },
    { name: 'Lily', ref: 'EMP115678' },
    { name: 'Charlie', ref: 'EMP116901' },
    { name: 'Grace', ref: 'EMP117234' },
    { name: 'Archie', ref: 'EMP118567' },
    { name: 'Evie', ref: 'EMP119890' },
    { name: 'Henry', ref: 'EMP120123' },
    { name: 'Mia', ref: 'EMP121456' },
    { name: 'Theo', ref: 'EMP122789' },
    { name: 'Ruby', ref: 'EMP123012' },
    { name: 'Oscar', ref: 'EMP124345' },
    { name: 'Ella', ref: 'EMP125678' },
  ];
  return (
    <ModalShell title="Missing surnames" subtitle={taxWeekLabel} onClose={onClose}>
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-[#e5e5e5]">
            <th className="text-left text-[14px] font-semibold text-[#404040] py-[10px] pl-6 pr-4 tracking-[0.3px]">Worker</th>
            <th className="text-left text-[14px] font-semibold text-[#404040] py-[10px] pr-4 tracking-[0.3px]">Reference no.</th>
            <th className="text-right text-[14px] font-semibold text-[#404040] py-[10px] pr-6 tracking-[0.3px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors">
              <td className="text-[14px] font-medium text-[#171717] py-3 pl-6 pr-4 tracking-[0.3px]">{row.name}</td>
              <td className="text-[14px] font-medium text-[#171717] py-3 pr-4 tracking-[0.3px]">{row.ref}</td>
              <td className="text-right py-3 pr-6">
                <a href="#" className="text-[16px] font-semibold text-[var(--color-coral-400)] underline">Fix</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalShell>
  );
}

function MissingDobModal({ taxWeekLabel, onClose }: { taxWeekLabel: string; onClose: () => void }) {
  const rows = [
    { name: 'Marcus Webb', ref: 'EMP204517' },
    { name: 'Priya Nair', ref: 'EMP208832' },
  ];
  return (
    <ModalShell title="Missing or incorrect dates of birth" subtitle={taxWeekLabel} onClose={onClose}>
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-[#e5e5e5]">
            <th className="text-left text-[14px] font-semibold text-[#404040] py-[10px] pl-6 pr-4 tracking-[0.3px]">Worker</th>
            <th className="text-left text-[14px] font-semibold text-[#404040] py-[10px] pr-4 tracking-[0.3px]">Reference no.</th>
            <th className="text-right text-[14px] font-semibold text-[#404040] py-[10px] pr-6 tracking-[0.3px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors">
              <td className="text-[14px] font-medium text-[#171717] py-3 pl-6 pr-4 tracking-[0.3px]">{row.name}</td>
              <td className="text-[14px] font-medium text-[#171717] py-3 pr-4 tracking-[0.3px]">{row.ref}</td>
              <td className="text-right py-3 pr-6">
                <a href="#" className="text-[16px] font-semibold text-[var(--color-coral-400)] underline">Fix</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalShell>
  );
}

function MissingNinoModal({ taxWeekLabel, onClose }: { taxWeekLabel: string; onClose: () => void }) {
  const rows = [
    { name: 'Daniel Frost', ref: 'EMP301124' },
    { name: 'Aisha Okonkwo', ref: 'EMP305678' },
    { name: 'Liam Sherwood', ref: 'EMP309941' },
    { name: 'Fatima Al-Hassan', ref: 'EMP312203' },
  ];
  return (
    <ModalShell title="Missing or unmatched National Insurance numbers" subtitle={taxWeekLabel} onClose={onClose}>
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-[#e5e5e5]">
            <th className="text-left text-[14px] font-semibold text-[#404040] py-[10px] pl-6 pr-4 tracking-[0.3px]">Worker</th>
            <th className="text-left text-[14px] font-semibold text-[#404040] py-[10px] pr-4 tracking-[0.3px]">Reference no.</th>
            <th className="text-right text-[14px] font-semibold text-[#404040] py-[10px] pr-6 tracking-[0.3px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#e5e5e5] last:border-0 hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors">
              <td className="text-[14px] font-medium text-[#171717] py-3 pl-6 pr-4 tracking-[0.3px]">{row.name}</td>
              <td className="text-[14px] font-medium text-[#171717] py-3 pr-4 tracking-[0.3px]">{row.ref}</td>
              <td className="text-right py-3 pr-6">
                <a href="#" className="text-[16px] font-semibold text-[var(--color-coral-400)] underline">Fix</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalShell>
  );
}

function ErrorList({ onFixDob, onFixSurnames, onFixNino }: { onFixDob: () => void; onFixSurnames: () => void; onFixNino: () => void }) {
  const handlers: Record<string, () => void> = {
    'Missing or incorrect dates of birth': onFixDob,
    'Missing surnames': onFixSurnames,
    'Missing or unmatched National Insurance numbers (NiNo)': onFixNino,
  };
  return (
    <div className="flex flex-col gap-[4px]">
      {ELEVATE_ERRORS.map((err) => (
        <div
          key={err}
          onClick={handlers[err]}
          className="flex items-center justify-between gap-2 px-2 py-1.5 -mx-2 rounded-lg hover:bg-[var(--color-grey-100)] cursor-pointer transition-colors"
        >
          <span className="text-[16px] font-normal text-[#171717] leading-[22px] tracking-[0.35px]">{err}</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[16px] font-semibold text-[var(--color-coral-400)] underline leading-[22px] shrink-0">Fix</a>
        </div>
      ))}
    </div>
  );
}

function VerifiedNotification() {
  return (
    <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-[12px] pl-4 pr-5 py-4 w-full">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-[1px]">
        <circle cx="10" cy="10" r="10" fill="#16A34A" />
        <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-[16px] font-medium text-[#171717] leading-[22px] tracking-[0.35px]">
        Data is verified and there are no errors
      </p>
    </div>
  );
}

function VerificationTable() {
  return (
    <div className="w-full overflow-x-auto overflow-y-scroll max-h-[640px] border border-[#e5e5e5] rounded-xl show-scrollbar">
      <table className="w-full min-w-[960px] border-collapse">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th className={`${TH} text-left pr-6 pl-4`}>Employee</th>
            <th className={`${TH} text-left px-6`}>NINO</th>
            <th className={`${TH} text-right px-6`}>Starter</th>
            <th className={`${TH} text-right px-6`}>Leaver</th>
            <th className={`${TH} text-right px-6`}>Taxable pay YTD</th>
            <th className={`${TH} text-right px-6`}>Tax YTD</th>
            <th className={`${TH} text-right px-6`}>Taxable pay</th>
            <th className={`${TH} text-right px-6`}>Tax</th>
            <th className={`${TH} text-right px-6 pr-4`}>NI</th>
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((row, i) => (
            <tr key={i}>
              <td className={`${TD} text-left pr-6 pl-4`}>{row.employee}</td>
              <td className={`${TD} text-left px-6`}>{row.nino || '–'}</td>
              <td className={`${TD} text-right px-6`}>{row.starter || '–'}</td>
              <td className={`${TD} text-right px-6`}>{row.leaver || '–'}</td>
              <td className={`${TD} text-right px-6`}>{row.taxableYTD}</td>
              <td className={`${TD} text-right px-6`}>{row.taxYTD}</td>
              <td className={`${TD} text-right px-6`}>{row.taxable}</td>
              <td className={`${TD} text-right px-6`}>{row.tax}</td>
              <td className={`${TD} text-right px-6 pr-4`}>{row.ni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

type ReportType = 'FPS' | 'EPS' | 'CISr';

const LATE_REASONS = ['No reason provided', 'Reasonable excuse', 'Correction to earlier submission'];
const TAX_MONTHS = generateTaxMonths();

const FPS_COMPANIES = ['Bluecrest Solutions', 'Elevate Group'];
const EPS_COMPANIES = ['All applicable companies', 'Bluecrest Solutions', 'Elevate Group'];

export default function PreValidationPage() {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const currentTaxYearStart = useMemo(() => getTaxYearStartYear(today), [today]);
  const currentWeekNumber = useMemo(() => getTaxWeekNumber(today), [today]);
  const currentMonthNumber = useMemo(() => getCurrentTaxMonth(today), [today]);

  const taxYearOptions = useMemo(() => generateTaxYears(currentTaxYearStart), [currentTaxYearStart]);
  const taxWeekOptions = useMemo(() => generateTaxWeeks(currentTaxYearStart), [currentTaxYearStart]);

  const currentWeekLabel = useMemo(
    () => taxWeekOptions.find((w) => w.startsWith(`Week ${currentWeekNumber} (`)) ?? taxWeekOptions[0],
    [taxWeekOptions, currentWeekNumber],
  );
  const currentMonthLabel = useMemo(
    () => TAX_MONTHS.find((m) => m.startsWith(`Tax month ${currentMonthNumber} (`)) ?? TAX_MONTHS[0],
    [currentMonthNumber],
  );

  const [reportType, setReportType] = useState<ReportType>('FPS');
  const [taxWeek, setTaxWeek] = useState(currentWeekLabel);
  const [taxMonth, setTaxMonth] = useState(currentMonthLabel);
  const [taxYear, setTaxYear] = useState(taxYearOptions[0]);
  const [company, setCompany] = useState('Bluecrest Solutions');
  const [epsCompany, setEpsCompany] = useState('All applicable companies');
  const [lateReason, setLateReason] = useState('No reason provided');
  const [nilSubmission, setNilSubmission] = useState(false);
  const [verifiedForType, setVerifiedForType] = useState<ReportType | null>(null);
  const [showMissingSurnamesModal, setShowMissingSurnamesModal] = useState(false);
  const [showMissingDobModal, setShowMissingDobModal] = useState(false);
  const [showMissingNinoModal, setShowMissingNinoModal] = useState(false);

  const isEPS = reportType === 'EPS' || reportType === 'CISr';

  return (
    <div className="flex h-screen bg-white">
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
        <div className="flex-1 overflow-y-scroll show-scrollbar">
          <div className="flex flex-col p-5">

            {/* Report download — right-aligned */}
            <div className="flex justify-end w-full mb-8">
              <ReportDownloadDropdown />
            </div>

            {/* Form — centered */}
            <div className="flex justify-center w-full">
              <div className="flex flex-col gap-[32px] w-[596px]">

                <h1 className="text-[20px] font-semibold text-black tracking-[0.2px] leading-[28px]">
                  Pre-validation
                </h1>

                {NOTIFICATION_TEXT[reportType] && <SectionNotification type={reportType} />}

                <div className="flex flex-col gap-5">

                  {/* Radio buttons */}
                  <div className="flex gap-4 items-center">
                    {(['FPS', 'EPS', 'CISr'] as ReportType[]).map((type) => (
                      <label
                        key={type}
                        onClick={() => setReportType(type)}
                        className="flex items-center gap-2 h-8 cursor-pointer select-none"
                      >
                        <div
                          className={`size-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            reportType === type
                              ? 'bg-[var(--color-coral-400)] border-[var(--color-coral-400)]'
                              : 'bg-white border-[#a3a3a3]'
                          }`}
                        >
                          {reportType === type && <div className="size-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-[16px] font-normal text-[#171717] leading-[22px] tracking-[0.35px]">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Tax week / Tax month + Tax year */}
                  <div className="flex gap-2 items-start">
                    {isEPS ? (
                      <Dropdown
                        label="Tax month"
                        value={taxMonth}
                        options={TAX_MONTHS}
                        onChange={setTaxMonth}
                        className="flex-1 min-w-0"
                      />
                    ) : (
                      <Dropdown
                        label="Tax week"
                        value={taxWeek}
                        options={taxWeekOptions}
                        onChange={setTaxWeek}
                        className="flex-1 min-w-0"
                      />
                    )}
                    <Dropdown
                      label="Tax year"
                      value={taxYear}
                      options={taxYearOptions}
                      onChange={setTaxYear}
                      className="w-[184px] shrink-0"
                    />
                  </div>

                  {/* Payment company */}
                  <Dropdown
                    label="Payment company"
                    value={isEPS ? epsCompany : company}
                    options={isEPS ? EPS_COMPANIES : FPS_COMPANIES}
                    onChange={(v) => { if (isEPS) { setEpsCompany(v); } else { setCompany(v); setVerifiedForType(null); } }}
                  />

                  {/* Late reason (FPS) or NIL submission (EPS) */}
                  {isEPS ? (
                    <div className="flex flex-col gap-[16px]">
                      <label
                        onClick={() => setNilSubmission((v) => !v)}
                        className="flex items-center gap-2 cursor-pointer select-none"
                      >
                        <div
                          className={`size-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                            nilSubmission
                              ? 'bg-[var(--color-coral-400)] border-[var(--color-coral-400)]'
                              : 'bg-white border-[#a3a3a3]'
                          }`}
                        >
                          {nilSubmission && (
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                              <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[16px] font-normal text-[#171717] leading-[22px] tracking-[0.35px]">
                          NIL submission
                        </span>
                      </label>
                      <div className="flex items-start gap-[4px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-[2px]">
                          <circle cx="8" cy="8" r="8" fill="#525252" />
                          <path d="M8 7v5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                          <circle cx="8" cy="5" r="0.8" fill="white" />
                        </svg>
                        <p className="text-[14px] font-medium text-[#525252] leading-[20px] tracking-[0.3px]">
                          {reportType} are sent automatically on the 10th of each month
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16px]">
                      <Dropdown
                        label="Late reason"
                        value={lateReason}
                        options={LATE_REASONS}
                        onChange={setLateReason}
                      />
                      <div className="flex items-start gap-[4px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-[2px]">
                          <circle cx="8" cy="8" r="8" fill="#525252" />
                          <path d="M8 7v5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                          <circle cx="8" cy="5" r="0.8" fill="white" />
                        </svg>
                        <p className="text-[14px] font-medium text-[#525252] leading-[20px] tracking-[0.3px]">
                          FPS are sent automatically after 5PM on Fridays
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                {(() => {
                  const hasErrors = verifiedForType === reportType && reportType === 'FPS' && company === 'Elevate Group';
                  const sendDisabled = verifiedForType !== reportType || hasErrors;
                  return (
                    <div className="flex items-center gap-2 self-start">
                      <button
                        onClick={() => setVerifiedForType(reportType)}
                        className="h-[40px] px-[16px] rounded-full border border-[#262626] bg-white hover:bg-[#f5f5f5] text-[#262626] text-[16px] font-medium tracking-[0.35px] leading-[22px] transition-colors cursor-pointer"
                      >
                        Verify data
                      </button>
                      <span className={sendDisabled ? 'cursor-not-allowed' : ''}>
                        <button
                          disabled={sendDisabled}
                          onClick={() => !sendDisabled && router.push('/send-to-hmrc')}
                          className={`h-[40px] px-[16px] rounded-full text-[16px] font-medium tracking-[0.35px] leading-[22px] transition-colors ${
                            sendDisabled
                              ? 'bg-[#e5e5e5] text-[#a3a3a3] pointer-events-none'
                              : 'bg-[#262626] hover:bg-[#171717] text-white cursor-pointer'
                          }`}
                        >
                          Send to HMRC
                        </button>
                      </span>
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Verify result */}
            {verifiedForType === 'FPS' && reportType === 'FPS' && (
              company === 'Elevate Group' ? (
                <div className="flex justify-center w-full mt-[32px]">
                  <div className="flex flex-col gap-4 w-[596px]">
                    <ErrorResultBanner />
                    <ErrorList
                      onFixDob={() => setShowMissingDobModal(true)}
                      onFixSurnames={() => setShowMissingSurnamesModal(true)}
                      onFixNino={() => setShowMissingNinoModal(true)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-[32px]">
                  <VerifiedNotification />
                  <VerificationTable />
                </div>
              )
            )}

            {showMissingDobModal && (
              <MissingDobModal taxWeekLabel={taxWeek} onClose={() => setShowMissingDobModal(false)} />
            )}
            {showMissingSurnamesModal && (
              <MissingSurnamesModal taxWeekLabel={taxWeek} onClose={() => setShowMissingSurnamesModal(false)} />
            )}
            {showMissingNinoModal && (
              <MissingNinoModal taxWeekLabel={taxWeek} onClose={() => setShowMissingNinoModal(false)} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
