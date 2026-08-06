/**
 * Atmosphere, not decoration. Warm light pooling behind the paper, a few motes
 * of dust, two hairline curves, and grain over the top. Pure CSS — no JS runs
 * for any of it, and the whole layer is inert to pointers.
 *
 * Positions are hard-coded rather than random so server and client agree.
 */

const MOTES = [
  { left: "8%", top: "18%", size: 3, delay: "0s", duration: "11s" },
  { left: "21%", top: "62%", size: 2, delay: "1.4s", duration: "9s" },
  { left: "33%", top: "31%", size: 2, delay: "3.1s", duration: "13s" },
  { left: "47%", top: "78%", size: 3, delay: "0.7s", duration: "10s" },
  { left: "58%", top: "12%", size: 2, delay: "2.6s", duration: "12s" },
  { left: "69%", top: "47%", size: 3, delay: "4.2s", duration: "9.5s" },
  { left: "77%", top: "84%", size: 2, delay: "1.1s", duration: "14s" },
  { left: "88%", top: "26%", size: 2, delay: "3.7s", duration: "10.5s" },
  { left: "94%", top: "58%", size: 3, delay: "2.2s", duration: "12.5s" },
  { left: "14%", top: "91%", size: 2, delay: "5s", duration: "11.5s" },
  { left: "62%", top: "68%", size: 2, delay: "6.1s", duration: "13.5s" },
  { left: "40%", top: "6%", size: 2, delay: "4.8s", duration: "10s" },
];

export function BackgroundAnimation() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Pools of warm light, drifting slowly enough that you never catch them. */}
      <div className="animate-drift absolute -left-[18%] -top-[22%] h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(217,119,87,0.13),transparent_62%)] blur-[80px]" />
      <div
        className="animate-drift absolute -right-[14%] top-[28%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(227,163,60,0.14),transparent_64%)] blur-[90px]"
        style={{ animationDelay: "-12s", animationDuration: "42s" }}
      />
      <div
        className="animate-drift absolute bottom-[-20%] left-[26%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(217,119,87,0.09),transparent_66%)] blur-[100px]"
        style={{ animationDelay: "-25s", animationDuration: "50s" }}
      />

      {/* Two hairlines, drawn once and left to drift. */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <path
          className="animate-trace"
          d="M-80 250C220 130 420 420 720 330S1160 90 1520 220"
          stroke="rgb(22 19 14 / 0.07)"
          strokeWidth="1"
          strokeDasharray="6 14"
        />
        <path
          className="animate-trace"
          style={{ animationDuration: "88s", animationDirection: "reverse" }}
          d="M-80 690C260 800 480 540 780 620S1180 860 1520 700"
          stroke="rgb(22 19 14 / 0.05)"
          strokeWidth="1"
          strokeDasharray="4 18"
        />
      </svg>

      {/* Dust. */}
      {MOTES.map((mote) => (
        <span
          key={`${mote.left}-${mote.top}`}
          className="animate-float absolute rounded-full bg-ink/20"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
          }}
        />
      ))}

      {/* Paper grain, last so it sits over everything. */}
      <div className="sentinel-noise absolute inset-0 opacity-[0.035] mix-blend-multiply" />

      {/* Lets long pages fade toward the paper edge instead of stopping dead. */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cream-deep/50 to-transparent" />
    </div>
  );
}
