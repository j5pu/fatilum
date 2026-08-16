import { Metadata } from 'next'
import { getEnhancedMetadata } from '../layout-metadata'
import { getIntl } from '@/lib/intl'
import { getHost } from '@/lib/host'

export async function generateMetadata(): Promise<Metadata> {
  const intl = await getIntl('en')
  const info = await getHost()
  const meta = await getEnhancedMetadata('en', info, intl)
  
  return {
    ...meta,
    title: 'Privacy Policy',
    description: 'Privacy Policy for fatilum OÜ - Information on data collection and usage',
  }
}

export default async function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy explains how fatilum OÜ handles your personal data. We are committed to protecting your privacy and ensuring transparency in our data practices.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">2. Data Collection</h2>
          <p>
            We collect minimal data necessary to provide our services:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Information you voluntarily provide (e.g., through contact forms)</li>
            <li>Server access logs for security and system administration</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
          <p>
            <strong>No cookies are collected</strong> on this website. We do not use cookies, tracking pixels, or similar technologies to store information on your device.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">4. Data Usage</h2>
          <p>
            We use collected data only for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Responding to your inquiries</li>
            <li>Improving our services</li>
            <li>Ensuring system security and performance</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
          <p>
            Under GDPR and Estonian data protection law, you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to certain processing</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at <a href="mailto:jose@mnopi.com" className="text-blue-600 hover:underline">jose@mnopi.com</a>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">6. Contact Information</h2>
          <p>
            <strong>fatilum OÜ</strong><br />
            Registry Code: 14249878<br />
            VAT Number: EE102888722<br />
            Address: Harju maakond, Tallinn, Kesklinna linnaosa, Ahtri tn 12, 10151<br />
            <br />
            Email: <a href="mailto:jose@mnopi.com" className="text-blue-600 hover:underline">jose@mnopi.com</a>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. The most current version will be available on this page.
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>
    </main>
  )
}
