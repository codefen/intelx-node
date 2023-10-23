const axios = require('axios');

const API_KEY = process.env.INTEL_KEY;
const API_URL = process.env.INTEL_DOMAIN;

// This helper is based off the IntelX API documentation, implementing some of the endpoint shown on it
// https://github.com/IntelligenceX/SDK/blob/master/Intelligence%20X%20API.pdf

// Search functions
// /intelligent/search

async function searchIntelx(searchTerm, params = {}) {
    try {
        const searchParams = {
            term: searchTerm,
            maxresults: 10,
            media: 0,
            sort: 2,
            terminate: [],
            ...params
        };

        const searchResponse = await axios.post(
            `${API_URL}intelligent/search`,
            searchParams,
            {
                headers: { 'x-key': API_KEY }
            }
        );

        const data = searchResponse.data;
        const id = data.id;

        const resultResponse = await axios.get(
            `${API_URL}intelligent/search/result`,
            {
                params: {
                    id,
                    limit: 10,
                    statistics: 1,
                    previewlines: 8
                },
                headers: { 'x-key': API_KEY }
            }
        );

        const resultData = resultResponse.data;
        const records = resultData.records;

        const resultsWithPreviews = [];

        for (const record of records) {
            console.log(record)
            const previewResponse = await axios.get(
                `${API_URL}file/preview`,
                {
                    params: {
                        sid: record.storageid,
                        f: 0,
                        l: 8,
                        c: 1,
                        m: record.media,
                        b: record.bucket,
                        k: API_KEY
                    },
                    headers: { 'x-key': API_KEY }
                }
            );

            const preview = previewResponse.data;

            const result = {
                name: record.name,
                date: record.date,
                preview,
                link: `https://intelx.io/?did=${record.systemid}`
            };

            resultsWithPreviews.push(result);
        }

        return resultsWithPreviews;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

async function readIntelx(searchTerm, params = {}) {
    try {
        const searchParams = {
            term: searchTerm,
            maxresults: 10,
            media: 0,
            sort: 2,
            terminate: [],
            ...params
        };

        const searchResponse = await axios.post(
            `${API_URL}intelligent/search`,
            searchParams,
            {
                headers: { 'x-key': API_KEY }
            }
        );

        const data = searchResponse.data;
        const id = data.id;

        const resultResponse = await axios.get(
            `${API_URL}intelligent/search/result`,
            {
                params: {
                    id,
                    limit: 10,
                    statistics: 1,
                    previewlines: 8
                },
                headers: { 'x-key': API_KEY }
            }
        );

        const resultData = resultResponse.data;
        const records = resultData.records;

        const resultsWithPreviews = [];

        for (const record of records) {
            console.log(record)
            const previewResponse = await axios.get(
                `${API_URL}file/preview`,
                {
                    params: {
                        sid: record.storageid,
                        f: 0,
                        l: 8,
                        c: 1,
                        m: record.media,
                        b: record.bucket,
                        k: API_KEY
                    },
                    headers: { 'x-key': API_KEY }
                }
            );

            const preview = previewResponse.data;

            const result = {
                name: record.name,
                date: record.date,
                preview,
                link: `https://intelx.io/?did=${record.systemid}`
            };

            resultsWithPreviews.push(result);
        }

        return resultsWithPreviews;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}



module.exports = { searchIntelx, readIntelx };
