import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// this is not a component, it is a function
// it is executed on the server
LandingPage.getInitialProps = async (context) => {
  // buildClient gets us an axios instance
  const client = buildClient(context);
  // We still need to make a request using it (.get(...) in this case)
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
