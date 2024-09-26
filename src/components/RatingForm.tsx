// src/components/RatingForm.tsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const areas = ["Productivity", "Enjoyment", "Teamwork", "Learning", "Serenity"];

const RatingForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({
    Productivity: 0,
    Enjoyment: 0,
    Teamwork: 0,
    Learning: 0,
    Serenity: 0,
  });

  const handleRatingChange = (area: string, value: number) => {
    setRatings({ ...ratings, [area]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "ratings"), {
        userId,
        ratings,
        createdAt: new Date(),
      });
      setRatings({ Productivity: 0, Enjoyment: 0, Teamwork: 0, Learning: 0, Serenity: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {areas.map((area) => (
        <div key={area}>
          <label>{area}</label>
          <select value={ratings[area]} onChange={(e) => handleRatingChange(area, Number(e.target.value))}>
            <option value={0}>0</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit">Submit Ratings</button>
    </form>
  );
};

export default RatingForm;
