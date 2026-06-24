import Image from "next/image";

const LogoConveyor = ({ data }) => {
  // Split data into 3 chunks
  const rowCount = 3;
  const rows = Array.from({ length: rowCount }, (_, i) =>
    data.filter((_, index) => index % rowCount === i),
  );

  const gradText = {
    background: "linear-gradient(to right, #a78bfa, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <section className="relative overflow-hidden min-h-200 bg-[#030014] flex flex-col items-center justify-center py-20">
      {/* Ambient Blobs */}
      <div
        className="absolute w-130 h-130 rounded-full -top-20 -right-16 pointer-events-none opacity-30"
        style={{ background: "rgba(139,92,246,0.12)", filter: "blur(130px)" }}
      />
      <div
        className="absolute w-95 h-95 rounded-full bottom-10 -left-20 pointer-events-none opacity-20"
        style={{ background: "rgba(99,58,200,0.08)", filter: "blur(130px)" }}
      />

      {/* Header */}
      <div className="z-10 text-center mb-24 px-6">
        <div className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 mb-8 border border-purple-500/30 text-[11px] font-semibold tracking-widest uppercase text-violet-400 bg-purple-950/10">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Industry Partners
        </div>
        <h2 className="font-sora font-extrabold text-2xl sm:text-4xl md:text-5xl text-white mb-6">
          Our<span style={gradText}> Clients</span>
        </h2>
      </div>

      {/* Conveyor Belts */}
      <div className="w-full flex flex-col gap-10 overflow-hidden relative">
        {/* Edge Fades - Makes it look infinite */}
        <div className="absolute inset-y-0 left-0 w-10 sm:w-40 bg-linear-to-r from-[#030014] via-[#030014]/80 to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-10 sm:w-40 bg-linear-to-l from-[#030014] via-[#030014]/80 to-transparent z-20" />

        {rows.map((rowItems, idx) => (
          <div key={idx} className="flex">
            <div
              className={`conveyor-track gap-10 ${
                idx === 1
                  ? "animate-marquee-slow-reverse"
                  : "animate-marquee-slow"
              }`}
            >
              {/* Loop 6 times to ensure zero gaps even on ultra-wide screens */}
              {[
                ...rowItems,
                ...rowItems,
                ...rowItems,
                ...rowItems,
                ...rowItems,
                ...rowItems,
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-2 px-12 py-2 sm:py-5 rounded-4xl border border-white/5 bg-white/2 backdrop-blur-xl hover:bg-white/5 hover:border-purple-500/20 transition-all duration-500 min-w-70 md:min-w-75"
                >
                  <Image
                    src={item.logo}
                    alt={item.name}
                    height={80}
                    width={160}
                    style={{ width: "auto", height: "80px" }}
                    className="object-contain transition-transform duration-500 hover:scale-110"
                  />
                  <div className="mt-2 flex justify-center">
                    <span className="text-violet-400/80 text-[10px] font-bold uppercase tracking-[0.3em] text-center">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoConveyor;

//   // Grouping data by domain
//   const groupedData = data.reduce((acc, item) => {
//     if (!acc[item.domain]) acc[item.domain] = [];
//     acc[item.domain].push(item);
//     return acc;
//   }, {});

//   const gradText = {
//     background: "linear-gradient(to right, #a78bfa, #8b5cf6)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   };

//   return (
//     <section className="relative overflow-hidden min-h-screen bg-[#030014] flex flex-col items-center justify-center py-24 px-6">
//       {/* Ambient Blobs (from your theme) */}
//       <div
//         className="absolute w-130 h-130 rounded-full -top-20 -right-16 pointer-events-none opacity-50"
//         style={{ background: "rgba(139,92,246,0.14)", filter: "blur(130px)" }}
//       />
//       <div
//         className="absolute w-95 h-95 rounded-full bottom-20 -left-20 pointer-events-none opacity-50"
//         style={{ background: "rgba(99,58,200,0.09)", filter: "blur(130px)" }}
//       />

//       {/* Header Section */}
//       <div className="z-10 text-center mb-16">
//         <div className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 mb-8 border border-purple-500/30 text-[11px] font-semibold tracking-widest uppercase text-violet-400 bg-purple-950/10">
//           <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
//           Our Ecosystem
//         </div>
//         <h2 className="font-sora font-extrabold text-4xl md:text-5xl text-white mb-4">
//           Trusted by Industry <span style={gradText}>Leaders</span>
//         </h2>
//       </div>

//       {/* Conveyor Belts Container */}
//       <div className="w-full max-w-6xl space-y-12 z-10">
//         {Object.entries(groupedData).map(([domain, items], idx) => (
//           <div key={domain} className="space-y-4">
//             <h3 className="text-violet-400/60 text-[10px] uppercase tracking-[0.2em] font-bold px-4">
//               {domain}
//             </h3>

//             <div className="relative group overflow-hidden">
//               {/* Fade Edges Mask */}
//               <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#030014] to-transparent z-20" />
//               <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-[#030014] to-transparent z-20" />

//               {/* The Belt */}
//               <div
//                 className={`flex gap-8 pause-on-hover ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}
//               >
//                 <div className="animate-marquee flex gap-8 py-4">
//                   {/* Duplicate items for seamless loop */}
//                   {[...items, ...items, ...items].map((logo, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center justify-center px-8 py-4 rounded-2xl border border-purple-500/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 transition-colors min-w-40"
//                     >
//                       <img
//                         src={logo.logo}
//                         alt={logo.name}
//                         className="h-8 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default LogoConveyor;
