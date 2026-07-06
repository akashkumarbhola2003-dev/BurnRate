import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/BRLogo.module.css";

import aaonxt  from "../assets/aaonxt.png";
import spotify from "../assets/spotify.png";
import prime   from "../assets/prime.png";
import cultfit from "../assets/cultfit.png";
import netflix from "../assets/netflix.png";
import youtube from "../assets/youtube.png";

function BRLogo() {
  const navigate = useNavigate();
  const [burst, setBurst] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("=== BRLogo useEffect STARTED ===");

    const t1 = setTimeout(() => {
      console.log("=== 2s checkpoint ===");
    }, 2000);

    const t2 = setTimeout(() => {
      console.log("=== 4s checkpoint ===");
    }, 4000);

    const burstTimer = setTimeout(() => {
      console.log("=== BURST FIRING ===");
      setBurst(true);
      spawnParticles();
    }, 6500);

    const cursorTimer = setTimeout(() => {
      console.log("=== CURSOR SHOWING ===");
      setShowCursor(true);
    }, 7000);

    const finishTimer = setTimeout(() => {
      console.log("=== NAVIGATING TO / ===");
      navigate("/");
    }, 9000);

    return () => {
      console.log("=== BRLogo useEffect CLEANUP — timers cancelled ===");
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(burstTimer);
      clearTimeout(cursorTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  const spawnParticles = () => {
    const container = containerRef.current;
    if (!container) return;
    const colors = ["#f97316", "#ef4444", "#fbbf24", "#fb923c", "#fff"];
    for (let i = 0; i < 45; i++) {
      const el    = document.createElement("div");
      el.className = styles.particle;
      const angle = Math.random() * 360;
      const dist  = 70 + Math.random() * 160;
      const dx    = Math.cos((angle * Math.PI) / 180) * dist;
      const dy    = Math.sin((angle * Math.PI) / 180) * dist;
      const dur   = 0.5 + Math.random() * 0.8;
      const size  = 3 + Math.random() * 5;
      el.style.cssText = `--dx:${dx}px;--dy:${dy}px;--dur:${dur}s;--delay:${Math.random()*0.25}s;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};`;
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
        <div style={{position:'absolute',borderRadius:'50%',border:'1.5px solid rgba(249,115,22,0.3)',width:'340px',height:'120px',top:'50%',left:'50%',marginTop:'-60px',marginLeft:'-170px',transform:'rotateX(75deg)'}} />
        <div style={{position:'absolute',borderRadius:'50%',border:'1.5px solid rgba(249,115,22,0.25)',width:'400px',height:'140px',top:'50%',left:'50%',marginTop:'-70px',marginLeft:'-200px',transform:'rotateX(72deg) rotateZ(60deg)'}} />
        <div style={{position:'absolute',borderRadius:'50%',border:'1.5px solid rgba(249,115,22,0.2)',width:'360px',height:'130px',top:'50%',left:'50%',marginTop:'-65px',marginLeft:'-180px',transform:'rotateX(70deg) rotateZ(120deg)'}} />
        <div className={styles.fire}>🔥</div>
        {icons.map(({ src, alt, cls }) => (
          <img key={alt} src={src} alt={alt}
            className={`${styles.icon} ${cls} ${burst ? styles.fadeOut : ""}`}
          />
        ))}
      </div>
      <div className={styles.logoRow}>
        <span className={styles.logoFire}>🔥</span>
        <div style={{ display:"flex", alignItems:"center" }}>
          <div className={styles.typingText}>Burn<span>Rate</span></div>
          {showCursor && <span className={styles.cursorBlink} />}
        </div>
      </div>
      <p className={styles.tagline}>Track what's burning your wallet</p>
    </div>
  );
}

export default BRLogo;