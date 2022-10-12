import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import React, { useEffect, Component, useState } from "react";

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
      <>
        <Head>
          <title>Jingxiang Mo</title>
          <meta name="Jingxiang Mo" content="jingxiang mo's website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div>
            <div className={styles.heading}>
              <h1> JINGXIANG MO </h1>
              <p>accelerating the world's transition to full automation</p>
            </div>

            <section className={styles.section} id="projects">
              <dt>projects</dt>
              <dl className={styles.block}>
                <dd>
                  <a href="">Robotics Research Project</a>

                  <p> Branding, identity, strategy, web and digital design</p>
                </dd>

                <dd>
                  <a href="">Streamline PoS</a>
                  <br />
                  <p> Branding, identity, strategy, web and digital design</p>
                </dd>

                <dd>
                  <a href="">Endevr</a>
                  <br />
                  <p> Branding, identity, strategy, web and digital design</p>
                </dd>

                <dd>
                  <a href="">Better Me</a>
                  <br />
                  <p> Branding, identity, strategy, web and digital design</p>
                </dd>

                <dd>
                  <a href="">Art Portfolio Website</a>
                  <br />
                  <p> Branding, identity, strategy, web and digital design</p>
                </dd>

                <dd>
                  <a href="">McGill Students' Society Website</a>
                  <br />
                  <p> Branding, identity, strategy, web and digital design</p>
                </dd>

                <dd>
                  <a href="">McGill Projects Community </a>
                  <br />
                  <p> Branding, identity, strategy, web and digital design</p>
                </dd>
              </dl>
            </section>

            <section className={styles.section} id="work">
              <h2>work </h2>
              <p>…</p>
            </section>

            <section className={styles.section} id="writings">
              <h2>writings </h2>
              <p>…</p>
            </section>

            <section className={styles.section} id="contact">
              <h2>contact </h2>
              <p>…</p>
            </section>
          </div>

          {/* NAVBAR */}
          <nav className={styles.nav}>
            <ol>
              <li>
                <a href="#projects">projects</a>
              </li>
              <li>
                <a href="#work">work</a>
              </li>

              <li>
                <a href="#writings">writings</a>
              </li>

              <li>
                <a href="#contact">contact</a>
              </li>
            </ol>
          </nav>
        </main>
      </>
    );
  }
}
