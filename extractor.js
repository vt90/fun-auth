const moment = require('moment');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const PEOPLE = [
    { id: uuidv4(), firstName: 'Alexandra', lastName: 'Busu' },
    { id: uuidv4(), firstName: 'Iulia', lastName: 'Benyi' },
    { id: uuidv4(), firstName: 'Corina', lastName: 'Cioloca' },
    { id: uuidv4(), firstName: 'Matei', lastName: 'Pintilie' },
    { id: uuidv4(), firstName: 'Cristian', lastName: 'Poputea' },
];

const extractFeedback = () => {
  const peopleInfo = PEOPLE.reduce((acc = [], person) => {
      const reviewData = require(`./data/${person.firstName.toLowerCase()}.json`);

      const personReviewInfo = {
          ...person,
          reviewSessions: reviewData.reduce((acc, reviewItem) => {
              const domain = reviewItem['Core area'];
              const analysedBehaviour = reviewItem['Expected behaviour'];

              if (reviewItem['Current Review']) {
                  const reviewSession = moment('2022-08-15', 'YYYY-MM-DD').toISOString();
                  if (!acc[reviewSession]) {
                      acc[reviewSession] = [];
                  }

                  acc[reviewSession].push({
                      domain,
                      analysedBehaviour,
                      review: reviewItem['Current Review'],
                      notes: reviewItem['Notes'],
                      reviewSession,
                  });
              }

              if (reviewItem['Previous Review'] || reviewItem['Previous Review'] === '' ) {
                  const reviewSession = moment('2021-12-15', 'YYYY-MM-DD').toISOString();
                  if (!acc[reviewSession]) {
                      acc[reviewSession] = [];
                  }

                  acc[reviewSession].push({
                      domain,
                      analysedBehaviour,
                      review: reviewItem['Previous Review'],
                      notes: reviewItem['Notes__1'],
                      reviewSession,
                  });
              }


              if (reviewItem['Previous Review__1']) {
                  const reviewSession = moment('2021-06-15', 'YYYY-MM-DD').toISOString();
                  if (!acc[reviewSession]) {
                      acc[reviewSession] = [];
                  }

                  acc[reviewSession].push({
                      domain,
                      analysedBehaviour,
                      review: reviewItem['Previous Review__1'],
                      notes: reviewItem['Previous Notes'],
                      reviewSession,
                  });
              }

              return acc;
          }, {}),
      };



      acc.push(personReviewInfo);

      return acc;
  }, []);

  return peopleInfo;
};

fs.writeFile(`DB.json`, JSON.stringify(extractFeedback(), null, 2), 'utf8', () => console.log('done'));
