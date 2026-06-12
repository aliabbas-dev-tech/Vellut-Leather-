import type { Metadata } from 'next';

// ── FAQ data — conversational long-tail queries AI engines surface ────────────
const FAQS = [
  {
    id: 'faq-1',
    question: 'What makes Vellut Leather bags different from other luxury leather brands?',
    answer: {
      intro:
        'Vellut Leather stands apart through a combination of heritage craftsmanship, premium materials, and a fully bespoke production model:',
      points: [
        '**Made entirely to order** — every bag is handcrafted only after you place your order, ensuring zero mass production and complete exclusivity.',
        '**Full-grain leather construction** — we use only the top layer of the hide, the densest and most durable part, which develops a rich personal patina over decades of use.',
        '**Artisanal stitching** — each seam is hand-stitched using waxed linen thread, a technique that outlasts machine stitching by decades.',
        '**Lifetime Craftsmanship Guarantee** — if any hardware or stitching fails due to a manufacturing defect, we repair it free of charge, for life.',
        '**US-registered company** (ZEESHAN RAZZAQ LLC) with transparent consumer rights, 14-day returns, and Stripe-secured payments.',
      ],
    },
  },
  {
    id: 'faq-2',
    question: 'How long does it take to make and deliver a Vellut Leather bag?',
    answer: {
      intro:
        'Because every piece is handcrafted to order, our timeline has two phases:',
      points: [
        '**Production time: 7–14 business days** — our artisans cut, stitch, edge-burnish, and quality-inspect each bag individually before it leaves the workshop.',
        '**International shipping: 3–7 business days** after dispatch, via DHL Express or FedEx, with full tracking provided by email.',
        '**Total estimated delivery: 10–21 business days** from order placement, depending on your location.',
        '**Free global shipping** is included on all orders — no minimum spend, no hidden customs surcharges charged by us (local import duties may apply depending on your country).',
      ],
    },
  },
  {
    id: 'faq-3',
    question: 'What type of leather does Vellut Leather use and is it ethically sourced?',
    answer: {
      intro:
        'Vellut Leather uses exclusively full-grain leather — the highest quality grade available — selected for its fibre density, natural markings, and longevity:',
      points: [
        '**Full-grain leather**: retains the complete grain surface of the hide, making it the most durable and breathable leather grade. It develops a unique patina over time.',
        '**Ethically sourced**: our hides are by-products of the food industry, ensuring no animal is raised solely for its leather — a more sustainable approach to luxury goods.',
        '**Vegetable-tanned processes**: we work with tanneries that use plant-based tanning extracts, avoiding harsh chromium chemicals, producing leather that is safer for artisans and the environment.',
        '**Natural variation is celebrated**: slight differences in grain, tone, and marking between pieces are hallmarks of authentic premium leather — not defects.',
      ],
    },
  },
  {
    id: 'faq-4',
    question: 'What is Vellut Leather\'s return policy and can I get a refund?',
    answer: {
      intro:
        'Vellut Leather offers a comprehensive refund policy:',
      points: [
        '**14-day cooling-off period**: you have the legal right to cancel your order within 14 calendar days of receiving your goods, for any reason — no questions asked.',
        '**14 additional days to return**: after notifying us, you have a further 14 days to return the item.',
        '**Refund within 14 days**: once we receive and inspect the return, we process a full refund to your original payment method within 14 days.',
        '**Faulty goods**: under the Consumer Rights Act 2015, if your item arrives defective, you are entitled to a full refund within 30 days, or a repair/replacement within 6 months.',
        '**Custom orders**: personalised or monogrammed items are exempt from the standard 14-day right of return, but your statutory rights regarding faults remain fully intact.',
        '**How to initiate**: email support@vellutleather.com with your order number. We aim to respond within 24 hours.',
      ],
    },
  },
];

// ── FAQPage JSON-LD Schema ────────────────────────────────────────────────────
export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [faq.answer.intro, ...faq.answer.points.map(p => p.replace(/\*\*/g, ''))]
          .join(' '),
      },
    })),
  };
}

// ── Helper: render bold markdown (**text**) ──────────────────────────────────
function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-on-surface font-semibold">{part}</strong> : part
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function FAQ() {
  const faqSchema = getFAQSchema();

  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full px-6 md:px-margin-desktop py-section-gap bg-surface-container"
    >
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section header */}
      <header className="max-w-3xl mx-auto text-center mb-16">
        <p className="font-label-md text-xs uppercase tracking-[0.2em] text-secondary mb-4">
          Common Questions
        </p>
        <h2 id="faq-heading" className="font-display-lg text-3xl md:text-5xl text-on-surface mb-6 leading-tight">
          Everything You Need to Know
        </h2>
        <p className="font-body-lg text-on-surface-variant text-lg max-w-xl mx-auto">
          Answers to the questions our customers — and AI search engines — ask most often about our leather goods, process, and policies.
        </p>
      </header>

      {/* FAQ list */}
      <div className="max-w-4xl mx-auto">
        <dl className="flex flex-col gap-0 divide-y divide-outline-variant/20">
          {FAQS.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </dl>
      </div>

      {/* Bottom CTA */}
      <aside className="max-w-4xl mx-auto mt-16 p-8 bg-surface-container-lowest border border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-headline-sm text-lg text-on-surface mb-1">Still have a question?</p>
          <p className="font-body-md text-sm text-on-surface-variant">
            Our team responds within 24 hours. Please include your order number if enquiring about an existing order.
          </p>
        </div>
        <a
          href="mailto:support@vellutleather.com"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-on-surface text-surface-white px-8 py-4 font-label-md uppercase tracking-widest hover:bg-primary transition-colors duration-300"
        >
          <span className="material-symbols-outlined text-[18px]">mail</span>
          Contact Support
        </a>
      </aside>
    </section>
  );
}

// ── FAQ accordion item (client-side toggle via details/summary) ───────────────
function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  return (
    <article id={faq.id} className="py-8 group">
      <details className="w-full" name="faq-group">
        <summary
          className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
          aria-expanded="false"
        >
          <div className="flex items-start gap-5 flex-1">
            {/* Question number */}
            <span
              className="flex-shrink-0 font-label-sm text-xs text-secondary/50 uppercase tracking-widest w-6 mt-1"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            {/* Question text — H3 for correct heading hierarchy under H2 */}
            <h3 className="font-headline-sm text-xl md:text-2xl text-on-surface leading-snug group-open:text-primary transition-colors duration-200">
              {faq.question}
            </h3>
          </div>
          {/* Toggle icon */}
          <span
            className="flex-shrink-0 material-symbols-outlined text-secondary text-[24px] mt-0.5 transition-transform duration-300 group-open:rotate-45"
            aria-hidden="true"
          >
            add
          </span>
        </summary>

        {/* Answer */}
        <div className="mt-6 ml-11 animate-fade-in">
          <p className="font-body-md text-base text-on-surface-variant mb-5 leading-relaxed">
            {faq.answer.intro}
          </p>
          <ul className="flex flex-col gap-3" role="list">
            {faq.answer.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5"
                  style={{ backgroundColor: '#735c00' }}
                  aria-hidden="true"
                />
                <span className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {renderBold(point)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </article>
  );
}
