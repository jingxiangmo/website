import React, { Component } from 'react';

import Link from 'next/link';

const BLOG_POSTS_PATH = '../../content/posts';

const importBlogPosts = async () => {

  const markdownFiles = require
    .context('../../content/posts', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../../content/posts/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export default class Blog extends Component {
  static async getInitialProps() {
    const postsList = await importBlogPosts();

    return { postsList };
  }
  render() {
    const { postsList } = this.props;
    return (
      <div className="blog-list">
        {postsList.map(post => {
          return (
            <Link href={`blog/post/${post.slug}`}>
              <a>
                <h2>{post.attributes.title}</h2>
              </a>
            </Link>
          );
        })}
        <style jsx>{`
          .blog-list a {
            display: block;
            text-align: center;
          }
          .blog-list img {
            max-width: 100%;
            max-height: 300px;
          }
        `}</style>
      </div>
    );
  }
}