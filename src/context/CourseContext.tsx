"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Course = {
  _id: string;
  title: string;
  duration: string;
  price: string;
  image: string;
  syllabus: string[];
};

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/academy-courses`);
      if (!res.ok) {
        throw new Error(`Failed to fetch courses: ${res.statusText}`);
      }
      const data = await res.json();
      setCourses(data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // Refresh courses every 30 seconds to show admin updates
    const interval = setInterval(fetchCourses, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, error, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
