import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import FeaturedMedia from "./featured-media";

const Post = ({ state, actions, libraries }) => {
  // Get info of current post.
  const data = state.source.get(state.router.link);
  // Get the the post.
  const post = state.source[data.type][data.id];
  // Get the author.
  const author = state.source.author[post.author];
  // Get a date for humans.
  const date = new Date(post.date);

  // Prefetch home posts and the list component.
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, []);
  console.log("data.isPlayer", data.isPlayer);
  return data.isReady ? (
    <Container>
      <div>
        <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        {data.isPost && (
          <div>
            <StyledLink link={author.link}>
              <Author>
                By <b>{author.name}</b>
              </Author>
            </StyledLink>
            <Fecha>
              {" "}
              on <b>{date.toDateString()}</b>
            </Fecha>
          </div>
        )}
      </div>
      {state.theme.featured.showOnPost && (
        <FeaturedMedia id={post.featured_media} />
      )}
      <Body isPlayer={data.isPlayer}>
        <libraries.html2react.Component html={post.content.rendered} />
      </Body>
    </Container>
  ) : null;
};

export default connect(Post);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const Fecha = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const Body = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: ${({ isPlayer }) => (isPlayer ? "70%" : "100%")};
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: ${({ isPlayer }) => (isPlayer ? "80%" : "auto")};
      border-radius: ${({ isPlayer }) => (isPlayer ? "5px" : "0")};
      height: ${({ isPlayer }) => (isPlayer ? "80%" : "auto")};
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
