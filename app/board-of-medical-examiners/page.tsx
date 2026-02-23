'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function BoardOfMedicalExaminersPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div>
          {/* Image at top - Seal/Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/nvboardofmedicalexaminers.avif"
              alt="Nevada State Board of Medical Examiners"
              width={220}
              height={220}
              className="w-auto h-36 md:h-44 object-contain"
              quality={85}
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-8 text-center">
            Nevada State Board of Medical Examiners
          </h1>
          
          <div className="prose prose-lg max-w-none mb-12 text-center">
            <p className="text-lg text-gray-700 mb-8">
              Examples of actions that could subject a physician are set forth in NRS 630.301:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                <Image
                  src="/images/filler images/medical-specialist-using-computer-keyboard-night.jpg"
                  alt="Doctor reviewing documents"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: '50% 25%' }}
                  quality={85}
loading="lazy"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Disciplinary Action Taken by Other Jurisdiction
                  </h3>
                  <p className="text-gray-700">
                    Actions taken against your license in another state can affect your Nevada medical license.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Image
                  src="/images/filler images/black-female-doctor-doing-her-job.jpg"
                  alt="Doctor on phone"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  quality={85}
loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Surrender of Previous License While Under Investigation
                  </h3>
                  <p className="text-gray-700">
                    Surrendering a license during an investigation can have serious consequences for future licensure.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Image
                  src="/images/filler images/full-shot-doctors-sitting-together.jpg"
                  alt="Doctor reviewing medical records"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: '50% 25%' }}
                  quality={85}
loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Malpractice
                  </h3>
                  <p className="text-gray-700">
                    Medical malpractice claims can lead to disciplinary action by the Board of Medical Examiners.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                <Image
                  src="/images/filler images/freepik__the-style-is-candid-image-photography-with-natural__59023.png"
                  alt="Doctor patient consultation"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: '50% 25%' }}
                  quality={85}
loading="lazy"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Engaging in Sexual Activity with Patient
                  </h3>
                  <p className="text-gray-700">
                    Sexual misconduct with patients is a serious violation that can result in license revocation.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                <Image
                  src="/images/filler images/freepik__female-doctor-with-folded-arms-angry-glare-at-pati__49372.png"
                  alt="Disruptive behavior"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: '50% 25%' }}
                  quality={85}
loading="lazy"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Disruptive Behavior
                  </h3>
                  <p className="text-gray-700">
                    Unprofessional or disruptive behavior in a medical setting can result in disciplinary action.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Image
                  src="/images/filler images/male_doctor_putting_hand_on_womans_shoulder.jpg"
                  alt="Financial exploitation"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  quality={85}
loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Violating or Exploiting Trust for Financial Gain
                  </h3>
                  <p className="text-gray-700">
                    Exploiting the physician-patient relationship for financial or personal gain violates professional ethics.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Image
                  src="/images/filler images/doctor_holding_pills_and_money.jpg"
                  alt="Inappropriate care"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  quality={85}
loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Failure to Offer Appropriate Care for Financial Gain
                  </h3>
                  <p className="text-gray-700">
                    Providing or withholding care based on financial incentives rather than patient need is a serious violation.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Image
                  src="/images/filler images/young-woman-doctor-with-stethoscope-hospital.jpg"
                  alt="Disreputable conduct"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  quality={85}
loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Engaging in Disreputable Conduct
                  </h3>
                  <p className="text-gray-700">
                    Conduct that reflects poorly on the medical profession can result in disciplinary proceedings.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                <Image
                  src="/images/filler images/freepik__male-doctor-flirting-with-female-patient-intimate-__99225.png"
                  alt="Inappropriate contact"
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: '50% 25%' }}
                  quality={85}
loading="lazy"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    Sexual Contact with Surrogate or Patient Relatives
                  </h3>
                  <p className="text-gray-700">
                    Inappropriate sexual contact with patient surrogates or relatives violates professional boundaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Collapsible Section */}
            <div className="border border-gray-300 rounded-lg mb-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
              >
                <h2 className="text-2xl font-bold text-dark-blue">
                  NRS 630.304 - NRS 630.3062
                </h2>
                <svg
                  className={`w-6 h-6 text-dark-blue transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isExpanded && (
                <div className="p-6 prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-dark-blue mb-4 mt-8">
                    NRS 630.304
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    The following acts, among others, constitute grounds for initiating disciplinary action or denying licensure:
                  </p>

                  <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-8 text-left ">
                    <li>Obtaining, maintaining or renewing or attempting to obtain, maintain or renew a license to practice medicine by bribery, fraud or misrepresentation or by any false, misleading, inaccurate or incomplete statement.</li>
                    <li>Advertising the practice of medicine in a false, deceptive or misleading manner.</li>
                    <li>Practicing or attempting to practice medicine under another name.</li>
                    <li>Signing a blank prescription form.</li>
                    <li>Influencing a patient in order to engage in sexual activity with the patient or with others.</li>
                    <li>Attempting directly or indirectly, by way of intimidation, coercion or deception, to obtain or retain a patient or to discourage the use of a second opinion.</li>
                    <li>Terminating the medical care of a patient without adequate notice or without making other arrangements for the continued care of the patient.</li>
                  </ol>

                  <h3 className="text-xl font-bold text-dark-blue mb-4 mt-8">
                    Misrepresentation in obtaining or renewing license
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8 text-left ">
                    <li>false advertising</li>
                    <li>practicing under another name</li>
                    <li>signing blank prescription forms</li>
                    <li>influencing patient to engage in sexual activity</li>
                    <li>discouraging second opinion</li>
                    <li>terminating care without adequate notice.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-dark-blue mb-4 mt-8">
                    NRS 630.305
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8 text-left ">
                    <li>Accepting compensation to influence evaluation or treatment</li>
                    <li>inappropriate division of fees</li>
                    <li>inappropriate referral to health facility, laboratory or commercial establishment</li>
                    <li>charging for services not rendered</li>
                    <li>aiding practice by unlicensed person</li>
                    <li>delegating responsibility to unqualified person</li>
                    <li>failing to disclose conflict of interest</li>
                    <li>failing to initiate performance of community service</li>
                  </ul>

                  <div className="text-left  mb-8">
                    <p className="text-lg text-gray-700 mb-4">
                      1. The following acts, among others, constitute grounds for initiating disciplinary action or denying licensure:
                    </p>
                    <div className="ml-4 space-y-3 text-gray-700">
                      <p>
                        (a) Directly or indirectly receiving from any person, corporation or other business organization any fee, commission, rebate or other form of compensation which is intended or tends to influence the physician&apos;s objective evaluation or treatment of a patient.
                      </p>
                      <p>
                        (b) Dividing a fee between licensees except where the patient is informed of the division of fees and the division of fees is made in proportion to the services personally performed and the responsibility assumed by each licensee.
                      </p>
                      <p>
                        (c) Referring, in violation of NRS 439B.425, a patient to a health facility, medical laboratory or commercial establishment in which the licensee has a financial interest.
                      </p>
                      <p>
                        (d) Charging for visits to the physician&apos;s office which did not occur or for services which were not rendered or documented in the records of the patient.
                      </p>
                      <p>
                        (e) Aiding, assisting, employing or advising, directly or indirectly, any unlicensed person to engage in the practice of medicine contrary to the provisions of this chapter or the regulations of the Board.
                      </p>
                      <p>
                        (f) Delegating responsibility for the care of a patient to a person if the licensee knows, or has reason to know, that the person is not qualified to undertake that responsibility.
                      </p>
                      <p>
                        (g) Failing to disclose to a patient any financial or other conflict of interest.
                      </p>
                      <p>
                        (h) Failing to initiate the performance of community service within 1 year after the date the community service is required to begin, if the community service was imposed as a requirement of the licensee&apos;s receiving loans or scholarships from the Federal Government or a state or local government for the licensee&apos;s medical education.
                      </p>
                    </div>
                    <p className="text-lg text-gray-700 mt-4">
                      2. Nothing in this section prohibits a physician from forming an association or other business relationship with an optometrist pursuant to the provisions of NRS 636.373.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-dark-blue mb-4 mt-8">
                    NRS 630.306
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Inability to practice medicine
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8 text-left ">
                    <li>deceptive conduct</li>
                    <li>violation of regulation governing practice of medicine or adopted by State Board of Pharmacy</li>
                    <li>unlawful distribution of controlled substance</li>
                    <li>injection of silicone</li>
                    <li>practice beyond scope of license</li>
                    <li>practicing experimental medicine without consent of patient or patient&apos;s family</li>
                    <li>lack of skill or diligence</li>
                    <li>alcohol or other substance use disorder</li>
                    <li>filing of false report</li>
                    <li>failure to report certain changes of information or disciplinary or criminal action in another jurisdiction</li>
                    <li>failure to be found competent after examination</li>
                    <li>certain operation of a medical facility</li>
                    <li>prohibited administration of anesthesia or sedation</li>
                    <li>engaging in unsafe or unprofessional conduct</li>
                    <li>knowingly or willfully procuring or administering certain controlled substances or dangerous drugs</li>
                    <li>failure to supervise medical assistant adequately</li>
                    <li>allowing person not enrolled in accredited medical school to perform certain activities</li>
                    <li>failure to obtain required training regarding controlled substances</li>
                    <li>unauthorized injection of dermal or soft tissue fillers or botulinum toxin.</li>
                  </ul>

                  <div className="text-left  mb-8">
                    <p className="text-lg text-gray-700 mb-4">
                      1. The following acts, among others, constitute grounds for initiating disciplinary action or denying licensure:
                    </p>
                    <div className="ml-4 space-y-3 text-gray-700">
                      <p>
                        (a) Inability to practice medicine with reasonable skill and safety because of illness, a mental or physical condition or the use of alcohol, drugs, narcotics or any other substance.
                      </p>
                      <p>
                        (b) Engaging in any conduct:
                      </p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>(1) Which is intended to deceive;</li>
                        <li>(2) Which the Board has determined is a violation of the standards of practice established by regulation of the Board; or</li>
                        <li>(3) Which is in violation of a provision of chapter 639 of NRS, or a regulation adopted by the State Board of Pharmacy pursuant thereto, that is applicable to a licensee who is a practitioner, as defined in NRS 639.0125.</li>
                      </ul>
                      <p>
                        (c) Administering, dispensing or prescribing any controlled substance, or any dangerous drug as defined in chapter 454 of NRS, to or for himself or herself or to others except as authorized by law.
                      </p>
                      <p>
                        (d) Performing, assisting or advising the injection of any substance containing liquid silicone into the human body, except for the use of silicone oil to repair a retinal detachment.
                      </p>
                      <p>
                        (e) Practicing or offering to practice beyond the scope permitted by law or performing services which the licensee knows or has reason to know that he or she is not competent to perform or which are beyond the scope of his or her training.
                      </p>
                      <p>
                        (f) Performing, without first obtaining the informed consent of the patient or the patient&apos;s family, any procedure or prescribing any therapy which by the current standards of the practice of medicine is experimental.
                      </p>
                      <p>
                        (g) Continual failure to exercise the skill or diligence or use the methods ordinarily exercised under the same circumstances by physicians in good standing practicing in the same specialty or field.
                      </p>
                      <p>
                        (h) Having an alcohol or other substance use disorder.
                      </p>
                      <p>
                        (i) Making or filing a report which the licensee or applicant knows to be false or failing to file a record or report as required by law or regulation.
                      </p>
                      <p>
                        (j) Failing to comply with the requirements of NRS 630.254.
                      </p>
                      <p>
                        (k) Failure by a licensee or applicant to report in writing, within 30 days, any disciplinary action taken against the licensee or applicant by another state, the Federal Government or a foreign country, including, without limitation, the revocation, suspension or surrender of a license to practice medicine in another jurisdiction. The provisions of this paragraph do not apply to any disciplinary action taken by the Board or taken because of any disciplinary action taken by the Board.
                      </p>
                      <p>
                        (l) Failure by a licensee or applicant to report in writing, within 30 days, any criminal action taken or conviction obtained against the licensee or applicant, other than a minor traffic violation, in this State or any other state or by the Federal Government, a branch of the Armed Forces of the United States or any local or federal jurisdiction of a foreign country.
                      </p>
                      <p>
                        (m) Failure to be found competent to practice medicine as a result of an examination to determine medical competency pursuant to NRS 630.318.
                      </p>
                      <p>
                        (n) Operation of a medical facility at any time during which:
                      </p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>(1) The license of the facility is suspended or revoked; or</li>
                        <li>(2) An act or omission occurs which results in the suspension or revocation of the license pursuant to NRS 449.160.</li>
                      </ul>
                      <p className="ml-4">
                        This paragraph applies to an owner or other principal responsible for the operation of the facility.
                      </p>
                      <p>
                        (o) Failure to comply with the requirements of NRS 630.373.
                      </p>
                      <p>
                        (p) Engaging in any act that is unsafe or unprofessional conduct in accordance with regulations adopted by the Board.
                      </p>
                      <p>
                        (q) Knowingly or willfully procuring or administering a controlled substance or a dangerous drug as defined in chapter 454 of NRS that is not approved by the United States Food and Drug Administration, unless the unapproved controlled substance or dangerous drug:
                      </p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>(1) Was procured through a retail pharmacy licensed pursuant to chapter 639 of NRS;</li>
                        <li>(2) Was procured through a Canadian pharmacy which is licensed pursuant to chapter 639 of NRS and which has been recommended by the State Board of Pharmacy pursuant to subsection 4 of NRS 639.2328;</li>
                        <li>(3) Is marijuana being used for medical purposes in accordance with chapter 453A of NRS; or</li>
                        <li>(4) Is an investigational drug or biological product prescribed to a patient pursuant to NRS 630.3735 or 633.6945.</li>
                      </ul>
                      <p>
                        (r) Failure to supervise adequately a medical assistant pursuant to the regulations of the Board.
                      </p>
                      <p>
                        (s) Failure to comply with the provisions of NRS 630.3745.
                      </p>
                      <p>
                        (t) Failure to obtain any training required by the Board pursuant to NRS 630.2535.
                      </p>
                      <p>
                        (u) Failure to comply with the provisions of NRS 454.217 or 629.086.
                      </p>
                    </div>
                    <p className="text-lg text-gray-700 mt-4">
                      2. As used in this section, &quot;investigational drug or biological product&quot; has the meaning ascribed to it in NRS 454.351.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-dark-blue mb-4 mt-8">
                    NRS 630.3062
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8 text-left ">
                    <li>Failure to maintain proper medical records</li>
                    <li>altering medical records</li>
                    <li>making false report</li>
                    <li>failure to file or obstructing required report</li>
                    <li>failure to allow inspection and copying of medical records</li>
                    <li>failure to report other person in violation of chapter or regulations</li>
                    <li>failure to comply with certain requirements relating to controlled substances.</li>
                  </ul>

                  <div className="text-left  mb-8">
                    <p className="text-lg text-gray-700 mb-4">
                      1. The following acts, among others, constitute grounds for initiating disciplinary action or denying licensure:
                    </p>
                    <div className="ml-4 space-y-3 text-gray-700">
                      <p>
                        (a) Failure to maintain timely, legible, accurate and complete medical records relating to the diagnosis, treatment and care of a patient.
                      </p>
                      <p>
                        (b) Altering medical records of a patient.
                      </p>
                      <p>
                        (c) Making or filing a report which the licensee knows to be false, failing to file a record or report as required by law or knowingly or willfully obstructing or inducing another to obstruct such filing.
                      </p>
                      <p>
                        (d) Failure to make the medical records of a patient available for inspection and copying as provided in NRS 629.061, if the licensee is the custodian of health care records with respect to those records.
                      </p>
                      <p>
                        (e) Failure to comply with the requirements of NRS 630.3068.
                      </p>
                      <p>
                        (f) Failure to report any person the licensee knows, or has reason to know, is in violation of the provisions of this chapter or the regulations of the Board within 30 days after the date the licensee knows or has reason to know of the violation.
                      </p>
                      <p>
                        (g) Failure to comply with the requirements of NRS 453.163, 453.164, 453.226, 639.23507, 639.23535 and 639.2391 to 639.23916, inclusive, and any regulations adopted by the State Board of Pharmacy pursuant thereto.
                      </p>
                      <p>
                        (h) Fraudulent, illegal, unauthorized or otherwise inappropriate prescribing, administering or dispensing of a controlled substance listed in schedule II, III or IV.
                      </p>
                    </div>
                    <p className="text-lg text-gray-700 mt-4">
                      2. As used in this section, &quot;custodian of health care records&quot; has the meaning ascribed to it in NRS 629.016.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-dark-blue text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help? Contact Us Today</h2>
            <p className="mb-6">Free consultations via Zoom. We&apos;re here to help protect your medical license.</p>
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





