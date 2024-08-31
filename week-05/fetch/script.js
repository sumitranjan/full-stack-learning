async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const json = await res.json();
  document.getElementById("posts").innerHTML = json.title;
}

fetchPosts();
