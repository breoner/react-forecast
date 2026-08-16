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
      left: "7%",
      size: 12,
      duration: "17s",
      delay: "-4s",
      animation: "season-fall-left",
    },
    {
      left: "18%",
      size: 9,
      duration: "21s",
      delay: "-12s",
      animation: "season-fall-right",
    },
    {
      left: "38%",
      size: 8,
      duration: "24s",
      delay: "-7s",
      animation: "season-fall-left",
    },
    {
      left: "68%",
      size: 10,
      duration: "19s",
      delay: "-14s",
      animation: "season-fall-right",
    },
    {
      left: "84%",
      size: 12,
      duration: "23s",
      delay: "-5s",
      animation: "season-fall-left",
    },
    {
      left: "95%",
      size: 8,
      duration: "26s",
      delay: "-17s",
      animation: "season-fall-right",
    },
  ];

  return (
    <>
      <Branch side="left" tone="spring" />
      <Branch side="right" tone="spring" />

      {petals.map((petal, index) => (
        <span
          key={index}
          className={`season-particle ${petal.animation} absolute top-[-50px] rounded-[70%_30%_70%_30%] bg-[#F0B9D0]/80 shadow-[0_2px_6px_rgba(0,0,0,0.10)]`}
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
      left: "5%",
      size: 14,
      duration: "19s",
      delay: "-4s",
      animation: "season-fall-right",
    },
    {
      left: "16%",
      size: 11,
      duration: "24s",
      delay: "-15s",
      animation: "season-fall-left",
    },
    {
      left: "34%",
      size: 9,
      duration: "28s",
      delay: "-9s",
      animation: "season-fall-right",
    },
    {
      left: "64%",
      size: 10,
      duration: "25s",
      delay: "-18s",
      animation: "season-fall-left",
    },
    {
      left: "79%",
      size: 13,
      duration: "21s",
      delay: "-7s",
      animation: "season-fall-right",
    },
    {
      left: "92%",
      size: 11,
      duration: "26s",
      delay: "-20s",
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
          className={`season-particle ${leaf.animation} absolute top-[-50px] rounded-[85%_15%_85%_15%] bg-[#668F58]/80 shadow-[0_2px_6px_rgba(0,0,0,0.12)] dark:bg-[#8BAD7D]/85`}
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
      left: "5%",
      size: 14,
      duration: "17s",
      delay: "-4s",
      color: "#D98A3A",
      animation: "season-fall-right",
    },
    {
      left: "17%",
      size: 11,
      duration: "22s",
      delay: "-13s",
      color: "#C96F32",
      animation: "season-fall-left",
    },
    {
      left: "35%",
      size: 9,
      duration: "26s",
      delay: "-8s",
      color: "#E0A04A",
      animation: "season-fall-right",
    },
    {
      left: "59%",
      size: 10,
      duration: "24s",
      delay: "-17s",
      color: "#B85D2A",
      animation: "season-fall-left",
    },
    {
      left: "78%",
      size: 14,
      duration: "20s",
      delay: "-6s",
      color: "#E4A44E",
      animation: "season-fall-right",
    },
    {
      left: "93%",
      size: 11,
      duration: "25s",
      delay: "-19s",
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
          className={`season-particle ${leaf.animation} absolute top-[-50px] rounded-[85%_15%_85%_15%] shadow-[0_2px_6px_rgba(0,0,0,0.14)]`}
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
      size: 5,
      duration: "17s",
      delay: "-4s",
      animation: "season-snow-left",
    },
    {
      left: "16%",
      size: 4,
      duration: "21s",
      delay: "-11s",
      animation: "season-snow-right",
    },
    {
      left: "29%",
      size: 6,
      duration: "19s",
      delay: "-7s",
      animation: "season-snow-left",
    },
    {
      left: "43%",
      size: 3,
      duration: "24s",
      delay: "-16s",
      animation: "season-snow-right",
    },
    {
      left: "61%",
      size: 5,
      duration: "20s",
      delay: "-9s",
      animation: "season-snow-left",
    },
    {
      left: "75%",
      size: 4,
      duration: "23s",
      delay: "-14s",
      animation: "season-snow-right",
    },
    {
      left: "87%",
      size: 6,
      duration: "18s",
      delay: "-5s",
      animation: "season-snow-left",
    },
    {
      left: "96%",
      size: 3,
      duration: "26s",
      delay: "-20s",
      animation: "season-snow-right",
    },
  ];

  return (
    <>
      <div className="absolute left-[-120px] top-[120px] h-[350px] w-[350px] rounded-full bg-[#A8D0FF]/10 blur-[100px]" />

      <div className="absolute right-[-140px] top-[350px] h-[400px] w-[400px] rounded-full bg-[#D7EAFF]/10 blur-[120px]" />

      {snowflakes.map((flake, index) => (
        <span
          key={index}
          className={`season-particle ${flake.animation} absolute top-[-30px] rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.65)]`}
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
   BRANCH
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
      className={`absolute top-[90px] hidden h-[360px] w-[250px] md:block ${
        isLeft
          ? "left-[-45px] rotate-[4deg]"
          : "right-[-45px] -rotate-[4deg] scale-x-[-1]"
      }`}
    >
      <div className="season-branch h-full w-full opacity-[0.55] dark:opacity-[0.48]">
        <svg
          viewBox="0 0 200 300"
          className="h-full w-full"
          fill="none"
        >
          {/* Main branch */}

          <path
            d="M5 15C42 45 58 91 78 122C101 157 134 179 163 236"
            stroke={currentColors.branch}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Secondary branches */}

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

          {/* Leaves */}

          <Leaf
            x={130}
            y={22}
            rotation={35}
            color={currentColors.leaf}
          />

          <Leaf
            x={99}
            y={48}
            rotation={-25}
            color={currentColors.leafSecondary}
          />

          <Leaf
            x={62}
            y={68}
            rotation={30}
            color={currentColors.leaf}
          />

          <Leaf
            x={20}
            y={88}
            rotation={-35}
            color={currentColors.leafSecondary}
          />

          <Leaf
            x={55}
            y={111}
            rotation={45}
            color={currentColors.leaf}
          />

          <Leaf
            x={92}
            y={136}
            rotation={-30}
            color={currentColors.leafSecondary}
          />

          <Leaf
            x={158}
            y={115}
            rotation={40}
            color={currentColors.leaf}
          />

          <Leaf
            x={139}
            y={151}
            rotation={-25}
            color={currentColors.leafSecondary}
          />

          <Leaf
            x={119}
            y={186}
            rotation={35}
            color={currentColors.leaf}
          />

          <Leaf
            x={82}
            y={226}
            rotation={-35}
            color={currentColors.leafSecondary}
          />

          <Leaf
            x={158}
            y={213}
            rotation={40}
            color={currentColors.leaf}
          />

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

function Leaf({
  x,
  y,
  rotation,
  color,
}) {
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