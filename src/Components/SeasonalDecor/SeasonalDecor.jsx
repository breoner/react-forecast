import { useMemo, useState } from "react";

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

  const [isSakura, setIsSakura] = useState(() => {
    return localStorage.getItem("seasonalDecorStyle") === "sakura";
  });

  const toggleSakura = () => {
    setIsSakura((current) => {
      const next = !current;

      localStorage.setItem("seasonalDecorStyle", next ? "sakura" : "seasonal");

      return next;
    });
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[30] overflow-hidden"
    >
      {season === "spring" && (
        <SpringDecor isSakura={isSakura} onToggleSakura={toggleSakura} />
      )}

      {season === "summer" && (
        <SummerDecor isSakura={isSakura} onToggleSakura={toggleSakura} />
      )}

      {season === "autumn" && (
        <AutumnDecor isSakura={isSakura} onToggleSakura={toggleSakura} />
      )}

      {season === "winter" && <WinterDecor />}
    </div>
  );
}

/* ========================================
   SPRING
======================================== */

function SpringDecor({ isSakura, onToggleSakura }) {
  return (
    <>
      <Branch
        side="left"
        tone="spring"
        isSakura={isSakura}
        onClick={onToggleSakura}
      />

      <Branch
        side="right"
        tone="spring"
        isSakura={isSakura}
        onClick={onToggleSakura}
      />

      {isSakura ? <SakuraParticles /> : <SpringParticles />}
    </>
  );
}

function SpringParticles() {
  const petals = [
    ["5%", 10, "19s", "-4s", "season-fall-right"],
    ["15%", 8, "24s", "-15s", "season-fall-left"],
    ["34%", 7, "28s", "-9s", "season-fall-right"],
    ["65%", 8, "25s", "-18s", "season-fall-left"],
    ["82%", 10, "22s", "-7s", "season-fall-right"],
    ["95%", 8, "27s", "-20s", "season-fall-left"],
  ];

  return petals.map(([left, size, duration, delay, animation], index) => (
    <span
      key={index}
      className={`season-particle ${animation} absolute top-[-50px] rounded-[70%_30%_70%_30%] bg-[#F0B9D0]/70`}
      style={{
        left,
        width: `${size}px`,
        height: `${size * 1.4}px`,
        animationDuration: duration,
        animationDelay: delay,
      }}
    />
  ));
}

/* ========================================
   SUMMER
======================================== */

function SummerDecor({ isSakura, onToggleSakura }) {
  return (
    <>
      <Branch
        side="left"
        tone="summer"
        isSakura={isSakura}
        onClick={onToggleSakura}
      />

      <Branch
        side="right"
        tone="summer"
        isSakura={isSakura}
        onClick={onToggleSakura}
      />

      {isSakura ? <SakuraParticles /> : <SummerParticles />}
    </>
  );
}

function SummerParticles() {
  const leaves = [
    ["4%", 11, "21s", "-5s", "season-fall-right"],
    ["14%", 8, "27s", "-16s", "season-fall-left"],
    ["32%", 7, "30s", "-10s", "season-fall-right"],
    ["68%", 7, "29s", "-20s", "season-fall-left"],
    ["84%", 10, "24s", "-8s", "season-fall-right"],
    ["96%", 8, "28s", "-22s", "season-fall-left"],
  ];

  return leaves.map(([left, size, duration, delay, animation], index) => (
    <span
      key={index}
      className={`season-particle ${animation} absolute top-[-50px] rounded-[85%_15%_85%_15%] bg-[#668F58]/65 shadow-[0_2px_6px_rgba(0,0,0,0.10)] dark:bg-[#8BAD7D]/65`}
      style={{
        left,
        width: `${size}px`,
        height: `${size * 1.65}px`,
        animationDuration: duration,
        animationDelay: delay,
      }}
    />
  ));
}

/* ========================================
   AUTUMN
======================================== */

function AutumnDecor({ isSakura, onToggleSakura }) {
  return (
    <>
      <Branch
        side="left"
        tone="autumn"
        isSakura={isSakura}
        onClick={onToggleSakura}
      />

      <Branch
        side="right"
        tone="autumn"
        isSakura={isSakura}
        onClick={onToggleSakura}
      />

      {isSakura ? <SakuraParticles /> : <AutumnParticles />}
    </>
  );
}

function AutumnParticles() {
  const leaves = [
    ["4%", 11, "19s", "-4s", "#D98A3A", "season-fall-right"],
    ["16%", 9, "25s", "-14s", "#C96F32", "season-fall-left"],
    ["34%", 7, "29s", "-9s", "#E0A04A", "season-fall-right"],
    ["66%", 8, "27s", "-18s", "#B85D2A", "season-fall-left"],
    ["83%", 11, "22s", "-7s", "#E4A44E", "season-fall-right"],
    ["95%", 8, "28s", "-21s", "#C87937", "season-fall-left"],
  ];

  return leaves.map(
    ([left, size, duration, delay, color, animation], index) => (
      <span
        key={index}
        className={`season-particle ${animation} absolute top-[-50px] rounded-[85%_15%_85%_15%] opacity-70`}
        style={{
          left,
          width: `${size}px`,
          height: `${size * 1.6}px`,
          backgroundColor: color,
          animationDuration: duration,
          animationDelay: delay,
        }}
      />
    ),
  );
}

/* ========================================
   SAKURA PARTICLES
======================================== */

function SakuraParticles() {
  const petals = [
    ["4%", 9, "18s", "-3s", "season-fall-right"],
    ["13%", 7, "24s", "-13s", "season-fall-left"],
    ["25%", 8, "22s", "-7s", "season-fall-right"],
    ["39%", 6, "28s", "-19s", "season-fall-left"],
    ["55%", 7, "25s", "-11s", "season-fall-right"],
    ["70%", 8, "21s", "-5s", "season-fall-left"],
    ["84%", 6, "27s", "-17s", "season-fall-right"],
    ["95%", 9, "23s", "-9s", "season-fall-left"],
  ];

  return petals.map(([left, size, duration, delay, animation], index) => (
    <span
      key={index}
      className={`season-particle ${animation} absolute top-[-50px] rounded-[75%_25%_70%_30%] shadow-[0_2px_7px_rgba(220,120,160,0.16)]`}
      style={{
        left,
        width: `${size}px`,
        height: `${size * 1.35}px`,
        backgroundColor: index % 2 === 0 ? "#F4B8CE" : "#FFD1DF",
        animationDuration: duration,
        animationDelay: delay,
      }}
    />
  ));
}

/* ========================================
   WINTER
======================================== */

function WinterDecor() {
  const snowflakes = [
    ["5%", 4, "19s", "-4s", "season-snow-left"],
    ["16%", 3, "24s", "-12s", "season-snow-right"],
    ["29%", 5, "21s", "-7s", "season-snow-left"],
    ["43%", 3, "27s", "-17s", "season-snow-right"],
    ["61%", 4, "23s", "-10s", "season-snow-left"],
    ["75%", 3, "26s", "-15s", "season-snow-right"],
    ["87%", 5, "20s", "-6s", "season-snow-left"],
    ["96%", 3, "29s", "-22s", "season-snow-right"],
  ];

  return (
    <>
      <div className="absolute left-[-180px] top-[120px] h-[350px] w-[350px] rounded-full bg-[#A8D0FF]/10 blur-[110px]" />

      <div className="absolute right-[-180px] top-[350px] h-[400px] w-[400px] rounded-full bg-[#D7EAFF]/10 blur-[120px]" />

      {snowflakes.map(([left, size, duration, delay, animation], index) => (
        <span
          key={index}
          className={`season-particle ${animation} absolute top-[-30px] rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.55)]`}
          style={{
            left,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: duration,
            animationDelay: delay,
          }}
        />
      ))}
    </>
  );
}

/* ========================================
   BRANCH
======================================== */

function Branch({ side, tone, isSakura, onClick }) {
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

    sakura: {
      branch: "#725044",
      leaf: "#F2AFC7",
      leafSecondary: "#FFD0DE",
    },
  };

  const currentColors = isSakura
    ? colors.sakura
    : colors[tone] || colors.summer;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isSakura ? "Switch to seasonal branch" : "Switch to sakura"}
      className={`pointer-events-auto absolute top-[120px] hidden h-[320px] w-[220px] cursor-pointer border-0 bg-transparent p-0 outline-none md:block ${
        isLeft
          ? "left-[-155px] rotate-[3deg]"
          : "right-[-155px] -rotate-[3deg] scale-x-[-1]"
      }`}
    >
      <div
        className={`season-branch h-full w-full transition-all duration-700 ${
          isSakura
            ? "opacity-[0.46] dark:opacity-[0.42]"
            : "opacity-[0.32] dark:opacity-[0.25]"
        }`}
      >
        <svg viewBox="0 0 200 300" className="h-full w-full" fill="none">
          <path
            d="M5 15C42 45 58 91 78 122C101 157 134 179 163 236"
            stroke={currentColors.branch}
            strokeWidth="5"
            strokeLinecap="round"
            className="transition-all duration-700"
          />

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
    </button>
  );
}

function Leaf({ x, y, rotation, color }) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx="11"
      ry="20"
      transform={`rotate(${rotation} ${x} ${y})`}
      fill={color}
      className="transition-all duration-700"
    />
  );
}

export default SeasonalDecor;
