// export const ROOT_URL = "https://riverdi-lem.herokuapp.com";

// export const ROOT_URL = "http://localhost:3090";

export const ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://riverdi-lem.herokuapp.com"
    : "http://localhost:3090";
