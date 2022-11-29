import baseurl from "./constants";

export default function fetchData(filter, activeIndex, fn, token, tag) {
  let Tag = tag ? tag : "";
  let Filter = filter ? filter : "";

  fetch(
    `${baseurl}/api/articles?${Tag}limit=10&offset=${
      activeIndex * 10
    }${Filter}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      if (data.articles) {
        fn("articles", data.articles);
        fn("error", null);
      } else {
        fn("error", data);
      }
    })
    .catch((err) => {
      fn("error", "not able to fetch data");
    });
  fetch(`${baseurl}/api/articles?${Tag}${Filter}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((articles) => {
      fn("articlesCount", articles.articles.length);
    });
}
