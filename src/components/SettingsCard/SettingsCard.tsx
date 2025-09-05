import React, { useState } from 'react';
import styles from './SettingsCard.module.css';

const SettingsCard: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const sections = [
        { title: 'Brand Overview', content: 'This section contains the brand overview details.' },
        { title: 'Mission & Vision', content: 'This section contains the mission and vision of the brand.' },
        { title: 'Target Audience', content: 'This section describes the target audience for the brand.' },
        { title: 'Tone of Voice & Writing Style', content: 'This section explains the tone of voice and writing style.' },
        { title: 'Brand Values & Key Messaging', content: 'This section highlights the brand values and key messaging.' },
        { title: 'Content Goals', content: 'This section outlines the content goals for the brand.' },
        { title: 'Product/Service List', content: 'This section lists the products and services offered by the brand.' },
        { title: 'Competitor/Industry References (optional)', content: 'This section provides competitor or industry references.' },
        { title: 'Do’s & Don’ts', content: 'This section lists the do’s and don’ts for the brand.' },
        { title: 'Visual / Formatting Guidelines', content: 'This section provides visual and formatting guidelines.' },
    ];

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Settings</h2>
            <div className={styles.sections}>
                {sections.map((section, index) => (
                    <div key={index} className={styles.section}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection(section.title)}
                        >
                            {section.title}
                            <span className={styles.toggleIcon}>
                                {activeSection === section.title ? '-' : '+'}
                            </span>
                        </div>
                        {activeSection === section.title && (
                            <div className={styles.sectionContent}>
                                {section.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsCard;