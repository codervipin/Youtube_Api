// import handleClick from "./event.js";

const header = document.createElement("header");
// header.setAttribute('class',"header")
const logoDiv = document.createElement("div");
const img = document.createElement("img");
const logoHead = (document.createElement("h2").innerText = "Youtube");
img.src = "./yt_logo-removebg-preview.png";
logoDiv.setAttribute("class", "logoDiv");
logoDiv.appendChild(img);
const logoText = document.createElement("h2");
logoText.textContent = "Youtube API";
logoText.id = "logoTxt";
logoDiv.appendChild(logoText);
header.appendChild(logoDiv);

const main = document.createElement("main");

const section = document.createElement("section");

const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.placeholder = "Enter the Search Input...";
searchBar.id = "searchBar";

const button = document.createElement("button");
button.textContent = "Search";

const videoContainer = document.createElement("div");
videoContainer.className = "videoContainer";
videoContainer.id = "videoContainer";

button.addEventListener("click", handleClick);

//pagination button
const next = document.createElement("button");
next.id = "nextBtn";
next.textContent = "Next";
const prev = document.createElement("button");
prev.id = "prevBtn";
prev.textContent = "Prev";

let nextPageToken = "";
let prevPageToken = "";

next.addEventListener("click", () => handleClick(true, false));
prev.addEventListener("click", () => handleClick(false, true));

async function handleClick(next = false,prev = false) {
  let videos = document.getElementById("videoContainer");

  // Clear the video container for next response
  videos.innerHTML = "";

  const inputValue = document.getElementById("searchBar").value;
//   if (inputValue.trim() === "") {
//     alert("Please provide input in search bar");
//   } else {
    // let videos = document.getElementById("videoContainer");
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

    console.log(nextPageToken);
    console.log(prevPageToken);



    result.items.length === 0
      ? alert("Invalid search input")
      : console.log(result);
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

//   document.getElementById("searchBar").value = "";
// }

section.appendChild(searchBar);
section.appendChild(button);
main.appendChild(section);
main.appendChild(videoContainer);
document.body.appendChild(header);
document.body.appendChild(main);

document.body.appendChild(next);
document.body.appendChild(prev);
