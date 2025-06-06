"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const countryCodes = [
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+233", country: "GH", flag: "🇬🇭" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
];

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const PhoneInput = React.forwardRef<HTMLDivElement, PhoneInputProps>(
  ({ value, onChange, placeholder = "Enter phone number", disabled, className }, ref) => {
    const [selectedCountry, setSelectedCountry] = React.useState(countryCodes[0]);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [showDropdown, setShowDropdown] = React.useState(false);

    React.useEffect(() => {
      // Parse existing value to set country code and phone number
      if (value && !phoneNumber) {
        const matchedCountry = countryCodes.find(country => 
          value.startsWith(country.code)
        );
        if (matchedCountry) {
          setSelectedCountry(matchedCountry);
          setPhoneNumber(value.substring(matchedCountry.code.length));
        } else {
          setPhoneNumber(value);
        }
      }
    }, [value, phoneNumber]);

    const handlePhoneChange = (phone: string) => {
      setPhoneNumber(phone);
      onChange(`${selectedCountry.code}${phone}`);
    };

    const handleCountrySelect = (country: typeof countryCodes[0]) => {
      setSelectedCountry(country);
      setShowDropdown(false);
      onChange(`${country.code}${phoneNumber}`);
    };

    return (
      <div className={cn("relative", className)} ref={ref}>
        <div className="flex h-12 w-full rounded-lg border border-gray-300 bg-white focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20">
          {/* Country Code Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={disabled}
              className="flex items-center gap-2 px-3 py-3 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-base">{selectedCountry.flag}</span>
              <span className="font-medium">{selectedCountry.code}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                {countryCodes.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    <span className="text-base">{country.flag}</span>
                    <span className="font-medium">{country.code}</span>
                    <span className="text-gray-600">{country.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 rounded-r-lg border-0 bg-transparent px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Backdrop for dropdown */}
        {showDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput }; 