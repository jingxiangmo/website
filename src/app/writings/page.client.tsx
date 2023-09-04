import { useEffect } from 'react';
import Script from 'next/script';
import NavBar from "../../components/NavBar/NavBar";

declare global {
  interface Window {
    SubstackFeedWidget: any;
  }
}

const Writings = () => {
  useEffect(() => {
    window.SubstackFeedWidget = {
      substackUrl: "jingxiangmo.substack.com",
      posts: 12,
      filter: "top",
      layout: "center",
      hidden: ["premium", "author"],
      colors: {
        primary: "#404040",
        secondary: "#808080",
        background: "#FFFFFF",
      },
    };
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <div id="substack-feed-embed"></div>
        <Script src="https://substackapi.com/embeds/feed.js" async />
      </div>
    </>
  );
};

export default Writings;
