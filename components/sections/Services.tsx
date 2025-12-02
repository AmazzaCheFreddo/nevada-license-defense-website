import Link from 'next/link'

// Nursing Icon - Heart with heartbeat monitor line (stroke-based)
const NursingIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Heart shape outline */}
    <path
      d="M 50,30 C 50,30 35,20 25,25 C 15,30 15,45 25,55 C 35,65 50,80 50,80 C 50,80 65,65 75,55 C 85,45 85,30 75,25 C 65,20 50,30 50,30 Z"
    />
    {/* Heartbeat monitor line inside heart - ECG waveform */}
    <path
      d="M 25,50 L 30,50 L 35,35 L 40,60 L 45,40 L 50,50 L 55,50 L 60,45 L 65,50 L 70,50 L 75,50"
      className="heartbeat-line"
    />
  </svg>
)

// Medical Icon - Stethoscope
const MedicalIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 125"
    fill="none"
    stroke="currentColor"
    strokeWidth="4.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="matrix(1.0119695,0,0,1.0116948,-141.74874,2.7681437)">
      <g className="stethoscope-bottom-group">
        <path
          d="m 184.18091,68.479665 v 33.849705 c 0,13.50915 16.5632,12.97487 16.5632,12.97487 0,0 16.5632,0.53428 16.5632,-12.97487 v -9.815949"
          fill="none"
        />
        <circle cx="217.28558" cy="84.042969" r="8.4355831" fill="none" />
      </g>
      <g className="earpiece-left-group">
        <path
          className="earpiece-left"
          d="m 173.61963,6.1349693 c 0,0 -22.39264,-1.8404908 -20.2454,21.4723927 2.14724,23.312883 15.59797,36.144211 30.80426,40.184051"
          fill="none"
        />
        <path className="earpiece-arm-left" d="M 174.026,2.7742804 V 9.5364527" fill="none" />
      </g>
      <g className="earpiece-right-group">
        <path className="earpiece-arm-right" d="M 194.35256,2.7742804 V 9.5364527" fill="none" />
        <path
          className="earpiece-right"
          d="M 184.17849,67.791413 C 199.38478,63.751574 212.83551,50.920243 214.98275,27.60736 217.12999,4.2944767 194.73735,6.1349666 194.73735,6.1349666"
          fill="none"
        />
      </g>
    </g>
  </svg>
)

// Pharmacy Icon - Pill bottle with pills inside
const PharmacyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="bottle-group">
      {/* Bottle body - rectangular with flat bottom */}
      <rect x="30" y="30" width="40" height="50" rx="2" fill="none" />
      {/* Bottle cap - symmetrical and centered */}
      <rect x="30" y="20" width="40" height="12" rx="2" fill="none" />
      {/* Vertical lines on cap for ribbed texture - minimal, evenly spaced, symmetrical */}
      <line x1="40" y1="22" x2="40" y2="30" strokeWidth="4" />
      <line x1="50" y1="22" x2="50" y2="30" strokeWidth="4" />
      <line x1="60" y1="22" x2="60" y2="30" strokeWidth="4" />
    </g>
    {/* Pills inside bottle - three circular pills positioned like reference, with spacing from borders and each other */}
    <circle cx="42" cy="64" r="3.5" fill="currentColor" className="pill pill-1" />
    <circle cx="50" cy="52" r="3.5" fill="currentColor" className="pill pill-2" />
    <circle cx="58" cy="63" r="3.5" fill="currentColor" className="pill pill-3" />
  </svg>
)

const services = [
  {
    title: 'Nevada State Board of Nursing (NSBN)',
    description: 'We provide legal representation and guidance for nurses facing license issues.',
    href: '/board-of-nursing/nevada-state-board-of-nursing',
    icon: <NursingIcon className="w-16 h-16 text-dark-blue" />,
  },
  {
    title: 'Nevada Board of Pharmacy (NSBP)',
    description: 'Our experienced attorneys will fight for your pharmacy license.',
    href: '/board-of-pharmacy',
    icon: <PharmacyIcon className="w-16 h-16 text-dark-blue" />,
  },
  {
    title: 'Medical Nevada State Board of Medical Examiners (NSBME)',
    description: 'We specialize in protecting the licenses of medical professionals in Nevada.',
    href: '/board-of-medical-examiners',
    icon: <MedicalIcon className="w-14 h-14 text-dark-blue" />,
  },
]

export default function Services() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">
            Nevada License Defense for Medical Professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-lg shadow-lg p-8 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.icon && (
                <div className="mb-4 transform transition-transform duration-300 hover:scale-110 flex justify-center group">
                  {service.icon}
                </div>
              )}
              <h3 className="text-xl font-bold text-dark-blue mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                href={service.href}
                className="text-dark-blue font-bold hover:text-light-gold transition-all duration-300 ease-in-out inline-flex items-center group"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}





