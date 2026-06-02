"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { useCourses } from "@/context/CourseContext";

export default function AcademyPage() {
  const { courses, loading, error } = useCourses();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    nic: '',
    dob: '',
    contact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          contactNumber: formData.contact,
          serviceRequested: 'Academy Enrollment',
          preferredDate: new Date().toISOString().split('T')[0],
          timeSlot: 'Standard Course Timing',
          message: `NIC: ${formData.nic} | DOB: ${formData.dob} | Address: ${formData.address}`
        })
      });
      if (res.ok) {
        alert("Your registration has been successfully submitted! Our team will contact you shortly.");
        setFormData({ fullName: '', address: '', nic: '', dob: '', contact: '' });
      } else {
        alert("Failed to submit student registration. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Failed to submit student registration.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full z-10 pb-20 text-[#1c1512]">
      
      {/* Hero Intro */}
      <div className="relative w-full h-[450px] md:h-[55vh] flex flex-col items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/academy_header.png" fill className="object-cover object-center" alt="Academy Hero" priority />
          <div className="absolute inset-0 bg-[#1c1512]/65 backdrop-blur-[2px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center px-6 w-full">
          <span className="text-[#c2a670] font-sans font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4">
            MATHUMI EDUCATION PORTAL
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 uppercase tracking-[0.08em] drop-shadow-md">
            THE HAIR & BEAUTY ACADEMY
          </h1>
          
          <div className="kolam-separator justify-center w-full max-w-[300px]">
            <div className="kolam-line"></div>
            <div className="kolam-ornament">✧</div>
            <div className="kolam-line"></div>
          </div>

          <p className="text-sm sm:text-base text-white/90 max-w-xl font-sans font-light leading-relaxed">
            Turn your passion into an accredited professional career. Study traditional bridal makeup, styling, and floral weaving with master instructors.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-[#fbf9f6] pt-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Academy Intro Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-20">
            <div className="flex flex-col justify-center">
              <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase mb-1">NURTURING TALENT</span>
              <h2 className="text-2xl font-serif text-[#1c1512] mb-6 uppercase tracking-wider">
                PROFESSIONAL BEAUTY EDUCATION
              </h2>
              <p className="text-sm text-[#1c1512]/80 leading-relaxed font-sans font-normal">
                Our academy is dedicated to nurturing talent and building successful beauty professionals. With highly experienced instructors, hands-on masterclasses, and comprehensive curriculums, we transform your passion into a thriving career in the beauty industry.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white border border-[#c2a670]/20 p-6 rounded flex flex-col items-center justify-center text-center shadow-sm hover:border-[#6e1224]/30 transition-all duration-300">
                <span className="text-3xl font-bold text-[#6e1224] mb-1 font-serif">500+</span>
                <span className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest">Graduates</span>
              </div>
              <div className="bg-white border border-[#c2a670]/20 p-6 rounded flex flex-col items-center justify-center text-center shadow-sm hover:border-[#6e1224]/30 transition-all duration-300">
                <span className="text-3xl font-bold text-[#6e1224] mb-1 font-serif">15+</span>
                <span className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest">Courses</span>
              </div>
              <div className="bg-white border border-[#c2a670]/20 p-6 rounded flex flex-col items-center justify-center text-center shadow-sm hover:border-[#6e1224]/30 transition-all duration-300">
                <span className="text-3xl font-bold text-[#6e1224] mb-1 font-serif">10+</span>
                <span className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest">Expert Trainers</span>
              </div>
              <div className="bg-white border border-[#c2a670]/20 p-6 rounded flex flex-col items-center justify-center text-center shadow-sm hover:border-[#6e1224]/30 transition-all duration-300">
                <span className="text-3xl font-bold text-[#6e1224] mb-1 font-serif">95%</span>
                <span className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest">Success Rate</span>
              </div>
            </div>
          </div>

          {/* Featured Courses Section */}
          <div className="w-full mb-20">
            <div className="text-center mb-12 flex flex-col items-center">
              <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase mb-1">THE ACADEMY BATCHES</span>
              <h2 className="text-3xl font-serif text-[#1c1512] mb-2 uppercase tracking-[0.08em]">FEATURED CURRICULUMS</h2>
              
              <div className="kolam-separator">
                <div className="kolam-line"></div>
                <div className="kolam-ornament">✧</div>
                <div className="kolam-line"></div>
              </div>
            </div>
            
            {loading && (
              <div className="text-center py-12">
                <p className="text-[#4a2511] font-bold text-lg animate-pulse">Loading courses...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 font-bold">Error loading courses: {error}</p>
              </div>
            )}
            
            {!loading && courses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#4a2511] font-semibold">No courses available at the moment. Please check back soon.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {courses.map((course, index) => (
                <div key={course._id} className="gold-panel bg-white rounded overflow-hidden shadow-sm flex flex-col group border border-[#c2a670]/15 hover:border-[#6e1224]/30 transition-all duration-500">
                  <div className="relative w-full h-52 sm:h-72 md:h-80 overflow-hidden">
                    <img 
                      src={course.image || '/academy_class1.png'} 
                      alt={course.title} 
                      className="absolute inset-0 w-full h-full object-cover object-top img-luxury-hover" 
                    />
                    {index === 0 && <div className="absolute top-4 left-4 bg-[#6e1224] text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-full">POPULAR</div>}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-serif font-bold text-[#1c1512] mb-6 border-b border-[#c2a670]/15 pb-4 uppercase tracking-wide">{course.title}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-[#fbf9f6] p-4 rounded border border-[#c2a670]/15 text-center">
                      <div className="pb-3 sm:pb-0 border-b sm:border-b-0 sm:border-r border-[#c2a670]/15">
                        <span className="block text-[10px] font-bold text-[#1c1512]/50 uppercase mb-1">Duration</span>
                        <span className="text-[#6e1224] font-bold text-sm sm:text-base">{course.duration}</span>
                      </div>
                      <div className="py-3 sm:py-0 border-b sm:border-b-0 sm:border-r border-[#c2a670]/15">
                        <span className="block text-[10px] font-bold text-[#1c1512]/50 uppercase mb-1">Course Fee</span>
                        <span className="text-[#6e1224] font-bold text-sm sm:text-base">{course.price}</span>
                      </div>
                      <div className="pt-3 sm:pt-0">
                        <span className="block text-[10px] font-bold text-[#1c1512]/50 uppercase mb-1">Status</span>
                        <span className="text-[#6e1224] font-bold text-sm sm:text-base">Available</span>
                      </div>
                    </div>
                    
                    {course.syllabus && course.syllabus.length > 0 && (
                      <>
                        <h4 className="font-bold text-[#1c1512] mb-3 uppercase text-[10px] tracking-widest flex items-center font-sans">
                          <span className="text-[#c2a670] mr-2">✓</span> Skills Covered:
                        </h4>
                        <ul className="text-xs text-[#1c1512]/85 mb-8 space-y-2.5 font-medium flex-grow font-sans leading-relaxed">
                          {course.syllabus.slice(0, 4).map((skill, idx) => (
                            <li key={idx}>• {skill}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    <button onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })} className="gold-button w-full py-4 rounded-full text-center tracking-widest font-bold mt-auto hover:bg-[#6e1224] hover:text-white transition-all text-xs cursor-pointer">
                      REGISTER IN THIS COURSE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Panel */}
          <div className="w-full mb-20">
            <h2 className="text-2xl font-serif text-[#1c1512] mb-12 text-center uppercase tracking-[0.1em]">ACCREDITED CERTIFICATIONS OFFERED</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="gold-panel p-8 rounded bg-white border border-[#c2a670]/15 shadow-sm text-center flex flex-col items-center">
                <span className="text-3xl mb-4 text-[#6e1224]">🎖</span>
                <h3 className="text-lg font-serif font-bold text-[#1c1512] mb-3 uppercase tracking-wide">NVQ LEVEL 4 & 5</h3>
                <p className="text-xs text-[#1c1512]/75 leading-relaxed font-sans font-medium">
                  Nationally recognized Vocational Qualifications verifying your professional mastery of government beauty sector standards.
                </p>
              </div>
              
              <div className="gold-panel p-8 rounded bg-white border border-[#c2a670]/15 shadow-sm text-center flex flex-col items-center">
                <span className="text-3xl mb-4 text-[#6e1224]">📜</span>
                <h3 className="text-lg font-serif font-bold text-[#1c1512] mb-3 uppercase tracking-wide">MATHUMI PRO DIPLOMA</h3>
                <p className="text-xs text-[#1c1512]/75 leading-relaxed font-sans font-medium">
                  Our signature brand certification confirming your qualification in exclusive Mathumi traditional bridal techniques.
                </p>
              </div>

              <div className="gold-panel p-8 rounded bg-white border border-[#c2a670]/15 shadow-sm text-center flex flex-col items-center">
                <span className="text-3xl mb-4 text-[#6e1224]">🌐</span>
                <h3 className="text-lg font-serif font-bold text-[#1c1512] mb-3 uppercase tracking-wide">INTERNATIONAL CPD</h3>
                <p className="text-xs text-[#1c1512]/75 leading-relaxed font-sans font-medium">
                  Continuing Professional Development (CPD) accreditation accepted worldwide across international styling academies.
                </p>
              </div>
            </div>
          </div>

          {/* Student Registration Form */}
          <div id="registration-form" className="w-full max-w-4xl mb-12 scroll-mt-32">
            <div className="gold-panel bg-white border border-[#c2a670]/20 rounded p-8 sm:p-12 shadow-sm">
              <div className="text-center mb-8">
                <span className="text-[#6e1224] font-sans font-bold text-[9px] tracking-[0.2em] uppercase mb-1 block">REGISTRATIONS</span>
                <h2 className="text-2xl font-serif text-[#1c1512] mb-2 uppercase tracking-[0.08em]">STUDENT ENROLLMENT FORM</h2>
                <p className="text-[#6e1224] font-sans font-bold text-[10px] tracking-wide uppercase">SECURE YOUR BATCH SLOT TODAY</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    required
                    placeholder="Anjali Kumar"
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>
                
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Residential Address *</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    required
                    placeholder="St. Anthoniyar Road, Batticaloa"
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">NIC Number *</label>
                  <input 
                    type="text" 
                    name="nic" 
                    value={formData.nic} 
                    required
                    placeholder="1999XXXXXXXX"
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Date of Birth *</label>
                  <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    required
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[#1c1512] font-sans font-bold text-[10px] tracking-wider uppercase">Contact Number *</label>
                  <input 
                    type="tel" 
                    name="contact" 
                    value={formData.contact} 
                    required
                    placeholder="+94 77 123 4567"
                    className="w-full p-4 border border-[#c2a670]/20 rounded bg-[#fbf9f6] focus:outline-none focus:border-[#6e1224] text-sm text-[#1c1512]"
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 pt-6">
                  <button type="submit" className="gold-button w-full py-4 text-xs font-bold tracking-wider uppercase shadow-md cursor-pointer">
                    SUBMIT ENROLLMENT REQUEST
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
