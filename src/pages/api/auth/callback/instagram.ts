import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code, error, error_reason } = req.query;
    
    if (error) {
      console.error('Instagram OAuth error:', error, error_reason);
      return res.redirect(`/?error=${encodeURIComponent(error_reason as string)}`);
    }

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange the authorization code for a short-lived access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID || '',
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET || '',
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI || '',
        code: code as string,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Failed to get access token:', tokenData);
      return res.redirect(`/?error=${encodeURIComponent('Failed to authenticate with Instagram')}`);
    }

    // Exchange the short-lived token for a long-lived token
    const longLivedTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${tokenData.access_token}`
    );

    const longLivedTokenData = await longLivedTokenResponse.json();

    if (!longLivedTokenResponse.ok) {
      console.error('Failed to get long-lived token:', longLivedTokenData);
      // Continue with the short-lived token if long-lived token request fails
      // In a real app, you might want to handle this differently
    }

    // Store the access token securely (in a real app, you'd store this in a database)
    // For now, we'll just redirect with the token for demo purposes
    return res.redirect(`/dashboard?provider=instagram`);
    
  } catch (error) {
    console.error('Error in Instagram callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
