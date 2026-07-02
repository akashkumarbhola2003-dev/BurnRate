// import React, { useEffect } from "react";
// import styles from "../styles/BRLogo.module.css";

// import aaonxt from "../assets/aaonxt.png";
// import spotify from "../assets/spotify.png";
// import prime from "../assets/prime.png";
// import cultfit from "../assets/cultfit.png";
// import netflix from "../assets/netflix.png";
// import youtube from "../assets/youtube.png";

// function BRLogo() {

//   useEffect(() => {

//     const timer = setTimeout(() => {
//       console.log("Splash Finished");
//     }, 6000);

//     return () => clearTimeout(timer);

//   }, []);

//   return (

//     <div className={styles.splashContainer}>

//       <div className={styles.fire}>🔥</div>

//       <img
//         src={aaonxt}
//         alt="AaoNXT"
//         className={`${styles.icon} ${styles.aaonxt}`}
//       />

//       <img
//         src={cultfit}
//         alt="CultFit"
//         className={`${styles.icon} ${styles.cultfit}`}
//       />

//       <img
//         src={netflix}
//         alt="Netflix"
//         className={`${styles.icon} ${styles.netflix}`}
//       />

//       <img
//         src={spotify}
//         alt="Spotify"
//         className={`${styles.icon} ${styles.spotify}`}
//       />

//       <img
//         src={prime}
//         alt="Prime"
//         className={`${styles.icon} ${styles.prime}`}
//       />

//       <img
//         src={youtube}
//         alt="YouTube"
//         className={`${styles.icon} ${styles.youtube}`}
//       />

//       <h1 className={styles.title}>
//         BurnRate
//       </h1>

//     </div>

//   );
// }

// export default BRLogo;










import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/BRLogo.module.css";

import aaonxt  from "../assets/aaonxt.png";
import spotify from "../assets/spotify.png";
import prime   from "../assets/prime.png";
import cultfit from "../assets/cultfit.png";
import netflix from "../assets/netflix.png";
import youtube from "../assets/youtube.png";

// onFinish is called when the full animation completes —
// the parent (SplashRoute in App.jsx) decides what happens next
function BRLogo({ onFinish }) {
  const [burst, setBurst] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const burstTimer = setTimeout(() => {
      setBurst(true);
      spawnParticles();
    }, 6500);

    const cursorTimer = setTimeout(() => {
      setShowCursor(true);
    }, 7000);

    // After the full animation plays out, tell the parent we're done
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 9000);

    return () => {
      clearTimeout(burstTimer);
      clearTimeout(cursorTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const spawnParticles = () => {
    const container = containerRef.current;
    if (!container) return;
    const colors = ["#f97316", "#ef4444", "#fbbf24", "#fb923c", "#fff"];

    for (let i = 0; i < 45; i++) {
      const el = document.createElement("div");
      el.className = styles.particle;
      const angle = Math.random() * 360;
      const dist  = 70 + Math.random() * 160;
      const dx    = Math.cos((angle * Math.PI) / 180) * dist;
      const dy    = Math.sin((angle * Math.PI) / 180) * dist;
      const dur   = 0.5 + Math.random() * 0.8;
      const size  = 3 + Math.random() * 5;

      el.style.cssText = `
        --dx: ${dx}px;
        --dy: ${dy}px;
        --dur: ${dur}s;
        --delay: ${Math.random() * 0.25}s;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), (dur + 0.5) * 1000);
    }
  };

  const icons = [
    { src: netflix, alt: "Netflix", cls: styles.netflix },
    { src: spotify, alt: "Spotify", cls: styles.spotify },
    { src: prime,   alt: "Prime",   cls: styles.prime   },
    { src: cultfit, alt: "CultFit", cls: styles.cultfit },
    { src: aaonxt,  alt: "AaoNXT",  cls: styles.aaonxt  },
    { src: youtube, alt: "YouTube", cls: styles.youtube },
  ];

  return (
    <div className={styles.splashContainer} ref={containerRef}>
      <div className={styles.scene}>
        <div className={styles.ring1} style={{position:'absolute',borderRadius:'50%',border:'1.5px solid rgba(249,115,22,0.3)',width:'340px',height:'120px',top:'50%',left:'50%',marginTop:'-60px',marginLeft:'-170px',transform:'rotateX(75deg)'}} />
        <div className={styles.ring2} style={{position:'absolute',borderRadius:'50%',border:'1.5px solid rgba(249,115,22,0.25)',width:'400px',height:'140px',top:'50%',left:'50%',marginTop:'-70px',marginLeft:'-200px',transform:'rotateX(72deg) rotateZ(60deg)'}} />
        <div className={styles.ring3} style={{position:'absolute',borderRadius:'50%',border:'1.5px solid rgba(249,115,22,0.2)',width:'360px',height:'130px',top:'50%',left:'50%',marginTop:'-65px',marginLeft:'-180px',transform:'rotateX(70deg) rotateZ(120deg)'}} />

        <div className={styles.fire}>🔥</div>

        {icons.map(({ src, alt, cls }) => (
          <img
            key={alt}
            src={src}
            alt={alt}
            className={`${styles.icon} ${cls} ${burst ? styles.fadeOut : ""}`}
          />
        ))}
      </div>

      <div className={styles.logoRow}>
        <span className={styles.logoFire}>🔥</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.typingText}>
            Burn<span>Rate</span>
          </div>
          {showCursor && <span className={styles.cursorBlink} />}
        </div>
      </div>

      <p className={styles.tagline}>Track what's burning your wallet</p>
    </div>
  );
}

export default BRLogo;