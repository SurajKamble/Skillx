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

export function addUserSkillPost(user_skill_id, content) {
  var postData = {
    'content': content
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
}

export function setInitialState(response) {
  localStorage.setItem("isAuthenticated", true);
  localStorage.setItem("client", response.headers['client']);
  localStorage.setItem("access-token", response.headers['access-token']);
  localStorage.setItem("uid", response.headers['uid']);
  localStorage.setItem("expiry", response.headers['expiry']);
  localStorage.setItem("email", response.data.data['email']);
  localStorage.setItem("firstname", response.data.data['firstname']);
  localStorage.setItem("lastname", response.data.data['lastname']);
  localStorage.setItem("user_id", response.data.data['id']);
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
