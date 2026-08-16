import { useMemo } from "react";

function SeasonalDecor() {
  const season = useMemo(() => {
    const month = new Date().getMonth();

    if (month === 11 || month === 0 || month === 1) {
      return "winter";
    }

    if (month >= 2 && month <= 4) {
      return "spring";
    }

    if (month >= 5 && month <= 7) {
      return "summer";
    }

    return "autumn";
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[30] overflow-hidden"
    >
      {season === "spring" && <SpringDecor />}
      {season === "summer" && <SummerDecor />}
      {season === "autumn" && <AutumnDecor />}
      {season === "winter" && <WinterDecor />}
    </div>
  );
}

/* ========================================
   SPRING
======================================== */

function SpringDecor() {
  const petals = [
    {
      left: "5%",
      size: 10,
      duration: "19s",
      delay: "-4s",
      animation: "season-fall-right",
    },
    {
      left: "15%",
      size: 8,
      duration: "24s",
      delay: "-15s",
      animation: "season-fall-left",
    },
    {
      left: "34%",
      size: 7,
      duration: "28s",
      delay: "-9s",
      animation: "season-fall-right",
    },
    {
      left: "65%",
      size: 8,
      duration: "25s",
      delay: "-18s",
      animation: "season-fall-left",
    },
    {
      left: "82%",
      size: 10,
      duration: "22s",
      delay: "-7s",
      animation: "season-fall-right",
    },
    {
      left: "95%",
      size: 8,
      duration: "27s",
      delay: "-20s",
      animation: "season-fall-left",
    },
  ];

  return (
    <>
      <Branch side="left" tone="spring" />
      <Branch side="right" tone="spring" />

      {petals.map((petal, index) => (
        <span
          key={index}
          className={`season-particle ${petal.animation} absolute top-[-50px] rounded-[70%_30%_70%_30%] bg-[#F0B9D0]/70 shadow-[0_2px_6px_rgba(0,0,0,0.08)]`}
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        />
      ))}
    </>
  );
}

/* ========================================
   SUMMER
======================================== */

function SummerDecor() {
  const leaves = [
    {
      left: "4%",
      size: 11,
      duration: "21s",
      delay: "-5s",
      animation: "season-fall-right",
    },
    {
      left: "14%",
      size: 8,
      duration: "27s",
      delay: "-16s",
      animation: "season-fall-left",
    },
    {
      left: "32%",
      size: 7,
      duration: "30s",
      delay: "-10s",
      animation: "season-fall-right",
    },
    {
      left: "68%",
      size: 7,
      duration: "29s",
      delay: "-20s",
      animation: "season-fall-left",
    },
    {
      left: "84%",
      size: 10,
      duration: "24s",
      delay: "-8s",
      animation: "season-fall-right",
    },
    {
      left: "96%",
      size: 8,
      duration: "28s",
      delay: "-22s",
      animation: "season-fall-left",
    },
  ];

  return (
    <>
      <Branch side="left" tone="summer" />
      <Branch side="right" tone="summer" />

      {leaves.map((leaf, index) => (
        <span
          key={index}
          className={`season-particle ${leaf.animation} absolute top-[-50px] rounded-[85%_15%_85%_15%] bg-[#668F58]/65 shadow-[0_2px_6px_rgba(0,0,0,0.10)] dark:bg-[#8BAD7D]/65`}
          style={{
            left: leaf.left,
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.65}px`,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
          }}
        />
      ))}
    </>
  );
}

/* ========================================
   AUTUMN
======================================== */

function AutumnDecor() {
  const leaves = [
    {
      left: "4%",
      size: 11,
      duration: "19s",
      delay: "-4s",
      color: "#D98A3A",
      animation: "season-fall-right",
    },
    {
      left: "16%",
      size: 9,
      duration: "25s",
      delay: "-14s",
      color: "#C96F32",
      animation: "season-fall-left",
    },
    {
      left: "34%",
      size: 7,
      duration: "29s",
      delay: "-9s",
      color: "#E0A04A",
      animation: "season-fall-right",
    },
    {
      left: "66%",
      size: 8,
      duration: "27s",
      delay: "-18s",
      color: "#B85D2A",
      animation: "season-fall-left",
    },
    {
      left: "83%",
      size: 11,
      duration: "22s",
      delay: "-7s",
      color: "#E4A44E",
      animation: "season-fall-right",
    },
    {
      left: "95%",
      size: 8,
      duration: "28s",
      delay: "-21s",
      color: "#C87937",
      animation: "season-fall-left",
    },
  ];

  return (
    <>
      <Branch side="left" tone="autumn" />
      <Branch side="right" tone="autumn" />

      {leaves.map((leaf, index) => (
        <span
          key={index}
          className={`season-particle ${leaf.animation} absolute top-[-50px] rounded-[85%_15%_85%_15%] opacity-70 shadow-[0_2px_6px_rgba(0,0,0,0.10)]`}
          style={{
            left: leaf.left,
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.6}px`,
            backgroundColor: leaf.color,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
          }}
        />
      ))}
    </>
  );
}

/* ========================================
   WINTER
======================================== */

function WinterDecor() {
  const snowflakes = [
    {
      left: "5%",
      size: 4,
      duration: "19s",
      delay: "-4s",
      animation: "season-snow-left",
    },
    {
      left: "16%",
      size: 3,
      duration: "24s",
      delay: "-12s",
      animation: "season-snow-right",
    },
    {
      left: "29%",
      size: 5,
      duration: "21s",
      delay: "-7s",
      animation: "season-snow-left",
    },
    {
      left: "43%",
      size: 3,
      duration: "27s",
      delay: "-17s",
      animation: "season-snow-right",
    },
    {
      left: "61%",
      size: 4,
      duration: "23s",
      delay: "-10s",
      animation: "season-snow-left",
    },
    {
      left: "75%",
      size: 3,
      duration: "26s",
      delay: "-15s",
      animation: "season-snow-right",
    },
    {
      left: "87%",
      size: 5,
      duration: "20s",
      delay: "-6s",
      animation: "season-snow-left",
    },
    {
      left: "96%",
      size: 3,
      duration: "29s",
      delay: "-22s",
      animation: "season-snow-right",
    },
  ];

  return (
    <>
      <div className="absolute left-[-180px] top-[120px] h-[350px] w-[350px] rounded-full bg-[#A8D0FF]/10 blur-[110px]" />

      <div className="absolute right-[-180px] top-[350px] h-[400px] w-[400px] rounded-full bg-[#D7EAFF]/10 blur-[120px]" />

      {snowflakes.map((flake, index) => (
        <span
          key={index}
          className={`season-particle ${flake.animation} absolute top-[-30px] rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.55)]`}
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
          }}
        />
      ))}
    </>
  );
}

/* ========================================
   BRANCHES
======================================== */

function Branch({ side, tone }) {
  const isLeft = side === "left";

  const colors = {
    spring: {
      branch: "#795F4C",
      leaf: "#88B67E",
      leafSecondary: "#A9CD9F",
    },

    summer: {
      branch: "#66503E",
      leaf: "#557D49",
      leafSecondary: "#729C65",
    },

    autumn: {
      branch: "#694832",
      leaf: "#B96832",
      leafSecondary: "#D48A3F",
    },
  };

  const currentColors = colors[tone] || colors.summer;

  return (
    <div
      className={`absolute top-[120px] hidden h-[320px] w-[220px] md:block ${
        isLeft
          ? "left-[-155px] rotate-[3deg]"
          : "right-[-155px] -rotate-[3deg] scale-x-[-1]"
      }`}
    >
      <div className="season-branch h-full w-full opacity-[0.32] dark:opacity-[0.25]">
        <svg viewBox="0 0 200 300" className="h-full w-full" fill="none">
          {/* MAIN BRANCH */}

          <path
            d="M5 15C42 45 58 91 78 122C101 157 134 179 163 236"
            stroke={currentColors.branch}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* SMALL BRANCHES */}

          <path
            d="M48 74C79 60 105 43 133 20"
            stroke={currentColors.branch}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M72 115C48 111 27 100 10 84"
            stroke={currentColors.branch}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M101 155C132 143 156 122 177 95"
            stroke={currentColors.branch}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M130 190C101 209 82 229 66 259"
            stroke={currentColors.branch}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M150 216C171 205 184 191 195 174"
            stroke={currentColors.branch}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* LEAVES */}

          <Leaf x={130} y={22} rotation={35} color={currentColors.leaf} />

          <Leaf
            x={99}
            y={48}
            rotation={-25}
            color={currentColors.leafSecondary}
          />

          <Leaf x={62} y={68} rotation={30} color={currentColors.leaf} />

          <Leaf
            x={20}
            y={88}
            rotation={-35}
            color={currentColors.leafSecondary}
          />

          <Leaf x={55} y={111} rotation={45} color={currentColors.leaf} />

          <Leaf
            x={92}
            y={136}
            rotation={-30}
            color={currentColors.leafSecondary}
          />

          <Leaf x={158} y={115} rotation={40} color={currentColors.leaf} />

          <Leaf
            x={139}
            y={151}
            rotation={-25}
            color={currentColors.leafSecondary}
          />

          <Leaf x={119} y={186} rotation={35} color={currentColors.leaf} />

          <Leaf
            x={82}
            y={226}
            rotation={-35}
            color={currentColors.leafSecondary}
          />

          <Leaf x={158} y={213} rotation={40} color={currentColors.leaf} />

          <Leaf
            x={169}
            y={242}
            rotation={-25}
            color={currentColors.leafSecondary}
          />
        </svg>
      </div>
    </div>
  );
}

/* ========================================
   LEAF
======================================== */

function Leaf({ x, y, rotation, color }) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx="11"
      ry="20"
      transform={`rotate(${rotation} ${x} ${y})`}
      fill={color}
    />
  );
}

export default SeasonalDecor;
