import Image from 'next/image'

export default function About() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-12 text-center animate-slide-up">
            For Over 14 Years, We Have Defended Medical Professionals in the State of Nevada
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Column */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6 animate-slide-up delay-100">
                Are you a nurse feeling overwhelmed by the possibility of losing your license 
                due to a letter of inquiry from the NSBN?
              </p>
              
              <p className="text-xl text-dark-gold font-bold mb-6 animate-slide-up delay-200">
                Don&apos;t worry, we can help!
              </p>
              
              <p className="text-lg text-gray-700 animate-slide-up delay-300">
                Our law firm specializes in protecting nurses&apos; licenses and responding to 
                inquiries, investigations, and complaints from the NSBN. We understand the pain 
                and stress that comes with these situations, and we&apos;re here to offer solutions.
              </p>
            </div>

            {/* Image - Right Column */}
            <div className="animate-slide-in-right">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/filler images/nurses_discussion_over_computer.jpg"
                  alt="Healthcare professionals collaborating"
                  width={600}
                  height={400}
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}





