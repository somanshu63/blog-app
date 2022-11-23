export default function fetchData(filter, activeIndex, fn, tag) {
  let Tag = tag ? tag : "";
  let Filter = filter ? filter : "";

  fetch(
    `https://mighty-oasis-08080.herokuapp.com/api/articles?${Tag}limit=10&offset=${
      activeIndex * 10
    }${Filter}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      fn("articles", data.articles);
      fn("articlesCount", data.articlesCount);
    })
    .catch((err) => {
      fn("error", "not able to fetch data");
    });
}
