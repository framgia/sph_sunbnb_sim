"use client";
import React, { useState } from "react";
import ReviewModal from "./components/review/AddReviewModal";
import { Button } from "@nextui-org/react";

const Home: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <h1>Home Page</h1>
      <Button
        onPress={() => {
          setOpen(true);
        }}
      >
        Open me!
      </Button>
      <ReviewModal
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        size="xl"
      />
    </>
  );
};

export default Home;
