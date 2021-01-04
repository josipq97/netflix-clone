const YT_API_KEY = "AIzaSyAn5CAFUjl7JwqvbSOGFA_N40isGI2_sYw";

async function getTrailerURL(movieName) 
{
  let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}%20trailer&key=${YT_API_KEY}`);
  let videos = await response.json()
  return videos;
}

export default getTrailerURL;