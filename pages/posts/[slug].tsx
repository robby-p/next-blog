import React from "react";
import matter from "gray-matter";
import Error from "next/error";
import ReactMarkdown from "react-markdown";

export default function PostTemplate({ error, content, data }) {
  if (error) return <Error statusCode={error} />;

  return (
    <div>
      <h1>{data.title}</h1>

      <ReactMarkdown source={content} />
    </div>
  );
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;
  try {
    const content = await import(`../../content/${slug}.md`);
    const data = matter(content.default);
    return { ...data };
  } catch (e) {
    return {
      error: 404,
    };
  }
};
