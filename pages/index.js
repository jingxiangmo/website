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
          {/* ===========[ TITLE BLOCK ]===========  */}

          <column className={styles.column}>
            <div className={styles.title_column}>
              <div className={styles.heading}>
                <dt className={styles.title}> JINGXIANG MO </dt>

                <p className={styles.description}>
                  building softwares, robots, communities
                </p>
              </div>
            </div>
          </column>

          {/* ===========[ COLUMN 1]===========  */}
          <column className={styles.column}>
            {/* projects */}

            <dl className={styles.block}>
              <dt> PROJECTS </dt>

              <dd>
                <a href="">Robotics Research Project</a>
                <br />
                Branding, identity, strategy, web and digital design
              </dd>

              <dd>
                <a href="">Streamline PoS</a>
                <br />
                Branding, identity, strategy, web and digital design
              </dd>

              <dd>
                <a href="">Endevr</a>
                <br />
                Branding, identity, strategy, web and digital design
              </dd>

              <dd>
                <a href="">Better Me</a>
                <br />
                Branding, identity, strategy, web and digital design
              </dd>

              <dd>
                <a href="">Art Portfolio Website</a>
                <br />
                Branding, identity, strategy, web and digital design
              </dd>

              <dd>
                <a href="">McGill Students' Society Website</a>
                <br />
                Branding, identity, strategy, web and digital design
              </dd>

              <dd>
                <a href="">McGill Projects Community </a>
                <br />
                Branding, identity, strategy, web and digital design
              </dd>
            </dl>
          </column>

          {/* ===========[ COLUMN 2]===========  */}

          <column className={styles.column}>
            {/* contact */}

            <dl className={styles.block}>
              <dt> CONTACT </dt>
              <dd>
                <a href="">Email</a>
              </dd>

              <dd>
                <a href="">Linkedin</a>
              </dd>

              <dd>
                <a href="">Github</a>
              </dd>
            </dl>

            {/* work */}
            <dl className={styles.block}>
              <dt> WORK </dt>

              <dd>
                Sep 2022 - Dec 2022
                <br />
                Reserach Assistant @ McGill Robotics Lab
              </dd>

              <dd>
                Sep 2022 - Dec 2022
                <br />
                Product Engineer Intern @ Qubit (Coveo)
              </dd>

              <dd>
                May 2022 - August 2022
                <br />
                Software Project Developer @ Pharmascience
              </dd>

              <dd>
                Jan 2022 - May 2022
                <br />
                Co-Founder & Developer @ Streamline
              </dd>
            </dl>

            {/* education */}
            <dl className={styles.block}>
              <dt> EDUCATION </dt>
              <dd>
                McGill University
                <br />
                Computer Science + Robotics + Finance
              </dd>
            </dl>
          </column>

          {/* ===========[ COLUMN 3]===========  */}

          <column className={styles.column}>
            {/* writings */}
            <dl className={styles.block}>
              <dt> WRITINGS </dt>
            </dl>

            <div className={styles.writings_list}>
              {postsList.map((post) => {
                return (
                  <Link href={`writings/post/${post.slug}`}>
                    <a>
                      <h2>{post.attributes.title}</h2>
                    </a>
                  </Link>
                );
              })}
            </div>
          </column>
        </main>
      </div>
    );
  }
}
