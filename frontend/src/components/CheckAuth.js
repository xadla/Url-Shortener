import Request from "../auth/create_request";

const CheckAuth = async () => {

  try {
    const result = await Request("check/");
    if (result.data.isAuthenticated) {
      localStorage.setItem("authentication", true);
    }
  } catch (error) {
    console.error("Error checking user:", error);
  }

};

export default CheckAuth;
