const output = document.querySelector("#display-posts");
const getButton = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");
const errorMsg = document.querySelector("#create-post-error");
// const postButton = document.querySelector("#")

const getPosts = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/posts");
    console.log(response);
    if (!response.ok) {
      throw new Error("Error fetching posts.");
    }
    const posts = await response.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      const postItem = document.createElement("h3");
      postItem.innerText = post.title;
      output.appendChild(postItem);
    });
  } catch (error) {
    output.innerText = error.message;
  }
};

const formSubmitHandler = async (e) => {
  // console.log("Event listner working fine.");
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const data = await res.json();
      // console.log(data);
      throw new Error(data.message);
    }

    const newPost = await res.json();

    const postItem = document.createElement("h3");
    postItem.innerHTML = newPost.title;
    output.appendChild(postItem);
    getPosts();
  } catch (error) {
    errorMsg.innerText = error.message;
  }
};

getButton.addEventListener("click", getPosts);
form.addEventListener("submit", formSubmitHandler);
