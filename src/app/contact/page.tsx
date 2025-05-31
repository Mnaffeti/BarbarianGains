"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    // Simulate API call
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div>
      <PageHeader
        title="Get In Touch"
        subtitle="We're here to help! Whether you have a question about our products, your order, or anything else, our team is ready to answer all your questions."
      />
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl><Input placeholder="Question about an order" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea placeholder="Your message here..." rows={5} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                     <> <Send className="mr-2 h-4 w-4 animate-pulse" /> Sending... </>
                  ) : (
                     <> <Send className="mr-2 h-4 w-4" /> Send Message </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <h2 className="text-3xl font-headline font-semibold">Contact Information</h2>
          <p className="text-muted-foreground">
            Feel free to reach out to us through any of the following channels. We aim to respond within 24 business hours.
          </p>
          <div className="space-y-4">
            <ContactInfoItem icon={Mail} label="Email Us" value="support@swissgains.com" href="mailto:support@swissgains.com" />
            <ContactInfoItem icon={Phone} label="Call Us" value="+41 22 123 4567 (Mon-Fri, 9am-5pm CET)" href="tel:+41221234567" />
            <ContactInfoItem icon={MapPin} label="Our Office" value="Bahnhofstrasse 1, 8001 Zürich, Switzerland (Visits by appointment only)" />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-headline font-semibold mb-3">Operating Hours</h3>
            <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM (CET)</p>
            <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContactInfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

function ContactInfoItem({ icon: Icon, label, value, href }: ContactInfoItemProps) {
  const content = href ? <a href={href} className="hover:text-primary transition-colors">{value}</a> : value;
  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
      <div>
        <h4 className="font-semibold">{label}</h4>
        <p className="text-muted-foreground text-sm">{content}</p>
      </div>
    </div>
  );
}
