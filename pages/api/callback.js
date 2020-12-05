import auth0 from './utils/auth0';

export default async function callback(req, res) {
  try {
    // await auth0.handleCallback(req, res, { redirectTo: '/' });
    await auth0.handleCallback(req, res, { redirectTo: '/job-list' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}