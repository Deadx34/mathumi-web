"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Course = {
  _id: string;
  title: string;
  duration: string;
  price: string;
  image: string;
  images?: string[];
  syllabus: string[];
};

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const DEFAULT_COURSES: Course[] = [
  {
    _id: 'ac1',
    title: 'Professional Bridal Makeup Course',
    duration: '3 Months',
    price: 'Rs. 45,000',
    image: '/hero-saree.png',
    syllabus: [
      'Day & Night Makeup',
      'Bridal Draping',
      'Hairstyling Basics',
      'Product Knowledge'
    ]
  },
  {
    _id: 'ac2',
    title: 'Self Grooming Mastery',
    duration: '1 Month',
    price: 'Rs. 15,000',
    image: '/hero-saree.png',
    syllabus: [
      'Daily Skincare Routine',
      'Natural Makeup Look',
      'Basic Blowdry',
      'Wardrobe Styling'
    ]
  }
];

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.mathumibridal.com'}/api/academy-courses`);
      if (!res.ok) {
        throw new Error(`Failed to fetch courses: ${res.statusText}`);
      }
      const data = await res.json();
      setCourses(data || []);
    } catch (err) {
      console.warn('Error fetching courses:', err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 0);
    // Refresh courses every 30 seconds to show admin updates
    const interval = setInterval(fetchCourses, 30000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
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

