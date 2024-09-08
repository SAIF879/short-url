import { nanoid } from 'nanoid';
import { URL } from '../model/url.js';
import { json } from 'express';

export async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.URL) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = nanoid(8); 

    try {
        await URL.create({
            shortId: shortId, 
            redirectUrl: body.URL,
            visitHistory: []
        });

        return res.json({ id: shortId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function handleRedirect(req, res) {
    const { shortId } = req.params;

    try {
        
        const urlEntry = await URL.findOne({ shortId: shortId });

        if (!urlEntry) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Record the visit history 
        urlEntry.visitHistory.push({ timeStamp: Date.now() });
        await urlEntry.save();

        // Redirect to the original URL
        return res.redirect(urlEntry.redirectUrl);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
