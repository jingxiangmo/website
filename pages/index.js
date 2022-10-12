import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

import React, { Component } from "react";

const importPosts = async () => {
  const markdownFiles = require
    .context("../content/posts", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/posts/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export default class Home extends Component {
  static async getInitialProps() {
    const postsList = await importPosts();

    return { postsList };
  }

  render() {
    const { postsList } = this.props;

    return (
      <div className={styles.container}>
        <Head>
          <title>Jingxiang Mo</title>
          <meta name="Jingxiang Mo" content="jingxiang mo's website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* MAIN */}
          <div>
            <div className={styles.heading}>
              <h1 className={styles.title}> JINGXIANG MO </h1>
              <p className={styles.description}>
                building softwares, robots, communities
              </p>
            </div>


            <section className={styles.section} id="projects">
              <h2>projects</h2>
              <p>…</p>
            </section>

            <section className={styles.section} id="contact">
              <h2>contact </h2>
              <p>…</p>
            </section>

            <section className={styles.section} id="woks">
              <h2>woks </h2>
              <p>…</p>
            </section>

            <section className={styles.section} id="education">
              <h2>education </h2>
              <p>…</p>
            </section>

            <section className={styles.section} id="writings">
              <h2>writings </h2>
              <p>…</p>





            </section>
          </div>

          {/* NAVBAR */}
          <nav className={styles.nav}>
            <ol>
              <li>
                <a href="#contact">contact</a>
              </li>
              <li>
                <a href="#projects">projects</a>
              </li>
              <li>
                <a href="#work">work</a>
              </li>
              <li>
                <a href="#education">education</a>
              </li>
              <li>
                <a href="#writings">writings</a>
              </li>
            </ol>
          </nav>
        </main>
      </div>
    );
  }
}
