import axios from "axios";

export function signUp(user) {
  return axios.post("api/auth", {
      firstname: user["firstname"],
      lastname: user["lastname"],
      email: user["email"],
      password: user["password"],
      password_confirmation: user["password_confirmation"]
    });
}

export function login(user) {
  return axios.post("api/auth/sign_in", {
      email: user["email"],
      password: user["password"],
    });
}

export function googleOauth2(response) {
  return axios.post("/api/auth/oauth", response.profileObj);
}

export function getCurrentUserSkills() {
  return axios.get("/api/user_skills", getHeaders());
}

export function getSkillName(skill_id) {
  return axios.get("api/skills/" + skill_id, getHeaders());
}

export function getSkills() {
  return axios.get("api/skills", getHeaders());
}

export function getUserSkillData(user_skill_id) {
  return axios.get("api/user_skills/" + user_skill_id, getHeaders());
}

export function getAllUserSkillPosts(user_skill_id) {
  return axios.get("api/user_skills/" + user_skill_id + "/posts", getHeaders());
}

export function getAllExplorePosts() {
  return axios.get("api/explore", getHeaders());
}

export function getAllHomePosts() {
  return axios.get("api/home", getHeaders());
}

export function addUserSkillPost(user_skill_id, content, link) {
  var postData = {
    'content': content,
    'link': link
  }
  return axios.post("api/user_skills/" + user_skill_id + "/posts", postData, getHeaders());
}

export function addSkills(skill_ids) {
  var userData = {
    'user_id': localStorage.getItem("user_id"),
    'skill_ids': skill_ids
  }
  return axios.post("api/user_skills", userData, getHeaders());
}

export function signOut() {
  return axios.delete("api/auth/sign_out", getHeaders());
}

export function resetInitialState() {
  localStorage.setItem("isAuthenticated", false);
  localStorage.removeItem("client");
  localStorage.removeItem("access-token");
  localStorage.removeItem("uid");
  localStorage.removeItem("expiry");
  localStorage.removeItem("email");
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
  localStorage.removeItem("user_id");
  localStorage.removeItem("display_picture");
}

export function setInitialState(response_headers, response_data) {
  console.log("In setInitialState");
  console.log(response_headers);
  console.log(response_data);
  localStorage.setItem("isAuthenticated", true);
  localStorage.setItem("client", response_headers['client']);
  localStorage.setItem("access-token", response_headers['access-token']);
  localStorage.setItem("uid", response_headers['uid']);
  localStorage.setItem("expiry", response_headers['expiry']);
  localStorage.setItem("email", response_data['email']);
  localStorage.setItem("firstname", response_data['firstname']);
  localStorage.setItem("lastname", response_data['lastname']);
  localStorage.setItem("user_id", response_data['id']);
  localStorage.setItem("display_picture", response_data['display_picture']);
}

function getHeaders() {
  return {
    headers: {
      'access-token': localStorage.getItem("access-token"),
      'client': localStorage.getItem("client"),
      'uid': localStorage.getItem("uid"),
      'expiry': localStorage.getItem("expiry")
    }
  }
}
