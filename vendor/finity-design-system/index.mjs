"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/button/Button.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var sizeStyles = {
  large: "h-[var(--spacing-48)] px-[var(--spacing-16)] text-base gap-[var(--spacing-8)]",
  medium: "h-[var(--spacing-40)] px-[var(--spacing-12)] text-sm gap-[var(--spacing-8)]",
  small: "h-[var(--spacing-32)] px-[var(--spacing-8)] text-sm gap-[var(--spacing-4)]"
};
var iconOnlySizeStyles = {
  large: "h-[var(--spacing-48)] w-[var(--spacing-48)]",
  medium: "h-[var(--spacing-40)] w-[var(--spacing-40)]",
  small: "h-[var(--spacing-32)] w-[var(--spacing-32)]"
};
var variantStyles = {
  primary: `
    bg-[var(--color-grey-900)] text-[var(--color-base-white)]
    hover:bg-[var(--color-grey-800)]
    active:bg-[var(--color-base-black)]
    focus-visible:ring-2 focus-visible:ring-[var(--color-grey-900)] focus-visible:ring-offset-2
  `,
  secondary: `
    bg-[var(--color-base-white)] text-[var(--color-grey-900)] border border-[var(--color-grey-300)]
    hover:bg-[var(--color-grey-50)] hover:border-[var(--color-grey-400)]
    active:bg-[var(--color-grey-100)]
    focus-visible:ring-2 focus-visible:ring-[var(--color-grey-400)] focus-visible:ring-offset-2
  `,
  tertiary: `
    bg-transparent text-[var(--color-grey-900)]
    hover:bg-[var(--color-grey-100)]
    active:bg-[var(--color-grey-200)]
    focus-visible:ring-2 focus-visible:ring-[var(--color-grey-400)] focus-visible:ring-offset-2
  `,
  emphasis: `
    bg-[var(--color-coral-500)] text-[var(--color-base-white)]
    hover:bg-[var(--color-coral-600)]
    active:bg-[var(--color-coral-700)]
    focus-visible:ring-2 focus-visible:ring-[var(--color-coral-500)] focus-visible:ring-offset-2
  `,
  danger: `
    bg-[var(--color-red-500)] text-[var(--color-base-white)]
    hover:bg-[var(--color-red-600)]
    active:bg-[var(--color-red-700)]
    focus-visible:ring-2 focus-visible:ring-[var(--color-red-500)] focus-visible:ring-offset-2
  `
};
var disabledStyles = `
  bg-[var(--color-grey-200)] text-[var(--color-grey-400)]
  cursor-not-allowed border-transparent
`;
function LoadingSpinner({ size }) {
  const spinnerSize = size === "small" ? 14 : size === "medium" ? 16 : 18;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "animate-spin",
      width: spinnerSize,
      height: spinnerSize,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  );
}
function Button(_a) {
  var _b = _a, {
    variant = "primary",
    size = "medium",
    iconLeft,
    iconRight,
    iconOnly = false,
    loading = false,
    disabled = false,
    children,
    className = ""
  } = _b, props = __objRest(_b, [
    "variant",
    "size",
    "iconLeft",
    "iconRight",
    "iconOnly",
    "loading",
    "disabled",
    "children",
    "className"
  ]);
  const isDisabled = disabled || loading;
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-colors duration-150
    focus:outline-none
    whitespace-nowrap
  `;
  const sizeStyle = iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size];
  const variantStyle = isDisabled ? disabledStyles : variantStyles[variant];
  return /* @__PURE__ */ jsx(
    "button",
    __spreadProps(__spreadValues({
      className: `${baseStyles} ${sizeStyle} ${variantStyle} ${className}`.replace(/\s+/g, " ").trim(),
      disabled: isDisabled
    }, props), {
      children: loading ? /* @__PURE__ */ jsx(LoadingSpinner, { size }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        iconLeft && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: iconLeft }),
        iconOnly ? /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children }) : children && /* @__PURE__ */ jsx("span", { children }),
        iconRight && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: iconRight })
      ] })
    })
  );
}

// src/components/icons/Icon.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var defaultIconProps = {
  size: 24,
  color: "currentColor"
};
function createIcon(path, displayName) {
  const Icon = (_a) => {
    var _b = _a, {
      size = defaultIconProps.size,
      color = defaultIconProps.color
    } = _b, props = __objRest(_b, [
      "size",
      "color"
    ]);
    return /* @__PURE__ */ jsx2(
      "svg",
      __spreadProps(__spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, props), {
        children: path
      })
    );
  };
  Icon.displayName = displayName;
  return Icon;
}

// src/components/icons/arrows.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ArrowUp = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M12 19V5M5 12l7-7 7 7" }),
  "ArrowUp"
);
var ArrowDown = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M12 5v14M5 12l7 7 7-7" }),
  "ArrowDown"
);
var ArrowLeft = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M19 12H5M12 5l-7 7 7 7" }),
  "ArrowLeft"
);
var ArrowRight = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M5 12h14M12 5l7 7-7 7" }),
  "ArrowRight"
);
var ArrowUpRight = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M7 17L17 7M7 7h10v10" }),
  "ArrowUpRight"
);
var ChevronUp = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M18 15l-6-6-6 6" }),
  "ChevronUp"
);
var ChevronDown = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M6 9l6 6 6-6" }),
  "ChevronDown"
);
var ChevronLeft = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M15 18l-6-6 6-6" }),
  "ChevronLeft"
);
var ChevronRight = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M9 18l6-6-6-6" }),
  "ChevronRight"
);
var CaretUp = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M12 8l-6 6h12l-6-6z", fill: "currentColor", stroke: "none" }),
  "CaretUp"
);
var CaretDown = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M12 16l-6-6h12l-6 6z", fill: "currentColor", stroke: "none" }),
  "CaretDown"
);
var CaretLeft = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M8 12l6-6v12l-6-6z", fill: "currentColor", stroke: "none" }),
  "CaretLeft"
);
var CaretRight = createIcon(
  /* @__PURE__ */ jsx3("path", { d: "M16 12l-6-6v12l6-6z", fill: "currentColor", stroke: "none" }),
  "CaretRight"
);

// src/components/icons/general.tsx
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var Add = createIcon(
  /* @__PURE__ */ jsx4("path", { d: "M12 5v14M5 12h14" }),
  "Add"
);
var AddSquare = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
    /* @__PURE__ */ jsx4("path", { d: "M12 8v8M8 12h8" })
  ] }),
  "AddSquare"
);
var Bank = createIcon(
  /* @__PURE__ */ jsx4(Fragment2, { children: /* @__PURE__ */ jsx4("path", { d: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" }) }),
  "Bank"
);
var Calendar = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }),
    /* @__PURE__ */ jsx4("path", { d: "M16 2v4M8 2v4M3 10h18" })
  ] }),
  "Calendar"
);
var Check = createIcon(
  /* @__PURE__ */ jsx4("path", { d: "M20 6L9 17l-5-5" }),
  "Check"
);
var CheckCircle = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx4("path", { d: "M9 12l2 2 4-4" })
  ] }),
  "CheckCircle"
);
var Clock = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx4("path", { d: "M12 6v6l4 2" })
  ] }),
  "Clock"
);
var Close = createIcon(
  /* @__PURE__ */ jsx4("path", { d: "M18 6L6 18M6 6l12 12" }),
  "Close"
);
var Delete = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" }),
    /* @__PURE__ */ jsx4("path", { d: "M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" }),
    /* @__PURE__ */ jsx4("path", { d: "M10 11v6M14 11v6" })
  ] }),
  "Delete"
);
var Download = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
    /* @__PURE__ */ jsx4("path", { d: "M7 10l5 5 5-5M12 15V3" })
  ] }),
  "Download"
);
var Edit = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" }),
    /* @__PURE__ */ jsx4("path", { d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" })
  ] }),
  "Edit"
);
var Flag = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M5 3V21" }),
    /* @__PURE__ */ jsx4("path", { d: "M5 4H18L15 8.5L18 13H5" })
  ] }),
  "Flag"
);
var File = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
    /* @__PURE__ */ jsx4("path", { d: "M14 2v6h6M16 13H8M16 17H8M10 9H8" })
  ] }),
  "File"
);
var Filter = createIcon(
  /* @__PURE__ */ jsx4("path", { d: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z" }),
  "Filter"
);
var Globe = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx4("path", { d: "M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
  ] }),
  "Globe"
);
var Home = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" }),
    /* @__PURE__ */ jsx4("path", { d: "M9 22V12h6v10" })
  ] }),
  "Home"
);
var Help = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx4("path", { d: "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" })
  ] }),
  "Help"
);
var Info = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx4("path", { d: "M12 16v-4M12 8h.01" })
  ] }),
  "Info"
);
var Lock = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
    /* @__PURE__ */ jsx4("path", { d: "M7 11V7a5 5 0 0110 0v4" })
  ] }),
  "Lock"
);
var Mail = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
    /* @__PURE__ */ jsx4("path", { d: "M22 6l-10 7L2 6" })
  ] }),
  "Mail"
);
var Menu = createIcon(
  /* @__PURE__ */ jsx4("path", { d: "M3 12h18M3 6h18M3 18h18" }),
  "Menu"
);
var Pin = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" }),
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "10", r: "3" })
  ] }),
  "Pin"
);
var Search = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ jsx4("path", { d: "M21 21l-4.35-4.35" })
  ] }),
  "Search"
);
var Settings = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ jsx4("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })
  ] }),
  "Settings"
);
var Star = createIcon(
  /* @__PURE__ */ jsx4("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }),
  "Star"
);
var Upload = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
    /* @__PURE__ */ jsx4("path", { d: "M17 8l-5-5-5 5M12 3v12" })
  ] }),
  "Upload"
);
var User = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" }),
    /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "7", r: "4" })
  ] }),
  "User"
);
var Users = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }),
    /* @__PURE__ */ jsx4("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ jsx4("path", { d: "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" })
  ] }),
  "Users"
);
var Wallet = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5z" }),
    /* @__PURE__ */ jsx4("path", { d: "M16 12a2 2 0 100 4h5v-4h-5z" })
  ] }),
  "Wallet"
);
var Warning = createIcon(
  /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx4("path", { d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" }),
    /* @__PURE__ */ jsx4("path", { d: "M12 9v4M12 17h.01" })
  ] }),
  "Warning"
);

// src/components/icons/feedback.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var ErrorFilled = (_a) => {
  var _b = _a, {
    size = defaultIconProps.size,
    color = "var(--color-red-500)"
  } = _b, props = __objRest(_b, [
    "size",
    "color"
  ]);
  return /* @__PURE__ */ jsx5(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: color
    }, props), {
      children: /* @__PURE__ */ jsx5("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" })
    })
  );
};
ErrorFilled.displayName = "ErrorFilled";
var InfoFilled = (_a) => {
  var _b = _a, {
    size = defaultIconProps.size,
    color = "var(--color-teal-500)"
  } = _b, props = __objRest(_b, [
    "size",
    "color"
  ]);
  return /* @__PURE__ */ jsx5(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: color
    }, props), {
      children: /* @__PURE__ */ jsx5("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" })
    })
  );
};
InfoFilled.displayName = "InfoFilled";
var SuccessFilled = (_a) => {
  var _b = _a, {
    size = defaultIconProps.size,
    color = "var(--color-green-500)"
  } = _b, props = __objRest(_b, [
    "size",
    "color"
  ]);
  return /* @__PURE__ */ jsx5(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: color
    }, props), {
      children: /* @__PURE__ */ jsx5("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
    })
  );
};
SuccessFilled.displayName = "SuccessFilled";
var WarningFilled = (_a) => {
  var _b = _a, {
    size = defaultIconProps.size,
    color = "var(--color-yellow-500)"
  } = _b, props = __objRest(_b, [
    "size",
    "color"
  ]);
  return /* @__PURE__ */ jsx5(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: color
    }, props), {
      children: /* @__PURE__ */ jsx5("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" })
    })
  );
};
WarningFilled.displayName = "WarningFilled";
var CloseFilled = (_a) => {
  var _b = _a, {
    size = defaultIconProps.size,
    color = "var(--color-grey-500)"
  } = _b, props = __objRest(_b, [
    "size",
    "color"
  ]);
  return /* @__PURE__ */ jsx5(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: color
    }, props), {
      children: /* @__PURE__ */ jsx5("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })
    })
  );
};
CloseFilled.displayName = "CloseFilled";

// src/components/helper-text/HelperText.tsx
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var config = {
  default: {
    icon: /* @__PURE__ */ jsx6(InfoFilled, { size: 16, color: "var(--color-grey-600)" }),
    textClass: "text-[var(--color-grey-600)]"
  },
  error: {
    icon: /* @__PURE__ */ jsx6(ErrorFilled, { size: 16, color: "var(--color-red-600)" }),
    textClass: "text-[var(--color-red-600)]"
  },
  success: {
    icon: /* @__PURE__ */ jsx6(SuccessFilled, { size: 16, color: "var(--color-green-600)" }),
    textClass: "text-[var(--color-green-600)]"
  },
  warning: {
    icon: /* @__PURE__ */ jsx6(WarningFilled, { size: 16, color: "var(--color-yellow-600)" }),
    textClass: "text-[var(--color-yellow-600)]"
  }
};
function HelperText({ type = "default", children, className = "" }) {
  const { icon, textClass } = config[type];
  return /* @__PURE__ */ jsxs3("div", { className: `flex items-start gap-[var(--spacing-4)] ${className}`, children: [
    /* @__PURE__ */ jsx6("span", { className: "shrink-0 mt-[var(--spacing-2)]", children: icon }),
    /* @__PURE__ */ jsx6(
      "p",
      {
        className: `text-compact-medium ${textClass}`,
        children
      }
    )
  ] });
}

// src/components/text-field/TextField.tsx
import { forwardRef, useId } from "react";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var heights = {
  large: "h-[var(--spacing-48)]",
  medium: "h-[var(--spacing-40)]"
};
var TextField = forwardRef(function TextField2(_a, ref) {
  var _b = _a, {
    label,
    helperText,
    errorMessage,
    prefix,
    suffix,
    suffixIcon,
    size = "large",
    onClear,
    disabled = false,
    className = "",
    id,
    value
  } = _b, props = __objRest(_b, [
    "label",
    "helperText",
    "errorMessage",
    "prefix",
    "suffix",
    "suffixIcon",
    "size",
    "onClear",
    "disabled",
    "className",
    "id",
    "value"
  ]);
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasError = !!errorMessage;
  const hasClear = !!onClear && !!value;
  const hasSuffix = !!suffix || !!suffixIcon && !hasClear;
  const borderClass = hasError ? "border-[var(--color-red-600)]" : disabled ? "border-[var(--color-border-subtle)]" : "border-[var(--color-border-subtle)] focus-within:border-[var(--color-text-default)]";
  return /* @__PURE__ */ jsxs4("div", { className: `flex flex-col gap-[var(--spacing-8)] w-full ${className}`, children: [
    label && /* @__PURE__ */ jsx7(
      "label",
      {
        htmlFor: inputId,
        className: "text-body-medium text-[var(--color-text-secondary)]",
        children: label
      }
    ),
    /* @__PURE__ */ jsxs4(
      "div",
      {
        className: `
          flex items-center overflow-hidden rounded-lg border border-solid
          transition-colors duration-150
          ${heights[size]}
          ${borderClass}
          ${disabled ? "bg-[var(--color-grey-100)]" : "bg-[var(--color-base-white)]"}
        `,
        children: [
          prefix && /* @__PURE__ */ jsx7(
            "div",
            {
              className: `
              flex items-center justify-center shrink-0 h-full px-[var(--spacing-12)]
              bg-[var(--color-grey-100)] border-r border-[var(--color-border-subtle)]
              text-body-medium
              text-[var(--color-text-secondary)]
            `,
              children: prefix
            }
          ),
          /* @__PURE__ */ jsx7(
            "input",
            __spreadValues({
              ref,
              id: inputId,
              value,
              disabled,
              className: `
            flex-1 min-w-0 h-full bg-transparent outline-none px-[var(--spacing-12)]
            text-body-regular
            text-[var(--color-text-default)]
            placeholder:text-[var(--color-text-disabled)]
            disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)]
          `
            }, props)
          ),
          hasClear && /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              onClick: onClear,
              "aria-label": "Clear input",
              tabIndex: -1,
              className: `
              flex items-center justify-center shrink-0 h-full
              ${size === "large" ? "w-[var(--spacing-48)]" : "w-[var(--spacing-40)]"}
              text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]
              transition-colors duration-150
            `,
              children: /* @__PURE__ */ jsx7(Close, { size: 20 })
            }
          ),
          hasSuffix && /* @__PURE__ */ jsx7(
            "div",
            {
              className: `
              flex items-center justify-center shrink-0 h-full px-[var(--spacing-12)]
              border-l border-[var(--color-border-subtle)]
              text-body-medium
              text-[var(--color-text-secondary)]
            `,
              children: suffix || suffixIcon
            }
          )
        ]
      }
    ),
    (helperText || errorMessage) && /* @__PURE__ */ jsx7(HelperText, { type: hasError ? "error" : "default", children: errorMessage || helperText })
  ] });
});

// src/components/search-field/SearchField.tsx
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var SearchField = forwardRef2(
  function SearchField2(_a, ref) {
    var _b = _a, { onClear, value, className = "" } = _b, props = __objRest(_b, ["onClear", "value", "className"]);
    const hasValue = !!value;
    return /* @__PURE__ */ jsxs5(
      "div",
      {
        className: `
          flex items-center
          h-[var(--spacing-40)] rounded-lg border border-solid
          bg-[var(--color-bg-subtle)]
          border-[var(--color-border-default)]
          hover:border-2 hover:border-[var(--color-text-default)]
          focus-within:border-[3px] focus-within:border-[var(--color-text-default)]
          transition-colors duration-150
          ${className}
        `,
        children: [
          /* @__PURE__ */ jsx8("div", { className: "flex items-center justify-center shrink-0 w-[var(--spacing-48)] h-full", children: /* @__PURE__ */ jsx8(Search, { size: 20, color: "var(--color-text-tertiary)" }) }),
          /* @__PURE__ */ jsx8(
            "input",
            __spreadValues({
              ref,
              type: "text",
              value,
              className: "\n            flex-1 min-w-0 h-full bg-transparent outline-none\n            text-body-regular\n            text-[var(--color-text-default)]\n            placeholder:text-[var(--color-text-tertiary)]\n          "
            }, props)
          ),
          hasValue && onClear && /* @__PURE__ */ jsx8(
            "button",
            {
              type: "button",
              onClick: onClear,
              className: "flex items-center justify-center shrink-0 w-[var(--spacing-48)] h-full rounded-full",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsx8(CloseFilled, { size: 16, color: "var(--color-text-tertiary)" })
            }
          )
        ]
      }
    );
  }
);

// src/components/text-area/TextArea.tsx
import { forwardRef as forwardRef3 } from "react";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var TextArea = forwardRef3(
  function TextArea2(_a, ref) {
    var _b = _a, {
      label,
      helperText,
      errorMessage,
      maxLength,
      readOnly = false,
      disabled = false,
      value,
      className = ""
    } = _b, props = __objRest(_b, [
      "label",
      "helperText",
      "errorMessage",
      "maxLength",
      "readOnly",
      "disabled",
      "value",
      "className"
    ]);
    const hasError = !!errorMessage;
    const charCount = typeof value === "string" ? value.length : 0;
    const textareaClass = [
      "w-full min-h-[80px] rounded-lg border border-solid outline-none resize-y",
      "px-[var(--spacing-12)] pt-[var(--spacing-8)] pb-[var(--spacing-8)]",
      "text-body-regular",
      "placeholder:text-[var(--color-text-tertiary)]",
      "transition-colors duration-150",
      hasError ? "border-2 border-[var(--color-red-600)] bg-[var(--color-base-white)] text-[var(--color-text-default)]" : readOnly || disabled ? "border border-[var(--color-border-subtle)] bg-[var(--color-grey-100)] text-[var(--color-text-secondary)] resize-none cursor-default" : [
        "border-[var(--color-border-default)] bg-[var(--color-base-white)] text-[var(--color-text-default)]",
        "hover:border-2 hover:border-[var(--color-text-default)]",
        "focus:border-[3px] focus:border-[var(--color-text-default)]"
      ].join(" ")
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxs6("div", { className: `flex flex-col gap-[var(--spacing-4)] ${className}`, children: [
      (label || maxLength) && /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between gap-[var(--spacing-4)]", children: [
        label && /* @__PURE__ */ jsx9("label", { className: "text-body-medium text-[var(--color-text-secondary)]", children: label }),
        maxLength && /* @__PURE__ */ jsxs6("span", { className: "text-compact-medium text-[var(--color-text-secondary)] tabular-nums", children: [
          charCount,
          "/",
          maxLength
        ] })
      ] }),
      /* @__PURE__ */ jsx9(
        "textarea",
        __spreadValues({
          ref,
          value,
          maxLength,
          readOnly,
          disabled,
          className: textareaClass
        }, props)
      ),
      (helperText || errorMessage) && /* @__PURE__ */ jsx9(HelperText, { type: hasError ? "error" : "default", children: errorMessage || helperText })
    ] });
  }
);

// src/components/checkbox/Checkbox.tsx
import { forwardRef as forwardRef4, useEffect, useRef, useState } from "react";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var Checkbox = forwardRef4(
  function Checkbox2(_a, forwardedRef) {
    var _b = _a, {
      label,
      indeterminate = false,
      error = false,
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      className = ""
    } = _b, props = __objRest(_b, [
      "label",
      "indeterminate",
      "error",
      "disabled",
      "checked",
      "defaultChecked",
      "onChange",
      "className"
    ]);
    const isControlled = checked !== void 0;
    const [localChecked, setLocalChecked] = useState(defaultChecked != null ? defaultChecked : false);
    const isChecked = isControlled ? !!checked : localChecked;
    const isActive = indeterminate || isChecked;
    const innerRef = useRef(null);
    const setRefs = (el) => {
      innerRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    };
    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    const handleChange = (e) => {
      if (!isControlled) setLocalChecked(e.target.checked);
      onChange == null ? void 0 : onChange(e);
    };
    const boxClass = [
      "relative shrink-0 size-[20px] rounded-[4px] border border-solid",
      "flex items-center justify-center",
      "transition-colors duration-100",
      // Focus ring (shown via peer when input is focused by keyboard)
      "peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-[var(--color-text-default)] peer-focus-visible:rounded-[6px]",
      disabled ? "bg-[var(--color-grey-200)] border-[var(--color-border-default)]" : isActive ? "bg-[var(--color-coral-400)] border-[var(--color-coral-400)]" : error ? "bg-[var(--color-base-white)] border-2 border-[var(--color-red-600)]" : "bg-[var(--color-base-white)] border-[var(--color-border-default)] group-hover:border-2 group-hover:border-[var(--color-text-default)]"
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxs7(
      "label",
      {
        className: `group inline-flex gap-[var(--spacing-8)] items-start ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`,
        children: [
          /* @__PURE__ */ jsx10(
            "input",
            __spreadValues({
              ref: setRefs,
              type: "checkbox",
              checked: isControlled ? checked : void 0,
              defaultChecked: !isControlled ? defaultChecked : void 0,
              disabled,
              onChange: handleChange,
              className: "peer sr-only"
            }, props)
          ),
          /* @__PURE__ */ jsxs7("div", { className: boxClass, children: [
            isChecked && !indeterminate && /* @__PURE__ */ jsx10("svg", { viewBox: "0 0 12 12", width: "12", height: "12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx10(
              "path",
              {
                d: "M1.5 6L4.5 9L10.5 3",
                stroke: "var(--color-base-white)",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) }),
            indeterminate && /* @__PURE__ */ jsx10("svg", { viewBox: "0 0 12 12", width: "12", height: "12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx10("path", { d: "M1.5 6H10.5", stroke: "var(--color-base-white)", strokeWidth: "2.5", strokeLinecap: "round" }) })
          ] }),
          label && /* @__PURE__ */ jsx10(
            "span",
            {
              className: `flex-1 text-body-regular mt-[1px] ${disabled ? "text-[var(--color-text-tertiary)]" : "text-[var(--color-text-default)]"}`,
              children: label
            }
          )
        ]
      }
    );
  }
);

// src/components/tabs/Tabs.tsx
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
function Tabs({
  items,
  value,
  onChange,
  size = "medium",
  fullWidth = false,
  className = ""
}) {
  const baseTabClasses = `
    relative inline-flex items-center justify-center
    text-compact-medium
    border-b-2
    transition-colors
    whitespace-nowrap
  `;
  const sizeClasses = {
    medium: "py-[var(--spacing-16)] px-[var(--spacing-16)] gap-[var(--spacing-8)]",
    small: "py-[var(--spacing-8)] px-[var(--spacing-16)] gap-[var(--spacing-4)]"
  };
  return /* @__PURE__ */ jsx11(
    "div",
    {
      className: `
        border-b border-[var(--color-border-subtle)]
        ${fullWidth ? "w-full" : "inline-grid"}
        ${className}
      `.replace(/\s+/g, " ").trim(),
      style: !fullWidth ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : void 0,
      children: items.map((item) => {
        const isSelected = item.id === value;
        const isDisabled = item.disabled;
        const colorClasses = isDisabled ? "text-[var(--color-text-disabled)] border-transparent cursor-not-allowed" : isSelected ? "text-[var(--color-coral-500)] border-[var(--color-coral-500)]" : "text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-default)]";
        return /* @__PURE__ */ jsxs8(
          "button",
          {
            type: "button",
            className: `
              ${baseTabClasses}
              ${sizeClasses[size]}
              ${colorClasses}
              ${fullWidth ? "flex-1" : ""}
            `.replace(/\s+/g, " ").trim(),
            onClick: () => {
              if (!isDisabled) onChange(item.id);
            },
            "aria-selected": isSelected,
            role: "tab",
            disabled: isDisabled,
            children: [
              /* @__PURE__ */ jsx11("span", { className: "text-compact-semibold", children: item.label }),
              item.badge && /* @__PURE__ */ jsx11("span", { className: "inline-flex items-center justify-center rounded-full px-[var(--spacing-4)] py-[var(--spacing-2)] text-small-semibold bg-[var(--color-grey-100)] text-[var(--color-text-secondary)]", children: item.badge })
            ]
          },
          item.id
        );
      })
    }
  );
}

// src/components/tabs/FigmaTabs.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var tabs = [
  "Overview",
  "Employees",
  "Payroll",
  "Settings"
];
function FigmaTabs() {
  const active = "Overview";
  return /* @__PURE__ */ jsx12("div", { className: "inline-flex border-b border-[var(--color-border-subtle)] gap-6", children: tabs.map((label) => {
    const isActive = label === active;
    return /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        className: [
          "inline-flex items-center justify-center",
          "h-10 rounded-none",
          // Padding tuned to create clear breathing room around the text
          "px-6",
          // 24px
          "text-compact-medium",
          isActive ? "text-[var(--color-coral-500)] border-b-2 border-[var(--color-coral-500)]" : "text-[var(--color-text-secondary)] border-b-2 border-transparent hover:text-[var(--color-text-default)]"
        ].join(" "),
        children: /* @__PURE__ */ jsx12("span", { className: "text-compact-semibold", children: label })
      },
      label
    );
  }) });
}

// src/tokens/typography.ts
var textStyles = {
  headingXl: "text-heading-xl",
  headingLg: "text-heading-lg",
  headingMd: "text-heading-md",
  headingSm: "text-heading-sm",
  bodySemibold: "text-body-semibold",
  bodyMedium: "text-body-medium",
  bodyRegular: "text-body-regular",
  compactSemibold: "text-compact-semibold",
  compactMedium: "text-compact-medium",
  smallSemibold: "text-small-semibold"
};

// src/components/typography/Text.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var defaultElements = {
  headingXl: "h1",
  headingLg: "h2",
  headingMd: "h3",
  headingSm: "h4",
  bodySemibold: "p",
  bodyMedium: "p",
  bodyRegular: "p",
  compactSemibold: "span",
  compactMedium: "span",
  smallSemibold: "span"
};
function Text({ variant, as, children, className = "" }) {
  const Component = as || defaultElements[variant];
  const baseClass = textStyles[variant];
  return /* @__PURE__ */ jsx13(Component, { className: `${baseClass} ${className}`.trim(), children });
}
function HeadingXL({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "headingXl", as, className, children });
}
function HeadingLG({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "headingLg", as, className, children });
}
function HeadingMD({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "headingMd", as, className, children });
}
function HeadingSM({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "headingSm", as, className, children });
}
function BodySemibold({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "bodySemibold", as, className, children });
}
function BodyMedium({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "bodyMedium", as, className, children });
}
function Body({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "bodyRegular", as, className, children });
}
function CompactSemibold({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "compactSemibold", as, className, children });
}
function CompactMedium({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "compactMedium", as, className, children });
}
function SmallSemibold({ children, className, as }) {
  return /* @__PURE__ */ jsx13(Text, { variant: "smallSemibold", as, className, children });
}

// src/components/pin-code-field/PinCodeField.tsx
import { useRef as useRef2 } from "react";
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
function PinCodeField({
  length = 6,
  size = "large",
  value,
  onChange,
  errorMessage,
  helperText,
  disabled = false,
  readOnly = false,
  className = ""
}) {
  const inputRefs = useRef2([]);
  const hasError = !!errorMessage;
  const digits = Array.from({ length }, (_, i) => value[i] || "");
  const slotDimension = size === "large" ? "w-[56px] h-[56px]" : "w-[48px] h-[48px]";
  const getSlotClass = () => {
    if (hasError) {
      return `${slotDimension} rounded-lg border-2 border-solid border-[var(--color-red-600)] bg-[var(--color-base-white)]`;
    }
    if (disabled || readOnly) {
      return `${slotDimension} rounded-lg border border-solid border-[var(--color-border-subtle)] bg-[var(--color-grey-100)]`;
    }
    return `${slotDimension} rounded-lg border border-solid border-[var(--color-border-default)] bg-[var(--color-base-white)] focus:border-[3px] focus:border-[var(--color-text-default)] outline-none`;
  };
  const handleChange = (index, e) => {
    var _a;
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    onChange(newDigits.join(""));
    if (char && index < length - 1) {
      (_a = inputRefs.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    var _a;
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const newDigits = [...digits];
      newDigits[index - 1] = "";
      onChange(newDigits.join(""));
      (_a = inputRefs.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  const handlePaste = (e) => {
    var _a;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    (_a = inputRefs.current[focusIndex]) == null ? void 0 : _a.focus();
  };
  const sharedInputClass = `
    ${getSlotClass()}
    flex items-center justify-center
    text-center font-semibold text-[20px] leading-[28px] tracking-[var(--letter-spacing-tight)]
    text-[var(--color-text-default)]
    transition-colors duration-150
    ${disabled || readOnly ? "cursor-not-allowed" : ""}
  `;
  const slots = digits.map((digit, i) => /* @__PURE__ */ jsx14(
    "input",
    {
      ref: (el) => {
        inputRefs.current[i] = el;
      },
      type: "text",
      inputMode: "numeric",
      maxLength: 1,
      value: digit,
      disabled,
      readOnly,
      className: sharedInputClass,
      onChange: (e) => handleChange(i, e),
      onKeyDown: (e) => handleKeyDown(i, e),
      onPaste: handlePaste
    },
    i
  ));
  const slotsWithDivider = length === 6 ? [
    ...slots.slice(0, 3),
    /* @__PURE__ */ jsx14(
      "div",
      {
        className: "w-[8px] h-0 border-t border-[var(--color-border-default)] self-center"
      },
      "divider"
    ),
    ...slots.slice(3)
  ] : slots;
  return /* @__PURE__ */ jsxs9("div", { className: `flex flex-col gap-[var(--spacing-4)] items-start ${className}`, children: [
    /* @__PURE__ */ jsx14("div", { className: "flex items-center gap-[var(--spacing-8)]", children: slotsWithDivider }),
    (helperText || errorMessage) && /* @__PURE__ */ jsx14(HelperText, { type: hasError ? "error" : "default", children: errorMessage || helperText })
  ] });
}

// src/components/mobile-number-field/MobileNumberField.tsx
import { forwardRef as forwardRef5 } from "react";
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
var MobileNumberField = forwardRef5(
  function MobileNumberField2(_a, ref) {
    var _b = _a, {
      label = "Mobile number",
      dialCode = "+44",
      helperText,
      errorMessage,
      disabled = false,
      className = ""
    } = _b, props = __objRest(_b, [
      "label",
      "dialCode",
      "helperText",
      "errorMessage",
      "disabled",
      "className"
    ]);
    const hasError = !!errorMessage;
    const borderClass = hasError ? "border-2 border-[var(--color-red-600)]" : disabled ? "border border-[var(--color-border-subtle)]" : "border border-[var(--color-border-default)] focus-within:border-[3px] focus-within:border-[var(--color-text-default)]";
    return /* @__PURE__ */ jsxs10("div", { className: `flex flex-col gap-[var(--spacing-8)] w-full ${className}`, children: [
      label && /* @__PURE__ */ jsx15("label", { className: "text-body-medium text-[var(--color-text-secondary)]", children: label }),
      /* @__PURE__ */ jsxs10(
        "div",
        {
          className: `
            flex items-center overflow-hidden rounded-lg border-solid
            h-[var(--spacing-48)]
            transition-colors duration-150
            ${borderClass}
            ${disabled ? "bg-[var(--color-grey-100)]" : "bg-[var(--color-base-white)]"}
          `,
          children: [
            /* @__PURE__ */ jsx15("div", { className: "flex items-center justify-center shrink-0 h-full px-[var(--spacing-12)] bg-[var(--color-grey-100)] border-r border-[var(--color-border-default)]", children: /* @__PURE__ */ jsx15("span", { className: "text-body-medium text-[var(--color-text-secondary)] w-[var(--spacing-32)] text-center", children: dialCode }) }),
            /* @__PURE__ */ jsx15(
              "input",
              __spreadValues({
                ref,
                type: "tel",
                inputMode: "numeric",
                disabled,
                className: `
              flex-1 min-w-0 h-full bg-transparent outline-none px-[var(--spacing-12)]
              text-body-regular
              text-[var(--color-text-default)]
              placeholder:text-[var(--color-text-disabled)]
              disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)]
            `
              }, props)
            )
          ]
        }
      ),
      (helperText || errorMessage) && /* @__PURE__ */ jsx15(HelperText, { type: hasError ? "error" : "default", children: errorMessage || helperText })
    ] });
  }
);

// src/components/date-of-birth-field/DateOfBirthField.tsx
import { useRef as useRef3 } from "react";
import { jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
function DateOfBirthField({
  label = "Date of birth",
  value,
  onChange,
  errorMessage,
  helperText,
  disabled = false,
  className = ""
}) {
  const monthRef = useRef3(null);
  const yearRef = useRef3(null);
  const hasError = !!errorMessage;
  const slotClass = hasError ? "border-2 border-[var(--color-red-600)] bg-[var(--color-base-white)]" : disabled ? "border border-[var(--color-border-subtle)] bg-[var(--color-grey-100)]" : "border border-[var(--color-border-default)] bg-[var(--color-base-white)] focus-within:border-2 focus-within:border-[var(--color-text-default)]";
  const inputClass = `
    w-full h-full bg-transparent outline-none px-[var(--spacing-12)]
    text-body-regular
    text-[var(--color-text-default)]
    placeholder:text-[var(--color-text-disabled)]
    disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)]
  `;
  return /* @__PURE__ */ jsxs11("div", { className: `flex flex-col gap-[var(--spacing-4)] ${className}`, children: [
    label && /* @__PURE__ */ jsx16("label", { className: "text-body-medium text-[var(--color-text-secondary)]", children: label }),
    /* @__PURE__ */ jsxs11("div", { className: "flex gap-[var(--spacing-8)] items-start", children: [
      /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-[var(--spacing-4)]", children: [
        /* @__PURE__ */ jsx16("span", { className: "text-compact-medium text-[var(--color-text-tertiary)]", children: "Day" }),
        /* @__PURE__ */ jsx16("div", { className: `flex items-center overflow-hidden rounded-lg border-solid h-[var(--spacing-48)] w-[64px] transition-colors duration-150 ${slotClass}`, children: /* @__PURE__ */ jsx16(
          "input",
          {
            type: "text",
            inputMode: "numeric",
            maxLength: 2,
            placeholder: "dd",
            value: value.day,
            disabled,
            className: inputClass,
            onChange: (e) => {
              var _a;
              const v = e.target.value.replace(/\D/g, "");
              onChange(__spreadProps(__spreadValues({}, value), { day: v }));
              if (v.length === 2) (_a = monthRef.current) == null ? void 0 : _a.focus();
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-[var(--spacing-4)]", children: [
        /* @__PURE__ */ jsx16("span", { className: "text-compact-medium text-[var(--color-text-tertiary)]", children: "Month" }),
        /* @__PURE__ */ jsx16("div", { className: `flex items-center overflow-hidden rounded-lg border-solid h-[var(--spacing-48)] w-[64px] transition-colors duration-150 ${slotClass}`, children: /* @__PURE__ */ jsx16(
          "input",
          {
            ref: monthRef,
            type: "text",
            inputMode: "numeric",
            maxLength: 2,
            placeholder: "mm",
            value: value.month,
            disabled,
            className: inputClass,
            onChange: (e) => {
              var _a;
              const v = e.target.value.replace(/\D/g, "");
              onChange(__spreadProps(__spreadValues({}, value), { month: v }));
              if (v.length === 2) (_a = yearRef.current) == null ? void 0 : _a.focus();
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-[var(--spacing-4)]", children: [
        /* @__PURE__ */ jsx16("span", { className: "text-compact-medium text-[var(--color-text-tertiary)]", children: "Year" }),
        /* @__PURE__ */ jsx16("div", { className: `flex items-center overflow-hidden rounded-lg border-solid h-[var(--spacing-48)] w-[80px] transition-colors duration-150 ${slotClass}`, children: /* @__PURE__ */ jsx16(
          "input",
          {
            ref: yearRef,
            type: "text",
            inputMode: "numeric",
            maxLength: 4,
            placeholder: "yyyy",
            value: value.year,
            disabled,
            className: inputClass,
            onChange: (e) => {
              const v = e.target.value.replace(/\D/g, "");
              onChange(__spreadProps(__spreadValues({}, value), { year: v }));
            }
          }
        ) })
      ] })
    ] }),
    (helperText || errorMessage) && /* @__PURE__ */ jsx16(HelperText, { type: hasError ? "error" : "default", children: errorMessage || helperText })
  ] });
}
export {
  Add,
  AddSquare,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bank,
  Body,
  BodyMedium,
  BodySemibold,
  Button,
  Calendar,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check,
  CheckCircle,
  Checkbox,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Close,
  CloseFilled,
  CompactMedium,
  CompactSemibold,
  DateOfBirthField,
  Delete,
  Download,
  Edit,
  ErrorFilled,
  FigmaTabs,
  File,
  Filter,
  Flag,
  Globe,
  HeadingLG,
  HeadingMD,
  HeadingSM,
  HeadingXL,
  Help,
  HelperText,
  Home,
  Info,
  InfoFilled,
  Lock,
  Mail,
  Menu,
  MobileNumberField,
  Pin,
  PinCodeField,
  Search,
  SearchField,
  Settings,
  SmallSemibold,
  Star,
  SuccessFilled,
  Tabs,
  Text,
  TextArea,
  TextField,
  Upload,
  User,
  Users,
  Wallet,
  Warning,
  WarningFilled,
  createIcon,
  defaultIconProps
};
