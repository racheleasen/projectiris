// src/pages/hero_slide.tsx
import React from "react";
import styles from "../styles/hero.module.css";
import { Link } from "react-router-dom"; // or just <a> if not using router

export default function HeroSlide() {
  return (
    <section className={styles.hero}>
      <div className={styles.bubbleWrapper}>
        <div className={`${styles.bubble} ${styles.bubbleGreen}`} />
        <div className={`${styles.bubble} ${styles.bubbleWhite}`} />
      </div>

      <div className={styles.content}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>project iris</h1>
          <p className={styles.subtitle}>Free access to gaze-assisted communication.</p>
          <div className={styles.ctaGroup}>
            <a href="/get-started" className={styles.ctaPrimary}>Get Started</a>
            <a href="/learn-more" className={styles.ctaSecondary}>Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}
