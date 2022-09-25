import React, { Component } from 'react'
import Link from 'next/link'
import styles from '../../styles/Writings.module.scss'
import Sidebar from '../../components/sidebar'

const importPosts = async () => {
  const markdownFiles = require
    .context('../../content/posts', false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2))
  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../../content/posts/${path}`)
      return { ...markdown, slug: path.substring(0, path.length - 3) }
    })
  )
}

export default class Blog extends Component {
  static async getInitialProps () {
    const postsList = await importPosts()

    return { postsList }
  }

  render () {
    const { postsList } = this.props

    return (
      <div className={styles.overflow_container}>
        <main className={styles.main}>
          <div className={styles.writings_list}>
            {postsList.map((post) => {
              return (
                <Link href={`writings/post/${post.slug}`}>
                  <a>
                    <h2>{post.attributes.title}</h2>
                  </a>
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    )
  }
}
