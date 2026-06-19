"use client";

import { useEffect, useState } from "react";
import {
  Star,
  ExternalLink,
  //   ThumbsUp,
  //   Share2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Image from "next/image";

const PAGE_SIZE = 5;

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});
  const [averageRating, setAverageRating] = useState(0);

  /*
  =========================================
  FETCH REVIEWS
  =========================================
  */

  const fetchGoogleReviews = async (pageToken = "") => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CROISSIX_API_URL}/auth/google/reviews?pageSize=${PAGE_SIZE}&pageToken=${pageToken}`,
      );

      const data = await response.json();

      //   console.log("Google Reviews:", data);

      if (data.success) {
        // setReviews((prev) => [...prev, ...(data.reviews || [])]);
        setReviews((prev) => {
          const existingIds = new Set(prev.map((review) => review.reviewId));

          const newReviews = (data.reviews || []).filter(
            (review) => !existingIds.has(review.reviewId),
          );

          return [...prev, ...newReviews];
        });
        setAverageRating(data.averageRating || 0);
        setNextPageToken(data.nextPageToken || null);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  /*
  =========================================
  INITIAL FETCH
  =========================================
  */

  useEffect(() => {
    const initializeReviews = async () => {
      await fetchGoogleReviews();
    };

    initializeReviews();
  }, []);

  /*
  =========================================
  SLIDER NEXT
  =========================================
  */

  //   const handleNext = async () => {
  //     /*
  //     IF MORE REVIEWS ALREADY EXIST
  //     */

  //     if (activeIndex < reviews.length - 1) {
  //       setActiveIndex((prev) => prev + 1);

  //       /*
  //       FETCH NEXT PAGE WHEN USER REACHES
  //       LAST REVIEW OF CURRENT BATCH
  //       */

  //       if (activeIndex === reviews.length - 2 && nextPageToken && !loading) {
  //         await fetchGoogleReviews(nextPageToken);
  //       }

  //       return;
  //     }

  //     /*
  //     FETCH NEXT PAGE
  //     */

  //     if (nextPageToken && !loading) {
  //       await fetchGoogleReviews(nextPageToken);

  //       setActiveIndex((prev) => prev + 1);
  //     }
  //   };

  const handleNext = async () => {
    if (activeIndex < reviews.length - 1) {
      setActiveIndex((prev) => prev + 1);
      return;
    }

    if (nextPageToken && !loading) {
      const previousLength = reviews.length;

      await fetchGoogleReviews(nextPageToken);
      setActiveIndex(previousLength);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  /*
  =========================================
  EXPAND REVIEW
  =========================================
  */

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleReplyExpand = (id) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /*
  =========================================
  CURRENT REVIEW
  =========================================
  */

  const currentReview = reviews[activeIndex];

  if (reviews.length === 0) return null;

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#050508] text-white">
      <div className="relative z-10 max-w-215 mx-auto">
        {/* HEADER */}

        <div className="text-center mb-12">
          <span className="block mb-3 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8b5cf6]">
            What clients say
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-3 gradient-text-2-2 leading-tight">
            Trusted by our{" "}
            <span className="violet-gradient-text">community</span>
          </h2>

          <p className="text-white/50 text-sm md:text-base mb-6">
            Real reviews directly from our Google Business Profile
          </p>

          <div className="h-px max-w-160 mx-auto bg-linear-to-r from-transparent via-violet-500/45 to-transparent"></div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 p-8 mb-9 glass-card-2-2 rounded-2xl">
          <div className="flex flex-col items-center min-w-20">
            <div className="text-5xl font-semibold font-sora violet-gradient-text-2 leading-none">
              {averageRating}
            </div>
            <div className="flex gap-0.75 my-2 text-[#f59e0b]">
              {/* {[...Array(averageRating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))} */}
              {[...Array(Math.round(averageRating))].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <div className="text-[0.75rem] text-white/45">
              {reviews.length} reviews
            </div>
          </div>

          <div className="flex-1 min-w-50 flex flex-col gap-2">
            {[
              { label: 5, value: "FIVE" },
              { label: 4, value: "FOUR" },
              { label: 3, value: "THREE" },
              { label: 2, value: "TWO" },
              { label: 1, value: "ONE" },
            ].map((star, index) => {
              const count = reviews.filter(
                (review) => review.starRating === star.value,
              ).length;

              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div
                  key={star.label}
                  className="flex items-center gap-3 text-[0.78rem]"
                >
                  <span className="w-9 text-right text-white/50">
                    {star.label}
                  </span>

                  <Star
                    size={12}
                    className="text-[#f59e0b]"
                    fill="currentColor"
                  />

                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                        opacity: 1 - index * 0.18,
                      }}
                    />
                  </div>

                  <span className="w-6 text-white/40 text-[0.75rem]">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-2 pl-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[0.78rem] text-white/60">
              <GoogleIcon className="w-4 h-4" />
              Google Reviews
            </div>
            <a
              href="https://www.google.com/maps/place/Vipprow+%7C+Digital+Marketing+%7C+SaaS+Solutions+%7C+Digital+Marketing+institute+%7C+social+media--/@23.1491404,79.9175807,17z/data=!4m8!3m7!1s0x669f31eafcdd5fe5:0x9c592ca9f6be0fa8!8m2!3d23.1491404!4d79.9201556!9m1!1b1!16s%2Fg%2F11lyvgpr5g?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D"
              className="flex items-center gap-1 text-[0.72rem] text-violet-400/70 hover:text-violet-300 transition-colors"
            >
              View on Google <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* LOADING */}

        {initialLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin text-violet-400" />
          </div>
        ) : !currentReview ? (
          <div className="text-center text-white/50 py-24">
            No reviews found
          </div>
        ) : (
          <>
            {/* REVIEW CARD */}

            <ReviewCard
              review={currentReview}
              isExpanded={expandedReviews[currentReview.reviewId]}
              onToggle={() => toggleExpand(currentReview.reviewId)}
              isReplyExpanded={expandedReplies[currentReview.reviewId]}
              onReplyToggle={() => toggleReplyExpand(currentReview.reviewId)}
            />

            {/* SLIDER CONTROLS */}

            <div className="flex items-center justify-between gap-4 mt-8">
              {/* PREV BUTTON */}

              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="shrink-0 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center disabled:opacity-40 hover:border-violet-500/40 transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              {/* DOTS */}

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide px-1">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 rounded-full shrink-0 transition-all duration-300 ${
                        index === activeIndex
                          ? "w-8 bg-violet-500"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* NEXT BUTTON */}

              <button
                onClick={handleNext}
                disabled={!nextPageToken && activeIndex === reviews.length - 1}
                className="shrink-0 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center disabled:opacity-40 hover:border-violet-500/40 transition-all"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            </div>

            {/* <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center disabled:opacity-40 hover:border-violet-500/40 transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {reviews.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-violet-500"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!nextPageToken && activeIndex === reviews.length - 1}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center disabled:opacity-40 hover:border-violet-500/40 transition-all"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            </div> */}
          </>
        )}
      </div>
    </section>
  );
};

/*
=========================================
REVIEW CARD
=========================================
*/

const ReviewCard = ({
  review,
  isExpanded,
  onToggle,
  isReplyExpanded,
  onReplyToggle,
}) => {
  const fullText = review.comment || "No review text";

  const shortText =
    fullText.length > 260 ? `${fullText.slice(0, 260)}...` : fullText;

  const shouldTruncate = fullText.length > 260;

  const fullReply = review.reviewReply?.comment || "";

  const shortReply =
    fullReply.length > 260 ? `${fullReply.slice(0, 260)}...` : fullReply;

  const shouldTruncateReply = fullReply.length > 260;

  const ratingMap = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  const rating = ratingMap[review.starRating] || 5;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/30 transition-colors">
      <div className="p-6">
        {/* HEADER */}

        <div className="flex items-start gap-3 mb-4">
          <Image
            src={review.reviewer?.profilePhotoUrl}
            alt={review.reviewer?.displayName}
            width={20}
            height={20}
            className="w-12 h-12 rounded-full object-cover border border-white/10"
          />

          <div className="flex-1">
            <div className="font-semibold text-black text-[0.95rem]">
              {review.reviewer?.displayName || "Anonymous"}
            </div>

            <div className="flex items-center gap-3 mt-1">
              <div className="gap-0.5 flex flex-row">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={13} fill="orange" color="orange" />
                ))}
              </div>

              <span className="text-[0.75rem] text-black/50">
                {new Date(review.createTime).toLocaleDateString()}
              </span>
            </div>
          </div>

          <GoogleIcon className="w-5 h-5" />
        </div>

        {/* REVIEW TEXT */}

        <p className="text-[0.87rem] sm:text-[0.95rem] mb-5 leading-relaxed text-black/80">
          {isExpanded ? fullText : shortText}

          {shouldTruncate && (
            <button
              onClick={onToggle}
              className="ml-1 text-violet-700 text-sm hover:underline"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        {/* OWNER REPLY */}

        {review.reviewReply && (
          <div className="bg-white relative">
            <div className="absolute top-0 left-0 w-0.5 h-full border border-l bg-gray-200 border-gray-200/50 rounded-full"></div>

            <div className="pl-5">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="text-[0.68rem] text-black/50 font-semibold">
                  Response from the owner
                </div>
              </div>

              <p className="text-[0.87rem] leading-relaxed text-black/60">
                {isReplyExpanded ? fullReply : shortReply}

                {shouldTruncateReply && (
                  <button
                    onClick={onReplyToggle}
                    className="ml-1 text-violet-700 hover:underline"
                  >
                    {isReplyExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// const ReviewCard = ({ review, isExpanded, onToggle }) => {
//   const fullText = review.comment || "No review text";

//   const shortText =
//     fullText.length > 260 ? `${fullText.slice(0, 260)}...` : fullText;

//   const shouldTruncate = fullText.length > 260;

//   const fullReply = review.reviewReply.comment || "";
//   const shortReply =
//     fullReply.length > 260 ? `${fullReply.slice(0, 260)}...` : fullReply;

//   const ratingMap = {
//     ONE: 1,
//     TWO: 2,
//     THREE: 3,
//     FOUR: 4,
//     FIVE: 5,
//   };

//   const rating = ratingMap[review.starRating] || 5;

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/30 transition-colors">
//       <div className="p-6">
//         {/* HEADER */}

//         <div className="flex items-start gap-3 mb-4">
//           <img
//             src={review.reviewer?.profilePhotoUrl}
//             alt={review.reviewer?.displayName}
//             className="w-12 h-12 rounded-full object-cover border border-white/10"
//           />

//           <div className="flex-1">
//             <div className="font-semibold text-black text-[0.95rem]">
//               {review.reviewer?.displayName || "Anonymous"}
//             </div>

//             <div className="flex items-center gap-3 mt-1">
//               <div className="gap-0.5 flex flex-row">
//                 {[...Array(rating)].map((_, i) => (
//                   <Star key={i} size={13} fill="orange" color="orange" />
//                 ))}
//               </div>

//               <span className="text-[0.75rem] text-black/50">
//                 {new Date(review.createTime).toLocaleDateString()}
//               </span>
//             </div>
//           </div>

//           <GoogleIcon className="w-5 h-5" />
//         </div>

//         {/* REVIEW TEXT */}

//         <p className="text-[0.87rem] sm:text-[0.95rem] mb-5 leading-relaxed text-black/80">
//           {isExpanded ? fullText : shortText}

//           {shouldTruncate && (
//             <button
//               onClick={onToggle}
//               className="ml-1 text-violet-700 text-sm hover:underline"
//             >
//               {isExpanded ? "Show less" : "Read more"}
//             </button>
//           )}
//         </p>

//         {/* OWNER REPLY */}

//         {/* {review.reviewReply && (
//           <div className="border-t border-violet-500/10 pt-5">
//             <div className="text-violet-300 text-sm font-medium mb-2">
//               Response from the owner
//             </div>

//             <p className="text-white/60 text-sm leading-relaxed">
//               {review.reviewReply.comment}
//             </p>
//           </div>
//         )} */}
//         {review.reviewReply && (
//           <div className="bg-white relative">
//             <div className="absolute top-0 left-0 w-0.5 h-full border border-l bg-gray-200 border-gray-200/50 rounded-full"></div>
//             <div className="pl-5">
//               <div className="flex items-center gap-2.5">
//                 <div className="text-[0.68rem] text-black/50 font-semibold">
//                   Response from the owner
//                 </div>
//               </div>
//               <p className="text-[0.87rem] leading-relaxed text-black/60">
//                 {/* {review.reviewReply.comment} */}
//                 {isExpanded ? fullReply : shortReply}

//                 {shouldTruncate && (
//                   <button
//                     onClick={onToggle}
//                     className="ml-1 text-violet-700 text-sm hover:underline"
//                   >
//                     {isExpanded ? "Show less" : "Read more"}
//                   </button>
//                 )}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

/*
=========================================
GOOGLE ICON
=========================================
*/

const GoogleIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default GoogleReviews;

// import { useEffect, useState } from "react";
// import {
//   Star,
//   ExternalLink,
//   ThumbsUp,
//   Share2,
//   RefreshCw,
//   Image as ImageIcon,
// } from "lucide-react";

// const GoogleReviews = () => {
//   const [activeTab, setActiveTab] = useState("All reviews");
//   const [expandedReviews, setExpandedReviews] = useState({});

//   const toggleExpand = (id) => {
//     setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const tabs = [
//     "All reviews",
//     "⭐⭐⭐⭐⭐ 5 stars",
//     "⭐⭐⭐⭐ 4 stars",
//     "With photos",
//     "With reply",
//   ];

//   useEffect(() => {
//     const fetchGoogleReviews = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/auth/google/reviews`,
//         );

//         const data = await response.json();

//         console.log("Google Reviews:", data);

//         // Example:
//         // setReviews(data.reviews);
//       } catch (error) {
//         console.error("Failed to fetch Google reviews:", error);
//       }
//     };

//     fetchGoogleReviews();
//   }, []);

//   return (
//     <section className="relative py-20 px-6 overflow-hidden bg-[#050508] text-white font-sans selection:bg-violet-500/30">
//       {/* Background Noise/Grain Overlay */}
//       <div className="absolute inset-0 pointer-events-none opacity-30 noise-bg"></div>

//       <div className="relative z-10 max-w-[860px] mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <span className="block mb-3 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8b5cf6] font-sora">
//             What clients say
//           </span>
//           <h2 className="text-4xl md:text-5xl font-semibold mb-3 font-sora gradient-text-2-2 leading-tight">
//             Trusted by our community
//           </h2>
//           <p className="text-white/50 text-sm md:text-base mb-6">
//             Real reviews directly from our Google Business Profile
//           </p>
//           <div className="h-px max-w-160 mx-auto bg-linear-to-r from-transparent via-violet-500/45 to-transparent"></div>
//         </div>

//         {/* Rating Overview */}
//         <div className="flex flex-wrap items-center gap-8 p-8 mb-9 glass-card-2-2 rounded-2xl">
//           <div className="flex flex-col items-center min-w-20">
//             <div className="text-5xl font-semibold font-sora violet-gradient-text-2 leading-none">
//               4.8
//             </div>
//             <div className="flex gap-0.75 my-2 text-[#f59e0b]">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} size={16} fill="currentColor" />
//               ))}
//             </div>
//             <div className="text-[0.75rem] text-white/45">128 reviews</div>
//           </div>

//           <div className="flex-1 min-w-50 flex flex-col gap-2">
//             {[
//               { label: "5", width: "82%", count: 105, opacity: "1" },
//               { label: "4", width: "12%", count: 15, opacity: "0.65" },
//               { label: "3", width: "4%", count: 5, opacity: "0.4" },
//               { label: "2", width: "2%", count: 2, opacity: "0.3" },
//               { label: "1", width: "1%", count: 1, opacity: "0.2" },
//             ].map((row) => (
//               <div
//                 key={row.label}
//                 className="flex items-center gap-3 text-[0.78rem]"
//               >
//                 <span className="w-9 text-right text-white/50">
//                   {row.label}
//                 </span>
//                 <Star
//                   size={12}
//                   className="text-[#f59e0b]"
//                   fill="currentColor"
//                 />
//                 <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-linear-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full transition-all duration-700"
//                     style={{ width: row.width, opacity: row.opacity }}
//                   ></div>
//                 </div>
//                 <span className="w-6 text-white/40 text-[0.75rem]">
//                   {row.count}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col items-center gap-2 pl-2">
//             <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[0.78rem] text-white/60">
//               <GoogleIcon className="w-4 h-4" />
//               Google Reviews
//             </div>
//             <a
//               href="#"
//               className="flex items-center gap-1 text-[0.72rem] text-violet-400/70 hover:text-violet-300 transition-colors"
//             >
//               View on Google <ExternalLink size={11} />
//             </a>
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex flex-wrap gap-2 mb-7">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-1.5 rounded-full border text-[0.8rem] transition-all duration-200 ${
//                 activeTab === tab
//                   ? "bg-violet-500/20 border-violet-500/60 text-violet-200"
//                   : "bg-transparent border-white/10 text-white/50 hover:border-violet-500/40 hover:text-white/80"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Reviews List */}
//         <div className="flex flex-col gap-4">
//           <ReviewCard
//             id="rev1"
//             name="Sarah Andersen"
//             badge="Local Guide · Level 7"
//             date="3 weeks ago"
//             text="Absolutely outstanding experience from start to finish. The team was professional, responsive, and delivered everything on time — actually ahead of schedule. What really impressed me was how proactively they communicated throughout the project."
//             isExpanded={expandedReviews["rev1"]}
//             onToggle={() => toggleExpand("rev1")}
//             hasPhotos
//             reply={{
//               name: "Alex Johnson",
//               text: "Thank you so much for this wonderful review, Sarah! We're thrilled to hear that the project exceeded your expectations.",
//             }}
//           />
//         </div>

//         <div className="flex justify-center mt-9">
//           <button className="flex items-center gap-2 px-7 py-2.5 rounded-full border border-violet-500/35 bg-violet-500/10 text-[#c4b5fd] text-sm font-medium hover:bg-violet-500/20 hover:border-violet-500/60 hover:text-white transition-all duration-300">
//             <RefreshCw size={16} /> Load more reviews
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Sub-component for individual review cards
// const ReviewCard = ({
//   id,
//   name,
//   badge,
//   date,
//   text,
//   isExpanded,
//   onToggle,
//   hasPhotos,
//   reply,
// }) => (
//   <div
//     className="glass-card-2-2 rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/30 transition-colors"
//     id={id}
//   >
//     <div className="p-6">
//       <div className="flex items-start gap-3 mb-3.5">
//         <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-linear-to-br from-violet-500/15 to-violet-900/15 text-violet-300 border border-white/10">
//           {name.charAt(0)}
//         </div>
//         <div className="flex-1">
//           <div className="flex items-center gap-2 flex-wrap text-[0.92rem] font-semibold">
//             {name}
//             {badge && (
//               <span className="text-[0.65rem] bg-violet-500/20 border border-violet-500/35 text-violet-200 px-1.5 py-0.5 rounded uppercase">
//                 {badge}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-2 mt-1">
//             <div className="flex gap-0.5 text-[#f59e0b]">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} size={13} fill="currentColor" />
//               ))}
//             </div>
//             <span className="text-[0.75rem] text-white/40">{date}</span>
//           </div>
//         </div>
//         <GoogleIcon className="w-3.5 h-3.5 ml-auto" />
//       </div>

//       <p className="text-[0.9rem] leading-relaxed text-white/80">
//         {text}
//         <button
//           onClick={onToggle}
//           className="ml-1 text-violet-400 font-medium hover:underline text-xs"
//         >
//           {isExpanded ? "Show less" : "More"}
//         </button>
//       </p>

//       {hasPhotos && (
//         <div className="flex gap-2 mt-4">
//           {[1, 2].map((i) => (
//             <div
//               key={i}
//               className="w-[72px] h-[72px] rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
//             >
//               <ImageIcon size={20} className="text-violet-500/60" />
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="flex gap-4 mt-4">
//         <button className="flex items-center gap-1.5 text-[0.78rem] text-white/40 hover:text-white/70 transition-colors">
//           <ThumbsUp size={14} /> Helpful
//         </button>
//         <button className="flex items-center gap-1.5 text-[0.78rem] text-white/40 hover:text-white/70 transition-colors">
//           <Share2 size={14} /> Share
//         </button>
//       </div>
//     </div>

//     {reply && (
//       <div className="bg-violet-500/5 border-t border-violet-500/15 p-6 relative">
//         <div className="absolute top-6 left-6 w-[2px] h-[calc(100%-48px)] bg-gradient-to-b from-violet-500/60 to-transparent rounded-full"></div>
//         <div className="pl-5">
//           <div className="flex items-center gap-2.5 mb-2">
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] flex items-center justify-center text-[0.7rem] font-bold border border-violet-500/40">
//               AJ
//             </div>
//             <div>
//               <div className="text-[0.85rem] font-semibold text-violet-200">
//                 {reply.name}
//               </div>
//               <div className="text-[0.68rem] text-violet-500/70">
//                 Owner · Response from business
//               </div>
//             </div>
//           </div>
//           <p className="text-[0.87rem] leading-relaxed text-white/60">
//             {reply.text}
//           </p>
//         </div>
//       </div>
//     )}
//   </div>
// );

// const GoogleIcon = ({ className }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//       fill="#4285F4"
//     />
//     <path
//       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//       fill="#34A853"
//     />
//     <path
//       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//       fill="#FBBC05"
//     />
//     <path
//       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//       fill="#EA4335"
//     />
//   </svg>
// );

// export default GoogleReviews;
