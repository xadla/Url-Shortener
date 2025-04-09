import authAPI, {getCsrfToken} from "./api";


const CheckUser = async () => {
  try {
    const csrfToken = await getCsrfToken();
    
    const res = await authAPI.get("check/", {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true
    });
    
    return res;
  } catch (error) {
    if (error.response?.status === 401) {
      return { isAuthenticated: false };
    }
    throw error;
  }
};


export default CheckUser;
