"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, HeartPulse, Ruler, Upload, Gift, ShieldCheck, Shirt, Clock, ChevronRight, CheckCircle2 } from "lucide-react";

const scrubColors = {
  Calm: {
    name: "Sage Calm",
    color: "bg-emerald-200",
    ring: "ring-emerald-300",
    text: "text-emerald-900",
    hex: "#B9E4C9",
    copy: "Grounded, soft, and focused. Perfect for the healthcare worker who brings calm into every room.",
  },
  Bold: {
    name: "Midnight Navy",
    color: "bg-slate-900",
    ring: "ring-slate-400",
    text: "text-slate-900",
    hex: "#101827",
    copy: "Classic, polished, and powerful. Made for the person who likes a clean, elevated uniform look.",
  },
  Warm: {
    name: "Blush Rose",
    color: "bg-rose-200",
    ring: "ring-rose-300",
    text: "text-rose-900",
    hex: "#F7C7D4",
    copy: "Friendly, bright, and approachable. A cute everyday shade with soft main-character energy.",
  },
  Fresh: {
    name: "Sky Blue",
    color: "bg-sky-200",
    ring: "ring-sky-300",
    text: "text-sky-900",
    hex: "#BFE6FF",
    copy: "Fresh, clean, and easygoing. Great for long shifts when you want to feel light and put together.",
  },
};

const products = [
  { name: "The LumaFlex Top", tag: "Four-way stretch", color: "from-emerald-100 to-white" },
  { name: "The Shift-Pro Jogger", tag: "No-pull waistband", color: "from-sky-100 to-white" },
  { name: "The Essential Set", tag: "Matching set", color: "from-rose-100 to-white" },
];

const features = [
  { icon: Shirt, title: "Tailored without the stiffness", copy: "Structured enough to look polished, flexible enough to move through a full shift." },
  { icon: ShieldCheck, title: "Built for repeated washing", copy: "Wrinkle-resistant, antimicrobial-inspired positioning, and reinforced seams for real shift life." },
  { icon: Clock, title: "Comfort that lasts past hour twelve", copy: "Soft-touch fabric, breathable panels, and functional pockets where you actually need them." },
];

const quizQuestions = [
  {
    question: "What kind of energy do you bring to your shift?",
    answers: [
      ["Calm + reassuring", "Calm"],
      ["Confident + polished", "Bold"],
      ["Warm + bubbly", "Warm"],
      ["Fresh + easygoing", "Fresh"],
    ],
  },
  {
    question: "Your dream scrub vibe is...",
    answers: [
      ["Soft and peaceful", "Calm"],
      ["Professional and timeless", "Bold"],
      ["Cute and friendly", "Warm"],
      ["Clean and bright", "Fresh"],
    ],
  },
  {
    question: "Pick a post-shift treat:",
    answers: [
      ["Tea, shower, bed", "Calm"],
      ["Good dinner and a reset", "Bold"],
      ["Sweet drink + cozy scroll", "Warm"],
      ["Walk, smoothie, fresh air", "Fresh"],
    ],
  },
];

function getSize({
  height,
  bust,
  waist,
  hips,
}: {
  height: string;
  bust: string;
  waist: string;
  hips: string;
}) {
  const h = Number(height);
  const b = Number(bust);
  const w = Number(waist);
  const hp = Number(hips);

  const max = Math.max(b || 0, w || 0, hp || 0);

  let size = "M";

  if (max < 34) size = "XS";
  else if (max < 38) size = "S";
  else if (max < 42) size = "M";
  else if (max < 46) size = "L";
  else if (max < 50) size = "XL";
  else size = "2X";

  let length = "Regular";

  if (h && h < 160) length = "Petite";
  if (h && h > 173) length = "Tall";

  return { size, length };
}
type MeasurementKey = "height" | "bust" | "waist" | "hips" | "inseam";
export default function LumawearRedesign() {
const [quiz, setQuiz] = useState<Record<number, string>>({});
const [photo, setPhoto] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState({ height: "", bust: "", waist: "", hips: "", inseam: "" });
  const [firstName, setFirstName] = useState("");
const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);

 const quizResult = useMemo(() => {
  const counts: Record<string, number> = {};

  Object.values(quiz).forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Calm";

  return scrubColors[winner as keyof typeof scrubColors];
}, [quiz]);

  const sizeResult = useMemo(() => getSize(measurements), [measurements]);
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  await fetch("https://script.google.com/macros/s/AKfycbyL7biDnb1dx8OoqIz1Fc3lkulQRG2WEDfpJXVAHE2BTfz5T7L9OYXaHzDMoES-et6jdA/exec", {
    method: "POST",
    body: JSON.stringify({ firstName, email }),
  });

  setSubmitted(true);
  setFirstName("");
  setEmail("");
};

  return (
    <main className="min-h-screen bg-[#fffaf5] text-slate-900">
      <section className="relative overflow-hidden px-6 py-6 md:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#d7f7e8,transparent_35%),radial-gradient(circle_at_top_right,#ffdbe7,transparent_30%),radial-gradient(circle_at_bottom,#dff3ff,transparent_35%)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 font-black tracking-tight">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-200">L</div>
            Lumawear
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#fit">Fit Finder</a>
            <a href="#quiz">Color Quiz</a>
            <a href="#drop">First Drop</a>
            <a href="#faq">FAQ</a>
          </div>
<a
  href="#waitlist"
  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-md"
>
  Join Waitlist
</a>        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-600" /> Limited first drop + founding member perks
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Scrubs that show up as hard as you do.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Premium, movement-friendly scrubs designed for long shifts, real bodies, and healthcare workers who deserve to feel put together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#fit" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-4 font-bold text-white shadow-lg shadow-emerald-200">
                Find my fit <ChevronRight className="ml-1 h-5 w-5" />
              </a>
              <a href="#quiz" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-bold shadow-sm">
                Take color quiz
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
              {['Four-way stretch', 'Reinforced seams', 'Wrinkle-resistant', 'Cute colorways'].map((item) => (
                <span key={item} className="rounded-full bg-white px-4 py-2 shadow-sm">✓ {item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="rounded-[2.5rem] bg-white p-5 shadow-2xl">
          <div className="rounded-[2.5rem] bg-white p-5 shadow-2xl">
  <img
    src="/box.png"
    alt="Lumawear scrub model"
    className="h-[520px] w-full rounded-[2rem] object-cover object-center"
  />
</div>
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-3xl bg-white p-5 shadow-xl">
              <p className="text-sm font-bold text-slate-500">VIP Gift Box</p>
              <p className="text-2xl font-black">$100 value</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-100">
              <Icon className="mb-5 h-8 w-8 text-emerald-600" />
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="drop" className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-slate-900 p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><Gift className="h-4 w-4" /> Launch Giveaway</p>
              <h2 className="text-4xl font-black md:text-5xl">First 50 sign-ups get the Luma Gift Box.</h2>
              <p className="mt-4 text-slate-300">A thoughtful welcome kit with shiftwork accessories, branded gear, productivity tools, and a mystery item.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Shiftwork accessories", "Branded gear", "Productivity tools", "Mystery item"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/10 p-5">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-300" />
                  <p className="font-bold">{item}</p>
                  <p className="text-sm text-slate-300">Included free for founding members</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.25em] text-emerald-600">Shop the vibe</p>
              <h2 className="mt-2 text-4xl font-black">A cleaner first-drop preview</h2>
            </div>
            <button className="w-fit rounded-full bg-white px-6 py-3 font-bold shadow-sm">Coming Soon </button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <div key={product.name} className={`rounded-[2rem] bg-gradient-to-br ${product.color} p-6 shadow-sm`}>
<img
  src={`/scrub${products.indexOf(product) + 1}.png`}
  alt={product.name}
  className="mb-6 h-64 w-full rounded-[1.5rem] object-cover shadow-inner"
/>
              <p className="text-sm font-bold text-slate-500">{product.tag}</p>
                <h3 className="mt-1 text-2xl font-black">{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quiz" className="px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-10">
            <p className="font-bold uppercase tracking-[0.25em] text-rose-500">Personality quiz</p>
            <h2 className="mt-2 text-4xl font-black">What scrub color are you?</h2>
            <div className="mt-8 space-y-7">
              {quizQuestions.map((q, index) => (
                <div key={q.question}>
                  <p className="mb-3 font-bold">{index + 1}. {q.question}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {q.answers.map(([label, value]) => (
                      <button
                        key={label}
                        onClick={() => setQuiz({ ...quiz, [index]: value })}
                        className={`rounded-2xl border p-4 text-left font-semibold transition ${quiz[index] === value ? "border-emerald-400 bg-emerald-50" : "border-slate-100 bg-slate-50 hover:bg-white"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-bold text-slate-500">Your match</p>
            <div className={`mt-5 h-44 rounded-[2rem] ${quizResult.color} ring-8 ${quizResult.ring}`} />
            <h3 className="mt-7 text-3xl font-black">{quizResult.name}</h3>
            <p className="mt-3 text-slate-600">{quizResult.copy}</p>
          </div>
        </div>
      </section>
      <section id="fit" className="px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] bg-emerald-50 p-8 md:p-10">
            <p className="font-bold uppercase tracking-[0.25em] text-emerald-700">Luma Fit Finder</p>
            <h2 className="mt-2 text-4xl font-black">Upload a fit pic + add measurements.</h2>
            <label className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-emerald-300 bg-white p-8 text-center">
              <Upload className="mb-3 h-8 w-8 text-emerald-600" />
              <span className="font-bold">Upload photo</span>
              <span className="text-sm text-slate-500">PNG/JPG preview only</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
            </label>
            {photo && <img src={photo} alt="Uploaded fit preview" className="mt-5 max-h-72 w-full rounded-[2rem] object-cover shadow-sm" />}
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <Ruler className="h-7 w-7 text-emerald-600" />
              <h3 className="text-3xl font-black">Size recommendation</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["height", "Height (cm)"],
                ["bust", "Bust / chest (in)"],
                ["waist", "Waist (in)"],
                ["hips", "Hips (in)"],
                ["inseam", "Inseam (in)"],
             ].map(([key, label]) => {
  const measurementKey = key as MeasurementKey;

  return (
                <label key={key} className="text-sm font-bold text-slate-600">
                  {label}
                  <input
                   value={measurements[measurementKey]}
onChange={(e) =>
  setMeasurements({ ...measurements, [measurementKey]: e.target.value })
}                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400"
                    placeholder="Enter number"
                  />
                </label>
             );
})}
            </div>
            <div className="mt-8 rounded-[2rem] bg-slate-900 p-6 text-white">
              <p className="text-sm font-bold text-emerald-200">Recommended starting point</p>
              <p className="mt-2 text-5xl font-black">{sizeResult.size}</p>
              <p className="mt-2 text-slate-300">Length: {sizeResult.length}</p>
              <p className="mt-5 text-sm text-slate-400">Tip: if you prefer a relaxed fit or are between sizes, size up for pants and stay true-to-size for tops.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <HeartPulse className="mb-4 h-10 w-10 text-rose-500" />
              <h2 className="text-4xl font-black">Founder note</h2>
            </div>
            <blockquote className="text-2xl font-semibold leading-10 text-slate-700">
              “Your scrubs say volumes before you get to say a word. Lumawear is for healthcare professionals who want comfort, confidence, and presence in one uniform.”
              <footer className="mt-5 text-base font-bold text-slate-500">— Shanice Burnett, Founder</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-4xl font-black">Questions? We’ve got you.</h2>
          <div className="mt-8 space-y-4">
            {[
              ["What do I get from the VIP waitlist?", "First access, launch pricing, private previews, limited colorways, and founding member perks."],
              ["How does the Fit Finder work?", "We use your entered measurements to suggest a starting size."],
              ["Can I unsubscribe?", "Yes. Keep the promise simple: valuable updates only, no spam."],
            ].map(([q, a]) => (
              <details key={q} className="rounded-3xl bg-white p-6 shadow-sm">
                <summary className="cursor-pointer font-black">{q}</summary>
                <p className="mt-3 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
<section id="waitlist" className="px-6 py-16 md:px-12">
  <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-100 via-rose-50 to-sky-100 p-8 shadow-sm md:grid-cols-2 md:p-12">
    <div>
      <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
        FREE GIFTS INCLUDED
      </p>

      <h2 className="text-4xl font-black md:text-5xl">
        Be part of the first drop.
      </h2>

      <p className="mt-4 text-lg leading-8 text-slate-600">
        Join the Lumawear priority waitlist for early access, launch perks,
        exclusive colourways, and gift box updates.
      </p>

      <form onSubmit={handleWaitlistSubmit} className="mt-8 max-w-md rounded-[2rem] bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black">Join the waitlist ✨</h3>

        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First name"
          className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-400"
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-slate-900 px-6 py-4 font-bold text-white shadow-sm transition hover:scale-105"
        >
          Reserve my gift box
        </button>

        {submitted && (
          <p className="mt-4 text-sm font-bold text-emerald-700">
            You’re on the waitlist ✨
          </p>
        )}

        <p className="mt-4 text-xs text-slate-500">
          No spam — just launch updates and early access.
        </p>
      </form>
    </div>

    <div className="rounded-[2rem] bg-white/70 p-5 shadow-inner">
      <img
        src="/box.png"
        alt="Lumawear gift box"
        className="h-[420px] w-full rounded-[1.5rem] object-cover object-center"
      />
    </div>
  </div>
<section className="relative overflow-hidden px-6 py-16 md:px-12">
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-100 via-white to-emerald-100 opacity-70" />

<div className="mx-auto max-w-7xl rounded-[3rem] bg-gradient-to-br from-rose-100 via-[#fffaf5] to-emerald-100 p-8 shadow-sm md:p-10">    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-bold uppercase tracking-[0.25em] text-rose-500">
          Follow the launch
        </p>

        <h2 className="mt-2 text-4xl font-black">
          @lumawearscrubs
        </h2>

        <p className="mt-3 max-w-xl text-slate-600">
          Behind the scenes, launch updates, scrub inspo, giveaways, and
          everyday healthcare fits.
        </p>
      </div>

      <a
        href="https://www.instagram.com/lumawearscrubs/"
        target="_blank"
        className="w-fit rounded-full bg-slate-900 px-6 py-3 font-bold text-white shadow-sm transition hover:scale-105"
      >
        Follow on Instagram
      </a>
    </div>

    <div className="grid gap-5 md:grid-cols-3">
      {[
        "/insta1.png",
        "/insta2.png",
        "/insta3.png",
      ].map((image, index) => (
        <a
          key={index}
          href="https://www.instagram.com/lumawearscrubs/"
          target="_blank"
className="group overflow-hidden rounded-[2rem] bg-[#f8f8f8] shadow-sm"        >
          <img
            src={image}
            alt="Lumawear Instagram preview"
className="h-[520px] w-full object-cover object-top transition duration-300 group-hover:scale-105"          />
        </a>
      ))}
    </div>
  </div>
</section>
</section>
      <footer className="px-6 pb-8 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 rounded-[2rem] bg-slate-900 px-8 py-7 text-white md:flex-row md:items-center">
          <p className="font-black">Lumawear Scrubs</p>
          <p className="text-sm text-slate-400">Premium scrubs for the reality of your shift.</p>
          
<a
  href="#waitlist"
  className="rounded-full bg-white px-5 py-3 font-bold text-slate-900"
>
  Claim VIP spot
</a>        </div>
      </footer>
    </main>
  );
}
