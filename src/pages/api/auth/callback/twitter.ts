import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code, state, error, error_description } = req.query;
    
    if (error) {
      console.error('Twitter OAuth error:', error, error_description);
      return res.redirect(`/?error=${encodeURIComponent(error_description as string)}`);
    }

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: new URLSearchParams({
        code: code as string,
        grant_type: 'authorization_code',
        client_id: process.env.TWITTER_CLIENT_ID || '',
        redirect_uri: process.env.TWITTER_REDIRECT_URI || '',
        code_verifier: 'challenge' // In a real app, you'd use PKCE and store this securely
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Failed to get access token:', tokenData);
      return res.redirect(`/?error=${encodeURIComponent('Failed to authenticate with Twitter')}`);
    }

    // Store the access token securely (in a real app, you'd store this in a database)
    // For now, we'll just redirect with the token for demo purposes
    return res.redirect(`/dashboard?provider=twitter`);
    
  } catch (error) {
    console.error('Error in Twitter callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
