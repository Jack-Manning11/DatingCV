import React, { useEffect, useState } from 'react';
import './styles/Output.css';
import photos from './data/consolidated_results.json';

const Output = () => {
  const [yesPhotos, setYesPhotos] = useState([]);
  const [noPhotos, setNoPhotos] = useState([]);
  const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });
  const [confidenceBuckets, setConfidenceBuckets] = useState({
    Male: Array(10).fill(0),
    Female: Array(10).fill(0),
  });
  const [ageData, setAgeData] = useState({
    lowestAge: Infinity,
    highestAge: -Infinity,
    totalLowAge: 0,
    totalHighAge: 0,
    averageLowAge: 0,
    averageHighAge: 0,
    mostPopularAgeRange: '',
  });
  const [attributesCounts, setAttributesCounts] = useState({
    sunglasses: { true: 0, false: 0 },
    eyeglasses: { true: 0, false: 0 },
    smile: { true: 0, false: 0 },
    beard: { true: 0, false: 0 },
    mustache: { true: 0, false: 0 },
  });
  const [emotionBuckets, setEmotionBuckets] = useState({});

  useEffect(() => {
    const yesPhotos = JSON.parse(localStorage.getItem('yesPhotos')) || [];
    setYesPhotos(yesPhotos);
    const noPhotos = JSON.parse(localStorage.getItem('noPhotos')) || [];
    setNoPhotos(noPhotos);

    const genderCounts = { Male: 0, Female: 0 };
    const confidenceBuckets = { Male: Array(10).fill(0), Female: Array(10).fill(0) };
    let lowestAge = Infinity;
    let highestAge = -Infinity;
    let totalLowAge = 0;
    let totalHighAge = 0;
    let count = 0;
    const ageRangeBuckets = {};
    const attributesCounts = {
      sunglasses: { true: 0, false: 0 },
      eyeglasses: { true: 0, false: 0 },
      smile: { true: 0, false: 0 },
      beard: { true: 0, false: 0 },
      mustache: { true: 0, false: 0 },
    };
    const emotionBuckets = {};

    photos.forEach((photo) => {
      const faceDetails = photo.rekognition_data.FaceDetails[0];
      const { AgeRange, Gender, Sunglasses, Eyeglasses, Smile, Beard, Mustache, Emotions } = faceDetails;
      const lowAge = AgeRange.Low;
      const highAge = AgeRange.High;
      const gender = Gender.Value;
      const confidence = Gender.Confidence;

      // Update gender counts
      if (gender in genderCounts) {
        genderCounts[gender] += 1;
      }

      // Update confidence buckets
      const bucketIndex = Math.min(Math.floor(confidence / 10), 9); // Ensure the index is within bounds
      if (gender in confidenceBuckets) {
        confidenceBuckets[gender][bucketIndex] += 1;
      }

      // Update lowest and highest ages
      if (lowAge < lowestAge) {
        lowestAge = lowAge;
      }
      if (highAge > highestAge) {
        highestAge = highAge;
      }

      // Accumulate total ages and count
      totalLowAge += lowAge;
      totalHighAge += highAge;
      count += 1;

      // Determine the age range bucket index
      const bucketStart = Math.floor(lowAge / 5) * 5;
      const bucketEnd = bucketStart + 4;
      const bucketLabel = `${bucketStart}-${bucketEnd}`;

      // Increment the appropriate age range bucket
      if (ageRangeBuckets[bucketLabel]) {
        ageRangeBuckets[bucketLabel] += 1;
      } else {
        ageRangeBuckets[bucketLabel] = 1;
      }

      // Update attribute counts
      attributesCounts.sunglasses[Sunglasses.Value ? 'true' : 'false'] += 1;
      attributesCounts.eyeglasses[Eyeglasses.Value ? 'true' : 'false'] += 1;
      attributesCounts.smile[Smile.Value ? 'true' : 'false'] += 1;
      attributesCounts.beard[Beard.Value ? 'true' : 'false'] += 1;
      attributesCounts.mustache[Mustache.Value ? 'true' : 'false'] += 1;

      // Update emotion confidence buckets
      Emotions.forEach((emotion) => {
        const { Type, Confidence } = emotion;
        const bucketIndex = Math.min(Math.floor(Confidence / 10), 9); // Ensure the index is within bounds
        if (!emotionBuckets[Type]) {
          emotionBuckets[Type] = Array(10).fill(0);
        }
        emotionBuckets[Type][bucketIndex] += 1;
      });
    });

    const averageLowAge = totalLowAge / count;
    const averageHighAge = totalHighAge / count;

    // Find the most popular age range
    let mostPopularAgeRange = '';
    let maxCount = 0;
    for (const [range, rangeCount] of Object.entries(ageRangeBuckets)) {
      if (rangeCount > maxCount) {
        mostPopularAgeRange = range;
        maxCount = rangeCount;
      }
    }

    // Update state with the processed data
    setGenderCounts(genderCounts);
    setConfidenceBuckets(confidenceBuckets);
    setAgeData({
      lowestAge,
      highestAge,
      totalLowAge,
      totalHighAge,
      averageLowAge,
      averageHighAge,
      mostPopularAgeRange,
    });
    setAttributesCounts(attributesCounts);
    setEmotionBuckets(emotionBuckets);
  }, []);

  return (
    <div className="container">
      <div className="section">
        <h2>Gender Information</h2>
        <h4>Male</h4>
        <p>Total number of males: {genderCounts.Male}</p>
        <p>Male Confidence Breakdowns</p>
        <ul>
          {confidenceBuckets.Male.map((count, index) => (
            <li key={index}>
              <p>{`${index * 10}-${index * 10 + 9}: ${count}`}</p>
            </li>
          ))}
        </ul>
        <h4>Female</h4>
        <p>Total number of females: {genderCounts.Female}</p>
        <p>Female Confidence Breakdowns</p>
        <ul>
          {confidenceBuckets.Female.map((count, index) => (
            <li key={index}>
              <p>{`${index * 10}-${index * 10 + 9}: ${count}`}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Age Information</h2>
        <p>Lowest Age: {ageData.lowestAge}</p>
        <p>Highest Age: {ageData.highestAge}</p>
        <p>Total Low Age: {ageData.totalLowAge}</p>
        <p>Total High Age: {ageData.totalHighAge}</p>
        <p>Average Low Age: {ageData.averageLowAge.toFixed(2)}</p>
        <p>Average High Age: {ageData.averageHighAge.toFixed(2)}</p>
        <p>Most common age range: {ageData.mostPopularAgeRange}</p>
      </div>
      <div className="section">
        <h2>Attributes Information</h2>
        <p>Sunglasses (True: {attributesCounts.sunglasses.true}, False: {attributesCounts.sunglasses.false})</p>
        <p>Eyeglasses (True: {attributesCounts.eyeglasses.true}, False: {attributesCounts.eyeglasses.false})</p>
        <p>Smile (True: {attributesCounts.smile.true}, False: {attributesCounts.smile.false})</p>
        <p>Beard (True: {attributesCounts.beard.true}, False: {attributesCounts.beard.false})</p>
        <p>Mustache (True: {attributesCounts.mustache.true}, False: {attributesCounts.mustache.false})</p>
      </div>
      <div className="section">
        <h2>Emotions Information</h2>
        {Object.entries(emotionBuckets).map(([emotion, buckets]) => (
          <div key={emotion}>
            <h4>{emotion}</h4>
            <ul>
              {buckets.map((count, index) => (
                <li key={index}>
                  <p>{`${index * 10}-${index * 10 + 9}: ${count}`}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Output;
