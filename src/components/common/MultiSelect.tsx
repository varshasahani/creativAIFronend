import React, { useState, useRef, useEffect } from 'react';
import styles from './MultiSelect.module.css';

interface MultiSelectProps {
    label: string;
    options: string[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, selectedOptions, onChange, placeholder }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            onChange(selectedOptions.filter((o) => o !== option));
        } else {
            onChange([...selectedOptions, option]);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.multiSelect} ref={dropdownRef}>
            <label className={styles.label}>{label}</label>
            <input
                type="text"
                value={selectedOptions.join(', ')}
                readOnly
                className={styles.input}
                placeholder={placeholder || 'Select options'}
                onClick={toggleDropdown}
            />
            {dropdownOpen && (
                <div className={styles.dropdown}>
                    {options.map((option) => (
                        <div key={option} className={styles.dropdownItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => toggleOption(option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;