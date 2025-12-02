import Link from 'next/link'

export default function CTA() {
  return (
    <section className="bg-dark-blue text-white relative overflow-hidden">
      <div className="section-container section-padding">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
            Don&apos;t Delay. Give Us a Call!
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-slide-up delay-100">
            Our law office staff is standing by, ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in delay-200">
            <a
              href="tel:7028934777"
              className="text-3xl font-bold text-light-gold hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              702.893.4777
            </a>
          </div>
          <p className="mt-8 text-light-gold font-semibold animate-fade-in delay-300">
            Free Consultations Via Zoom
          </p>
        </div>
      </div>
    </section>
  )
}





