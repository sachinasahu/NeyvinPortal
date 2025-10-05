'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Card, CardContent } from '../ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ContestsAPI } from '@/lib/supabase/contests';
import { ContestStatus, EmploymentType, LocationType } from '@/types/database.types';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Upload } from 'lucide-react';
import { indianStates, getDistrictsByState } from '@/indian-location';

interface Step {
  title: string;
  isCompleted: boolean;
}

interface ContestFormData {
  // Job Details
  job_title: string;
  job_description: string;
  job_description_file: string;
  job_description_type: 'file' | 'text';
  employment_type: EmploymentType;
  no_of_positions: number;
  state: string;
  district: string;
  budget_min: string;
  budget_max: string;
  experience_min: string;
  experience_max: string;
  qualification: string;
  other_qualification: string;
  hiring_for: 'Self' | 'Other';
  office_timings_start: string;
  office_timings_end: string;
  onsite_feasibility: LocationType;
  notice_period: string;
  must_have_skills: string[];
  good_to_have_skills: string[];
  short_description: string;

  // Drive Details
  drive_availability: 'Yes' | 'No';
  drive_mode?: 'Remote' | 'Office';
  drive_state?: string;
  drive_district?: string;
  interview_rounds: Array<{
    round_name: string;
    date: string;
    start_time: string;
    end_time: string;
  }>;

  // Payment Details
  selected_plan: string;
  vendor_price: string;
  freelancer_price: string;
}

export default function CreateContestForm() {
  const { user, profile, session, loading: authLoading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Test Supabase connection
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .single();

        if (error) {
          console.error('Supabase connection error:', error);
        } else {
          console.log('Supabase connection successful:', data);
        }
      } catch (error) {
        console.error('Connection test error:', error);
      }
    }

    if (!authLoading) {
      checkConnection();
      
      if (!session || !user) {
        console.log('No active session, redirecting to login');
        router.push('/login');
        return;
      }
      
      if (profile?.role !== 'employer') {
        console.log('User is not an employer, redirecting to dashboard');
        router.push('/dashboard');
        alert('Only employers can create contests');
        return;
      }

      console.log('Auth check passed:', { user, profile, session });
    }
  }, [user, profile, session, authLoading, router]);
  const [formData, setFormData] = React.useState<ContestFormData>({
    job_title: '',
    job_description: '',
    job_description_file: '',
    job_description_type: 'text',
    employment_type: 'Full-time',
    no_of_positions: 1,
    state: '',
    district: '',
    budget_min: '',
    budget_max: '',
    experience_min: '',
    experience_max: '',
    qualification: '',
    other_qualification: '',
    hiring_for: 'Self',
    office_timings_start: '',
    office_timings_end: '',
    onsite_feasibility: 'REMOTE',
    notice_period: '',
    must_have_skills: [],
    good_to_have_skills: [],
    short_description: '',
    drive_availability: 'No',
    interview_rounds: [],
    selected_plan: '',
    vendor_price: '',
    freelancer_price: ''
  });

  const [steps] = React.useState<Step[]>([
    { title: 'Details', isCompleted: false },
    { title: 'Drive availability', isCompleted: false },
    { title: 'Payment', isCompleted: false },
    { title: 'Publish', isCompleted: false },
  ]);

  const supabase = createClientComponentClient();

  const handleCreateContest = async () => {
    try {
      if (!session || !user) {
        console.error('No active session');
        alert('Please login to continue');
        router.push('/login');
        return;
      }

      // Check if user has employer role
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !userProfile) {
        console.error('Profile error:', profileError);
        alert('User profile not found. Please login again.');
        router.push('/login');
        return;
      }

      if (userProfile.role !== 'employer') {
        console.error('User is not an employer:', userProfile);
        alert('You must be registered as an employer to create contests.');
        router.push('/dashboard');
        return;
      }

      // Check if employer profile exists
      const { data: employerProfile, error: employerProfileError } = await supabase
        .from('employer_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (employerProfileError || !employerProfile) {
        console.error('Employer profile error:', employerProfileError);
        alert('Employer profile not found. Please complete your employer registration.');
        router.push('/login');
        return;
      }

      console.log('User profile:', userProfile);
      console.log('Employer profile:', employerProfile);

      console.log('Current session:', session);
      console.log('Current user:', user);
      console.log('Employer profile:', employerProfile);

      if (!user || !profile) {
        console.error('No user or profile found');
        router.push('/login');
        return;
      }

      if (profile.role !== 'employer') {
        console.error('User is not an employer');
        alert('Only employers can create contests');
        router.push('/dashboard');
        return;
      }

      // Validate required fields
      if (!formData.job_title) throw new Error('Job title is required');
      if (!formData.employment_type) throw new Error('Employment type is required');
      if (!formData.state) throw new Error('State is required');
      if (!formData.district) throw new Error('District is required');
      if (!formData.short_description) throw new Error('Short description is required');
      if (formData.job_description_type === 'text' && !formData.job_description) throw new Error('Job description is required');
      if (formData.job_description_type === 'file' && !formData.job_description_file) throw new Error('Job description file is required');
      if (!formData.vendor_price) throw new Error('Vendor price is required');
      if (!formData.freelancer_price) throw new Error('Freelancer price is required');
      if (!formData.qualification) throw new Error('Qualification is required');
      if (formData.qualification === 'other' && !formData.other_qualification) throw new Error('Please specify the qualification');

      // Prepare contest data
      const contestData = {
        employer_id: user.id,
        job_title: formData.job_title.trim(),
        short_description: formData.short_description.trim(),
        detailed_description: formData.job_description_type === 'file' 
          ? formData.job_description_file 
          : formData.job_description?.trim(),
        location_type: formData.onsite_feasibility.toUpperCase(),
        location_state: formData.state.trim(),
        location_city: formData.district.trim(),
        location_country: 'India',
        employment_type: formData.employment_type,
        experience_min: parseFloat(formData.experience_min) || 0,
        experience_max: parseFloat(formData.experience_max) || 0,
        budget_min: parseFloat(formData.budget_min) || 0,
        budget_max: parseFloat(formData.budget_max) || 0,
        freelancer_fee: parseFloat(formData.freelancer_price),
        vendor_fee: parseFloat(formData.vendor_price),
        status: 'DRAFT',
        shortlisting_count: 0,
        l1_count: 0,
        l2_count: 0,
        l3_count: 0,
        offered_count: 0,
        submitted_count: 0,
        drive_date: formData.drive_availability === 'Yes' && formData.interview_rounds[0]?.date 
          ? formData.interview_rounds[0].date 
          : null,
        drive_start_time: formData.drive_availability === 'Yes' && formData.interview_rounds[0]?.start_time 
          ? formData.interview_rounds[0].start_time 
          : null,
        drive_end_time: formData.drive_availability === 'Yes' && formData.interview_rounds[0]?.end_time 
          ? formData.interview_rounds[0].end_time 
          : null,
        drive_timezone: formData.drive_availability === 'Yes' ? 'Asia/Kolkata' : null,
        is_featured: false,
        is_urgent: false,
        application_deadline: null
      };

      console.log('Sending contest data:', contestData);

      // Create the contest using direct Supabase client
      console.log('Making Supabase request...');
      
      try {
        // First verify the session token is valid
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !currentSession) {
          console.error('Session verification failed:', sessionError);
          throw new Error('Your session has expired. Please login again.');
        }

        // Set the auth header explicitly
        const { data: contest, error: insertError } = await supabase
          .from('contests')
          .insert([contestData])
          .select('*')
          .single();

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          throw insertError;
        }

        if (!contest) {
          console.error('No contest data returned');
          throw new Error('Failed to create contest - no data returned');
        }

        console.log('Contest created successfully:', contest);
        
        // Add skills only after successful contest creation
        if (formData.must_have_skills.length > 0) {
          console.log('Adding must have skills...');
          const { error: skillsError } = await supabase
            .from('contest_skills')
            .insert(
              formData.must_have_skills.map(skill => ({
                contest_id: contest.id,
                skill_name: skill,
                is_mandatory: true
              }))
            );
          
          if (skillsError) {
            console.error('Error adding must have skills:', skillsError);
          }
        }

        if (formData.good_to_have_skills.length > 0) {
          console.log('Adding good to have skills...');
          const { error: skillsError } = await supabase
            .from('contest_skills')
            .insert(
              formData.good_to_have_skills.map(skill => ({
                contest_id: contest.id,
                skill_name: skill,
                is_mandatory: false
              }))
            );
          
          if (skillsError) {
            console.error('Error adding good to have skills:', skillsError);
          }
        }

        // Show success message and redirect
        alert('Contest created successfully!');
        router.push('/employer/dashboard');
        return;
      } catch (error: any) {
        console.error('Error in contest creation:', error);
        if (error.code === '42501') {
          alert('Permission denied. Please make sure you are logged in as an employer.');
        } else if (error.code === '23505') {
          alert('A contest with these details already exists.');
        } else {
          alert('Error creating contest: ' + (error.message || 'Unknown error'));
        }
        throw error;
      }

      // Then add the skills
      
    } catch (error) {
      console.error('Error creating contest:', error);
      alert('Error creating contest: ' + (error as Error).message);
    }
  };

  const handleInputChange = (field: keyof ContestFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('job-descriptions')
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('job-descriptions')
        .getPublicUrl(fileName);

      handleInputChange('job_description_file', publicUrl);
      handleInputChange('job_description_type', 'file');
      handleInputChange('job_description', ''); // Clear text description
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Job Description</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={formData.job_description_type === 'file' ? 'default' : 'outline'}
              onClick={() => handleInputChange('job_description_type', 'file')}
            >
              Upload File
            </Button>
            <Button
              type="button"
              variant={formData.job_description_type === 'text' ? 'default' : 'outline'}
              onClick={() => handleInputChange('job_description_type', 'text')}
            >
              Write Description
            </Button>
          </div>

          {formData.job_description_type === 'file' ? (
            <div className="flex-1 border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <div className="mb-2">Choose a file or drag & drop it here</div>
                <div className="text-sm text-gray-500">(File type: pdf, doc, docx; Max file size: 20MB)</div>
              </label>
              {formData.job_description_file && (
                <div className="mt-4">
                  <Badge variant="outline">
                    File uploaded successfully
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            <Textarea 
              placeholder="Write your job description here" 
              className="h-[200px]"
              value={formData.job_description}
              onChange={(e) => handleInputChange('job_description', e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Job Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="mb-2 block">Job Title*</Label>
            <Input 
              placeholder="Job Title" 
              value={formData.job_title}
              onChange={(e) => handleInputChange('job_title', e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block">Employment Type*</Label>
            <Select 
              value={formData.employment_type}
              onValueChange={(value) => handleInputChange('employment_type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">No of Positions*</Label>
            <Input 
              placeholder="ex:2" 
              type="number"
              value={formData.no_of_positions}
              onChange={(e) => handleInputChange('no_of_positions', parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">State*</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => {
                  handleInputChange('state', value);
                  handleInputChange('district', ''); // Reset district when state changes
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">District*</Label>
              <Select
                value={formData.district}
                onValueChange={(value) => handleInputChange('district', value)}
                disabled={!formData.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.state ? "Select District" : "Select State first"} />
                </SelectTrigger>
                <SelectContent>
                  {formData.state && getDistrictsByState(formData.state).map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Budget/CTC*</Label>
            <div className="flex gap-2 items-center">
              <Input 
                placeholder="Enter minimum budget"
                type="number"
                className="flex-1"
                value={formData.budget_min}
                onChange={(e) => handleInputChange('budget_min', e.target.value)}
              />
              <span>to</span>
              <Input 
                placeholder="Enter maximum budget"
                type="number"
                className="flex-1"
                value={formData.budget_max}
                onChange={(e) => handleInputChange('budget_max', e.target.value)}
              />
              <div className="w-24">
                <Select defaultValue="lpa">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lpa">LPA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Experience*</Label>
            <div className="flex gap-2 items-center">
              <Input 
                placeholder="Enter minimum experience"
                type="number"
                className="flex-1"
                value={formData.experience_min}
                onChange={(e) => handleInputChange('experience_min', e.target.value)}
              />
              <span>to</span>
              <Input 
                placeholder="Enter maximum experience"
                type="number"
                className="flex-1"
                value={formData.experience_max}
                onChange={(e) => handleInputChange('experience_max', e.target.value)}
              />
              <span className="w-12 text-center">Yrs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="mb-2 block">Qualification*</Label>
            <div className="space-y-4">
              <Select
                value={formData.qualification}
                onValueChange={(value) => {
                  handleInputChange('qualification', value);
                  if (value !== 'other') {
                    handleInputChange('other_qualification', '');
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="be">B.E.</SelectItem>
                  <SelectItem value="btech">B.Tech</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
                  <SelectItem value="mba">MBA</SelectItem>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="bsc">B.Sc</SelectItem>
                  <SelectItem value="msc">M.Sc</SelectItem>
                  <SelectItem value="bcom">B.Com</SelectItem>
                  <SelectItem value="mcom">M.Com</SelectItem>
                  <SelectItem value="phd">Ph.D</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formData.qualification === 'other' && (
                <Input 
                  placeholder="Enter your qualification"
                  value={formData.other_qualification}
                  onChange={(e) => handleInputChange('other_qualification', e.target.value)}
                />
              )}
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Hiring For*</Label>
            <RadioGroup 
              value={formData.hiring_for}
              onValueChange={(value) => handleInputChange('hiring_for', value)}
              className="flex gap-4"
            >
              <div className="flex items-center">
                <RadioGroupItem value="Self" id="self" />
                <Label htmlFor="self" className="ml-2">Self</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="Other" id="other" />
                <Label htmlFor="other" className="ml-2">Other</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="mb-2 block">Office Timings*</Label>
            <div className="flex gap-2">
              <Input 
                type="time"
                value={formData.office_timings_start}
                onChange={(e) => handleInputChange('office_timings_start', e.target.value)}
              />
              <span>to</span>
              <Input 
                type="time"
                value={formData.office_timings_end}
                onChange={(e) => handleInputChange('office_timings_end', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Onsite Feasibility*</Label>
            <Select
              value={formData.onsite_feasibility}
              onValueChange={(value) => handleInputChange('onsite_feasibility', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="ON-SITE">On-site</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Notice Period*</Label>
            <Input 
              placeholder="Notice Period"
              value={formData.notice_period}
              onChange={(e) => handleInputChange('notice_period', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="mb-2 block">Must have skills*</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter skill"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    e.preventDefault();
                    handleInputChange('must_have_skills', [...formData.must_have_skills, e.currentTarget.value.trim()]);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button 
                variant="outline"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input && input.value.trim()) {
                    handleInputChange('must_have_skills', [...formData.must_have_skills, input.value.trim()]);
                    input.value = '';
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="mt-2 flex gap-2 flex-wrap">
              {formData.must_have_skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="cursor-pointer flex items-center gap-1"
                >
                  {skill}
                  <span 
                    className="ml-1 hover:text-red-500"
                    onClick={() => {
                      const newSkills = formData.must_have_skills.filter((_, i) => i !== index);
                      handleInputChange('must_have_skills', newSkills);
                    }}
                  >
                    ×
                  </span>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Good to have skills*</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter skill"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    e.preventDefault();
                    handleInputChange('good_to_have_skills', [...formData.good_to_have_skills, e.currentTarget.value.trim()]);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button 
                variant="outline"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input && input.value.trim()) {
                    handleInputChange('good_to_have_skills', [...formData.good_to_have_skills, input.value.trim()]);
                    input.value = '';
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="mt-2 flex gap-2 flex-wrap">
              {formData.good_to_have_skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="cursor-pointer flex items-center gap-1"
                >
                  {skill}
                  <span 
                    className="ml-1 hover:text-red-500"
                    onClick={() => {
                      const newSkills = formData.good_to_have_skills.filter((_, i) => i !== index);
                      handleInputChange('good_to_have_skills', newSkills);
                    }}
                  >
                    ×
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Short Description*</Label>
          <Textarea 
            placeholder="Add short description (100 words max)"
            value={formData.short_description}
            onChange={(e) => handleInputChange('short_description', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderDriveStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Availability</h3>
        <Label className="mb-2 block">Are you available for drives?*</Label>
        <Select
          value={formData.drive_availability}
          onValueChange={(value) => handleInputChange('drive_availability', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.drive_availability === 'Yes' && (
        <div>
          <h3 className="text-lg font-medium mb-4">Drive details</h3>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Mode*</Label>
              <Select
                value={formData.drive_mode}
                onValueChange={(value) => handleInputChange('drive_mode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.drive_mode === 'Office' && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="mb-2 block">State*</Label>
                  <Select
                    value={formData.drive_state}
                    onValueChange={(value) => {
                      handleInputChange('drive_state', value);
                      handleInputChange('drive_district', ''); // Reset district when state changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">District*</Label>
                  <Select
                    value={formData.drive_district}
                    onValueChange={(value) => handleInputChange('drive_district', value)}
                    disabled={!formData.drive_state}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.drive_state ? "Select District" : "Select State first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.drive_state && getDistrictsByState(formData.drive_state).map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-md font-medium mb-2">Interview</h4>
              <Label className="mb-2 block">Select interview date & time*</Label>
              {formData.interview_rounds.map((round, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 mb-4 items-start">
                  <Input 
                    placeholder="Type Interview Rounds"
                    value={round.round_name}
                    onChange={(e) => {
                      const newRounds = [...formData.interview_rounds];
                      newRounds[index] = { ...round, round_name: e.target.value };
                      handleInputChange('interview_rounds', newRounds);
                    }}
                  />
                  <Input 
                    type="date"
                    value={round.date}
                    onChange={(e) => {
                      const newRounds = [...formData.interview_rounds];
                      newRounds[index] = { ...round, date: e.target.value };
                      handleInputChange('interview_rounds', newRounds);
                    }}
                  />
                  <div className="flex gap-2">
                    <Input 
                      type="time"
                      value={round.start_time}
                      onChange={(e) => {
                        const newRounds = [...formData.interview_rounds];
                        newRounds[index] = { ...round, start_time: e.target.value };
                        handleInputChange('interview_rounds', newRounds);
                      }}
                    />
                    <span>to</span>
                    <Input 
                      type="time"
                      value={round.end_time}
                      onChange={(e) => {
                        const newRounds = [...formData.interview_rounds];
                        newRounds[index] = { ...round, end_time: e.target.value };
                        handleInputChange('interview_rounds', newRounds);
                      }}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3"
                    onClick={() => {
                      const newRounds = formData.interview_rounds.filter((_, i) => i !== index);
                      handleInputChange('interview_rounds', newRounds);
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => {
                  const newRound = {
                    round_name: '',
                    date: '',
                    start_time: '',
                    end_time: ''
                  };
                  handleInputChange('interview_rounds', [...formData.interview_rounds, newRound]);
                }}
              >
                ADD MORE ROUND
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Set Contest Prices</h3>
      <div className="border rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Vendor Price (₹)*</Label>
            <Input 
              type="number"
              min="0"
              placeholder="Enter price for vendors"
              value={formData.vendor_price}
              onChange={(e) => handleInputChange('vendor_price', e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block">Freelancer Price (₹)*</Label>
            <Input 
              type="number"
              min="0"
              placeholder="Enter price for freelancers"
              value={formData.freelancer_price}
              onChange={(e) => handleInputChange('freelancer_price', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPublishStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Review Contest Details</h3>
      <Card>
        <CardContent className="space-y-4 mt-4">
          <div>
            <h4 className="font-medium">Job Details</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label>Job Title</Label>
                <p className="text-gray-600">{formData.job_title}</p>
              </div>
              <div>
                <Label>Employment Type</Label>
                <p className="text-gray-600">{formData.employment_type}</p>
              </div>
              <div>
                <Label>Experience Required</Label>
                <p className="text-gray-600">{formData.experience_min} - {formData.experience_max} years</p>
              </div>
              <div>
                <Label>Qualification</Label>
                <p className="text-gray-600">
                  {formData.qualification === 'other' 
                    ? formData.other_qualification 
                    : formData.qualification.toUpperCase()}
                </p>
              </div>
              <div>
                <Label>Budget/CTC</Label>
                <p className="text-gray-600">₹{formData.budget_min} - ₹{formData.budget_max} LPA</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium">Location</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label>State</Label>
                <p className="text-gray-600">{formData.state}</p>
              </div>
              <div>
                <Label>District</Label>
                <p className="text-gray-600">{formData.district}</p>
              </div>
              <div>
                <Label>Work Mode</Label>
                <p className="text-gray-600">{formData.onsite_feasibility}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Skills Required</h4>
            <div className="space-y-2 mt-2">
              <div>
                <Label>Must Have Skills</Label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {formData.must_have_skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Good to Have Skills</Label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {formData.good_to_have_skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {formData.drive_availability === 'Yes' && (
            <div>
              <h4 className="font-medium">Drive Details</h4>
              <div className="space-y-2 mt-2">
                <div>
                  <Label>Drive Mode</Label>
                  <p className="text-gray-600">{formData.drive_mode}</p>
                </div>
                {formData.interview_rounds.map((round, index) => (
                  <div key={index}>
                    <Label>{round.round_name}</Label>
                    <p className="text-gray-600">
                      {round.date} ({round.start_time} - {round.end_time})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium">Pricing</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label>Vendor Price</Label>
                <p className="text-gray-600">₹{formData.vendor_price}</p>
              </div>
              <div>
                <Label>Freelancer Price</Label>
                <p className="text-gray-600">₹{formData.freelancer_price}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
          Edit Details
        </Button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderDetailsStep();
      case 2:
        return renderDriveStep();
      case 3:
        return renderPaymentStep();
      case 4:
        return renderPublishStep();
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-semibold">Create Contest</h1>
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <div
                  className={`flex items-center ${
                    currentStep === index + 1
                      ? 'text-primary'
                      : step.isCompleted
                      ? 'text-green-500'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      currentStep === index + 1
                        ? 'border-primary'
                        : step.isCompleted
                        ? 'border-green-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {step.isCompleted ? '✓' : index + 1}
                  </div>
                  <span className="ml-2">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 h-[2px] bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderStepContent()}
        </div>

        <div className="border-t px-6 py-4 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentStep === steps.length) {
                handleCreateContest();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === steps.length ? 'Create Contest' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}