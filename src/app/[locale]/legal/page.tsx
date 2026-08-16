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
    title: 'Legal Notice',
    description: 'Legal Notice and company information for fatilum OÜ',
  }
}

export default async function LegalNotice() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Legal Notice</h1>
      
      <section className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-2xl font-bold mb-4">Company Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <div>
              <strong>Company Name:</strong> fatilum OÜ
            </div>
            <div>
              <strong>Registry Code (Registrikood):</strong> 14249878
            </div>
            <div>
              <strong>VAT Number (KMKR):</strong> EE102888722
            </div>
            <div>
              <strong>Address:</strong><br />
              Harju maakond,<br />
              Tallinn,<br />
              Kesklinna linnaosa,<br />
              Ahtri tn 12,<br />
              10151
            </div>
            <div>
              <strong>Email:</strong> <a href="mailto:jose@mnopi.com" className="text-blue-600 hover:underline">jose@mnopi.com</a>
            </div>
            <div>
              <strong>Country:</strong> Estonia
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Website Operator</h2>
          <p>
            This website is operated by fatilum OÜ, registered in Estonia.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
          <p>
            We comply with the General Data Protection Regulation (GDPR) and Estonian Personal Data Protection Act. For details, please refer to our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
          <p className="mt-4">
            <strong>No cookies are collected</strong> on this website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
          <p>
            While we strive to ensure accuracy of the information on this website, fatilum OÜ makes no warranties or representations regarding the content provided. We are not liable for any indirect, incidental, special, or consequential damages arising from your use of this website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of fatilum OÜ or its content suppliers and is protected by international copyright laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Modifications</h2>
          <p>
            fatilum OÜ reserves the right to modify this legal notice and the content of this website at any time without notice.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
          <p>
            This website and all legal notices are governed by the laws of Estonia.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Contact & Disputes</h2>
          <p>
            For any inquiries or disputes regarding this website or our services, please contact:
          </p>
          <div className="mt-4 bg-gray-50 p-6 rounded-lg">
            <p>
              <strong>Email:</strong> <a href="mailto:jose@mnopi.com" className="text-blue-600 hover:underline">jose@mnopi.com</a>
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>
    </main>
  )
}
