"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'inquiries' | 'manageSarees' | 'manageAcademy' | 'manageSalon' | 'manageCategories' | 'manageGallery'>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [sarees, setSarees] = useState<any[]>([]);
  const [academyCourses, setAcademyCourses] = useState<any[]>([]);
  const [salonServices, setSalonServices] = useState<any[]>([]);
  const [salonCategories, setSalonCategories] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Add/Edit Saree State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sareeForm, setSareeForm] = useState({ 
    _id: '', 
    name: '', 
    price: '', 
    image: '/hero-saree.png', 
    color: '',
    category: 'Pure Kanchipuram Silk Sarees',
    type: 'SAREE',
    fabric: '',
    zari: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Add/Edit Salon Category State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ _id: '', name: '', description: '', image: '' });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Add/Edit Salon Service State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({ _id: '', title: '', category: 'Hair Styling', description: '', image: '' });
  const [isEditingService, setIsEditingService] = useState(false);

  // Add/Edit Academy Course State
  const [isAcademyModalOpen, setIsAcademyModalOpen] = useState(false);
  const [academyForm, setAcademyForm] = useState({ _id: '', title: '', duration: '', price: '', image: '', syllabus: '' });
  const [isEditingAcademy, setIsEditingAcademy] = useState(false);

  // Add/Edit Gallery State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ _id: '', title: '', category: 'General', url: '' });
  const [isEditingGallery, setIsEditingGallery] = useState(false);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) return data.imageUrl;
      alert("Image upload failed: " + data.message);
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
    return null;
  };

  const onDropSaree = async (files: File[]) => { 
    if (!files || files.length === 0) {
      alert("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!");
      return;
    }
    const url = await uploadImage(files[0]); 
    if(url) setSareeForm(p => ({...p, image: url})); 
  };
  const onDropCategory = async (files: File[]) => { 
    if (!files || files.length === 0) {
      alert("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!");
      return;
    }
    const url = await uploadImage(files[0]); 
    if(url) setCategoryForm(p => ({...p, image: url})); 
  };
  const onDropService = async (files: File[]) => { 
    if (!files || files.length === 0) {
      alert("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!");
      return;
    }
    const url = await uploadImage(files[0]); 
    if(url) setServiceForm(p => ({...p, image: url})); 
  };
  const onDropAcademy = async (files: File[]) => { 
    if (!files || files.length === 0) {
      alert("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!");
      return;
    }
    const url = await uploadImage(files[0]); 
    if(url) setAcademyForm(p => ({...p, image: url})); 
  };
  const onDropGallery = async (files: File[]) => { 
    if (!files || files.length === 0) {
      alert("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!");
      return;
    }
    const url = await uploadImage(files[0]); 
    if(url) setGalleryForm(p => ({...p, url: url})); 
  };

  const { getRootProps: getSareeProps, getInputProps: getSareeInput, isDragActive: isSareeDrag } = useDropzone({ 
    onDrop: onDropSaree, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    useFsAccessApi: false
  });
  const { getRootProps: getCategoryProps, getInputProps: getCategoryInput, isDragActive: isCategoryDrag } = useDropzone({ 
    onDrop: onDropCategory, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    useFsAccessApi: false
  });
  const { getRootProps: getServiceProps, getInputProps: getServiceInput, isDragActive: isServiceDrag } = useDropzone({ 
    onDrop: onDropService, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    useFsAccessApi: false
  });
  const { getRootProps: getAcademyProps, getInputProps: getAcademyInput, isDragActive: isAcademyDrag } = useDropzone({ 
    onDrop: onDropAcademy, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    useFsAccessApi: false
  });
  const { getRootProps: getGalleryProps, getInputProps: getGalleryInput, isDragActive: isGalleryDrag } = useDropzone({ 
    onDrop: onDropGallery, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    useFsAccessApi: false
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchAllData(token);
  }, [router]);

  const fetchAllData = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const [bRes, iRes, sRes, aRes, salonRes, gRes, catRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/inquiries`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/sarees`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/academy-courses`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/salon-services`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/gallery`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/salon-categories`)
      ]);

      if (bRes.status === 401 || bRes.status === 400) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      if (!bRes.ok || !iRes.ok || !sRes.ok || !aRes.ok || !salonRes.ok || !gRes.ok || !catRes.ok) {
        throw new Error(`Server returned error status.`);
      }

      setBookings(await bRes.json());
      setInquiries(await iRes.json());
      setSarees(await sRes.json());
      setAcademyCourses(await aRes.json());
      setSalonServices(await salonRes.json());
      setGallery(await gRes.json());
      setSalonCategories(await catRes.json());
    } catch (err: any) {
      console.error("Dashboard connection error:", err);
      setError(err.message || 'Failed to connect to the backend server. Please make sure the backend is running.');
    }
    setLoading(false);
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert('Failed to update booking status: ' + (errorData.message || 'Unknown error'));
      }
      fetchAllData(token!);
    } catch (err) {
      console.error(err);
      alert('Network error while updating status.');
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert('Failed to update inquiry status: ' + (errorData.message || 'Unknown error'));
      }
      fetchAllData(token!);
    } catch (err) {
      console.error(err);
      alert('Network error while updating status.');
    }
  };

  const handleSaveSaree = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = isEditing ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/sarees/${sareeForm._id}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/sarees`;
    const method = isEditing ? 'PUT' : 'POST';

    // Remove empty _id so Mongoose generates one
    const payload: any = { ...sareeForm };
    if (!payload._id) {
      delete payload._id;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert(isEditing ? "Saree updated successfully!" : "Saree added successfully!");
        setIsEditModalOpen(false);
        fetchAllData(token!);
      } else {
        const errorData = await res.json();
        alert("Failed to save saree: " + (errorData.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSaree = async (id: string) => {
    if (!confirm("Are you sure you want to delete this saree?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/sarees/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Saree deleted!");
        fetchAllData(token!);
      } else {
        alert("Failed to delete saree");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setSareeForm({ 
      _id: '', 
      name: '', 
      price: '', 
      image: '', 
      color: '',
      category: 'Pure Kanchipuram Silk Sarees',
      type: 'SAREE',
      fabric: '',
      zari: '',
      description: ''
    });
    setIsEditing(false);
    setIsEditModalOpen(true);
  };

  const openEditModal = (saree: any) => {
    setSareeForm({
      _id: saree._id || '',
      name: saree.name || '',
      price: saree.price || '',
      image: saree.image || '',
      color: saree.color || '',
      category: saree.category || 'Pure Kanchipuram Silk Sarees',
      type: saree.type || 'SAREE',
      fabric: saree.fabric || '',
      zari: saree.zari || '',
      description: saree.description || saree.desc || ''
    });
    setIsEditing(true);
    setIsEditModalOpen(true);
  };

  // --- SERVICE HANDLERS ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = isEditingService ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/salon-services/${serviceForm._id}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/salon-services`;
    const method = isEditingService ? 'PUT' : 'POST';
    const payload: any = { ...serviceForm };
    if (!payload._id) delete payload._id;

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (res.ok) { alert("Saved!"); setIsServiceModalOpen(false); fetchAllData(token!); }
      else alert("Failed to save service");
    } catch (err) { console.error(err); }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/salon-services/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { alert("Deleted!"); fetchAllData(token!); }
    } catch (err) { console.error(err); }
  };

  const openAddServiceModal = () => { 
    const defaultCat = salonCategories.length > 0 ? salonCategories[0].name : 'Hair Styling';
    setServiceForm({ _id: '', title: '', category: defaultCat, description: '', image: '' }); 
    setIsEditingService(false); 
    setIsServiceModalOpen(true); 
  };
  const openEditServiceModal = (s: any) => { setServiceForm(s); setIsEditingService(true); setIsServiceModalOpen(true); };

  // --- SALON CATEGORY HANDLERS ---
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = isEditingCategory ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/salon-categories/${categoryForm._id}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/salon-categories`;
    const method = isEditingCategory ? 'PUT' : 'POST';
    const payload: any = { ...categoryForm };
    if (!payload._id) delete payload._id;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert(isEditingCategory ? "Category updated successfully!" : "Category added successfully!");
        setIsCategoryModalOpen(false);
        fetchAllData(token!);
      } else {
        const errorData = await res.json();
        alert("Failed to save category: " + (errorData.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert("Error saving category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? Any services in this category might need to be reassigned manually.")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/salon-categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Category deleted successfully!");
        fetchAllData(token!);
      } else {
        alert("Failed to delete category");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddCategoryModal = () => {
    setCategoryForm({ _id: '', name: '', description: '', image: '' });
    setIsEditingCategory(false);
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (c: any) => {
    setCategoryForm({
      _id: c._id || '',
      name: c.name || '',
      description: c.description || '',
      image: c.image || ''
    });
    setIsEditingCategory(true);
    setIsCategoryModalOpen(true);
  };

  // --- GALLERY HANDLERS ---
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = isEditingGallery ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gallery/${galleryForm._id}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/gallery`;
    const method = isEditingGallery ? 'PUT' : 'POST';
    const payload: any = { ...galleryForm };
    if (!payload._id) delete payload._id;

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (res.ok) { alert("Saved!"); setIsGalleryModalOpen(false); fetchAllData(token!); }
      else alert("Failed to save gallery image");
    } catch (err) { console.error(err); }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gallery/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { alert("Deleted!"); fetchAllData(token!); }
    } catch (err) { console.error(err); }
  };

  const openAddGalleryModal = () => { setGalleryForm({ _id: '', title: '', category: 'General', url: '' }); setIsEditingGallery(false); setIsGalleryModalOpen(true); };
  const openEditGalleryModal = (g: any) => { setGalleryForm(g); setIsEditingGallery(true); setIsGalleryModalOpen(true); };

  // --- ACADEMY HANDLERS ---
  const handleSaveAcademy = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = isEditingAcademy ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/academy-courses/${academyForm._id}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/academy-courses`;
    const method = isEditingAcademy ? 'PUT' : 'POST';
    
    let parsedSyllabus: string | string[] = academyForm.syllabus;
    if (typeof parsedSyllabus === 'string') {
      parsedSyllabus = parsedSyllabus.split('\n').filter(s => s.trim() !== '');
    }

    const payload: any = { ...academyForm, syllabus: parsedSyllabus };
    if (!payload._id) delete payload._id;

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (res.ok) { alert("Saved!"); setIsAcademyModalOpen(false); fetchAllData(token!); }
      else alert("Failed to save academy course");
    } catch (err) { console.error(err); }
  };

  const handleDeleteAcademy = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/academy-courses/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { alert("Deleted!"); fetchAllData(token!); }
    } catch (err) { console.error(err); }
  };

  const openAddAcademyModal = () => { setAcademyForm({ _id: '', title: '', duration: '', price: '', image: '', syllabus: '' }); setIsEditingAcademy(false); setIsAcademyModalOpen(true); };
  const openEditAcademyModal = (c: any) => { 
    const syllabusString = Array.isArray(c.syllabus) ? c.syllabus.join('\n') : c.syllabus;
    setAcademyForm({ ...c, syllabus: syllabusString }); 
    setIsEditingAcademy(true); 
    setIsAcademyModalOpen(true); 
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-[#f4e8d3] w-full relative">
      
      {/* ── Mobile Overlay Backdrop ── */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-[#3a1f0d] text-[#fdf5eb] flex flex-col shadow-2xl z-50
        transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto md:shrink-0
      `}>
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpeg" 
              alt="Mathumi Logo" 
              className="object-cover h-10 w-10 rounded-full border border-[#d4af37]" 
            />
            <h1 className="text-lg md:text-xl font-bold font-serif tracking-wider">Admin Panel</h1>
          </div>
          {/* Close button inside sidebar on mobile */}
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden text-[#d4af37] hover:text-white focus:outline-none p-1"
            aria-label="Close Navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Sidebar nav links */}
        <div className="flex flex-col flex-grow p-4 gap-2 overflow-y-auto">
          {['dashboard', 'bookings', 'inquiries', 'manageSarees', 'manageAcademy', 'manageSalon', 'manageCategories', 'manageGallery'].map(tab => (
            <button 
              key={tab}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-[#d4af37] text-[#3a1f0d] shadow-md' 
                  : 'text-[#eacda3] hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => {
                setActiveTab(tab as any);
                setIsMobileSidebarOpen(false);
              }}
            >
              <span className="capitalize">{tab.replace(/([A-Z])/g, ' $1').trim()}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full bg-[#800020] text-white px-4 py-3 rounded-lg font-bold tracking-wider shadow hover:bg-red-800 transition">
            LOGOUT
          </button>
        </div>
      </div>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-30 bg-[#3a1f0d] text-[#fdf5eb] px-4 py-3 flex items-center gap-3 shadow-lg">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-[#d4af37] hover:text-white focus:outline-none p-1"
            aria-label="Open Navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img src="/logo.jpeg" alt="Mathumi Logo" className="object-cover h-8 w-8 rounded-full border border-[#d4af37]" />
          <span className="font-bold font-serif tracking-wider text-sm">Admin Panel</span>
          <span className="ml-auto text-[#d4af37] font-sans font-bold text-xs uppercase tracking-widest capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 md:p-8 overflow-y-auto">
          <div className="glass-panel bg-white/70 p-4 md:p-8 rounded-2xl border border-white/40 shadow-lg min-h-full">
          {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-[#4a2511] font-bold text-xl animate-pulse">Loading data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50/90 border border-red-200 text-red-900 p-8 rounded-2xl text-center shadow-lg max-w-xl mx-auto my-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-3xl font-bold">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#4a2511] mb-2">Connection Error</h3>
            <p className="text-sm font-semibold mb-6 text-red-700">{error}</p>
            <button 
              onClick={() => {
                const token = localStorage.getItem('adminToken');
                if (token) fetchAllData(token);
              }} 
              className="bg-[#6e1224] text-white font-bold py-3 px-8 rounded-full hover:bg-red-800 transition shadow-md tracking-wider text-xs uppercase"
            >
              Retry Connection
            </button>
          </div>
        ) : activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="gold-panel p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold text-[#800020] mb-2 uppercase">Total Bookings</h3>
              <p className="text-5xl font-light text-[#4a2511]">{bookings.length}</p>
              <p className="text-sm mt-2 text-[#4a2511] font-semibold">{bookings.filter(b => b.status === 'Pending').length} Pending</p>
            </div>
            <div className="gold-panel p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold text-[#800020] mb-2 uppercase">Total Inquiries</h3>
              <p className="text-5xl font-light text-[#4a2511]">{inquiries.length}</p>
              <p className="text-sm mt-2 text-[#4a2511] font-semibold">{inquiries.filter(i => i.status === 'New').length} New</p>
            </div>
            <div className="gold-panel p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold text-[#800020] mb-2 uppercase">Catalog Size</h3>
              <p className="text-5xl font-light text-[#4a2511]">{sarees.length}</p>
              <p className="text-sm mt-2 text-[#4a2511] font-semibold">Active Sarees</p>
            </div>
          </div>
        ) : activeTab === 'bookings' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f4e8d3] text-[#4a2511]">
                  <th className="p-3">Date Created</th>
                  <th className="p-3">Name & Contact</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Scheduled For</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className="border-b hover:bg-[#fdf5eb]">
                    <td className="p-3 text-sm">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <p className="font-bold text-[#4a2511]">{b.fullName}</p>
                      <p className="text-xs text-gray-600">{b.contactNumber}</p>
                    </td>
                    <td className="p-3 font-semibold text-[#800020]">{b.serviceRequested}</td>
                    <td className="p-3 text-sm">
                      <p>{b.preferredDate || 'No Date'}</p>
                      <p className="text-gray-500">{b.timeSlot || 'No Time'}</p>
                    </td>
                    <td className="p-3">
                      <select 
                        value={b.status || 'Pending'}
                        onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                        className={`p-1 text-sm rounded font-bold border ${b.status === 'Pending' || !b.status ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 border-blue-300' : b.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && <tr><td colSpan={5} className="p-4 text-center">No bookings found</td></tr>}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'inquiries' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f4e8d3] text-[#4a2511]">
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items Inquired</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(i => (
                  <tr key={i._id} className="border-b hover:bg-[#fdf5eb]">
                    <td className="p-3 text-sm">{new Date(i.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <p className="font-bold text-[#4a2511]">{i.customerName || 'Guest User'}</p>
                      <p className="text-xs text-[#800020] font-semibold">{i.contactNumber || 'No Contact'}</p>
                    </td>
                    <td className="p-3">
                      <span className="bg-[#e5c07b] text-[#4a2511] px-2 py-1 rounded text-xs font-bold mb-1.5 inline-block">{i.items?.length || 0} items</span>
                      <div className="text-xs text-[#4a2511] max-w-xs space-y-1.5 mt-1">
                        {i.items?.map((item: any, idx: number) => (
                          <div key={item._id || idx} className="flex items-center gap-1.5 bg-white/40 p-1.5 rounded border border-[#eacda3]/40">
                            {item.image && <img src={item.image} alt="" className="w-8 h-8 object-cover rounded shadow-sm flex-shrink-0" />}
                            <div className="truncate">
                              <p className="font-bold text-[11px] leading-tight truncate">{item.name || 'Unknown Item'}</p>
                              <p className="text-[9px] text-gray-500 leading-none">{item.price || 'No Price'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <select 
                        value={i.status || 'New'}
                        onChange={(e) => handleUpdateInquiryStatus(i._id, e.target.value)}
                        className={`p-1 text-sm rounded font-bold border ${i.status === 'New' || !i.status ? 'bg-green-100 text-green-800 border-green-300' : i.status === 'Contacted' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && <tr><td colSpan={4} className="p-4 text-center">No inquiries found</td></tr>}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'manageSarees' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#4a2511]">Saree Catalog</h2>
              <button onClick={openAddModal} className="gold-button px-4 py-2 text-sm shadow">
                + Add New Saree
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f4e8d3] text-[#4a2511]">
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Color</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sarees.map(s => (
                    <tr key={s._id} className="border-b hover:bg-[#fdf5eb]">
                      <td className="p-3">
                        <img src={s.image} alt="saree" className="w-12 h-12 object-cover rounded shadow" />
                      </td>
                      <td className="p-3 font-semibold text-[#4a2511]">{s.name}</td>
                      <td className="p-3 text-[#800020] font-bold">{s.price}</td>
                      <td className="p-3 capitalize">{s.color}</td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => openEditModal(s)} className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-100 px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteSaree(s._id)} className="text-red-600 hover:text-red-800 font-bold text-sm bg-red-100 px-3 py-1 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {sarees.length === 0 && <tr><td colSpan={5} className="p-4 text-center">No sarees found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'manageAcademy' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#4a2511]">Academy Courses</h2>
              <button onClick={openAddAcademyModal} className="gold-button px-4 py-2 text-sm shadow">
                + Add Course
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f4e8d3] text-[#4a2511] border-b border-[#d4af37]">
                    <th className="p-3">Image</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Price</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {academyCourses.map(c => (
                    <tr key={c._id} className="border-b border-[#eacda3] hover:bg-[#fdf5eb]">
                      <td className="p-3">
                        <img src={c.image || '/academy_class1.png'} alt="course" className="w-12 h-12 object-cover rounded shadow" />
                      </td>
                      <td className="p-3 font-semibold text-[#4a2511]">{c.title}</td>
                      <td className="p-3 text-sm">{c.duration}</td>
                      <td className="p-3 font-bold text-[#800020]">{c.price}</td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => openEditAcademyModal(c)} className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-100 px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteAcademy(c._id)} className="text-red-600 hover:text-red-800 font-bold text-sm bg-red-100 px-3 py-1 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {academyCourses.length === 0 && <tr><td colSpan={3} className="p-4 text-center">No courses found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'manageSalon' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#4a2511]">Salon Services</h2>
              <button onClick={openAddServiceModal} className="gold-button px-4 py-2 text-sm shadow">
                + Add Service
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f4e8d3] text-[#4a2511] border-b border-[#d4af37]">
                    <th className="p-3">Image</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salonServices.map(s => (
                    <tr key={s._id} className="border-b border-[#eacda3] hover:bg-[#fdf5eb]">
                      <td className="p-3">
                        <img src={s.image || '/salon-service.png'} alt="service" className="w-12 h-12 object-cover rounded shadow" />
                      </td>
                      <td className="p-3 font-semibold text-[#4a2511]">{s.title}</td>
                      <td className="p-3 text-sm">{s.category}</td>
                      <td className="p-3 text-xs text-gray-700">{s.description}</td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => openEditServiceModal(s)} className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-100 px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteService(s._id)} className="text-red-600 hover:text-red-800 font-bold text-sm bg-red-100 px-3 py-1 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {salonServices.length === 0 && <tr><td colSpan={3} className="p-4 text-center">No services found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'manageCategories' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#4a2511]">Salon Categories</h2>
              <button onClick={openAddCategoryModal} className="gold-button px-4 py-2 text-sm shadow">
                + Add Category
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f4e8d3] text-[#4a2511] border-b border-[#d4af37]">
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salonCategories.map(c => (
                    <tr key={c._id} className="border-b border-[#eacda3] hover:bg-[#fdf5eb]">
                      <td className="p-3">
                        <img src={c.image || '/salon-service.png'} alt="category" className="w-12 h-12 object-cover rounded shadow" />
                      </td>
                      <td className="p-3 font-semibold text-[#4a2511]">{c.name}</td>
                      <td className="p-3 text-xs text-gray-700">{c.description}</td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => openEditCategoryModal(c)} className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-100 px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteCategory(c._id)} className="text-red-600 hover:text-red-800 font-bold text-sm bg-red-100 px-3 py-1 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {salonCategories.length === 0 && <tr><td colSpan={4} className="p-4 text-center">No categories found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'manageGallery' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#4a2511]">Gallery Images</h2>
              <button onClick={openAddGalleryModal} className="gold-button px-4 py-2 text-sm shadow">
                + Upload Image
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {gallery.map(img => (
                <div key={img._id} className="relative rounded overflow-hidden border-2 border-[#d4af37] h-32 group shadow-sm hover:shadow-lg transition">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#4a2511] bg-opacity-80 text-[#fdf5eb] text-xs p-1 truncate text-center font-semibold">
                    {img.title}
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditGalleryModal(img)} className="bg-blue-600 text-white p-2 rounded shadow hover:bg-blue-700">✎</button>
                    <button onClick={() => handleDeleteGallery(img._id)} className="bg-red-600 text-white p-2 rounded shadow hover:bg-red-700">🗑</button>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && <p className="col-span-full text-center py-4">No gallery images found</p>}
            </div>
          </div>
        ) : null}
          </div>
        </div>
      </div>

      {/* Saree Add/Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000] p-4">
          <div className="gold-panel p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-2xl font-bold text-[#4a2511]">&times;</button>
            <h2 className="text-2xl font-bold text-[#4a2511] mb-6 uppercase text-center border-b border-[#d4af37] pb-2">
              {isEditing ? 'Edit Saree' : 'Add New Saree'}
            </h2>
            <form onSubmit={handleSaveSaree} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Saree Name</label>
                <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.name} onChange={e => setSareeForm({...sareeForm, name: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Price</label>
                  <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.price} onChange={e => setSareeForm({...sareeForm, price: e.target.value})} />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Color</label>
                  <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.color} onChange={e => setSareeForm({...sareeForm, color: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Category</label>
                  <select className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.category} onChange={e => setSareeForm({...sareeForm, category: e.target.value})}>
                    <option value="Pure Kanchipuram Silk Sarees">Kanchipuram Silk Sarees</option>
                    <option value="Rich Aari Work Blouses">Rich Aari Work Blouses</option>
                    <option value="Lehengas">Lehengas</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Type</label>
                  <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" placeholder="SAREE or AARI BLOUSE" value={sareeForm.type} onChange={e => setSareeForm({...sareeForm, type: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Fabric (e.g. Pure Silk)</label>
                  <input type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.fabric} onChange={e => setSareeForm({...sareeForm, fabric: e.target.value})} />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Zari (e.g. Gold Zari)</label>
                  <input type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.zari} onChange={e => setSareeForm({...sareeForm, zari: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Description</label>
                <textarea rows={3} className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.description} onChange={e => setSareeForm({...sareeForm, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Saree Image</label>
                <div 
                  {...getSareeProps()} 
                  className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isSareeDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}
                >
                  <input {...getSareeInput()} />
                  {
                    isSareeDrag ?
                      <p className="text-[#800020] font-semibold">Drop the image here ...</p> :
                      <p className="text-[#4a2511]">Drag & drop a saree image here, or click to select one</p>
                  }
                </div>
                {sareeForm.image && (
                  <div className="mt-2 text-center">
                    <img src={sareeForm.image} alt="Preview" className="h-20 mx-auto object-cover border border-[#d4af37] rounded" />
                  </div>
                )}
              </div>
              <button type="submit" className="gold-button w-full mt-6 text-sm py-3 uppercase tracking-wide">
                {isEditing ? 'Save Changes' : 'Add Saree'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Service Add/Edit Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000] p-4">
          <div className="gold-panel p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsServiceModalOpen(false)} className="absolute top-4 right-4 text-2xl font-bold text-[#4a2511]">&times;</button>
            <h2 className="text-2xl font-bold text-[#4a2511] mb-6 uppercase text-center border-b border-[#d4af37] pb-2">
              {isEditingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Service Title</label>
                <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Category</label>
                <select className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" value={serviceForm.category} onChange={e => setServiceForm({...serviceForm, category: e.target.value})}>
                  {salonCategories.map((c: any) => (
                    <option key={c._id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Description</label>
                <textarea required className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" rows={3} value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Service Image</label>
                <div {...getServiceProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isServiceDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getServiceInput()} />
                  <p className="text-[#4a2511]">{isServiceDrag ? 'Drop image...' : 'Drag & drop image'}</p>
                </div>
                {serviceForm.image && <img src={serviceForm.image} alt="Preview" className="h-20 mt-2 mx-auto object-cover border border-[#d4af37] rounded" />}
              </div>
              <button type="submit" className="gold-button w-full mt-6 text-sm py-3 uppercase">
                {isEditingService ? 'Save Changes' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category Add/Edit Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000] p-4">
          <div className="gold-panel p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsCategoryModalOpen(false)} className="absolute top-4 right-4 text-2xl font-bold text-[#4a2511]">&times;</button>
            <h2 className="text-2xl font-bold text-[#4a2511] mb-6 uppercase text-center border-b border-[#d4af37] pb-2">
              {isEditingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Category Name</label>
                <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Description</label>
                <textarea required className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" rows={3} value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Category Hero Image</label>
                <div {...getCategoryProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isCategoryDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getCategoryInput()} />
                  <p className="text-[#4a2511]">{isCategoryDrag ? 'Drop image...' : 'Drag & drop image'}</p>
                </div>
                {categoryForm.image && <img src={categoryForm.image} alt="Preview" className="h-20 mt-2 mx-auto object-cover border border-[#d4af37] rounded" />}
              </div>
              <button type="submit" className="gold-button w-full mt-6 text-sm py-3 uppercase">
                {isEditingCategory ? 'Save Changes' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Add/Edit Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000] p-4">
          <div className="gold-panel p-8 w-full max-w-md relative">
            <button onClick={() => setIsGalleryModalOpen(false)} className="absolute top-4 right-4 text-2xl font-bold text-[#4a2511]">&times;</button>
            <h2 className="text-2xl font-bold text-[#4a2511] mb-6 uppercase text-center border-b border-[#d4af37] pb-2">
              {isEditingGallery ? 'Edit Image' : 'Upload Image'}
            </h2>
            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Image Title</label>
                <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Category</label>
                <select className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})}>
                  <option value="Bridal">Bridal</option>
                  <option value="Salon">Salon</option>
                  <option value="Academy">Academy</option>
                  <option value="Boutique">Boutique</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Upload Image</label>
                <div {...getGalleryProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isGalleryDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getGalleryInput()} />
                  <p className="text-[#4a2511]">{isGalleryDrag ? 'Drop image...' : 'Drag & drop image'}</p>
                </div>
                {galleryForm.url && <img src={galleryForm.url} alt="Preview" className="h-20 mt-2 mx-auto object-cover border border-[#d4af37] rounded" />}
              </div>
              <button type="submit" className="gold-button w-full mt-6 text-sm py-3 uppercase">
                {isEditingGallery ? 'Save Changes' : 'Upload'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Academy Add/Edit Modal */}
      {isAcademyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000] p-4">
          <div className="gold-panel p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsAcademyModalOpen(false)} className="absolute top-4 right-4 text-2xl font-bold text-[#4a2511]">&times;</button>
            <h2 className="text-2xl font-bold text-[#4a2511] mb-6 uppercase text-center border-b border-[#d4af37] pb-2">
              {isEditingAcademy ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleSaveAcademy} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Course Title</label>
                <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" value={academyForm.title} onChange={e => setAcademyForm({...academyForm, title: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Duration</label>
                  <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" placeholder="e.g. 3 Months" value={academyForm.duration} onChange={e => setAcademyForm({...academyForm, duration: e.target.value})} />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Price</label>
                  <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" placeholder="e.g. LKR 120,000" value={academyForm.price} onChange={e => setAcademyForm({...academyForm, price: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Syllabus (One item per line)</label>
                <textarea required className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb]" rows={4} value={academyForm.syllabus} onChange={e => setAcademyForm({...academyForm, syllabus: e.target.value})} placeholder="Color theory&#10;HD Makeup..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Course Image</label>
                <div {...getAcademyProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isAcademyDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getAcademyInput()} />
                  <p className="text-[#4a2511]">{isAcademyDrag ? 'Drop image...' : 'Drag & drop image'}</p>
                </div>
                {academyForm.image && <img src={academyForm.image} alt="Preview" className="h-20 mt-2 mx-auto object-cover border border-[#d4af37] rounded" />}
              </div>
              <button type="submit" className="gold-button w-full mt-6 text-sm py-3 uppercase">
                {isEditingAcademy ? 'Save Changes' : 'Add Course'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
