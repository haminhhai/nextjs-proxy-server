import { MainLayout } from "components/layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = dynamic(() => import("components/common/header"), {
  ssr: false,
});

type Props = {};

export default function AboutPage({}: Props) {
  const router = useRouter();
  const [postList, setPostList] = useState<any>([]);
  const page = router.query?.page;

  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(
        "https://js-post-api.herokuapp.com/api/posts?_page=" + page
      );
      const data = await response.json();

      setPostList(data.data);
    })();
  }, [page]);

  function handleNextPage() {
    router.push(
      {
        pathname: "/about",
        query: { page: (Number(page) || 1) + 1 },
      },
      undefined,
      { shallow: true }
    );
  }
  return (
    <div>
      <h1>About</h1>

      <Header />
      <ul className="post-list">
        {postList &&
          postList.map((post: any) => <li key={post.id}>{post.title}</li>)}
      </ul>

      <button onClick={handleNextPage}>Next page</button>
    </div>
  );
}

AboutPage.Layout = MainLayout;
