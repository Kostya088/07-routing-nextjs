"use client";

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <>
      <p style={{ textAlign: "center" }}>
        Could not fetch note details. {error.message}
      </p>
    </>
  );
}
