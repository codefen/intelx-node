const axios = require('axios');

const API_KEY = process.env.INTEL_KEY;
const API_URL = process.env.INTEL_DOMAIN;

// This helper is based off the IntelX API documentation, implementing some of the endpoint shown on it
// https://github.com/IntelligenceX/SDK/blob/master/Intelligence%20X%20API.pdf

// Search functions
// /intelligent/search

async function initSearchIntel(searchTerm, params = {}) {
    try {
        const searchParams = {
            term: searchTerm,
            maxresults: 1000,
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
        const stats = await statsIntelx(data.id)
        const id = data.id;
        return {
            id,
            count: stats.type[0].count
        };
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

async function searchIntelx(id, offset) {
    try {
        const resultResponse = await axios.get(
            `${API_URL}intelligent/search/result`,
            {
                params: {
                    id,
                    limit: 16,
                    offset,
                    statistics: 0,
                    previewlines: 8
                },
                headers: { 'x-key': API_KEY }
            }
        );

        const resultData = resultResponse.data;
        const records = resultData.records;
        const resultsWithPreviews = [];

        for (const record of records) {
            const result = {
                name: record.name,
                date: record.date,
                bucket_data: record.bucketh,
                bucket_id: record.bucket,
                storage_id: record.storageid,
                media_id: record.media
            };

            resultsWithPreviews.push(result);
        }

        return resultsWithPreviews;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

async function searchPreview(sid, bid, mid) {
    try {
        const previewResponse = await axios.get(
            `${API_URL}file/preview`,
            {
                params: {
                    sid,
                    f: 0,
                    l: 8,
                    c: 1,
                    m: mid,
                    b: bid,
                    k: API_KEY
                },
                headers: { 'x-key': API_KEY }
            }
        );

        const preview = previewResponse.data;

        return preview;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

async function readIntelx(sid, btype) {

    const params = {
        f: 0,
        storageid: sid,
        bucket: btype,
        k: API_KEY,
        license: "api"
    };

    const headers = {
        'x-key': API_KEY
    };

    try {
        const response = await axios.get(`${API_URL}file/view`, {
            params,
            headers
        });

        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

async function statsIntelx(id) {
    const params = {
        id
    };

    const headers = {
        'x-key': API_KEY
    };

    try {
        const response = await axios.get(`${API_URL}intelligent/search/statistic`, {
            params,
            headers
        });

        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}



module.exports = { initSearchIntel, searchIntelx, searchPreview, readIntelx };
