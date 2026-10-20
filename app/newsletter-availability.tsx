"use client";
import { createContext, useContext } from "react";
const Availability = createContext(false);
export function NewsletterAvailability({
  available,
  children,
}: {
  available: boolean;
  children: React.ReactNode;
}) {
  return (
    <Availability.Provider value={available}>{children}</Availability.Provider>
  );
}
export const useNewsletterAvailability = () => useContext(Availability);
