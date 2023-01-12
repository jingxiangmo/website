import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import React, { Component } from 'react'

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
  static async getInitialProps() {
    const postsList = await importPosts()

    return { postsList }
  }

  render() {
    const { postsList } = this.props

    return (
      <>
        <Head>
          <title>Jingxiang Mo</title>
          <meta name='Jingxiang Mo' content="jingxiang mo's website: projects, designs, and writings" />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <div>
            <div className={styles.heading}>
              <h1> JINGXIANG MO </h1>
              <p>learning, and building cool projects with cool people</p>
            </div>

            <section className={styles.section} id='projects'>
              <dt>projects</dt>
              <dl className={styles.block}>
                <dd>
                  <a href='https://www.cs.mcgill.ca/~jvybihal/index.php?Page=About'>
                    Autonomous Robots Swarm
                  </a>
                  <p> server controlled rover robots swarm</p>
                </dd>

                <dd>
                  <a href='https://customer-ofour.web.app/'>Streamline PoS</a>
                  <p> restaurant payment rail management software</p>
                </dd>

                <dd>
                  <a href='https://github.com/Endevr-Team'>Project Endevr</a>
                  <p>  decentralizing scientific research on blockchain</p>
                </dd>
                
                <dd>
                  <a href='https://jingxiangmo-email-secretary-app-m8fgfa.streamlit.app/'>
                  Email Secetary MVP
                  </a>
                  <p> email writer with translation using GPT-3</p>                
                  </dd>

                <dd>
                  <a href='https://github.com/jingxiangmo/email-secretary'>
                    Better Me
                  </a>
                  <p> AI mental health journal & recommendations </p>
                </dd>
                <dd>
                  <a href='https://discord.gg/bwvuq9n'>
                    McGill Projects (Community)
                  </a>
                  <p> a community of 200 software developers </p>
                </dd>
              </dl>
            </section>

            <section className={styles.section} id='work'>
              <dt>work</dt>
              <dl className={styles.block}>
                <dd>
                  <a href='https://www.qubit.com/'>Product Engineer Intern </a>
                  <p> @ Qubit (Coveo) </p>
                </dd>

                <dd>
                  <a href='https://www.cs.mcgill.ca/~jvybihal/index.php?Page=Research'>
                    Research Project Assistant
                  </a>
                  <p> @ McGill Robotics Lab </p>
                </dd>

                <dd>
                  <a href='https://jingxiangmo.notion.site/Mocha-Tech-d15b6f75923c4e69a0e51715850381d8'>
                    Co-Founder / Developer
                  </a>
                  <p> @ Mocha Tech </p>
                </dd>

                <dd>
                  <a href='https://customer-ofour.web.app/'>
                    Co-Founder / Developer
                  </a>
                  <p> @ Streamline </p>
                </dd>

                <dd>
                  <a href='https://www.pharmascience.com/en/'>
                    Software Project Developer
                  </a>
                  <p> @ Pharmascience </p>
                </dd>
              </dl>
            </section>

            <section className={styles.section} id='writings'>
              <dt>writings</dt>
              <dl>
                <div className={styles.writings_list}>
                  {postsList.map((post) => {
                    return (
                      <Link href={`writings/post/${post.slug}`}>
                        <dd>
                          <a>{post.attributes.title}</a>
                        </dd>
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
                  <a href='https://www.facebook.com/jingxiang.mo.3/'>
                    messenger/jingxiang.mo3
                  </a>
                  <p> Messenger </p>
                </dd>

                <dd>
                  <a href='mailto:jingxiangmo@gmail.com'>
                    jingxiangmo@gmail.com
                  </a>
                  <p> Email </p>
                </dd>

                <dd>
                  <a href='https://github.com/jingxiangmo'>
                    github/jingxiangmo
                  </a>
                  <p> Github </p>
                </dd>
              </dl>
            </section>

            <section className={styles.section} id='quicklinks'>

              <dl className={styles.block}>
                <dd>
                  <a href='https://www.facebook.com/jingxiang.mo.3/'>
                    messenger/jingxiang.mo3
                  </a>
                  <p> Messenger </p>
                </dd>

                <dd>
                  <a href='mailto:jingxiangmo@gmail.com'>
                    jingxiangmo@gmail.com
                  </a>
                  <p> Email </p>
                </dd>

                <dd>
                  <a href='https://github.com/jingxiangmo'>
                    github/jingxiangmo
                  </a>
                  <p> Github </p>
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
