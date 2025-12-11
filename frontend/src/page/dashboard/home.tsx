import { Link } from "router-kit";

const Home = () => {
  return (
    <>
      <h1>Dashboard Home</h1>
      <Link to="/auth/validate/you?token=">Validate Account</Link>
    </>
  );
};
export default Home;
