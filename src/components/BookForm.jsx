import React, { useState } from 'react';
import { bookPageContent } from '../config/content';

const BookForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    preferredDate: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(bookPageContent.form.successMessage);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      interest: '',
      preferredDate: '',
      message: '',
    });
  };

  const interestField = bookPageContent.form.fields.find(f => f.name === 'interest');

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      <div>
        <label htmlFor="fullName" class="block text-sm font-medium text-text-dark-gray mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          required
          class="w-full px-4 py-2 border border-light-gray rounded-md focus:ring-forest-green focus:border-forest-green bg-warm-white text-text-black"
        />
      </div>
      <div>
        <label htmlFor="email" class="block text-sm font-medium text-text-dark-gray mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
          class="w-full px-4 py-2 border border-light-gray rounded-md focus:ring-forest-green focus:border-forest-green bg-warm-white text-text-black"
        />
      </div>
      <div>
        <label htmlFor="phone" class="block text-sm font-medium text-text-dark-gray mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+351 912 345 678"
          class="w-full px-4 py-2 border border-light-gray rounded-md focus:ring-forest-green focus:border-forest-green bg-warm-white text-text-black"
        />
      </div>
      <div>
        <label htmlFor="interest" class="block text-sm font-medium text-text-dark-gray mb-1">
          What are you interested in?
        </label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          required
          class="w-full px-4 py-2 border border-light-gray rounded-md focus:ring-forest-green focus:border-forest-green bg-warm-white text-text-black"
        >
          <option value="">Select an option</option>
          {interestField && interestField.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="preferredDate" class="block text-sm font-medium text-text-dark-gray mb-1">
          Preferred Date (Optional)
        </label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          class="w-full px-4 py-2 border border-light-gray rounded-md focus:ring-forest-green focus:border-forest-green bg-warm-white text-text-black"
        />
      </div>
      <div>
        <label htmlFor="message" class="block text-sm font-medium text-text-dark-gray mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your needs..."
          class="w-full px-4 py-2 border border-light-gray rounded-md focus:ring-forest-green focus:border-forest-green bg-warm-white text-text-black"
        ></textarea>
      </div>
      <button type="submit" class="btn-primary w-full">
        {bookPageContent.form.submitButton}
      </button>
    </form>
  );
};

export default BookForm;
