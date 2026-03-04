import Image from 'next/image'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'

export const metadata: Metadata = {
  title: 'Nevada Board of Pharmacy Defense | Nevada License Defense',
  description: 'Defense against Nevada State Board of Pharmacy (BOP) investigations and disciplinary actions. We represent doctors, PAs, APRNs, and pharmacists facing pharmacy board complaints.',
  keywords: 'Nevada Board of Pharmacy, pharmacy license defense, BOP defense, APRN prescribing license, PMP report, pharmacy disciplinary action, med spa compliance',
  openGraph: {
    title: 'Nevada Board of Pharmacy Defense | Nevada License Defense',
    description: 'Defense against Nevada Board of Pharmacy investigations and disciplinary actions. Free consultation available.',
    type: 'website',
    url: `${siteUrl}/board-of-pharmacy`,
    images: [{ url: `${siteUrl}/images/NEVADA LICENSE DEFENSE LOGO.png`, width: 1200, height: 630, alt: 'Nevada Board of Pharmacy Defense' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevada Board of Pharmacy Defense | Nevada License Defense',
    description: 'Defense against Nevada Board of Pharmacy investigations and disciplinary actions.',
  },
  alternates: {
    canonical: `${siteUrl}/board-of-pharmacy`,
  },
}

export default function BoardOfPharmacyPage() {
  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div>
          {/* Image at top - Seal/Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/nvboardofpharmacy.avif"
              alt="Nevada Board of Pharmacy"
              width={220}
              height={220}
              className="w-auto h-36 md:h-44 object-contain"
              quality={85}
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-6 text-center">
            Nevada State Board of Pharmacy
          </h1>
          
          <div className="prose prose-lg max-w-none mb-12 text-center">
            <p className="text-lg text-gray-700 mb-6">
              The Nevada State Board of Pharmacy (BOP) has a duty to carry out and enforce the 
              provisions of Nevada law to protect the health, safety and welfare of the public.
            </p>
            
            <p className="text-lg text-gray-700 mb-8">
              The BOP directly affects Doctors, PAs, and APRNs, who administer medications in 
              Nevada. With increasing frequency, attorney Craig Perry represents clients who are 
              alleged to have violated laws enforced by the BOP. Recent examples of cases we have 
              handled include the following:
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8 text-left">
              <li>Failure to pull a PMP report (Prescription Monitoring Program) before prescribing or dispensing medications for each patient;</li>
              <li>Failure of APRNs to obtain licenses to prescribe and/or dispense medications, a Nevada requirement that differs from many other states;</li>
              <li>Signing off on billing under the name of another provider who did not see the patient;</li>
              <li>Med spas that buy or use expired or unlawful dangerous drugs not to be sold in the United States;</li>
              <li>Medical directors who fail to properly supervise a medical clinic they oversee, often owned by an unlicensed medical practitioner.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/female_doctor_reviewing_clipboard.jpg"
                alt="Nurse using digital tablet"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Failure to Pull PMP Report
                </h3>
                <p className="text-gray-700">
                  Creating a PMP Report and checking on patient&apos;s drug histories before prescribing is an essential duty.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/worried-tired-doctor-working-late-pressure-find-cure-illness.jpg"
                alt="Doctors working at table"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Failure to Apply for Prescribing
                </h3>
                <p className="text-gray-700">
                  Unlike other states, Nevada has strict requirements to apply for certification before prescribing. Go here.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/female-pharmacist-scanning-medicine-counter.jpg"
                alt="Doctor reading notes on clipboard"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Failure to Apply for Dispensing
                </h3>
                <p className="text-gray-700">
                  Unlike other states, Nevada has strict requirements to apply for certification before dispensing. Go here.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/pharmacy_old_fashioned_2.jpg"
                alt="Physician writing prescription"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Improperly Signing off on Billing
                </h3>
                <p className="text-gray-700">
                  Logging in or letting someone log in under your name to produce billing creates problems.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/beautiful-young-woman-getting-botox-cosmetic-injection-her-face.jpg"
                alt="Woman getting botox injection"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Using Unlawful Dangerous Drugs
                </h3>
                <p className="text-gray-700">
                  You cannot buy and use dangerous drugs in your med spa from unauthorized sources, even if they are available.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/freepik__pharmacist-looking-stressed-dim-fluorescent-pharma__94743.jpeg"
                alt="Pharmacy setting"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Medical Director Supervision
                </h3>
                <p className="text-gray-700">
                  Many medical professionals are duped into medical director positions without realizing the work required.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-blue text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help? Contact Us Today</h2>
            <p className="mb-6">Free consultations via Zoom. We&apos;re here to help protect your pharmacy license.</p>
            <a
              href="tel:7028934777"
              className="btn-gold inline-block"
            >
              Call 702.893.4777
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}





