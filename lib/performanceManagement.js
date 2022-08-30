export const COLORS = [
    [132, 191, 164],
    [36, 142, 166],
    [242, 82, 68],
    [227, 23, 124],
    [242, 162, 92],
];

export const DOMAINS = [
    'Domain Competence',
    'Pragmatism',
    'Work ethic',
    'Coaching and learning',
    'Communication',
];

export const RATINGS = [
    'Never',
    'Rarely',
    'Sometimes',
    'Frequently',
    'Always',
];

export const DOMAIN_VALUES = DOMAINS.reduce((acc, cur, index) => ({
    ...acc,
    [cur]: (1 / DOMAINS.length) * (index + 1),
}), {});

export const extractPerformanceDataFromReport = (currentReport, previousReport) => {
    const domainMapping = {};
    const domainRatingMap = {};
    let currentDomainIterated = null;
    let currentDomainIndex = 0;


    return currentReport
        .map((currentReviewInfo) => {
            const { domain, analysedBehaviour, review  } = currentReviewInfo;

            const previousReviewInfo = previousReport?.find((entry) => entry.domain === domain && entry.analysedBehaviour === analysedBehaviour);
            const currentRating = getReviewItemRating(review);
            const previousRating = getReviewItemRating(previousReviewInfo?.review);
            const previousReview = previousReviewInfo?.review || null;
            const previousNotes = previousReviewInfo?.notes || null;
            const previousReviewSession = previousReviewInfo?.reviewSession || null;
            const progress = currentRating - previousRating;


            const domainRatingKey = getDomainRatingKey(domain, currentRating)

            if (!domainMapping[domain]) {
                domainMapping[domain] = true;
            }

            if (!domainRatingMap[domainRatingKey]) {
                domainRatingMap[domainRatingKey] = 0;
            }

            domainRatingMap[domainRatingKey]++;

            return [
                currentRating,
                {
                    ...currentReviewInfo,
                    currentRating,
                    previousReviewSession,
                    previousReview,
                    previousNotes,
                    previousRating,
                    progress,
                },
            ];
        })
        .map(([currentRating, entry]) => {
            const domain = entry.domain;
            const domainRatingKey = getDomainRatingKey(domain, currentRating);

            let ratingPosition;

            if (domainRatingMap[domainRatingKey] === 1) {
                ratingPosition = DOMAIN_VALUES[domain] - 0.1;
            }
            else {
                const OFFSET = 0.05;
                const domainRatingInterval = splitInterval(
                    DOMAIN_VALUES[domain] - 0.2 + OFFSET,
                    DOMAIN_VALUES[domain] - OFFSET,
                    domainRatingMap[domainRatingKey],
                )

                if (currentDomainIterated !== domainRatingKey) {
                    currentDomainIterated = domainRatingKey;
                    currentDomainIndex = 0;
                }

                ratingPosition = domainRatingInterval[currentDomainIndex];

                currentDomainIndex++;
            }


            return [
                currentRating ? currentRating -1 : currentRating,
                ratingPosition,
                {
                    ...entry,
                }
            ];
        });
};

const getDomainRatingKey = (domain, currentRating) => {
    return `${domain}-${currentRating}`;
}

const getReviewItemRating = (reviewItem) => {
    return reviewItem ? parseInt(reviewItem.split(' - ')[0], 10) : null;
}

const splitInterval = (left, right, parts) => {
    const result = [];
    const delta = (right - left) / (parts - 1);
    while (left < right) {
        result.push(left);
        left += delta;
    }
    result.push(right);
    return result;
}
