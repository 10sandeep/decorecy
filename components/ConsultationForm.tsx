'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const propertyTypes = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  'Villa',
  'Office',
  'Commercial',
  'Other',
];

const projectTypes = [
  'Complete Home Interior',
  'Modular Kitchen',
  'Living Room',
  'Bedroom',
  'Office Interior',
  'Commercial Interior',
  'Renovation',
  'Other',
];

const budgetRanges = [
  'Under ₹2 Lakh',
  '₹2 Lakh – ₹5 Lakh',
  '₹5 Lakh – ₹10 Lakh',
  '₹10 Lakh – ₹20 Lakh',
  'Above ₹20 Lakh',
];

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[0-9+\-\s]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  propertyType: z.string().min(1, 'Please select a property type'),
  projectType: z.string().min(1, 'Please select a project type'),
  location: z.string().min(2, 'Please enter your location'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ConsultationForm({
  heading = 'Design Your Dream Space',
  subheading = 'Tell us about your space and we will get back to you within one business day.',
}: {
  heading?: string;
  subheading?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      propertyType: '',
      projectType: '',
      location: '',
      budget: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log('Consultation request:', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-foreground/5 mb-5">
          <CheckCircle2 className="h-8 w-8 text-foreground" />
        </div>
        <h3 className="font-serif text-2xl font-semibold">Thank you!</h3>
        <p className="mt-3 text-muted-foreground max-w-md">
          Your consultation request has been received. Our team will reach out
          to you shortly to schedule your free design consultation.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus('idle')}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          {heading}
        </h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          {subheading}
        </p>
      </div>

      {status === 'error' && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-lg border border-destructive/40 bg-destructive/5 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm">
            Something went wrong while submitting your request. Please try again
            or call us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="fullName"
              placeholder="Your name"
              aria-invalid={!!errors.fullName}
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              aria-invalid={!!errors.phone}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Property Type <span className="text-destructive">*</span>
            </label>
            <Select
              value={watch('propertyType')}
              onValueChange={(v) => setValue('propertyType', v, { shouldValidate: true })}
            >
              <SelectTrigger aria-invalid={!!errors.propertyType}>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.propertyType && (
              <p className="text-xs text-destructive">{errors.propertyType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Project Type <span className="text-destructive">*</span>
            </label>
            <Select
              value={watch('projectType')}
              onValueChange={(v) => setValue('projectType', v, { shouldValidate: true })}
            >
              <SelectTrigger aria-invalid={!!errors.projectType}>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectType && (
              <p className="text-xs text-destructive">{errors.projectType.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location <span className="text-destructive">*</span>
            </label>
            <Input
              id="location"
              placeholder="e.g. Patia, Bhubaneswar"
              aria-invalid={!!errors.location}
              {...register('location')}
            />
            {errors.location && (
              <p className="text-xs text-destructive">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Approximate Budget <span className="text-destructive">*</span>
            </label>
            <Select
              value={watch('budget')}
              onValueChange={(v) => setValue('budget', v, { shouldValidate: true })}
            >
              <SelectTrigger aria-invalid={!!errors.budget}>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budget && (
              <p className="text-xs text-destructive">{errors.budget.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Tell us about your project..."
            rows={4}
            {...register('message')}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Get Free Consultation'
          )}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          By submitting, you agree to be contacted about your interior design enquiry.
        </p>
      </form>
    </div>
  );
}
