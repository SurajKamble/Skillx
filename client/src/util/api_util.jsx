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

export function getSkills() {
  return axios.get("api/skills", {
    headers: {
      'access-token': localStorage.getItem("access-token"),
      'client': localStorage.getItem("client"),
      'uid': localStorage.getItem("uid"),
      'expiry': localStorage.getItem("expiry") }
    });
}

export function signOut() {
  return axios.delete("api/auth/sign_out", {
    headers: {
      'access-token': localStorage.getItem("access-token"),
      'client': localStorage.getItem("client"),
      'uid': localStorage.getItem("uid"),
      'expiry': localStorage.getItem("expiry") }
  });
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
}
