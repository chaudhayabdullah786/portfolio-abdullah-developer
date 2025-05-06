
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is PDF or DOC
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload PDF or DOC/DOCX files only.",
        });
        e.target.value = '';
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        e.target.value = '';
        return;
      }
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would submit the form data to a backend API
      // This is a simulation of a successful form submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        resume: null
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Contact Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-portfolio-gray mb-8">
                Have a project in mind or want to discuss potential collaborations? Feel free to reach out. I'm always open to new opportunities and challenges.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-full mr-4">
                    <Phone size={24} className="text-portfolio-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-portfolio-gray">+92 3086303187</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-full mr-4">
                    <Mail size={24} className="text-portfolio-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-portfolio-gray">chaudhayabdullah786@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-full mr-4">
                    <MapPin size={24} className="text-portfolio-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-portfolio-gray">Gujranwala, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Muhammad Abdullah"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="chaudhayabdullah786@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-input"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="contact-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="contact-input min-h-[150px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume (Optional)</Label>
                  <Input 
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="contact-input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Max file size: 5MB. Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
