import React from "react";
import Error from "next/error";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

interface PostData {
  content: any;
  data: any;
}
interface PostError {
  errorCode: 500 | 404;
}

export default function PostTemplate(input: PostData | PostError) {
  if ("errorCode" in input) {
    return <Error statusCode={input.errorCode} />;
  }
  return (
    <div>
      <h1>{input.data.title}</h1>
      <ReactMarkdown source={input.content} />
    </div>
  );
}

export const getInitialProps = async (
  context
): Promise<PostData | PostError> => {
  const { slug } = context.query;
  try {
    const content = await import(`../../content/${slug}.md`);
    const data = matter(content.default);
    return { ...data };
  } catch (err) {
    return { errorCode: 404 };
  }
};
