/**
Fetch the user's info, passing in the access token in the Authorization
HTTP request header.
*/

const API_KEY = "AIzaSyAPB9Rt-Rh8IbRJoCULeTHQeQjPcMn98N0;"

// Retrieving first 50 videos in Liked Videos playlist
// const requestURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=50&myRating=like&key=${API_KEY}`;


/* exported getUserInfo */
export function getUserInfo(accessToken) {
  // %2C = Unicode for comma
  const requestURL = `https://youtube.googleapis.com/youtube/v3/videos/getRating?id=${COMMA_SEPARATED_IDs}&key=${API_KEY}`;
  const requestHeaders = new Headers();
  console.log(`Access token: ${accessToken}`);
  requestHeaders.append('Authorization', 'Bearer ' + accessToken);
  const driveRequest = new Request(requestURL, {
    method: "GET",
    headers: requestHeaders
  });

  return fetch(driveRequest).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw response.status;
    }
  });

}