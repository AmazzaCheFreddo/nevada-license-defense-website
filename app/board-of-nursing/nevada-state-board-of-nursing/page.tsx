import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'

export const metadata: Metadata = {
  title: 'Nevada State Board of Nursing Defense | Nevada License Defense',
  description: 'Experienced defense against Nevada State Board of Nursing (NSBN) complaints, investigations, and disciplinary actions. Attorney Craig K. Perry has handled hundreds of nursing license cases.',
  keywords: 'Nevada State Board of Nursing, NSBN defense, nursing license defense, nursing investigation, nursing disciplinary action, nurse attorney Nevada',
  openGraph: {
    title: 'Nevada State Board of Nursing Defense | Nevada License Defense',
    description: 'Experienced defense against NSBN complaints, investigations, and disciplinary actions. Free consultation available.',
    type: 'website',
    url: `${siteUrl}/board-of-nursing/nevada-state-board-of-nursing`,
    images: [{ url: `${siteUrl}/images/NEVADA LICENSE DEFENSE LOGO.png`, width: 1200, height: 630, alt: 'Nevada State Board of Nursing Defense' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevada State Board of Nursing Defense | Nevada License Defense',
    description: 'Experienced defense against NSBN complaints and disciplinary actions.',
  },
  alternates: {
    canonical: `${siteUrl}/board-of-nursing/nevada-state-board-of-nursing`,
  },
}

export default function NevadaStateBoardOfNursingPage() {
  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div>
          {/* Image at top - Seal/Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/nv_state_board_nursing.png"
              alt="Nevada State Board of Nursing"
              width={220}
              height={220}
              className="w-auto h-36 md:h-44 object-contain"
              quality={85}
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-8 text-center">
            Nevada State Board of Nursing
          </h1>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 mb-6">
              For 100 years, the Nevada State Board of Nursing (NSBN) has fulfilled its role 
              in regulating nursing to ensure safe practices and public safety.
            </p>
            
            <p className="text-lg text-gray-700 mb-8">
              The NSBN is responsible for regulating the activities of the more than 70,000 
              nurses statewide. When it comes to regulation and compliance, their duties include 
              the following:
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8 ml-4">
              <li>Investigating complaints against licensees and certificate holders alleging violations of the Nurse Practice Act. (See NAC 632.890 for a list of unprofessional conduct);</li>
              <li>Conducting disciplinary proceedings;</li>
              <li>Administering remediation and rehabilitation programs, including monitoring licensees and certificate holders on disciplinary probation; and</li>
              <li>Administering the Board&apos;s alternative program for nurses and CNAs recovering from substance use disorders.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/medium-shot-smiley-doctor-patient.jpg"
                alt="Professional nurse in blue scrubs"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Professional Nursing Care
                </h3>
                <p className="text-gray-700">
                  Nurses play a vital role in healthcare, providing compassionate care and ensuring patient safety.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/physician-writing-prescription-treatment-plan-help-with-recovery.jpg"
                alt="Nurse reviewing medical x-rays"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Medical Documentation
                </h3>
                <p className="text-gray-700">
                  Proper documentation and review of medical records is essential for maintaining professional standards.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/doctor_taking_blood_pressure_3.jpg"
                alt="Patient assessment"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Patient Assessment
                </h3>
                <p className="text-gray-700">
                  Accurate patient assessment and record-keeping are critical components of nursing practice.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/gynecologist-getting-ready-appointment.jpg"
                alt="Healthcare professional reviewing notes"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Compliance & Regulations
                </h3>
                <p className="text-gray-700">
                  Understanding and adhering to nursing regulations is crucial for maintaining your license.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/osteopathy-patient-getting-treatment-massage (1).jpg"
                alt="Nurse providing patient care"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Patient Care Excellence
                </h3>
                <p className="text-gray-700">
                  Providing quality patient care while maintaining professional standards is the foundation of nursing practice.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/nurses_consulting_together.jpg"
                alt="Healthcare professionals communicating"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  Professional Communication
                </h3>
                <p className="text-gray-700">
                  Effective communication with patients and colleagues is essential for professional nursing practice.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-light-gold/10 border-l-4 border-light-gold p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-dark-blue mb-4">
              You might be wondering when should you contact an attorney for help or advice...
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="tel:7028934777"
                className="btn-primary inline-flex items-center justify-center"
              >
                Tap to Call Us
              </a>
              <a
                href="mailto:info@craigperry.com"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Tap to Email Us
              </a>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-6">
              When Should I Contact You?
            </h2>
            
            <p className="text-lg text-gray-700 mb-8">
              The short answer is... <strong>the sooner the better!</strong> Why? Because you 
              will always have more options and sound advice the earlier you start the process. 
              Plus, the initial consultation is free and confidential, so what&apos;s the benefit 
              in waiting?
            </p>

            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;I think I&apos;m going to be reported for something I did at work.&rdquo;
                </h3>
                <p className="text-gray-700">
                  Let&apos;s talk about it. You can begin to plan on next steps, and work with 
                  the Board, from an attorney who has handled hundreds of cases and has likely 
                  dealt with cases very similar to yours. Such a call usually calms your fears 
                  and anxieties about losing your license.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;I was arrested for something (DUI or Domestic Violence, for example).&rdquo;
                </h3>
                <p className="text-gray-700">
                  We can give you sound advice. For example, did you know that arrests do not 
                  need to be reported to the Board? Find out when and what you must tell the 
                  Board after an arrest.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;My employer told me to self-report.&rdquo;
                </h3>
                <p className="text-gray-700">
                  This is a common suggestion that needs to be carefully discussed with an 
                  experienced attorney who has been asked this question in various situations 
                  dozens of times.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;My employer said they&apos;re going to contact the Board.&rdquo;
                </h3>
                <p className="text-gray-700">
                  This is an excellent time to contact legal counsel and find out how to proceed 
                  and what to expect once a complaint is filed against you.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;I received a Notice of Investigation from a Nursing Board Investigator.&rdquo;
                </h3>
                <p className="text-gray-700">
                  The notice of investigation (NOI) was sent out by an NSBN investigator. The 
                  clock is ticking as they expect an answer in 14 days. This is the most critical 
                  time when you need the advice of an attorney, it even suggests it in the letter 
                  you received.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;Someone called me from the Board and I don&apos;t know if I should talk to them or call back.&rdquo;
                </h3>
                <p className="text-gray-700">
                  Anything you say to the Board can and will be used against you if you 
                  self-incriminate. Sometimes the things you say orally are misheard or 
                  misunderstood by the person you&apos;re talking to. Consult with an experienced 
                  attorney first.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;Somebody reported me to the State Board of Nursing&rdquo;
                </h3>
                <p className="text-gray-700">
                  Find out if being reported will result in receiving an NOI and what you should 
                  do about it, and what the possible consequences could be, and how to face them.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;I quit my job rather than face termination.&rdquo;
                </h3>
                <p className="text-gray-700">
                  Many nurses who lose their jobs over an alleged act of unprofessional conduct 
                  face the prospect of finding a new job. Let us give you the best advice possible 
                  on how to proceed. If you are trying to decide whether to quit, go through the 
                  investigation process, or be terminated, we can help you decide how to handle it.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;I want to get my license back.&rdquo;
                </h3>
                <p className="text-gray-700">
                  If you have already lost your license through inactivity, voluntary surrender, 
                  or revocation, we can help you get it back. Let&apos;s talk about a plan.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;I am not comfortable with what my employer is asking me to do.&rdquo;
                </h3>
                <p className="text-gray-700">
                  Not all employers or supervisors are ethical. Don&apos;t let common, unprofessional 
                  practices at work let you put your guard down on how you should approach nursing. 
                  We can suggest ways to avoid these administrative traps.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;I was found guilty of a crime, how will it affect my license?&rdquo;
                </h3>
                <p className="text-gray-700">
                  Convictions for a crime must be handled properly. Remember, the Board must decide 
                  if you are safe to practice. There are several ways we can suggest you demonstrate 
                  to them that you can continue to be an upstanding nurse, even after a conviction.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3">
                  &ldquo;Fill in your questions here...&rdquo;
                </h3>
                <p className="text-gray-700">
                  We can&apos;t possibly list here all of the questions you may have that would prompt 
                  you to contact our office. We hope this list will give you some ideas and encourage 
                  you when to contact our office for that free consultation. Call{' '}
                  <a href="tel:7028934777" className="text-dark-gold hover:text-brown font-semibold">
                    (702) 893-4777
                  </a>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-blue text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help? Contact Us Today</h2>
            <p className="mb-6">Free consultations via Zoom. We&apos;re here to help protect your nursing license.</p>
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

