import React, { useState } from 'react';

const GHL_API_KEY = "pit-4549b805-bda8-4a9a-b1b3-c38568232269";
const GHL_LOCATION_ID = "x1tQhDL5U66JMfRMRPzT";
const GHL_API_URL = "https://rest.gohighlevel.com/v1";

export default function GHLContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    workspaceType: 'Dedicated Desk',
    budget: '',
    timeline: '',
    location: '',
    companySize: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setMessage('');

    try {
      // Create contact in GHL via CORS proxy or direct API
      const response = await fetch(`${GHL_API_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          firstName: formData.firstName,
          lastName: formData.lastName || '',
          email: formData.email,
          phone: formData.phone || '',
          companyName: formData.company || '',
          source: 'Website Form',
          customFields: {
            workspaceType: formData.workspaceType,
            budget: formData.budget,
            timeline: formData.timeline,
            location: formData.location,
            companySize: formData.companySize,
          },
          tags: ['website-lead', 'form-submission'],
        }),
      });

      if (!response.ok) {
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const result = await response.json();
      setStatus('success');
      setMessage('Thanks! We\'ll confirm within a day.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        workspaceType: 'Dedicated Desk',
        budget: '',
        timeline: '',
        location: '',
        companySize: '',
      });

      // Send WhatsApp message if phone provided
      if (formData.phone && result.contact?.id) {
        setTimeout(() => {
          sendWhatsApp(result.contact.id, formData.phone);
        }, 1000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setMessage('Couldn\'t send just now. Please email team@22cowork.pt.');
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsApp = async (contactId, phone) => {
    try {
      const message = `Hi! Thanks for your interest in 22cowork. We'll confirm your visit within a day. In the meantime, check out our tour: https://www.youtube.com/watch?v=htTdP9zs7pM`;

      await fetch(`${GHL_API_URL}/contacts/${contactId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          type: 'WhatsApp',
          message: message,
        }),
      });
    } catch (error) {
      console.warn('WhatsApp send failed (non-critical):', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ghl-form">
      <div className="form-row">
        <div className="form-field">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
          />
        </div>
        <div className="form-field">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
        <div className="form-field">
          <label>Company Size</label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="solo">Solo / Freelancer</option>
            <option value="2-5">2-5 people</option>
            <option value="6-10">6-10 people</option>
            <option value="11-50">11-50 people</option>
            <option value="50+">50+ people</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>What are you after? *</label>
          <select
            name="workspaceType"
            value={formData.workspaceType}
            onChange={handleChange}
            required
          >
            <option value="Dedicated Desk">Dedicated Desk</option>
            <option value="Hot Desk">Hot Desk</option>
            <option value="Private Office">Private Office</option>
            <option value="Meeting / Studio Room">Meeting / Studio Room</option>
            <option value="Business Address">Business Address</option>
            <option value="Just a look around">Just a look around</option>
          </select>
        </div>
        <div className="form-field">
          <label>Timeline</label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="immediate">Immediate (this week)</option>
            <option value="1-month">Within 1 month</option>
            <option value="3-months">Within 3 months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="under-200">Under €200/month</option>
            <option value="200-500">€200-500/month</option>
            <option value="500-1000">€500-1000/month</option>
            <option value="1000+">€1000+/month</option>
          </select>
        </div>
        <div className="form-field">
          <label>Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="setubal-local">Setúbal (local)</option>
            <option value="arrabida">Arrábida region</option>
            <option value="lisbon">Lisbon</option>
            <option value="remote">Remote (visiting)</option>
          </select>
        </div>
      </div>

      {status && (
        <div className={`form-status ${status}`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-gold"
        style={{ marginTop: '8px' }}
      >
        {loading ? 'Sending…' : 'Reserve your space →'}
      </button>
    </form>
  );
}
