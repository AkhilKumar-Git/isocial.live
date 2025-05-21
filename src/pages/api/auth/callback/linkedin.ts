import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code, state, error, error_description } = req.query;
    
    if (error) {
      console.error('LinkedIn OAuth error:', error, error_description);
      return res.redirect(`/?error=${encodeURIComponent(error_description as string)}`);
    }

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI || '',
        client_id: process.env.LINKEDIN_CLIENT_ID || '',
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Failed to get access token:', tokenData);
      return res.redirect(`/?error=${encodeURIComponent('Failed to authenticate with LinkedIn')}`);
    }

    // Store the access token securely (in a real app, you'd store this in a database)
    // For now, we'll just redirect with the token for demo purposes
    return res.redirect(`/dashboard?provider=linkedin`);
    
  } catch (error) {
    console.error('Error in LinkedIn callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
