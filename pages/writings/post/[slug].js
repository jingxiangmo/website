import React, { Component } from "react";
import styles from "../../../styles/Writings.module.scss";
import NavBar from "../../../components/NavBar";

class Post extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const blogpost = await import(`../../../content/posts/${slug}.md`).catch(
      (error) => null
    );

    return { blogpost };
  }

  render() {
    if (!this.props.blogpost) return <div>not found</div>;

    const {
      html,
      attributes: { date },
      attributes: { title },
    } = this.props.blogpost.default;

    return (
      <>
        <main>
          {/* <NavBar titleOne="writings" titleTwo="projects" titleThree="contacts" /> */}

          <article className={styles.article}>
            <h1 className={styles.article_title}>{title}</h1>
            <p className={styles.article_date}>{date}</p>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </main>
      </>
    );
  }
}

export default Post;
