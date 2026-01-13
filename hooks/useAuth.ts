"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/patio", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token inválido");
        }

        setLoading(false);
      } catch {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    validate();
  }, []);

  return { loading };
}
