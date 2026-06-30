"use client";
import { useEffect } from "react";

export default function ShareRedirect({ to }) {
  useEffect(() => {
    const id = setTimeout(() => { window.location.replace(to); }, 50);
    return () => clearTimeout(id);
  }, [to]);
  return null;
}
