import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, InputHTMLAttributes, SVGProps, TextareaHTMLAttributes, ElementType } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'emphasis' | 'danger';
type ButtonSize = 'large' | 'medium' | 'small';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    iconOnly?: boolean;
    loading?: boolean;
    children?: ReactNode;
}
declare function Button({ variant, size, iconLeft, iconRight, iconOnly, loading, disabled, children, className, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

type HelperTextType = 'default' | 'error' | 'success' | 'warning';
interface HelperTextProps {
    type?: HelperTextType;
    children: ReactNode;
    className?: string;
}
declare function HelperText({ type, children, className }: HelperTextProps): react_jsx_runtime.JSX.Element;

type TextFieldSize = 'large' | 'medium';
interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    prefix?: string;
    suffix?: string;
    suffixIcon?: ReactNode;
    size?: TextFieldSize;
    onClear?: () => void;
}
declare const TextField: react.ForwardRefExoticComponent<TextFieldProps & react.RefAttributes<HTMLInputElement>>;

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}
declare const defaultIconProps: IconProps;
declare function createIcon(path: React.ReactNode, displayName: string): {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const ArrowUp: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ArrowDown: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ArrowLeft: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ArrowRight: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ArrowUpRight: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ChevronUp: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ChevronDown: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ChevronLeft: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const ChevronRight: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const CaretUp: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const CaretDown: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const CaretLeft: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const CaretRight: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const Add: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const AddSquare: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Bank: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Calendar: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Check: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const CheckCircle: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Clock: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Close: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Delete: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Download: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Edit: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Flag: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const File: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Filter: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Globe: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Home: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Help: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Info: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Lock: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Mail: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Menu: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Pin: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Search: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Settings: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Star: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Upload: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const User: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Users: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Wallet: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Warning: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const ErrorFilled: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const InfoFilled: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const SuccessFilled: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const WarningFilled: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const CloseFilled: {
    ({ size, color, ...props }: IconProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    onClear?: () => void;
    className?: string;
}
declare const SearchField: react.ForwardRefExoticComponent<SearchFieldProps & react.RefAttributes<HTMLInputElement>>;

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'readOnly'> {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    maxLength?: number;
    readOnly?: boolean;
    className?: string;
}
declare const TextArea: react.ForwardRefExoticComponent<TextAreaProps & react.RefAttributes<HTMLTextAreaElement>>;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: ReactNode;
    indeterminate?: boolean;
    error?: boolean;
}
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLInputElement>>;

type TabsSize = 'medium' | 'small';
interface TabItem {
    id: string;
    label: string;
    badge?: ReactNode;
    disabled?: boolean;
}
interface TabsProps {
    items: TabItem[];
    value: string;
    onChange: (id: string) => void;
    size?: TabsSize;
    /** If true, the tabs take up full width and distribute space evenly */
    fullWidth?: boolean;
    className?: string;
}
declare function Tabs({ items, value, onChange, size, fullWidth, className, }: TabsProps): react_jsx_runtime.JSX.Element;

declare function FigmaTabs(): react_jsx_runtime.JSX.Element;

declare const textStyles: {
    readonly headingXl: "text-heading-xl";
    readonly headingLg: "text-heading-lg";
    readonly headingMd: "text-heading-md";
    readonly headingSm: "text-heading-sm";
    readonly bodySemibold: "text-body-semibold";
    readonly bodyMedium: "text-body-medium";
    readonly bodyRegular: "text-body-regular";
    readonly compactSemibold: "text-compact-semibold";
    readonly compactMedium: "text-compact-medium";
    readonly smallSemibold: "text-small-semibold";
};
type TextStyle = keyof typeof textStyles;

type TextVariant = TextStyle;
interface TextProps {
    variant: TextVariant;
    as?: ElementType;
    children: ReactNode;
    className?: string;
}
declare function Text({ variant, as, children, className }: TextProps): react_jsx_runtime.JSX.Element;
declare function HeadingXL({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function HeadingLG({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function HeadingMD({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function HeadingSM({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function BodySemibold({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function BodyMedium({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function Body({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function CompactSemibold({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function CompactMedium({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;
declare function SmallSemibold({ children, className, as }: Omit<TextProps, 'variant'>): react_jsx_runtime.JSX.Element;

type PinCodeSize = 'large' | 'medium';
interface PinCodeFieldProps {
    length?: 4 | 6;
    size?: PinCodeSize;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    helperText?: string;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
}
declare function PinCodeField({ length, size, value, onChange, errorMessage, helperText, disabled, readOnly, className, }: PinCodeFieldProps): react_jsx_runtime.JSX.Element;

interface MobileNumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    label?: string;
    dialCode?: string;
    helperText?: string;
    errorMessage?: string;
}
declare const MobileNumberField: react.ForwardRefExoticComponent<MobileNumberFieldProps & react.RefAttributes<HTMLInputElement>>;

interface DateOfBirthValue {
    day: string;
    month: string;
    year: string;
}
interface DateOfBirthFieldProps {
    label?: string;
    value: DateOfBirthValue;
    onChange: (value: DateOfBirthValue) => void;
    errorMessage?: string;
    helperText?: string;
    disabled?: boolean;
    className?: string;
}
declare function DateOfBirthField({ label, value, onChange, errorMessage, helperText, disabled, className, }: DateOfBirthFieldProps): react_jsx_runtime.JSX.Element;

export { Add, AddSquare, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Bank, Body, BodyMedium, BodySemibold, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Calendar, CaretDown, CaretLeft, CaretRight, CaretUp, Check, CheckCircle, Checkbox, type CheckboxProps, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Close, CloseFilled, CompactMedium, CompactSemibold, DateOfBirthField, type DateOfBirthFieldProps, type DateOfBirthValue, Delete, Download, Edit, ErrorFilled, FigmaTabs, File, Filter, Flag, Globe, HeadingLG, HeadingMD, HeadingSM, HeadingXL, Help, HelperText, type HelperTextProps, type HelperTextType, Home, type IconProps, Info, InfoFilled, Lock, Mail, Menu, MobileNumberField, type MobileNumberFieldProps, Pin, PinCodeField, type PinCodeFieldProps, type PinCodeSize, Search, SearchField, type SearchFieldProps, Settings, SmallSemibold, Star, SuccessFilled, type TabItem, Tabs, type TabsProps, type TabsSize, Text, TextArea, type TextAreaProps, TextField, type TextFieldProps, type TextFieldSize, Upload, User, Users, Wallet, Warning, WarningFilled, createIcon, defaultIconProps };
