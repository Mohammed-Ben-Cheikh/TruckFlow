import { useQuery } from "router-kit";

const Validate = () => {
  const { token } = useQuery();
  return (
    <div>
      <h1>Validating your account...</h1>
      <p>Query token: {token}</p>
    </div>
  );
};

export default Validate;
