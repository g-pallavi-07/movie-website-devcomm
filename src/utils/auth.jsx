

const USERS_KEY = "cinescope_users";
const CURRENT_USER_KEY = "cinescope_current_user";


function getUsers() {
  const usersJSON = localStorage.getItem(USERS_KEY);
  return usersJSON ? JSON.parse(usersJSON) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


export function signUp(username, email, password) {
  const users = getUsers();

  const existingUser = users.find(
    (user) => user.username === username || user.email === email
  );

  if (existingUser) {
    return { success: false, message: "Username or email already in use." };
  }

  const newUser = { username, email, password };
  users.push(newUser);
  saveUsers(users);

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return { success: true };
}


export function logIn(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return { success: false, message: "Incorrect username or password." };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true };
}


export function logOut() {
  localStorage.removeItem(CURRENT_USER_KEY);
}


export function getCurrentUser() {
  const userJSON = localStorage.getItem(CURRENT_USER_KEY);
  return userJSON ? JSON.parse(userJSON) : null;
}


export function isLoggedIn() {
  return getCurrentUser() !== null;
}
