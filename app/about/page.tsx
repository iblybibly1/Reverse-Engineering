import { Trophy, Heart, Globe, Users } from "lucide-react";

export const metadata = {
  title: "About — EquineShow Online",
  description: "Learn about the EquineShow Online platform and our mission.",
};

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Passion for Horses", desc: "We are equestrians first. Everything we build is inspired by our love for horses and the people who care for them." },
    { icon: Globe, title: "Global Community", desc: "Connecting horse lovers from around the world. No matter where you are, you can compete and be celebrated." },
    { icon: Trophy, title: "Celebrating Excellence", desc: "Every entry deserves recognition. We create a platform that highlights the best of the equestrian world." },
    { icon: Users, title: "Inclusive Platform", desc: "From novice handlers to seasoned professionals, our shows welcome participants of all skill levels and disciplines." },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About EquineShow Online
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Founded by passionate equestrians, EquineShow Online brings the thrill of the show ring
            to the digital world — making it accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Mission</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                Making horse showing accessible to all
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Traditional horse shows require extensive travel, time off work, and significant expense.
                We believe that the equestrian community deserves a platform that removes these barriers
                while maintaining the competitive spirit and celebration of excellence.
              </p>
              <p className="text-slate-600 leading-relaxed">
                EquineShow Online hosts professional online competitions with dedicated judges,
                beautiful galleries, and a supportive community — all from the comfort of your stable.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-8 border border-blue-100">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "120+", label: "Shows Hosted" },
                  { value: "5K+", label: "Participants" },
                  { value: "50+", label: "Countries" },
                  { value: "10yr", label: "Running" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
                    <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">What We Believe</p>
            <h2 className="text-3xl font-bold text-slate-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Get in Touch</h2>
          <p className="text-slate-500 mb-8">
            Have questions about our platform or want to host a show? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:info@equineshow.online"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
