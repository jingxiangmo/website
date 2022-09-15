import Head from "next/head"
import { Component } from 'react'
import { attributes, react as HomeContent } from '../content/posts/home.md';

export default class Home extends Component {
  render() {
    let title = attributes;
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        
        <article>
          <h1>{title}</h1>
          <HomeContent />
        </article>
      </>
    )
  }
}