/**
Fetch the user's info, passing in the access token in the Authorization
HTTP request header.
*/

/* exported getUserInfo */

export function getUserInfo(accessToken) {
  const requestURL = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=50&myRating=like&key=AIzaSyAPB9Rt-Rh8IbRJoCULeTHQeQjPcMn98N0";
  const requestHeaders = new Headers();
  console.log(accessToken);
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