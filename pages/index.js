import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import React, { useEffect, Component, useState } from 'react'

const importPosts = async () => {
  const markdownFiles = require
    .context('../content/posts', false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2))
  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/posts/${path}`)
      return { ...markdown, slug: path.substring(0, path.length - 3) }
    })
  )
}

export default class Home extends Component {
  static async getInitialProps () {
    const postsList = await importPosts()

    return { postsList }
  }

  render () {
    const { postsList } = this.props

    return (
      <>
        <Head>
          <title>Jingxiang Mo</title>
          <meta name='Jingxiang Mo' content="jingxiang mo's website" />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <div>
            <div className={styles.heading}>
              <h1> JINGXIANG MO </h1>
              <p>accelerating the world's transition to full automation</p>
            </div>

            <section className={styles.section} id='projects'>
              <dt>projects</dt>
              <dl className={styles.block}>
                <dd>
                  <a href=''>Robotics Research Project</a>
                  <p> building robots to solve search and rescue </p>
                </dd>

                <dd>
                  <a href=''>Streamline PoS</a>
                  <p> innovative QR point of sale and payment rail  </p>
                </dd>

                <dd>
                  <a href=''>Endevr</a>
                  <p> blockchain based research crowdfunding platform </p>
                </dd>

                <dd>
                  <a href=''>Better Me</a>
                  <p> AI mental health journal & recommendations </p>
                </dd>

                <dd>
                  <a href=''>Art Portfolio Website</a>
                  <p> digital design portfolio  for an artist</p>
                </dd>

                <dd>
                  <a href=''>McGill Students' Society Website</a>
                  <p> official website for the MIS </p>
                </dd>

                <dd>
                  <a href=''>McGill Projects (Community) </a>
                  <p> a community of 200 software developers </p>
                </dd>
              </dl>
            </section>

            <section className={styles.section} id='work'>
              <dt>work</dt>
              <dl className={styles.block}>
                <dd>
                  <a href=''> Product Engineer Intern </a>
                  <p> @ Qubit (Coveo) </p>
                </dd>

                <dd>
                  <a href=''> Reserach Assistant </a>
                  <p> @ McGill University Robotics Lab </p>
                </dd>

                <dd>
                  <a href=''> Co-Founder / Developer </a>
                  <p> @ Streamline </p>
                </dd>

                <dd>
                  <a href=''> Software Project Developer </a>
                  <p> @ Pharmascience </p>
                </dd>
              </dl>
            </section>

            <section className={styles.section} id='writings'>
              <dt>writings</dt>
              <dl className={styles.block}>
                <div className={styles.writings_list}>
                  {postsList.map((post) => {
                    return (
                      <Link href={`writings/post/${post.slug}`}>
                        <a>
                          <dd>{post.attributes.title}</dd>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </dl>
            </section>

            <section className={styles.section} id='contact'>
              <dt>contact</dt>
              <dl className={styles.block}>
                <dd>
                  <a href=''> Email </a>
                  <p> jingxiangmo@gmail.com </p>
                </dd>

                <dd>
                  <a href=''> Linkedin </a>
                  <p> linkedin/jingxiangmo </p>
                </dd>

                <dd>
                  <a href=''> Github: </a>
                  <p> github/jingxiangmo </p>
                </dd>
              </dl>
            </section>
          </div>

          {/* NAVBAR */}
          <nav className={styles.nav}>
            <ol>
              <li>
                <a href='#projects'>projects</a>
              </li>
              <li>
                <a href='#work'>work</a>
              </li>

              <li>
                <a href='#writings'>writings</a>
              </li>

              <li>
                <a href='#contact'>contact</a>
              </li>
            </ol>
          </nav>
        </main>
      </>
    )
  }
}
