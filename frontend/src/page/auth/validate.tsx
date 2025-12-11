import { useEffect } from "react";
import { useQuery, useRouter } from "router-kit";

const Validate = () => {
  const { token } = useQuery();
  const { navigate } = useRouter();

  useEffect(() => {
    if (token !== "") {
      navigate("/auth/error", { replace: true });
    }
  }, [token, navigate]);
  return (
    <div>
      <h1>Validating your account...</h1>
      <p>Query token: {token}</p>
    </div>
  );
};

export default Validate;
