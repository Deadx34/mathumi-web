"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/components/Toast';

export default function AdminDashboard() {
  const { showToast, ToastElement } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'inquiries' | 'manageSarees' | 'manageAcademy' | 'manageSalon' | 'manageCategories' | 'manageGallery' | 'manageStaff'>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [sarees, setSarees] = useState<any[]>([]);
  const [academyCourses, setAcademyCourses] = useState<any[]>([]);
  const [salonServices, setSalonServices] = useState<any[]>([]);
  const [salonCategories, setSalonCategories] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Add/Edit Saree State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sareeForm, setSareeForm] = useState<{
    _id: string;
    name: string;
    price: string;
    image: string;
    images: string[];
    color: string;
    category: string;
    type: string;
    fabric: string;
    zari: string;
    description: string;
  }>({ 
    _id: '', 
    name: '', 
    price: '', 
    image: '/hero-saree.png', 
    images: [],
    color: '',
    category: 'Pure Kanchipuram Silk Sarees',
    type: 'SAREE',
    fabric: '',
    zari: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveSareeImage = (indexToRemove: number) => {
    setSareeForm(p => {
      const newImages = (p.images || []).filter((_, idx) => idx !== indexToRemove);
      return {
        ...p,
        images: newImages,
        image: newImages.length > 0 ? newImages[0] : '/hero-saree.png'
      };
    });
  };

  // Add/Edit Salon Category State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState<{ _id: string, name: string, description: string, image: string, images: string[] }>({ _id: '', name: '', description: '', image: '', images: [] });
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  const handleRemoveCategoryImage = (indexToRemove: number) => {
    setCategoryForm(p => {
      const newImages = p.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...p,
        images: newImages,
        image: newImages.length > 0 ? newImages[0] : ''
      };
    });
  };

  // Add/Edit Salon Service State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState<{ _id: string, title: string, category: string, description: string, image: string, images: string[] }>({ _id: '', title: '', category: 'Hair Styling', description: '', image: '', images: [] });
  const [isEditingService, setIsEditingService] = useState(false);

  const handleRemoveServiceImage = (indexToRemove: number) => {
    setServiceForm(p => {
      const newImages = p.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...p,
        images: newImages,
        image: newImages.length > 0 ? newImages[0] : ''
      };
    });
  };

  // Add/Edit Staff State
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffForm, setStaffForm] = useState({
    _id: '', name: '', address: '', mobile: '', whatsapp: '', nic: '', dob: '', photo: '', role: 'Beauty Therapist'
  });
  const [isEditingStaff, setIsEditingStaff] = useState(false);

  const handleRemoveStaffPhoto = () => {
    setStaffForm(p => ({ ...p, photo: '' }));
  };

  // Add/Edit Academy Course State
  const [isAcademyModalOpen, setIsAcademyModalOpen] = useState(false);
  const [academyForm, setAcademyForm] = useState({ _id: '', title: '', duration: '', price: '', image: '', images: [] as string[], syllabus: '' });
  const [isEditingAcademy, setIsEditingAcademy] = useState(false);

  const handleRemoveAcademyImage = (indexToRemove: number) => {
    setAcademyForm(p => {
      const newImages = (p.images || []).filter((_, idx) => idx !== indexToRemove);
      return {
        ...p,
        images: newImages,
        image: newImages.length > 0 ? newImages[0] : ''
      };
    });
  };

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
      showToast("Image upload failed: " + data.message, "error");
    } catch (err) {
      console.error(err);
      showToast("Error uploading image", "error");
    }
    return null;
  };

  const onDropSaree = async (files: File[]) => { 
    if (!files || files.length === 0) {
      showToast("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!", "error");
      return;
    }
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if(url) uploadedUrls.push(url);
    }
    if (uploadedUrls.length > 0) {
      setSareeForm(p => {
        const newImages = [...(p.images || []), ...uploadedUrls];
        return {
          ...p,
          image: p.image && p.image !== '/hero-saree.png' && p.image !== '' ? p.image : uploadedUrls[0],
          images: newImages
        };
      });
    }
  };
  const onDropCategory = async (files: File[]) => { 
    if (!files || files.length === 0) {
      showToast("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!", "error");
      return;
    }
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if(url) uploadedUrls.push(url);
    }
    if (uploadedUrls.length > 0) {
      setCategoryForm(p => {
        const newImages = [...(p.images || []), ...uploadedUrls];
        return {
          ...p,
          image: p.image || uploadedUrls[0],
          images: newImages
        };
      });
    }
  };
  const onDropService = async (files: File[]) => { 
    if (!files || files.length === 0) {
      showToast("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!", "error");
      return;
    }
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if(url) uploadedUrls.push(url);
    }
    if (uploadedUrls.length > 0) {
      setServiceForm(p => {
        const newImages = [...(p.images || []), ...uploadedUrls];
        return {
          ...p,
          image: p.image || uploadedUrls[0],
          images: newImages
        };
      });
    }
  };
  const onDropAcademy = async (files: File[]) => { 
    if (!files || files.length === 0) {
      showToast("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!", "error");
      return;
    }
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) uploadedUrls.push(url);
    }
    if (uploadedUrls.length > 0) {
      setAcademyForm(p => {
        const newImages = [...(p.images || []), ...uploadedUrls];
        return {
          ...p,
          image: p.image && p.image !== '' ? p.image : uploadedUrls[0],
          images: newImages
        };
      });
    }
  };
  const onDropGallery = async (files: File[]) => { 
    if (!files || files.length === 0) {
      showToast("Invalid file format. Please upload a valid image (JPG, PNG, WebP)!", "error");
      return;
    }
    const url = await uploadImage(files[0]); 
    if(url) setGalleryForm(p => ({...p, url: url})); 
  };
  const onDropStaff = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const url = await uploadImage(files[0]);
    if (url) setStaffForm(p => ({ ...p, photo: url }));
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
    useFsAccessApi: false,
    multiple: true
  });
  const { getRootProps: getGalleryProps, getInputProps: getGalleryInput, isDragActive: isGalleryDrag } = useDropzone({ 
    onDrop: onDropGallery, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    useFsAccessApi: false
  });
  const { getRootProps: getStaffProps, getInputProps: getStaffInput, isDragActive: isStaffDrag } = useDropzone({
    onDrop: onDropStaff,
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

  // Safely parse JSON — returns fallback if the response is HTML or non-JSON
  const safeJson = async (res: Response, fallback: any = []) => {
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Non-JSON response from:', res.url, '(status:', res.status + ')');
      return fallback;
    }
    try {
      return await res.json();
    } catch {
      console.warn('Failed to parse JSON from:', res.url);
      return fallback;
    }
  };

  const fetchAllData = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const authHeaders = { 'Authorization': `Bearer ${token}` };

      const [bRes, iRes, sRes, aRes, salonRes, gRes, catRes, staffRes] = await Promise.all([
        fetch(`${API}/api/bookings`, { headers: authHeaders }),
        fetch(`${API}/api/inquiries`, { headers: authHeaders }),
        fetch(`${API}/api/sarees`),
        fetch(`${API}/api/academy-courses`),
        fetch(`${API}/api/salon-services`),
        fetch(`${API}/api/gallery`),
        fetch(`${API}/api/salon-categories`),
        fetch(`${API}/api/staff`, { headers: authHeaders })
      ]);

      if (bRes.status === 401 || bRes.status === 400) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      if (!bRes.ok || !iRes.ok || !sRes.ok || !aRes.ok || !salonRes.ok || !gRes.ok || !catRes.ok) {
        throw new Error(`Server returned error status.`);
      }

      setBookings(await safeJson(bRes, []));
      setInquiries(await safeJson(iRes, []));
      setSarees(await safeJson(sRes, []));
      setAcademyCourses(await safeJson(aRes, []));
      setSalonServices(await safeJson(salonRes, []));
      setGallery(await safeJson(gRes, []));
      setSalonCategories(await safeJson(catRes, []));
      if (staffRes.ok) setStaffList(await safeJson(staffRes, []));
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
        showToast('Failed to update booking status: ' + (errorData.message || 'Unknown error'), 'error');
      } else {
        showToast('Booking status updated successfully!', 'success');
      }
      fetchAllData(token!);
    } catch (err) {
      console.error(err);
      showToast('Network error while updating status.', 'error');
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
        showToast('Failed to update inquiry status: ' + (errorData.message || 'Unknown error'), 'error');
      } else {
        showToast('Inquiry status updated successfully!', 'success');
      }
      fetchAllData(token!);
    } catch (err) {
      console.error(err);
      showToast('Network error while updating status.', 'error');
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
        showToast(isEditing ? "Saree updated successfully!" : "Saree added successfully!", 'success');
        setIsEditModalOpen(false);
        fetchAllData(token!);
      } else {
        const errorData = await res.json();
        showToast("Failed to save saree: " + (errorData.message || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast("Network error while saving saree.", 'error');
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
        showToast("Saree deleted successfully!", 'success');
        fetchAllData(token!);
      } else {
        showToast("Failed to delete saree", 'error');
      }
    } catch (err) {
      console.error(err);
      showToast("Network error while deleting saree.", 'error');
    }
  };

  const openAddModal = () => {
    setSareeForm({ 
      _id: '', 
      name: '', 
      price: '', 
      image: '', 
      images: [],
      color: '',
      category: '',
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
      images: Array.isArray(saree.images) ? saree.images : (saree.image ? [saree.image] : []),
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
      if (res.ok) { 
        showToast("Service saved successfully!", "success"); 
        setIsServiceModalOpen(false); 
        fetchAllData(token!); 
      } else {
        showToast("Failed to save service", "error");
      }
    } catch (err) { 
      console.error(err);
      showToast("Network error while saving service.", "error");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/salon-services/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { 
        showToast("Service deleted successfully!", "success"); 
        fetchAllData(token!); 
      } else {
        showToast("Failed to delete service", "error");
      }
    } catch (err) { 
      console.error(err); 
      showToast("Network error while deleting service.", "error");
    }
  };

  const openAddServiceModal = () => { 
    const defaultCat = salonCategories.length > 0 ? salonCategories[0].name : 'Hair Styling';
    setServiceForm({ _id: '', title: '', category: defaultCat, description: '', image: '', images: [] }); 
    setIsEditingService(false); 
    setIsServiceModalOpen(true); 
  };
  const openEditServiceModal = (s: any) => { 
    setServiceForm({
      ...s,
      images: s.images || (s.image ? s.image.split(',') : [])
    }); 
    setIsEditingService(true); 
    setIsServiceModalOpen(true); 
  };

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
        showToast(isEditingCategory ? "Category updated successfully!" : "Category added successfully!", "success");
        setIsCategoryModalOpen(false);
        fetchAllData(token!);
      } else {
        const errorData = await res.json();
        showToast("Failed to save category: " + (errorData.message || 'Unknown error'), "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving category", "error");
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
        showToast("Category deleted successfully!", "success");
        fetchAllData(token!);
      } else {
        showToast("Failed to delete category", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error while deleting category.", "error");
    }
  };

  const openAddCategoryModal = () => {
    setCategoryForm({ _id: '', name: '', description: '', image: '', images: [] });
    setIsEditingCategory(false);
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (c: any) => {
    setCategoryForm({
      _id: c._id || '',
      name: c.name || '',
      description: c.description || '',
      image: c.image || '',
      images: c.images || (c.image ? [c.image] : [])
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
      if (res.ok) { 
        showToast("Gallery image saved successfully!", "success"); 
        setIsGalleryModalOpen(false); 
        fetchAllData(token!); 
      } else {
        showToast("Failed to save gallery image", "error");
      }
    } catch (err) { 
      console.error(err);
      showToast("Network error while saving gallery image.", "error");
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gallery/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { 
        showToast("Gallery image deleted successfully!", "success"); 
        fetchAllData(token!); 
      } else {
        showToast("Failed to delete gallery image", "error");
      }
    } catch (err) { 
      console.error(err);
      showToast("Network error while deleting gallery image.", "error");
    }
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
      if (res.ok) { 
        showToast("Academy course saved successfully!", "success"); 
        setIsAcademyModalOpen(false); 
        fetchAllData(token!); 
      } else {
        showToast("Failed to save academy course", "error");
      }
    } catch (err) { 
      console.error(err);
      showToast("Network error while saving academy course.", "error");
    }
  };

  const handleDeleteAcademy = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/academy-courses/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { 
        showToast("Academy course deleted successfully!", "success"); 
        fetchAllData(token!); 
      } else {
        showToast("Failed to delete academy course", "error");
      }
    } catch (err) { 
      console.error(err);
      showToast("Network error while deleting academy course.", "error");
    }
  };

  const openAddAcademyModal = () => { setAcademyForm({ _id: '', title: '', duration: '', price: '', image: '', images: [], syllabus: '' }); setIsEditingAcademy(false); setIsAcademyModalOpen(true); };
  const openEditAcademyModal = (c: any) => { 
    const syllabusString = Array.isArray(c.syllabus) ? c.syllabus.join('\n') : (c.syllabus || '');
    const courseImages = Array.isArray(c.images) && c.images.length > 0 ? c.images : (c.image ? [c.image] : []);
    setAcademyForm({ ...c, syllabus: syllabusString, images: courseImages }); 
    setIsEditingAcademy(true); 
    setIsAcademyModalOpen(true); 
  };

  // --- STAFF HANDLERS ---
  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) {
      showToast('Authentication token missing. Please log in again.', 'error');
      router.push('/admin/login');
      return;
    }
    const url = isEditingStaff
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/staff/${staffForm._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/staff`;
    const method = isEditingStaff ? 'PUT' : 'POST';
    const payload: any = { ...staffForm };
    if (!payload._id) delete payload._id;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(isEditingStaff ? 'Staff member updated!' : 'Staff member added!', 'success');
        setIsStaffModalOpen(false);
        fetchAllData(token);
      } else {
        // Detailed error logging for debugging
        const errorStatus = res.status;
        const errorBody = await res.text();
        console.error('Staff save failed with status', errorStatus, 'and body', errorBody);
        const err = await safeJson(res, {});
        showToast('Failed to save staff: ' + (err.message || 'Unknown error'), 'error');
      }

    } catch (err) {
      console.error(err);
      showToast('Network error while saving staff member.', 'error');
    }
  };

  const handleDeleteStaff = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/staff/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) { 
        showToast('Staff member deleted!', 'success'); 
        fetchAllData(token!); 
      } else {
        showToast('Failed to delete staff member', 'error');
      }
    } catch (err) { 
      console.error(err); 
      showToast('Network error while deleting staff member.', 'error');
    }
  };

  const openAddStaffModal = () => {
    setStaffForm({ _id: '', name: '', address: '', mobile: '', whatsapp: '', nic: '', dob: '', photo: '', role: 'Beauty Therapist' });
    setIsEditingStaff(false);
    setIsStaffModalOpen(true);
  };
  const openEditStaffModal = (s: any) => {
    setStaffForm({ ...s });
    setIsEditingStaff(true);
    setIsStaffModalOpen(true);
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
          {([
            { key: 'dashboard', label: '📊 Dashboard' },
            { key: 'bookings', label: '📅 Bookings' },
            { key: 'inquiries', label: '💌 Inquiries' },
            { key: 'manageSarees', label: '👘 Manage Sarees' },
            { key: 'manageAcademy', label: '🎓 Manage Academy' },
            { key: 'manageSalon', label: '✂️ Salon Services' },
            { key: 'manageCategories', label: '🏷️ Salon Categories' },
            { key: 'manageGallery', label: '🖼️ Gallery' },
            { key: 'manageStaff', label: '👤 Staff Members' },
          ] as { key: string; label: string }[]).map(({ key, label }) => (
            <button 
              key={key}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                activeTab === key 
                  ? 'bg-[#d4af37] text-[#3a1f0d] shadow-md' 
                  : 'text-[#eacda3] hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => {
                setActiveTab(key as any);
                setIsMobileSidebarOpen(false);
              }}
            >
              <span className="capitalize">{label}</span>
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
          <div className="space-y-8 w-full">
            {/* Bookings Section */}
            <div>
              <h2 className="text-md font-serif font-bold text-[#4a2511] uppercase tracking-wider mb-4 border-b border-[#d4af37]/25 pb-2">Bookings Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* Pending Bookings */}
                <div 
                  onClick={() => setActiveTab('bookings')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Pending</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Pending</h3>
                    <p className="text-4xl font-light text-[#b45309] font-serif">{bookings.filter(b => b.status === 'Pending' || !b.status).length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Awaiting response</div>
                </div>

                {/* Confirmed Bookings */}
                <div 
                  onClick={() => setActiveTab('bookings')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Confirmed</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Confirmed</h3>
                    <p className="text-4xl font-light text-[#1d4ed8] font-serif">{bookings.filter(b => b.status === 'Confirmed').length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Scheduled slots</div>
                </div>

                {/* Completed Bookings */}
                <div 
                  onClick={() => setActiveTab('bookings')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Completed</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Completed</h3>
                    <p className="text-4xl font-light text-[#047857] font-serif">{bookings.filter(b => b.status === 'Completed').length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Past bookings</div>
                </div>

                {/* Cancelled Bookings */}
                <div 
                  onClick={() => setActiveTab('bookings')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Cancelled</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Cancelled</h3>
                    <p className="text-4xl font-light text-[#dc2626] font-serif">{bookings.filter(b => b.status === 'Cancelled').length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Cancelled slots</div>
                </div>

                {/* Total Bookings */}
                <div 
                  onClick={() => setActiveTab('bookings')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-[#6e1224]/10 text-[#6e1224] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">All</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Total</h3>
                    <p className="text-4xl font-light text-[#6e1224] font-serif">{bookings.length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">All time reservations</div>
                </div>

              </div>
            </div>

            {/* Business Operations Section */}
            <div>
              <h2 className="text-md font-serif font-bold text-[#4a2511] uppercase tracking-wider mb-4 border-b border-[#d4af37]/25 pb-2">Catalog & Inquiries Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

                {/* New Inquiries */}
                <div 
                  onClick={() => setActiveTab('inquiries')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">New</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">New Inquiries</h3>
                    <p className="text-4xl font-light text-[#b45309] font-serif">{inquiries.filter(i => i.status === 'New' || i.status === 'Pending' || !i.status).length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Boutique items</div>
                </div>

                {/* Total Inquiries */}
                <div 
                  onClick={() => setActiveTab('inquiries')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-[#6e1224]/10 text-[#6e1224] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Total</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Total Inquiries</h3>
                    <p className="text-4xl font-light text-[#6e1224] font-serif">{inquiries.length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">All shop requests</div>
                </div>

                {/* Saree Catalog */}
                <div 
                  onClick={() => setActiveTab('manageSarees')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-[#c2a670]/15 text-[#c2a670] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Items</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Saree Catalog</h3>
                    <p className="text-4xl font-light text-[#4a2511] font-serif">{sarees.length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Boutique stock size</div>
                </div>

                {/* Salon Services */}
                <div 
                  onClick={() => setActiveTab('manageSalon')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-[#c2a670]/15 text-[#c2a670] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Salon</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Salon Services</h3>
                    <p className="text-4xl font-light text-[#4a2511] font-serif">{salonServices.length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Hair & skin treatments</div>
                </div>

                {/* Academy Courses */}
                <div 
                  onClick={() => setActiveTab('manageAcademy')}
                  className="gold-panel p-6 text-center bg-white border border-[#c2a670]/15 shadow-sm hover:shadow-md hover:border-[#6e1224]/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[140px]"
                >
                  <div className="absolute top-2 right-2 bg-[#c2a670]/15 text-[#c2a670] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Accredited</div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#1c1512]/60 uppercase tracking-widest mb-1.5 mt-2">Academy Courses</h3>
                    <p className="text-4xl font-light text-[#4a2511] font-serif">{academyCourses.length}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-3 border-t border-[#c2a670]/10 pt-2 font-medium">Active curriculums</div>
                </div>

              </div>
            </div>
          </div>
        ) : activeTab === 'bookings' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f4e8d3] text-[#4a2511]">
                  <th className="p-3 text-xs">Date Created</th>
                  <th className="p-3 text-xs">Last Updated</th>
                  <th className="p-3 text-xs">Name & Contact</th>
                  <th className="p-3 text-xs">Service</th>
                  <th className="p-3 text-xs">Scheduled For</th>
                  <th className="p-3 text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className="border-b hover:bg-[#fdf5eb]">
                    <td className="p-3">
                      <p className="text-xs font-medium text-[#4a2511]">{b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</p>
                      <p className="text-[10px] text-gray-500">{b.createdAt ? new Date(b.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                    </td>
                    <td className="p-3">
                      {b.updatedAt ? (
                        <>
                          <p className="text-xs font-medium text-[#4a2511]">{new Date(b.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                          <p className="text-[10px] text-gray-500">{new Date(b.updatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                        </>
                      ) : <span className="text-[10px] text-gray-400">Not yet updated</span>}
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-[#4a2511] text-sm">{b.fullName}</p>
                      <p className="text-xs text-gray-600">{b.contactNumber}</p>
                    </td>
                    <td className="p-3 font-semibold text-[#800020] text-sm">{b.serviceRequested}</td>
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
                {bookings.length === 0 && <tr><td colSpan={6} className="p-4 text-center">No bookings found</td></tr>}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'inquiries' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f4e8d3] text-[#4a2511]">
                  <th className="p-3 text-xs">Date Created</th>
                  <th className="p-3 text-xs">Last Updated</th>
                  <th className="p-3 text-xs">Customer</th>
                  <th className="p-3 text-xs">Items Inquired</th>
                  <th className="p-3 text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(i => (
                  <tr key={i._id} className="border-b hover:bg-[#fdf5eb]">
                    <td className="p-3">
                      <p className="text-xs font-medium text-[#4a2511]">{i.createdAt ? new Date(i.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</p>
                      <p className="text-[10px] text-gray-500">{i.createdAt ? new Date(i.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                    </td>
                    <td className="p-3">
                      {i.updatedAt ? (
                        <>
                          <p className="text-xs font-medium text-[#4a2511]">{new Date(i.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                          <p className="text-[10px] text-gray-500">{new Date(i.updatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                        </>
                      ) : <span className="text-[10px] text-gray-400">Not yet updated</span>}
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-[#4a2511] text-sm">{i.customerName || 'Guest User'}</p>
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
                {inquiries.length === 0 && <tr><td colSpan={5} className="p-4 text-center">No inquiries found</td></tr>}
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
        ) : activeTab === 'manageStaff' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#4a2511]">Staff Members</h2>
                <p className="text-xs text-gray-500 mt-0.5">Manage staff members for the beauty salon</p>
              </div>
              <button onClick={openAddStaffModal} className="gold-button px-4 py-2 text-sm shadow">
                + Add Staff Member
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f4e8d3] text-[#4a2511] border-b border-[#d4af37]">
                    <th className="p-3 text-xs">Photo</th>
                    <th className="p-3 text-xs">Name</th>
                    <th className="p-3 text-xs">Role</th>
                    <th className="p-3 text-xs">Contact Details</th>
                    <th className="p-3 text-xs">NIC & DOB</th>
                    <th className="p-3 text-xs">Address</th>
                    <th className="p-3 text-xs">Timestamps</th>
                    <th className="p-3 text-xs text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map(s => (
                    <tr key={s._id} className="border-b border-[#eacda3] hover:bg-[#fdf5eb]">
                      <td className="p-3">
                        <img 
                          src={s.photo || '/avatar-placeholder.png'} 
                          alt={s.name} 
                          className="w-10 h-10 object-cover rounded-full border border-[#d4af37] shadow-sm bg-white" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(s.name);
                          }}
                        />
                      </td>
                      <td className="p-3 font-semibold text-[#4a2511] text-sm">{s.name}</td>
                      <td className="p-3">
                        <span className="bg-[#d4af37]/10 text-[#3a1f0d] border border-[#d4af37]/35 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {s.role || 'Beauty Therapist'}
                        </span>
                      </td>
                      <td className="p-3 text-xs space-y-0.5">
                        <p className="font-medium">📞 {s.mobile || '—'}</p>
                        <p className="text-[#075e54] font-medium">💬 {s.whatsapp || '—'}</p>
                      </td>
                      <td className="p-3 text-xs space-y-0.5">
                        <p><span className="text-gray-500 font-medium">NIC:</span> {s.nic || '—'}</p>
                        <p><span className="text-gray-500 font-medium">DOB:</span> {s.dob ? new Date(s.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</p>
                      </td>
                      <td className="p-3 text-xs text-gray-700 max-w-xs truncate" title={s.address}>{s.address || '—'}</td>
                      <td className="p-3">
                        <p className="text-[10px] text-gray-500">
                          <span className="font-semibold text-gray-400">Created: </span> 
                          {s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB') : '—'}
                        </p>
                        {s.updatedAt && (
                          <p className="text-[10px] text-gray-500">
                            <span className="font-semibold text-gray-400">Updated: </span> 
                            {new Date(s.updatedAt).toLocaleDateString('en-GB')}
                          </p>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2 whitespace-nowrap">
                        <button onClick={() => openEditStaffModal(s)} className="text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-100 px-2.5 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteStaff(s._id)} className="text-red-600 hover:text-red-800 font-bold text-xs bg-red-100 px-2.5 py-1 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {staffList.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-sm text-gray-500">
                        No staff members found. Add your first member using the button above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                  <select required className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={sareeForm.category} onChange={e => setSareeForm({...sareeForm, category: e.target.value})}>
                    <option value="" disabled>-- Select Category --</option>
                    <option value="Pure Kanchipuram Silk Sarees">Pure Kanchipuram Silk Sarees</option>
                    <option value="Banarasi Silk Sarees">Banarasi Silk Sarees</option>
                    <option value="Bridal Sarees">Bridal Sarees</option>
                    <option value="Pattu Silk Sarees">Pattu Silk Sarees</option>
                    <option value="Cotton Sarees">Cotton Sarees</option>
                    <option value="Georgette Sarees">Georgette Sarees</option>
                    <option value="Chiffon Sarees">Chiffon Sarees</option>
                    <option value="Rich Aari Work Blouses">Rich Aari Work Blouses</option>
                    <option value="Embroidered Blouses">Embroidered Blouses</option>
                    <option value="Lehengas">Lehengas</option>
                    <option value="Half Sarees">Half Sarees</option>
                    <option value="Saree Sets">Saree Sets</option>
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
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Saree Images</label>
                <div 
                  {...getSareeProps()} 
                  className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isSareeDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}
                >
                  <input {...getSareeInput()} multiple />
                  <p className="text-[#4a2511]">{isSareeDrag ? 'Drop images...' : 'Drag & drop images here (you can select multiple)'}</p>
                </div>
                {sareeForm.images && sareeForm.images.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mt-4 justify-center">
                    {sareeForm.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Preview ${idx}`} className="h-20 w-20 object-cover border border-[#d4af37] rounded shadow-sm" />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSareeImage(idx)} 
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : sareeForm.image && (
                  <img src={sareeForm.image} alt="Preview" className="h-20 mt-4 mx-auto object-cover border border-[#d4af37] rounded" />
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
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Service Images</label>
                <div {...getServiceProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isServiceDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getServiceInput()} multiple />
                  <p className="text-[#4a2511]">{isServiceDrag ? 'Drop images...' : 'Drag & drop images here (you can select multiple)'}</p>
                </div>
                {serviceForm.images && serviceForm.images.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {serviceForm.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Preview ${idx}`} className="h-20 w-20 object-cover border border-[#d4af37] rounded shadow-sm" />
                        <button type="button" onClick={() => handleRemoveServiceImage(idx)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                ) : serviceForm.image && (
                  <img src={serviceForm.image} alt="Preview" className="h-20 mt-4 mx-auto object-cover border border-[#d4af37] rounded" />
                )}
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
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Category Hero Images</label>
                <div {...getCategoryProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isCategoryDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getCategoryInput()} multiple />
                  <p className="text-[#4a2511]">{isCategoryDrag ? 'Drop images...' : 'Drag & drop images here (you can select multiple)'}</p>
                </div>
                {categoryForm.images && categoryForm.images.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {categoryForm.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Preview ${idx}`} className="h-20 w-20 object-cover border border-[#d4af37] rounded shadow-sm" />
                        <button type="button" onClick={() => handleRemoveCategoryImage(idx)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                ) : categoryForm.image && (
                  <img src={categoryForm.image} alt="Preview" className="h-20 mt-4 mx-auto object-cover border border-[#d4af37] rounded" />
                )}
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
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Course Images</label>
                <div {...getAcademyProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isAcademyDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getAcademyInput()} multiple />
                  <p className="text-[#4a2511] text-sm">{isAcademyDrag ? 'Drop images here...' : 'Drag & drop images here (you can select multiple)'}</p>
                  <p className="text-[10px] text-[#4a2511]/50 mt-1">JPG, PNG, WebP supported</p>
                </div>
                {academyForm.images && academyForm.images.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mt-4 justify-center">
                    {academyForm.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Preview ${idx}`} className="h-20 w-20 object-cover border border-[#d4af37] rounded shadow-sm" />
                        <button
                          type="button"
                          onClick={() => handleRemoveAcademyImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                        {idx === 0 && <span className="absolute bottom-0 left-0 right-0 text-center text-[8px] bg-[#d4af37]/80 text-white font-bold py-0.5">COVER</span>}
                      </div>
                    ))}
                  </div>
                ) : academyForm.image && (
                  <img src={academyForm.image} alt="Preview" className="h-20 mt-4 mx-auto object-cover border border-[#d4af37] rounded" />
                )}
              </div>
              <button type="submit" className="gold-button w-full mt-6 text-sm py-3 uppercase">
                {isEditingAcademy ? 'Save Changes' : 'Add Course'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Staff Add/Edit Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000] p-4">
          <div className="gold-panel p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsStaffModalOpen(false)} className="absolute top-4 right-4 text-2xl font-bold text-[#4a2511]">&times;</button>
            <h2 className="text-2xl font-bold text-[#4a2511] mb-6 uppercase text-center border-b border-[#d4af37] pb-2 font-serif tracking-wider">
              {isEditingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
            </h2>
            <form onSubmit={handleSaveStaff} className="space-y-4 text-[#3a1f0d]">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Full Name</label>
                <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" placeholder="e.g. Priyanthi Silva" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Address</label>
                <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" placeholder="e.g. 12/A, Galle Road, Colombo" value={staffForm.address} onChange={e => setStaffForm({...staffForm, address: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Mobile Number</label>
                  <input required type="tel" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" placeholder="e.g. 0771234567" value={staffForm.mobile} onChange={e => setStaffForm({...staffForm, mobile: e.target.value})} />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">WhatsApp Number</label>
                  <input required type="tel" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" placeholder="e.g. 0771234567" value={staffForm.whatsapp} onChange={e => setStaffForm({...staffForm, whatsapp: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">NIC Number</label>
                  <input required type="text" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" placeholder="e.g. 199512345V" value={staffForm.nic} onChange={e => setStaffForm({...staffForm, nic: e.target.value})} />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Date of Birth</label>
                  <input required type="date" className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={staffForm.dob ? staffForm.dob.split('T')[0] : ''} onChange={e => setStaffForm({...staffForm, dob: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Role</label>
                <select className="w-full p-2 border border-[#d4af37] rounded bg-[#fdf5eb] focus:outline-none focus:ring-2 focus:ring-[#cba135]" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})}>
                  <option value="Beauty Therapist">Beauty Therapist</option>
                  <option value="Hair Stylist">Hair Stylist</option>
                  <option value="Nail Technician">Nail Technician</option>
                  <option value="Makeup Artist">Makeup Artist</option>
                  <option value="Senior Stylist">Senior Stylist</option>
                  <option value="Salon Manager">Salon Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#4a2511]">Staff Photo</label>
                <div {...getStaffProps()} className={`border-2 border-dashed p-6 text-center cursor-pointer rounded bg-[#fdf5eb] ${isStaffDrag ? 'border-[#800020] bg-red-50' : 'border-[#d4af37]'}`}>
                  <input {...getStaffInput()} />
                  <p className="text-[#4a2511] text-xs">{isStaffDrag ? 'Drop photo here...' : 'Drag & drop staff photo, or click to browse'}</p>
                </div>
                {staffForm.photo && (
                  <div className="relative group mt-3 w-24 h-24 mx-auto">
                    <img src={staffForm.photo} alt="Preview" className="w-full h-full object-cover border border-[#d4af37] rounded-full shadow-sm bg-white" />
                    <button type="button" onClick={handleRemoveStaffPhoto} className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                  </div>
                )}
              </div>
              <button type="submit" className="gold-button w-full mt-6 text-sm py-3 uppercase tracking-wider font-bold">
                {isEditingStaff ? 'Save Changes' : 'Add Staff Member'}
              </button>
            </form>
          </div>
        </div>
      )}

      {ToastElement}
    </div>
  );
}
