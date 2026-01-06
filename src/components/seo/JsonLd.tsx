import React from 'react';

const JsonLd = () => {
    const jsonLdData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://www.2alabs.com/#organization',
                name: '2aLabs',
                url: 'https://www.2alabs.com',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.2alabs.com/2alabs.png',
                    width: 512,
                    height: 512,
                },
                sameAs: [
                    'https://x.com/alkushx',
                    // Add other social profiles here
                ],
            },
            {
                '@type': 'WebSite',
                '@id': 'https://www.2alabs.com/#website',
                url: 'https://www.2alabs.com',
                name: '2aLabs',
                description: 'Your Personal AI-Powered Bookmarks',
                publisher: {
                    '@id': 'https://www.2alabs.com/#organization',
                },
                inLanguage: 'en-US',
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
    );
};

export default JsonLd;
