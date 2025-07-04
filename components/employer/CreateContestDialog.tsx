'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Card } from '../ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

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
  employment_type: string;
  no_of_positions: number;
  location: string;
  budget_min: number;
  budget_max: number;
  experience_min: number;
  experience_max: number;
  qualification: string;
  hiring_for: 'Self' | 'Other';
  office_timings_start: string;
  office_timings_end: string;
  onsite_feasibility: 'Remote' | 'Hybrid' | 'Onsite';
  notice_period: string;
  must_have_skills: string[];
  good_to_have_skills: string[];
  short_description: string;

  // Drive Details
  drive_availability: 'Yes' | 'No';
  drive_location?: 'Remote' | 'Office';
  interview_rounds: Array<{
    round_name: string;
    date: string;
    start_time: string;
    end_time: string;
  }>;

  // Payment Details
  selected_plan: string;
}

export default function CreateContestForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<ContestFormData>({
    job_title: '',
    job_description: '',
    job_description_file: '',
    job_description_type: 'text',
    employment_type: '',
    no_of_positions: 1,
    location: '',
    budget_min: 0,
    budget_max: 0,
    experience_min: 0,
    experience_max: 0,
    qualification: '',
    hiring_for: 'Self',
    office_timings_start: '',
    office_timings_end: '',
    onsite_feasibility: 'Remote',
    notice_period: '',
    must_have_skills: [],
    good_to_have_skills: [],
    short_description: '',
    drive_availability: 'No',
    interview_rounds: [],
    selected_plan: 'Hiringhood Plus'
  });

  const router = useRouter();
  const [steps] = React.useState<Step[]>([
    { title: 'Details', isCompleted: false },
    { title: 'Drive availability', isCompleted: false },
    { title: 'Payment', isCompleted: false },
    { title: 'Publish', isCompleted: false },
  ]);

  const supabase = createClientComponentClient();

  const handleCreateContest = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error('User not found');

      const { error: insertError } = await supabase.from('contests').insert({
        employer_id: user.id,
        name: formData.job_title,
        job_description: formData.job_description,
        job_description_file: formData.job_description_file,
        employment_type: formData.employment_type,
        no_of_positions: formData.no_of_positions,
        location: formData.location,
        budget_min: formData.budget_min,
        budget_max: formData.budget_max,
        experience_min: formData.experience_min,
        experience_max: formData.experience_max,
        qualification: formData.qualification,
        hiring_for: formData.hiring_for,
        office_timings_start: formData.office_timings_start,
        office_timings_end: formData.office_timings_end,
        onsite_feasibility: formData.onsite_feasibility,
        notice_period: formData.notice_period,
        must_have_skills: formData.must_have_skills,
        good_to_have_skills: formData.good_to_have_skills,
        short_description: formData.short_description,
        drive_availability: formData.drive_availability,
        drive_location: formData.drive_location,
        interview_rounds: formData.interview_rounds,
        selected_plan: formData.selected_plan,
        status: 'DRAFT'
      });

      if (insertError) throw insertError;

      router.push('/employer/dashboard');
    } catch (error) {
      console.error('Error creating contest:', error);
      // You might want to show an error toast here
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
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
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
          <div>
            <Label className="mb-2 block">Location*</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleInputChange('location', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Budget/CTC*</Label>
            <div className="flex gap-2 items-center">
              <Input 
                placeholder="ex:2"
                type="number"
                className="flex-1"
                value={formData.budget_min}
                onChange={(e) => handleInputChange('budget_min', parseFloat(e.target.value))}
              />
              <span>to</span>
              <Input 
                placeholder="ex:4"
                type="number"
                className="flex-1"
                value={formData.budget_max}
                onChange={(e) => handleInputChange('budget_max', parseFloat(e.target.value))}
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
                placeholder="ex:2"
                type="number"
                className="flex-1"
                value={formData.experience_min}
                onChange={(e) => handleInputChange('experience_min', parseInt(e.target.value))}
              />
              <span>to</span>
              <Input 
                placeholder="ex:4"
                type="number"
                className="flex-1"
                value={formData.experience_max}
                onChange={(e) => handleInputChange('experience_max', parseInt(e.target.value))}
              />
              <span className="w-12 text-center">Yrs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="mb-2 block">Qualification*</Label>
            <Select
              value={formData.qualification}
              onValueChange={(value) => handleInputChange('qualification', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="be">B.E.</SelectItem>
                <SelectItem value="btech">B.Tech</SelectItem>
                <SelectItem value="mca">MCA</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
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

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Must have skills*</Label>
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={() => {
                const skill = prompt('Enter skill:');
                if (skill) {
                  handleInputChange('must_have_skills', [...formData.must_have_skills, skill]);
                }
              }}
            >
              + Add new skill
            </Button>
            <div className="mt-2 flex gap-2 flex-wrap">
              {formData.must_have_skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => {
                    const newSkills = formData.must_have_skills.filter((_, i) => i !== index);
                    handleInputChange('must_have_skills', newSkills);
                  }}
                >
                  {skill} ×
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Good to have skills*</Label>
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={() => {
                const skill = prompt('Enter skill:');
                if (skill) {
                  handleInputChange('good_to_have_skills', [...formData.good_to_have_skills, skill]);
                }
              }}
            >
              + Add new skill
            </Button>
            <div className="mt-2 flex gap-2 flex-wrap">
              {formData.good_to_have_skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => {
                    const newSkills = formData.good_to_have_skills.filter((_, i) => i !== index);
                    handleInputChange('good_to_have_skills', newSkills);
                  }}
                >
                  {skill} ×
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
              <Label className="mb-2 block">Location*</Label>
              <Select
                value={formData.drive_location}
                onValueChange={(value) => handleInputChange('drive_location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="text-md font-medium mb-2">Interview</h4>
              <Label className="mb-2 block">Select interview date & time*</Label>
              {formData.interview_rounds.map((round, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-4">
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
      <h3 className="text-lg font-medium mb-4">Payment</h3>
      <div className="border rounded-lg p-6">
        <RadioGroup defaultValue="hiringhood-plus">
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <RadioGroupItem value="hiringhood-plus" id="hiringhood-plus" />
            <div className="flex-1">
              <div className="flex justify-between">
                <Label htmlFor="hiringhood-plus" className="text-lg">Hiringhood Plus</Label>
                <div>
                  <span className="text-lg">₹999</span>
                  <span className="ml-2 bg-green-400 text-white px-2 py-1 rounded">Free</span>
                </div>
              </div>
              <div className="text-blue-600 mt-2">Get candidates hired for just ₹999!</div>
              <div className="text-sm text-gray-600">Post your job on our portal and connect with immediate joiners.</div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Benefits</h4>
                <ul className="space-y-2">
                  <li>✨ Access a pool of immediate joiners actively available in the market.</li>
                  <li>✨ Entry Your job will be posted on 30+ portals (track the source of each candidate).</li>
                  <li>✨ Save both time and money.</li>
                  <li>✨ Collaborate with 300+ recruiters across pan-India.</li>
                  <li>✨ Organize hiring drives to shortlist candidates efficiently.</li>
                  <li>✨ Conduct hiring drives directly from our platform.</li>
                </ul>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderPublishStep = () => (
    <div className="text-center py-12">
      <img src="/images/success.png" alt="Success" className="mx-auto mb-6" />
      <h2 className="text-2xl font-semibold mb-4">The contest has been created successfully.</h2>
      <p className="text-gray-600 mb-8">
        Once the admin approves it, the contest will be published. Until then, it will remain
        in preview mode. In the meantime, please fill in the employer preferences to help
        determine the candidate's probability of joining.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="outline">FILL OUT PREFERENCES</Button>
        <Button onClick={handleCreateContest}>CONFIRM</Button>
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