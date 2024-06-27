export default async function handleClick() {
  let videos = document.getElementById("videoContainer");

  // Clear the video container for next response
  videos.innerHTML = "";

  const inputValue = document.getElementById("searchBar").value;
  if (inputValue.trim() === "") {
    alert("Please provide input in search bar");
  } else {
    let videos = document.getElementById("videoContainer");
    const limit = 15;
    const key = "AIzaSyDtDX40F3lg5NLCc_eeLrfDSFEimNJ5UR0";
    let api = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${limit}&q=${inputValue}`;
    // console.log(inputValue);
    if (next) {
      api += "&pageToken=" + nextPageToken;
    } else if (prev) {
      api += "&pageToken=" + prevPageToken;
    }
    const result = await fetch(api).then((res) => res.json());
    nextPageToken = result.nextPageToken;
    prevPageToken = result.prevPageToken;
    result.items.length === 0
      ? alert("Invalid search input")
      : console.log(result.items);
    result.items.forEach((ele, idx) => {
      let heading = document.createElement("h2");
      heading.textContent = ele.snippet.title;

      let desc = document.createElement("p");
      desc.textContent = ele.snippet.description;

      let author = document.createElement("p");
      author.textContent = `Author : ${ele.snippet.channelTitle}`;

      let published = document.createElement("p");
      published.textContent = `Published at : ${ele.snippet.publishedAt}`;

      let div = document.createElement("div");
      div.className = "videos";

      let imgDiv = document.createElement("div");
      imgDiv.className = "imgDiv";
      let img = document.createElement("img");
      img.src = ele.snippet.thumbnails.high.url;
      // console.log(ele.snippet.thumbnails.default.url)

      imgDiv.appendChild(img);

      let detailsDiv = document.createElement("div");
      detailsDiv.className = "detailsDiv";
      detailsDiv.appendChild(heading);
      detailsDiv.appendChild(desc);
      detailsDiv.appendChild(author);
      detailsDiv.appendChild(published);

      div.append(imgDiv);
      div.append(detailsDiv);
      videos.appendChild(div);
    });
  }

  document.getElementById("searchBar").value = "";
}
