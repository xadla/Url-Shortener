import CheckUser from "../auth/check";

const CheckAuth = async () => {

  try {
    const result = await CheckUser();
    if (result.data)
      console.log(result);
  } catch (error) {
    console.error("Error checking user:", error);
  }

};

export default CheckAuth;
