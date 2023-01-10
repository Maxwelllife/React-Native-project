export const getAuthStore = (store) => {
  console.log("store: ", store);
  return store.auth;
};
export const getUser = (store) => store.auth.user;
