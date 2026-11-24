import { useState, type FormEvent } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, VERIFIED_REVIEWS, type TestimonialItem } from '../data/properties';

interface TestimonialsPageProps {
  onOpenAppointment: () => void;
}

export function TestimonialsPage({ onOpenAppointment }: TestimonialsPageProps) {
  const [reviews, setReviews] = useState<TestimonialItem[]>(VERIFIED_REVIEWS);
  const [reviewerName, setReviewerName] = useState('');
  const [serviceTag, setServiceTag] = useState('Residential Buying');
  const [quote, setQuote] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmitReview = (event: FormEvent) => {
    event.preventDefault();
    if (reviewerName.trim().length < 2 || quote.trim().length < 10) {
      setFormError('Please share your name and a brief review of your experience.');
      return;
    }

    const newReview: TestimonialItem = {
      id: `client-review-${Date.now()}`,
      reviewerName: reviewerName.trim(),
      context: 'Client Submission · Federal B Area, Karachi',
      rating: 5,
      dateLabel: '5.0 / 5.0 Client Feedback',
      quote: quote.trim(),
      serviceTag,
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewerName('');
    setQuote('');
    setFormError('');
    setSubmittedNotice(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-14">
      {/* Page Header & Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-[#0F1D35]/12">
        <div className="lg:col-span-8 space-y-2">
          <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
            Client Feedback
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F1D35]">
            Trusted by Federal B Area Families
          </h1>
          <p className="text-sm sm:text-base text-[#0F1D35]/75 max-w-2xl">
            Client trust is earned through honest pricing and clean transfers. Verified reviewers
            consistently highlight our reliability when buying or selling homes in Federal B Area.
          </p>
        </div>

        <div className="lg:col-span-4 bg-[#0F1D35] text-[#F9F6F0] rounded-sm p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#F9F6F0]/65">Verified Google Rating</p>
            <p className="font-serif text-4xl font-semibold tabular-nums mt-1">
              {BUSINESS_INFO.ratingValue} / 5
            </p>
            <p className="text-xs text-[#F9F6F0]/75 tabular-nums mt-1">
              Based on {BUSINESS_INFO.reviewCount} verified reviews
            </p>
          </div>
          <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className="w-4 h-4 fill-[#9A7B3E] text-[#9A7B3E]"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <section aria-label="Client Reviews" className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-6 sm:p-8 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 text-xs text-[#0F1D35]/65">
                <span>
                  {review.serviceTag} · {review.dateLabel}
                </span>
                <div className="flex items-center gap-0.5" aria-label={`${review.rating} stars`}>
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 fill-[#9A7B3E] text-[#9A7B3E]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-[#0F1D35] leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[#0F1D35]/10">
              <p className="text-sm font-medium text-[#0F1D35]">{review.reviewerName}</p>
              <p className="text-xs text-[#0F1D35]/60 mt-0.5">{review.context}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Share Feedback + Schedule Consultation */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
        <div className="lg:col-span-5 bg-[#F1ECE1]/70 border border-[#0F1D35]/12 rounded-sm p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
              Why Reliability Matters
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1D35]">
              Buying or Selling in Federal B Area?
            </h2>
            <p className="text-sm text-[#0F1D35]/75 leading-relaxed">
              Meet with Fahad Iqbal at Sadaf Terrace, Block 7 to review active residential listings,
              verified recent sale prices in your block, or custom home construction options.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAppointment}
            className="w-fit px-6 py-3 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] transition-colors rounded-sm cursor-pointer"
          >
            Book Appointment
          </button>
        </div>

        <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-semibold text-[#0F1D35]">
              Share Your Experience
            </h2>
            <p className="text-sm text-[#0F1D35]/70">
              Worked with F&amp;F Real Estate on a home purchase, sale, or rental? Add your note
              below.
            </p>
          </div>

          {submittedNotice && (
            <div
              role="status"
              className="flex items-center gap-2 text-sm text-[#0F1D35] bg-[#F1ECE1] px-4 py-3 rounded-sm"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Thank you. Your feedback has been added to the list above.</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="review-name" className="block text-xs font-medium text-[#0F1D35]">
                  Your Name
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Salman Raza"
                  className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3.5 py-2.5 text-sm text-[#0F1D35] focus:outline-none focus:border-[#0F1D35]"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="review-service" className="block text-xs font-medium text-[#0F1D35]">
                  Service Used
                </label>
                <select
                  id="review-service"
                  value={serviceTag}
                  onChange={(e) => setServiceTag(e.target.value)}
                  className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3.5 py-2.5 text-sm text-[#0F1D35] focus:outline-none focus:border-[#0F1D35]"
                >
                  <option value="Residential Buying">Residential Buying</option>
                  <option value="Property Sales">Property Sales</option>
                  <option value="Residential Leasing">Residential Leasing</option>
                  <option value="Home Development">Home Development</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="review-quote" className="block text-xs font-medium text-[#0F1D35]">
                Your Review
              </label>
              <textarea
                id="review-quote"
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Share how F&F Real Estate assisted you..."
                className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3.5 py-2.5 text-sm text-[#0F1D35] focus:outline-none focus:border-[#0F1D35]"
              />
            </div>

            {formError && (
              <p role="alert" className="text-xs text-[#9E2A2B]">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium border border-[#0F1D35] text-[#0F1D35] hover:bg-[#0F1D35] hover:text-[#F9F6F0] transition-colors rounded-sm cursor-pointer"
            >
              Post Feedback
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
