
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'A fully featured e-commerce platform built with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 2,
    title: 'Healthcare App',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'A mobile application for healthcare providers to manage patient records and appointments.',
    tags: ['Flutter', 'Firebase', 'Dart']
  },
  {
    id: 3,
    title: 'Company Dashboard',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'An admin dashboard designed for a large corporation to manage their internal processes.',
    tags: ['Figma', 'Adobe XD', 'UI/UX']
  },
  {
    id: 4,
    title: 'Data Visualization Tool',
    category: 'Data Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'A tool that transforms complex data into intuitive visualizations.',
    tags: ['D3.js', 'React', 'Python']
  },
  {
    id: 5,
    title: 'Network Management System',
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'A system for monitoring and managing network infrastructure in real-time.',
    tags: ['C++', 'Python', 'Cisco']
  },
  {
    id: 6,
    title: 'Social Media App',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'A social media platform focused on privacy and user control.',
    tags: ['React Native', 'Firebase', 'Redux']
  }
];

const categories = ['All', 'Web Development', 'App Development', 'UI/UX Design', 'Data Analytics', 'Networking'];

const Projects = () => {
  const [projects, setProjects] = useState(projectsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    tags: '',
    file: null as File | null,
  });
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setProjects(projectsData);
    } else {
      setProjects(projectsData.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleUploadDialogOpen = () => {
    setIsUploadDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload the file to a server here
    // For now, just show a success toast
    toast({
      title: "Project Uploaded Successfully",
      description: "Your project has been submitted for review.",
    });
    
    setIsUploadDialogOpen(false);
    setFormData({
      title: '',
      category: 'Web Development',
      description: '',
      tags: '',
      file: null,
    });
  };

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">My Projects</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mt-10 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-portfolio-blue text-white'
                  : 'bg-white text-portfolio-gray hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="reveal" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-portfolio-blue bg-blue-50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{project.title}</h3>
                  <p className="text-portfolio-gray text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="text-xs bg-gray-100 text-portfolio-gray px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="btn-outline" onClick={handleUploadDialogOpen}>
            Upload Your Project
          </Button>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-portfolio-blue font-medium">
                  {selectedProject.category}
                </DialogDescription>
              </DialogHeader>
              <div className="my-4">
                <div className="rounded-lg overflow-hidden h-60 mb-4">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-portfolio-gray mb-4">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedProject.tags.map((tag: string, index: number) => (
                    <span key={index} className="text-xs bg-gray-100 text-portfolio-gray px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Project Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Your Project</DialogTitle>
            <DialogDescription>
              Share your project with us. Please fill out the details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.category}
                  onChange={handleFormChange as any}
                  required
                >
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Networking">Networking</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Briefly describe your project"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">Upload Project Files (images or zip)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".zip,.jpeg,.jpg,.png,.gif"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Max file size: 10MB. Accepted formats: .zip, .jpg, .jpeg, .png, .gif
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
