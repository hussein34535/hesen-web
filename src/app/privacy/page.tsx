'use client';

import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

export default function PrivacyPolicy() {
    return (
        <div className="app-container">
            <Header />
            <main className="page-content" style={{ padding: '24px', direction: 'ltr', textAlign: 'left' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Privacy Policy</h1>

                <section style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>7eSen TV Application</h2>
                    <p style={{ opacity: 0.7 }}>Last Updated: 2023-11-19</p>
                </section>

                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Introduction</h3>
                    <p>
                        7eSen TV ("the App") respects your privacy and is committed to protecting your personal information.
                        This Privacy Policy explains how we collect, use, and safeguard your information when you use our app.
                    </p>
                </section>

                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Information We Collect</h3>
                    <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                        7eSen TV does not collect any personally identifiable information (PII) such as name, email, or phone number.
                    </p>
                    <p>However, we may collect non-personal data automatically, such as:</p>
                    <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                        <li><b>Usage Data:</b> Information on how you use the app, such as pages visited, features used, and session duration.</li>
                        <li><b>Device Information:</b> Device type, OS, unique device ID (UDID), IP address.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Third-Party Services:</h3>
                    <p>
                        <b>Firebase:</b> We use Firebase services from Google to send important notifications to users.
                        Firebase may collect certain data for analytics and service improvement. You can review Firebase's privacy policy here:{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" style={{ color: '#2196F3', textDecoration: 'underline' }}>
                            https://policies.google.com/privacy
                        </a>
                    </p>
                </section>

                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>How We Use the Information</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li><b>App Improvement:</b> Enhancing user experience and developing new features.</li>
                        <li><b>Trend Analysis:</b> Understanding general usage patterns.</li>
                        <li><b>Push Notifications:</b> Sending important updates via Firebase.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Information Sharing</h3>
                    <p style={{ fontWeight: 'bold' }}>
                        We **do not share any personally identifiable information** as our app does not collect such data.
                    </p>
                    <p>Non-personal data may be shared with third-party services (e.g., Firebase) within the scope of their services.</p>
                </section>

                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Data Security</h3>
                    <p>
                        We take reasonable security measures to protect collected data. However, no security system is completely foolproof.
                    </p>
                </section>

                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Changes to This Policy</h3>
                    <p>
                        We may update this Privacy Policy periodically. Changes will be notified through the app or on this page.
                    </p>
                </section>

                <section style={{ marginBottom: '80px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Children’s Privacy</h3>
                    <p>
                        Our app is not intended for children under 13. If you believe a child has provided personal data, please contact us to remove it.
                    </p>
                </section>
            </main>
            <BottomNav />
        </div>
    );
}
